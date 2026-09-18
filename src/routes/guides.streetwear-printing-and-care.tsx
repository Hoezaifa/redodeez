import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Shirt,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileCheck,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_URL } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/guides/streetwear-printing-and-care")({
  head: () => ({
    meta: [
      { title: "DTF vs Sublimation & Streetwear Garment Care Guide — Deez Prints" },
      {
        name: "description",
        content:
          "Complete streetwear printing guide: DTF vs Sublimation vs Screen Printing, 240+ GSM cotton blanks comparison, wash & care rules, and custom print artwork specs.",
      },
      { property: "og:title", content: "DTF Printing & Streetwear Care Guide — Deez Prints" },
      {
        property: "og:description",
        content:
          "Understand DTF printing technology on heavyweight cotton, blank fabric weights, and washing rules from the Deez Prints studio in Karachi.",
      },
      { property: "og:url", content: `${SITE_URL}/guides/streetwear-printing-and-care` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/guides/streetwear-printing-and-care` }],
  }),
  component: PrintingCareGuidePage,
});

function PrintingCareGuidePage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guides", url: "/guides" },
    { name: "DTF Printing & Care Guide", url: "/guides/streetwear-printing-and-care" },
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
            <span className="text-foreground font-semibold">Streetwear Printing &amp; Care</span>
          </nav>

          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Shirt className="h-3.5 w-3.5" /> Garment Science &amp; Print Technology
            </div>
            <h1 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-5xl text-foreground">
              DTF vs. Sublimation: The Streetwear Printing &amp; Fabric Care Guide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Why do some graphic tees crack after two washes while others look museum-grade for years? Here is how our Karachi studio engineers heavyweight streetwear blanks and commercial DTF prints.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Guide Content */}
      <main className="edge max-w-4xl py-12 sm:py-16">
        <article className="space-y-12 sm:space-y-16">
          {/* Section 1: Print Tech Comparison */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                1
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                DTF vs. Sublimation vs. Screen Print: The Real Breakdown
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Choosing the right printing technique depends on fabric chemistry. Here is how modern printing technologies compare:
            </p>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-primary/40 bg-card p-5 shadow-sm shadow-primary/5">
                <span className="label-mono text-xs text-primary font-bold">Deez Prints Choice</span>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">Commercial DTF</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Direct-to-Film uses precision aqueous textile inks on PET film backed with polyurethane adhesive powder. Cured at 160°C under 60 PSI pneumatic pressure.
                </p>
                <div className="mt-4 border-t border-border/50 pt-3 text-xs text-emerald-400 font-semibold">
                  ✓ Bonds to 100% cotton dark blanks<br />
                  ✓ High-res photographic gradients<br />
                  ✓ Extreme stretch resilience
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <span className="label-mono text-xs text-muted-foreground font-bold">Synthetic Only</span>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">Dye Sublimation</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Turns solid dye into gas under heat to permeate polyester polymer chains. Cannot bond to natural cotton fibers and appears washed out on dark fabrics.
                </p>
                <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  ✓ Perfect for satin tapestries &amp; flags<br />
                  ✗ Fails on 100% cotton streetwear
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <span className="label-mono text-xs text-muted-foreground font-bold">Legacy Method</span>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">Screen Printing</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Pushes plastisol ink through mesh screens. Excellent for simple 1–2 color bulk runs, but produces a thick, rubbery shield prone to spiderweb cracking on stretch knits.
                </p>
                <div className="mt-4 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  ✓ Cost-effective for 1000+ basic runs<br />
                  ✗ Heavy hand-feel, cracks over time
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Blanks Guide */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                2
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                Deez Prints Blanks: Fabric Weights &amp; Cuts
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We engineer custom silhouette patterns rather than relying on flimsy commercial blanks. Here are our 4 apparel lines:
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground">Heavyweight Drop Shoulder (240+ GSM)</h3>
                  <Link to="/collections/$slug" params={{ slug: "drop-shoulder" }} className="text-xs text-primary font-bold hover:underline">
                    View Collection →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  100% Combed Compact Cotton with zero lint fuzz. Features an oversized boxy streetwear drape, dropped shoulder seams, reinforced 1.25″ ribbed neck collar, and high side density that holds structure after wear.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground">Mineral Acid Wash Vintage Tees</h3>
                  <Link to="/collections/$slug" params={{ slug: "acid-wash" }} className="text-xs text-primary font-bold hover:underline">
                    View Collection →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hand-processed using artisan mineral wash cycles. Every single garment features a distinct vintage patina, faded seam edges, and buttery softened cotton hand-feel.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground">Classic Regular Fit Tees (180–200 GSM)</h3>
                  <Link to="/collections/$slug" params={{ slug: "t-shirts" }} className="text-xs text-primary font-bold hover:underline">
                    View Collection →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Breathable 100% ring-spun cotton jersey tailored for Pakistani summer heat. Modern standard chest fit with durable twin-needle hem stitching.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-base font-bold text-foreground">Heavyweight Streetwear Hoodies (350+ GSM)</h3>
                  <Link to="/collections/$slug" params={{ slug: "hoodies" }} className="text-xs text-primary font-bold hover:underline">
                    View Collection →
                  </Link>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Brushed thermal fleece interior with double-lined hood, heavyweight ribbing on cuffs and hem, and spacious kangaroo pocket designed for winter streetwear layering.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Care Rules */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                3
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                4 Golden Rules for Washing Graphic Tees &amp; Hoodies
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-bold text-foreground">1. Always Turn Inside Out</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Turning your tee inside out prevents the print surface from rubbing against the rough drum or other garments during spin cycles.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-bold text-foreground">2. Wash Cold (≤ 30°C)</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Hot water breaks down polyurethane adhesive bonds and degrades natural cotton fibers. Use cold tap water with mild liquid detergent.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-bold text-foreground">3. Air Dry in Shade</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Avoid high-heat commercial dryer drums. Hang your shirts on a clothes hanger indoors or in shade to avoid UV oxidation fading.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-heading text-sm font-bold text-foreground">4. Never Iron Directly Over Print</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Direct iron heat will scorch or melt the print polymer. Always iron your graphic tees inside out or place a baking sheet/towel over the design.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Custom Print Preparation */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-black">
                4
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight sm:text-3xl text-foreground">
                Custom Print Artwork Guidelines
              </h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p>
                Printing your own design with our <Link to="/custom-print" className="text-primary font-bold hover:underline">Custom Printing Studio</Link>? Follow these specs for the sharpest print output:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Resolution:</strong> 300 DPI at actual print size (at least 2400 × 3200 pixels for front graphics).</li>
                <li><strong>File Format:</strong> PNG with transparent background. If your artwork has a black background box, remove it so the ink seamlessly blends into the cotton.</li>
                <li><strong>Color Profile:</strong> Standard RGB or sRGB. Our RIP software automatically translates RGB gamut colors into vibrant DTF inks.</li>
                <li><strong>Vector Assets:</strong> AI, PDF, or SVG files are also supported and ensure razor-sharp edges on typography.</li>
              </ul>
            </div>
          </section>

          {/* Call to action & Internal Links */}
          <section className="rounded-2xl border border-primary/30 bg-gradient-to-r from-card to-card/60 p-8 sm:p-12 text-center">
            <Sparkles className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
              Print Your Own Design or Shop the Catalog
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
              Bring your custom artwork to life or explore 220+ ready-to-ship streetwear graphics delivered across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/custom-print"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Launch Custom Studio <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/collections/$slug"
                params={{ slug: "drop-shoulder" }}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:border-primary transition-colors"
              >
                Drop Shoulder Tees
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
