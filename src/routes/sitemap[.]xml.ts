import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { collections, SITE_URL } from "@/data/site";
import { getProductsWithTimestamps } from "@/data/products";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  images?: Array<{ url: string; title?: string }>;
}

function toAbsoluteImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${cleanPath}`;
}

function getSiteMtime(): string | undefined {
  if (typeof window === "undefined") {
    try {
      const fs = require("node:fs");
      const path = require("node:path");
      const siteFilePath = path.resolve(process.cwd(), "src/data/site.ts");
      if (fs.existsSync(siteFilePath)) {
        return fs.statSync(siteFilePath).mtime.toISOString();
      }
    } catch {
      /* fallback */
    }
  }
  return undefined;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const allProducts = await getProductsWithTimestamps();
        const siteLastMod = getSiteMtime();

        // Only index products that are published and have at least one image
        const activeProducts = allProducts.filter(
          (p) => p.images && p.images.length > 0 && (p as any).published !== false
        );

        // Only emit collections that are ACTIVE and have at least one matching active product
        const activeCollections = collections.filter((c) =>
          c.status === "ACTIVE" && activeProducts.some((p) => c.match(p))
        );

        const staticPaths = [
          "/",
          "/collections",
          "/custom-print",
          "/about",
          "/trust",
          "/contact",
          "/faq",
          "/shipping",
          "/returns",
          "/support",
          "/payments",
          "/privacy",
          "/terms",
          "/guides",
          "/guides/tapestry-decor-guide",
          "/guides/streetwear-printing-and-care",
        ];

        const entries: SitemapEntry[] = [
          ...staticPaths.map((path) => ({
            path,
            ...(siteLastMod ? { lastmod: siteLastMod } : {}),
          })),
          ...activeCollections.map((c) => {
            const absUrl = toAbsoluteImageUrl(c.image);
            return {
              path: `/collections/${c.slug}`,
              ...(siteLastMod ? { lastmod: siteLastMod } : {}),
              images: absUrl
                ? [
                    {
                      url: absUrl,
                      title: c.name,
                    },
                  ]
                : undefined,
            };
          }),
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
              ...(p.lastmod ? { lastmod: p.lastmod } : {}),
              images,
            };
          }),
        ];

        const urls = entries.map((e) => {
          const loc = `${SITE_URL}${e.path}`;
          const lastmodXml = e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null;
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
            lastmodXml,
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
            "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
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
