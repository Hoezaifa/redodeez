import "dotenv/config";
import { neon } from "@neondatabase/serverless";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("No DATABASE_URL in environment");
    process.exit(1);
  }

  const sql = neon(dbUrl);

  console.log("=== EXECUTING POINT 1 & POINT 2 DATABASE OVERRIDE REMEDIATION ===");

  // 1. Fetch current breakout-tee override
  const breakoutRows = await sql`SELECT id, data FROM product_overrides WHERE id = 'breakout-tee';`;
  if (breakoutRows.length > 0) {
    console.log("Current breakout-tee override data:", breakoutRows[0].data);
    const data = breakoutRows[0].data as Record<string, any>;
    // Remove ONLY bad title and price
    delete data.title;
    delete data.price;
    console.log("Cleaned breakout-tee override data:", data);

    await sql`
      UPDATE product_overrides
      SET data = ${JSON.stringify(data)}, "updatedAt" = NOW()
      WHERE id = 'breakout-tee';
    `;
    console.log("Successfully updated breakout-tee in product_overrides.");
  } else {
    console.log("No override found for breakout-tee.");
  }

  // 2. Fetch current kanye-yeezus-shirt override
  const kanyeRows = await sql`SELECT id, data FROM product_overrides WHERE id = 'kanye-yeezus-shirt';`;
  if (kanyeRows.length > 0) {
    console.log("\nCurrent kanye-yeezus-shirt override data:", kanyeRows[0].data);
    const data = kanyeRows[0].data as Record<string, any>;
    // Remove ONLY bad price (32000)
    delete data.price;
    console.log("Cleaned kanye-yeezus-shirt override data:", data);

    await sql`
      UPDATE product_overrides
      SET data = ${JSON.stringify(data)}, "updatedAt" = NOW()
      WHERE id = 'kanye-yeezus-shirt';
    `;
    console.log("Successfully updated kanye-yeezus-shirt in product_overrides.");
  } else {
    console.log("No override found for kanye-yeezus-shirt.");
  }

  // 3. Verify final DB state
  console.log("\n=== VERIFYING FINAL DATABASE OVERRIDES STATE ===");
  const finalRows = await sql`SELECT id, data, "updatedAt" FROM product_overrides ORDER BY id ASC;`;
  for (const r of finalRows) {
    console.log(`\n[${r.id}] updatedAt: ${r.updatedAt}`);
    console.log("Data:", JSON.stringify(r.data, null, 2));
  }
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
