import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroDesktop from "@/assets/sample-test-hero.png";

/* ─── Constants ─────────────────────────────────────────────── */

const features = [
  "Oversized Fits",
  "Premium Quality",
  "Bold Graphics",
  "Custom Made",
  "Fast Delivery",
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Main Hero Export ───────────────────────────────────────── */

export function DeezHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  const lineVariants = {
    hidden: { y: "108%", opacity: 0 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
    }),
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[color:var(--ink-0)] text-white"
    >
      {/* ── Hero canvas (single responsive tree) ── */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden flex flex-col md:block"
        style={{ minHeight: "calc(100vh - 62px - 40px)" }}
      >
        {/* Base bg */}
        <div className="absolute inset-0 bg-[color:var(--ink-0)]" />

        {/* Film-grain overlay */}
        <div className="pointer-events-none absolute inset-0 grain opacity-60" />

        {/* Photography Frame: relative aspect-[4/5] on mobile, absolute full-bleed on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
          style={{ y: imgY }}
          className="relative w-full aspect-[4/5] max-h-[480px] overflow-hidden bg-[color:var(--ink-0)] pt-16 md:pt-0 md:max-h-none md:aspect-auto md:absolute md:inset-0 md:pointer-events-none"
        >
          <img
            src={heroDesktop}
            alt="Model wearing an oversized Deez Prints graphic tee"
            width={1600}
            height={1200}
            className="h-full w-full object-cover object-[75%_20%] md:object-[82%_20%] md:translate-x-0"
            fetchPriority="high"
          />
        </motion.div>

        {/* Vertical brand label (right side) */}
        <div
          aria-hidden
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
        >
          <span className="block h-8 w-px bg-[color:var(--accent)]/40" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[8px] font-black uppercase tracking-[0.38em] text-white/35 select-none">
            Deez Prints
          </span>
          <span className="block h-8 w-px bg-[color:var(--accent)]/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-5 pb-12 pt-4 flex flex-col md:mx-auto md:h-full md:max-w-[1440px] md:justify-center md:px-10 md:py-20 lg:py-24">
          <div className="max-w-[560px] md:-translate-x-[20px]">
            {/* Main headline - Exactly ONE h1 */}
            <h1
              className="font-display uppercase leading-[0.88] md:leading-[0.855] tracking-tight md:tracking-[-0.01em] pr-0 md:pr-6 text-[44px] xs:text-[52px] md:text-[clamp(62px,8.5vw,110px)] xl:text-[clamp(70px,9.5vw,128px)]"
            >
              {["Wear", "What", "You"].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    custom={i}
                    initial="hidden"
                    animate="show"
                    variants={lineVariants}
                    className="inline-block font-black text-white"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}

              {/* "CREATE." */}
              <span className="block overflow-visible py-0.5 md:py-1">
                <motion.span
                  custom={3}
                  initial="hidden"
                  animate="show"
                  variants={lineVariants}
                  className="inline-block font-black text-white md:text-outline pr-0 md:pr-6"
                >
                  Create
                  <span className="inline-block h-3.5 w-3.5 md:hidden bg-[color:var(--accent)] ml-1.5 align-baseline" />
                  <span className="hidden md:inline">.</span>
                </motion.span>
              </span>
            </h1>

            {/* Horizontal Divider on mobile */}
            <div className="my-5 h-px w-full bg-white/15 md:hidden" />

            {/* Sub-bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease }}
              className="space-y-2 md:mt-8"
            >
              {["Streetwear. Custom Prints.", "No Limits."].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="shrink-0 text-[14px] leading-none text-[color:var(--accent)] font-black"
                  >
                    ✱
                  </span>
                  <span className="text-[11px] md:text-[11.5px] font-black uppercase tracking-[0.18em] text-white/85">
                    {line}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.88, ease }}
              className="mt-7 md:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 md:gap-4"
            >
              <Link
                to="/collections"
                className="group relative flex sm:inline-flex h-[44px] sm:h-[48px] items-center justify-between sm:justify-center gap-3 sm:gap-4 bg-[color:var(--accent)] px-4 sm:px-7 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black transition-all duration-300 hover:bg-white hover:scale-105 active:scale-[0.97] rounded shadow-lg"
              >
                <span>Shop All</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[3]" />
              </Link>

              <Link
                to="/custom-print"
                className="group flex sm:inline-flex h-[44px] sm:h-[48px] items-center justify-between sm:justify-center gap-2 sm:gap-3 border border-white/30 bg-white/10 px-4 sm:px-6 text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.97] rounded"
              >
                <span className="truncate">Explore Custom</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white shrink-0 stroke-[3]" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div
          aria-hidden
          className="absolute bottom-6 right-10 z-20 hidden flex-col items-center gap-2.5 lg:flex"
        >
          <span className="relative block h-14 w-px overflow-hidden bg-white/[0.12]">
            <motion.span
              className="absolute left-0 top-0 h-5 w-px bg-[color:var(--accent)]"
              animate={{ y: ["-100%", "170%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="[writing-mode:vertical-rl] text-[8px] font-black uppercase tracking-[0.45em] text-white/30">
            Scroll
          </span>
        </div>
      </section>

      {/* ── Bottom feature strip ── */}
      <div className="relative z-10 border-t border-white/[0.06] bg-[color:var(--ink-0)] overflow-hidden">
        {/* Desktop static full width */}
        <div className="hidden md:flex mx-auto h-10 max-w-[1440px] items-center justify-between px-10">
          {features.map((f, i) => (
            <div key={f} className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">
                {f}
              </span>
              {i < features.length - 1 && (
                <span
                  className="h-[5px] w-[5px] rounded-full bg-[color:var(--accent)] opacity-80"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile infinite marquee ticker */}
        <div className="flex md:hidden h-10 items-center overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee shrink-0 items-center gap-6 pr-6">
            {[...features, ...features].map((f, i) => (
              <div key={`${f}-${i}`} className="flex items-center gap-4 shrink-0">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/80">
                  {f}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeezHero;
