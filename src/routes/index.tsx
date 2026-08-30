import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram, Star } from "lucide-react";
import { Hero, TickerRule, CollectionsStrip } from "@/components/site/Hero";
import { ProductRow } from "@/components/shop/ProductRow";
import { getProducts, type Product } from "@/data/products";
import { CUSTOM_IMAGE, collections, site, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AestheticCollections } from "@/components/home/AestheticCollections";
import { CustomPrintSection } from "@/components/home/CustomPrintSection";
import { CampaignCarousel } from "@/components/home/CampaignCarousel";

export const Route = createFileRoute("/")({"loader": async () => {
    const allProducts = await getProducts();
    return { allProducts };
  },
  head: () => ({
    meta: [
      { title: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan" },
      {
        name: "description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      {
        property: "og:title",
        content: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan",
      },
      {
        property: "og:description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "Deez Prints" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:secure_url", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@deez_prints" },
      { name: "twitter:title", content: "Deez Prints — Premium Streetwear & Custom Printing in Pakistan" },
      {
        name: "twitter:description",
        content:
          "Oversized drop-shoulder tees, acid wash, hoodies, jerseys and wall art. Upload your own artwork for custom printing. Delivered across Pakistan in 3–5 days.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  const { allProducts } = Route.useLoaderData();

  const { withImages, acidWash, regularTees, latest, wallArt, accessories } = useMemo(() => {
    const imgs = allProducts.filter((p) => p.images.length > 0);
    return {
      withImages: imgs,
      acidWash: imgs.filter((p) => p.subcategory === "acid-wash").slice(0, 4),
      regularTees: imgs.filter((p) => ["regular", "graphic"].includes(p.subcategory)).slice(0, 4),
      latest: imgs.filter((p) => p.subcategory === "drop-shoulder").slice(0, 4),
      wallArt: allProducts.filter((p) => ["tapestries", "flags"].includes(p.subcategory)).slice(0, 4),
      accessories: allProducts.filter((p) => p.category === "accessories" && p.images.length > 0),
    };
  }, [allProducts]);

  return (
    <>
      <Hero />
      <CollectionsStrip />

      {/* Browse by Aesthetic Collections Section */}
      <AestheticCollections />

      {/* Acid Wash Section */}
      <ProductRow
        eyebrow="Acid Wash"
        title={"Vintage\nHeavyweight"}
        items={acidWash}
        ctaLabel="Shop acid wash"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "acid-wash" }}
      />

      {/* Regular Tees Section */}
      <ProductRow
        eyebrow="Regular Tees"
        title={"Everyday\nEssentials"}
        items={regularTees}
        ctaLabel="Shop regular tees"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "t-shirts" }}
      />

      {/* Drop Shoulder Section */}
      <ProductRow
        eyebrow="Drop Shoulder"
        title={"Oversized\nSilhouettes"}
        items={latest}
        ctaLabel="View all drops"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "drop-shoulder" }}
      />

      {/* NEW FULL-WIDTH MOVING CAMPAIGN CAROUSEL */}
      <CampaignCarousel />

      <ProductRow
        eyebrow="Wall art"
        title={"Make your\nspace yours"}
        items={wallArt}
        ctaLabel="Explore wall art"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "wall-art" }}
      />

      <ProductRow
        eyebrow="Accessories"
        title={"Small\nstatements"}
        items={accessories.slice(0, 4)}
        ctaLabel="Shop accessories"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "accessories" }}
      />

      {/* Reviews Teaser Banner */}
      <section className="border-t border-border bg-surface/40 py-8">
        <div className="edge flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-display font-extrabold uppercase text-foreground text-sm tracking-tight">
              Rated 4.9/5 by 500+ verified customers
            </span>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 label-mono text-xs text-primary hover:underline font-bold"
          >
            Read Reviews <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Community */}
      <section className="border-t border-border">
        <div className="edge grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 py-14">
          <div className="min-w-0">
            <p className="label-mono text-primary">Community</p>
            <h2 className="display-md mt-3">@deez_prints</h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border border-border-strong px-5 py-3 label-mono hover:border-primary hover:text-primary"
          >
            <Instagram className="h-4 w-4" /> Follow
          </a>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4 lg:grid-cols-6">
          {withImages.slice(0, 6).map((p) => (
            <Link
              key={p.id}
              to="/products/$productId"
              params={{ productId: p.id }}
              className="group relative aspect-square overflow-hidden bg-surface"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover img-zoom"
              />
              <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Collections quick links */}
      <section className="edge border-t border-border py-14">
        <div className="flex flex-wrap gap-2">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="border border-border px-4 py-2.5 label-mono transition-colors hover:border-primary hover:text-primary"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
