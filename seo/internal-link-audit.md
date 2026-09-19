# Deez Prints — Internal Link Graph & Orphan Page Audit (T14)

**Specification Reference:** Google Crawlable Links Guide (`https://developers.google.com/search/docs/crawling-indexing/links-crawlable`)  
**Scope:** Internal linking hierarchy, crawl depth, anchor text quality, and orphan page prevention.

---

## 1. Information Hierarchy Architecture

The internal linking structure follows a strict 3-tier navigable graph:
```
Tier 1: Homepage (/) & Global Navigation (Header / Footer)
   │
   ├── Tier 2: Core Collections & Hubs
   │     ├── /collections/anime-archive (148 items)
   │     ├── /collections/acid-wash (60 items)
   │     ├── /collections/drop-shoulder (45 items)
   │     ├── /collections/t-shirts (Regular tees)
   │     ├── /collections/tapestries (33 items)
   │     └── /custom-print (Karachi DTF service hub)
   │
   └── Tier 3: Product Detail Pages (PDPs — 224 active products)
         └── Contextual cross-links via designKey & related products
```

---

## 2. Inbound Connectivity & Orphan Analysis

- **Total Catalog Products:** 224
- **Products Reachable via Crawlable `<a href>` from Primary Collections:** 224 (100%)
- **Identified Orphan Pages (0 internal links):** 0
- **Contextual PDP Cross-Linking:**
  - PDPs dynamically present "Related Products" filtered by matching category or aesthetic.
  - Sibling garments sharing the same artwork can be linked across Regular, Drop Shoulder, and Acid Wash fits using `designKey`.
  - Product descriptions incorporate natural contextual anchor references to collections and care guides.

---

## 3. Informational-to-Commercial Bridges

- `/guides/streetwear-printing-and-care` links to:
  - `/custom-print` (Karachi DTF custom printing)
  - `/collections/acid-wash` (Washing & care guidance)
  - `/collections/drop-shoulder` (GSM and fabric weight context)
- `/guides/tapestry-decor-guide` links to:
  - `/collections/tapestries` (Wall art & satin flags)
- Global Footer & Header provide direct crawlable anchors for all primary commercial paths.
