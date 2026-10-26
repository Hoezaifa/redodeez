import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Pencil,
  Shirt,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Layers,
  Flame,
  CheckCircle2,
  PackageCheck,
  Trophy,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappLink } from "@/data/site";

const CUSTOM_IMAGE = "/assets/custom_print_mockup.webp";

export const PRINT_SERVICES = [
  {
    id: "dtf",
    title: "Custom DTF Printing",
    tagline: "Direct-to-Film on Heavyweight Cotton",
    minimum: "Starts from 1 piece",
    isSinglePieceEligible: true,
    directOrderable: true,
    description:
      "Vibrant full-color prints with ultra-fine detail, high wash durability, and zero color cracking. Available on 180 GSM regular tees, 240 GSM oversized drop shoulders, and vintage acid wash.",
    idealFor: "Custom t-shirts, anime art, streetwear graphics, single 1-of-1s & bulk orders.",
    cta: "Order Online",
    to: "/custom-print",
  },
  {
    id: "jerseys",
    title: "Custom Sports Jerseys",
    tagline: "Sublimated All-Over Athletic Wear",
    minimum: "Starts from 1 piece",
    isSinglePieceEligible: true,
    directOrderable: false,
    description:
      "Fully customized sublimated sports jerseys featuring all-over printing, custom player names, squad numbers, sponsor branding, and team crests on breathable moisture-wicking mesh.",
    idealFor: "Football, cricket, eSports, basketball, custom fan jerseys & tournament teams.",
    cta: "Inquire on WhatsApp",
    href: whatsappLink(
      "Hi Deez Prints! I'd like to order / get an inquiry for fully customized sports jerseys (player names, numbers, logos)."
    ),
  },
  {
    id: "screen-printing",
    title: "Screen Printing",
    tagline: "Volume Production for Brands & Events",
    minimum: "Bulk orders",
    isSinglePieceEligible: false,
    directOrderable: false,
    description:
      "The gold standard for high-volume apparel printing. Crisp, premium-grade prints engineered for unmatched longevity, bold finish, and cost-effective bulk production.",
    idealFor: "Brand merchandise, university batches, corporate uniforms, event staff & club gear.",
    cta: "Get Bulk Quote",
    href: whatsappLink(
      "Hi Deez Prints! I'd like to get a quote for a bulk screen printing order."
    ),
  },
  {
    id: "sublimation",
    title: "Sublimation Printing",
    tagline: "Deep Dye-Infused Fabric Printing",
    minimum: "From 1 piece to volume runs",
    isSinglePieceEligible: true,
    directOrderable: false,
    description:
      "Ink is gas-fused directly into fabric fibers for seamless, zero-hand-feel graphics that never crack, peel, or fade. Engineered for athletic polyester, satin wall tapestries, and flags.",
    idealFor: "All-over sports kits, high-definition wall tapestries, flags & performance apparel.",
    cta: "Inquire via WhatsApp",
    href: whatsappLink(
      "Hi Deez Prints! I have an inquiry about sublimation printing / custom tapestries."
    ),
  },
];

