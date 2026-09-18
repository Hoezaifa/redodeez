import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("No DATABASE_URL in environment");
    process.exit(1);
  }

  const sql = neon(dbUrl);
  try {
    const rows = await sql`SELECT id, data, "updatedAt" FROM product_overrides ORDER BY id ASC;`;
    console.log(`Found ${rows.length} product overrides in database:`);
    for (const r of rows) {
      console.log(`\n--- PRODUCT OVERRIDE [${r.id}] ---`);
      console.log("Updated at:", r.updatedAt);
      console.log("Data:", JSON.stringify(r.data, null, 2));
    }
  } catch (err: any) {
    console.error("Database query failed:", err.message);
  }
}

main();
