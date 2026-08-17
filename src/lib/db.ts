import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { neon } from "@neondatabase/serverless";
import pg from "pg";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_DB_URL =
  "postgresql://neondb_owner:npg_XELBlR3dY0bZ@ep-young-night-axlldcs2-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require";

function resolveDbUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed.startsWith("DATABASE_URL=")) {
          let val = trimmed.slice("DATABASE_URL=".length).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          return val;
        }
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_DB_URL;
}

// Guarantee process.env.DATABASE_URL is set at module load time
export const activeDbUrl = resolveDbUrl();
process.env.DATABASE_URL = activeDbUrl;
process.env.DIRECT_URL = activeDbUrl.replace("-pooler", "");

export function getNeonSql() {
  return neon(activeDbUrl);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const pool = new pg.Pool({
    connectionString: activeDbUrl,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  });

  const adapter = new PrismaPg(pool);
  const client = new PrismaClient({ adapter });

  globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const val = (client as any)[prop];
    if (typeof val === "function") {
      return val.bind(client);
    }
    return val;
  },
});
