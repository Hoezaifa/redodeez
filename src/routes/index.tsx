import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { homeMeta } from "@/lib/seoMeta";
import { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
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
  head: () => {
    const { meta } = homeMeta();
    return {
      meta,
      links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    };
  },
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

      {/* FULL-WIDTH MOVING CAMPAIGN CAROUSEL */}
      <CampaignCarousel />

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

      {/* Tapestries Section */}
      <ProductRow
        eyebrow="Tapestries"
        title={"Make your\nspace yours"}
        items={wallArt}
        ctaLabel="Explore tapestries"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "tapestries" }}
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

      {/* Regular Tees Section */}
      <ProductRow
        eyebrow="Regular Tees"
        title={"Everyday\nEssentials"}
        items={regularTees}
        ctaLabel="Shop regular tees"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "t-shirts" }}
      />

      <ProductRow
        eyebrow="Accessories"
        title={"Small\nstatements"}
        items={accessories.slice(0, 4)}
        ctaLabel="Shop accessories"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "accessories" }}
      />


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
