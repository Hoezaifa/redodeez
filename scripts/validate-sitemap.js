import fs from 'node:fs';
import path from 'node:path';

// Load site.ts directly via regex or standard imports to verify values
const siteTsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/site.ts'), 'utf-8');
const robotsContent = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf-8');
const sitemapContent = fs.readFileSync(path.join(process.cwd(), 'src/routes/sitemap[.]xml.ts'), 'utf-8');

console.log('=== 1. Checking Canonical Domain in src/data/site.ts ===');
if (siteTsContent.includes('export const SITE_URL = "https://deezprints.com";')) {
  console.log('✅ SITE_URL is correctly set to https://deezprints.com');
} else {
  console.error('❌ SITE_URL is incorrect!');
  process.exit(1);
}

console.log('\n=== 2. Checking public/robots.txt ===');
if (robotsContent.includes('Sitemap: https://deezprints.com/sitemap.xml')) {
  console.log('✅ robots.txt correctly references https://deezprints.com/sitemap.xml');
} else {
  console.error('❌ robots.txt missing correct sitemap directive!');
  process.exit(1);
}

if (robotsContent.includes('Disallow: /api/') && !robotsContent.includes('Disallow: /cart') && !robotsContent.includes('Disallow: /admin')) {
  console.log('✅ robots.txt correctly excludes only /api/ (private routes use X-Robots-Tag instead)');
} else {
  console.error('❌ robots.txt has incorrect disallow rules! Should only disallow /api/');
  process.exit(1);
}

console.log('\n=== 3. Checking sitemap[.]xml.ts logic ===');
if (!sitemapContent.includes('<priority>') && !sitemapContent.includes('<changefreq>')) {
  console.log('✅ <priority> and <changefreq> tags are completely removed!');
} else {
  console.error('❌ Sitemap still contains priority or changefreq tags!');
  process.exit(1);
}

const productsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/products.ts'), 'utf-8');

if (sitemapContent.includes('lastmodXml') && !sitemapContent.includes('new Date()') && !productsContent.includes('new Date().toISOString()')) {
  console.log('✅ Conditional <lastmod> output supported without forced current-time fallback!');
} else {
  console.error('❌ Sitemap or products logic contains forced new Date() fallback or lacks conditional lastmod output!');
  process.exit(1);
}

console.log('\n=== 4. Checking Sitemap Cache Policy ===');
if (!sitemapContent.includes('s-maxage=86400')) {
  console.log('✅ Stale 24-hour edge cache (s-maxage=86400) is removed!');
} else {
  console.error('❌ Sitemap still contains 24-hour edge cache (s-maxage=86400)!');
  process.exit(1);
}

console.log('\n=== 5. Checking Catalogue Synchronization (Point 5 / B1) ===');
// Extract all product IDs defined in the products array (matches both "id": "..." and id: "...")
const idMatches = [...productsContent.matchAll(/"?id"?:\s*"([^"]+)"/g)].map((m) => m[1]);
const uniqueIds = [...new Set(idMatches)];

console.log(`Found ${uniqueIds.length} unique product IDs in src/data/products.ts`);

if (uniqueIds.length === 224) {
  console.log('✅ Exactly 224 products present in active catalogue!');
} else {
  console.error(`❌ Expected 224 products, but found ${uniqueIds.length}!`);
  process.exit(1);
}

if (uniqueIds.includes('breakout-tee')) {
  console.log('✅ breakout-tee present in catalogue!');
} else {
  console.error('❌ breakout-tee missing from catalogue!');
  process.exit(1);
}

if (uniqueIds.includes('scarlet-bloom-tee')) {
  console.log('✅ scarlet-bloom-tee present in catalogue!');
} else {
  console.error('❌ scarlet-bloom-tee missing from catalogue!');
  process.exit(1);
}

if (!uniqueIds.includes('kanye-yeezus-shirt')) {
  console.log('✅ Legacy kanye-yeezus-shirt successfully removed from catalogue!');
} else {
  console.error('❌ Legacy kanye-yeezus-shirt still present in catalogue!');
  process.exit(1);
}

if (sitemapContent.includes('/products/${p.id}')) {
  console.log('✅ Sitemap dynamically generates URLs from all active products!');
} else {
  console.error('❌ Sitemap does not dynamically generate URLs from product IDs!');
  process.exit(1);
}

console.log('\n=== Sitemap Validation Passed Successfully! ===');