export function CustomPrintSection() {
  return (
    <section className="edge border-t border-border py-14 md:py-24 bg-background overflow-hidden">
      {/* Eyebrow & Main Section Headline */}
      <div className="max-w-3xl mb-12">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Layers className="w-4 h-4 text-primary" />
            <span>CUSTOM PRINTING &amp; PRODUCTION SERVICES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95]">
            YOUR DESIGN.
            <br />
            <span className="text-primary">NO LIMITS.</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed mt-4 max-w-2xl">
            Beyond our signature streetwear drops, Deez Prints is a full-service custom printing provider. 
            Whether you need a single 1-of-1 custom piece or high-volume merchandise for your brand, team, or university — we produce studio-grade prints tailored to your exact specifications.
          </p>
        </Reveal>
      </div>

      {/* 1-Piece Highlight Banner */}
      <Reveal delay={0.08}>
        <div className="mb-10 p-4 sm:p-5 border border-primary/40 bg-primary/10 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-primary text-black font-black text-xs shrink-0 flex items-center justify-center">
              1 PC
            </div>
            <div>
              <p className="font-display text-sm sm:text-base font-extrabold uppercase tracking-wide text-foreground">
                Eligible custom orders start from just 1 piece
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-0.5">
                No forced bulk minimums for personal creativity — including custom DTF t-shirts and fully customized sublimated jerseys.
              </p>
            </div>
          </div>
          <Link
            to="/custom-print"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-black font-mono font-bold text-xs uppercase px-4 py-2.5 hover:bg-white transition-colors"
          >
            Start 1-Piece Order <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Reveal>

      {/* Services Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
        {PRINT_SERVICES.map((srv, idx) => (
          <Reveal key={srv.id} delay={0.05 * (idx + 1)}>
            <div className="h-full flex flex-col justify-between border border-border/70 bg-surface/80 p-5 md:p-6 rounded-none hover:border-primary/50 transition-colors">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-white/10 bg-white/5 text-zinc-300">
                    {srv.minimum}
                  </span>
                  {srv.id === "jerseys" && <Trophy className="w-4 h-4 text-primary shrink-0" />}
                  {srv.id === "dtf" && <Shirt className="w-4 h-4 text-primary shrink-0" />}
                  {srv.id === "screen-printing" && <Flame className="w-4 h-4 text-primary shrink-0" />}
                  {srv.id === "sublimation" && <Sparkles className="w-4 h-4 text-primary shrink-0" />}
                </div>

                <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">
                  {srv.title}
                </h3>
                <p className="text-xs font-mono text-primary mt-0.5 mb-3">
                  {srv.tagline}
                </p>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  {srv.description}
                </p>

                <div className="border-t border-border/50 pt-3 mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                    Ideal For:
                  </p>
                  <p className="text-xs text-zinc-300 font-sans leading-snug">
                    {srv.idealFor}
                  </p>
                </div>
              </div>

              <div>
                {srv.directOrderable && srv.to ? (
                  <Link
                    to={srv.to}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-primary text-black font-mono font-bold text-xs uppercase hover:bg-white transition-colors"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <a
                    href={srv.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 border border-white/20 bg-white/5 text-foreground hover:border-emerald-500 hover:text-emerald-400 transition-colors font-mono font-bold text-xs uppercase"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{srv.cta}</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Hero Showcase Split: Custom Builder Callout & Workshop Preview */}
      <div className="border border-border/80 bg-surface/50 p-6 md:p-10 mb-12">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-5">
            <Reveal>
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-primary">
                ORDER CUSTOM T-SHIRTS ONLINE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground leading-tight mt-1">
                UPLOAD YOUR ARTWORK.
                <br />
                WE PRESS ON STREETWEAR BLANKS.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                Choose your fit: Regular 180 GSM, Oversized Drop Shoulder 240 GSM, Hand-Dyed Acid Wash, or Satin Wall Tapestries. Single-piece custom t-shirt orders start right on our web configurator with front, back, or double-sided placements.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>From 1 Piece</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>High-Res DTF</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Nationwide Courier</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <Link
                  to="/custom-print"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary text-black font-extrabold uppercase tracking-wider text-xs hover:bg-white transition-colors"
                >
                  START CUSTOM PRINT <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/our-work"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:border-primary transition-colors"
                >
                  VIEW WORK GALLERY <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-square overflow-hidden border border-border/80 bg-zinc-950 p-2 shadow-2xl">
                <img
                  src={CUSTOM_IMAGE}
                  alt="Custom Print Workshop Mockup"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-sm border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs font-bold uppercase text-white">Workshop Finished</p>
                    <p className="font-mono text-[10px] text-zinc-400">Karachi Studio Production</p>
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase font-bold">1 Pc or Bulk</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 4-Column Feature Strip */}
      <Reveal delay={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
          <div className="p-4 border border-border/40 bg-surface/40">
            <Shirt className="w-5 h-5 text-primary mb-2" />
            <p className="font-display text-xs font-extrabold uppercase text-white">
              Single-Piece &amp; Bulk
            </p>
            <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-snug">
              Eligible custom orders start from 1 piece (DTF &amp; jerseys), with scalable volume rates for bulk runs.
            </p>
          </div>

          <div className="p-4 border border-border/40 bg-surface/40">
            <Layers className="w-5 h-5 text-primary mb-2" />
            <p className="font-display text-xs font-extrabold uppercase text-white">
              Screen &amp; Sublimation
            </p>
            <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-snug">
              Dedicated Screen Printing for bulk merchandise, plus all-over Sublimation for sports gear.
            </p>
          </div>

          <div className="p-4 border border-border/40 bg-surface/40">
            <PackageCheck className="w-5 h-5 text-primary mb-2" />
            <p className="font-display text-xs font-extrabold uppercase text-white">
              Studio Quality Control
            </p>
            <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-snug">
              Every garment is individually inspected before packing to guarantee clean edges and sharp color.
            </p>
          </div>

          <div className="p-4 border border-border/40 bg-surface/40">
            <MessageSquare className="w-5 h-5 text-emerald-400 mb-2" />
            <p className="font-display text-xs font-extrabold uppercase text-white">
              Direct WhatsApp Support
            </p>
            <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-snug">
              Quick consultation for artwork placement, custom jersey rosters, and bulk merchandise estimates.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
