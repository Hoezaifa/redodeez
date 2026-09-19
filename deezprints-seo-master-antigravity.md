# DEEZ PRINTS — MASTER SEO EXECUTION SPEC FOR ANTIGRAVITY

**Prepared:** 20 September 2026  
**Purpose:** Single master instruction pack for Antigravity.  
**Goal:** Maximize legitimate organic search visibility for `deezprints.com` across Google Search, Google Images, Google Merchant Center/free listings, local intent, and Google generative AI search features — without fabricated facts, doorway pages, spam, fake reviews, paid-link manipulation, or other shortcuts that can damage the domain.

## 0. HOW TO USE THIS FILE

- Treat this file as the master execution specification.
- Do not silently skip a task because it looks repetitive.
- Do not replace evidence-backed instructions with generic SEO advice.
- Do not invent missing facts, mappings, measurements, reviews, product attributes, pricing, shipping times, or legal claims.
- Preserve all existing public URLs unless a verified migration requires a permanent redirect.
- Work in small, reviewable branches.
- For every task, show a short plan before modifying files, then make the changes, then run the verification commands and paste the real output.
- Never claim a check passed unless the check was actually run.
- Keep a clear distinction between:
  - `[SOURCE]` = material preserved from the original two documents.
  - `[RESEARCH]` = new additions or corrections based on current official documentation checked on 20 Sep 2026.
  - `[OWNER]` = a fact or decision only the owner can confirm.
  - `[VERIFY]` = a technical condition that must be tested before acting.
- The objective is higher visibility, not a fake promise of “#1” or “guaranteed ranking.” Google explicitly says meeting technical requirements or adding structured data does not guarantee indexing or serving.

---


# 0A. CURRENT OWNER SCOPE OVERRIDE

- Follow the dedicated “MASTER SCOPE OVERRIDE” block below whenever it conflicts with an older source instruction.
- The owner has explicitly said the “COMING SOON” collection state is intentional and must NOT be changed for SEO.
- The owner has explicitly limited visible frontend changes to product-specific descriptions.
- The original task appendices remain preserved verbatim for traceability, but conflicting execution steps are superseded by the current owner scope.

# MASTER SCOPE OVERRIDE — CURRENT OWNER INSTRUCTIONS (SUPERSEDES CONFLICTING SOURCE TASKS)

This section is authoritative for the CURRENT implementation. The original documents remain verbatim later in this file for audit/history, but Antigravity must follow this scope override when an older source instruction conflicts with it.

## A. FRONTEND / VISUAL SCOPE — HARD LOCK

- DO NOT redesign the frontend.
- DO NOT change the visual layout, typography, colors, cards, navigation appearance, collection-grid presentation, hero sections, badges, buttons, checkout UI, product-gallery UI, or overall page composition.
- DO NOT add new visible collection sections, “SEO text blocks”, giant footer keyword blocks, “Popular Searches” blocks, city landing-page blocks, franchise landing-page blocks, or new visual modules.
- DO NOT create mockups merely to make a collection look populated.
- DO NOT add products solely for SEO.
- DO NOT create new franchise/category pages just to target keywords.
- The ONLY intentional visible-content expansion allowed in this scope is the product-specific description on each actual product page.
- Invisible/technical SEO work is allowed: HTML head metadata, canonical tags, robots directives, JSON-LD, sitemaps, feed files, image metadata/alt text, image URL handling, redirects, crawl rules, and backend validation.
- Existing visible H1/product display names should NOT be rewritten merely to insert keywords. Only correct an actually broken/missing/duplicate H1 when technically necessary, and preserve the existing visual wording otherwise.
- New contextual links may be added only inside the newly/updated product descriptions, because those descriptions are the one approved visible-content change.

## B. “COMING SOON” IS NOT A BUG — DO NOT TOUCH IT

- The collection “COMING SOON” state is intentional product/brand presentation and is NOT an SEO error for this project.
- Some collections may automatically surface a small number of matching existing products (for example 2–6). That is also intentional and is NOT evidence that the site needs mockups, filler products, or collection reconstruction.
- DO NOT remove the “COMING SOON” label.
- DO NOT change the automatic category-detection logic merely because a collection has only a few products.
- DO NOT create or source mockups for Comic Universe, Minimal Drops, Cinema Collection, or any other collection just to satisfy an SEO checklist.
- DO NOT cross-list products merely to make a collection appear larger.
- DO NOT change the sitemap/noindex state of a collection solely because it has a “COMING SOON” label.
- Evaluate a collection for indexing using its actual URL, HTTP status, canonical, content quality, and real inventory—not the marketing badge.
- The original T10 “Coming soon and thin-collection cleanup” is therefore SUPERSEDED for the current scope. Do not execute the “remove stale Coming Soon flags” instruction from Appendix A/B.
- The original recommendation to build visible collection copy/franchise hubs is also SUPERSEDED for the current scope unless the owner later explicitly requests visible collection-content expansion.

## C. SEO OBJECTIVE FOR THIS PASS

Primary goal: maximize qualified organic discovery and search appearance for the EXISTING catalogue and EXISTING URLs, especially:
- anime t-shirts in Pakistan
- anime streetwear in Pakistan
- oversized / drop-shoulder t-shirts in Pakistan
- character/franchise + t-shirt queries
- acid-wash / graphic tee queries
- anime/movie tapestry queries
- custom t-shirt printing / DTF printing in Karachi and Pakistan
- long-tail “where to buy / price / fit / size / COD / shipping” shopping queries where the site genuinely satisfies the intent
- product discovery and grounding in Google, Bing/Copilot and ChatGPT shopping/search surfaces where eligible

Do not chase traffic that the product catalogue cannot satisfy.

# 1. NON-NEGOTIABLE EXECUTION GUARDRAILS

- Never invent:
  - GSM.
  - Fabric/material.
  - Sizes.
  - Delivery/turnaround times.
  - Minimum order quantities.
  - Prices.
  - Stock status.
  - Reviews/ratings.
  - Franchise/character mappings.
  - Shipping regions/rates not confirmed by the owner.
  - Returns/refunds conditions not confirmed by the owner.
  - Any business address, phone number, or contact detail not supplied by the owner.
- Use only the live product/data source, confirmed owner data, and `SEO_FACTS.md` for site copy unless this master file explicitly identifies an official external source for a non-product factual requirement.
- Never create fake reviews, fake ratings, fake testimonials, fake “customer quotes,” fake awards, fake press mentions, or fake first-hand experience.
- Never create hundreds of near-identical franchise/character/city pages simply because the query exists.
- Never use hidden text, keyword stuffing, cloaking, doorway pages, scraped text, spun text, or purchased/manipulative links.
- Never create a page whose sole purpose is to funnel users to another page.
- Never use `robots.txt` as a substitute for `noindex` when the goal is to keep a page out of Search; Google needs to crawl a page to see a `noindex` directive.
- Never block a page with `robots.txt` and simultaneously expect Google to process a page-level `noindex` on that blocked URL.
- Never put tracking parameters, session IDs, or arbitrary filter combinations into the canonical URL or sitemap.
- Never change product slugs just to insert keywords.
- Never rename a public URL without a permanent redirect and verification.
- Never add `Product` structured data to a broad collection/category page merely to chase merchant rich results. Product merchant-listing markup belongs on purchasable product pages.
- Never group distinct garment styles as one product variant only because they share a design. Regular Fit, Drop Shoulder, and Acid Wash may be linked with `designKey`, but Merchant Center/Google variant modeling must reflect actual variants, not arbitrary design relationships.
- Never implement `FAQPage` structured data for the purpose of obtaining FAQ rich results; Google has deprecated that rich-result feature as of 7 May 2026. Visible FAQs can still be useful content for users and query coverage.

---

# 2. MASTER PRIORITY ORDER

## P0 — Fix or verify before content expansion

- T0 production reconnaissance.
- Google Search Console ownership/index status.
- Real HTTP status behavior, including bogus URLs.
- Canonical correctness and redirect correctness.
- Sitemap correctness and freshness.
- Raw/rendered availability of title, H1, description, canonical, main content, links, and structured data.
- Remove redirecting/non-canonical URLs from sitemap.
- Fix duplicated titles such as `Collection Collection` and adjacent repeated words.
- Make page titles/H1/meta match real search intent without keyword stuffing.
- Decide which collection/franchise hubs actually deserve indexing.
- Fix any missing or broken critical internal links.

## P1 — High-leverage growth layer

- Confirmed franchise/character data model.
- Unique franchise hubs with real inventory and genuinely useful copy.
- Product structured data + merchant listing eligibility data.
- Variant modeling only where true variants exist.
- Image filename/alt/URL/delivery cleanup.
- Contextual internal linking and orphan-page elimination.
- Tapestry and custom-print topical/service landing pages.
- Google Merchant Center/free listings feed for Pakistan, subject to account eligibility and policy compliance.
- Google Business Profile/local search setup if the business is eligible.
- Real post-purchase review collection.
- First-hand, product-specific content rather than generic AI text.

## P2 — Scale, monitoring, and polish

- SEO regression CI.
- Crawlable faceted navigation rules.
- Query-to-page optimization from Search Console.
- Field Core Web Vitals monitoring plus Lighthouse diagnostics.
- Generative AI visibility monitoring in Search Console.
- Legitimate digital PR/editorial mentions and topical collaborations.
- Content refresh cadence based on real queries, product changes, and customer questions.

**CURRENT SCOPE PRIORITY OVERRIDE:** For this pass, technical SEO + search appearance + product-specific descriptions + product/AI feed readiness outrank visible collection-hub expansion. Do not create collection hubs, mockups, or other visible frontend modules. The “Coming Soon” state is intentional.

---

# 3. CURRENT GOOGLE-RESEARCH CORRECTIONS / UPGRADES

## 3.1 JavaScript / SSR is conditional, not an automatic rewrite

- Google Search currently runs JavaScript with an evergreen Chromium-based renderer.
- JavaScript rendering is supported, but Google documents that server-side/pre-rendering can still be beneficial for speed, crawlability, and compatibility with other bots.
- Therefore:
  - T0 must first establish whether critical SEO content is already available and correctly rendered.
  - Do NOT migrate frameworks merely because a hashed asset name looks like Vite.
  - If raw HTML is incomplete but rendered HTML is correct, assess whether the missing raw HTML creates a real issue before changing the architecture.
  - If critical pages have client-only content that fails in Google rendering, then use the smallest reliable fix.
  - A real HTTP `404` matters separately from whether JavaScript exists.
- Source: `https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`

## 3.2 Merchant Center / free listings is a major additional acquisition surface

- Current Google Merchant Center documentation lists **Pakistan as a beta target country** for Shopping ads/free listings.
- Verify this in the live Merchant Center account before building expectations.
- Build a product feed from the SAME canonical product data source used by the website.
- Do not manually maintain a second contradictory catalogue.
- For apparel, build support for the applicable product attributes, including:
  - `id`
  - `title`
  - `description`
  - `link`
  - `canonical_link`
  - `image_link`
  - `additional_image_link`
  - `availability`
  - `price`
  - `condition`
  - `brand`
  - `color`
  - `size`
  - `age_group`
  - `gender`
  - `item_group_id` for genuine product variants
  - `pattern` where applicable
  - shipping data where required/applicable
- Never invent GTINs or other global identifiers.
- Keep Merchant Center price, availability, title, image, size, color, and landing page information consistent with the live product page.
- Use stable canonical URLs without tracking parameters for the Google Search index link.
- Feed generation should be deterministic and automatically regenerated when product data changes.
- Add a validation job that compares feed values against the rendered product data and reports mismatches.
- Free listings are not guaranteed to display; they are an additional organic product-surface opportunity.
- Sources:
  - `https://support.google.com/merchants/answer/12472394`
  - `https://support.google.com/merchants/answer/13889434`
  - `https://support.google.com/merchants/answer/9340054`
  - `https://support.google.com/merchants/answer/7348545`

## 3.3 Product variant modeling must be semantically correct

- Google supports `ProductGroup` / `Product` structured data for genuine variants such as size, color, material, or pattern.
- But Google Merchant Center documentation explicitly distinguishes different styles/garment types from product variants.
- Therefore:
  - Same design across Regular/Drop Shoulder/Acid Wash can share `designKey` for internal linking and merchandising.
  - Do NOT automatically make all three fits a single `ProductGroup` just because the artwork is identical.
  - Within a single garment style, size/color variants can be grouped when the underlying product model and URLs/data support that relationship.
- Sources:
  - `https://developers.google.com/search/docs/appearance/structured-data/product-variants`
  - `https://support.google.com/merchants/answer/7348545`

## 3.4 Collection pages need Product markup only where it is actually appropriate

- Google says merchant listing product rich results are for pages focused on a single product or variants of the same product.
- Therefore:
  - Product pages: `Product` + `Offer` + other valid product data.
  - Collections: do NOT fake product-page semantics for the whole grid.
  - Collections can use appropriate organization/breadcrumb/site data and should have crawlable product links and useful visible copy.
- Source: `https://developers.google.com/search/docs/appearance/structured-data/merchant-listing`

## 3.5 FAQ content remains useful; FAQ rich-result markup does not

- Keep real FAQs on collection/service pages where they help shoppers.
- Do not add `FAQPage` JSON-LD solely for a Search enhancement that Google deprecated on 7 May 2026.
- Source: `https://developers.google.com/search/updates`

## 3.6 Search Console now has generative-AI visibility reporting

- Google announced dedicated Search Console generative-AI performance reporting in June 2026 and stated it had rolled out worldwide by 31 August 2026.
- Add a recurring measurement step for:
  - AI-feature impressions.
  - Pages appearing in AI features.
  - Countries.
  - Devices where available.
  - Trend over time.
- Do not create `llms.txt` or “AI SEO files” expecting a Google ranking boost; Google’s current guidance says there are no special technical requirements for AI Overviews/AI Mode and specifically says such files do not help Google Search visibility.
- Sources:
  - `https://developers.google.com/search/docs/appearance/ai-features`
  - `https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports`

## 3.7 First-hand, non-commodity content is the real content multiplier

- Do not generate generic 120-word paragraphs with synonyms swapped.
- For each high-value page, add information that could only plausibly come from Deez Prints, such as real product/process details, real fit information, genuine care instructions, original photographs, actual printing workflow details, confirmed shipping details, and real customer questions.
- Do not invent “first-hand” details merely to satisfy this requirement.
- Use AI only as a drafting/structuring aid; the final page must contain genuine useful information and comply with Google’s people-first/spam guidance.
- Sources:
  - `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
  - `https://developers.google.com/search/docs/fundamentals/ai-optimization-guide`
  - `https://developers.google.com/search/docs/fundamentals/using-gen-ai-content`

## 3.8 Faceted navigation can waste crawl resources

- Audit every filter/sort/query URL generated by the shop.
- Do not let infinite combinations become indexable just because the UI can generate them.
- For filters that are NOT intended to rank:
  - Prefer controlling crawling appropriately for the site architecture.
  - Do not depend on `noindex` alone to prevent the crawler from discovering an enormous parameter space.
- For filters that ARE intended to rank:
  - They must have a useful, stable URL.
  - They must provide meaningful content.
  - Duplicate/nonsensical combinations must not become valid indexable pages.
  - Empty/nonexistent filter combinations should return `404` where appropriate.
- Never put arbitrary filtered URLs in the sitemap.
- Source: `https://developers.google.com/crawling/docs/faceted-navigation`

## 3.9 Internal-link graph quality is a measurable asset

- Google uses crawlable links to discover pages and anchor text to understand the linked destination.
- Every valuable indexable URL must be reachable from other pages through normal `<a href>` links.
- Build an orphan-page detector into the SEO checker.
- Prefer contextual descriptive anchors over repeated `Click here` / `View product` anchors.
- Do not over-optimize anchors until they sound unnatural.
- Source: `https://developers.google.com/search/docs/crawling-indexing/links-crawlable`

