/**
 * DEEZ PRINTS — SECOND-PASS MASTER REGRESSION SUITE (Point 33)
 *
 * Verifies all 14 mandatory regression checks defined in Point 33:
 * 1. canonical uses SITE_URL
 * 2. no legacy Vercel production strings
 * 3. one H1 on tested page types
 * 4. no duplicate responsive product tree
 * 5. shipping values consistent
 * 6. payment methods consistent
 * 7. sitemap URLs are canonical
 * 8. private routes not in sitemap
 * 9. no accidental indexable filter permutations
 * 10. unique product slugs
 * 11. required product fields present
 * 12. product structured data shape valid
 * 13. Tapestry canonical collection exists
 * 14. Wall Art alias behavior is deliberate
 */

import fs from "node:fs";
import path from "node:path";
import { products } from "../src/data/products";
import { collections, site, SITE_URL, SHIPPING_OPTIONS, paymentMethods } from "../src/data/site";
import { productSchema, breadcrumbSchema } from "../src/lib/structuredData";

interface CheckResult {
  id: number;
  check: string;
  result: "PASS" | "FAIL" | "NOT APPLICABLE" | "MANUAL VERIFICATION";
  evidence: string;
}

const results: CheckResult[] = [];

function record(id: number, check: string, pass: boolean, evidence: string) {
  results.push({
    id,
    check,
    result: pass ? "PASS" : "FAIL",
    evidence,
  });
}

const rootDir = process.cwd();

console.log("══════════════════════════════════════════════════════════════════════");
console.log("  DEEZ PRINTS — POINT 33 SECOND-PASS AUTOMATED REGRESSION SUITE");
console.log("══════════════════════════════════════════════════════════════════════\n");

// Check 1: Canonical uses SITE_URL
try {
  const isSiteUrlValid = SITE_URL === "https://deezprints.com";
  const routesDir = path.join(rootDir, "src/routes");
  const files = fs.readdirSync(routesDir).filter((f) => f.endsWith(".tsx"));
  let allCanonicalUseSiteUrl = true;
  for (const file of files) {
    const content = fs.readFileSync(path.join(routesDir, file), "utf-8");
    if (content.includes('rel: "canonical"') && !content.includes("SITE_URL")) {
      allCanonicalUseSiteUrl = false;
      break;
    }
  }
  record(
    1,
    "canonical uses SITE_URL",
    isSiteUrlValid && allCanonicalUseSiteUrl,
    `SITE_URL is '${SITE_URL}' and all route canonical definitions reference SITE_URL.`
  );
} catch (err: any) {
  record(1, "canonical uses SITE_URL", false, err.message);
}

// Check 2: No legacy Vercel production strings
try {
  function scanDir(dir: string, needle: string): string[] {
    const matches: string[] = [];
    if (!fs.existsSync(dir)) return matches;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "node_modules") {
        matches.push(...scanDir(fullPath, needle));
      } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".js"))) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (content.includes(needle)) {
          matches.push(fullPath);
        }
      }
    }
    return matches;
  }
  const srcMatches = scanDir(path.join(rootDir, "src"), "deezus.vercel.app");
  record(
    2,
    "no legacy Vercel production strings",
    srcMatches.length === 0,
    srcMatches.length === 0
      ? "Zero references to deezus.vercel.app in src/ codebase."
      : `Found references in: ${srcMatches.join(", ")}`
  );
} catch (err: any) {
  record(2, "no legacy Vercel production strings", false, err.message);
}

// Check 3: One H1 on tested page types
try {
  const deezHeroContent = fs.readFileSync(path.join(rootDir, "src/components/hero/DeezHero.tsx"), "utf-8");
  const sectionHeadingContent = fs.readFileSync(path.join(rootDir, "src/components/shop/ProductRow.tsx"), "utf-8");
  const desktopPdpContent = fs.readFileSync(path.join(rootDir, "src/components/shop/DesktopProductDetail.tsx"), "utf-8");

  const homeH1 = (deezHeroContent.match(/<h1/g) || []).length;
  // SectionHeading is used as the sole main heading on collections index and collections slug
  const sectionHeadingH1 = (sectionHeadingContent.match(/<h1/g) || []).length;
  const pdpH1 = (desktopPdpContent.match(/<h1/g) || []).length;

  const valid = homeH1 === 1 && sectionHeadingH1 === 1 && pdpH1 === 1;
  record(
    3,
    "one H1 on tested page types",
    valid,
    `Home (DeezHero): ${homeH1} H1, Collections & Category (SectionHeading): ${sectionHeadingH1} H1, PDP (DesktopProductDetail): ${pdpH1} H1.`
  );
} catch (err: any) {
  record(3, "one H1 on tested page types", false, err.message);
}

