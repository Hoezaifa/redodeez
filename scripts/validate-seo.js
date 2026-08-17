import fs from "fs";
import path from "path";

const rootDir = process.cwd();
let passed = 0;
let failed = 0;

function check(description, fn) {
  try {
    const res = fn();
    if (res !== false) {
      console.log(`✅ [PASS] ${description}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${description}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [FAIL] ${description}: ${err.message}`);
    failed++;
  }
}

console.log("\n=== DEEZ PRINTS SEO VALIDATION SUITE ===\n");

// 1. SITE_URL constant defined in site.ts
check("SITE_URL constant is set to https://www.deezprints.store in site.ts", () => {
  const content = fs.readFileSync(path.join(rootDir, "src/data/site.ts"), "utf8");
  return content.includes('export const SITE_URL = "https://www.deezprints.store"');
});

// 2. Zero instances of deezus.vercel.app across src/ and api/
check("Zero references to deezus.vercel.app in src/ and api/", () => {
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx?|js|html|txt|json|xml)$/.test(entry.name)) {
        const text = fs.readFileSync(fullPath, "utf8");
        if (text.includes("deezus.vercel.app")) {
          throw new Error(`Found deezus.vercel.app in ${fullPath}`);
        }
      }
    }
  }
  scanDir(path.join(rootDir, "src"));
  scanDir(path.join(rootDir, "api"));
  return true;
});

// 3. robots.txt has absolute sitemap and /admin block
check("robots.txt blocks /admin and references absolute sitemap URL", () => {
  const content = fs.readFileSync(path.join(rootDir, "public/robots.txt"), "utf8");
  return (
    content.includes("Disallow: /admin") &&
    content.includes("Sitemap: https://www.deezprints.store/sitemap.xml")
  );
});

// 4. structuredData.ts uses SITE_URL and has no fake aggregateRating property
check("structuredData.ts uses SITE_URL and has NO fabricated aggregateRating property", () => {
  const content = fs.readFileSync(path.join(rootDir, "src/lib/structuredData.ts"), "utf8");
  const usesSiteUrl = content.includes("SITE_URL");
  const noFakeRating = !content.includes('"aggregateRating"');
  return usesSiteUrl && noFakeRating;
});

// 5. sitemap[.]xml.ts uses SITE_URL, converts images to absolute URLs, and includes image schema
check("sitemap route uses SITE_URL, converts images to absolute URLs, and includes Google image sitemap schema", () => {
  const content = fs.readFileSync(path.join(rootDir, "src/routes/sitemap[.]xml.ts"), "utf8");
  return (
    content.includes("SITE_URL") &&
    content.includes("toAbsoluteImageUrl") &&
    !content.includes("request.headers.get") &&
    content.includes("http://www.google.com/schemas/sitemap-image/1.1")
  );
});

// 6. products-feed[.]xml.ts exists and formats Google Merchant feed
check("Merchant Center products-feed.xml route exists", () => {
  const content = fs.readFileSync(path.join(rootDir, "src/routes/products-feed[.]xml.ts"), "utf8");
  return (
    content.includes("xmlns:g=\"http://base.google.com/ns/1.0\"") &&
    content.includes("SITE_URL")
  );
});

// 7. vercel.json CSP includes analytics domains
check("vercel.json CSP includes Google Analytics & Clarity script domains", () => {
  const content = fs.readFileSync(path.join(rootDir, "vercel.json"), "utf8");
  return (
    content.includes("https://www.google-analytics.com") &&
    content.includes("https://www.googletagmanager.com") &&
    content.includes("https://www.clarity.ms")
  );
});

// 8. Public routes have absolute canonical URLs
check("All main route files reference SITE_URL for canonical links", () => {
  const routeFiles = [
    "src/routes/index.tsx",
    "src/routes/products.$productId.tsx",
    "src/routes/collections.$slug.tsx",
    "src/routes/collections.index.tsx",
    "src/routes/about.tsx",
    "src/routes/faq.tsx",
    "src/routes/contact.tsx",
    "src/routes/custom-print.tsx",
    "src/routes/shipping.tsx",
    "src/routes/returns.tsx",
    "src/routes/reviews.tsx",
    "src/routes/trust.tsx",
    "src/routes/support.tsx",
    "src/routes/payments.tsx",
    "src/routes/privacy.tsx",
    "src/routes/terms.tsx",
  ];
  for (const f of routeFiles) {
    const content = fs.readFileSync(path.join(rootDir, f), "utf8");
    if (!content.includes("SITE_URL")) {
      throw new Error(`Missing SITE_URL import or usage in ${f}`);
    }
  }
  return true;
});

console.log(`\nResults: ${passed} Passed, ${failed} Failed\n`);
if (failed > 0) process.exit(1);
