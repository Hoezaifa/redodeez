import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getProducts, type Product } from "@/data/products";
import { SITE_URL } from "@/data/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { useDoomsdayCountdown } from "@/components/hero/DoomsdayCountdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/structuredData";
import { cn } from "@/lib/utils";

export function isDoomProduct(p: Product): boolean {
  return /doctor doom|dr\.?\s*doom|doomsday/i.test(`${p.title} ${p.id}`);
}

/**
 * Reliable artwork identity derived from the product's canonical ID slug
 * (e.g. `dp-drop-shoulder-doctor-doom-throne` & `dp-acid-wash-doctor-doom-throne`
 * both resolve to `doctor-doom-throne`), with a title-based fallback for any
 * future items without the standard prefix.
 */
function getArtworkKey(product: Product): string {
  const idMatch = product.id.match(
    /^dp-(?:acid-wash-hoodie|drop-shoulder|acid-wash|hoodie|regular|graphic)-(.+)$/i,
  );
  if (idMatch?.[1]) {
    return idMatch[1].toLowerCase();
  }
  return product.title
    .replace(
      /\s+(?:vintage\s+)?(?:drop\s*-?\s*shoulder|acid\s*-?\s*wash|graphic|regular)\s+(?:tee|hoodie)$/i,
      "",
    )
    .replace(/\s+hoodie$/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

const ARTWORK_LABELS: Record<string, string> = {
  "dr-doom": "Doctor Doom",
  "doctor-doom-throne": "Doom Throne",
  "doctor-doom-reigns": "Doom Reigns",
  "doctor-doom-reign-black": "Doom Reign (Black)",
  "avengers-doomsday-doctor-doom-face": "Avengers Doomsday Face",
  "doctor-doom-avengers-doomsday": "Avengers Doomsday",
  "doctor-doom-iron-mask": "Iron Mask",
  "doctor-doom-latverian-ruler": "Latverian Ruler",
  "doctor-doom-victor-von-doom": "Victor Von Doom",
  "cyclopes-x-doomsday": "Cyclops Optic Blast",
  "cyclops-doomsday": "To Me, My X-Men",
  "dooms-ascension": "Doom's Ascension",
  "dooms-visage": "Doom's Visage",
};

function getArtworkLabel(key: string, sampleProduct: Product): string {
  if (ARTWORK_LABELS[key]) {
    return ARTWORK_LABELS[key];
  }
  return sampleProduct.title
    .replace(
      /\s+(?:vintage\s+)?(?:drop\s*-?\s*shoulder|acid\s*-?\s*wash|graphic|regular)\s+(?:tee|hoodie)$/i,
      "",
    )
    .replace(/\s+hoodie$/i, "")
    .trim();
}

const ARTWORK_ORDER: string[] = [
  "dooms-visage",
  "cyclopes-x-doomsday",
  "doctor-doom-throne",
  "cyclops-doomsday",
  "dooms-ascension",
  "doctor-doom-iron-mask",
  "doctor-doom-avengers-doomsday",
  "avengers-doomsday-doctor-doom-face",
  "doctor-doom-latverian-ruler",
  "doctor-doom-reigns",
  "doctor-doom-reign-black",
  "dr-doom",
  "doctor-doom-victor-von-doom",
];

const FEATURED_FINISH_OVERRIDE: Record<string, string> = {
  "dooms-visage": "drop-shoulder",
  "cyclopes-x-doomsday": "acid-wash",
  "doctor-doom-throne": "acid-wash-hoodies",
  "cyclops-doomsday": "hoodies",
  "dooms-ascension": "drop-shoulder",
  "doctor-doom-iron-mask": "acid-wash",
  "doctor-doom-avengers-doomsday": "hoodies",
  "avengers-doomsday-doctor-doom-face": "acid-wash-hoodies",
  "doctor-doom-latverian-ruler": "drop-shoulder",
  "doctor-doom-reigns": "drop-shoulder",
  "doctor-doom-reign-black": "hoodies",
  "dr-doom": "acid-wash",
  "doctor-doom-victor-von-doom": "drop-shoulder",
};

function getArtworkRank(key: string): number {
  const idx = ARTWORK_ORDER.indexOf(key);
  return idx === -1 ? 999 : idx;
}

const FEATURED_FINISH_ROTATION = [
  "drop-shoulder",
  "acid-wash",
  "hoodies",
  "acid-wash-hoodies",
] as const;

const FINISH_PRIORITY: Record<string, number> = {
  "drop-shoulder": 0,
  "acid-wash": 1,
  hoodies: 2,
  "acid-wash-hoodies": 3,
  regular: 4,
  graphic: 5,
};

interface ArtworkGroup {
  key: string;
  label: string;
  items: Product[];
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export const Route = createFileRoute("/doomsday")({
  loader: async () => {
    const allProducts = await getProducts();
    const doomProducts = allProducts.filter(isDoomProduct);
    return { doomProducts };
  },
  head: () => {
    const title = "Avengers Doomsday T-Shirts & Hoodies in Pakistan | Deez Prints";
    const description =
      "Shop Avengers: Doomsday & Doctor Doom graphic T-shirts, vintage acid-wash tees, and fleece hoodies in Pakistan. Featuring Doctor Doom and Cyclops X-Men artwork, DTF printed in Karachi with nationwide delivery.";
    const url = `${SITE_URL}/doomsday`;
    const ogImage =
      "https://res.cloudinary.com/okcxaese/image/upload/v1795288657/doctor-doom-iron-mask-black-drop-shoulder-back.jpg";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Deez Prints" },
        { property: "og:image", content: ogImage },
        { property: "og:image:secure_url", content: ogImage },
        { property: "og:image:alt", content: "Avengers: Doomsday & Doctor Doom Streetwear Collection — Deez Prints" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@deez_prints" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: DoomsdayCollectionPage,
});

function DoomsdayCollectionPage() {
  const { doomProducts } = Route.useLoaderData();
  const timeLeft = useDoomsdayCountdown();
  const [fitFilter, setFitFilter] = useState<
    "featured" | "all" | "drop-shoulder" | "acid-wash" | "hoodies" | "acid-wash-hoodies"
  >("featured");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const uniqueDesignCount = useMemo(() => {
    const keys = new Set(doomProducts.map(getArtworkKey));
    return keys.size;
  }, [doomProducts]);
  const dropCount = useMemo(
    () => doomProducts.filter((p) => p.subcategory === "drop-shoulder").length,
    [doomProducts],
  );
  const acidCount = useMemo(
    () => doomProducts.filter((p) => p.subcategory === "acid-wash").length,
    [doomProducts],
  );
  const hoodieCount = useMemo(
    () => doomProducts.filter((p) => p.subcategory === "hoodies").length,
    [doomProducts],
  );
  const acidHoodieCount = useMemo(
    () => doomProducts.filter((p) => p.subcategory === "acid-wash-hoodies").length,
    [doomProducts],
  );

  const artworkGroups = useMemo<ArtworkGroup[]>(() => {
    const visibleProducts =
      fitFilter === "featured" || fitFilter === "all"
        ? doomProducts
        : doomProducts.filter((p) => p.subcategory === fitFilter);

    const map = new Map<string, ArtworkGroup>();
    for (const product of visibleProducts) {
      const key = getArtworkKey(product);
      const existing = map.get(key);
      if (existing) {
        existing.items.push(product);
      } else {
        map.set(key, {
          key,
          label: getArtworkLabel(key, product),
          items: [product],
        });
      }
    }

    // Order artworks by curated priority (Visage #1, Cyclops #2 & #4, etc.)
    const orderedGroups = Array.from(map.values()).sort(
      (a, b) => getArtworkRank(a.key) - getArtworkRank(b.key),
    );

    const groups = orderedGroups.map((group, groupIdx) => {
      if (fitFilter === "featured") {
        // Pick 1 finish per unique design (explicit override first, then rotation fallback)
        const preferred = FEATURED_FINISH_OVERRIDE[group.key];
        let chosen: Product | undefined = preferred
          ? group.items.find((p) => p.subcategory === preferred)
          : undefined;
        if (!chosen) {
          for (let offset = 0; offset < FEATURED_FINISH_ROTATION.length; offset++) {
            const targetSubcat =
              FEATURED_FINISH_ROTATION[(groupIdx + offset) % FEATURED_FINISH_ROTATION.length];
            chosen = group.items.find((p) => p.subcategory === targetSubcat);
            if (chosen) break;
          }
        }
        return { ...group, items: [chosen ?? group.items[0]] };
      }

      const sortedItems = [...group.items].sort((a, b) => {
        if (sortBy === "price-asc") {
          return (
            a.price - b.price ||
            (FINISH_PRIORITY[a.subcategory] ?? 9) - (FINISH_PRIORITY[b.subcategory] ?? 9)
          );
        }
        if (sortBy === "price-desc") {
          return (
            b.price - a.price ||
            (FINISH_PRIORITY[a.subcategory] ?? 9) - (FINISH_PRIORITY[b.subcategory] ?? 9)
          );
        }
        return (FINISH_PRIORITY[a.subcategory] ?? 9) - (FINISH_PRIORITY[b.subcategory] ?? 9);
      });
      return { ...group, items: sortedItems };
    });

    if (sortBy === "price-asc") {
      groups.sort((a, b) => {
        const minA = Math.min(...a.items.map((i) => i.price));
        const minB = Math.min(...b.items.map((i) => i.price));
        if (minA !== minB) return minA - minB;
        const maxA = Math.max(...a.items.map((i) => i.price));
        const maxB = Math.max(...b.items.map((i) => i.price));
        return maxA - maxB;
      });
    } else if (sortBy === "price-desc") {
      groups.sort((a, b) => {
        const maxA = Math.max(...a.items.map((i) => i.price));
        const maxB = Math.max(...b.items.map((i) => i.price));
        if (maxA !== maxB) return maxB - maxA;
        const avgA = a.items.reduce((s, i) => s + i.price, 0) / a.items.length;
        const avgB = b.items.reduce((s, i) => s + i.price, 0) / b.items.length;
        return avgB - avgA;
      });
    }

    return groups;
  }, [doomProducts, fitFilter, sortBy]);

  const totalVisibleCount = useMemo(
    () => artworkGroups.reduce((sum, g) => sum + g.items.length, 0),
    [artworkGroups],
  );

  const isSingleFinishView = useMemo(
    () => artworkGroups.every((g) => g.items.length === 1),
    [artworkGroups],
  );

  // Precompute global card indices so ProductCard badges & stagger stay consistent
  const groupStartIndices = useMemo(() => {
    const starts: number[] = [];
    let running = 0;
    for (const g of artworkGroups) {
      starts.push(running);
      running += g.items.length;
    }
    return starts;
  }, [artworkGroups]);

  const units = [
    { label: "DAYS", short: "D", value: timeLeft ? pad(timeLeft.days) : "--" },
    { label: "HRS", short: "H", value: timeLeft ? pad(timeLeft.hours) : "--" },
    { label: "MIN", short: "M", value: timeLeft ? pad(timeLeft.minutes) : "--" },
    { label: "SEC", short: "S", value: timeLeft ? pad(timeLeft.seconds) : "--" },
  ];

  const filterTabs = [
    { id: "featured", label: `Featured (${uniqueDesignCount})` },
    { id: "all", label: `All (${doomProducts.length})` },
    { id: "acid-wash", label: `Acid Wash (${acidCount})` },
    { id: "drop-shoulder", label: `Drop Shoulder (${dropCount})` },
    { id: "hoodies", label: `Hoodies (${hoodieCount})` },
    { id: "acid-wash-hoodies", label: `Acid Wash Hoodies (${acidHoodieCount})` },
  ] as const;

  const collectionSchema = useMemo(
    () =>
      collectionPageSchema({
        name: "Avengers: Doomsday Graphic T-Shirts & Hoodies",
        description:
          "Shop Avengers: Doomsday and Doctor Doom graphic T-shirts, vintage acid-wash tees, and fleece hoodies in Pakistan, printed in Karachi by Deez Prints.",
        url: "/doomsday",
        items: doomProducts.map((p) => ({
          id: p.id,
          title: p.title,
          image: p.images[0],
        })),
      }),
    [doomProducts],
  );

  const crumbsSchema = useMemo(
    () =>
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Avengers: Doomsday Collection", url: "/doomsday" },
      ]),
    [],
  );

  return (
    <div className="min-h-screen bg-background pt-[102px] md:pt-[116px] pb-14">
      <JsonLd data={collectionSchema} />
      <JsonLd data={crumbsSchema} />
      {/* Header Banner */}
      <section className="edge border-b border-border/60 pb-3 md:pb-5">
        {/* Desktop Breadcrumb (hidden on mobile to reclaim vertical space) */}
        <div className="hidden md:block mb-2.5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 label-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 md:gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-[21px] sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-[0.95] text-foreground">
              Avengers: Doomsday Graphic T-Shirts &amp; Hoodies
            </h1>
            <p className="hidden md:block mt-1.5 max-w-2xl text-sm leading-snug text-muted-foreground">
              Shop Avengers: Doomsday T-shirts and hoodies in Pakistan, featuring fan-inspired Doctor Doom and Cyclops X-Men graphic streetwear. Every artwork in the drop is available across oversized drop-shoulder tees, vintage acid-wash tees, black fleece hoodies, and acid-wash hoodies. All pieces are DTF printed in Karachi by Deez Prints with Rs. 200 rider delivery in Karachi (free above Rs. 5,000) and Rs. 450 nationwide courier delivery across Pakistan.
            </p>
          </div>

          {/* Mobile Compact Inline Countdown Strip */}
          <div className="flex lg:hidden items-center justify-between gap-1.5 px-2.5 py-1.5 bg-black/55 border border-white/10 rounded">
            <span className="text-[8.5px] font-black uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
              Doomsday In
            </span>
            <div className="flex items-center gap-1">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="flex items-baseline gap-0.5 rounded border border-white/15 bg-black/80 px-1.5 py-0.5 tabular-nums"
                >
                  <span className="font-display text-xs font-black text-white leading-none">
                    {u.value}
                  </span>
                  <span className="text-[7px] font-bold uppercase text-white/50 leading-none">
                    {u.short}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Compact Live Countdown Block */}
          <div className="hidden lg:block relative px-3.5 py-2 bg-black/50 border border-white/10 rounded shrink-0">
            <p className="mb-1 text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground text-center">
              Doomsday Arrives In
            </p>
            <div className="flex items-center gap-1.5">
              {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center w-11">
                  <div className="flex h-8 w-full items-center justify-center rounded border border-white/20 bg-black/80 font-display text-sm font-black text-white tabular-nums">
                    {u.value}
                  </div>
                  <span className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.16em] text-white/55">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fit Filter Tabs + Sort Controls */}
        <div className="mt-2.5 md:mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
          {/* All 3 filters in one horizontal row; controlled horizontal scroll on ultra-narrow viewports */}
          <div
            role="tablist"
            aria-label="Filter by finish"
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none max-w-full"
          >
            {filterTabs.map((tab) => {
              const active = fitFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFitFilter(tab.id)}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded border font-black uppercase transition-colors cursor-pointer",
                    "px-2 py-1.5 text-[9.5px] tracking-[0.05em] sm:px-3.5 sm:py-1.5 sm:text-[10.5px] sm:tracking-[0.14em]",
                    active
                      ? "bg-[color:var(--accent)] text-black border-[color:var(--accent)] shadow-xs"
                      : "bg-surface/40 text-muted-foreground border-border hover:border-foreground/70 hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Desktop design/piece summary (hidden on mobile/narrow tablet to prevent toolbar crowding) */}
            <span className="hidden lg:inline whitespace-nowrap label-mono text-[10px] text-muted-foreground/80 tracking-[0.14em]">
              {artworkGroups.length} {artworkGroups.length === 1 ? "Design" : "Designs"} · {totalVisibleCount}{" "}
              {totalVisibleCount === 1 ? "Piece" : "Pieces"}
            </span>

            <div className="flex items-center gap-1.5">
              <label
                htmlFor="doom-sort"
                className="label-mono text-[10px] sm:text-xs text-muted-foreground"
              >
                Sort:
              </label>
              <select
                id="doom-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")}
                className="rounded border border-border bg-surface px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Artwork-Grouped Product Catalogue */}
      <section className="edge pt-2.5 md:pt-7">
        {artworkGroups.length === 0 ? (
          <div className="py-16 text-center">
            <p className="label-mono text-xs text-muted-foreground">
              No Doctor Doom pieces match this filter.
            </p>
          </div>
        ) : isSingleFinishView ? (
          /* Single-finish filter active: 2-col mobile, 3-col tablet, 4-col desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2.5 gap-y-3 md:gap-x-4 md:gap-y-7">
            {artworkGroups.map((group, groupIdx) => {
              const groupNum = pad(groupIdx + 1);
              const startIdx = groupStartIndices[groupIdx] ?? 0;
              return (
                <div key={group.key} className="row-span-2 grid grid-rows-subgrid gap-y-1.5 min-w-0">
                  <div className="flex items-end pb-1 border-b border-border/50">
                    <div className="flex items-start gap-1.5 min-w-0">
                      <span
                        aria-hidden="true"
                        className="inline-block h-3 w-[2px] -skew-x-[20deg] bg-primary shrink-0 mt-[2px]"
                      />
                      <h2 className="font-display text-[11px] sm:text-xs font-black uppercase tracking-tight leading-tight text-foreground">
                        <span className="font-mono text-primary/90 mr-1">{groupNum}</span>
                        <span className="text-muted-foreground/45 mr-1">/</span>
                        {group.label}
                      </h2>
                    </div>
                  </div>
                  <div className="h-full">
                    <ProductCard product={group.items[0]} index={startIdx} imageAspect="square" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Paired artwork view: 1 group/row on mobile (2 cards side-by-side), 2 groups/row on lg+ (4 cards wide) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3.5 md:gap-y-8 lg:gap-x-7 xl:gap-x-9">
            {artworkGroups.map((group, groupIdx) => {
              const groupNum = pad(groupIdx + 1);
              const startIdx = groupStartIndices[groupIdx] ?? 0;
              const finishCount = group.items.length;

              return (
                <div
                  key={group.key}
                  className={cn(
                    "flex flex-col min-w-0",
                    groupIdx > 0 && "pt-3 border-t border-border/45 lg:pt-0 lg:border-t-0",
                  )}
                >
                  {/* Compact Editorial Artwork Header — wraps cleanly on long names */}
                  <div className="flex items-start justify-between gap-2 pb-1.5 mb-2 md:pb-2 md:mb-3 border-b border-border/55">
                    <div className="flex items-start gap-2 min-w-0">
                      <span
                        aria-hidden="true"
                        className="inline-block h-3.5 w-[2.5px] -skew-x-[20deg] bg-primary shrink-0 mt-[2px]"
                      />
                      <h2 className="font-display text-xs sm:text-sm md:text-[15px] font-black uppercase tracking-tight leading-snug text-foreground">
                        <span className="font-mono text-primary mr-1.5">{groupNum}</span>
                        <span className="text-muted-foreground/45 mr-1.5">/</span>
                        {group.label}
                      </h2>
                    </div>

                    <span className="shrink-0 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground border border-border/70 bg-surface/50 px-1.5 py-0.5 rounded mt-0.5">
                      {finishCount === 1 ? "1 Finish" : `${finishCount} Finishes`}
                    </span>
                  </div>

                  {/* Paired Finishes Grid (2-col on mobile and desktop -> 4-col overall density on lg+) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                    {group.items.map((product, itemIdx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={startIdx + itemIdx}
                        imageAspect="square"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Complete Catalogue Footer + Crawlable Full-Drop Links */}
        {totalVisibleCount > 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 md:py-10 border-t border-border/40 mt-8 md:mt-10">
            <span className="label-mono text-[11px] sm:text-xs text-muted-foreground uppercase tracking-widest">
              {artworkGroups.length} {artworkGroups.length === 1 ? "artwork" : "artworks"} · All{" "}
              {totalVisibleCount} matching pieces shown
            </span>
            <details className="w-full max-w-4xl text-center">
              <summary className="cursor-pointer label-mono text-[10px] text-muted-foreground/75 hover:text-primary uppercase tracking-widest transition-colors list-none">
                Browse all {doomProducts.length} Doomsday pieces index
              </summary>
              <nav
                aria-label="All Avengers: Doomsday products"
                className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
              >
                {doomProducts.map((p) => (
                  <Link
                    key={p.id}
                    to="/products/$productId"
                    params={{ productId: p.id }}
                    className="hover:text-primary underline-offset-4 hover:underline transition-colors"
                  >
                    {p.title}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        )}
      </section>
    </div>
  );
}
