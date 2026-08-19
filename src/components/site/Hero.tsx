import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HERO_IMAGE, collections, site, CDN } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { COLLECTION_CAMPAIGN_ASSETS } from "@/lib/campaignPrompts";

export { DeezHero as Hero } from "@/components/hero/DeezHero";

export function TickerRule() {
  const items = [
    "Oversized fits",
    "Premium quality",
    "Bold graphics",
    "Custom made",
    "Fast delivery",
  ];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-3.5">
      <div className="flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0">
              {items.map((t) => (
                <span key={t} className="flex items-center gap-10 px-10 label-mono">
                  {t}
                  <span className="h-1 w-1 bg-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CollectionsStrip() {
  const activeImages = useRef<Record<string, string>>({
    "t-shirts": "/campaign/regular_tees_user.jpg",
    "drop-shoulder": "/assets/collections/drop_shoulder_cover_v2.webp",
    "acid-wash": "/assets/collections/acid_wash_cover_v2.webp",
  });

  const featuredCollections = [
    {
      slug: "t-shirts",
      name: "Regular Tees",
      blurb: "Classic fit. Statement graphics.",
      image: activeImages.current["t-shirts"],
      tag: "Classic Fit",
    },
    {
      slug: "drop-shoulder",
      name: "Drop Shoulder",
      blurb: "Oversized cuts, heavyweight 240 GSM cotton.",
      image: activeImages.current["drop-shoulder"],
      tag: "Featured Drop",
    },
    {
      slug: "acid-wash",
      name: "Acid Wash",
      blurb: "Hand-washed vintage texture. No two identical.",
      image: activeImages.current["acid-wash"],
      tag: "Vintage Wash",
    },
  ];

  return (
    <section className="edge py-20 md:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
        <div className="min-w-0">
          <p className="label-mono text-primary">Collections</p>
          <h2 className="display-lg mt-4">
            Explore
            <br />
            everything
          </h2>
        </div>
        <Link
          to="/collections"
          className="self-start sm:self-auto shrink-0 border border-border-strong px-5 py-3 label-mono transition-colors hover:border-primary hover:text-primary"
        >
          View all
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-4">
        {featuredCollections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group relative flex h-full flex-col justify-end overflow-hidden bg-background border border-white/5"
            >
              <div className="aspect-3/4 w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover img-zoom group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-75 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 pointer-events-none">
                <div className="min-w-0">
                  <span className="label-mono text-[10px] text-primary tracking-widest uppercase">
                    Featured Drop
                  </span>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white mt-1">
                    {c.name}
                  </h3>
                  <p className="label-mono mt-1.5 text-xs text-muted-foreground truncate">
                    {c.blurb}
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:translate-x-1 pointer-events-auto">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