## 3.10 Image SEO is broader than filenames

- Use descriptive, concise filenames for new image URLs.
- Use descriptive alt text that accurately describes the image and its role.
- Keep images near relevant text.
- Keep image URLs stable and crawlable.
- Image sitemaps can use off-domain image URLs when both domains are verified in Search Console.
- `<image:title>` is deprecated and should not be used.
- Do not force a domain-proxy image system unless it solves a real implementation problem; the critical requirement is a stable, crawlable image URL and verified hosting domain when needed for image sitemaps.
- Sources:
  - `https://developers.google.com/search/docs/appearance/google-images`
  - `https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps`

## 3.11 Core Web Vitals: measure real users, use Lighthouse to diagnose

- Keep the original Lighthouse before/after methodology.
- Also inspect Search Console/Core Web Vitals or CrUX field data when available.
- Do not optimize for a Lighthouse score alone.
- Prioritize user-facing LCP/INP/CLS problems and the actual slowest templates.
- Sources:
  - `https://web.dev/articles/vitals-tools`
  - `https://developers.google.com/search/docs/appearance/page-experience`

## 3.12 Local SEO for Karachi needs real-world eligibility and real business data

- If Deez Prints is eligible for a Google Business Profile, maintain complete and accurate business information.
- Use the real business category, real website URL, real service/operating area, real photos, and genuine reviews.
- Do not stuff the business name with keywords.
- Do not create fake city pages for Lahore/Islamabad/etc. just to rank; city-page farms can become doorway abuse if they are substantially similar and simply funnel users to one destination.
- Google states local ranking is primarily based on relevance, distance, and prominence; prominence can include links and reviews.
- Sources:
  - `https://support.google.com/business/answer/7091`
  - `https://developers.google.com/search/docs/essentials/spam-policies`

---

# 3.13 COMPETITOR SEARCH-INTELLIGENCE — WHAT THE MARKET IS ACTUALLY USING

Current research checked 20 September 2026 found repeated patterns across real competitor pages. These are MARKET-LANGUAGE SIGNALS, not a ranking guarantee and not copy to steal.

## Competitor set and observed tactics

- Surteez:
  - Uses an exact commercial/category title pattern similar to “Anime T-Shirts & Hoodies in Pakistan”.
  - Meta/search copy explicitly includes major franchise names and “COD”.
  - Uses a short SEO text block beneath the product grid.
  - Uses navigation/link concepts around colour, style, theme and popular searches.
  - Source: https://surteez.com/collections/anime-t-shirts-hoodies and https://surteez.com/collections/oversized-graphic-t-shirts
- Dripzada:
  - Uses franchise-specific collection URLs such as `/collections/anime-tees/one-piece/` and `/collections/anime-tees/hunter-x/`.
  - Combines franchise + character + product type + Pakistan + fit + material + printing + delivery/COD language.
  - Uses detailed FAQ-style buyer questions and city names.
  - This is useful as a model for ENTITY DEPTH, but do not clone the scale or wording; mass-generating thin pages can create scaled-content risk.
  - Sources: https://dripzada.com/collections/anime-tees/one-piece/ and https://dripzada.com/collections/anime-tees/hunter-x/
- HavenWear:
  - Uses a broad Anime Collection with series names and character names in the page content.
  - Uses customer review counts/ratings as visible trust information.
  - Uses product/use-case terminology around anime streetwear.
  - Source: https://havenwearpakistan.com/collections/anime-collection-1
- Aesthetic Gen:
  - Uses exact search language such as “Best Anime T-Shirts in Pakistan 2026” and “Best Oversized T-Shirts in Pakistan 2026”.
  - Their content repeatedly combines product type + Pakistan + franchise/character + fit + material/COD details.
  - Do not fabricate rankings or “best” claims on Deez Prints pages; use those exact market terms only where they describe the actual page intent.
  - Sources: https://aestheticgen.com/blogs/news/best-anime-t-shirts-in-pakistan-2026-complete-guide and https://aestheticgen.com/blogs/news/best-oversized-t-shirts-in-pakistan-2026-complete-buying-guide
- Shopellium:
  - Organizes navigation/collections by franchise and uses highly explicit character product names.
  - Product pages expose concrete fit, GSM, printing, care and delivery details.
  - Source: https://shopellium.com/collections/one-piece and representative product pages under that collection.
- Alpha Tees:
  - Product names visibly combine GSM, COD, “Printed Oversized T-Shirt”, style/aesthetic and category descriptors.
  - This shows how product metadata can carry buyer-intent modifiers, but Deez Prints must only use factual modifiers that are true for the specific product.
  - Source: https://www.alphatees.store/
- Skribi:
  - Uses fit-specific buyer education (“oversized t-shirts”, “drop shoulder”, size guidance) and Karachi/nationwide context.
  - Shows the value of precise fit terminology and concrete buyer questions.
  - Source: https://skribiofficial.com/blogs/news/oversized-t-shirts-in-pakistan-a-size-guide-to-getting-the-fit-right
- Tapestry competitors:
  - Product titles commonly combine character/show + “wall tapestry” + decor/use-case language.
  - Product copy often includes material, size, print method, hanging method and rooms/use cases.
  - Deez Prints should use those concepts only where its own tapestry data is verified; do not invent fabric, sizes, mounting hardware or durability claims.
  - Sources: https://ibrelia.com/products/breaking-bad-heisenberg-wall-tapestry-pakistan and https://everanta.in/products/attack-on-titan-final-season-anime-tapestry

## Market keyword/modifier corpus to test

Use these as SEED TERMS only. Do NOT assume they have search volume. Validate with Search Console, Google Trends, SERPs and actual query data where available.

### Core apparel commercial intent
- anime t-shirts pakistan
- anime t shirts pakistan
- anime tshirts pakistan
- anime shirts pakistan
- anime clothing pakistan
- anime streetwear pakistan
- anime graphic tees pakistan
- anime graphic t-shirts pakistan
- buy anime t-shirts pakistan
- anime t-shirt online pakistan

### Fit / style intent
- oversized t-shirt pakistan
- oversized t-shirts pakistan
- oversized tee pakistan
- drop shoulder t-shirt pakistan
- drop shoulder t-shirts pakistan
- drop shoulder tee pakistan
- oversized graphic t-shirt pakistan
- graphic t-shirts pakistan
- streetwear t-shirts pakistan
- heavyweight t-shirt pakistan

### Product modifiers repeatedly observed in the market
- COD / cash on delivery
- nationwide delivery
- Karachi
- premium / heavyweight
- GSM
- cotton
- DTF / direct-to-film
- oversized
- drop shoulder
- graphic tee
- t-shirt / tee / shirt
- size / fit
- price
- printed

ONLY use a modifier when it is a true attribute of the specific page/product. Do not add “COD” to pages/products when COD is not offered. Do not add a GSM number globally if it is not product-accurate.

### Franchise / character query pattern
Build this mechanically from VERIFIED catalogue mappings rather than guessing a list:
- `[Franchise] t-shirt Pakistan`
- `[Franchise] t shirts Pakistan`
- `[Franchise] oversized t-shirt Pakistan`
- `[Franchise] drop shoulder t-shirt Pakistan`
- `[Character] t-shirt Pakistan`
- `[Character] oversized tee Pakistan`
- `[Character] [Franchise] t-shirt`
- `[Character] [Design/arc] t-shirt Pakistan`

Known market examples to investigate only where Deez Prints actually sells/matches them include Naruto, One Piece, Jujutsu Kaisen, Berserk, Dragon Ball, Bleach, Demon Slayer, Attack on Titan, Solo Leveling, Hunter x Hunter, Blue Lock, and their verified character names.

### Tapestry search pattern
- anime tapestry pakistan
- anime wall tapestry pakistan
- anime tapestry online pakistan
- movie wall tapestry pakistan
- tv series wall tapestry pakistan
- manga tapestry pakistan
- [character] tapestry pakistan
- [franchise] tapestry pakistan

### Custom printing / Karachi intent
- custom t-shirt printing karachi
- custom t-shirts karachi
- custom printing karachi
- DTF printing karachi
- DTF t-shirt printing karachi
- custom t-shirt printing pakistan
- custom printed t-shirts pakistan

These must be targeted by the actual custom-print/service URL only if the service exists and the URL genuinely describes it. No city-page farm.

## Competitor-gap rule

Do not merely ask “what keywords do competitors use?” Instead compute:
1. What exact search-intent phrases appear repeatedly across competitor titles/H1s/body copy?
2. Which of those phrases correspond to products Deez Prints actually sells?
3. Which entity names are missing from Deez product metadata despite being present in the actual artwork/catalogue?
4. Which product pages currently fail to say the franchise/character/product type/fit in machine-readable and human-readable form?
5. Which queries already generate Deez impressions in Search Console but have weak CTR or weak average positions?
6. Which competitor terms are actually irrelevant to Deez because the underlying product/service does not exist?

Create `seo/competitor-keyword-gaps.csv` with columns:
`cluster,query_or_phrase,source_domain,source_url,observed_context,frequency_across_sources,deez_target_url,deez_has_product,deez_verified,action,notes`.

Do not copy competitor prose. Extract TERM PATTERNS and INTENT STRUCTURE, then write original Deez-specific language.

# 3.14 PRODUCT DESCRIPTION SEO — THE MAIN VISIBLE CONTENT WORK

This is the core content task for this scope.

## Goal

Rewrite the description of EVERY live, indexable product so that the page can independently answer what the product is, what franchise/character/design it represents, what garment/fit it is, and what verified purchase information applies—without fluff.

## Required source record per product

Before writing, derive a structured source record from actual product data:
- display product name
- canonical URL
- product type
- design name
- franchise
- character(s)
- arc/series/sub-series if verified
- fit
- garment style
- GSM if actually recorded
- material/fabric if actually recorded
- print method if actually recorded
- color
- available sizes
- price
- availability
- shipping information
- exchange/return information
- care instructions
- relevant designKey / sibling fit products if available
- image roles (front/back/detail/lifestyle) if available

If a field is missing or uncertain: OMIT IT. Do not fill the gap with a generic sentence.

## Description structure

Use the following logical order, adapting naturally product-by-product:
1. First sentence = WHAT THE PRODUCT IS + primary entity.
   - Example pattern: “[Character] [Franchise] [Design] is a [fit] graphic T-shirt from Deez Prints.”
   - Do not use this exact sentence mechanically on every product; vary natural wording.
2. Design identification:
   - name the verified character/franchise/design
   - describe the actual visible artwork or theme only when known from the product asset/data
3. Garment facts:
   - verified fit, GSM, fabric and/or color/size details
4. Printing/finish facts:
   - only the actual printing/wash/finish method
5. Buyer-use facts:
   - care, sizing, delivery, exchange and payment details only when verified
6. Optional final line:
   - one useful link sentence to a relevant existing collection/product, inside the description only

## Keyword placement rule

For a product page, select:
- 1 primary query intent
- 2–4 supporting semantic terms
- 1–3 entity names

Example intent stack:
- Primary: `Itachi Uchiha t-shirt Pakistan`
- Supporting: `anime t-shirt`, `drop shoulder tee`, `Naruto`, `Akatsuki`

Use them where the sentence already needs the term. Do not repeat the same exact phrase unnaturally.

A good product description should usually mention the core product type once or twice, the relevant franchise/character names naturally, and the fit/product facts naturally. Do not force every keyword into every description.

## Search-query language to capture naturally

Where applicable, the description should make it obvious that the page answers combinations such as:
- what is this?
- whose/which character is it?
- which anime/franchise?
- what type of shirt/tee?
- oversized or drop shoulder?
- which size/color?
- how much?
- how is it printed?
- how should I wash it?
- where does it ship?
- is COD available?

Answering these is more important than hitting an arbitrary word count.

## Hard bans for product descriptions

- No generic intros like “This is more than just a t-shirt.”
- No lifestyle filler like “express your personality”, “elevate your wardrobe”, “make a statement”, etc. unless the phrase is actually needed and adds information.
- No competitor names.
- No fabricated reviews.
- No “best”, “#1”, “most popular”, “bestseller”, “premium” or similar superiority claims unless independently supported by actual business data and appropriate to use.
- No invented wash-count claims.
- No invented fabric/GSM.
- No invented “official”, “licensed”, “authentic” franchise status.
- No invented first-hand experience.
- No claims that a print is “crack-proof”, “fade-proof”, “permanent”, etc. unless that exact claim is owner-confirmed and supportable.
- No keyword lists masquerading as prose.
- No competitor copy paraphrasing.
- No repeated identical paragraph across the catalogue.

## Product-title / search-title separation

Do not force a visible product-name rewrite just to capture more queries.
Instead, where justified, build the HTML `<title>` from structured fields using this logic:
`[Design/Character] [Franchise if verified] [Fit/garment] T-Shirt in Pakistan | Deez Prints`

Examples are PATTERNS, not text to copy blindly:
- `Luffy Freedom One Piece Drop Shoulder T-Shirt in Pakistan | Deez Prints`
- `Itachi Uchiha Naruto Drop Shoulder T-Shirt in Pakistan | Deez Prints`
- `Zoro Bushido One Piece Acid Wash T-Shirt in Pakistan | Deez Prints`

Only use `in Pakistan` when it matches the national ecommerce intent and the page actually ships there. Do not write titles so long that the primary product/entity is buried.

For generic/original designs, do not force a franchise term.

## Meta description formula

Write unique, factual metadata for each PDP.
Preferred information order:
`product/entity + product type + key fit/spec + Pakistan context + purchase fact`

Use at most one CTA. Do not use a single template for the entire catalogue.
Google can rewrite snippets; the objective is a clear, specific source description rather than a guaranteed snippet.

# 3.15 SEARCH APPEARANCE / CTR ENGINEERING WITHOUT UI REDESIGN

The biggest allowed search-appearance work is in metadata, not visible UI.

## Page-title patterns to test

- Home: `Anime Streetwear, T-Shirts & Custom Printing in Pakistan | Deez Prints`
- Anime collection: `Anime T-Shirts & Streetwear in Pakistan | Deez Prints`
- Drop Shoulder: `Drop Shoulder T-Shirts in Pakistan | Deez Prints`
- Acid Wash: `Acid Wash T-Shirts in Pakistan | Deez Prints`
- Tapestries: `Anime & Movie Tapestries in Pakistan | Deez Prints`
- Custom print: `Custom T-Shirt Printing in Karachi | Deez Prints`
- Product: `[Design/Character] [Franchise] [Fit] T-Shirt in Pakistan | Deez Prints`

These are candidate patterns. Antigravity MUST inspect existing titles, actual page content and Search Console data before applying globally.

## Snippet rules

- Put the page’s main intent early.
- Put the actual entity/product type early.
- Add Pakistan/Karachi only where geographically true and intent-relevant.
- Use concrete differentiators that are truly present: fit, GSM, material, print method, price, delivery/payment terms.
- Do not use five near-synonyms just to “cover keywords”.
- Do not repeat “Pakistan” multiple times.
- Do not use ALL CAPS as an SEO tactic.
- Do not add emojis to titles/meta unless there is a tested reason and they render correctly.
- Do not rely on a hard 55/60-character mythology; Google can truncate/rewrites titles as needed. Keep the meaningful query/entity compact.
- Do not write descriptions solely for bots; write them so a shopper immediately understands the result.

# 3.16 ENTITY GRAPH / “AI MODEL SUGGESTION” READINESS

There is no legitimate hidden “AI ranking hack”. The practical approach is to make Deez Prints easy for search/AI systems to identify, verify and retrieve.

## Entity consistency requirements

