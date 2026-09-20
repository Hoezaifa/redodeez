import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getProducts, type Product } from "@/data/products";
import { collections, site, SITE_URL } from "@/data/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shop/ProductRow";
import { cn } from "@/lib/utils";

interface CollectionsSearchParams {
  page?: number;
  sort?: "featured" | "newest" | "price" | "name";
  dir?: "asc" | "desc";
  cat?: string;
}

const PAGE_SIZE = 24;

export const Route = createFileRoute("/collections/")({
  validateSearch: (search: Record<string, unknown>): CollectionsSearchParams => {
    return {
      page: search.page ? Math.max(1, Number(search.page)) : undefined,
      sort: ["featured", "newest", "price", "name"].includes(search.sort as string)
        ? (search.sort as any)
        : undefined,
      dir: search.dir === "desc" || search.dir === "asc" ? search.dir : undefined,
      cat: typeof search.cat === "string" && search.cat.trim().length > 0 ? search.cat.trim() : undefined,
    };
  },
  loaderDeps: ({ search: { page, sort, dir, cat } }) => ({ page, sort, dir, cat }),
  loader: async ({ deps }) => {
    const allProducts = await getProducts();
    return { allProducts, search: deps };
  },
  head: ({ loaderData }) => {
    const search = loaderData?.search;
    const isUtilityOrPaginated = Boolean(
      search?.sort || search?.dir || (search?.cat && search.cat !== "all") || (search?.page && search.page > 1)
    );
    const pageTitle =
      search?.page && search.page > 1
        ? `Shop All (Page ${search.page}) — Deez Prints Streetwear Catalogue`
        : "Shop All — Deez Prints Streetwear Catalogue";

    return {
      meta: [
        { title: pageTitle },
        {
          name: "description",
          content:
            "Browse every Deez Prints piece: drop shoulder tees, acid wash, hoodies, jerseys, tapestries and accessories. Filter by category and price.",
        },
        ...(isUtilityOrPaginated ? [{ name: "robots", content: "noindex, follow" }] : []),
        { property: "og:title", content: pageTitle },
        { property: "og:description", content: "Every tee, hoodie, jersey and print in one place." },
        { property: "og:url", content: `${SITE_URL}/collections` },
        { property: "og:site_name", content: "Deez Prints" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/collections` }],
    };
  },
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
  const { allProducts } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const cat = search.cat || "all";
  const sort = search.sort || "featured";
  const priceDir = search.dir || "asc";
  const currentPageParam = search.page || 1;

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

  const nonEmptyCollections = useMemo(() => {
    return collections.filter((c) => allProducts.some((p) => c.match(p)));
  }, [allProducts]);

  const visibleCollections = nonEmptyCollections.slice(0, VISIBLE_COUNT);
  const overflowCollections = nonEmptyCollections.slice(VISIBLE_COUNT);
  // Check if the currently active category is hidden inside "+More"
  const activeInOverflow = overflowCollections.some((c) => c.slug === cat);

  const list = useMemo(() => {
    const c = nonEmptyCollections.find((x) => x.slug === cat);
    const filtered = c ? allProducts.filter((p) => c.match(p)) : allProducts;
    const sorted = [...filtered];
    if (sort === "price") {
      sorted.sort((a, b) => (priceDir === "asc" ? a.price - b.price : b.price - a.price));
    }
    if (sort === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "newest") sorted.sort((a, b) => (b.rating ?? 5) - (a.rating ?? 5));
    return sorted;
  }, [cat, sort, priceDir, allProducts, nonEmptyCollections]);

  // Deterministic pagination calculations
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, currentPageParam), totalPages);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }, [list, currentPage]);

  const handleCategoryChange = (newCat: string) => {
    setMoreOpen(false);
    navigate({
      search: (prev) => ({
        ...prev,
        cat: newCat === "all" ? undefined : newCat,
        page: undefined, // Reset to page 1 on category switch
      }),
    });
  };

  const handleSortChange = (newSort: "featured" | "newest" | "price" | "name") => {
    if (newSort === "price" && sort === "price") {
      const nextDir = priceDir === "asc" ? "desc" : "asc";
      navigate({
        search: (prev) => ({
          ...prev,
          sort: "price",
          dir: nextDir,
          page: undefined,
        }),
      });
    } else {
      navigate({
        search: (prev) => ({
          ...prev,
          sort: newSort === "featured" ? undefined : newSort,
          dir: undefined,
          page: undefined,
        }),
      });
    }
  };

  const stats = [
    { label: `${allProducts.length} Products` },
    { label: `${collections.length} Collections` },
    { label: `Ships in ${site.deliveryTime}` },
    { label: "Secure Payments" },
  ];

  const chipBase = "chip-glow shrink-0 px-4 py-2 label-mono whitespace-nowrap";
  const chipActive = "bg-primary text-primary-foreground chip-glow-active";
  const chipInactive = "border border-border hover:border-primary hover:text-primary";

  return (
    <div className="edge pt-14 pb-6 md:pt-16 md:pb-10">
      <SectionHeading
        eyebrow={`${allProducts.length} pieces`}
        title={"Shop\neverything"}
        sub="Curated collections inspired by anime, street culture and oversized silhouettes. Premium cotton. Printed in Karachi."
      />

      {/* Stats strip — single line horizontal scroll on mobile, flex row on desktop */}
      <div className="mt-2 md:mt-4 flex items-center gap-2.5 md:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap -mx-5 px-5 md:mx-0 md:px-0 py-0.5">
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
      <div className="sticky top-0 z-30 -mx-5 mt-2 md:mt-5 bg-background/95 px-5 backdrop-blur-md md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="border-y border-border py-3 md:py-4 space-y-2 md:space-y-0">

          {/* ---- MOBILE layout: chips row + sort row ---- */}
          <div className="md:hidden">
            {/* Chips row: scrollable area + fixed +More button */}
            <div className="flex items-center gap-1.5">
              {/* Scrollable chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className={cn(chipBase, "text-[10px] px-3 py-1.5", cat === "all" ? chipActive : chipInactive)}
                >
                  All
                </button>
                {visibleCollections.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => handleCategoryChange(c.slug)}
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
                          onClick={() => handleCategoryChange(c.slug)}
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
                  onClick={() => handleSortChange(s.id as any)}
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
                onClick={() => handleCategoryChange("all")}
                className={cn(chipBase, cat === "all" ? chipActive : chipInactive)}
              >
                All
              </button>
              {nonEmptyCollections.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => handleCategoryChange(c.slug)}
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
                  onClick={() => handleSortChange(s.id as any)}
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

      {/* Active page item count indicator */}
      {list.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-xs label-mono text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, list.length)} of {list.length} pieces
          </span>
          {totalPages > 1 && (
            <span>
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>
      )}

      {/* Paginated Product Grid */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-8">
        {paginatedList.map((p, i) => (
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

      {/* Crawlable Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Catalogue pagination"
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6"
        >
          <p className="label-mono text-xs text-muted-foreground order-2 sm:order-1">
            Page <span className="text-foreground font-semibold">{currentPage}</span> of{" "}
            <span className="text-foreground font-semibold">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
            {currentPage > 1 && (
              <Link
                to="/collections"
                search={{
                  ...search,
                  page: currentPage - 1 === 1 ? undefined : currentPage - 1,
                }}
                className="px-3 py-1.5 label-mono text-xs border border-border hover:border-primary hover:text-primary transition-colors rounded-sm"
              >
                ← Prev
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              if (totalPages > 7) {
                if (p !== 1 && p !== totalPages && Math.abs(p - currentPage) > 2) {
                  if (p === 2 || p === totalPages - 1) {
                    return (
                      <span key={p} className="px-1 text-muted-foreground text-xs">
                        …
                      </span>
                    );
                  }
                  return null;
                }
              }
              return (
                <Link
                  key={p}
                  to="/collections"
                  search={{
                    ...search,
                    page: p === 1 ? undefined : p,
                  }}
                  className={cn(
                    "min-w-[34px] h-[34px] flex items-center justify-center label-mono text-xs border transition-colors rounded-sm",
                    p === currentPage
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                      : "border-border hover:border-primary hover:text-primary"
                  )}
                >
                  {p}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                to="/collections"
                search={{
                  ...search,
                  page: currentPage + 1,
                }}
                className="px-3 py-1.5 label-mono text-xs border border-border hover:border-primary hover:text-primary transition-colors rounded-sm"
              >
                Next →
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
