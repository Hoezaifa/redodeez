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

console.log('\n=== Sitemap Validation Passed Successfully! ===');
