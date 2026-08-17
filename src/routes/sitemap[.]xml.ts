import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { collections, SITE_URL } from "@/data/site";
import { getProducts } from "@/data/products";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  images?: Array<{ url: string; title?: string }>;
}

function toAbsoluteImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allProducts = await getProducts();
        // Only index products that have images
        const activeProducts = allProducts.filter((p) => p.images && p.images.length > 0);

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/collections", changefreq: "daily", priority: "0.9" },
          { path: "/custom-print", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/reviews", changefreq: "weekly", priority: "0.7" },
          { path: "/trust", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/shipping", changefreq: "monthly", priority: "0.5" },
          { path: "/returns", changefreq: "monthly", priority: "0.5" },
          { path: "/support", changefreq: "monthly", priority: "0.5" },
          { path: "/payments", changefreq: "monthly", priority: "0.4" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...collections.map((c) => ({
            path: `/collections/${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...activeProducts.map((p) => {
            const seen = new Set<string>();
            const images: Array<{ url: string; title: string }> = [];

            for (const rawUrl of p.images) {
              const absUrl = toAbsoluteImageUrl(rawUrl);
              if (absUrl && !seen.has(absUrl)) {
                seen.add(absUrl);
                images.push({
                  url: absUrl,
                  title: `${p.title} — Deez Prints`,
                });
              }
            }

            return {
              path: `/products/${p.id}`,
              changefreq: "weekly" as const,
              priority: "0.8",
              images,
            };
          }),
        ];

        const urls = entries.map((e) => {
          const loc = `${SITE_URL}${e.path}`;
          const imageXml = e.images
            ? e.images
                .map(
                  (img) =>
                    `    <image:image>\n      <image:loc>${escapeXml(img.url)}</image:loc>\n      <image:title>${escapeXml(img.title ?? "")}</image:title>\n    </image:image>`,
                )
                .join("\n")
            : null;

          return [
            `  <url>`,
            `    <loc>${escapeXml(loc)}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            imageXml,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n");
        });

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
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
