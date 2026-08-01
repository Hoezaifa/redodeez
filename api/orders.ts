import type { IncomingMessage, ServerResponse } from "http";
import {
  getOrdersFromDb,
  saveOrderToDb,
  updateOrderStatusInDb,
  deleteOrderFromDb,
  clearOrdersFromDb,
  importLocalOrdersToDb,
  generateNextOrderIdFromDb,
} from "../src/lib/dbService";

const VALID_PINS = new Set(["0000", "deez123", process.env.ADMIN_PIN].filter(Boolean));

function isAuthorized(req: IncomingMessage): boolean {
  const pin =
    (req.headers["x-admin-pin"] as string) ||
    (req.headers["authorization"] as string)?.replace("Bearer ", "");
  return !!pin && VALID_PINS.has(pin.trim());
}

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
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
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end();
    return;
  }

  try {
    let bodyStr = "";
    if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
      for await (const chunk of req) {
        bodyStr += chunk;
      }
    }
    const body = bodyStr ? JSON.parse(bodyStr) : {};

    // Action routing
    const action = body.action || (req.url?.includes("import") ? "import" : req.url?.includes("next-id") ? "next-id" : null);

    // 1. GET requests
    if (req.method === "GET") {
      if (req.url?.includes("next-id")) {
        const orderId = await generateNextOrderIdFromDb();
        return sendJson(200, { ok: true, orderId });
      }
      // Fetching all customer orders requires admin authorization
      if (!isAuthorized(req)) {
        return sendJson(401, { ok: false, error: "Unauthorized access" });
      }
      const orders = await getOrdersFromDb();
      return sendJson(200, { ok: true, orders });
    }

    // 2. POST requests
    if (req.method === "POST") {
      if (action === "import") {
        if (!isAuthorized(req)) {
          return sendJson(401, { ok: false, error: "Unauthorized access" });
        }
        const result = await importLocalOrdersToDb(body.orders || []);
        return sendJson(200, { ok: true, ...result });
      }
      // Save order (Public endpoint for checkout)
      if (!body.order || typeof body.order !== "object") {
        return sendJson(400, { ok: false, error: "Invalid order payload" });
      }
      const savedOrder = await saveOrderToDb(body.order);
      return sendJson(200, { ok: true, order: savedOrder });
    }

    // 3. PUT requests (Update status — Admin only)
    if (req.method === "PUT") {
      if (!isAuthorized(req)) {
        return sendJson(401, { ok: false, error: "Unauthorized access" });
      }
      const updated = await updateOrderStatusInDb(body.orderId, body.status, body.note);
      return sendJson(200, { ok: true, order: updated });
    }

    // 4. DELETE requests (Delete order / Clear — Admin only)
    if (req.method === "DELETE") {
      if (!isAuthorized(req)) {
        return sendJson(401, { ok: false, error: "Unauthorized access" });
      }
      if (body.clearAll) {
        await clearOrdersFromDb();
        return sendJson(200, { ok: true });
      }
      await deleteOrderFromDb(body.orderId);
      return sendJson(200, { ok: true });
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Orders API Error:", err);
    return sendJson(500, { ok: false, error: "An unexpected server error occurred." });
  }
}