Keep the same canonical names across:
- site name
- Organization/OnlineStore structured data
- About page
- Contact page
- social profiles
- Merchant Center
- OpenAI product feed if eligible
- Bing Webmaster/Bing Places if applicable

Use one unambiguous spelling for:
- Deez Prints
- product names
- franchise names
- character names
- category names
- product types
- city/business information

Do not create alternate brand spellings for SEO.

## Product-answer readiness

Each product URL should independently state:
- what it is
- who/what it depicts
- which franchise it belongs to when verified
- fit/style
- real specs
- price
- availability
- how to buy / where it ships

This makes the URL more independently useful for grounding/citation than a page whose facts exist only in a visual card or JavaScript control.

## External corroboration

AI/search systems can encounter products through the open web and third-party sources. Build legitimate corroboration:
- real social profiles linked consistently
- real creator features
- genuine customer reviews
- real press/editorial mentions
- legitimate local/business profiles
- relevant community pages where Deez Prints is genuinely discussed

Do NOT create fake “best of” pages, fake listicles, fake reviews, fake forum posts, or fake third-party recommendations designed solely to cause AI models to mention the brand.

# 3.17 CHATGPT PRODUCT DISCOVERY / OPENAI MERCHANT FEED READINESS

OpenAI’s 2026 commerce documentation now supports merchant product data for discovery in ChatGPT through supported product feeds, subject to access/eligibility. OpenAI states that shopping/product results can use merchant and product metadata, and merchant selection can consider factors such as availability, price, quality and whether the merchant is the maker/primary seller.

Sources:
- https://openai.com/index/powering-product-discovery-in-chatgpt/
- https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search
- https://help.openai.com/en/articles/12911370-using-shopping-research
- https://developers.openai.com/commerce/specs/file-upload/products
- https://openai.com/policies/merchant-feed-terms-of-service/

TASK T19A — CHATGPT PRODUCT FEED READINESS.

1. Inspect the current OpenAI product-feed documentation before implementation.
2. Determine whether Deez Prints can apply for/enable direct product-feed access.
3. Build a reusable feed layer from the same canonical product source used by the website and Google Merchant Center.
4. For OpenAI’s current stable discovery feed, the documented core fields include:
   - `item_id`
   - `title`
   - `description`
   - `url`
   - `brand`
   - `seller_name`
   - `image_url`
   - `availability`
   - `price`
5. Keep IDs stable. Do not reuse an ID for a different product.
6. Current documentation says discovery-feed titles should be concise (up to 150 characters) and descriptions plain-text (up to 5,000 characters).
7. Use public HTTPS product/image URLs.
8. Never invent GTIN/MPN or other identifiers.
9. For real variants, use the documented grouping model. Do not group unrelated fits/styles solely because artwork is similar.
10. Keep price and availability current.
11. If direct access is unavailable, still implement the feed schema internally so it can be activated later without redesigning product data.
12. Deliver:
    - OpenAI-ready feed generator
    - validator
    - sample feed
    - access/allowlisting checklist
    - data-mismatch report

# 3.18 BING / COPILOT / INDEXNOW VISIBILITY LAYER

Bing’s current webmaster guidance explicitly emphasizes crawlable internal links, sitemaps, IndexNow, independent verifiable content, consistent entity names and single-topic URLs for web and AI/grounding experiences.

Sources:
- https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a
- https://www.bing.com/webmasters/help/indexnow-0z209wby
- https://www.bing.com/indexnow/getstarted
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

TASK T19B — BING/INDEXNOW.

1. Verify the domain in Bing Webmaster Tools if the owner has access.
2. Check whether IndexNow is already active.
3. If not active and technically appropriate, implement IndexNow for product/URL changes using Bing’s current specification.
4. Trigger updates when products are:
   - created/published
   - materially updated
   - removed/deleted
   - changed in availability
5. Do not submit random URLs repeatedly.
6. Inspect Bing’s AI Performance report where available and record:
   - cited/grounded URLs
   - search/AI query categories
   - top visible pages
   - missing/ambiguous product information
7. Do not confuse faster discovery/indexing with a guaranteed ranking increase.

# 3.19 COMPETITOR + QUERY DATA LOOP — DO NOT GUESS SEARCH VOLUME

TASK T20 — BUILD A REAL SEO QUERY LEDGER.

Create `seo/query-ledger.csv` with:
`query,cluster,intent,target_url,current_title,current_impressions,current_clicks,current_ctr,current_position,competitor_examples,change_needed,last_changed,next_review`

Populate initially from:
- Google Search Console performance export/API if available
- Google Trends where helpful
- Bing Webmaster query data where available
- competitor SERP/title/H1 observations
- real customer language from orders/WhatsApp/DMs if available to the owner

Rules:
- Search volume and difficulty numbers MUST NOT be invented.
- Competitor presence is evidence of market language, not proof of ranking strength.
- Treat “zero search volume” from an unavailable tool as UNKNOWN, not zero.
- Do not create pages for every long-tail term.
- Map each important intent to ONE best existing URL whenever possible.
- Prefer strengthening an existing product/category page over creating another near-duplicate URL.

# 3.20 SEARCH-CONSOLE OPPORTUNITY TRIAGE — PRACTICAL CTR / POSITION HACK

Use this order when real query data is available:

A. HIGH IMPRESSIONS + LOW CTR
- inspect title, snippet, page match and visible first lines of the product description
- if the page actually satisfies the query, improve title/meta/description wording around the real intent
- do not stuff the query into multiple fields blindly

B. POSITIONS APPROX. 8–20 + REAL IMPRESSIONS
- inspect whether the page is missing one or two important factual entities/modifiers that competitors repeatedly surface
- strengthen the product description and metadata only where true
- inspect internal link connectivity
- do not build a new page unless the current URL genuinely cannot satisfy the intent

C. QUERY LANDING ON THE WRONG URL
- determine whether the current target page is actually the wrong intent
- consolidate/canonicalize only when technically justified
- do not split one intent across many duplicate pages

D. HIGH-QUALITY QUERY WITH NO INDEXED/RELEVANT URL
- first see whether an existing product/category/service page can satisfy it
- only create a new page if the owner later approves visible frontend expansion

# 3.21 PRODUCT-DESCRIPTION SCALE SAFETY / QUALITY GATE

Before publishing a batch, automatically scan the generated descriptions for:
- duplicated paragraphs
- repeated first sentence patterns
- unsupported numeric claims
- unsupported franchise mappings
- unsupported fabric/GSM claims
- competitor brand names
- fake superlatives
- fake reviews
- “official/licensed” claims
- malformed entity names
- keyword stuffing patterns
- text that mentions a character/franchise not actually visible/mapped on that product

Hard fail a product description when any of these conditions occur.

Also compute similarity between all product descriptions. High similarity is a review signal, not a number to blindly optimize. A catalog can legitimately share short factual policy/care information, but the design/entity portion must be genuinely product-specific.

# 3.22 PRODUCT SEO DATA MODEL — NORMALIZE ONCE, REUSE EVERYWHERE

Do not maintain separate hand-written SEO truth in multiple places.

Create or extend a normalized product SEO object containing, where known:
- `canonicalUrl`
- `displayName`
- `seoTitle`
- `metaDescription`
- `productType`
- `designName`
- `franchise`
- `characters[]`
- `fit`
- `gsm`
- `material`
- `printMethod`
- `color`
- `sizes[]`
- `price`
- `currency`
- `availability`
- `description`
- `imageUrls[]`
- `imageAlt[]`
- `designKey`

Then consume that data consistently in:
- page metadata
- product JSON-LD
- Google Merchant Center feed
- OpenAI-ready feed
- product sitemap/image sitemap where applicable

One factual source should generate all machine-facing representations.

# 3.23 TECHNICAL SEO “HACKS” WITH A REAL MECHANISM — PRIORITIZED

These are the tactics worth doing because they change a documented crawl/discovery/understanding mechanism, not because someone called them a “hack”.

1. Crawlable product detail content in the initial HTML when feasible.
   - Especially valuable for Product structured data and dynamic price/availability.
   - Do not rewrite architecture unless the current implementation actually fails this requirement.

2. One canonical product URL + consistent sitemap URL + consistent feed URL.
   - Prevents conflicting identity signals.

3. Every live product gets a strong factual entity description.
   - Product name + character/franchise + fit + verified specs.
   - This is the highest-value visible change in this scope.

4. Use genuine product variants correctly.
   - Size/color variants can be grouped when they are truly variants of the same product.
   - Do not group Regular, Drop Shoulder and Acid Wash just because artwork matches.

5. Make product titles searchable WITHOUT changing the visual display name.
   - Use `<title>` and metadata derived from structured fields.

6. Use exact user language where it naturally names the object.
   - “anime t-shirt”, “drop shoulder t-shirt”, “One Piece t-shirt”, etc.
   - Do not force spelling variants into the same paragraph.

7. Make every product URL independently understandable.
   - This helps both classic retrieval and AI/grounding systems.

8. Use accurate product/merchant structured data and the Merchant Center feed together.
   - They can complement one another and help Google verify product data.

9. Keep image semantics consistent.
   - `front`, `back`, `detail`, `lifestyle` roles.
   - Alt text describes the image, not a keyword list.

10. Use accurate `lastmod` and remove stale/redirected URLs from sitemaps.

11. Use IndexNow for supported engines so important updates propagate faster there.

12. Maintain a real query ledger and re-optimize pages based on actual impressions/clicks rather than imagined volume.

13. Earn independent mentions and reviews from real people/organizations.
   - Do not manufacture the evidence AI systems use to validate brands.

14. Monitor AI visibility as an OUTPUT, not a direct ranking control.
   - Search Console generative-AI performance where available.
   - Bing AI Performance where available.
   - Manual prompt test set for ChatGPT/Copilot/Gemini/Perplexity to discover information gaps, not to produce fake “proof” of ranking.

# 3.24 AI RECOMMENDATION TEST SET

Create a monthly manual test set of natural shopper prompts, for example:
- “Where can I buy anime t-shirts in Pakistan?”
- “What Pakistani brands sell anime oversized tees?”
- “Where can I buy One Piece/Luffy t-shirts in Pakistan?”
- “Where can I buy Itachi/Naruto t-shirts in Pakistan?”
- “Where can I buy drop shoulder t-shirts in Pakistan?”
- “Where can I buy anime wall tapestries in Pakistan?”
- “Where can I get custom t-shirt printing in Karachi?”
- “Which Pakistani stores have anime streetwear with [actual verified attribute]?”

For each engine, record:
- whether Deez Prints is mentioned
- which Deez URL(s) are surfaced/cited
- which facts are repeated
- which facts are missing/incorrect
- which competitors appear
- whether the answer is based on current product pages or stale information

DO NOT edit the site simply because an AI model did not mention it once. Look for repeated information gaps across multiple observations.

# 3.25 NO-NEW-PAGE RULE FOR THIS PASS

Because the owner explicitly does not want frontend expansion right now:
- no new franchise hubs
- no new city pages
- no new collection landing pages
- no new mockup galleries
- no new editorial pages
- no new “best” pages
- no new doorway pages

Use existing URLs and product descriptions.

When a keyword opportunity cannot be served well by an existing URL, log it in `seo/unserved-keywords.md` instead of creating a page.

# 3.26 “DO NOT COPY THE COMPETITOR PLAYBOOK BLINDLY” RULE

Competitors currently use aggressive factual claims such as GSM numbers, wash durability counts, order volumes, review totals, COD, free shipping and city coverage. These are useful clues about what shoppers look for, but they are NOT facts that Deez Prints may copy.

For every such modifier:
- verify it against Deez Prints data
- use it only on the pages/products for which it is true
- otherwise omit it

This rule exists specifically to prevent SEO optimization from becoming fabricated commerce content.

# 3.27 UPDATED MASTER TASK ORDER FOR THIS SCOPE

Run in this order:

T0 → production/architecture/SEO reconnaissance
T1 → conditional rendering fix only if T0 proves necessary
T2 → sitemap + canonical URL hygiene
T3 → search titles/meta + technical H1 correctness only; do NOT rewrite visible H1s for keywords
T4 → normalize verified franchise/character/product data, without creating visible hubs
T5 → product-description SEO rewrite for the actual catalogue; no collection frontend expansion
T6 → structured data
T7 → image SEO/performance
T8 → internal-link audit; only broken-link fixes plus new links inside product descriptions
T9 → metadata hygiene on existing pages
T10 → RETIRED FOR THIS SCOPE — do not change Coming Soon behavior or create mockups
T11 → regression checker
T12 → Google Merchant Center/free-listings readiness
T13 → faceted-navigation crawl audit
T14 → orphan/internal-link graph audit, but respect the frontend lock
T15 → Search Console query-to-page optimization loop
T16 → first-hand commerce content only inside approved product descriptions for this pass
T17 → local SEO checks, metadata/entity consistency only unless owner later approves visible page copy
T18 → AI visibility monitoring
T19A → OpenAI/ChatGPT merchant feed readiness
T19B → Bing/IndexNow
T20 → competitor + real-query ledger
T21 → Search Console opportunity triage
T22 → product-description quality gate
T23 → normalized SEO data model
T24 → final end-to-end regression and production verification

# 3.28 FINAL DEFINITION OF “DONE”

This SEO pass is DONE only when:
- every live product has a unique, factual, product-specific description where missing/weak
- every product has a clear search-oriented `<title>` without changing the visual product card/name unnecessarily
- every product has a unique factual meta description
- canonical/indexability/sitemap/redirect signals agree
- Product structured data matches the visible product data
- Merchant Center feed readiness is verified and data-consistent
- OpenAI product-feed readiness is documented/implemented where access permits
- Bing Webmaster/IndexNow status is checked
- no fake facts or competitor-copy patterns are present
- no new visible frontend modules were introduced outside product descriptions
- Coming Soon behavior remains untouched
- the automatic category detection remains untouched
- all verification output is real and pasted into the final report
- the final report distinguishes VERIFIED / OWNER-CONFIRMED / NOT-VERIFIED


# 4. NEW HIGH-LEVERAGE TASKS TO ADD AFTER T11

## T12 · Merchant Center / Free Listings Product Feed — HIGH LEVERAGE

```text
TASK T12 — MERCHANT CENTER / FREE LISTINGS FEED.

Goal: create a production-ready product feed from the same product source used by the website.

1. Read the current Google Merchant Center documentation before implementation:
   - https://support.google.com/merchants/answer/13889434
   - https://support.google.com/merchants/answer/9340054
   - https://support.google.com/merchants/answer/7348545
   - https://support.google.com/merchants/answer/12472394

2. Verify that Pakistan is currently selectable in Merchant Center. The current Google documentation lists Pakistan as a beta target country; this must be checked in the actual account.

3. Generate a deterministic feed containing applicable fields:
   id, title, description, link, canonical_link, image_link, additional_image_link, availability, price, condition, brand, color, size, age_group, gender, item_group_id where genuine variants exist, pattern where applicable, and shipping fields/settings where applicable.

4. Never invent GTIN, MPN, stock, color, size, shipping, or other product attributes.

5. For apparel, ensure the website and feed agree on color/size/gender/age-group values where those attributes apply.

6. Use stable canonical URLs. No tracking parameters in canonical_link.

7. Do NOT group different fits/styles as variants solely because they share artwork. Use designKey for merchandising, but model true variants according to Google’s definitions.

8. Add a validation script that compares feed values against the source data and reports mismatches in:
   title, price, availability, canonical URL, image URL, color, size, variant grouping.

9. Deliverables:
   - feed generator
   - feed output
   - validation script
   - sample validation report
   - exact Merchant Center setup steps the owner must perform

10. Do not claim free-listing eligibility or placement until the live Merchant Center account confirms it.
```

