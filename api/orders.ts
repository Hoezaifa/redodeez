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

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

    if (req.method === "GET") {
      if (req.url?.includes("next-id")) {
        const orderId = await generateNextOrderIdFromDb();
        return sendJson(200, { ok: true, orderId });
      }
      const orders = await getOrdersFromDb();
      return sendJson(200, { ok: true, orders });
    }

    if (req.method === "POST") {
      if (action === "import") {
        const result = await importLocalOrdersToDb(body.orders || []);
        return sendJson(200, { ok: true, ...result });
      }
      // Save order
      const savedOrder = await saveOrderToDb(body.order);
      return sendJson(200, { ok: true, order: savedOrder });
    }

    if (req.method === "PUT") {
      // Update status
      const updated = await updateOrderStatusInDb(body.orderId, body.status, body.note);
      return sendJson(200, { ok: true, order: updated });
    }

    if (req.method === "DELETE") {
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
    return sendJson(500, { ok: false, error: String(err?.message || err) });
  }
}