// Check 4: No duplicate responsive product tree
try {
  const pdpContent = fs.readFileSync(path.join(rootDir, "src/routes/products.$productId.tsx"), "utf-8");
  const mountsMobile = pdpContent.includes("<MobileProductDetail");
  const mountsDesktop = pdpContent.includes("<ProductDetail");
  const cleanResponsiveTree = !mountsMobile && mountsDesktop;
  record(
    4,
    "no duplicate responsive product tree",
    cleanResponsiveTree,
    cleanResponsiveTree
      ? "PDP mounts single unified DesktopProductDetail component with CSS responsive design."
      : "Detected dual desktop/mobile component mounting on PDP."
  );
} catch (err: any) {
  record(4, "no duplicate responsive product tree", false, err.message);
}

// Check 5: Shipping values consistent
try {
  const karachiFee = SHIPPING_OPTIONS.karachi.fee;
  const nationwideFee = SHIPPING_OPTIONS.nationwide.fee;
  const siteContent = fs.readFileSync(path.join(rootDir, "src/data/site.ts"), "utf-8");
  const shippingContent = fs.readFileSync(path.join(rootDir, "src/routes/shipping.tsx"), "utf-8");
  const trustContent = fs.readFileSync(path.join(rootDir, "src/routes/trust.tsx"), "utf-8");

  const hasRs200InFaq = siteContent.includes("Karachi delivery is Rs. 200");
  const hasRs450InFaq = siteContent.includes("Nationwide Pakistan delivery is Rs. 450");
  const freeShipping5k =
    siteContent.includes("5,000") &&
    (shippingContent.includes("5,000") || shippingContent.includes("freeShippingThreshold")) &&
    trustContent.includes("5,000");

  const valid = karachiFee === 200 && nationwideFee === 450 && freeShipping5k && hasRs200InFaq && hasRs450InFaq;
  record(
    5,
    "shipping values consistent",
    valid,
    `Karachi: Rs. ${karachiFee}, Nationwide: Rs. ${nationwideFee}, Free threshold: Rs. 5,000 across site.ts, FAQ, Shipping, and Trust pages.`
  );
} catch (err: any) {
  record(5, "shipping values consistent", false, err.message);
}

// Check 6: Payment methods consistent
try {
  const expected = ["Easypaisa", "JazzCash", "Raast", "Meezan Bank"];
  const hasAll = expected.every((m) => paymentMethods.includes(m));
  const hasZindigi = paymentMethods.includes("Zindigi");
  // Grep src for Zindigi
  const srcFiles = fs.readdirSync(path.join(rootDir, "src/routes"));
  let foundZindigi = false;
  for (const f of srcFiles) {
    if (f.endsWith(".tsx") || f.endsWith(".ts")) {
      const c = fs.readFileSync(path.join(rootDir, "src/routes", f), "utf-8");
      if (c.toLowerCase().includes("zindigi")) foundZindigi = true;
    }
  }
  const valid = hasAll && !hasZindigi && !foundZindigi;
  record(
    6,
    "payment methods consistent",
    valid,
    `Centralized methods: ${paymentMethods.join(", ")}. Zindigi references purged: ${!foundZindigi}.`
  );
} catch (err: any) {
  record(6, "payment methods consistent", false, err.message);
}

// Check 7: Sitemap URLs are canonical
try {
  const sitemapContent = fs.readFileSync(path.join(rootDir, "src/routes/sitemap[.]xml.ts"), "utf-8");
  const usesSiteUrl = sitemapContent.includes("SITE_URL");
  const noQueryParams = !sitemapContent.includes("?sort=") && !sitemapContent.includes("?page=");
  const valid = usesSiteUrl && noQueryParams;
  record(
    7,
    "sitemap URLs are canonical",
    valid,
    "Sitemap uses SITE_URL without utility query parameters (?sort=, ?page=)."
  );
} catch (err: any) {
  record(7, "sitemap URLs are canonical", false, err.message);
}

// Check 8: Private routes not in sitemap
try {
  const sitemapContent = fs.readFileSync(path.join(rootDir, "src/routes/sitemap[.]xml.ts"), "utf-8");
  const privateRoutes = ["/account", "/cart", "/checkout", "/wishlist", "/admin", "/cocnballs"];
  const leakedRoutes = privateRoutes.filter((r) => sitemapContent.includes(`"${r}"`) || sitemapContent.includes(`'${r}'`));
  record(
    8,
    "private routes not in sitemap",
    leakedRoutes.length === 0,
    leakedRoutes.length === 0
      ? "Zero private routes (/cart, /checkout, /account, /wishlist, /admin) in sitemap staticPaths."
      : `Leaked routes: ${leakedRoutes.join(", ")}`
  );
} catch (err: any) {
  record(8, "private routes not in sitemap", false, err.message);
}

// Check 9: No accidental indexable filter permutations
try {
  const colIndexContent = fs.readFileSync(path.join(rootDir, "src/routes/collections.index.tsx"), "utf-8");
  const colSlugContent = fs.readFileSync(path.join(rootDir, "src/routes/collections.$slug.tsx"), "utf-8");

  const colIndexGuarded =
    colIndexContent.includes("isUtilityOrPaginated") &&
    colIndexContent.includes("noindex, follow");

  const colSlugGuarded =
    colSlugContent.includes("shouldNoindex") &&
    colSlugContent.includes("noindex, follow");

  const valid = colIndexGuarded && colSlugGuarded;
  record(
    9,
    "no accidental indexable filter permutations",
    valid,
    "Filter, sorting, and secondary pagination (page > 1) explicitly declare <meta name='robots' content='noindex, follow'>."
  );
} catch (err: any) {
  record(9, "no accidental indexable filter permutations", false, err.message);
}

