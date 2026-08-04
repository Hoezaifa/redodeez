import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { collections, site, aestheticSlugs } from "@/data/site";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeading } from "@/components/shop/ProductRow";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = collections.find((c) => c.slug === params.slug);
    if (!collection) throw notFound();
    return { slug: collection.slug, name: collection.name, blurb: collection.blurb };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Collection"} — Deez Prints` },
      {
        name: "description",
        content: `${loaderData?.blurb ?? "Deez Prints collection."} Shop the ${loaderData?.name ?? ""} collection with nationwide delivery in 3–5 working days.`,
      },
      { property: "og:title", content: `${loaderData?.name ?? "Collection"} — Deez Prints` },
      { property: "og:description", content: loaderData?.blurb ?? "Deez Prints collection." },
    ],
    links: [{ rel: "canonical", href: `/collections/${loaderData?.slug ?? ""}` }],
  }),
  component: CollectionPage,
});

const sortOptions = [
  { id: "featured", label: "Featured", icon: "▼" },
  { id: "price", label: "Price", icon: "↑↓" },
  { id: "name", label: "A–Z", icon: null },
] as const;

function CollectionPage() {
  const { slug, name, blurb } = Route.useLoaderData();
  const [sort, setSort] = useState("featured");
  const [priceDir, setPriceDir] = useState<"asc" | "desc">("asc");

  const isAesthetic = aestheticSlugs.includes(slug);
  const filterableCollections = useMemo(() => {
    if (isAesthetic) {
      return collections.filter((c) => aestheticSlugs.includes(c.slug));
    }
    return collections.filter((c) => !aestheticSlugs.includes(c.slug));
  }, [isAesthetic]);

  const items = useMemo(() => {
    const c = collections.find((x) => x.slug === slug)!;
    const list = products.filter((p) => c.match(p));
    if (sort === "price") {
      list.sort((a, b) => (priceDir === "asc" ? a.price - b.price : b.price - a.price));
    }
    if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "featured") list.sort((a, b) => b.images.length - a.images.length);
    return list;
  }, [slug, sort, priceDir]);

  return (
    <div className="edge py-14 md:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Shop", url: "/collections" },
          { name, url: `/collections/${slug}` },
        ])}
      />
      <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/collections" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{name}</span>
      </nav>

      <div className="mt-8">
        <SectionHeading eyebrow={`${items.length} pieces`} title={name} sub={blurb} />
      </div>

      {/* Filters + Sort — sticky */}
      <div className="sticky top-0 z-30 -mx-5 mt-10 bg-background/95 px-5 backdrop-blur-md md:-mx-10 md:px-10 xl:-mx-14 xl:px-14">
        <div className="flex flex-wrap items-center gap-2 border-y border-border py-4">
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

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-10">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