## T13 · Faceted Navigation / Parameter Crawl Control — HIGH LEVERAGE

```text
TASK T13 — FACETED NAVIGATION AUDIT.

1. Enumerate all URL patterns generated by:
   - sort
   - color
   - size
   - fit
   - search
   - filters
   - pagination
   - tracking parameters
   - session-like parameters

2. Classify each URL family:
   A. canonical indexable landing page
   B. crawlable but not intended for indexing
   C. should not be crawled
   D. invalid/empty/nonsensical -> 404

3. Prevent unbounded filter combinations from flooding crawl discovery.

4. Never put parameter combinations in the sitemap unless they are deliberate, useful landing pages.

5. Test:
   - duplicate parameter ordering
   - duplicate filters
   - empty filters
   - nonexistent combinations
   - nonexistent pagination
   - sort-only URLs
   - tracking parameters

6. Verify correct canonical/noindex/robots behavior separately. Do not block a URL with robots.txt and expect Google to see its noindex meta tag.

7. Deliver:
   - URL family inventory
   - decision matrix
   - implementation
   - before/after sample URLs
   - crawlability verification
```

## T14 · Orphan Page + Internal Link Graph Audit — HIGH LEVERAGE

```text
TASK T14 — INTERNAL LINK GRAPH.

1. Crawl the site’s indexable pages.
2. Parse all internal <a href> links from raw HTML and, where necessary, rendered HTML.
3. Produce:
   - orphan pages (0 internal inbound links)
   - pages with only footer/home links
   - franchise hubs with weak inbound links
   - product pages with no contextual hub links
   - guides with no links into commercial pages
4. Required hierarchy:
   Home -> primary collections -> franchise hubs / fit hubs -> products.
5. Required cross-links where relevant:
   - franchise hub -> matching tees
   - franchise hub -> matching tapestries
   - tapestry -> matching franchise hub
   - fit hub -> products
   - guides -> relevant collections/products
   - product -> franchise + fit + same-design alternatives
6. Use ordinary crawlable <a href> links.
7. Use descriptive anchors naturally.
8. Do not build a giant block of repeated keyword links on every page.
9. Add an orphan-page failure to scripts/seo-check.mjs.
10. Deliver a CSV or Markdown report of orphan pages and newly connected pages.
```

## T15 · Search Console Query-to-Page Optimization Loop — HIGH LEVERAGE

```text
TASK T15 — SEARCH CONSOLE QUERY LOOP.

Owner action + analysis workflow; no code should fabricate query data.

1. After enough Search Console data exists, export the Performance report for Web Search.
2. Group data by:
   - query
   - page
   - country
   - device
   - date
3. Identify three high-value states:
   A. many impressions + low clicks -> title/snippet/page-intent mismatch candidate
   B. average position roughly 8–20 + meaningful impressions -> page-depth/internal-link opportunity candidate
   C. query clearly matches a different page than the current landing page -> intent/canonical/content architecture issue
4. For each candidate, inspect the actual query and page before editing.
5. Improve the page only if the requested information is genuinely relevant to it.
6. Add the query’s useful terminology to visible content, title, H1, alt text, or link text only where natural and accurate.
7. Never stuff every Search Console query into the title or paragraph.
8. Log each change with:
   date, URL, query, old title, new title, change reason, baseline impressions/clicks/position.
9. Re-check after an appropriate recrawl/reprocessing period.
10. Maintain a query -> page map for the top commercial clusters.
```

## T16 · First-Hand Commerce Content Layer — HIGH LEVERAGE

```text
TASK T16 — FIRST-HAND COMMERCE CONTENT.

Do not mass-generate filler.

For high-value product and collection pages, add only information that is supported by actual Deez Prints data or an owner-approved observation.

Possible visible modules:
- What the design depicts (only if actually known)
- Fit and fabric details
- Print method
- Real wash/finish details
- Real care instructions
- Real shipping/exchange information
- Size selection help
- Related designs in other fits
- Real customer questions and answers
- Original process photography

For guides:
- Add original photos where they meaningfully demonstrate the process.
- Add measurements/tests only when actually performed.
- Add specific examples from Deez Prints’ own workflow when true.

Do not write generic “streetwear is more than fashion” paragraphs.
Do not paraphrase competitor copy.
Do not manufacture expertise, testing, reviews, awards, certifications, or customer anecdotes.
```

## T17 · Local Karachi SEO / Google Business Profile — OWNER + ANTIGRAVITY SUPPORT

```text
TASK T17 — LOCAL SEARCH FOUNDATION.

1. Determine whether the business is eligible for a Google Business Profile based on Google’s current eligibility rules.
2. If eligible, make business information complete and accurate.
3. Ensure the website consistently presents the same legitimate business identity and location/service information.
4. Add real service information, real photos, real hours, real website link, and genuine reviews where applicable.
5. Create / improve the custom-print Karachi page only if the service is genuinely provided there.
6. Do NOT create separate nearly identical pages for Karachi, Lahore, Islamabad, Rawalpindi, etc. solely to capture keywords.
7. Do NOT stuff “Karachi” into every page title.
8. Where local information is genuinely relevant, use it naturally:
   - Custom T-Shirt Printing in Karachi
   - DTF Printing in Karachi
   - Made to order in Karachi
   but only on pages whose content actually supports the term.
9. Deliver a local entity consistency checklist.
```

## T18 · AI Search / Generative Search Monitoring — CURRENT 2026

```text
TASK T18 — GENERATIVE AI VISIBILITY MONITORING.

1. Do not create llms.txt, AI-specific markup, or machine-readable files on the assumption that they increase Google rankings.
2. Follow normal SEO fundamentals:
   - crawlable content
   - useful internal links
   - visible text
   - good page experience
   - accurate structured data
   - accurate Merchant Center data
   - accurate Business Profile data
3. Use Search Console’s generative AI performance reporting where available.
4. Track which Deez Prints URLs appear in generative AI search features.
5. Compare AI-surface URLs with their classic Search query/page data.
6. Strengthen pages that genuinely answer the user need better than commodity pages.
7. Do not rewrite content merely to force keyword variants or fake “AI readability.”
8. Deliver a monthly AI-search visibility report.
```

---

# 5. ADDITIONAL “LEGIT HACKS” WITH A REAL MECHANISM

These are not secret Google loopholes. They are high-leverage implementation patterns that directly address how Google discovers, understands, matches, and presents ecommerce content.

## Hack A — Build a semantic product matrix, not just a product grid

- For every product, maintain normalized fields:
  - designKey
  - designName
  - franchise
  - character
  - fit
  - color
  - category
  - productType
  - published
  - price
  - stock
  - primaryImage
  - galleryImages
  - canonicalUrl
- Generate from that data:
  - title
  - H1
  - meta description
  - alt text
  - breadcrumbs
  - JSON-LD
  - Merchant Center feed
  - related products
  - collection membership
- This prevents the same product from saying one thing to users and another thing to Google.

## Hack B — Use the same design across fits as an internal-link asset

- `designKey` should power a “same artwork, different fit” module.
- Example structure:
  - Zoro Bushido — Regular Fit
  - Zoro Bushido — Drop Shoulder
  - Zoro Bushido — Acid Wash
- This creates useful cross-discovery without pretending three styles are one Google Merchant variant group.

## Hack C — Turn real inventory depth into hub strength

- Do not create a franchise hub because the word exists in a keyword list.
- Create it when:
  - there are enough real products,
  - the products are genuinely about that franchise,
  - the page has unique useful copy,
  - matching tapestries/other products exist where relevant,
  - the hub can be placed naturally in navigation and breadcrumbs.
- The original threshold of at least 3 products is the starting guardrail.
- Prefer 5 strong hubs over 50 thin hubs.

## Hack D — Kill cannibalization at the data model, not with random rewrites

- One normalized franchise name.
- One normalized character name.
- One normalized fit label.
- One canonical product name.
- One URL per actual product.
- One clear target page per keyword cluster.
- If two pages accidentally target the same intent, decide which URL should own the intent and strengthen internal links toward it.

## Hack E — Build “query bridges” from guides into commercial pages

- A guide about DTF printing should link directly to the custom-print service page.
- A guide about streetwear/fit should link to Drop Shoulder and Regular collections.
- Acid-wash care content should link to Acid Wash products/collection.
- Tapestry guides should link to Anime Tapestries and Movie Tapestries sections.
- Use descriptive anchors that read naturally.
- This is a genuine information-to-commerce path, not a footer keyword block.

## Hack F — Make sitemap data tell the truth

- Only indexable canonical 200 pages belong in the sitemap.
- A sitemap should not contain:
  - redirects
  - stale URLs
  - noindex pages
  - pagination parameters
  - fake last-modified timestamps
- `lastmod` should reflect meaningful content updates; if no trustworthy date exists, omit it.
- Google explicitly treats sitemap inclusion as a weaker canonicalization signal than redirects and `rel="canonical"`, so the three should agree.

## Hack G — Add an orphan-page test to CI

- Sitemaps tell Google what you consider important.
- Internal links help Google discover pages and understand them.
- Therefore a URL appearing only in a sitemap but nowhere in the site's crawlable link graph is a warning sign.
- CI should report:
  - sitemap URL
  - inbound internal-link count
  - nearest hub
  - whether the page is intentionally isolated.

## Hack H — Fix product image semantics at the source

- Create an image-role field:
  - front
  - back
  - detail
  - lifestyle
- Derive alt text from the role rather than guessing from filenames.
- Never label a front image “back graphic view.”
- Never output the same image twice with identical alt text.
- Keep the first/LCP image eager and the rest lazy where appropriate.
- Use responsive image widths instead of serving a huge original to every viewport.

## Hack I — Use real local intent instead of fake city-page SEO

- The custom-print page can target Karachi because the service is genuinely performed there.
- Do not generate `/custom-print/lahore`, `/custom-print/islamabad`, etc. unless there is a real service, real local process, and genuinely differentiated content for that location.
- This avoids doorway-page risk while still capturing real local intent.

## Hack J — Use customer questions as a living SEO dataset

- Every real WhatsApp/DM/order question that recurs can become:
  - an FAQ entry,
  - a guide section,
  - a product FAQ,
  - a size-guide improvement,
  - a service-page section.
- Keep a log of recurring questions and map them to pages.
- This produces original language based on actual customers instead of invented long-tail keywords.

## Hack K — Earn relevant mentions with actual assets

- Build genuinely useful assets that other sites can reference:
  - Pakistan streetwear sizing/fit reference using your own real measurements.
  - DTF vs screen-print comparison based on your actual workflow.
  - Care guide with original photography.
  - Tapestry hanging/care guide using your real products.
- Pitch these assets to relevant fashion/streetwear/anime communities, creators, publications, and local business resources when they genuinely help their audience.
- Do not buy “100 backlinks,” submit to spam directories, or pay publishers solely for ranking links.

---

# 6. HARD ACCEPTANCE TESTS — DO NOT MARK COMPLETE UNTIL PASSED

## Crawl/index tests

- [ ] Every important indexable URL returns HTTP 200 without an unexpected redirect.
- [ ] Every legacy URL that must remain redirected uses a verified permanent redirect.
- [ ] Bogus URL returns a real 404.
- [ ] No bogus/empty filter page returns 200.
- [ ] No important page is blocked by robots.txt accidentally.
- [ ] `noindex` is only used where intentional and the URL remains crawlable so Google can see the directive.

## Canonical tests

- [ ] Canonical URL is absolute and equals the intended canonical.
- [ ] No page has multiple conflicting canonical tags.
- [ ] Sitemap URLs, canonical tags, redirects, and Merchant Center canonical_link agree.

## Metadata tests

- [ ] Every indexable page has a unique descriptive title.
- [ ] No `Collection Collection`.
- [ ] No accidental adjacent repeated word.
- [ ] Meta descriptions are page-specific and factual.
- [ ] H1 is present and matches the page’s actual intent.
- [ ] Main headline words contain real whitespace in the DOM.
- [ ] `og:title`, `twitter:title`, and page title are intentionally aligned.

## Product tests

- [ ] Every product has a unique product name.
- [ ] Every mapped franchise/character was owner-confirmed.
- [ ] Price in visible page = structured data = Merchant Center feed.
- [ ] Availability in visible page = structured data = Merchant Center feed.
- [ ] Image URLs are valid and crawlable.
- [ ] Size/color/gender/age attributes are accurate where applicable.
- [ ] No fake GTIN/identifier.
- [ ] No fake reviews or ratings.

## Structured data tests

- [ ] JSON-LD is generated from the same source used by visible UI.
- [ ] Product markup is on product pages, not sprayed across collection pages.
- [ ] BreadcrumbList matches the visible breadcrumb.
- [ ] Organization/OnlineStore data is accurate and placed on the appropriate organization/home/about context.
- [ ] No unsupported or fabricated properties.
- [ ] Rich Results Test checked on representative product pages.
- [ ] Schema validator checked for syntax/model correctness.

## Sitemap tests

- [ ] All sitemap URLs are canonical, indexable, 200-status URLs.
- [ ] No redirecting URLs.
- [ ] No noindex URLs.
- [ ] No parameter pagination URLs.
- [ ] No `<image:title>`.
- [ ] `lastmod` is trustworthy or omitted.
- [ ] URL counts are reported.

## Internal link tests

- [ ] No important orphan URLs.
- [ ] Product pages link to meaningful hubs.
- [ ] Hubs link to products.
- [ ] Guides link to relevant commercial pages.
- [ ] Same-design fit links differ by product.
- [ ] Related products are not identical on every PDP.
- [ ] Links use ordinary `<a href>` elements.

## Content quality tests

- [ ] No placeholder `[OWNER` remains in published content.
- [ ] No generic AI filler.
- [ ] No scraped competitor copy.
- [ ] Every factual commerce statement has a source or owner confirmation.
- [ ] Franchise pages contain unique useful information and enough real inventory.
- [ ] Thin/empty collections follow the agreed index/noindex rules.

## Performance tests

- [ ] Lighthouse baseline saved.
- [ ] Lighthouse after-test saved.
- [ ] Field data checked where available.
- [ ] LCP image is not lazy-loaded.
- [ ] Below-fold images are lazy-loaded appropriately.
- [ ] Explicit image dimensions prevent layout shifts.
- [ ] Responsive image widths are used.
- [ ] Collection rendering does not unnecessarily download/render all 148 products at once if that hurts real-user performance.

## Merchant Center tests

- [ ] Pakistan target-country status checked in live account.
- [ ] Feed accepted without critical item errors.
- [ ] Landing pages match feed data.
- [ ] Apparel attributes validated.
- [ ] Canonical links stable.
- [ ] Free listings status monitored.

## Search Console tests

- [ ] Domain property verified.
- [ ] Sitemap submitted.
- [ ] Representative URLs inspected.
- [ ] Page Indexing report reviewed.
- [ ] Performance query/page data exported.
- [ ] Generative AI performance data reviewed where available.

---

# 7. OWNER DECISIONS STILL REQUIRED

- [ ] Confirm delivery time: is “3–5 days” inclusive of printing?
- [ ] Confirm handling time.
- [ ] Confirm transit time.
- [ ] Confirm custom-print minimum order.
- [ ] Confirm acid-wash GSM, if available.
- [ ] Confirm tapestry sizes.
- [ ] Confirm tapestry material.
- [ ] Confirm tapestry print method.
- [ ] Confirm whether returns are exchange-only.
- [ ] Decide COD.
- [ ] Confirm `franchise_mapping.csv`.
- [ ] Confirm legal/licensing position for franchise/trademark-dependent catalogue SEO.
- [ ] Decide which real customer reviews can be collected and displayed.
- [ ] Confirm local-business eligibility/details for Google Business Profile.

---

# 8. ORIGINAL DOCUMENT PRESERVATION

