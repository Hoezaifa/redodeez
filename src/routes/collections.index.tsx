import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
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

/* How many collection chips to show before the "+More" button (mobile only) */
const VISIBLE_COUNT = 3;

function ShopAll() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [priceDir, setPriceDir] = useState<"asc" | "desc">("asc");
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!moreOpen) return;
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreOpen]);

  const visibleCollections = collections.slice(0, VISIBLE_COUNT);
  const overflowCollections = collections.slice(VISIBLE_COUNT);
  // Check if the currently active category is hidden inside "+More"
  const activeInOverflow = overflowCollections.some((c) => c.slug === cat);

  const list = useMemo(() => {
    const c = collections.find((x) => x.slug === cat);
    const filtered = c ? products.filter((p) => c.match(p)) : products;
    const sorted = [...filtered];
    if (sort === "price") {
      sorted.sort((a, b) => (priceDir === "asc" ? a.price - b.price : b.price - a.price));
    }
    if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "featured") sorted.sort((a, b) => b.images.length - a.images.length);
    if (sort === "newest") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [cat, sort, priceDir]);

  const stats = [
    { label: `${products.length} Products` },
    { label: `${collections.length} Collections` },
    { label: `Ships in ${site.deliveryTime}` },
    { label: "Secure Payments" },
  ];

  const chipBase = "chip-glow shrink-0 px-4 py-2 label-mono whitespace-nowrap";
  const chipActive = "bg-primary text-primary-foreground chip-glow-active";
  const chipInactive = "border border-border hover:border-primary hover:text-primary";

  return (
    <div className="edge pt-4 pb-6 md:py-20">
      <SectionHeading
        eyebrow={`${products.length} pieces`}
        title={"Shop\neverything"}
        sub="Curated collections inspired by anime, street culture and oversized silhouettes. Premium cotton. Printed in Karachi."
      />

      {/* Stats strip — single line horizontal scroll on mobile, flex row on desktop */}
      <div className="mt-3 md:mt-8 flex items-center gap-2.5 md:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap -mx-5 px-5 md:mx-0 md:px-0 py-0.5">
        {stats.map((s, i) => (
          <span key={s.label} className="flex items-center gap-2 md:gap-3 label-mono text-[10px] md:text-xs text-muted-foreground shrink-0 uppercase tracking-wider">
            {s.label}
            {i < stats.length - 1 && (
              <span className="h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden />
            )}
          </span>
        ))}
      </div>

      {/* Filters + Sort — sticky */}
      <div className="sticky top-0 z-30 -mx-5 mt-3 md:mt-10 bg-background/95 px-5 backdrop-blur-md md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="border-y border-border py-3 md:py-4 space-y-2 md:space-y-0">

          {/* ---- MOBILE layout: chips row + sort row ---- */}
          <div className="md:hidden">
            {/* Chips row: scrollable area + fixed +More button */}
            <div className="flex items-center gap-1.5">
              {/* Scrollable chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => { setCat("all"); setMoreOpen(false); }}
                  className={cn(chipBase, "text-[10px] px-3 py-1.5", cat === "all" ? chipActive : chipInactive)}
                >
                  All
                </button>
                {visibleCollections.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => { setCat(c.slug); setMoreOpen(false); }}
                    className={cn(chipBase, "text-[10px] px-3 py-1.5", cat === c.slug ? chipActive : chipInactive)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* +More button — outside the scroll container so dropdown isn't clipped */}
              {overflowCollections.length > 0 && (
                <div ref={moreRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setMoreOpen((v) => !v)}
                    className={cn(
                      chipBase,
                      "text-[10px] px-3 py-1.5 flex items-center gap-1",
                      activeInOverflow ? chipActive : chipInactive,
                    )}
                  >
                    {activeInOverflow
                      ? collections.find((c) => c.slug === cat)?.name
                      : `+${overflowCollections.length}`}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-300",
                        moreOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {moreOpen && (
                    <div className="absolute right-0 top-full mt-2 min-w-[200px] border border-border bg-surface/95 backdrop-blur-md shadow-xl z-50 rounded-sm">
                      {overflowCollections.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => { setCat(c.slug); setMoreOpen(false); }}
                          className={cn(
                            "block w-full text-left px-4 py-3 label-mono transition-colors",
                            cat === c.slug
                              ? "bg-primary/15 text-primary"
                              : "text-foreground hover:bg-elevated hover:text-primary",
                          )}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sort row */}
            <div className="flex items-center gap-1 mt-2 border-t border-border/50 pt-2">
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
                    "flex items-center gap-1 px-3 py-1.5 label-mono text-[10px] transition-all duration-300",
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

          {/* ---- DESKTOP: single row with all chips + sort ---- */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                type="button"
                onClick={() => setCat("all")}
                className={cn(chipBase, cat === "all" ? chipActive : chipInactive)}
              >
                All
              </button>
              {collections.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCat(c.slug)}
                  className={cn(chipBase, cat === c.slug ? chipActive : chipInactive)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto flex items-center gap-1 shrink-0">
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
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-10">
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
