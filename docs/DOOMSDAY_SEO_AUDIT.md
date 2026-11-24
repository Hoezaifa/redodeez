# Deez Prints — Doomsday Drop SEO Audit & Keyword Map

**Date:** 2026-11-25  
**Production Domain:** `https://deezprints.com`  
**Stack (Verified):** TanStack Start + React 19 + TanStack Router + Nitro + Tailwind CSS v4 + Prisma / Neon PostgreSQL (optional product overrides merged in `src/data/products.ts`)  
**Doomsday Collection Route:** `/doomsday` (`src/routes/doomsday.tsx`)  
**Published Doomsday Products Discovered:** **42** active products across **13** distinct artwork designs  
**Image Audit:** **84/84** Cloudinary product gallery URLs returned HTTP 200; all 13 unique front/back artwork sets were visually inspected directly.

---

## 1. Architecture & Source-of-Truth Findings

| Area | Source of Truth | Current State |
|---|---|---|
| Routing | File-based TanStack Router (`src/routes/`) | `/doomsday`, `/products/$productId`, `/collections/`, `/collections/$slug`, `/sitemap.xml` |
| Product Catalog | `src/data/products.ts` (+ DB override merge via `getProducts()`) | 42 published Doomsday products (`12` drop-shoulder, `11` acid-wash, `10` hoodies, `9` acid-wash-hoodies) |
| Collection Definitions | `src/data/site.ts` (`collections[]`) | `drop-shoulder`, `acid-wash`, `hoodies`, `acid-wash-hoodies` all `ACTIVE`; `/doomsday` is a standalone route |
| Metadata Generator | `src/lib/seoMeta.ts` (`productMeta`, `collectionMeta`) | Used by `src/routes/products.$productId.tsx` `head()` |
| Normalized SEO Model | `src/data/productSeoData.ts` | Used by product feeds & SEO utilities |
| Structured Data | `src/lib/structuredData.ts` | `productSchema`, `breadcrumbSchema`, `organizationSchema`, `websiteSchema` |
| Image ALT Helper | `src/lib/utils.ts` (`getProductImageAlt`) | Prioritizes `product.imageAlts[index]`, falls back to filename/subcategory template |
| Sitemap | `src/routes/sitemap[.]xml.ts` | Dynamic XML + `<image:image>` served at `/sitemap.xml` |
| Robots | `public/robots.txt` | Static file served at `/robots.txt` |

### Verified Store Policies & Garment Specs (from `src/data/site.ts` — No Invented Claims)
- **Location:** Karachi, Pakistan (online streetwear & custom DTF printing studio; no physical retail showroom claimed).
- **Shipping:** Karachi delivery Rs. 200 via rider (free Karachi delivery on orders above Rs. 5,000); nationwide Pakistan courier delivery Rs. 450. Delivery 3–5 business days.
- **Returns/Exchanges:** 7-day exchange for defective, wrong item, or wrong size sent.
- **Verified Sizes:**
  - Drop Shoulder Tees: `S, M, L, XL` (Chest 21"–24", Length 27"–30")
  - Acid Wash Tees: `S, M, L` only (Chest 22"–24", Length 28"–30")
  - Normal Hoodies: `S, M, L, XL` (Chest 20"–23", Length 26"–29")
  - Acid Wash Hoodies: `S, M, L` only (Chest 22"–24", Length 27"–28")
- **Verified Licensing:** Products are fan-inspired graphic streetwear; **no claim of official Marvel licensing** is made anywhere.

---

## 2. Critical SEO Bugs Identified

1. **Hoodies & Acid Wash Hoodies receive `"Regular Fit T-Shirt"` in SEO titles and descriptions (`src/lib/seoMeta.ts`):**
   - `productMeta()` checks `isTapestry`, `isMug`, `isAcidWash` (`acid-wash`), `isDropShoulder` (`drop-shoulder`), and falls through to `else: "Regular Fit T-Shirt"` for **all 19 hoodies** (`hoodies` and `acid-wash-hoodies`).
   - `cleanDesign` regex did not strip `Acid Wash Hoodie` / `Hoodie` suffixes, producing malformed titles such as `Doctor Doom Throne Hoodie Regular Fit T-Shirt in Pakistan | Deez Prints`.
