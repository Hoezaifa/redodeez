import type { IncomingMessage, ServerResponse } from "http";
import { getAdminSettingsFromDb, saveAdminSettingsToDb } from "../src/lib/dbService";

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
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
    return sendJson(500, { ok: false, error: String(err?.message || err) });
  }
}
