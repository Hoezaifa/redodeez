/**
 * Near-Duplicate Product Audit Script
 *
 * Scans all products in src/data/products.ts to detect:
 * 1. Identical normalized titles across different product IDs
 * 2. Shared primary images across different product IDs
 * 3. Exact design + style clashes (e.g. two drop shoulder tees for the same design with near identical names)
 * 4. Generates a clear report on legitimate style variants vs true duplicates
 *
 * Usage: npx tsx scripts/audit-near-duplicates.ts
 */

import { products, type Product } from "../src/data/products";

function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

console.log(`\n${"═".repeat(70)}`);
console.log(`  NEAR-DUPLICATE PRODUCT AUDIT — ${products.length} Products Scanned`);
console.log(`${"═".repeat(70)}\n`);

// 1. Check for duplicate normalized titles
const titlesMap = new Map<string, Product[]>();
for (const p of products) {
  const norm = normalizeTitle(p.title);
  const list = titlesMap.get(norm) ?? [];
  list.push(p);
  titlesMap.set(norm, list);
}

const duplicateTitles = [...titlesMap.entries()].filter(([_, list]) => list.length > 1);

console.log(`=== 1. Identical Normalized Titles ===`);
if (duplicateTitles.length === 0) {
  console.log(`✅ Zero exact duplicate titles found.\n`);
} else {
  console.log(`⚠️ Found ${duplicateTitles.length} title collision(s):`);
  for (const [normTitle, list] of duplicateTitles) {
    console.log(`  Title: "${normTitle}"`);
    for (const p of list) {
      console.log(`    - ID: ${p.id} | Cat: ${p.category} | Subcat: ${p.subcategory} | Price: ${p.price}`);
    }
  }
  console.log("");
}

// 2. Check for shared primary images
const imagesMap = new Map<string, Product[]>();
for (const p of products) {
  if (p.images && p.images[0]) {
    const img = p.images[0].trim();
    const list = imagesMap.get(img) ?? [];
    list.push(p);
    imagesMap.set(img, list);
  }
}

const sharedImages = [...imagesMap.entries()].filter(([_, list]) => list.length > 1);

console.log(`=== 2. Shared Primary Images ===`);
if (sharedImages.length === 0) {
  console.log(`✅ Zero products share primary image URLs.\n`);
} else {
  console.log(`⚠️ Found ${sharedImages.length} shared primary image(s):`);
  for (const [img, list] of sharedImages) {
    console.log(`  Image: ${img.slice(0, 80)}...`);
    for (const p of list) {
      console.log(`    - ID: ${p.id} ("${p.title}") [${p.subcategory}]`);
    }
  }
  console.log("");
}

// 3. Cluster by core design slug prefix
const designGroups = new Map<string, Product[]>();

for (const p of products) {
  let designKey = p.id
    .replace(/^dp-acid-wash-/, "")
    .replace(/^dp-drop-/, "")
    .replace(/^dp-tee-/, "")
    .replace(/^dp-regular-/, "")
    .replace(/^tapestry-/, "")
    .replace(/^mug-/, "")
    .replace(/-tee$/, "")
    .replace(/-tapestry$/, "");

  const list = designGroups.get(designKey) ?? [];
  list.push(p);
  designGroups.set(designKey, list);
}

const multiProductDesigns = [...designGroups.entries()].filter(([_, list]) => list.length > 1);

console.log(`=== 3. Design Multi-Variant Clusters (Legitimate Style Variants) ===`);
console.log(`Found ${multiProductDesigns.length} design themes spanning multiple product types/styles.\n`);

let styleCollisions = 0;
for (const [design, list] of multiProductDesigns) {
  const subcats = new Map<string, Product[]>();
  for (const p of list) {
    const sList = subcats.get(p.subcategory) ?? [];
    sList.push(p);
    subcats.set(p.subcategory, sList);
  }

  const clashes = [...subcats.entries()].filter(([_, sList]) => sList.length > 1);
  if (clashes.length > 0) {
    styleCollisions++;
    console.log(`  ⚡ Potential near-duplicate in design "${design}":`);
    for (const [subcat, sList] of clashes) {
      console.log(`     Subcategory [${subcat}] has ${sList.length} products:`);
      for (const p of sList) {
        console.log(`       * ${p.id}: "${p.title}" (Rs. ${p.price})`);
      }
    }
  }
}

if (styleCollisions === 0) {
  console.log(`✅ All multi-product designs represent distinct product formats (e.g. Acid Wash vs Drop Shoulder vs Tapestry).\n`);
} else {
  console.log(`\n⚠️ ${styleCollisions} design(s) have multiple products within the SAME subcategory.\n`);
}

console.log(`${"═".repeat(70)}`);
console.log(`  AUDIT COMPLETE`);
console.log(`${"═".repeat(70)}\n`);
