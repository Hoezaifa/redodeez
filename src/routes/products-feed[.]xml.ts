import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/data/site";
import { getProducts } from "@/data/products";

function toAbsoluteImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const Route = createFileRoute("/products-feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allProducts = await getProducts();
        const activeProducts = allProducts.filter((p) => p.images && p.images.length > 0);

        // Deduplicate by product ID
        const seen = new Set<string>();
        const uniqueProducts = activeProducts.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });

        const buildDate = new Date().toUTCString();

        const items = uniqueProducts.map((p) => {
          const productUrl = `${SITE_URL}/products/${p.id}`;
          const uniqueImages = Array.from(new Set((p.images || []).map(toAbsoluteImageUrl).filter(Boolean)));
          const primaryImage = uniqueImages[0] ?? "";
          const subcatLabel = p.subcategory.replace(/-/g, " ");
          const description = p.description || `${p.title} — ${subcatLabel} streetwear by Deez Prints. Made to order in Karachi, delivered nationwide across Pakistan.`;
          const primaryColor = p.colors && p.colors.length > 0 ? p.colors[0] : "Black";
          const designKey = p.id
            .replace(/^dp-(acid-wash|drop-shoulder|regular)-/, "")
            .replace(/^dp-(mug|tapestry|hoodie)-/, "")
            .replace(/^tshirt-(acid|drop)-/, "");

          // Guess image MIME type from URL
          const imgLower = primaryImage.toLowerCase();
          let imgMime = "image/jpeg";
          if (imgLower.includes(".png")) imgMime = "image/png";
          else if (imgLower.includes(".webp")) imgMime = "image/webp";

          const isApparel = p.category === "t-shirts" || p.category === "hoodies" || p.category === "jerseys";

          return [
            `    <item>`,
            // ── Standard RSS 2.0 fields ──
            `      <title>${escapeXml(p.title)} — Deez Prints</title>`,
            `      <link>${escapeXml(productUrl)}</link>`,
            `      <guid isPermaLink="true">${escapeXml(productUrl)}</guid>`,
            `      <description>${escapeXml(description)}</description>`,
            `      <enclosure url="${escapeXml(primaryImage)}" type="${imgMime}" length="0" />`,
            // ── Google Merchant Center fields ──
            `      <g:id>${escapeXml(p.id)}</g:id>`,
            `      <g:canonical_link>${escapeXml(productUrl)}</g:canonical_link>`,
            `      <g:image_link>${escapeXml(primaryImage)}</g:image_link>`,
            ...uniqueImages.slice(1, 10).map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`),
            `      <g:price>${p.price} PKR</g:price>`,
            `      <g:condition>new</g:condition>`,
            `      <g:availability>in_stock</g:availability>`,
            `      <g:brand>Deez Prints</g:brand>`,
            `      <g:product_type>${escapeXml(p.category)} &gt; ${escapeXml(subcatLabel)}</g:product_type>`,
            `      <g:color>${escapeXml(primaryColor)}</g:color>`,
            ...(isApparel
              ? [
                  `      <g:age_group>adult</g:age_group>`,
                  `      <g:gender>unisex</g:gender>`,
                  `      <g:size>S, M, L, XL</g:size>`,
                  `      <g:item_group_id>${escapeXml(designKey)}</g:item_group_id>`,
                ]
              : []),
            `      <g:shipping>`,
            `        <g:country>PK</g:country>`,
            `        <g:service>Standard Courier</g:service>`,
            `        <g:price>450 PKR</g:price>`,
            `      </g:shipping>`,
            `    </item>`,
          ]
            .filter(Boolean)
            .join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">`,
          `  <channel>`,
          `    <title>Deez Prints Product Feed</title>`,
          `    <link>${SITE_URL}</link>`,
          `    <description>Official product catalog feed for Deez Prints — premium streetwear and custom printing in Pakistan.</description>`,
          `    <language>en</language>`,
          `    <lastBuildDate>${buildDate}</lastBuildDate>`,
          ...items,
          `  </channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