The next two appendices reproduce the original documents **verbatim** so that not a single source word, finding, caveat, competitor observation, template, task instruction, code block, or source reference is lost.

- Appendix A = `deezprints-seo-playbook.md` exactly as supplied.
- Appendix B = `antigravity-seo-tasks.md` exactly as supplied.
- Treat the new sections above as additive execution guidance/corrections; do not delete the original source material.

---

# APPENDIX A — VERBATIM: deezprints-seo-playbook.md

# Deez Prints — SEO Playbook
**Prepared:** 19 Sept 2026 · **Scope:** SEO only (site issues, competitors, keywords, fixes) · **Companion file:** `antigravity-seo-tasks.md` (paste-in tasks for Antigravity)

---

## 0. How to trust this document

Every finding carries an evidence tag. If a point has no tag, it is my reasoning, not a fact.

| Tag | Meaning |
|---|---|
| **[LIVE]** | I fetched the page/file from deezprints.com today (19 Sep 2026) and saw it |
| **[GOOGLE]** | Stated in Google's own documentation (URL given) |
| **[COMP]** | Seen on a competitor's page or in a search snippet (URL given). Shows what competitors *do*, not proof that it ranks |
| **[VERIFY]** | I could not confirm it with the tools I have. A test is given |

**What I could NOT do (so you don't assume I did):**
- **No search-volume or keyword-difficulty numbers.** I don't have Ahrefs/Semrush/Search Console. I did not invent any. Section 4 gives a free way to get real numbers.
- **No Google rankings or index status.** My search tool is not Google. It returned zero results for deezprints.com, but that proves nothing about Google. Check Search Console.
- **No raw HTML, JSON-LD, or HTTP headers.** My fetch tool returns readable page content. Whether structured data exists, and whether pages are server-rendered, is unknown (Section 3, SEO-01).
- **dripzada.com blocks automated access (robots).** I used only its search-result snippets.
- **sitemap.xml was truncated by my fetch** (it cut off around `/products/dp-regular-bleach`). Claims about what is "missing" apply only to the part I could read.

**Corrections to your earlier audit** (from today's fetches):
- Product titles are **not** all ALL-CAPS with one exception. Both conventions coexist across the catalogue ("Zoro Bushido Acid Wash Tee" vs "AIZEN ACID WASH TEE"). Fix = pick one convention for all products.
- The audit said `/collections` twitter tags fall back to the homepage. On `/collections/acid-wash`, `/collections/anime-archive` and `/collections/tapestries` they are correct today. The fallback I confirmed is on **`/payments` and `/guides/streetwear-printing-and-care`**.
- The audit assumed Next.js. The asset name `deez-prints-streetwear-hero-DMAiPp6v.webp` and `/assets/` paths look like a **Vite** build **[VERIFY]**. This matters for rendering (SEO-01).

---

## 1. Where the site stands (SEO view)

**Real strengths [LIVE]** — keep these:
- Self-referencing canonicals on every page checked; old slugs resolve to the new canonical (`/products/tshirt-acid-4` → `dp-acid-wash-berserk-skull-blade`).
- Unique title + meta description per page, breadcrumbs visible, `og:type=product` with `price:amount` / `PKR` on PDPs, `og:availability`.
- `robots.txt` is clean: `Allow: /`, `Disallow: /api/`, sitemap declared.
- An image sitemap exists.
- Catalogue depth is a genuine competitive asset: **148 items in Anime Archive, 60 acid-wash tees, 33 tapestries** (counts shown on live collection pages).
- Pinterest domain verification tag present (`p:domain_verify`).

**The core problem in one sentence:** almost every SEO-visible element (title, H1, meta description, collection copy, product names) is *brand-first and category-generic*, so the site says almost nothing about the words people search: **franchise names, "anime", "oversized/drop shoulder", "Pakistan"**.

---

## 2. Competitor research

**How I found them:** searches for anime tees, oversized/drop-shoulder tees, tapestries and custom printing in Pakistan. This is a competitor *set* drawn from search results, not a ranking study.

### 2.1 Anime / oversized tees

| Competitor | What I observed | Source |
|---|---|---|
| **Surteez** | Anime collection title is `Anime T-Shirts & Hoodies in Pakistan \| Surteez`. Meta description names Dragon Ball, Naruto, One Piece **and "COD"**. A short SEO text block sits *under* the product grid. Footer has "Shop by Colour / Style / Theme" link blocks and a "Popular Searches" row. Oversized pages state "240 to 250 GSM", COD, 7-day exchange. Only **13** products in its anime collection. | surteez.com/collections/anime-t-shirts-hoodies · /collections/oversized-graphic-t-shirts |
| **Dripzada** | Franchise sub-collections (`/collections/anime-tees/one-piece/`). Long keyword-rich copy: "220 GSM combed cotton", DTF, "COD + free delivery", a list of 8 cities, and a trust angle ("no fake prints from Daraz resellers"). Keyword-rich internal links to sibling products ("Luffy Gear 5 oversized tee…"). A drop called "Drip no Jutsu" targets Itachi, Sasuke, JJK, Demon Slayer, Solo Leveling, AOT. *(snippets only — site blocks fetch)* | dripzada.com/collections/anime-tees/one-piece/ · /collections/drip-no-jutsu/ |
| **HavenWear** | Anime collection of **56** products; displays "4.8/5 based on 648 reviews"; copy names series and characters (Naruto, Berserk, Solo Leveling, DBZ, One Piece, Demon Slayer, Tokyo Revengers, Bleach) and use cases (university, casual, layering); states COD. | havenwearpakistan.com/collections/anime-collection-1 |
| **TPLEX** | Title pattern: `Best Anime T Shirts Pakistan \| Naruto, One Piece, JJK`. | tplexstore.com |
| **Kayazar** | Anime page targets "Akatsuki, Naruto"; copy lists "Karachi, Lahore, Islamabad & All Over Pakistan". | kayazar.com/…/anime-tshirts |
| **AnimeStore.pk** | Sells tees, hoodies, **mugs**, collectibles (overlaps your mug SKUs). | animestore.pk/collections/t-shirts |
| **Shopellium** | Navigation is organised by franchise (JJK, Naruto, AOT, One Piece, Death Note, Demon Slayer, Tokyo Ghoul, Dragon Ball) plus celebrities/TV. | shopellium.com/collections/one-piece |
| **Groovy, Chief Apparel, Teetwo, Psyche Fusion (Karachi), Artxtra, Mint Macro, Rockstar Jeans, HB Industries** | Oversized / drop-shoulder streetwear. Copy patterns: "drop shoulder t shirt for men/women" (Teetwo); free shipping over Rs. 3,000 (Chief Apparel — *your threshold is Rs. 5,000*); on-page customer reviews (Artxtra); city names in copy (HB Industries); editorial "Best Oversized T-Shirts in Pakistan 2026" listicle that ranks the publisher itself (Mint Macro; it quotes PKR 1,500–3,500 as a typical range — a competitor's claim). | groovypakistan.com · chiefapparel.pk · teetwo.pk · psychefusion.com · artxtra.pk · mintmacro.com |

### 2.2 Tapestries
- **Kafka.pk** calls itself "first of its kind tapestry maker in Pakistan", promises free shipping across Pakistan in 2–5 working days, lists multiple uses (wall hanging, table cover, bed cover, room divider…), and prints care instructions on the product page. **[COMP]** kafka.pk/products/goku-tapestry
- Your tapestry page today: title `Tapestries Collection — Deez Prints`, H1 `Tapestries`, one-line intro, all 33 items priced "From Rs. 3,000" (a few Rs. 2,000–2,100) with no size/material text on the listing. **[LIVE]**

### 2.3 Custom printing (Karachi)
| Competitor | Observed | Source |
|---|---|---|
| PrintsPK | Pages built around "t-shirt printing Karachi / Lahore / Islamabad", DTF on black cotton, customer reviews on page | printspk.com/product/t-shirt-printing-karachi |
| XL DTF Print | Online design tool, "no minimum orders" | xldtfprint.pk |
| MA Printers | Karachi, "since 2010", "500+ satisfied clients" | maprinters.co |
| Aprints.pk | Long "Custom T-Shirt Printing in Pakistan — Complete Guide 2026" with FAQ: no minimum, **7–8 working days** dispatch | aprints.pk/custom-t-shirt-printing-in-pakistan-complete-guide-2026-dtf-screen-print-more/ |
| CustomClothing.PK | B2B, **MOQ 50 pieces** | customclothing.pk/pages/dtf-printing |
| Printistan | Rawalpindi, six methods, also sells a catalogue | printistan.pk |

Your homepage states delivery "in 3–5 days"; if that includes printing, it beats Aprints' stated 7–8 working days. **[VERIFY internally before advertising it in copy.]**

### 2.4 What the competitor set tells you
1. **Franchise name + product type + "Pakistan" is the dominant title pattern** (Surteez, TPLEX, Dripzada, HavenWear). You have almost none of it.
2. **All four big anime competitors advertise COD** in titles/meta/copy. Your `/payments` page lists only prepaid transfers (Meezan, Easypaisa, JazzCash, Raast). **[LIVE]** That is a conversion gap, not an SEO fix — but it will cap what any traffic converts to.
3. **Social proof is on-page** (HavenWear 648 reviews, Artxtra, PrintsPK). You show none.
4. **They lose on depth.** Surteez has 13 anime designs, HavenWear 56. You have 148 items in one collection.

---

## 3. Issues, evidence, fixes

Severity: **P0** = do first · **P1** = next · **P2** = polish. Antigravity task IDs (T#) refer to `antigravity-seo-tasks.md`.

### SEO-01 · Rendering mode unknown — possible client-side app · **P0 (verify)** · T0/T1
- **Evidence:** Vite-style hashed asset name and `/assets/` paths **[VERIFY]**. The audit assumed Next.js. My fetch shows full content and per-page meta tags, but my tool may execute JS, so it can't prove the raw HTML contains them.
- **Why it matters [GOOGLE]:** Google says server-side or pre-rendering "is still a great idea… not all bots can run JavaScript", and that client-routed apps struggle to return real 404 status codes (soft-404 risk). https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- **Test (2 minutes):** `curl -s https://deezprints.com/products/dp-acid-wash-zoro-2 | grep -Eo "<title>[^<]*|<h1[^>]*>[^<]*|application/ld\+json|rel=\"canonical\""` — if the title/H1/canonical are missing from the raw response, pages are client-rendered. Also `curl -sI https://deezprints.com/products/not-a-real-page-xyz` — you want `404`, not `200`.
- **Fix:** If client-rendered → add prerendering/SSR for products, collections, home, guides (T1). If already server-rendered → nothing to do.

### SEO-02 · Titles/H1/meta carry no search terms · **P0** · T3
- **Evidence [LIVE]:**
  - Home: title `Deez Prints — Premium Streetwear & Custom Printing in Pakistan`; H1 is the slogan `WearWhatYouCreate.` (extracted with **no spaces** — check the DOM: if each word is a separate span with no whitespace, crawlers and screen readers read one token).
  - Collections: `Acid Wash Collection — Deez Prints`, `Anime Archive Collection — Deez Prints`, `Tapestries Collection — Deez Prints`. Meta descriptions are template fragments ("Hand-washed. No two identical. Shop Acid Wash by Deez Prints…").
  - **Bug:** `Cinema Collection Collection — Deez Prints` (title and og:title) — template appends "Collection" to a name that already contains it.
  - Products: `Zoro Bushido Acid Wash Tee | ACID WASH — Deez Prints` — no "One Piece", no "anime", no "Pakistan"; "acid wash" appears twice. Meta description is the *same sentence on every product* with only name/fit/price swapped: "Premium {fit} graphic apparel by Deez Prints. 100% cotton, DTF printed in Karachi. Dispatched across Pakistan." (seen identically on `dp-acid-wash-zoro-2`, `dp-acid-wash-berserk-skull-blade`, `dp-drop-shoulder-regular-series`).
- **Why it matters:** Competitors put franchise + type + Pakistan (+ COD) in title/meta (Section 2). Google says unique, descriptive titles/meta help users decide (same JS-SEO doc above).
- **Fix — formulas** (use only facts from Section 6 "Allowed facts"):

| Page | Title formula | Example |
|---|---|---|
| Home | `Anime Streetwear & Custom Printing in Pakistan \| Deez Prints` | — |
| Anime Archive | `Anime T-Shirts Pakistan — Naruto, One Piece, JJK, DBZ \| Deez Prints` | — |
| Acid Wash | `Acid Wash T-Shirts in Pakistan — Anime & Graphic \| Deez Prints` | — |
| Drop Shoulder | `Drop Shoulder T-Shirts Pakistan — 240+ GSM Oversized \| Deez Prints` | GSM is from your own guide page |
| Regular | `Regular Fit Graphic T-Shirts Pakistan \| Deez Prints` | — |
| Tapestries | `Anime & Movie Wall Tapestries in Pakistan \| Deez Prints` | — |
| Custom | `Custom T-Shirt Printing in Karachi — DTF, Delivered Across Pakistan \| Deez Prints` | — |
| **Product** | `{Design} {Franchise} {Fit} T-Shirt \| Deez Prints` | `Zoro Bushido One Piece Acid Wash T-Shirt \| Deez Prints` |
| **Product meta** | `{Design} — {Franchise} {fit} tee. 100% cotton, DTF printed in Karachi. Rs. {price}. Free delivery above Rs. 5,000, 7-day exchange.` | ≤ ~155 chars |

  Keep key terms at the front (Google truncates by pixel width, not a fixed character count). Omit `{Franchise}` for originals (Cupid Vintage, See No Evil, Rockstar Tokyo). Homepage: put keywords in the H1 and demote the slogan to a `<p>`.

### SEO-03 · No franchise pages — the biggest keyword gap · **P0** · T4/T5
- **Evidence [LIVE]:** Anime Archive is one 148-item page (tees in three fits + mugs + tapestries) with a one-line intro. Character names appear in product titles but **franchise names almost never do** ("Zoro Bushido", "Sukuna Cursed", "Kaneki Reaper", "Garou Kaijin", "Isagi Yoichi"). Competitors run franchise pages/titles (Section 2).
- **Your inventory depth by franchise** (counted from the live acid-wash / drop-shoulder / regular / tapestry listings — approximate, not a DB count):

| Franchise | Tee designs | Tapestries | Notes |
|---|---|---|---|
| Dragon Ball | ~7 | ~11 | Vegeta, Majin Vegeta, Goku Rage/Shenron/Ronin/Black Rebellion |
| Naruto | ~9 | ~5 | Itachi ×5+, Madara ×2, Naruto |
| One Piece | ~7 | 2 | Luffy ×4, Zoro ×2, Ace |
| Berserk | ~6 | ~4 | Guts ×several, Skull Blade, Warrior |
| Jujutsu Kaisen | ~5 | 0 | Sukuna ×3–4, Gojo, Choso, Maki |
| Bleach | ~3 | 0 | Aizen, Ichigo, Bleach |
| Chainsaw Man / Solo Leveling / Blue Lock / Tokyo Ghoul / HxH / OPM / Demon Slayer | 1–3 each | 0–1 | Combine only if ≥3 products |

- **Fix:** create franchise collection pages **in this order**: Dragon Ball, Naruto, One Piece, Berserk, Jujutsu Kaisen. Each needs a unique intro (see Section 6), the products across all three fits, tapestries of the same franchise, and links to sibling franchises. **Guard rails ([GOOGLE] spam policy — scaled content abuse):** only build a hub if it has ≥3 real products and genuinely unique copy; do not template 100 near-identical pages. https://developers.google.com/search/docs/essentials/spam-policies

### SEO-04 · Sitemap is stale and partly wrong · **P0** · T2
- **Evidence [LIVE]** (readable portion only):
  1. **Every URL has the same `lastmod`, to the millisecond** (`2026-09-16T16:52:45.69xZ`) — pages, collections and products alike. It is stamped at build/request time.
  2. **Lists redirecting URLs:** `/collections/wall-art` resolves to `/collections/tapestries`; `/products/tshirt-acid-4` resolves to `dp-acid-wash-berserk-skull-blade`.
  3. **`/collections/tapestries` (the URL your nav links to) and `/guides`, `/guides/*` do not appear** in the part I could read.
  4. **Stale titles:** image titles in the sitemap still say "Itachi Akatsuki Drop Shoulder Tee" for both `naruto-5` and `naruto-6`, but the live pages are "…- Edition II" / "- Edition III". The sitemap is not generated from current product data.
  5. `<image:title>` is used on every image.
- **Why it matters [GOOGLE]:** Google uses `lastmod` only if it is "consistently and verifiably" accurate (else it is ignored). https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap · Google **removed** `image:title` (also caption/geo_location/license) from its documentation in 2022 — it has "no effect" (harmless, just noise). https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps · Google's image-sitemap page also says image-hosting domains should be verified in Search Console; you can't verify Cloudinary's shared `res.cloudinary.com` (see SEO-08).
- **Fix:** generate the sitemap from the live database with real `updatedAt` per URL; canonical, 200-status URLs only; include tapestries, guides, all collections, all products; drop `image:title`; use a sitemap index (pages / collections / products). If real dates can't be produced, **omit `lastmod`** rather than fake it.

### SEO-05 · Collection pages are thin and mislabeled · **P0** · T5/T10
- **Evidence [LIVE]:**
  - One-line intros, no body copy, no FAQ. Surteez, by contrast, puts an SEO text block under its grid.
  - Homepage tiles say **COMING SOON** for Comic Universe, Minimal Drops and Cinema Collection, but `/collections/cinema-collection` shows **5 products** (Goodfellas ×3, Spider-Man ×2), and the audit found Comic Universe live with 7. All three are in your sitemap and indexable. The Cinema Tapestries you already sell (Godfather, Scarface, Fight Club, American Psycho, Breaking Bad) are **not** shown in Cinema.
  - Anime Archive lists 148 items on one page **[VERIFY page weight]**.
- **Fix:** remove stale "Coming soon" flags; cross-list Cinema tapestries into Cinema Collection; add a 120–200-word unique intro + short FAQ + links to related collections/hubs on every collection; fix the "Collection Collection" bug (SEO-02).

### SEO-06 · Product titles inconsistent — cannibalization + trust risk · **P1** · T3/T4
- **Evidence [LIVE]:** "Madara 1", "Naruto 3", "BERSERK 2", "Living the Dream", "Outlaw", "Formula Speed", "Titan" (unclear what they depict); two casing conventions; **spelling differs across fits of the same design** — "YAMAMOTO INFERNO REGULAR TEE" vs "Yamoto Inferno Drop Shoulder/Acid Wash Tee"; `dp-drop-shoulder-titan` is titled "Sukuna Drop Shoulder Tee" while `dp-acid-wash-titan` is "TITAN ACID WASH TEE"; "Maki Oze Firepower" looks like a misspelling of the character's name **[owner: confirm]**.
- **Fix:** add a `franchise` and `character` field per design and generate titles from them (T4). Owner confirms the mapping CSV — **the agent must not guess franchises.**

### SEO-07 · Internal linking is not contextual · **P1** · T8
- **Evidence [LIVE]:** the "You might also like" block showed **the same items** (Majin Vegeta Acid Wash, Yamoto Inferno Acid Wash, Cupid Vintage Drop Shoulder, plus Zoro/See No Evil) on three unrelated product pages (Zoro Bushido, Berserk Skull Blade, Garou Kaijin Series). The header nav has 5 items; franchise/fit categories are reachable only from the footer and home tiles.
- **Fix:** related items = (1) **same design in the other fits** (Zoro Bushido regular / drop / acid), (2) same franchise, (3) same fit. Add franchise links to the header (mega-menu of real `<a href>` links) and to breadcrumbs (`Home / Anime / One Piece / Zoro Bushido…`). Competitor pattern: Dripzada links sibling products in copy; Surteez uses "Shop by Theme/Style/Colour" blocks.

### SEO-08 · Image SEO · **P1** · T7
- **Evidence [LIVE]:**
  - Filenames are internal codes, not subjects, and contain typos: `baby-whiet-front.jpg`, `curse-whtie-back.jpg`, `aizen-gre-back.jpg`, `naruto-2-grye-front.jpg`, `peter-blyue-front.jpg`, `naruto-1-b_ack-front.jpg`, `regularssss-front.jpg`. Filename ≠ subject: `naruto-2-*.jpg` is the "Madara 1" tee; `zoro-3-*.jpg` is "Fire Fist Ace".
  - Images live on **two Cloudinary accounts** (`okcxaese`, `dsjnjbsgi`; the second has names like `AcidBerserkEmbossF_izdjez.webp`) plus a few self-hosted files (`/assets/products/tapestries/…webp` — the tapestry filenames are good).
  - `<img>` sources in the fetched markup carry **no Cloudinary transformation** (no `f_auto,q_auto,w_…`), while `og:image` does (`c_fill,w_1200,h_630,g_auto,f_jpg,q_auto`). **[VERIFY in DevTools → Network: check actual bytes and `srcset`.]**
  - Alt text: `Deez Prints Zoro Bushido Acid Wash Tee acid wash — front view` (repeats "acid wash"); the first image is output twice with identical alt; "back graphic view" is applied to a file named `…EmbossF…` (front).
  - `og:image:type` says `image/jpeg` for `.webp` files (tapestries, anime archive).
- **Fix:** alt formula `{Character} {Franchise} {fit} t-shirt in {color} — {front|back} view`. Serve images through **your own domain** with descriptive slugs (`/img/zoro-bushido-one-piece-acid-wash-tee-black-front.webp`) that map to Cloudinary — no re-upload needed, fixes filenames, and lets Search Console own the image host. Use `f_auto,q_auto,w_*` + `srcset`; lazy-load below the fold; set width/height; preload the LCP image. Consolidate Cloudinary accounts later (low urgency).

### SEO-09 · Structured data — unknown, and the opportunity is large · **P1** · T6
- **Evidence:** I can't read raw JSON-LD **[VERIFY]**. Test: Google Rich Results Test on a PDP + `view-source:` search for `application/ld+json`.
- **Why it matters [GOOGLE]:** merchant-listing eligibility needs richer product data (offers, shipping, returns); Google now also supports a **site-wide shipping and return policy on `Organization`/`OnlineStore`** that acts as a fallback for products. Your policies are clear and consistent, so this is nearly free. https://developers.google.com/search/docs/appearance/structured-data/product · …/return-policy · …/shipping-policy
- **Fix:** `OnlineStore` (with policies + `sameAs` Instagram), `Product` + `Offer` per PDP, `BreadcrumbList`. **Do not add `aggregateRating`/`Review` until real reviews are visible on the page** (Google requires reviews to be visible). Templates in T6. Owner must confirm handling/transit days and whether returns are exchange-only.

### SEO-10 · No reviews / social proof on pages · **P1**
- **Evidence:** none shown on PDPs **[LIVE]**; HavenWear shows a 4.8/5 rating from 648 reviews **[COMP]**.
- **Fix:** collect verified post-delivery reviews (WhatsApp/email follow-up) and display them on PDPs and franchise pages. Never publish invented reviews.

### SEO-11 · Tapestry landing pages under-built · **P1** · T5
- **Evidence:** see Section 2.2. Also `/guides/tapestry-decor-guide` isn't in the readable sitemap. **[LIVE]**
- **Fix:** intro covering sizes, material, print method, uses (wall, room divider, table cover), care, delivery — **only using facts the owner supplies** — plus "Anime tapestries" and "Movie tapestries" sub-groups; publish size/price ranges per product as `AggregateOffer` low/high.

### SEO-12 · Custom-print page: build for the Karachi service cluster · **P1** · T5
- **Evidence:** competitors rank pages/guides around "t-shirt printing Karachi", DTF, pricing, turnaround, no-minimum (Section 2.3). Your `/guides/streetwear-printing-and-care` already has good DTF vs sublimation vs screen-print content **[LIVE]**.
- **Fix:** add to `/custom-print`: how it works, file specs (you already publish 300 DPI / PNG / sRGB), turnaround, **minimum order (state the truth)**, pricing table or "from Rs. X", FAQ, and a link to the DTF guide. Add the DTF guide to the sitemap and link it prominently.

### SEO-13 · Metadata hygiene on non-shop pages · **P2** · T9
- **[LIVE]** `/payments` and `/guides/streetwear-printing-and-care`: `twitter:title`/`twitter:description` fall back to the homepage copy; guide `<title>` differs from `og:title`. Audit also reported OG fallbacks on `/terms` and `/privacy` (og:url pointing at the homepage) — not re-checked today.
- Low SEO value (social previews, not rankings), cheap to fix.

### SEO-14 · Index status unknown · **P0 (owner action)**
- My tool cannot see Google. Do this first (Section 5, Step 1). Everything else is wasted if pages aren't indexed.

### Risk you should know about (affects keyword strategy)
Your best-matching keywords are franchise trademarks (One Piece, Naruto, Dragon Ball, Jujutsu Kaisen…). Unlicensed merchandise using franchise IP can trigger takedowns and ad/marketplace policy problems, and calling designs "inspired by" doesn't by itself change that. I haven't verified your licensing status. This isn't legal advice — but decide deliberately how much of your SEO you build on trademarked names, and keep original-design collections (Minimal, Art Drop, Street Aesthetic, Cupid Vintage etc.) growing as a hedge.

### Not SEO, but you should see it
`/payments` publishes a full personal name, account number, and phone number as indexable page text **[LIVE]**. Consider moving payment details to the checkout step or a WhatsApp reply rather than a public, indexable page.

---

## 4. Keyword research

### 4.1 Method and limits
- **Where the terms come from:** the titles, H1s, meta descriptions, navigation and copy of the competitors in Section 2, i.e. **terms the market is already targeting** [COMP], plus your own catalogue.
- **No volumes.** Prioritisation below uses *inventory depth × competitor evidence × page you can realistically win*. Replace with real numbers using 4.3.

### 4.2 Keyword map (cluster → target page)

| # | Cluster | Example queries to target | Target page | Competitor evidence | Priority |
|---|---|---|---|---|---|
| 1 | Anime tees (head term) | anime t-shirts pakistan · anime oversized t shirt pakistan · anime streetwear pakistan | `/collections/anime-archive` (+ home) | Surteez, TPLEX, HavenWear, Kayazar titles | P0 |
| 2 | Franchise + tee | dragon ball z t shirt pakistan · goku t shirt · vegeta t shirt · naruto t shirt pakistan · itachi t shirt · one piece t shirt pakistan · luffy / zoro t shirt · berserk / guts t shirt · jujutsu kaisen (jjk) t shirt · gojo / sukuna t shirt · bleach · chainsaw man · solo leveling | New franchise hubs (SEO-03), ordered by depth | Dripzada (One Piece page, Drip no Jutsu), HavenWear, Shopellium nav, TPLEX | P0 |
| 3 | Fit / fabric | drop shoulder t shirt pakistan · oversized graphic tees pakistan · heavyweight 240 gsm t shirt pakistan | `/collections/drop-shoulder`, `/collections/t-shirts` | Surteez (240–250 GSM), Groovy, Teetwo, Chief Apparel, Mint Macro | P0 |
| 4 | Wash style | acid wash t shirt pakistan · mineral wash / washed oversized tee | `/collections/acid-wash` | Surteez mentions "washed and mineral-dyed". In my searches I did not surface a Pakistani D2C store ranking for this — **[VERIFY by a manual Google check; could be an opening]** | P0 |
| 5 | Anime tapestry | anime tapestry pakistan · wall tapestry pakistan · goku / itachi / berserk / one piece tapestry · movie / godfather / scarface tapestry | `/collections/tapestries` + sub-groups | Kafka.pk | P1 |
| 6 | Custom print | custom t shirt printing karachi · dtf printing karachi · print your own design t shirt pakistan · custom hoodie printing | `/custom-print`, DTF guide | PrintsPK, XL DTF Print, MA Printers, Aprints, Printistan | P1 |
| 7 | Accessories | anime mug pakistan · manga panel mug | `/collections/accessories` | AnimeStore.pk sells mugs | P2 |
| 8 | Conversion modifiers | cash on delivery · free delivery pakistan · 7 day exchange · *"price in pakistan" (hypothesis — test in Search Console)* | Titles/meta/FAQ (only truthful ones) | COD in Surteez, Dripzada, HavenWear metas | — |
| 9 | Local | streetwear brand karachi · t shirt printing karachi | Home, custom page, About | Psyche Fusion ("designed in Karachi"), printers | P2 |

Not validated and therefore not recommended yet: Urdu / Roman-Urdu query variants. Test them via Search Console impressions after 4–8 weeks.

### 4.3 Get real numbers — free, 30 minutes
1. **Google Search Console** (Section 5, Step 1): after 2–3 weeks, Performance → Queries. This shows what you actually appear for.
2. **Google Keyword Planner** (free Google Ads account, no spend): paste the Section 4.2 queries, set location Pakistan → volume ranges.
3. **Google Trends**, region Pakistan, last 12 months: compare "one piece" vs "naruto" vs "jujutsu kaisen" vs "dragon ball" (and the tee/tapestry versions). Use it to decide hub order and seasonality.
4. **Google autocomplete:** type each head term + space and record suggestions (this reveals modifiers like "price", "oversized", "for men").
5. **Manual SERP check** for clusters 3–4: note who ranks (marketplaces? Instagram? small stores?) — that shows how winnable each term is.

---

## 5. Roadmap

**Step 1 (owner, day 1 — no code):**
- Verify the site in **Google Search Console** (DNS/domain property). Submit `sitemap.xml`. URL-Inspect the homepage, one PDP, one collection, and `/collections/tapestries`. Read the **Pages** report for "Discovered — not indexed / Crawled — not indexed".
- Add **Bing Webmaster Tools** (import from Search Console).
- Check **Merchant Center**: Business info → Countries → does Pakistan appear in the list? Google's free-listing help page says stores must sell in a supported country (https://support.google.com/merchants/answer/13427531); one third-party page says Pakistan is supported but I could not confirm from Google's own list **[VERIFY]**. If supported, free listings need accurate product feed + shipping/returns.
- Decide COD (conversion) and gather real reviews.

**Week 1 (Antigravity):** T0 recon → T1 (if needed) → T2 sitemap → T3 titles/meta/H1 + bug fixes → T10 "coming soon" cleanup.
**Week 2:** T4 franchise field (owner confirms CSV) → T5 hubs for Dragon Ball, Naruto, One Piece → T6 structured data → T8 internal links.
**Weeks 3–4:** Berserk + JJK hubs, T7 images, T9 hygiene, T11 SEO regression script running on every deploy.
**Ongoing:** 3–5 genuinely useful pages, not volume: (1) drop shoulder vs regular vs oversized — size guide using your real chart; (2) acid-wash care; (3) custom printing Karachi: process + pricing + turnaround; (4) tapestry sizes/hanging (you already have a guide — optimise + link it).

**Measure (baseline in week 1, review every 4 weeks):** indexed pages (Search Console → Pages), impressions and clicks per cluster in 4.2, average position for ~20 chosen queries, CTR on collection pages, orders from organic (analytics). I'm not giving target numbers — I have no baseline to justify any.

**Lower-evidence ideas (test, don't count on):** pitch inclusion in third-party "best oversized t-shirts in Pakistan" listicles (Mint Macro's exists, ranking its own brand — so the format exists); Pinterest pins for tapestries and acid-wash (your domain is already verified; product pins use your og/price tags); consistent brand profile links (`sameAs`) so the name "Deez Prints" is a distinct entity rather than colliding with unrelated "Deez Teez" results.

**What I deliberately do NOT recommend:** keyword-stuffed footers, hundreds of near-duplicate landing pages, fake reviews, bought links. All are exposed to Google's spam policies.

---

## 6. Allowed facts (use only these in copy; nothing else without owner confirmation)

Verified on your own pages today **[LIVE]**:
- 100% cotton; DTF printed in Karachi; "dispatched across Pakistan" (PDP meta).
- Delivery: Karachi Rs. 200 via Bykea; nationwide Rs. 450 via courier; free above Rs. 5,000. 7-day exchange.
- Made to order in Karachi (collection meta); homepage: "Delivered across Pakistan in 3–5 days" (twitter meta; **owner confirm**).
- Guide page: Drop shoulder **240+ GSM**, 100% combed compact cotton; Regular **180–200 GSM** ring-spun cotton jersey; Hoodies **350+ GSM**; Acid wash = "hand-processed mineral wash", each piece different.
- Payments: Meezan transfer, Easypaisa, JazzCash, Raast (no COD).
- Custom artwork specs: 300 DPI, PNG transparent, sRGB; AI/PDF/SVG accepted.

### Draft copy blocks (edit, don't paste blindly — `[OWNER]` = you must confirm)

**Acid Wash (collection intro, ~130 words)**
> Acid wash t-shirts in Pakistan, printed and finished in Karachi. Each piece goes through a hand-processed mineral wash, so the faded seams and vintage texture are different on every tee. Choose from anime, graphic and original designs — Naruto, One Piece, Dragon Ball, Jujutsu Kaisen and more — printed with DTF on 100% cotton. [OWNER: state acid-wash GSM if known.] Delivery is Rs. 200 in Karachi and Rs. 450 nationwide, free above Rs. 5,000, with 7-day exchange. Looking for a plain wash-free fit? See our drop shoulder and regular tees.

**One Piece hub (template for other franchises)**
> One Piece t-shirts in Pakistan: Luffy Gear 5, Straw Hat, Freedom and Zoro Ronin/Bushido designs, plus Fire Fist Ace, in regular, drop-shoulder (240+ GSM) and acid-wash fits. Printed with DTF in Karachi on 100% cotton. Prefer a wall piece? Browse One Piece tapestries. [OWNER: add one line on how you choose/print designs — real, not generic.]

**Tapestries (collection intro)**
> Anime and movie wall tapestries, made to order in Karachi: Dragon Ball, Naruto, Berserk, One Piece, Godfather, Scarface, Fight Club and more. [OWNER: sizes available · material · print method · how to hang · washing.] Delivered across Pakistan.

**FAQ starter set (each page gets 3–5 real Q&As):** delivery time and cost; exchange policy; how to pick a size (link size chart); what GSM means / how heavy; how to wash acid-wash; can I order a custom design; which payment methods.

---

## 7. Sources

Google: build-sitemap · image-sitemaps · structured-data/product · return-policy · shipping-policy · javascript-seo-basics · essentials/spam-policies (all under `developers.google.com/search/docs/…`); Merchant Center free listings `support.google.com/merchants/answer/13427531`.
Competitors: URLs in the tables in Section 2.
Live site: fetched 19 Sep 2026 — `/`, `/robots.txt`, `/sitemap.xml` (truncated), `/collections/acid-wash`, `/collections/anime-archive`, `/collections/cinema-collection`, `/collections/tapestries` (via `/collections/wall-art`), `/products/dp-acid-wash-zoro-2`, `/products/tshirt-acid-4`, `/products/dp-drop-shoulder-regular-series`, `/guides/streetwear-printing-and-care`, `/payments`.
# APPENDIX B — VERBATIM: antigravity-seo-tasks.md

# Antigravity Task Pack — Deez Prints SEO
Companion to `deezprints-seo-playbook.md`. Issue IDs (SEO-xx) refer to that file.

## How to use this in Antigravity
1. **Add the guardrail rule once.** Antigravity → agent panel `…` menu → **Customizations → Rules → + Workspace**, paste Part A. (Or save it as `.agents/rules/seo-guardrails.md` in the repo; Antigravity also reads `AGENTS.md` at the repo root.) Keep it short — rule files have a size limit (a third-party guide cites 12,000 characters).
2. **Run tasks in order, one per conversation/branch.** Paste one task from Part B, let the agent produce a plan, **read the plan before approving**, then review the diff.
3. **Task T0 is read-only.** Do it first. Its output (`SEO_RECON.md`) tells the agent (and you) what the codebase actually is, so later tasks don't guess.
4. Each task ends with **verification commands**. If the agent can't run them, run them yourself and paste the output back.

---

# Part A — Workspace rule (paste into Rules → + Workspace)

```markdown
# SEO guardrails — deezprints.com

## Facts
- Never invent product facts (GSM, sizes, materials, delivery times, review data, stock, prices). Use only values from the product/data source or from SEO_FACTS.md. If a fact is missing, leave a clearly marked TODO and list it in your report.
- Never invent franchise/character mappings. Propose them in a CSV for the owner to confirm.
- Never fabricate reviews, ratings, or aggregateRating markup. Add review markup only if real reviews are rendered visibly on that page.

## Safety
- Work on a new git branch per task. Do not push to production branches.
- Do not remove or rename any public URL without adding a permanent redirect (HTTP 301) from the old URL to the new one.
- Do not change visual design, layout, or copy unless the task says so. SEO changes should be invisible unless specified.
- Do not touch payment details, checkout logic, auth, or environment secrets.
- Do not add tracking scripts or new third-party dependencies without listing them and asking first.

## Method
- Before editing: discover how the project actually works (framework, rendering mode, where <head> tags are set, where product data lives). Do not assume Next.js — inspect.
- Show a short plan first. After editing, run the verification commands in the task and paste the real output. If you could not run something, say so; do not claim it passed.
- Prefer small, reviewable diffs. Add tests where a test framework exists.
- Every SEO-visible string (title, meta description, H1, alt, JSON-LD) must come from ONE function per page type, so the visible page and structured data cannot disagree.

## Style rules for generated SEO text
- Title: keyword-first, brand last (" | Deez Prints"). Unique per URL. No repeated words ("Acid Wash … | ACID WASH").
- Meta description: unique per URL, ~120–155 chars, factual, includes at most one call to action. No template sentence shared across all products.
- Never output the strings "Collection Collection" or "graphic graphic".
- Product names: Title Case, preserve acronyms (DBZ, JJK).
```

**`SEO_FACTS.md`** (create in repo root — the only facts the agent may use in copy):
```markdown
# Facts approved for SEO copy (source: deezprints.com, checked 19 Sep 2026)
- 100% cotton; DTF printed in Karachi; dispatched across Pakistan.
- Delivery: Karachi Rs. 200 (Bykea); nationwide Rs. 450 (courier); free above Rs. 5,000.
- Exchange window: 7 days.
- Made to order in Karachi.
- Drop shoulder tees: 240+ GSM, 100% combed compact cotton.
- Regular tees: 180–200 GSM ring-spun cotton jersey.
- Hoodies: 350+ GSM.
- Acid wash: hand-processed mineral wash; each piece differs.
- Payments: Meezan Bank transfer, Easypaisa, JazzCash, Raast. (No COD.)
- Custom artwork: 300 DPI, PNG with transparent background, sRGB; AI/PDF/SVG accepted.
# OWNER TO CONFIRM BEFORE USE: delivery time (3–5 days incl. printing?), handling days, transit days, minimum order for custom print, acid-wash GSM, tapestry sizes/material, whether returns are exchange-only.
```

---

# Part B — Tasks

## T0 · Recon (read-only) — do first
```
TASK T0 — READ-ONLY RECON. Do not modify any file except creating SEO_RECON.md.

Goal: establish how this site is built so later SEO work does not rely on guesses.

1. Identify: framework and version, build tool, rendering mode (client-only SPA / SSR / static prerender), hosting/deploy config, router, where <head> tags (title, meta, canonical, OG, twitter) are set, where product/collection data lives (DB? JSON? CMS?), how the sitemap is generated, how legacy redirects are implemented (e.g. /products/tshirt-acid-4 -> /products/dp-acid-wash-berserk-skull-blade; /collections/wall-art -> /collections/tapestries) and whether they are HTTP 301s or client-side, how the "COMING SOON" flag on homepage collection tiles is stored, and how images are referenced (Cloudinary accounts, self-hosted /assets).
2. Run these against production and record status codes and raw-HTML findings:
   for u in / /collections/acid-wash /collections/tapestries /collections/wall-art /products/dp-acid-wash-zoro-2 /products/tshirt-acid-4 /guides/streetwear-printing-and-care /products/not-a-real-page-xyz; do echo "== $u"; curl -s -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "https://deezprints.com$u"; done
   For /, /collections/acid-wash and /products/dp-acid-wash-zoro-2, fetch RAW HTML (curl -s, no JS) and report: is <title> present? how many <h1>? is <link rel="canonical"> present? is any <script type="application/ld+json"> present? is the product grid / price / description text present in the raw HTML?
3. Fetch https://deezprints.com/sitemap.xml completely. Report: total URL count; count of URLs whose lastmod is identical; which URLs redirect (test every one with curl -s -o /dev/null -w "%{http_code}"); whether /collections/tapestries and /guides* are present; whether any URL returns 404.
4. Inspect the homepage <h1> DOM: are the words separated by whitespace or only by separate spans?
5. In the browser (or via network logs), report actual image bytes/format served on a product page and on /collections/anime-archive (does it load all 148 items at once? are Cloudinary transformations f_auto,q_auto,w_* applied?).

Deliverable: SEO_RECON.md with findings, exact file paths for each thing above, and the raw command output. Do not fix anything. End with a list of open questions for the owner.
```

## T1 · Prerender / SSR — **only if T0 shows client-only rendering** · SEO-01
```
TASK T1 — CONDITIONAL. Read SEO_RECON.md first. If raw HTML for product/collection/home pages already contains title, single h1, canonical and page content, STOP and report "not needed".

If pages are client-rendered: implement the smallest change that makes the initial HTML response contain, for every product, collection, home, guide and static page: <title>, meta description, canonical, OG/Twitter tags, ONE <h1>, the main text content, product name/price, internal <a href> links, and JSON-LD (added in T6). Options in order of preference: (a) build-time prerender of every route from the data source, (b) SSR/framework migration only if (a) is impractical. Do not use user-agent-based switching. Present the options with trade-offs and wait for approval before building.

Also make unknown URLs return a real HTTP 404 (not 200 with a "not found" view) and render a noindex 404 page. Preserve existing 301 redirects.

Verify: rerun the raw-HTML curl checks from T0 on 6 URLs and paste output; curl -sI on a bogus URL must show 404.
```

## T2 · Rebuild sitemap.xml · SEO-04
```
TASK T2 — SITEMAP.
Rebuild sitemap generation so it is driven by live data:
- Include ONLY canonical, indexable URLs that return HTTP 200 with no redirect: home, /collections, every collection (including /collections/tapestries — NOT /collections/wall-art), every product, /custom-print, /about, /contact, /faq, /shipping, /returns, /payments, /guides, every /guides/* page. Exclude legal pages only if the owner asks (default: include). Exclude noindex pages and pagination (?page=N).
- <lastmod> = the real last-modified time of that page's content (product updatedAt; collection = latest product updatedAt or its own updatedAt; static pages = git commit time of the source file). If a trustworthy date is unavailable, OMIT lastmod for that URL. NEVER use the build/request time.
- Keep image entries but output only <image:loc> (no image:title/caption). Image URLs must be the canonical image URLs used on the page (after T7, the own-domain URLs).
- Use a sitemap index: sitemap-pages.xml, sitemap-collections.xml, sitemap-products.xml. Keep robots.txt "Sitemap:" line pointing to the index. Keep Allow: / and Disallow: /api/.
- Regenerate automatically on deploy.

Verify (paste output): (1) count of URLs; (2) `curl -s -o /dev/null -w "%{http_code}" -L --max-redirs 0 <url>` for EVERY sitemap URL — all 200; (3) count of distinct lastmod values (must be >1, or lastmod absent); (4) grep confirming no `image:title`; (5) confirm /collections/wall-art and /products/tshirt-acid-* are absent.
```

## T3 · Titles, meta descriptions, H1s + bug fixes · SEO-02, SEO-06 (part)
```
TASK T3 — TITLES/META/H1. Read SEO_FACTS.md and the rule file.
Create ONE module (e.g. seo/meta.ts) exporting functions: homeMeta, collectionMeta(collection), productMeta(product), staticPageMeta(page). All <title>, meta description, og:*, twitter:*, and H1 for these page types must come from it.

Templates:
- Home: title "Anime Streetwear & Custom Printing in Pakistan | Deez Prints". H1 = "Anime Streetwear & Custom Printing in Pakistan". Move the slogan "Wear What You Create." to a non-heading element (keep the visual look). Ensure words in any headline are separated by real whitespace in the DOM.
- Collections (per-slug map; edit copy in one config file):
  anime-archive: "Anime T-Shirts Pakistan — Naruto, One Piece, JJK, DBZ | Deez Prints"
  acid-wash: "Acid Wash T-Shirts in Pakistan — Anime & Graphic | Deez Prints"
  drop-shoulder: "Drop Shoulder T-Shirts Pakistan — 240+ GSM Oversized | Deez Prints"
  t-shirts: "Regular Fit Graphic T-Shirts Pakistan | Deez Prints"
  tapestries: "Anime & Movie Wall Tapestries in Pakistan | Deez Prints"
  hoodies, accessories, comic-universe, minimal-drops, cinema-collection, art-drop, street-aesthetic: propose titles following the same pattern (keyword first, "Pakistan", brand last) and list them for owner approval.
  Meta description per collection: unique, from SEO_FACTS.md only.
- Product: title "{design} {franchise?} {fitLabel} T-Shirt | Deez Prints" (omit franchise if null; fitLabel ∈ "Acid Wash" | "Drop Shoulder" | "Regular Fit"; never repeat the fit word). H1 = same phrase without brand. Meta description = "{design} — {franchise?} {fit blurb}. 100% cotton, DTF printed in Karachi. Rs. {price}. Free delivery above Rs. 5,000, 7-day exchange." (≤155 chars; trim safely). Fit blurbs from SEO_FACTS.md only (acid wash: hand-processed mineral wash; drop shoulder: oversized, 240+ GSM; regular: 180–200 GSM). Do not state GSM for acid wash.
- Fix the bug producing "Cinema Collection Collection" (collection names already ending in "Collection" must not get the suffix appended) and the "graphic graphic" duplicate.
- Normalize product display names to Title Case (preserve DBZ, JJK). Do not change slugs.
- Until T4 adds franchise data, franchise is null and titles fall back gracefully.

Add unit tests: no title contains a repeated adjacent word, "Collection Collection", or is empty; all product titles unique (report duplicates, do not crash).

Verify: print title + meta description + H1 for these URLs after the change: /, /collections/anime-archive, /collections/acid-wash, /collections/cinema-collection, /collections/tapestries, /products/dp-acid-wash-zoro-2, /products/dp-drop-shoulder-titan. Paste the output.
```

## T4 · Franchise/character data + owner-review CSV · SEO-03, SEO-06
```
TASK T4 — FRANCHISE DATA. Do NOT guess.
1. From the product data source, export franchise_mapping.csv with columns: slug, current_title, fit, proposed_character, proposed_franchise, confidence (high/low), needs_owner_review (yes/no), notes.
2. Use these seed hints only where the title contains the keyword; otherwise leave franchise blank and set needs_owner_review=yes:
   One Piece: Luffy, Zoro, Ace (Fire Fist Ace). Dragon Ball: Goku, Vegeta, Majin Vegeta, Shenron. Naruto: Naruto, Itachi, Madara, Akatsuki. Jujutsu Kaisen: Sukuna, Gojo, Choso, Maki. Bleach: Ichigo, Aizen, Bleach. Berserk: Guts, Berserk. Chainsaw Man: Denji, Chainsaw(man). Solo Leveling: Solo Leveling. Blue Lock: Isagi, Bluelock. Tokyo Ghoul: Kaneki. One Punch Man: Garou. Hunter x Hunter: Kurapika. Demon Slayer: Tanjiro. Marvel: Spider-Man, Peter Parker, Spiderverse. DC: Batman, Dark Knight. Cinema: Goodfellas, Scarface, Godfather, Fight Club, American Psycho, Breaking Bad. TV: Rick & Morty.
   ALWAYS flag for owner review (do not fill): "Yamoto/Yamamoto Inferno", "Titan", "Formula Speed", "Cupid Vintage", "See No Evil", "Rockstar Tokyo", "Outlaw", "Living the Dream", "Maki Oze" (possible misspelling), any design whose slug root and title disagree (e.g. dp-drop-shoulder-titan is titled "Sukuna Drop Shoulder Tee").
3. Also list: the same design appearing with different name spellings across fits; and designs present in one fit but not others.
4. Add nullable fields `franchise`, `character`, `designKey` (shared across the regular/drop-shoulder/acid-wash versions of one design) to the data model, but leave them empty until the owner returns the confirmed CSV. Then write an import script that fills them from the confirmed CSV.
Deliverable: franchise_mapping.csv + the schema/migration + import script. Stop for owner review.
```

## T5 · Collection copy + franchise hubs · SEO-03, SEO-05, SEO-11, SEO-12
```
TASK T5 — COLLECTION CONTENT AND FRANCHISE HUBS. Requires T4 confirmed data.
A. Add to EVERY collection page (below the product grid, above the footer): a unique intro of 120–200 words (from a content file the owner edits: content/collections/{slug}.md), an FAQ of 3–5 real questions, and "related collections" links. Use the draft copy in the playbook Section 6 as starting text; leave [OWNER] placeholders visible in the content file and do NOT publish text containing "[OWNER" — fail the build if any remains.
B. Create franchise collection pages under /collections/{franchise-slug} (e.g. /collections/one-piece-t-shirts) in this order: dragon-ball, naruto, one-piece, berserk, jujutsu-kaisen. Each page: unique H1/title/meta from T3 templates, intro copy from content/collections/, all matching products across all fits, matching tapestries, links to sibling franchise pages, breadcrumb Home / Anime Archive / {Franchise}.
   Guard: create/index a hub only if it has >= 3 products AND owner-approved unique copy; otherwise noindex it and omit it from the sitemap. Do NOT auto-generate hubs for every franchise or character.
C. Cinema: cross-list the existing Godfather, Scarface, Fight Club, American Psycho, Breaking Bad tapestries into /collections/cinema-collection (without duplicating URLs — same product URL, canonical unchanged).
D. Tapestries: group into "Anime tapestries" and "Movie tapestries" sections on /collections/tapestries. Do not invent sizes/materials — read from product data or leave placeholders.
E. Custom print page (/custom-print): add sections How it works, File specs (already published in the DTF guide), Turnaround, Minimum order, Pricing, FAQ, link to /guides/streetwear-printing-and-care — all values from the owner; placeholders otherwise.
F. Header: add a crawlable mega-menu (real <a href>) linking Anime Archive, franchise hubs, Acid Wash, Drop Shoulder, Regular, Tapestries, Custom Print.
Verify: raw-HTML curl of each new page shows one h1, canonical, intro text, product links; all are in sitemap-collections.xml (except noindex ones); build fails on leftover "[OWNER".
```

## T6 · Structured data (JSON-LD) · SEO-09
```
TASK T6 — STRUCTURED DATA. First read Google's docs and follow them exactly:
https://developers.google.com/search/docs/appearance/structured-data/product
https://developers.google.com/search/docs/appearance/structured-data/return-policy
https://developers.google.com/search/docs/appearance/structured-data/shipping-policy
Generate JSON-LD from the SAME data/function that renders the visible page (price, name, availability must match what users see).

1. Site-wide (in the raw HTML of every page): OnlineStore with name "Deez Prints", url, logo (raster/SVG URL that works), sameAs [Instagram URL], contactPoint email, address {addressLocality: Karachi, addressCountry: PK} (no street unless owner supplies one), hasMerchantReturnPolicy and shipping policy per the docs above.
2. Product pages: Product (name from T3, description = unique visible description, image[] = all gallery images, sku, brand Deez Prints, material "100% cotton" only if shown on page), offers -> Offer {url, priceCurrency PKR, price (numeric string, no commas), availability from real stock, itemCondition NewCondition}, plus shippingDetails/hasMerchantReturnPolicy where the docs allow. For products with size variants use ProductGroup/hasVariant only if variants have distinct SKUs/URLs; otherwise a single Offer. For tapestries priced "From Rs. X" use AggregateOffer lowPrice/highPrice from real variant prices.
3. BreadcrumbList on products, collections, guides, matching the visible breadcrumb.
4. DO NOT output aggregateRating or Review unless real reviews are rendered on the page.
5. Values I don't know — OWNER must supply, otherwise omit the property: handlingTime, transitTime, returnFees, whether returns are exchange-only (if so, use refundType ExchangeRefund only if Google's docs list it — check), the Karachi Rs. 200 vs nationwide Rs. 450 split (only model what Google's schema can express; do not invent regions).

Reference skeleton (fill from data; remove anything unconfirmed):
{
  "@context":"https://schema.org","@type":"Product",
  "name":"{seoName}","description":"{visibleDescription}",
  "image":["{img1}","{img2}"],"sku":"{sku}",
  "brand":{"@type":"Brand","name":"Deez Prints"},
  "offers":{"@type":"Offer","url":"{canonical}","priceCurrency":"PKR","price":"{price}",
    "availability":"https://schema.org/InStock","itemCondition":"https://schema.org/NewCondition",
    "shippingDetails":{"@type":"OfferShippingDetails",
      "shippingRate":{"@type":"MonetaryAmount","value":"{450 — owner confirm}","currency":"PKR"},
      "shippingDestination":{"@type":"DefinedRegion","addressCountry":"PK"}},
    "hasMerchantReturnPolicy":{"@type":"MerchantReturnPolicy","applicableCountry":"PK","returnPolicyCountry":"PK",
      "returnPolicyCategory":"https://schema.org/MerchantReturnFiniteReturnWindow","merchantReturnDays":7}}
}

Verify: paste JSON-LD extracted from RAW HTML (curl) for 1 product, 1 collection, home; validate each with Google's Rich Results Test and validator.schema.org (the owner runs these — give the exact URLs to test). Report every warning.
```

## T7 · Images · SEO-08
```
TASK T7 — IMAGES. Measure first: run Lighthouse (npx lighthouse https://deezprints.com/products/dp-acid-wash-zoro-2 --only-categories=performance --output=json) on /, /collections/anime-archive and one product; record LCP, total image bytes, image count. Save as before.json.

Then:
1. Alt text generator (one function): "{character} {franchise?} {fit} t-shirt in {color} — {front|back} view". Front/back must be derived from the actual image role, not guessed. Remove duplicated words. Do not output the same image twice in a gallery with the same alt.
2. Own-domain image URLs: add a route (or rewrite/proxy) /img/{descriptive-slug}.{webp|jpg} that resolves to the existing Cloudinary asset. Slug pattern: {design-slug}-{franchise-slug?}-{fit}-{color}-{front|back}. Keep a mapping table (generated, reviewable) — do NOT re-upload or delete Cloudinary assets. Serve long-lived cache headers. Old Cloudinary URLs must keep working.
3. Delivery: request Cloudinary transformations f_auto,q_auto and width-appropriate w_ via srcset/sizes; lazy-load images below the fold; set explicit width/height; preload the LCP image on product and home pages; on collection pages, paginate or progressively load rather than rendering 148 items at once, keeping ordinary <a href> links crawlable.
4. og:image:type must match the actual file type.
5. Update sitemap image entries to the new own-domain URLs (T2).
Re-run Lighthouse; save after.json; report before/after numbers honestly (if worse, say so).
```

## T8 · Contextual internal linking · SEO-07
```
TASK T8 — INTERNAL LINKS. Requires T4.
Replace the static "You might also like" list with: (1) the same design in its other fits (via designKey) labelled e.g. "Also available: Regular / Drop Shoulder / Acid Wash", (2) up to 4 products from the same franchise, (3) up to 4 from the same fit. Never show the same 4 products on every page. Use plain <a href> links with descriptive anchor text (product name + fit), rendered in the initial HTML. Add the franchise link to breadcrumbs (Home / Anime Archive / {Franchise} / {Product}) and matching BreadcrumbList. On franchise hubs, link to tapestries of the same franchise and vice-versa.
Verify: for 5 different products, paste the raw-HTML related-link lists — they must differ appropriately.
```

## T9 · Metadata hygiene · SEO-13
```
TASK T9. Make twitter:title/description derive from the same per-page values as og:title/description on EVERY page type (currently /payments and /guides/* fall back to homepage copy). Give /terms and /privacy page-specific og:title/description/url equal to their canonical. Make guide <title> and og:title consistent. Set og:image:type from the real file extension. Verify by printing the head tags for /payments, /guides/streetwear-printing-and-care, /terms, /privacy.
```

## T10 · "Coming soon" and thin-collection cleanup · SEO-05
```
TASK T10. Find where the homepage tile "COMING SOON" flag is set. Set the flag automatically from data: a collection with >=1 published product is NOT "coming soon". Report the current product count for comic-universe, minimal-drops, cinema-collection, art-drop, street-aesthetic. Any collection with 0 products: render noindex, remove from sitemap, keep the tile. Any with 1–2 products: keep indexable but do not create a hub. Do not delete any URL.
```

## T11 · SEO regression script (the "system") · all
```
TASK T11. Create scripts/seo-check.mjs (Node, no heavy deps) and run it in CI / pre-deploy. It reads the sitemap index and, for every URL, checks the RAW HTML response (no JS):
- status 200 with redirects disabled; canonical equals the URL itself; exactly one <h1>; <title> and meta description present and unique across the site (list duplicates); title does not contain "Collection Collection" or an adjacent repeated word; product pages contain a parseable Product JSON-LD whose price equals the visible price; every <img> has non-empty alt; sitemap lastmod values are not all identical; no sitemap URL redirects; a bogus URL returns 404.
Exit non-zero on any failure; print a short table. Also add `npm run seo:check`. Paste the first run's output — expected: many failures BEFORE T2/T3, fewer after.
```

---

# Part C — Things only you can do (Antigravity cannot)

1. **Google Search Console:** verify `deezprints.com` as a Domain property (DNS TXT), submit the sitemap index, URL-Inspect 5 URLs, read the Pages report. Repeat weekly for a month.
2. **Bing Webmaster Tools:** import from Search Console.
3. **Rich Results Test** (search.google.com/test/rich-results) on one product, one collection, home — after T6.
4. **Keyword numbers:** Keyword Planner + Google Trends (Pakistan) + autocomplete, per Playbook 4.3.
5. **Merchant Center:** check whether Pakistan is selectable under Business info → Countries (Playbook Step 1).
6. **Answer the owner questions:** delivery times, minimum order for custom print, tapestry sizes/material, returns exchange-only?, acid-wash GSM, COD decision.
7. **Confirm `franchise_mapping.csv`** (T4).
8. **Collect real reviews** and decide where to display them.
9. **Legal check** on how much of the catalogue relies on franchise names (Playbook, "Risk you should know about").
# 9. CURRENT RESEARCH SOURCES USED FOR THE NEW/CORRECTED MATERIAL

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google title links: https://developers.google.com/search/docs/appearance/title-link
- Google snippets/meta descriptions: https://developers.google.com/search/docs/appearance/snippet
- Google crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google URL structure: https://developers.google.com/search/docs/crawling-indexing/url-structure
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google image SEO: https://developers.google.com/search/docs/appearance/google-images
- Google image sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
- Google product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Google merchant listing structured data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google product variants: https://developers.google.com/search/docs/appearance/structured-data/product-variants
- Google Organization/OnlineStore: https://developers.google.com/search/docs/appearance/structured-data/organization
- Google canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Google faceted navigation: https://developers.google.com/crawling/docs/faceted-navigation
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google generative AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google generative AI optimization guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google generative AI content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google current Search documentation updates: https://developers.google.com/search/updates
- Google Merchant Center free listings: https://support.google.com/merchants/answer/13889434
- Google Merchant Center supported countries: https://support.google.com/merchants/answer/12472394
- Google Merchant Center canonical_link: https://support.google.com/merchants/answer/9340054
- Google Merchant Center clothing/apparel best practices: https://support.google.com/merchants/answer/7348545
- Google Business Profile local ranking: https://support.google.com/business/answer/7091
- web.dev Core Web Vitals workflow: https://web.dev/articles/vitals-tools
- Google ecommerce data and surfaces: https://developers.google.com/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google
- Google structured-data search gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Google Breadcrumb structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Bing Webmaster Guidelines (web + AI/grounding guidance): https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a
- Bing IndexNow: https://www.bing.com/webmasters/help/indexnow-0z209wby and https://www.bing.com/indexnow/getstarted
- Bing AI Performance announcement: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- OpenAI product discovery in ChatGPT: https://openai.com/index/powering-product-discovery-in-chatgpt/
- OpenAI ChatGPT shopping selection guidance: https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search
- OpenAI Shopping Research: https://help.openai.com/en/articles/12911370-using-shopping-research
- OpenAI stable product-feed specification: https://developers.openai.com/commerce/specs/file-upload/products
- OpenAI Merchant Feed Terms: https://openai.com/policies/merchant-feed-terms-of-service/
- Competitor: Surteez anime collection: https://surteez.com/collections/anime-t-shirts-hoodies
- Competitor: Surteez oversized collection: https://surteez.com/collections/oversized-graphic-t-shirts
- Competitor: Dripzada One Piece collection: https://dripzada.com/collections/anime-tees/one-piece/
- Competitor: Dripzada Hunter x Hunter collection: https://dripzada.com/collections/anime-tees/hunter-x/
- Competitor: HavenWear anime collection: https://havenwearpakistan.com/collections/anime-collection-1
- Competitor: Aesthetic Gen anime guide: https://aestheticgen.com/blogs/news/best-anime-t-shirts-in-pakistan-2026-complete-guide
- Competitor: Aesthetic Gen oversized guide: https://aestheticgen.com/blogs/news/best-oversized-t-shirts-in-pakistan-2026-complete-buying-guide
- Competitor: Shopellium One Piece collection: https://shopellium.com/collections/one-piece
- Competitor: Alpha Tees: https://www.alphatees.store/
- Competitor: Skribi oversized-fit guide: https://skribiofficial.com/blogs/news/oversized-t-shirts-in-pakistan-a-size-guide-to-getting-the-fit-right
- Tapestry competitor: IBRELIA Breaking Bad tapestry: https://ibrelia.com/products/breaking-bad-heisenberg-wall-tapestry-pakistan
- Tapestry competitor: Everanta Attack on Titan tapestry: https://everanta.in/products/attack-on-titan-final-season-anime-tapestry

**Important:** Research additions above were written against current official documentation available on 20 Sep 2026. Re-check official docs before making future changes that depend on eligibility, country support, or Search feature availability.
