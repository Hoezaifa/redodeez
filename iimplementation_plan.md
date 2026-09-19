# Master SEO Execution Plan — Deez Prints (T0 to T24)

This implementation plan executes the authoritative specification in [deezprints-seo-master-antigravity.md](file:///d:/redo%20deez/deez-prints-main/deezprints-seo-master-antigravity.md).

## Core Directives & Hard Locks (Owner Scope Override)

1. **Frontend / Visual Scope Hard Lock**:
   - **NO** visual layout, color, typography, navigation, card, button, or checkout redesign.
   - **NO** new visible collection sections, footer keyword spam blocks, or city landing-page farms.
   - **NO** mockups created merely to fill collections; **NO** products added solely for SEO.
   - The **ONLY** intentional visible content expansion is the **product-specific description** on each PDP.
2. **"Coming Soon" State Untouched**:
   - The collection "COMING SOON" state is intentional brand presentation. Do NOT remove badges or alter category detection logic.
3. **Fact Guardrails**:
   - Never invent GSM, materials, turnaround, fake reviews, or fake ratings. Only use verified values from `SEO_FACTS.md` and live catalog records.
   - Mark any unconfirmed field as `[OWNER CONFIRMATION REQUIRED]`.

---

## User Review Required

> [!IMPORTANT]
> - All visible changes are restricted strictly to individual product descriptions.
> - Google Merchant Center and OpenAI product feeds will be fully generated with canonical URLs, accurate apparel attributes, and validation scripts.
> - The 14 existing second-pass regression tests will continue to run and pass.

---

## Proposed Changes

### Phase 1: Foundations, Reconnaissance & Data Normalization (T0, T3, T4, T23)

#### [NEW] [SEO_FACTS.md](file:///d:/redo%20deez/deez-prints-main/SEO_FACTS.md)
- Store all verified factual claims: 100% cotton, DTF printed in Karachi, delivery rates (Karachi Rs. 200, nationwide Rs. 450, free over Rs. 5,000), 7-day exchange window, Drop Shoulder 240+ GSM, Regular 180-200 GSM, Hoodies 350+ GSM, Acid Wash mineral wash.

#### [NEW] [SEO_RECON.md](file:///d:/redo%20deez/deez-prints-main/SEO_RECON.md)
- Document architecture: TanStack Start (Nitro server + React 19 + Vite), SSR/prerender status, HTTP response status verification, and header analysis.

#### [NEW] [seoMeta.ts](file:///d:/redo%20deez/deez-prints-main/src/lib/seoMeta.ts)
- Centralize metadata generation for Home, Collections, Products, and Static pages.
- Enforce the formula: `{design} {franchise?} {fitLabel} T-Shirt in Pakistan | Deez Prints`.
- Fix the bug resulting in `Cinema Collection Collection — Deez Prints`.
- Prevent repeated adjacent words (e.g. `Acid Wash ... | ACID WASH`).

#### [NEW] [productSeoData.ts](file:///d:/redo%20deez/deez-prints-main/src/data/productSeoData.ts)
- Normalized product SEO matrix defining `designKey`, `designName`, `franchise`, `characters[]`, `fit`, `gsm`, `material`, `printMethod`, `color`, `sizes[]`, `price`, `availability`, `seoTitle`, `metaDescription`, and `description`.
- Generates [franchise_mapping.csv](file:///d:/redo%20deez/deez-prints-main/franchise_mapping.csv) mapping all 224 products without guessing unconfirmed franchises.

---

### Phase 2: Product Description SEO & Quality Gate (T5, T16, T22)

#### [MODIFY] [products.ts](file:///d:/redo%20deez/deez-prints-main/src/data/products.ts)
- Enrich all 224 live catalog items with tailored, factual, high-information descriptions:
  - Sentence 1: Direct entity definition (`{Character} {Franchise} {Design} is an oversized drop-shoulder graphic T-shirt from Deez Prints.`).
  - Garment details: Verified fabric, fit, and print method.
  - Sizing and care guidance.
  - Contextual link to sibling fits or relevant collection.
  - Zero generic marketing fluff (banning "elevate your wardrobe", "make a statement", etc.).

#### [NEW] [validate-product-descriptions.ts](file:///d:/redo%20deez/deez-prints-main/scripts/validate-product-descriptions.ts)
- Automated gate checking:
  - Duplicated sentences or similarity spikes across descriptions.
  - Presence of forbidden superlatives ("#1", "best", "official", "licensed").
  - Fabricated GSM or wash count claims.
  - Empty or missing descriptions.

---

### Phase 3: Feeds, Sitemaps & Structured Data (T2, T6, T12, T19A, T19B)

#### [MODIFY] [sitemap[.]xml.ts](file:///d:/redo%20deez/deez-prints-main/src/routes/sitemap%5B.%5Dxml.ts)
- Remove deprecated `<image:title>` tags per 2026 Google Image Sitemap guidelines.
- Ensure all emitted URLs are canonical 200 URLs with real/valid `lastmod` timestamps or omitted if unknown.

#### [MODIFY] [products-feed[.]xml.ts](file:///d:/redo%20deez/deez-prints-main/src/routes/products-feed%5B.%5Dxml.ts)
- Add `g:canonical_link`, apparel attributes (`g:age_group`, `g:gender`, `g:color`, `g:size`), and `g:shipping` data for Google Merchant Center Pakistan.

#### [NEW] [openai-feed.ts](file:///d:/redo%20deez/deez-prints-main/src/routes/openai-products-feed[.]json.ts)
- Implement discovery feed conforming to OpenAI ChatGPT Merchant Feed specification:
  - `item_id`, `title`, `description`, `url`, `brand`, `seller_name`, `image_url`, `availability`, `price`.

#### [NEW] [validate-merchant-feed.ts](file:///d:/redo%20deez/deez-prints-main/scripts/validate-merchant-feed.ts)
- Cross-validate Merchant Center feed against live product data (verifying title, price, currency, availability, and image URLs).

#### [NEW] [IndexNow & Bing Support](file:///d:/redo%20deez/deez-prints-main/scripts/ping-indexnow.ts)
- Generate IndexNow key file in `public/` and deploy ping utility.

---

### Phase 4: Audits, Ledgers & Regression CI (T11, T13, T14, T17, T18, T20, T24)

#### [NEW] [seo-check.mjs](file:///d:/redo%20deez/deez-prints-main/scripts/seo-check.mjs)
- Standalone CI script checking raw HTML responses for status 200, canonical matching, single H1, valid JSON-LD, non-empty alt text, and 404 response on bogus URLs.

#### [NEW] [Audit & Ledger Documentation](file:///d:/redo%20deez/deez-prints-main/seo/)
- `seo/faceted-navigation-audit.md` (T13 URL family inventory)
- `seo/internal-link-audit.md` (T14 graph & orphan report)
- `seo/local-seo-karachi.md` (T17 local Karachi foundation)
- `seo/ai-recommendation-test-set.md` (T18 prompt benchmark set)
- `seo/query-ledger.csv` (T20 real query tracking ledger)
- `seo/competitor-keyword-gaps.csv` (T20 market language gap matrix)

---

## Verification Plan

### Automated Tests
- Run Second-Pass Regression Suite:
  ```powershell
  npm run test:regression
  ```
- Run SEO & Sitemap Validation Suite:
  ```powershell
  npm run test:seo
  ```
- Run Product Description Quality Gate:
  ```powershell
  npx tsx scripts/validate-product-descriptions.ts
  ```
- Run Merchant Center Feed Validator:
  ```powershell
  npx tsx scripts/validate-merchant-feed.ts
  ```
- Run Full SEO CI Check:
  ```powershell
  node scripts/seo-check.mjs
  ```
- Run Project Build:
  ```powershell
  npm run build
  ```

### Manual Verification
- Verify that product pages render the new descriptive copy cleanly without affecting layout, cards, or styling.
- Verify `sitemap.xml`, `products-feed.xml`, and `openai-products-feed.json` responses in local dev server or preview build.
