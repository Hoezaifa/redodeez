/**
 * Deez Prints — Vercel Serverless API for Orders
 *
 * Uses @neondatabase/serverless directly (no Prisma dependency)
 * so this works reliably in Vercel serverless functions.
 */
import type { IncomingMessage, ServerResponse } from "http";
import { neon } from "@neondatabase/serverless";

// ─── Database Connection ─────────────────────────────────────────────────────

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_XELBlR3dY0bZ@ep-young-night-axlldcs2-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

// Auto-migrate: add per-order customer snapshot columns if they don't exist
let _migrated = false;
async function ensureMigration() {
  if (_migrated) return;
  _migrated = true;
  try {
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerName" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerPhone" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerEmail" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerCity" TEXT`;
    await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS "customerAddress" TEXT`;
  } catch { /* columns may already exist */ }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

const VALID_PINS = new Set(["0000", "deez123"]);

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return String(hash);
}

async function isAuthorized(pin: string | undefined): Promise<boolean> {
  if (!pin) return false;
  const trimmed = pin.trim();
  if (VALID_PINS.has(trimmed)) return true;
  try {
    const rows = await sql`SELECT "passwordHash" FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    if (rows.length > 0 && simpleHash(trimmed) === rows[0].passwordHash) return true;
  } catch { /* ignore */ }
  return false;
}

function getPin(req: IncomingMessage): string | undefined {
  return (
    (req.headers["x-admin-pin"] as string) ||
    (req.headers["authorization"] as string)?.replace("Bearer ", "")
  );
}

// ─── DB Helpers ──────────────────────────────────────────────────────────────

interface OrderRow {
  id: string;
  orderId: string;
  customerId: string;
  notes: string | null;
  paymentMethod: string;
  orderType: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: string;
  statusHistory: any;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

async function getAllOrders() {
  await ensureMigration();
  // Read per-order customer snapshot columns; fall back to joined customer data for old orders
  const orders = await sql`
    SELECT o.*, c.name AS c_name, c.email AS c_email, c.phone AS c_phone, c.city AS c_city, c.address AS c_address
    FROM orders o
    JOIN customers c ON o."customerId" = c.id
    ORDER BY o."createdAt" DESC
  `;

  const orderIds = orders.map((o: any) => o.id);
  let items: any[] = [];
  if (orderIds.length > 0) {
    items = await sql`SELECT * FROM order_items WHERE "orderId" = ANY(${orderIds})`;
  }

  const itemsByOrder = new Map<string, any[]>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) || [];
    list.push({
      id: item.id,
      title: item.title,
      size: item.size || undefined,
      color: item.color || undefined,
      qty: item.qty,
      price: item.price,
      isCustom: item.isCustom,
      frontArtworkUrl: item.frontArtworkUrl || undefined,
      backArtworkUrl: item.backArtworkUrl || undefined,
      placement: item.placement || undefined,
      blankItem: item.blankItem || undefined,
    });
    itemsByOrder.set(item.orderId, list);
  }

  return orders.map((o: any) => ({
    orderId: o.orderId,
    createdAt: new Date(o.createdAt).toISOString(),
    updatedAt: new Date(o.updatedAt).toISOString(),
    name: o.customerName || o.c_name,
    email: o.customerEmail || o.c_email || "",
    phone: o.customerPhone || o.c_phone,
    city: o.customerCity || o.c_city,
    address: o.customerAddress || o.c_address,
    notes: o.notes || undefined,
    paymentMethod: o.paymentMethod,
    orderType: o.orderType,
    subtotal: o.subtotal,
    shipping: o.shipping,
    discount: o.discount,
    total: o.total,
    status: o.status,
    statusHistory: o.statusHistory || [],
    trackingNumber: o.trackingNumber || undefined,
    items: itemsByOrder.get(o.id) || [],
  }));
}

async function saveOneOrder(order: any) {
  await ensureMigration();

  // Upsert customer (don't update name — each order stores its own snapshot)
  const existing = await sql`SELECT id FROM customers WHERE phone = ${order.phone} LIMIT 1`;
  let customerId: string;

  if (existing.length > 0) {
    customerId = existing[0].id;
    // Only update email if provided (don't overwrite name/city/address)
  } else {
    const newId = crypto.randomUUID();
    await sql`INSERT INTO customers (id, phone, name, email, city, address, "createdAt", "updatedAt") VALUES (${newId}, ${order.phone}, ${order.name}, ${order.email || null}, ${order.city}, ${order.address}, NOW(), NOW())`;
    customerId = newId;
  }

  const statusHistory = JSON.stringify(order.statusHistory || [{ status: order.status, date: new Date().toISOString() }]);
  const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();

  // Upsert order — with per-order customer snapshot
  const existingOrder = await sql`SELECT id FROM orders WHERE "orderId" = ${order.orderId} LIMIT 1`;

  let dbOrderId: string;
  if (existingOrder.length > 0) {
    dbOrderId = existingOrder[0].id;
    await sql`UPDATE orders SET status = ${order.status}, "statusHistory" = ${statusHistory}::jsonb, notes = ${order.notes || null}, "trackingNumber" = ${order.trackingNumber || null}, "paymentMethod" = ${order.paymentMethod}, subtotal = ${order.subtotal}, shipping = ${order.shipping}, discount = ${order.discount}, total = ${order.total}, "customerName" = ${order.name}, "customerPhone" = ${order.phone}, "customerEmail" = ${order.email || null}, "customerCity" = ${order.city}, "customerAddress" = ${order.address}, "updatedAt" = NOW() WHERE id = ${dbOrderId}`;
  } else {
    dbOrderId = crypto.randomUUID();
    await sql`INSERT INTO orders (id, "orderId", "customerId", notes, "paymentMethod", "orderType", subtotal, shipping, discount, total, status, "statusHistory", "trackingNumber", "customerName", "customerPhone", "customerEmail", "customerCity", "customerAddress", "createdAt", "updatedAt") VALUES (${dbOrderId}, ${order.orderId}, ${customerId}, ${order.notes || null}, ${order.paymentMethod}, ${order.orderType || "normal"}, ${order.subtotal}, ${order.shipping}, ${order.discount || 0}, ${order.total}, ${order.status || "Pending"}, ${statusHistory}::jsonb, ${order.trackingNumber || null}, ${order.name}, ${order.phone}, ${order.email || null}, ${order.city}, ${order.address}, ${createdAt.toISOString()}::timestamptz, NOW())`;
  }

  // Re-create items
  await sql`DELETE FROM order_items WHERE "orderId" = ${dbOrderId}`;
  for (const item of (order.items || [])) {
    const itemId = crypto.randomUUID();
    await sql`INSERT INTO order_items (id, "orderId", title, size, color, qty, price, "isCustom", "frontArtworkUrl", "backArtworkUrl", placement, "blankItem", "createdAt") VALUES (${itemId}, ${dbOrderId}, ${item.title}, ${item.size || null}, ${item.color || null}, ${item.qty || 1}, ${item.price}, ${item.isCustom || false}, ${item.frontArtworkUrl || null}, ${item.backArtworkUrl || null}, ${item.placement || null}, ${item.blankItem || null}, NOW())`;
  }

  return order;
}

async function updateOrderStatus(orderId: string, status: string, note?: string) {
  const existing = await sql`SELECT id, "statusHistory" FROM orders WHERE "orderId" = ${orderId} LIMIT 1`;
  if (existing.length === 0) return null;

  const history = Array.isArray(existing[0].statusHistory) ? existing[0].statusHistory : [];
  history.push({ status, date: new Date().toISOString(), note });

  await sql`UPDATE orders SET status = ${status}, "statusHistory" = ${JSON.stringify(history)}::jsonb, "updatedAt" = NOW() WHERE "orderId" = ${orderId}`;
  return { orderId, status };
}

async function deleteOneOrder(orderId: string) {
  const existing = await sql`SELECT id FROM orders WHERE "orderId" = ${orderId} LIMIT 1`;
  if (existing.length > 0) {
    await sql`DELETE FROM order_items WHERE "orderId" = ${existing[0].id}`;
    await sql`DELETE FROM orders WHERE id = ${existing[0].id}`;
  }
}

async function clearAllOrders() {
  await sql`DELETE FROM order_items`;
  await sql`DELETE FROM orders`;
}

async function importOrders(orders: any[]) {
  let imported = 0, skipped = 0;
  for (const order of orders) {
    const exists = await sql`SELECT 1 FROM orders WHERE "orderId" = ${order.orderId} LIMIT 1`;
    if (exists.length > 0) { skipped++; continue; }
    await saveOneOrder(order);
    imported++;
  }
  return { imported, skipped };
}

async function getNextOrderId() {
  const prefix = "DP";
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const todayPrefix = `${prefix}-${dateStr}-`;
  const rows = await sql`SELECT COUNT(*) as count FROM orders WHERE "orderId" LIKE ${todayPrefix + '%'}`;
  const nextNum = (parseInt(rows[0].count) || 0) + 1;
  return `${todayPrefix}${String(nextNum).padStart(5, "0")}`;
}

async function getSettings() {
  const rows = await sql`SELECT * FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
  if (rows.length === 0) {
    await sql`INSERT INTO admin_settings (id) VALUES ('singleton') ON CONFLICT DO NOTHING`;
    const newRows = await sql`SELECT * FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    return newRows[0] || null;
  }
  return rows[0];
}

async function saveSettings(settings: Record<string, any>) {
  const s = await getSettings();
  if (!s) return null;
  // Only update fields that are provided
  const updates: string[] = [];
  const vals: any = { ...s, ...settings };
  await sql`UPDATE admin_settings SET
    "telegramBotToken" = ${vals.telegramBotToken},
    "telegramChatId" = ${vals.telegramChatId},
    "telegramApiBase" = ${vals.telegramApiBase},
    "enableNotifications" = ${vals.enableNotifications},
    "sendArtwork" = ${vals.sendArtwork},
    "compressImages" = ${vals.compressImages},
    "notifyStatusChanges" = ${vals.notifyStatusChanges},
    "storeName" = ${vals.storeName},
    "whatsappNumber" = ${vals.whatsappNumber},
    currency = ${vals.currency},
    "orderPrefix" = ${vals.orderPrefix},
    "passwordHash" = ${vals.passwordHash},
    "updatedAt" = NOW()
    WHERE id = 'singleton'`;
  return await getSettings();
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    sendJson(200, {});
    return;
  }

  try {
    // Parse body for non-GET
    let body: any = {};
    if (req.method !== "GET") {
      let bodyStr = "";
      for await (const chunk of req) bodyStr += chunk;
      if (bodyStr) body = JSON.parse(bodyStr);
    }

    const pin = getPin(req);
    const action = body.action || (req.url?.includes("import") ? "import" : req.url?.includes("next-id") ? "next-id" : req.url?.includes("settings") ? "settings" : null);

    // GET
    if (req.method === "GET") {
      if (req.url?.includes("next-id")) {
        return sendJson(200, { ok: true, orderId: await getNextOrderId() });
      }
      if (req.url?.includes("settings")) {
        return sendJson(200, { ok: true, settings: await getSettings() });
      }
      if (!(await isAuthorized(pin))) {
        return sendJson(401, { ok: false, error: "Unauthorized" });
      }
      return sendJson(200, { ok: true, orders: await getAllOrders() });
    }

    // POST
    if (req.method === "POST") {
      if (action === "import") {
        if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
        const result = await importOrders(body.orders || []);
        return sendJson(200, { ok: true, ...result });
      }
      if (action === "settings") {
        if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
        const updated = await saveSettings(body.settings || {});
        return sendJson(200, { ok: true, settings: updated });
      }
      if (!body.order) return sendJson(400, { ok: false, error: "Missing order" });
      const saved = await saveOneOrder(body.order);
      return sendJson(200, { ok: true, order: saved });
    }

    // PUT
    if (req.method === "PUT") {
      if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
      const updated = await updateOrderStatus(body.orderId, body.status, body.note);
      return sendJson(200, { ok: true, order: updated });
    }

    // DELETE
    if (req.method === "DELETE") {
      if (!(await isAuthorized(pin))) return sendJson(401, { ok: false, error: "Unauthorized" });
      if (body.clearAll) {
        await clearAllOrders();
        return sendJson(200, { ok: true });
      }
      await deleteOneOrder(body.orderId);
      return sendJson(200, { ok: true });
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Orders API Error:", err);
    return sendJson(500, { ok: false, error: err.message || "Server error" });
  }
}
