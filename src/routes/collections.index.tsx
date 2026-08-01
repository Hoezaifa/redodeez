import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { collections, site } from "@/data/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shop/ProductRow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Shop All — Deez Prints Streetwear Catalogue" },
      {
        name: "description",
        content:
          "Browse every Deez Prints piece: drop shoulder tees, acid wash, hoodies, jerseys, wall art and accessories. Filter by category and price.",
      },
      { property: "og:title", content: "Shop All — Deez Prints" },
      { property: "og:description", content: "Every tee, hoodie, jersey and print in one place." },
    ],
  }),
  component: ShopAll,
});

const sortOptions = [
  { id: "featured", label: "Featured", icon: "▼" },
  { id: "newest", label: "Newest", icon: null },
  { id: "price", label: "Price", icon: "↑↓" },
  { id: "name", label: "A–Z", icon: null },
] as const;

function ShopAll() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [priceDir, setPriceDir] = useState<"asc" | "desc">("asc");

  const list = useMemo(() => {
    const c = collections.find((x) => x.slug === cat);
    const filtered = c ? products.filter((p) => c.match(p)) : products;
    const sorted = [...filtered];
    if (sort === "price") {
      sorted.sort((a, b) => (priceDir === "asc" ? a.price - b.price : b.price - a.price));
    }
    if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "featured") sorted.sort((a, b) => b.images.length - a.images.length);
    if (sort === "newest") sorted.sort((a, b) => b.rating - a.rating); // proxy for newest
    return sorted;
  }, [cat, sort, priceDir]);

  const stats = [
    { label: `${products.length} Products` },
    { label: `${collections.length} Collections` },
    { label: `Ships in ${site.deliveryTime}` },
    { label: "Secure Payments" },
  ];

  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading
        eyebrow={`${products.length} pieces`}
        title={"Shop\neverything"}
        sub="Curated collections inspired by anime, street culture and oversized silhouettes. Premium cotton. Printed in Karachi."
      />

      {/* Stats strip */}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        {stats.map((s, i) => (
          <span key={s.label} className="flex items-center gap-3 label-mono text-muted-foreground">
            {s.label}
            {i < stats.length - 1 && (
              <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
            )}
          </span>
        ))}
      </div>

      {/* Filters + Sort — sticky */}
      <div className="sticky top-0 z-30 -mx-5 mt-10 bg-background/95 px-5 backdrop-blur-md md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="flex flex-wrap items-center gap-2 border-y border-border py-4">
          {/* Category chips */}
          <button
            type="button"
            onClick={() => setCat("all")}
            className={cn(
              "chip-glow px-4 py-2 label-mono",
              cat === "all"
                ? "bg-primary text-primary-foreground chip-glow-active"
                : "border border-border hover:border-primary hover:text-primary",
            )}
          >
            All
          </button>
          {collections.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCat(c.slug)}
              className={cn(
                "chip-glow px-4 py-2 label-mono",
                cat === c.slug
                  ? "bg-primary text-primary-foreground chip-glow-active"
                  : "border border-border hover:border-primary hover:text-primary",
              )}
            >
              {c.name}
            </button>
          ))}

          {/* Sort */}
          <div className="ml-auto flex items-center gap-1">
            {sortOptions.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id === "price" && sort === "price") {
                    setPriceDir((d) => (d === "asc" ? "desc" : "asc"));
                  } else {
                    setSort(s.id);
                  }
                }}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 label-mono transition-all duration-300",
                  sort === s.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label}
                {s.id === "price" && sort === "price" && (
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      priceDir === "desc" && "rotate-180",
                    )}
                  />
                )}
                {s.id === "featured" && sort === "featured" && <ChevronDown className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="py-24 text-center label-mono text-muted-foreground">
          Nothing here yet.{" "}
          <Link to="/collections" className="text-primary">
            Reset
          </Link>
        </p>
      )}
    </div>
  );
}
