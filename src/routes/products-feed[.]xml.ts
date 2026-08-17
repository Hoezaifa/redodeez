import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/data/site";
import { getProducts } from "@/data/products";

export const Route = createFileRoute("/products-feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allProducts = await getProducts();
        const activeProducts = allProducts.filter((p) => p.images && p.images.length > 0);

        const items = activeProducts.map((p) => {
          const productUrl = `${SITE_URL}/products/${p.id}`;
          const primaryImage = p.images[0] ?? "";
          const subcatLabel = p.subcategory.replace(/-/g, " ");
          const description =
            p.description ||
            `${p.title} — premium ${subcatLabel} streetwear by Deez Prints. Made and printed in Pakistan.`;

          return [
            `    <item>`,
            `      <g:id>${escapeXml(p.id)}</g:id>`,
            `      <title>${escapeXml(p.title)} — Deez Prints</title>`,
            `      <description>${escapeXml(description)}</description>`,
            `      <link>${escapeXml(productUrl)}</link>`,
            `      <g:image_link>${escapeXml(primaryImage)}</g:image_link>`,
            ...p.images.slice(1, 10).map((img) => `      <g:additional_image_link>${escapeXml(img)}</g:additional_image_link>`),
            `      <g:price>${p.price} PKR</g:price>`,
            `      <g:condition>new</g:condition>`,
            `      <g:availability>in_stock</g:availability>`,
            `      <g:brand>Deez Prints</g:brand>`,
            `      <g:product_type>${escapeXml(p.category)} &gt; ${escapeXml(subcatLabel)}</g:product_type>`,
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
          `    <description>Official Google Merchant Center Product Feed for Deez Prints</description>`,
          ...items,
          `  </channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
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
