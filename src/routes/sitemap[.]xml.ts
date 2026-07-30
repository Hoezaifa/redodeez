import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { collections } from "@/data/site";
import { products } from "@/data/products";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const host = request.headers.get("host") ?? request.headers.get("x-forwarded-host") ?? "";
        const proto = request.headers.get("x-forwarded-proto") ?? "https";
        const BASE_URL = host ? `${proto}://${host}` : "";
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/collections", changefreq: "weekly", priority: "0.9" },
          { path: "/custom-print", changefreq: "monthly", priority: "0.9" },
          { path: "/about", changefreq: "yearly", priority: "0.5" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/faq", changefreq: "yearly", priority: "0.5" },
          { path: "/shipping", changefreq: "yearly", priority: "0.4" },
          { path: "/returns", changefreq: "yearly", priority: "0.4" },
          ...collections.map((c) => ({
            path: `/collections/${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...products.map((p) => ({
            path: `/products/${p.id}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
