/**
 * Deez Prints — Server Data Service (Neon PostgreSQL via Prisma)
 *
 * Handles database operations for Orders, Customers, Admin Settings, and Analytics.
 */

import { getPrismaClient } from "@/lib/db";
import type { StoredOrder, OrderItem, OrderStatus, StatusHistoryEntry, AdminSettings } from "@/lib/ordersStore";
import { sendOrderEmailNotification } from "@/lib/notifications/sendEmailOrder";

const DEFAULT_SETTINGS: AdminSettings = {
  telegramBotToken: "8851777111:AAHEWoRMMes229DTTljUDT5SiDFV-fU-iwM",
  telegramChatId: "6105402097",
  telegramApiBase: "https://api.telegram.org",
  enableNotifications: true,
  sendArtwork: true,
  compressImages: false,
  notifyStatusChanges: true,
  storeName: "Deez Prints",
  whatsappNumber: "923272487127",
  currency: "PKR",
  orderPrefix: "DP",
  passwordHash: "1661623862",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapDbToStoredOrder(dbOrder: any): StoredOrder {
  if (!dbOrder) {
    return {
      orderId: "",
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      paymentMethod: "COD",
      orderType: "normal",
      items: [],
      subtotal: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      status: "Pending",
      statusHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const customer = dbOrder?.customer || {};
  const rawItems = dbOrder?.items || [];

  const items: OrderItem[] = rawItems.map((i: any) => ({
    id: i.id,
    title: i.title,
    size: i.size || undefined,
    color: i.color || undefined,
    qty: i.qty,
    price: i.price,
    isCustom: i.isCustom,
    frontArtworkUrl: i.frontArtworkUrl || undefined,
    backArtworkUrl: i.backArtworkUrl || undefined,
    placement: i.placement || undefined,
    blankItem: i.blankItem || undefined,
  }));

  const history = Array.isArray(dbOrder?.statusHistory)
    ? (dbOrder.statusHistory as StatusHistoryEntry[])
    : [{ status: (dbOrder?.status || "Pending") as OrderStatus, date: dbOrder?.createdAt ? (typeof dbOrder.createdAt === "string" ? dbOrder.createdAt : dbOrder.createdAt.toISOString()) : new Date().toISOString() }];

  return {
    orderId: dbOrder?.orderId || "",
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    city: customer?.city || "",
    address: customer?.address || "",
    notes: dbOrder?.notes || undefined,
    paymentMethod: dbOrder?.paymentMethod || "COD",
    orderType: (dbOrder?.orderType as "normal" | "custom") || "normal",
    items,
    subtotal: dbOrder?.subtotal || 0,
    shipping: dbOrder?.shipping || 0,
    discount: dbOrder?.discount || 0,
    total: dbOrder?.total || 0,
    status: (dbOrder?.status || "Pending") as OrderStatus,
    statusHistory: history,
    trackingNumber: dbOrder?.trackingNumber || undefined,
    createdAt: dbOrder?.createdAt ? (typeof dbOrder.createdAt === "string" ? dbOrder.createdAt : dbOrder.createdAt.toISOString()) : new Date().toISOString(),
    updatedAt: dbOrder?.updatedAt ? (typeof dbOrder.updatedAt === "string" ? dbOrder.updatedAt : dbOrder.updatedAt.toISOString()) : new Date().toISOString(),
  };
}

// ─── Database Operations ─────────────────────────────────────────────────────

export async function getOrdersFromDb(): Promise<StoredOrder[]> {
  try {
    const prisma = getPrismaClient();
    const dbOrders = await prisma.order.findMany({
      include: {
        customer: true,
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return dbOrders.map(mapDbToStoredOrder);
  } catch (err) {
    console.error("Error fetching orders from DB:", err);
    return [];
  }
}

export async function saveOrderToDb(order: StoredOrder): Promise<StoredOrder> {
  if (!order || typeof order !== "object") {
    console.error("Invalid order object passed to saveOrderToDb:", order);
    throw new Error("Invalid order data");
  }

  const prisma = getPrismaClient();

  const phone = order.phone || order.orderId || "00000000000";
  const name = order.name || "Guest Customer";
  const email = order.email || null;
  const city = order.city || "";
  const address = order.address || "";
  const orderId = order.orderId || `DP-${Date.now()}`;

  return await prisma.$transaction(async (tx) => {
    // 1. Upsert customer by phone
    const customer = await tx.customer.upsert({
      where: { phone },
      update: {
        name,
        email,
        city,
        address,
      },
      create: {
        phone,
        name,
        email,
        city,
        address,
      },
    });

    // 2. Check if order exists
    const existingOrder = await tx.order.findUnique({
      where: { orderId },
    });

    if (existingOrder) {
      // Delete old items to replace with updated list
      await tx.orderItem.deleteMany({
        where: { orderId: existingOrder.id },
      });
    }

    // 3. Upsert order
    const createdOrUpdatedOrder = await tx.order.upsert({
      where: { orderId },
      update: {
        customerId: customer.id,
        notes: order.notes || null,
        paymentMethod: order.paymentMethod || "COD",
        orderType: order.orderType || "normal",
        subtotal: order.subtotal || 0,
        shipping: order.shipping || 0,
        discount: order.discount || 0,
        total: order.total || 0,
        status: order.status || "Pending",
        statusHistory: (order.statusHistory || []) as any,
        trackingNumber: order.trackingNumber || null,
        updatedAt: new Date(),
      },
      create: {
        orderId,
        customerId: customer.id,
        notes: order.notes || null,
        paymentMethod: order.paymentMethod || "COD",
        orderType: order.orderType || "normal",
        subtotal: order.subtotal || 0,
        shipping: order.shipping || 0,
        discount: order.discount || 0,
        total: order.total || 0,
        status: order.status || "Pending",
        statusHistory: (order.statusHistory || []) as any,
        trackingNumber: order.trackingNumber || null,
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
      },
    });

    // 4. Create items
    if (order.items && order.items.length > 0) {
      await tx.orderItem.createMany({
        data: order.items.map((i) => ({
          orderId: createdOrUpdatedOrder.id,
          title: i.title,
          size: i.size || null,
          color: i.color || null,
          qty: i.qty,
          price: i.price,
          isCustom: !!i.isCustom,
          frontArtworkUrl: i.frontArtworkUrl || null,
          backArtworkUrl: i.backArtworkUrl || null,
          placement: i.placement || null,
          blankItem: i.blankItem || null,
        })),
      });
    }

    // 5. Audit log
    await tx.activityLog.create({
      data: {
        action: existingOrder ? "ORDER_UPDATED" : "ORDER_CREATED",
        orderId: order.orderId,
        details: { total: order.total, status: order.status },
      },
    });

    // Fetch full saved order
    const fullOrder = await tx.order.findUnique({
      where: { id: createdOrUpdatedOrder.id },
      include: { customer: true, items: true },
    });

    const savedOrder = mapDbToStoredOrder(fullOrder);

    // Send admin email notification for new orders
    if (!existingOrder) {
      sendOrderEmailNotification(savedOrder).catch((err) => {
        console.error("[dbService] Failed to dispatch admin email:", err);
      });
    }

    return savedOrder;
  });
}

export async function updateOrderStatusInDb(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<StoredOrder | null> {
  const prisma = getPrismaClient();

  const existing = await prisma.order.findUnique({
    where: { orderId },
    include: { customer: true, items: true },
  });

  if (!existing) return null;

  const history = (Array.isArray(existing.statusHistory) ? existing.statusHistory : []) as unknown as StatusHistoryEntry[];
  const newEntry: StatusHistoryEntry = {
    status,
    date: new Date().toISOString(),
    note,
  };
  const updatedHistory = [...history, newEntry];

  const updated = await prisma.order.update({
    where: { orderId },
    data: {
      status,
      statusHistory: updatedHistory as any,
      updatedAt: new Date(),
    },
    include: { customer: true, items: true },
  });

  await prisma.activityLog.create({
    data: {
      action: "ORDER_STATUS_CHANGED",
      orderId,
      details: { oldStatus: existing.status, newStatus: status, note },
    },
  });

  return mapDbToStoredOrder(updated);
}

export async function deleteOrderFromDb(orderId: string): Promise<boolean> {
  try {
    const prisma = getPrismaClient();
    await prisma.order.delete({
      where: { orderId },
    });
    await prisma.activityLog.create({
      data: {
        action: "ORDER_DELETED",
        orderId,
      },
    });
    return true;
  } catch (err) {
    console.error("Error deleting order from DB:", err);
    return false;
  }
}

export async function clearOrdersFromDb(): Promise<boolean> {
  try {
    const prisma = getPrismaClient();
    await prisma.order.deleteMany({});
    await prisma.activityLog.create({
      data: {
        action: "ALL_ORDERS_CLEARED",
      },
    });
    return true;
  } catch (err) {
    console.error("Error clearing orders from DB:", err);
    return false;
  }
}

export async function getAdminSettingsFromDb(): Promise<AdminSettings> {
  try {
    const prisma = getPrismaClient();
    const settings = await prisma.adminSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: {
        id: "singleton",
        ...DEFAULT_SETTINGS,
      },
    });
    return {
      telegramBotToken: settings.telegramBotToken,
      telegramChatId: settings.telegramChatId,
      telegramApiBase: settings.telegramApiBase,
      enableNotifications: settings.enableNotifications,
      sendArtwork: settings.sendArtwork,
      compressImages: settings.compressImages,
      notifyStatusChanges: settings.notifyStatusChanges,
      storeName: settings.storeName,
      whatsappNumber: settings.whatsappNumber,
      currency: settings.currency,
      orderPrefix: settings.orderPrefix,
      passwordHash: settings.passwordHash,
    };
  } catch (err) {
    console.error("Error loading admin settings from DB:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function saveAdminSettingsToDb(
  patch: Partial<AdminSettings>
): Promise<AdminSettings> {
  try {
    const prisma = getPrismaClient();
    const updated = await prisma.adminSettings.upsert({
      where: { id: "singleton" },
      update: {
        ...patch,
        updatedAt: new Date(),
      },
      create: {
        id: "singleton",
        ...DEFAULT_SETTINGS,
        ...patch,
      },
    });
    return {
      telegramBotToken: updated.telegramBotToken,
      telegramChatId: updated.telegramChatId,
      telegramApiBase: updated.telegramApiBase,
      enableNotifications: updated.enableNotifications,
      sendArtwork: updated.sendArtwork,
      compressImages: updated.compressImages,
      notifyStatusChanges: updated.notifyStatusChanges,
      storeName: updated.storeName,
      whatsappNumber: updated.whatsappNumber,
      currency: updated.currency,
      orderPrefix: updated.orderPrefix,
      passwordHash: updated.passwordHash,
    };
  } catch (err) {
    console.error("Error saving admin settings to DB:", err);
    return DEFAULT_SETTINGS;
  }
}

export async function importLocalOrdersToDb(
  orders: StoredOrder[]
): Promise<{ imported: number; skipped: number }> {
  let imported = 0;
  let skipped = 0;

  for (const order of orders) {
    try {
      const prisma = getPrismaClient();
      const existing = await prisma.order.findUnique({
        where: { orderId: order.orderId },
      });

      if (existing) {
        skipped++;
        continue;
      }

      await saveOrderToDb(order);
      imported++;
    } catch (err) {
      console.error(`Failed to import order ${order.orderId}:`, err);
      skipped++;
    }
  }

  return { imported, skipped };
}

export async function generateNextOrderIdFromDb(prefix = "DP"): Promise<string> {
  try {
    const prisma = getPrismaClient();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    const todayPrefix = `${prefix}-${dateStr}-`;

    const count = await prisma.order.count({
      where: {
        orderId: {
          startsWith: todayPrefix,
        },
      },
    });

    return `${todayPrefix}${String(count + 1).padStart(5, "0")}`;
  } catch {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
    return `${prefix}-${dateStr}-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  }
}
