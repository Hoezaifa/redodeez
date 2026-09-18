import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Palette,
  Maximize2,
  Wrench,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_URL } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/guides/tapestry-decor-guide")({
  head: () => ({
    meta: [
      { title: "The Complete Tapestry Size, Hanging & Room Decor Guide — Deez Prints" },
      {
        name: "description",
        content:
          "How to pick the right tapestry size (50x30 vs 70x50 in), damage-free wall hanging techniques for rentals, high-density satin fabric care, and anime aesthetic decor ideas.",
      },
      { property: "og:title", content: "Tapestry Size & Room Decor Guide — Deez Prints" },
      {
        property: "og:description",
        content:
          "Damage-free hanging for renters, room sizing breakdown, and anime aesthetic wall art styling from Deez Prints Karachi.",
      },
      { property: "og:url", content: `${SITE_URL}/guides/tapestry-decor-guide` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/guides/tapestry-decor-guide` }],
  }),
  component: TapestryGuidePage,
});

function TapestryGuidePage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: "Tapestry Size & Decor Guide", url: "/guides/tapestry-decor-guide" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* Hero Header */}
      <header className="relative border-b border-border bg-gradient-to-b from-card/50 to-background py-16 sm:py-20">
        <div className="edge max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to={"/guides" as any} className="hover:text-primary transition-colors">
              Guides
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">Tapestry Size &amp; Decor</span>
          </nav>

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Palette className="h-3.5 w-3.5" /> Room Decor &amp; Wall Art Science
            </div>
            <h1 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-5xl text-foreground">
              The Complete Tapestry Size, Hanging &amp; Room Decor Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Transforming your living space or battlestation setup with wall art shouldn't ruin your walls or leave you with sizing regrets. Here is the definitive guide by Deez Prints.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Guide Content */}
      <main className="edge max-w-4xl py-12 sm:py-16">
        <article className="space-y-12 sm:space-y-16">
          {/* Section 1: Dimensions & Sizing */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                1
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                Tapestry Sizing Breakdown: Small vs. Large
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Choosing the correct proportions is the difference between a cramped wall and an immersive aesthetic statement. At Deez Prints, our tapestries are crafted in two balanced dimensions tailored to modern apartments and rooms:
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-foreground">Small (50″ × 30″ / 127 × 76 cm)</span>
                  <span className="label-mono text-xs text-primary font-bold">Standard</span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Best for tighter wall sectors: above your monitor setup, beside wardrobe doors, in dorm cubicles, or flanked between acoustic foam tiles. It adds intense visual focus without dominating the entire space.
                </p>
                <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <strong className="text-foreground">Ideal setup:</strong> Study desks, gaming rigs, hallway accents.
                </div>
              </div>

              <div className="rounded-xl border border-primary/40 bg-card p-6 shadow-sm shadow-primary/5">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-foreground">Large (70″ × 50″ / 178 × 127 cm)</span>
                  <span className="label-mono text-xs text-emerald-400 font-bold">Statement Piece</span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our flagship format. Designed to occupy primary focal walls: above double and king beds, behind large studio streaming desks, or living room accent spaces. Covers 24+ square feet of surface with edge-to-edge saturation.
                </p>
                <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <strong className="text-foreground">Ideal setup:</strong> Bed headboard backdrop, living room feature walls, streaming backdrops.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Material Science */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                2
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                Fabric Science: High-Density Satin Material
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Most generic flags on marketplaces use cheap scratchy polyester that wrinkles instantly, exhibits sheer see-through transparency, and fades under ambient room lighting. Deez Prints tapestries are manufactured using:
            </p>
            <div className="rounded-xl border border-border bg-card/60 p-6 sm:p-8">
              <ul className="grid gap-4 sm:grid-cols-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>High-Density Satin Weave:</strong> Heavy opaque hand-feel with a luxurious semi-matte sheen that absorbs glare from computer monitors and LED lighting strips.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Sublimation Heat Transfer:</strong> Thermal dye bonds deep inside the microfiber lattice. The artwork will not chip, crack, or wash away.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Overlocked Hemmed Borders:</strong> Reinforced edge stitching prevents any fraying or thread runs during hanging and repositioning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Crease-Relaxing Fibers:</strong> Folds from shipping packaging relax within 48 hours of hanging, or instantly with a gentle steam cycle.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Damage-Free Wall Hanging Guide */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                3
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                Damage-Free Hanging Techniques for Renters &amp; Hostels
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In Pakistan, rental apartments and university hostels strictly prohibit drilling into plastered brick or concrete walls. Here are the 3 cleanest ways to hang your Deez Prints tapestry with zero wall damage:
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" /> Method A: Adhesive Command Strips + Binder Clips (Recommended)
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Stick two medium Command picture hanging strips onto the top corners of your wall. Clip two matte black stationery binder clips onto the top edges of the tapestry, and hook or stick them to the strips. The fabric hangs flush, straight, and removes with zero residue.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" /> Method B: Micro Clear Thumbtacks
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  If your wall surface is soft drywall or wood panelling, clear push-pins through the hemmed top corners leave an imperceptible microscopic puncture that requires no spackling.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" /> Method C: Curtain Rod or Tension Pole
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Thread a lightweight hollow aluminum dowel or curtain tension pole between two side walls. Clamp the tapestry along the bar for a museum-style drape that looks extremely premium in architectural setups.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Care & Maintenance */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                4
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                How to Remove Packaging Creases &amp; Wash
              </h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong>Unboxing:</strong> When you receive your parcel, you may notice neat fold creases from packing. Do not iron directly on high heat!
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Hand Steamer (Best):</strong> Hold a clothes steamer 2 inches away from the back of the hung tapestry. The wrinkles will fall out within 60 seconds.</li>
                <li><strong>Iron on Reverse:</strong> Place the tapestry face-down on a towel, set your iron to the lowest silk/synthetic heat setting, and gently glide over the reverse side.</li>
                <li><strong>Washing:</strong> Cold hand wash or delicate machine wash inside a laundry bag. Hang dry in shade. Never bleach.</li>
              </ul>
            </div>
          </section>

          {/* Call to action & Internal Links */}
          <section className="rounded-2xl border border-primary/30 bg-gradient-to-r from-card to-card/60 p-8 sm:p-12 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              Ready to Upgrade Your Space?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Browse our curated collection of 33+ high-definition anime, dark aesthetic, and iconic wall tapestries delivered across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/collections/$slug"
                params={{ slug: "tapestries" }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Shop All Tapestries <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/custom-print"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary transition-colors"
              >
                Custom Artwork Printing
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
