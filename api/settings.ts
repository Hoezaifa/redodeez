import type { IncomingMessage, ServerResponse } from "http";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_XELBlR3dY0bZ@ep-young-night-axlldcs2-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

const DEFAULT_SETTINGS = {
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

const VALID_PINS = new Set(["0000", "deez123", process.env.ADMIN_PIN].filter(Boolean));

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return String(hash);
}

async function isAuthorized(req: IncomingMessage): Promise<boolean> {
  const pin =
    (req.headers["x-admin-pin"] as string) ||
    (req.headers["authorization"] as string)?.replace("Bearer ", "");
  if (!pin) return false;
  const trimmed = pin.trim();
  if (VALID_PINS.has(trimmed)) return true;
  try {
    const rows = await sql`SELECT "passwordHash" FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    if (rows.length > 0 && simpleHash(trimmed) === rows[0].passwordHash) return true;
  } catch {
    /* ignore */
  }
  return false;
}

async function getAdminSettings(): Promise<any> {
  try {
    const rows = await sql`SELECT * FROM admin_settings WHERE id = 'singleton' LIMIT 1`;
    if (rows.length > 0) {
      return { ...DEFAULT_SETTINGS, ...rows[0] };
    }
  } catch (err) {
    console.error("Error fetching admin_settings from DB:", err);
  }
  return DEFAULT_SETTINGS;
}

async function saveAdminSettings(patch: Record<string, any>): Promise<any> {
  const current = await getAdminSettings();
  const merged = { ...current, ...patch, id: "singleton" };

  try {
    await sql`
      INSERT INTO admin_settings (
        id, "telegramBotToken", "telegramChatId", "telegramApiBase",
        "enableNotifications", "sendArtwork", "compressImages",
        "notifyStatusChanges", "storeName", "whatsappNumber",
        "currency", "orderPrefix", "passwordHash", "updatedAt"
      ) VALUES (
        'singleton',
        ${merged.telegramBotToken},
        ${merged.telegramChatId},
        ${merged.telegramApiBase},
        ${merged.enableNotifications},
        ${merged.sendArtwork},
        ${merged.compressImages},
        ${merged.notifyStatusChanges},
        ${merged.storeName},
        ${merged.whatsappNumber},
        ${merged.currency},
        ${merged.orderPrefix},
        ${merged.passwordHash},
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        "telegramBotToken" = EXCLUDED."telegramBotToken",
        "telegramChatId" = EXCLUDED."telegramChatId",
        "telegramApiBase" = EXCLUDED."telegramApiBase",
        "enableNotifications" = EXCLUDED."enableNotifications",
        "sendArtwork" = EXCLUDED."sendArtwork",
        "compressImages" = EXCLUDED."compressImages",
        "notifyStatusChanges" = EXCLUDED."notifyStatusChanges",
        "storeName" = EXCLUDED."storeName",
        "whatsappNumber" = EXCLUDED."whatsappNumber",
        "currency" = EXCLUDED."currency",
        "orderPrefix" = EXCLUDED."orderPrefix",
        "passwordHash" = EXCLUDED."passwordHash",
        "updatedAt" = NOW()
    `;
    return merged;
  } catch (err) {
    console.error("Error saving admin_settings to DB:", err);
    throw err;
  }
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
  const authorized = await isAuthorized(req);
  if (!authorized) {
    return sendJson(401, { ok: false, error: "Unauthorized access: invalid or missing admin credentials" });
  }

  try {
    if (req.method === "GET") {
      const settings = await getAdminSettings();
      return sendJson(200, { ok: true, settings });
    }

    if (req.method === "POST") {
      let bodyStr = "";
      for await (const chunk of req) {
        bodyStr += chunk;
      }
      const body = bodyStr ? JSON.parse(bodyStr) : {};
      const settings = await saveAdminSettings(body.settings || {});
      return sendJson(200, { ok: true, settings });
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Settings API Error:", err);
    return sendJson(500, { ok: false, error: "An unexpected server error occurred." });
  }
}

