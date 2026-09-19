# DEEZ PRINTS — SEO RECONNAISSANCE REPORT (T0 / T1)

**Date:** September 2026  
**Status:** COMPLETE & VERIFIED

---

## 1. Architecture & Technology Stack

- **Framework:** TanStack Start (`@tanstack/react-start` v1.168.26)
- **Router:** TanStack Router (`@tanstack/react-router` v1.170.16)
- **Runtime & Bundler:** React 19.2.0, Vite 5.2.0, Nitro 3.0.260603-beta
- **Deploy & Hosting:** Vercel (`vercel.json` config with edge caching and security headers)
- **Database & Data Layer:** Static catalog in `src/data/products.ts` (224 active products) + Neon Serverless PostgreSQL with Prisma (`prisma/schema.prisma`) for orders/sessions.
- **Rendering Mode:** Full Server-Side Rendering (SSR). TanStack Start compiles server handlers for routes, providing initial raw HTML including `<head>` meta tags, canonical link, single `<h1>`, main product text, and JSON-LD structured data. Client-only SPA migration is NOT needed (T1: Not Needed).

---

## 2. Head Tags & Metadata Architecture

- **Root Layout:** `src/routes/__root.tsx` renders default fallback meta, viewport, charset, Pinterest verification (`p:domain_verify`), and site-wide JSON-LD (`organizationSchema`, `websiteSchema`).
- **Product Routes:** `src/routes/products.$productId.tsx` exports a route `head` function rendering dynamic title, meta description, OpenGraph tags, Twitter cards, canonical URL (`${SITE_URL}/products/${p.id}`), and mounts `productSchema()`.
- **Collection Routes:** `src/routes/collections.$slug.tsx` exports a route `head` function with dynamic title, description, canonical link, and dynamic robots tag (e.g., `noindex, follow` for utility query parameters or empty collections).
- **Static Pages:** Routes under `src/routes/*.tsx` (about, contact, trust, faq, shipping, returns, custom-print, guides) define individual canonical URLs using centralized `SITE_URL`.

---

## 3. Legacy Redirects & Canonical Status

- **Config Location:** `vercel.json` contains verified permanent 301 redirects:
  - `/collections/wall-art` -> `/collections/tapestries` (301)
  - `/products/tshirt-acid-4` -> `/products/dp-acid-wash-berserk-skull-blade` (301)
  - All old `tshirt-drop-*` and `tshirt-acid-*` legacy URLs have permanent redirects mapped in both `vercel.json` and router loaders (`src/routes/products.$productId.tsx`).
- **HTTP 404 Behavior:** Nonexistent routes trigger TanStack Router `notFound()` which renders the dedicated 404 view with HTTP 404 response in SSR.

---

## 4. Sitemap & Feed Architecture

- **Sitemap Generator:** `src/routes/sitemap[.]xml.ts` dynamically serves `/sitemap.xml`.
  - Filters out unmapped products and ensures all URLs match the canonical `SITE_URL`.
  - Removed outdated `<priority>` and `<changefreq>` tags.
  - Image sitemap entries currently contain `<image:title>`, which will be removed per 2026 Google guidelines (T2).
- **Merchant Center Feed:** `src/routes/products-feed[.]xml.ts` serves an XML RSS 2.0 / Google Merchant Center product feed.

---

## 5. Image Hosting & Delivery

- Primary image assets reside on Cloudinary:
  - Account 1: `res.cloudinary.com/okcxaese/`
  - Account 2: `res.cloudinary.com/dsjnjbsgi/`
- Tapestry assets: Self-hosted WebP files in `public/assets/products/tapestries/`.
- OG Images utilize Cloudinary on-the-fly transformations (`c_fill,w_1200,h_630,g_auto,f_jpg,q_auto`).

---

## 6. Scope Guardrails Confirmation

- **Coming Soon Flag:** Stored in `src/data/site.ts` (`collections[].status`). Confirmed: **COMING SOON IS NOT A BUG**. It is preserved verbatim per owner override.
- **Frontend Hard Lock:** No visual UI redesign, no fake collections, no mass-generated thin pages.
