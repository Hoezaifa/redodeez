import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import { Hero, TickerRule, CollectionsStrip } from "@/components/site/Hero";
import { ProductRow } from "@/components/shop/ProductRow";
import { products } from "@/data/products";
import { CUSTOM_IMAGE, collections, site, usps, whatsappLink } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TrustSection } from "@/components/home/TrustSection";

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

      <ProductRow
        eyebrow="Latest drops"
        title={"Just\nlanded"}
        items={latest}
        ctaLabel="View all drops"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "drop-shoulder" }}
      />

      <ProductRow
        eyebrow="Best sellers"
        title={"Loved by\nthe cult"}
        items={best}
        ctaLabel="Shop best sellers"
        ctaTo="/collections/$slug"
        ctaParams={{ slug: "t-shirts" }}
      />

      {/* Custom printing */}
      <section className="border-t border-border bg-surface relative overflow-hidden">
        {/* Continuous Horizontal Moving Marquee Banner */}
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

        <div className="edge grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="label-mono text-primary">Custom printing</p>
            <h2 className="display-lg mt-4">
              Your design.
              <br />
              <span className="text-primary">No limits.</span>
            </h2>
            <ol className="mt-10 grid gap-px bg-border sm:grid-cols-3">
              {[
                ["01", "Upload", "Drop your artwork or idea"],
                ["02", "We print", "Premium DTF & sublimation"],
                ["03", "Delivered", `${site.deliveryTime} to your door`],
              ].map(([n, t, d]) => (
                <li key={n} className="bg-surface p-5">
                  <span className="label-mono text-primary">{n}</span>
                  <p className="mt-3 font-display text-lg font-extrabold uppercase">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton to="/custom-print">
                Start custom print <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href={whatsappLink("Hi! I want a custom print.")} variant="outline">
                Ask on WhatsApp
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-4/5 overflow-hidden bg-background">
              <motion.img
                src={CUSTOM_IMAGE}
                alt="Blank tee ready for a custom print"
                loading="lazy"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="absolute left-5 top-5 bg-primary px-3 py-1.5 label-mono text-primary-foreground">
                Your idea here
              </span>
            </div>
          </Reveal>
        </div>
      </section>

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

      {/* Why */}
      <section className="edge border-t border-border py-16 md:py-20">
        <p className="label-mono text-muted-foreground">Why shop with Deez Prints</p>
        <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.06} className="bg-background p-6">
              <p className="font-display text-lg font-extrabold uppercase tracking-tight">
                {u.title}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{u.body}</p>
            </Reveal>
          ))}
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
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <TrustSection />

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
