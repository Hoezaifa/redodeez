/**
 * Catalogue QA — Deterministic product data quality check
 *
 * Usage: npx tsx scripts/catalog-qa.ts
 *
 * Checks every product in src/data/products.ts for:
 *  - title exists and non-empty
 *  - slug (id) exists, is unique
 *  - price exists and is within allowed range (100–50000)
 *  - images array exists with at least 1 entry
 *  - category is valid
 *  - subcategory is valid
 *  - id/title are semantically compatible
 *  - no test/dev/sample placeholders
 */

import { products, type Product } from "../src/data/products";

/* ─── Valid values ─────────────────────────────────────────── */

const VALID_CATEGORIES = new Set([
  "t-shirts",
  "accessories",
  "hoodies",
  "jerseys",
  "tapestries",
]);

const VALID_SUBCATEGORIES = new Set([
  "regular",
  "graphic",
  "drop-shoulder",
  "acid-wash",
  "mugs",
  "flags",
  "tapestries",
  "wristbands",
  "badges",
  "wallet-cards",
  "keychains",
  "magnets",
  "notebooks",
  "gift-boxes",
  "hoodies",
  "jerseys",
]);

const VALID_AESTHETICS = new Set([
  "anime-archive",
  "comic-universe",
  "minimal-drops",
  "cinema-collection",
  "art-drop",
  "street-aesthetic",
]);

const PLACEHOLDER_PATTERNS = /\b(test|sample|dev|placeholder|todo|fixme|xxx|lorem|ipsum|dummy|example|temp)\b/i;

const PRICE_MIN = 100;
const PRICE_MAX = 50000;

/* ─── Types ────────────────────────────────────────────────── */

interface QAFlag {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  reason: string;
}

/* ─── Run checks ───────────────────────────────────────────── */

const flags: QAFlag[] = [];
const slugsSeen = new Map<string, number>(); // slug → count

function flag(p: Product, reason: string) {
  flags.push({
    id: p.id,
    title: p.title,
    slug: p.id,
    price: p.price,
    category: p.category,
    reason,
  });
}

// Pass 1: collect slug counts
for (const p of products) {
  slugsSeen.set(p.id, (slugsSeen.get(p.id) ?? 0) + 1);
}

// Pass 2: validate each product
for (const p of products) {
  // Title
  if (!p.title || p.title.trim().length === 0) {
    flag(p, "Missing or empty title");
  }

  // Slug / ID
  if (!p.id || p.id.trim().length === 0) {
    flag(p, "Missing or empty slug/id");
  }

  // Duplicate slug
  if ((slugsSeen.get(p.id) ?? 0) > 1) {
    flag(p, `Duplicate slug "${p.id}" — appears ${slugsSeen.get(p.id)} times`);
  }

  // Price
  if (p.price === undefined || p.price === null) {
    flag(p, "Missing price");
  } else if (typeof p.price !== "number" || isNaN(p.price)) {
    flag(p, `Invalid price: ${p.price}`);
  } else if (p.price < PRICE_MIN) {
    flag(p, `Suspicious low price: ${p.price} (below ${PRICE_MIN})`);
  } else if (p.price > PRICE_MAX) {
    flag(p, `Suspicious high price: ${p.price} (above ${PRICE_MAX})`);
  }

  // Images
  if (!p.images || !Array.isArray(p.images) || p.images.length === 0) {
    flag(p, "No images");
  } else {
    // Check primary image exists
    if (!p.images[0] || p.images[0].trim().length === 0) {
      flag(p, "Primary image is empty string");
    }
    // Check for broken image URLs
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      if (!img || img.trim().length === 0) {
        flag(p, `Image at index ${i} is empty`);
      }
    }
  }

  // Category
  if (!p.category) {
    flag(p, "Missing category");
  } else if (!VALID_CATEGORIES.has(p.category)) {
    flag(p, `Invalid category: "${p.category}"`);
  }

  // Subcategory
  if (!p.subcategory) {
    flag(p, "Missing subcategory");
  } else if (!VALID_SUBCATEGORIES.has(p.subcategory)) {
    flag(p, `Invalid subcategory: "${p.subcategory}"`);
  }

  // Aesthetic validation (if set)
  if (p.aesthetic && !VALID_AESTHETICS.has(p.aesthetic)) {
    flag(p, `Unknown aesthetic: "${p.aesthetic}"`);
  }

  // Placeholder/test detection
  if (PLACEHOLDER_PATTERNS.test(p.title)) {
    flag(p, `Title contains placeholder/test text: "${p.title}"`);
  }
  if (PLACEHOLDER_PATTERNS.test(p.id)) {
    flag(p, `Slug contains placeholder/test text: "${p.id}"`);
  }

  // Category/subcategory coherence checks
  if (p.subcategory === "tapestries" && p.category !== "tapestries") {
    flag(p, `Tapestry with unexpected category: "${p.category}"`);
  }
  if (p.subcategory === "flags" && p.category !== "tapestries") {
    flag(p, `Flag with unexpected category: "${p.category}"`);
  }
  if (p.subcategory === "mugs" && p.category !== "accessories") {
    flag(p, `Mug with wrong category: "${p.category}" (expected "accessories")`);
  }
  if (["hoodies"].includes(p.subcategory) && p.category !== "hoodies") {
    flag(p, `Hoodie subcategory but category is "${p.category}"`);
  }
  if (["jerseys"].includes(p.subcategory) && p.category !== "jerseys") {
    flag(p, `Jersey subcategory but category is "${p.category}"`);
  }

  // Slug-title semantic compatibility
  // Very basic: if slug has a recognizable product type, title should somewhat match
  if (p.id.includes("hoodie") && !p.title.toLowerCase().includes("hoodie") && p.category !== "hoodies") {
    flag(p, "Slug mentions 'hoodie' but title and category don't match");
  }
  if (p.id.includes("jersey") && !p.title.toLowerCase().includes("jersey") && p.category !== "jerseys") {
    flag(p, "Slug mentions 'jersey' but title and category don't match");
  }
  if (p.id.includes("tapestry") && !p.title.toLowerCase().includes("tapestry") && p.subcategory !== "tapestries") {
    flag(p, "Slug mentions 'tapestry' but title and subcategory don't match");
  }
  if (p.id.includes("mug") && !p.title.toLowerCase().includes("mug") && p.subcategory !== "mugs") {
    flag(p, "Slug mentions 'mug' but title and subcategory don't match");
  }
}

