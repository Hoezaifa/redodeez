import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Sparkles, Shirt, Palette, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_URL } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Streetwear & Decor Guides — Deez Prints Studio" },
      {
        name: "description",
        content:
          "Practical guides by Deez Prints: Tapestry size selection, damage-free wall hanging, DTF vs sublimation printing breakdown, and graphic t-shirt care tips.",
      },
      { property: "og:title", content: "Streetwear & Room Decor Guides — Deez Prints" },
      {
        property: "og:description",
        content:
          "Master room decor, anime aesthetic wall art, DTF garment care, and custom print file preparation with official Deez Prints guides.",
      },
      { property: "og:url", content: `${SITE_URL}/guides` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/guides` }],
  }),
  component: GuidesIndexPage,
});

const guidesList = [
  {
    slug: "tapestry-decor-guide",
    title: "The Complete Tapestry Size, Hanging & Anime Decor Guide",
    badge: "Room Decor & Wall Art",
    readTime: "5 min read",
    desc: "Everything you need to know about picking the right tapestry dimensions (50x30 vs 70x50), renter-friendly damage-free wall hanging, and styling your gaming or anime aesthetic setup.",
    icon: Palette,
    category: "Tapestries",
    updatedAt: "September 2026",
    linkText: "Read Tapestry Guide →",
  },
  {
    slug: "streetwear-printing-and-care",
    title: "DTF vs Sublimation: The Streetwear Printing & Fabric Care Guide",
    badge: "Garment Science & Care",
    readTime: "6 min read",
    desc: "Understand how commercial Direct-to-Film (DTF) printing works on 240+ GSM combed cotton blanks, how it compares to sublimation and screen print, and essential washing rules to ensure prints last years.",
    icon: Shirt,
    category: "Streetwear & Custom",
    updatedAt: "September 2026",
    linkText: "Read Printing & Care Guide →",
  },
];

function GuidesIndexPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card/40 to-background py-16 sm:py-24">
        <div className="edge max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Guides</span>
          </nav>

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <BookOpen className="h-3.5 w-3.5" /> Deez Prints Studio Knowledge Base
            </div>
            <h1 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-5xl text-foreground">
              Streetwear &amp; Decor Guides
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Transparent craftsmanship, sizing specifications, and practical care instructions directly from our Karachi print studio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Guides Grid */}
      <main className="edge max-w-5xl py-12 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {guidesList.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <Reveal key={guide.slug} delay={idx * 0.1}>
                <article className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                        <Icon className="h-3.5 w-3.5 text-primary" /> {guide.badge}
                      </span>
                      <span className="label-mono text-xs text-muted-foreground">{guide.readTime}</span>
                    </div>

                    <h2 className="mt-5 font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground hover:text-primary transition-colors">
                      <Link to={`/guides/${guide.slug}` as any}>
                        {guide.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="label-mono text-xs text-muted-foreground">Updated {guide.updatedAt}</span>
                    <Link
                      to={`/guides/${guide.slug}` as any}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary hover:underline"
                    >
                      {guide.linkText}
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Quick Help & Studio FAQ banner */}
        <div className="mt-16 rounded-2xl border border-border bg-card/40 p-8 text-center sm:p-12">
          <HelpCircle className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">
            Need Custom Advice or Sizing Help?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
            Our Karachi studio team can answer questions about fabric weights, custom artwork resolution, or delivery times.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/collections/$slug"
              params={{ slug: "tapestries" }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Tapestries
            </Link>
            <Link
              to="/custom-print"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary transition-colors"
            >
              Custom Printing Studio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
