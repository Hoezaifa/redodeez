import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { getProducts, type Product } from "@/data/products";
import { collections, site, aestheticSlugs, SITE_URL, toAbsoluteImageUrl } from "@/data/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shop/ProductRow";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/collections/$slug")({
  loader: async ({ params }) => {
    const collection = collections.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    const allProducts = await getProducts();
    return { slug: collection.slug, name: collection.name, blurb: collection.blurb, allProducts };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.name ?? "Collection";
    const blurb = loaderData?.blurb ?? "Deez Prints collection.";
    const collectionObj = collections.find((c) => c.slug === loaderData?.slug);
    const absoluteImgUrl = toAbsoluteImageUrl(collectionObj?.image);
    const url = `${SITE_URL}/collections/${loaderData?.slug ?? ""}`;
    const title = `${name} Collection — Deez Prints`;
    const desc = `${blurb} Shop ${name} by Deez Prints. Made to order in Karachi, delivered nationwide across Pakistan.`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Deez Prints" },
        { property: "og:image", content: absoluteImgUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@deez_prints" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: absoluteImgUrl },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CollectionPage,
});

const sortOptions = [
  { id: "featured", label: "Featured", icon: "▼" },
  { id: "price", label: "Price", icon: "↑↓" },
  { id: "name", label: "A–Z", icon: null },
] as const;

function CollectionPage() {
  const { slug, name, blurb, allProducts } = Route.useLoaderData();
  const [sort, setSort] = useState("featured");
  const [priceDir, setPriceDir] = useState<"asc" | "desc">("asc");

  const isAesthetic = aestheticSlugs.includes(slug);
  const isComingSoonCollection = slug !== "anime-archive" && (slug === "comic-universe" || slug === "minimal-drops" || slug === "cinema-collection" || slug === "art-drop" || slug === "street-aesthetic");

  const filterableCollections = useMemo(() => {
    if (isAesthetic) {
      return collections.filter((c) => aestheticSlugs.includes(c.slug));
    }
    return collections.filter((c) => !aestheticSlugs.includes(c.slug));
  }, [isAesthetic]);

  const items = useMemo(() => {
    const c = collections.find((x) => x.slug === slug)!;
    const list = allProducts.filter((p) => c.match(p));
    if (sort === "price") {
      list.sort((a, b) => (priceDir === "asc" ? a.price - b.price : b.price - a.price));
    }
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "featured") list.sort((a, b) => b.images.length - a.images.length);
    return list;
  }, [slug, sort, priceDir, allProducts]);

  return (
    <div className="edge pt-14 pb-6 md:pt-16 md:pb-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/collections" },
          { name, url: `/collections/${slug}` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="label-mono text-[10px] md:text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/collections" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{name}</span>
      </nav>

      <div className="mt-1.5 md:mt-3">
        <SectionHeading eyebrow={`${items.length} pieces`} title={name} sub={blurb} />
      </div>

      {isComingSoonCollection && (
        <div className="mt-4 p-4 md:p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="label-mono text-amber-400 font-extrabold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> DROP COMING SOON
            </p>
            <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase mt-1">
              This collection universe is currently in development
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 font-sans mt-0.5">
              Designs below are previews. Stay tuned — ordering will unlock as soon as the collection drops!
            </p>
          </div>
        </div>
      )}

      {/* Filters + Sort — sticky */}
      <div className="sticky top-0 z-30 -mx-5 mt-2 md:mt-5 bg-background/95 px-5 backdrop-blur-md md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="flex flex-wrap items-center gap-2 border-y border-border py-2.5 md:py-3">
          {filterableCollections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className={cn(
                "chip-glow px-4 py-2 label-mono",
                c.slug === slug
                  ? "bg-primary text-primary-foreground chip-glow-active"
                  : "border border-border hover:border-primary hover:text-primary",
              )}
            >
              {c.name}
            </Link>
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

      <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-8">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
