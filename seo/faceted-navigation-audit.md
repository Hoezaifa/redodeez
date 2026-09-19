# Deez Prints — Faceted Navigation & Parameter Crawl Audit (T13)

**Specification Reference:** Google Faceted Navigation Best Practices (`https://developers.google.com/crawling/docs/faceted-navigation`)  
**Scope:** Parameter URL families, indexing policy, canonical targets, and crawl control.

---

## 1. URL Family Inventory & Decision Matrix

| URL Family Pattern | Example URL | Purpose | HTTP Status | Indexing Directive | Canonical Target | Sitemap Inclusion |
|---|---|---|---|---|---|---|
| **A. Primary Collection** | `/collections/acid-wash` | Core commercial category landing | `200 OK` | `index, follow` | Self (`/collections/acid-wash`) | **YES** |
| **B. Subcategory / Aesthetic Filter** | `/collections?category=t-shirts&style=drop-shoulder` | Dynamic facet selection | `200 OK` | `noindex, follow` | Closest canonical collection (`/collections/drop-shoulder`) | **NO** |
| **C. Sort Parameters** | `/collections/acid-wash?sort=price&dir=asc` | User-driven sorting | `200 OK` | `noindex, follow` | Clean collection URL (`/collections/acid-wash`) | **NO** |
| **D. Secondary Pagination** | `/collections/anime-archive?page=2` | Pagination beyond page 1 | `200 OK` | `noindex, follow` | Base collection URL (`/collections/anime-archive`) | **NO** |
| **E. On-Site Search Queries** | `/collections?q=zoro` | Internal keyword search | `200 OK` | `noindex, follow` | `/collections` | **NO** |
| **F. Marketing / UTM Parameters** | `/products/dp-acid-wash-zoro-2?utm_source=instagram` | Campaign tracking | `200 OK` | `index, follow` | Clean PDP canonical (`/products/dp-acid-wash-zoro-2`) | **NO** |
| **G. Private / Checkout Routes** | `/cart`, `/checkout`, `/account` | User transactional state | `200 OK` | `noindex, nofollow` (via `X-Robots-Tag`) | N/A | **NO** |
| **H. Nonexistent / Bogus Slugs** | `/products/not-a-real-item-xyz` | Broken link / 404 testing | `404 Not Found` | `noindex` | N/A | **NO** |

---

## 2. Crawl Efficiency & Infinite Spaces Mitigation

1. **Parameter Stripping in Canonical Links:**
   Every route in `src/routes/collections.$slug.tsx` strips `sort`, `dir`, and `page` from the `<link rel="canonical">` element, pointing strictly to `${SITE_URL}/collections/${slug}`.
2. **Dynamic Robots Directives:**
   When sorting or filtering parameters are present, `collections.$slug.tsx` dynamically emits `{ name: "robots", content: "noindex, follow" }`.
3. **Robots.txt Hygiene:**
   `robots.txt` does **NOT** disallow parameter URLs (which would prevent Google from crawling and seeing `noindex`). It allows discovery while headers and tags enforce indexing boundaries.
4. **Sitemap Purity:**
   `sitemap.xml` includes **zero** query strings, **zero** filter permutations, and **zero** paginated secondary pages.