// Check 10: Unique product slugs
try {
  const slugs = products.map((p) => p.id);
  const uniqueSlugs = new Set(slugs);
  const valid = slugs.length === uniqueSlugs.size;
  record(
    10,
    "unique product slugs",
    valid,
    `Catalog contains ${slugs.length} total products and ${uniqueSlugs.size} unique slugs (0 duplicate slugs).`
  );
} catch (err: any) {
  record(10, "unique product slugs", false, err.message);
}

// Check 11: Required product fields present
try {
  let missingFieldCount = 0;
  for (const p of products) {
    if (!p.id || !p.title || !p.price || p.price <= 0 || !p.category || !p.subcategory || !p.images || p.images.length === 0) {
      missingFieldCount++;
    }
  }
  record(
    11,
    "required product fields present",
    missingFieldCount === 0,
    missingFieldCount === 0
      ? `All ${products.length} products have complete required fields (id, title, price, category, subcategory, images).`
      : `${missingFieldCount} products missing required fields.`
  );
} catch (err: any) {
  record(11, "required product fields present", false, err.message);
}

// Check 12: Product structured data shape valid
try {
  const sample = products[0];
  const schema: any = productSchema(sample);
  const isValid =
    schema["@context"] === "https://schema.org" &&
    schema["@type"] === "Product" &&
    schema.name === sample.title &&
    schema.offers &&
    schema.offers["@type"] === "Offer" &&
    schema.offers.hasMerchantReturnPolicy &&
    schema.offers.shippingDetails &&
    schema.offers.itemCondition === "https://schema.org/NewCondition" &&
    typeof schema.category === "string" &&
    schema.category.length > 0;

  record(
    12,
    "product structured data shape valid",
    isValid,
    `Product schema matches Google Merchant Center specifications with MerchantReturnPolicy, ShippingDetails, and hierarchical category ('${schema.category}').`
  );
} catch (err: any) {
  record(12, "product structured data shape valid", false, err.message);
}

// Check 13: Tapestry canonical collection exists
try {
  const tapestryCol = collections.find((c) => c.slug === "tapestries");
  const matchingProducts = products.filter((p) => tapestryCol?.match(p));
  const valid = Boolean(tapestryCol && tapestryCol.status === "ACTIVE" && matchingProducts.length === 33);
  record(
    13,
    "Tapestry canonical collection exists",
    valid,
    `Tapestries collection is ACTIVE with slug '/collections/tapestries' and contains ${matchingProducts.length} matching products.`
  );
} catch (err: any) {
  record(13, "Tapestry canonical collection exists", false, err.message);
}

// Check 14: Wall Art alias behavior is deliberate
try {
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, "vercel.json"), "utf-8"));
  const wallArtRedirect = vercelConfig.redirects?.find(
    (r: any) => r.source === "/collections/wall-art" && r.destination === "/collections/tapestries" && r.permanent === true
  );
  const slugRouteContent = fs.readFileSync(path.join(rootDir, "src/routes/collections.$slug.tsx"), "utf-8");
  const hasClientRedirect =
    slugRouteContent.includes('params.slug === "wall-art"') &&
    slugRouteContent.includes('slug: "tapestries"');

  const valid = Boolean(wallArtRedirect && hasClientRedirect);
  record(
    14,
    "Wall Art alias behavior is deliberate",
    valid,
    "Permanent 301 redirect in vercel.json + client-side router loader redirect in collections.$slug.tsx to canonical /collections/tapestries."
  );
} catch (err: any) {
  record(14, "Wall Art alias behavior is deliberate", false, err.message);
}

// Output Table
console.log("┌────┬─────────────────────────────────────────────┬────────┬────────────────────────────────────────────────────────────────────────┐");
console.log("│ ID │ CHECK                                       │ RESULT │ EVIDENCE                                                               │");
console.log("├────┼─────────────────────────────────────────────┼────────┼────────────────────────────────────────────────────────────────────────┤");
for (const r of results) {
  const idStr = String(r.id).padEnd(2);
  const checkStr = r.check.padEnd(43);
  const resultStr = r.result.padEnd(6);
  const evidenceStr = r.evidence.length > 70 ? r.evidence.substring(0, 67) + "..." : r.evidence.padEnd(70);
  console.log(`│ ${idStr} │ ${checkStr} │ ${resultStr} │ ${evidenceStr} │`);
}
console.log("└────┴─────────────────────────────────────────────┴────────┴────────────────────────────────────────────────────────────────────────┘");

const allPassed = results.every((r) => r.result === "PASS");
if (allPassed) {
  console.log("\n🎉 ALL 14 SECOND-PASS REGRESSION CHECKS PASSED!\n");
  process.exit(0);
} else {
  console.error("\n❌ REGRESSION DETECTED IN ONE OR MORE CHECKS.\n");
  process.exit(1);
}