2. **`getProductImageAlt()` misclassifies `acid-wash-hoodies` as `"premium cotton regular tee"` (`src/lib/utils.ts`):**
   - Also claims `"240 GSM"` on drop-shoulder tees even though `productSeoData.ts` intentionally leaves drop-shoulder GSM blank, and `ProductCard.tsx` ignores `getProductImageAlt()` and `product.imageAlts`.
3. **`/doomsday` is completely missing from `/sitemap.xml` (`src/routes/sitemap[.]xml.ts`):**
   - `/doomsday` is neither in `staticPaths` nor in `collections[]`, so Googlebot cannot discover `/doomsday` from the sitemap.
   - `sitemap[.]xml.ts` also did not filter by `VISIBLE_SUBCATEGORIES`.
4. **`public/robots.txt` is missing `OAI-SearchBot` allow rule and non-public route disallows:**
   - Needs explicit `User-agent: OAI-SearchBot` / `Allow: /` and disallows for `/cocnballs`, `/cart`, `/checkout`, `/account`, `/wishlist`.
5. **`/doomsday` collection page SEO & crawlability gaps (`src/routes/doomsday.tsx`):**
   - Missing Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter card tags.
   - Missing `CollectionPage` / `ItemList` and `BreadcrumbList` JSON-LD.
   - Because the default tab is `Featured (13)`, only 13 of 42 products have `<a href="/products/...">` links in initial server-rendered HTML; the other 29 products are only revealed via client-side React tab clicks.
6. **`src/data/productSeoData.ts` gaps:**
   - Marvel `FRANCHISE_PATTERNS` missing `cyclops`, `cyclopes`, `x-men`, `avengers`, `doomsday` and character `Cyclops`.
   - `deriveDesignKey` missing `acid-wash-hoodie` prefix stripping.
   - `imageAlt` generator labels hoodies as `"t-shirt in Black"`.
   - `sizes` hardcoded to `["S", "M", "L", "XL"]` even for Acid Wash (`S, M, L`).
7. **`src/lib/structuredData.ts` material & category inaccuracies:**
   - Hardcoded `material: "100% Cotton"` for all non-tapestry products (including hoodies and cotton-blend tees).
   - `category` did not distinguish `Acid Wash Hoodies` from `Hoodies`.
8. **Product descriptions & ALT text:**
   - All 42 Doomsday products lacked curated `imageAlts` arrays and had short 2-sentence descriptions (some written before visual inspection of front artwork — e.g. `Doom's Ascension` front has the `AVENGERS DOOMSDAY` logo, `Doom Reign Black Hoodie` front has the green metallic Avengers `A` emblem, `Doom's Visage` has gothic `DOCTOR DOOM` forehead lettering and green horned chest emblem).

---

## 3. Complete Visual Inspection Inventory (13 Unique Designs / 42 Products)

All 84 Cloudinary URLs returned HTTP 200. Visual inspection of front and back artwork:

