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

if (robotsContent.includes('Disallow: /admin') && robotsContent.includes('Disallow: /cart') && robotsContent.includes('Disallow: /api/')) {
  console.log('✅ robots.txt correctly excludes private/internal routes');
} else {
  console.error('❌ robots.txt missing disallow rules!');
  process.exit(1);
}

console.log('\n=== 3. Checking sitemap[.]xml.ts logic ===');
if (!sitemapContent.includes('<priority>') && !sitemapContent.includes('<changefreq>')) {
  console.log('✅ <priority> and <changefreq> tags are completely removed!');
} else {
  console.error('❌ Sitemap still contains priority or changefreq tags!');
  process.exit(1);
}

if (sitemapContent.includes('<lastmod>')) {
  console.log('✅ <lastmod> tag is included for URLs!');
} else {
  console.error('❌ Sitemap missing <lastmod> tags!');
  process.exit(1);
}

console.log('\n=== Sitemap Validation Passed Successfully! ===');
