import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }) {
  // Helper for JSON response
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end(JSON.stringify(data));
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    return sendJson(405, { ok: false, error: "Method not allowed" });
  }

  try {
    let body: any = req.body;
    if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
      if (typeof req.body === "string" && req.body.trim()) {
        try {
          body = JSON.parse(req.body);
        } catch {
          body = {};
        }
      } else {
        let bodyStr = "";
        for await (const chunk of req) {
          bodyStr += chunk;
        }
        if (bodyStr.trim()) {
          try {
            body = JSON.parse(bodyStr);
          } catch {
            body = {};
          }
        }
      }
    }
    if (!body || typeof body !== "object") body = {};

    const { endpoint, token, payload } = body;

    if (!endpoint || !token) {
      return sendJson(400, { ok: false, error: "Missing endpoint or token" });
    }

    // Call Telegram API from Vercel's server (US/Europe - no ISP blocks!)
    const tgUrl = `https://api.telegram.org/bot${token}/${endpoint}`;
    const tgRes = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await tgRes.json();
    return sendJson(tgRes.status, data);
  } catch (err: any) {
    console.error("Vercel Telegram Proxy Error:", err);
    return sendJson(500, { ok: false, error: String(err?.message || err) });
  }
}
