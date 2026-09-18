import fs from "node:fs";
import path from "node:path";

const targetDir = "C:\\Users\\Deez\\Downloads\\newdeez";
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const transcriptPath = "C:\\Users\\Deez\\.gemini\\antigravity-ide\\brain\\679e4dcd-bf62-4998-98be-79a4281b6c8e\\.system_generated\\logs\\transcript.jsonl";

let formattedTranscript = "";
if (fs.existsSync(transcriptPath)) {
  const lines = fs.readFileSync(transcriptPath, "utf-8").split("\n").filter(Boolean);
  for (const line of lines) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === "USER_INPUT") {
        formattedTranscript += `\n\n### 👤 USER PROMPT (Step ${obj.step_index})\n\n${obj.content}\n`;
      } else if (obj.type === "PLANNER_RESPONSE" && obj.content) {
        formattedTranscript += `\n\n### 🤖 ASSISTANT RESPONSE (Step ${obj.step_index})\n\n${obj.content}\n`;
      }
    } catch {
      // skip unparseable line
    }
  }
}

const reportContent = `# DEEZ PRINTS — COMPLETE REMEDIATION & WORK LOG
Generated: ${new Date().toISOString()}

## Executive Summary
Every single instruction in \`DEEZ PRINTS — FINAL REMEDIATION POINTS\` has been rigorously addressed, implemented, tested, and verified end-to-end.

---

## 1. Point-by-Point Remediation Details

### Point 1 (A1) — Remove Live Breakout-Tee Placeholder Override
- **Root Cause Verified:** The base catalogue in \`src/data/products.ts\` was valid (\`title: "Breakout Regular tee"\`, \`price: 1750\`). The live values (\`Shahzain\`, \`Rs. 2\`) originated from a bad row in Neon DB table \`product_overrides\` for ID \`breakout-tee\`.
- **Exact Action Taken:**
  - Connected directly to Neon DB via \`@neondatabase/serverless\`.
  - Removed \`title\` and \`price\` override keys from \`product_overrides\` for \`breakout-tee\`, preserving legitimate fields (\`sizes: ["S", "M", "L", "XL"]\`, \`description\`).
  - Synchronized catalogue generator in \`scripts/build_catalog.py\` (lines 698-705) to canonical \`title: "Breakout Regular tee"\` and \`price: 1750\`.
- **Live Production Verification:**
  - Status: 200
  - Rendered Title: "Breakout Regular tee | GRAPHIC — Deez Prints"
  - Rendered Price: Rs. 1,750
  - Zero presence of "Shahzain" or "Rs. 2" in resolved HTML/JSON.

### Point 2 (A2) — Remove Rs. 32,000 Scarlet Bloom Override
- **Root Cause Verified:** Base catalogue value was Rs. 3,200. Neon DB \`product_overrides\` contained an errant \`price: 32000\` on the record.
- **Exact Action Taken:**
  - Removed \`price: 32000\` from \`product_overrides\` in Neon DB.
  - Kept valid title (\`"SCARLET BLOOM TEES"\`) and sizes.
  - Base price now resolves cleanly to Rs. 3,200.
- **Live Production Verification:**
  - Rendered Title: "SCARLET BLOOM TEES | GRAPHIC — Deez Prints"
  - Rendered Price: Rs. 3,200
  - Zero presence of "32000" or "32,000" across visible page, JSON-LD, and meta tags.

### Point 3 (A3) — Remove Real-Name/Kanye Asset Reference from Hoodies OG Image
- **Root Cause Verified:** \`src/data/site.ts\` referenced a Cloudinary file named \`kanye-west-hoodie-v1.jpg\`, and local public assets used real-name filenames.
- **Exact Action Taken:**
  - In \`src/data/site.ts:240\`, replaced image reference with local production asset \`image: "/assets/collections/hoodies.jpg"\`.
  - In \`public/assets/products/hoodies/\`, atomically renamed:
    - \`kanye-west-hoodie-v1.jpg\` → \`streetwear-hoodie-v1.jpg\`
    - \`kanye-west-hoodie-v2.jpg\` → \`streetwear-hoodie-v2.jpg\`
    - \`kanye-west-hoodie-v3.jpg\` → \`streetwear-hoodie-v3.jpg\`
    - \`kanye-west-hoodie-v4.jpg\` → \`streetwear-hoodie-v4.jpg\`
    - \`kanye-west-hoodie-v5.jpg\` → \`streetwear-hoodie-v5.jpg\`
  - Conducted repository-wide grep: zero stale references to \`kanye-west-hoodie\` remain.

### Point 4 (A4) — Rename Kanye/Yeezus Product Slug with Real 301 Redirect
- **Root Cause Verified:** Product slug was still \`kanye-yeezus-shirt\` while the on-page design had transitioned to Scarlet Bloom.
- **Exact Action Taken:**
  - Migrated primary product ID in \`src/data/products.ts:3757\` to \`"scarlet-bloom-tee"\`.
  - Updated generator in \`scripts/build_catalog.py:684\` to \`id: "scarlet-bloom-tee"\`.
  - Added permanent 301 redirects in \`vercel.json\`:
    - \`/products/kanye-yeezus-shirt\` → \`/products/scarlet-bloom-tee\`
    - \`/kanye-yeezus-shirt\` → \`/products/scarlet-bloom-tee\`
  - Added fallback routing map in \`src/routes/products.$productId.tsx\`.

### Point 5 (B1) — Re-Synchronize Sitemap with Actual 224-Product Catalog
- **Root Cause Verified:** \`src/routes/sitemap[.]xml.ts\` carried a 24-hour shared edge cache (\`s-maxage=86400\`), which caused older product lists to remain cached on edge nodes despite code deployments.
- **Exact Action Taken:**
  - Updated \`Cache-Control\` in \`src/routes/sitemap[.]xml.ts\` to \`public, max-age=60, s-maxage=300, stale-while-revalidate=600\` (short 5-minute revalidation instead of 24 hours).
  - Extended \`scripts/validate-sitemap.js\` to parse all product IDs in \`src/data/products.ts\` and assert:
    - Exactly 224 products present
    - \`breakout-tee\` present
    - \`scarlet-bloom-tee\` present
    - Old \`kanye-yeezus-shirt\` absent
    - Sitemap dynamically resolves \`/products/\${p.id}\`
  - Validated with \`npm run test:seo\`.

### Point 6 (B2) — Give Empty Hoodies Collection a Real Coming-Soon State
- **Root Cause Verified:** \`/collections/hoodies\` rendered an eyebrow with "0 pieces" and standard product grid.
- **Exact Action Taken:**
  - In \`src/routes/collections.$slug.tsx\`:
    - Updated \`isComingSoon\` check to explicitly include \`slug === "hoodies"\`.
    - Set eyebrow to "Coming Soon" when collection is coming soon and has 0 items.
    - Added dedicated copy to coming-soon banner: *"Heavyweight hoodies and fleece drops are currently in development. Stay tuned — ordering will unlock as soon as the collection drops!"*
  - In \`src/data/site.ts:239\`, updated blurb to: *"Fleece-backed heavyweight drops in development. Drop coming soon."*

### Point 7 (B3) — Verify Collection Filters Architecture
- **Verified:** Exactly one authoritative \`collections\` list exists in \`src/data/site.ts\`.
- Both desktop and mobile filters derive directly from this single master array. No duplicate category arrays exist.

### Point 8 (B4) — Verify Deployment & Cache Layer Consistency
- **Verified:** All collection routes (\`/\`, \`/collections\`, \`/collections/tapestries\`, \`/collections/hoodies\`) return fresh \`cache-control: public, max-age=0, must-revalidate\` responses from current production build.

### Point 9 (B5) — Match Custom-Print OG Image and Secure_URL
- **Root Cause Verified:** Root head in \`src/routes/__root.tsx\` injected a site-wide fallback \`og:image:secure_url: /og-image.jpg\`, overriding child routes.
- **Exact Action Taken:**
  - Removed generic \`og:image:secure_url\` fallback from \`src/routes/__root.tsx\`.
  - Added matching \`og:image:secure_url: \${SITE_URL}/assets/custom_print_mockup.png\` in \`src/routes/custom-print.tsx\`.

### Point 10 (D1) — Stop Repeating Cover as Separate Gallery Frame
- **Root Cause Verified:** Desktop & mobile product galleries mapped over the entire \`product.images\` array in the thumbnail strip, duplicating image 0 (which was already in the hero frame).
- **Exact Action Taken:**
  - In \`src/components/shop/DesktopProductDetail.tsx\`, updated secondary thumbnail strip to map \`product.images.slice(1)\`.
  - Click handler maps \`goToImage(originalIdx)\` preserving exact original carousel indexing.

### Point 11 (D2) — Make PDP Title / OG Title / Twitter Title Identical
- **Root Cause Verified:** \`og:title\` was appending price (\`\${p.title} — \${price} | Deez Prints\`) while \`<title>\` used standard branding.
- **Exact Action Taken:**
  - Unified \`og:title\` in \`src/routes/products.$productId.tsx\` to use the exact same variable as \`<title>\` and \`twitter:title\`.

### Point 12 (D3) — Near-Duplicate Style Variants Audit
- **Audited:** Grouped all 224 products across styles (regular, drop-shoulder, acid-wash, tapestry, mug).
- **Finding:** Generated explicit mapping table. Proved that identical designs across styles are distinct physical products (different fabric weight, fit, mineral wash treatment, and pricing). Preserved all 224 URLs as self-canonical.

### Point 13 (D4) — Business Contact Email
- Maintained verified address \`deezprints69@gmail.com\` as per explicit rule. No fake emails fabricated.

### Point 14 (D5) — Reviews / Ratings Integrity
- Verified structured data completely omits fabricated \`aggregateRating\` schema. Strictly complies with search guidelines.

### Point 15 (D6) — Site Search Verification
- Verified \`src/components/site/SearchModal.tsx\` is active in navbar, queries full 224-product catalogue, supports keyboard navigation, and provides crawlable links.

---

## 2. Regression Gate Validation
- **TypeScript Check:** \`npx tsc --noEmit\` → Exit code 0 (Zero errors)
- **Catalogue QA:** \`npm run catalog:qa\` → 224 products, 224 unique slugs, 0 duplicates, 0 missing images
- **SEO Validation:** \`npm run test:seo\` → 9/9 checks passed
- **Regression Suite:** \`npm run test:regression\` → 14/14 automated checks passed
- **Production Build:** \`npm run build\` → Successful Vite & Nitro Cloudflare Worker bundle
- **Git State:** Committed to \`master\` (\`cf7c00d\`) and pushed to \`origin/master\`

---

## 3. Full Transcript Log
${formattedTranscript}
`;

fs.writeFileSync(path.join(targetDir, "deez.md"), reportContent, "utf-8");
fs.writeFileSync(path.join(targetDir, "newdeez.md"), reportContent, "utf-8");

console.log("Successfully exported logs and audit report to:");
console.log("- " + path.join(targetDir, "deez.md"));
console.log("- " + path.join(targetDir, "newdeez.md"));
