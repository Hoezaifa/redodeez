import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Pencil,
  Upload,
  Shirt,
  Package,
  ArrowRight,
  MessageSquare,
  Palette,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/data/site";

const CUSTOM_IMAGE = "/assets/custom_print_mockup.webp";

export function CustomPrintSection() {
  return (
    <section className="edge border-t border-border py-14 md:py-24 bg-background overflow-hidden">
      {/* ================= MOBILE VERSION ================= */}
      <div className="flex flex-col text-center md:hidden max-w-md mx-auto">
        <Reveal>
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <span>CUSTOM PRINTING</span>
            <Pencil className="w-3.5 h-3.5 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95]">
            YOUR DESIGN.
            <br />
            <span className="text-primary">
              NO LIMITS.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mt-3 max-w-xs mx-auto">
            From concept to fabric.
            <br />
            We print it your way.
          </p>
        </Reveal>

        {/* Central Mockup Image with Orange Bounding Box */}
        <Reveal delay={0.1}>
          <div className="relative my-6 w-full aspect-square max-w-[340px] mx-auto overflow-hidden rounded-none border border-white/10 bg-zinc-950 p-2 shadow-2xl">
            <div className="relative w-full h-full overflow-hidden rounded-none bg-gradient-to-b from-zinc-900 to-black">
              <img
                src={CUSTOM_IMAGE}
                alt="Custom Print Mockup with Bounding Box"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* 3 Step Cards Grid */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-surface/80 border border-white/10 p-3 rounded-none flex flex-col items-center justify-between text-center min-h-[110px]">
              <div className="p-2 rounded-none bg-primary/10 text-primary mb-1">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-[11px] font-extrabold uppercase text-white tracking-tight">
                  1. UPLOAD
                </p>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight mt-0.5">
                  Send your design.
                </p>
              </div>
            </div>

            <div className="bg-surface/80 border border-white/10 p-3 rounded-none flex flex-col items-center justify-between text-center min-h-[110px]">
              <div className="p-2 rounded-none bg-primary/10 text-primary mb-1">
                <Shirt className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-[11px] font-extrabold uppercase text-white tracking-tight">
                  2. WE PRINT
                </p>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight mt-0.5">
                  Premium DTF printing.
                </p>
              </div>
            </div>

            <div className="bg-surface/80 border border-white/10 p-3 rounded-none flex flex-col items-center justify-between text-center min-h-[110px]">
              <div className="p-2 rounded-none bg-primary/10 text-primary mb-1">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-[11px] font-extrabold uppercase text-white tracking-tight">
                  3. YOU WEAR
                </p>
                <p className="text-[10px] text-zinc-400 font-sans leading-tight mt-0.5">
                  Delivered to your door.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Primary Action Button Only */}
        <Reveal delay={0.2}>
          <div>
            <Link
              to="/custom-print"
              className="w-full py-4 rounded-none bg-primary text-primary-foreground font-extrabold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg active:scale-[0.98]"
            >
              START CUSTOM PRINT <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ================= DESKTOP VERSION ================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading, Steps, CTAs */}
          <div className="col-span-12 md:col-span-6 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-widest">
                <span>CUSTOM PRINTING</span>
                <Pencil className="w-3.5 h-3.5 text-primary" />
              </div>

              <h2 className="font-display text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95] mt-3">
                YOUR DESIGN.
                <br />
                <span className="text-primary">
                  NO LIMITS.
                </span>
              </h2>

              <p className="text-sm text-zinc-400 font-sans leading-relaxed mt-4">
                From concept to fabric.
                <br />
                We print it <span className="text-primary font-bold">your way</span>.
              </p>
            </Reveal>

            {/* 3 Steps Row */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-none bg-primary/10 text-primary shrink-0">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                      1. UPLOAD
                    </p>
                    <p className="text-[11px] text-zinc-400 font-sans leading-snug mt-0.5">
                      Send your design.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-none bg-primary/10 text-primary shrink-0">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                      2. WE PRINT
                    </p>
                    <p className="text-[11px] text-zinc-400 font-sans leading-snug mt-0.5">
                      Premium DTF printing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-none bg-primary/10 text-primary shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                      3. YOU WEAR
                    </p>
                    <p className="text-[11px] text-zinc-400 font-sans leading-snug mt-0.5">
                      Delivered to your door.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Desktop Action Buttons Block */}
            <Reveal delay={0.15}>
              <div className="space-y-3 max-w-md pt-2">
                <Link
                  to="/custom-print"
                  className="w-full py-4 rounded-none bg-primary text-primary-foreground font-extrabold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-xl active:scale-[0.99]"
                >
                  START CUSTOM PRINT <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/collections/$slug"
                  params={{ slug: "graphic" }}
                  className="w-full py-3.5 rounded-none bg-zinc-950 border border-white/10 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:border-primary/50 transition-colors active:scale-[0.99]"
                >
                  SEE EXAMPLES <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </Link>

                <a
                  href={whatsappLink("Hi! I need help with custom printing.")}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-950 border border-white/10 p-3.5 rounded-none flex items-center justify-between hover:border-primary/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-none bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                        NEED HELP?
                      </p>
                      <p className="text-[11px] text-zinc-400 font-sans">
                        Chat with us on WhatsApp
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary text-black p-2 rounded-none flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: High-Res Mockup Display */}
          <div className="col-span-12 md:col-span-6">
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-none border border-white/10 bg-zinc-950 p-3 shadow-2xl">
                <div className="relative w-full h-full overflow-hidden rounded-none bg-zinc-900">
                  <motion.img
                    src={CUSTOM_IMAGE}
                    alt="Custom Print T-Shirt Mockup"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom 4-Feature Trust Strip */}
        <Reveal delay={0.25}>
          <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-none bg-primary/10 text-primary shrink-0 border border-primary/20">
                <Shirt className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                  PREMIUM QUALITY
                </p>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                  DTF prints on 240GSM heavyweight fabric.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-none bg-primary/10 text-primary shrink-0 border border-primary/20">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                  ANY DESIGN
                </p>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                  Your ideas. No restrictions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-none bg-primary/10 text-primary shrink-0 border border-primary/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                  FAST PROCESS
                </p>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                  24–48h production time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-none bg-primary/10 text-primary shrink-0 border border-primary/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-xs font-extrabold uppercase text-white tracking-tight">
                  MADE TO LAST
                </p>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                  Vibrant prints that stay fresh wash after wash.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
