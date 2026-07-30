import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shop/ProductRow";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Deez Prints" },
      {
        name: "description",
        content: "Everything you saved from the Deez Prints catalogue, kept in one place.",
      },
      { property: "og:title", content: "Wishlist — Deez Prints" },
      { property: "og:description", content: "Your saved Deez Prints pieces." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow={`${items.length} saved`} title="Wishlist" />
      {items.length === 0 ? (
        <div className="mt-14 border border-border p-16 text-center">
          <p className="display-md">Nothing saved yet</p>
          <Link
            to="/collections"
            className="mt-8 inline-block bg-primary px-7 py-4 label-mono text-primary-foreground"
          >
            Browse the catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