/* ─── Output ───────────────────────────────────────────────── */

console.log(`\n${"═".repeat(70)}`);
console.log(`  CATALOGUE QA REPORT — ${products.length} products scanned`);
console.log(`${"═".repeat(70)}\n`);

// Summary stats
const uniqueSlugs = new Set(products.map((p) => p.id)).size;
const duplicateSlugs = products.length - uniqueSlugs;
const categoryBreakdown = new Map<string, number>();
const subcatBreakdown = new Map<string, number>();
for (const p of products) {
  categoryBreakdown.set(p.category, (categoryBreakdown.get(p.category) ?? 0) + 1);
  subcatBreakdown.set(p.subcategory, (subcatBreakdown.get(p.subcategory) ?? 0) + 1);
}

console.log("Category breakdown:");
for (const [cat, count] of [...categoryBreakdown.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat}: ${count}`);
}
console.log("");

console.log("Subcategory breakdown:");
for (const [sub, count] of [...subcatBreakdown.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${sub}: ${count}`);
}
console.log("");

console.log(`Total products: ${products.length}`);
console.log(`Unique slugs: ${uniqueSlugs}`);
console.log(`Duplicate slugs: ${duplicateSlugs}`);

const priceRange = products.reduce(
  (acc, p) => ({
    min: Math.min(acc.min, p.price),
    max: Math.max(acc.max, p.price),
  }),
  { min: Infinity, max: -Infinity }
);
console.log(`Price range: Rs. ${priceRange.min} — Rs. ${priceRange.max}`);

const noImages = products.filter((p) => !p.images || p.images.length === 0).length;
console.log(`Products without images: ${noImages}`);
console.log("");

if (flags.length === 0) {
  console.log("✅  No issues found! Catalogue is clean.\n");
  process.exit(0);
} else {
  console.log(`⚠️  ${flags.length} issue(s) found:\n`);

  // Deduplicate flags for duplicate slugs (only show once per slug)
  const seen = new Set<string>();
  for (const f of flags) {
    const key = `${f.id}|${f.reason}`;
    if (seen.has(key)) continue;
    seen.add(key);

    console.log(`  ID:       ${f.id}`);
    console.log(`  Title:    ${f.title}`);
    console.log(`  Price:    ${f.price}`);
    console.log(`  Category: ${f.category}`);
    console.log(`  Reason:   ${f.reason}`);
    console.log(`  ${"─".repeat(50)}`);
  }

  console.log(`\nTotal unique issues: ${seen.size}\n`);
  process.exit(1);
}