| # | Design Key | Visual Front Artwork | Visual Back Artwork | Garments & Prices (PKR) |
|---|---|---|---|---|
| 1 | `dooms-visage` | Minimalist bright-green horned mask emblem centered on upper chest | Distressed monochrome Doctor Doom iron mask with neon-green flame eyes, vertical script down nose bridge, and white gothic `DOCTOR DOOM` forehead lettering | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 2 | `cyclopes-x-doomsday` | Distressed circular yellow-and-red `X` emblem on chest | Comic illustration of Cyclops kneeling in blue-and-yellow suit firing a tall crimson optic blast upward with glowing yellow X-Men crest | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 3 | `doctor-doom-throne` | Compact stylized green horned mask emblem on upper chest | Doctor Doom seated on carved stone throne above skulls in green cloak and silver armor holding blue energy; white `DR. DOOM` serif text and Latveria bio on left | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 4 | `cyclops-doomsday` | Compact chest graphic of Cyclops firing a vertical red optic blast with yellow X emblem | Bold distressed yellow stacked typography `TO ME, MY X-MEN` accented with electric blue energy streaks | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 5 | `dooms-ascension` | Metallic silver-and-green `AVENGERS DOOMSDAY` title logo on chest | Painterly side-profile Doctor Doom looking upward in tattered emerald hood with gold clasp and silver mask, dissolving into paint splatters | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 6 | `doctor-doom-iron-mask` | Crisp white angular `DR. DOOM` wordmark on upper chest | High-contrast white-and-black ink portrait of Doctor Doom's iron mask under emerald hood backed by oversized white `DOOM` display lettering | Drop Shoulder (2200), Acid Wash (2400), Hoodie (2000), Acid Wash Hoodie (3000) |
| 7 | `doctor-doom-avengers-doomsday` | Square split-portrait chest panel (`HELL ANSWERS TO ME` / `FOR I AM DOOM`) contrasting green-lit iron mask and amber human face | Armored, green-hooded Doctor Doom with arms crossed in front of oversized white `DOOMSDAY` block lettering | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 8 | `avengers-doomsday-doctor-doom-face` | Metallic silver-and-green `AVENGERS DOOMSDAY` logo on chest | Distressed split-face graphic blending riveted metallic iron mask (right) with bruised, bloodied human face (left) inside sketched green hood | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 9 | `doctor-doom-latverian-ruler` | White serif `DOCTOR DOOM` wordmark across chest | Classic comic-ink Doctor Doom standing with armored gauntlets crossed in deep green cloak, topped by white serif `DOCTOR DOOM` lettering | Drop Shoulder (1900), Acid Wash (2000), Hoodie (2000), Acid Wash Hoodie (3000) |
| 10 | `doctor-doom-reigns` | Minimalist black horned mask emblem on white chest | Shadowed green-cloaked Doctor Doom rising from lower right on white tee with black `DR. VICTOR DOOM` and Japanese katakana (`ドクター・ドゥーム`) text | Drop Shoulder White (1900) |
| 11 | `doctor-doom-reign-black` | Green-lit metallic Avengers `A` emblem on black hoodie chest | Tall distressed green `DOOM` block lettering with white lightning streaks behind monochrome hooded Doctor Doom portrait | Hoodie Black (2000) |
| 12 | `dr-doom` | Bold white `DOOM` block lettering overlapped by dark green hooded Doctor Doom silhouette | Large painted side-profile portrait of Doctor Doom in dark green gold-trimmed cloak and weathered iron mask rising from lower-left hem | Drop Shoulder (1900), Acid Wash (2000) |
| 13 | `doctor-doom-victor-von-doom` | Stacked white `DOCTOR DOOM` block lettering on left paired with cinematic silver mask and dark green hood close-up on lower right | Unprinted blank black garment back (front-only print) | Drop Shoulder (1900), Acid Wash (2000) |

---

## 4. Collection & Anti-Cannibalization Keyword Strategy

- **Parent Hub (`/doomsday`):** Targets `Avengers Doomsday T-shirts Pakistan` (primary) + `Doctor Doom T-shirts Pakistan`, `Doctor Doom hoodies Pakistan`, `Avengers Doomsday shirts Karachi`, `Cyclops X-Men graphic tees`, `Marvel-inspired streetwear Pakistan`.
- **Product Pages (`/products/<id>`):** Every one of the 42 products gets a **unique primary keyword** combining its distinct artwork identity + exact garment type (`drop shoulder tee` / `acid wash tee` / `hoodie` / `acid wash hoodie`) + `Pakistan`, preventing cannibalization between sibling fits and between distinct Doctor Doom / Cyclops designs.
