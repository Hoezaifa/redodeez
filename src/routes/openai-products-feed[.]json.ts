import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL, toAbsoluteImageUrl } from "@/data/site";
import { getProducts } from "@/data/products";

export interface OpenAiFeedProduct {
  item_id: string;
  title: string;
  description: string;
  url: string;
  brand: string;
  seller_name: string;
  image_url: string;
  additional_image_urls?: string[];
  availability: "in_stock" | "out_of_stock";
  price: string;
  currency: "PKR";
  category?: string;
  item_group_id?: string;
}

export const Route = createFileRoute("/openai-products-feed.json")({
  server: {
    handlers: {
      GET: async () => {
        const allProducts = await getProducts();
        const activeProducts = allProducts.filter((p) => p.images && p.images.length > 0);

        const seen = new Set<string>();
        const uniqueProducts = activeProducts.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });

        const items: OpenAiFeedProduct[] = uniqueProducts.map((p) => {
          const productUrl = `${SITE_URL}/products/${p.id}`;
          const uniqueImages = Array.from(
            new Set((p.images || []).map(toAbsoluteImageUrl).filter(Boolean))
          );
          const primaryImage = uniqueImages[0] ?? "";
          const subcatLabel = p.subcategory.replace(/-/g, " ");
          const desc =
            p.description ||
            `${p.title} — ${subcatLabel} streetwear by Deez Prints. Made to order in Karachi, delivered nationwide across Pakistan.`;

          const designKey = p.id
            .replace(/^dp-(acid-wash|drop-shoulder|regular)-/, "")
            .replace(/^dp-(mug|tapestry|hoodie)-/, "")
            .replace(/^tshirt-(acid|drop)-/, "");

          return {
            item_id: p.id,
            title: p.title.length > 150 ? `${p.title.slice(0, 147)}...` : p.title,
            description: desc.slice(0, 5000),
            url: productUrl,
            brand: "Deez Prints",
            seller_name: "Deez Prints",
            image_url: primaryImage,
            additional_image_urls: uniqueImages.slice(1, 10),
            availability: "in_stock",
            price: `${p.price}.00`,
            currency: "PKR",
            category: `${p.category} > ${subcatLabel}`,
            item_group_id: designKey,
          };
        });

        const payload = {
          version: "1.0",
          feed_type: "products",
          updated_at: new Date().toISOString(),
          merchant: {
            name: "Deez Prints",
            url: SITE_URL,
            country: "PK",
          },
          products_count: items.length,
          products: items,
        };

        return new Response(JSON.stringify(payload, null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
