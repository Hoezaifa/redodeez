import type { IncomingMessage, ServerResponse } from "http";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_XELBlR3dY0bZ@ep-young-night-axlldcs2-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

const sql = neon(DATABASE_URL);

export type ProductOverrideData = {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
};

const VALID_PINS = new Set(["0000", "deez123", process.env.ADMIN_PIN].filter(Boolean));

function isAuthorized(req: IncomingMessage): boolean {
  const pin =
    (req.headers["x-admin-pin"] as string) ||
    (req.headers["authorization"] as string)?.replace("Bearer ", "");
  return !!pin && VALID_PINS.has(pin.trim());
}

async function getProductOverridesFromDb(): Promise<Record<string, ProductOverrideData>> {
  const rows = await sql`SELECT id, data FROM product_overrides;`;
  const result: Record<string, ProductOverrideData> = {};
  for (const row of rows) {
    result[row.id as string] = row.data as ProductOverrideData;
  }
  return result;
}

async function saveProductOverrideToDb(
  productId: string,
  data: ProductOverrideData
): Promise<{ ok: boolean; data?: ProductOverrideData; error?: string }> {
  await sql`
    CREATE TABLE IF NOT EXISTS product_overrides (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  await sql`
    INSERT INTO product_overrides (id, data, "updatedAt")
    VALUES (${productId}, ${JSON.stringify(data)}, NOW())
    ON CONFLICT (id) DO UPDATE
    SET data = EXCLUDED.data, "updatedAt" = NOW();
  `;
  return { ok: true, data };
}

async function deleteProductOverrideFromDb(
  productId: string
): Promise<{ ok: boolean; error?: string }> {
  await sql`DELETE FROM product_overrides WHERE id = ${productId};`;
  return { ok: true };
}

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any }
) {
  const sendJson = (statusCode: number, data: any) => {
    res.statusCode = statusCode;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end(JSON.stringify(data));
  };

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-PIN, Authorization");
    res.end();
    return;
  }

  try {
    // GET is public — customer-facing pages need overrides without auth
    if (req.method === "GET") {
      const overrides = await getProductOverridesFromDb();
      return sendJson(200, { ok: true, overrides });
    }

    // POST and DELETE require admin auth
    if (!isAuthorized(req)) {
      return sendJson(401, { ok: false, error: "Unauthorized" });
    }

    let bodyStr = "";
    for await (const chunk of req) {
      bodyStr += chunk;
    }
    const body = bodyStr ? JSON.parse(bodyStr) : {};

    if (req.method === "POST") {
      const { productId, data } = body;
      if (!productId || !data) {
        return sendJson(400, { ok: false, error: "productId and data are required" });
      }
      const result = await saveProductOverrideToDb(productId, data);
      return sendJson(result.ok ? 200 : 500, result);
    }

    if (req.method === "DELETE") {
      const { productId } = body;
      if (!productId) {
        return sendJson(400, { ok: false, error: "productId is required" });
      }
      const result = await deleteProductOverrideFromDb(productId);
      return sendJson(result.ok ? 200 : 500, result);
    }

    return sendJson(405, { ok: false, error: "Method not allowed" });
  } catch (err: any) {
    console.error("Products API Error:", err);
    return sendJson(500, { ok: false, error: "An unexpected server error occurred.", details: err?.message });
  }
}
