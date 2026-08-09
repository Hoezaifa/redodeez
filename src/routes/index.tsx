import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram, Star } from "lucide-react";
import { Hero, TickerRule, CollectionsStrip } from "@/components/site/Hero";
import { ProductRow } from "@/components/shop/ProductRow";
import { products } from "@/data/products";
import { CUSTOM_IMAGE, collections, site, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { AestheticCollections } from "@/components/home/AestheticCollections";
import { CustomPrintSection } from "@/components/home/CustomPrintSection";

export const Route = createFileRoute("/")({
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
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const withImages = products.filter((p) => p.images.length > 0);
const latest = withImages.filter((p) => p.subcategory === "drop-shoulder").slice(0, 4);
const best = withImages.filter((p) => ["graphic", "regular"].includes(p.subcategory)).slice(0, 4);
const wallArt = products.filter((p) => ["tapestries", "flags"].includes(p.subcategory)).slice(0, 4);
const accessories = products.filter((p) => p.category === "accessories" && p.images.length > 0);

function Home() {
  return (
    <>
      <Hero />
      <CollectionsStrip />

      {/* Browse by Aesthetic Collections Section */}
      <AestheticCollections />

      <ProductRow
        eyebrow="Latest drops"
        title={"Just\nlanded"}
        items={latest}
        ctaLabel="View all drops"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "drop-shoulder" }}
      />

      {/* Hidden: Loved by the cult / Best sellers section */}
      {/* 
      <ProductRow
        eyebrow="Best sellers"
        title={"Loved by\nthe cult"}
        items={best}
        ctaLabel="Shop best sellers"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "t-shirts" }}
      />
      */}

      {/* Hidden: Old custom printing section — kept for potential future use */}
      {/*
      <section className="border-t border-border bg-surface relative overflow-hidden">
        <div className="overflow-hidden border-b border-border bg-background py-3.5">
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee">
              {Array.from({ length: 4 }).map((_, k) => (
                <div key={k} className="flex shrink-0">
                  {[
                    "YOUR DESIGN. NO LIMITS.",
                    "PREMIUM DTF & SUBLIMATION",
                    "CUSTOM PRINTING",
                    "FAST DELIVERY",
                    "NO MINIMUM ORDER",
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-8 px-8 label-mono text-white/80">
                      {t}
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CustomPrintSection />
      </section>
      */}

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
                className="h-full w-full object-cover img-zoom group-hover:scale-105"
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
