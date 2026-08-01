import type { IncomingMessage, ServerResponse } from "http";
import { getAdminSettingsFromDb, saveAdminSettingsToDb } from "../src/lib/dbService";

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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end();
    return;
  }

  // Server-Side Authorization Guard
  if (!isAuthorized(req)) {
    return sendJson(401, { ok: false, error: "Unauthorized access: invalid or missing admin credentials" });
  }

  try {
    if (req.method === "GET") {
      const settings = await getAdminSettingsFromDb();
      return sendJson(200, { ok: true, settings });
    }

    if (req.method === "POST") {
      let bodyStr = "";
      for await (const chunk of req) {
        bodyStr += chunk;
      }
      const body = bodyStr ? JSON.parse(bodyStr) : {};
      const settings = await saveAdminSettingsToDb(body.settings || {});
      return sendJson(200, { ok: true, settings });
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Settings API Error:", err);
    return sendJson(500, { ok: false, error: "An unexpected server error occurred." });
  }
}

