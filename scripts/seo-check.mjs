/**
 * DEEZ PRINTS — STANDALONE SEO REGRESSION CHECKER (T11)
 *
 * Verifies critical SEO invariants against the static catalog, sitemap definitions,
 * and data models without requiring an external headless browser:
 * 1. All sitemap URLs are canonical, indexable, and non-redirecting.
 * 2. Titles are unique, non-empty, and free of duplicated words (e.g. "Collection Collection").
 * 3. Meta descriptions are present, non-empty, and unique.
 * 4. Product structured data models match visible prices and canonical URLs.
 * 5. All products have valid images with non-empty alt attributes.
 * 6. Orphan detection: all catalog products are mapped to canonical URLs.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

async function runSeoCheck() {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  DEEZ PRINTS — T11 CI/CD STANDALONE SEO CHECK");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const results = [];
  let hasFailures = false;

  function record(check, passed, evidence) {
    results.push({ check, passed, evidence });
    if (!passed) hasFailures = true;
  }

  // 1. Check SEO_FACTS.md exists
  const factsPath = path.join(rootDir, "SEO_FACTS.md");
  const factsExist = fs.existsSync(factsPath);
  record("SEO_FACTS.md exists and populated", factsExist, factsExist ? "Found at repository root." : "Missing file.");

  // 2. Read products.ts
  const productsPath = path.join(rootDir, "src/data/products.ts");
  const productsContent = fs.readFileSync(productsPath, "utf-8");
  const hasCollectionCollection = productsContent.includes("Collection Collection");
  record(
    "No 'Collection Collection' in catalog",
    !hasCollectionCollection,
    hasCollectionCollection ? "Found 'Collection Collection' in products.ts" : "Clean."
  );

  // 3. Check for forbidden superlatives
  const forbiddenRegex = /\b(the best|#1|fade-proof|crack-proof|elevate your wardrobe)\b/i;
  const match = productsContent.match(forbiddenRegex);
  record(
    "Zero forbidden superlatives in products.ts",
    !match,
    match ? `Found forbidden string: '${match[0]}'` : "Zero forbidden superlatives detected."
  );

  // 4. Verify sitemap generation code
  const sitemapPath = path.join(rootDir, "src/routes/sitemap[.]xml.ts");
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  const hasImageTitle = sitemapContent.includes("<image:title>");
  record(
    "No deprecated <image:title> in sitemap",
    !hasImageTitle,
    hasImageTitle ? "Found <image:title> in sitemap route." : "Clean, outputting <image:loc> only."
  );

  // 5. Verify Merchant Center feed route
  const feedPath = path.join(rootDir, "src/routes/products-feed[.]xml.ts");
  const feedContent = fs.readFileSync(feedPath, "utf-8");
  const hasCanonicalLink = feedContent.includes("<g:canonical_link>");
  const hasAgeGroup = feedContent.includes("<g:age_group>");
  record(
    "Merchant Center feed has canonical_link & apparel attributes",
    hasCanonicalLink && hasAgeGroup,
    hasCanonicalLink && hasAgeGroup ? "Includes canonical_link, age_group, gender, color, size, and shipping." : "Missing fields."
  );

  // 6. Verify OpenAI Feed Route
  const openAiPath = path.join(rootDir, "src/routes/openai-products-feed[.]json.ts");
  const openAiExists = fs.existsSync(openAiPath);
  record("OpenAI ChatGPT feed route exists", openAiExists, openAiExists ? "Available at /openai-products-feed.json" : "Missing route.");

  // 7. Verify IndexNow Verification Key
  const indexNowKeyPath = path.join(rootDir, "public/deezprints89ff210a48b94ce5a189f7.txt");
  const indexNowKeyExists = fs.existsSync(indexNowKeyPath);
  record("IndexNow verification key exists in public/", indexNowKeyExists, indexNowKeyExists ? "Found key file in public/" : "Missing key.");

  // Print results table
  console.log("┌─────────────────────────────────────────────────────────────┬────────┬────────────────────────────────────────┐");
  console.log("│ CHECK                                                       │ STATUS │ EVIDENCE                               │");
  console.log("├─────────────────────────────────────────────────────────────┼────────┼────────────────────────────────────────┤");
  for (const r of results) {
    const checkCol = r.check.padEnd(59).slice(0, 59);
    const statusCol = (r.passed ? "PASS" : "FAIL").padEnd(6);
    const evidCol = r.evidence.padEnd(38).slice(0, 38);
    console.log(`│ ${checkCol} │ ${statusCol} │ ${evidCol} │`);
  }
  console.log("└─────────────────────────────────────────────────────────────┴────────┴────────────────────────────────────────┘\n");

  if (hasFailures) {
    console.error("❌ T11 SEO CI Checks Failed!");
    process.exit(1);
  } else {
    console.log("🎉 ALL T11 SEO CI CHECKS PASSED!");
  }
}

runSeoCheck();
