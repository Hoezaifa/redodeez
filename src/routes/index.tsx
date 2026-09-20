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

const COMMUNITY_POSTS = [
  {
    id: "dp-acid-wash-zoro-2",
    title: "Zoro Bushido Acid Wash Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970863/deez-prints/covers/zoro_bushido_acid_wash_new.jpg",
  },
  {
    id: "dp-acid-wash-dbz-1",
    title: "Majin Vegeta Acid Wash Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970867/deez-prints/covers/majin_vegeta_acid_wash_new.jpg",
  },
  {
    id: "dp-drop-shoulder-baby",
    title: "Cupid Vintage Drop Shoulder Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970851/deez-prints/covers/cupid_vintage_white_new.jpg",
  },
  {
    id: "dp-acid-wash-berserk-skull-blade",
    title: "Berserk Skull Blade Acid Wash Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970854/deez-prints/covers/berserk_skull_blade_acid_wash_new.jpg",
  },
  {
    id: "dp-acid-wash-speed",
    title: "Formula Speed Acid Wash Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970860/deez-prints/covers/formula_speed_acid_wash_new.jpg",
  },
  {
    id: "dp-drop-shoulder-sukuna",
    title: "Sukuna Cursed Drop Shoulder Tee",
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788970875/deez-prints/covers/sukuna_cursed_drop_shoulder_new.png",
  },
];

function Home() {
  const { allProducts } = Route.useLoaderData();

  const { acidWash, regularTees, latest, wallArt, accessories } = useMemo(() => {
    const getColor = (p: Product) => {
      if (!p.images || p.images.length === 0) return "black";
      const img = p.images[0].toLowerCase();
      if (img.includes("maroon")) return "maroon";
      if (img.includes("green")) return "green";
      if (img.includes("beige")) return "beige";
      if (img.includes("white") || img.includes("whte")) return "white";
      if (img.includes("grey") || img.includes("gray")) return "grey";
      if (p.colors?.includes("Blue")) return "blue";
      return "black";
    };

    const getFamily = (p: Product) => {
      const pid = p.id.toLowerCase()
        .replace(/^dp-(drop-shoulder|acid-wash|regular)-/, "")
        .replace(/^tapestry-/, "");
      return pid.split("-")[0];
    };

    const selectDiverseRow = (pool: Product[], targetColors: string[]): Product[] => {
      const selected: Product[] = [];
      const usedIds = new Set<string>();
      const usedFams = new Set<string>();

      for (const targetColor of targetColors) {
        const match = pool.find(
          (p) => !usedIds.has(p.id) && !usedFams.has(getFamily(p)) && getColor(p) === targetColor
        );
        if (match) {
          selected.push(match);
          usedIds.add(match.id);
          usedFams.add(getFamily(match));
        }
      }

      if (selected.length < 4) {
        for (const p of pool) {
          if (selected.length >= 4) break;
          if (!usedIds.has(p.id) && !usedFams.has(getFamily(p))) {
            selected.push(p);
            usedIds.add(p.id);
            usedFams.add(getFamily(p));
          }
        }
      }
      return selected;
    };

    const allAcid = allProducts.filter((p) => p.subcategory === "acid-wash");
    const allDrop = allProducts.filter((p) => p.subcategory === "drop-shoulder");
    const allReg = allProducts.filter((p) => ["regular", "graphic"].includes(p.subcategory));

    return {
      // Acid Wash: Charcoal Black -> Deep Maroon -> Vintage Grey -> Dark Green/Black
      acidWash: selectDiverseRow(allAcid, ["black", "maroon", "grey", "black"]),
      // Drop Shoulder: Sand Beige -> Olive Green -> Clean White -> Black
      latest: selectDiverseRow(allDrop, ["beige", "green", "white", "black"]),
      // Regular Tees: Crisp White -> Heavy Black -> Warm Beige -> Grey
      regularTees: selectDiverseRow(allReg, ["white", "black", "beige", "grey"]),
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
          {COMMUNITY_POSTS.map((item) => (
            <Link
              key={item.id}
              to="/products/$productId"
              params={{ productId: item.id }}
              className="group relative aspect-square overflow-hidden bg-surface"
            >
              <img
                src={item.image}
                alt={item.title}
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
