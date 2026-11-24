import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
// Temporary Doctor Doom hero assets (original: "@/assets/deez-prints-streetwear-hero.webp")
import heroDesktop from "@/assets/temporary-desktop-hero.jpg";
import heroMobile from "@/assets/temporary-mobile-hero.jpg";
import { DoomsdayHeroWidget } from "@/components/hero/DoomsdayCountdown";

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
    hidden: { y: "0%", opacity: 1 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
    }),
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* ── Hero canvas (single responsive tree) ── */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden flex flex-col lg:block bg-black"
        style={{ minHeight: "calc(100vh - 62px - 40px)" }}
      >
        {/* Base bg */}
        <div className="absolute inset-0 bg-black" />

        {/* Film-grain overlay (desktop only so mobile black level stays pure) */}
        <div className="pointer-events-none absolute inset-0 grain opacity-30 hidden lg:block" />

        {/* Photography Frame: stacked above module on mobile/tablet, full-bleed on desktop */}
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
          style={{ y: imgY }}
          className="relative w-full aspect-[4/5] max-h-[560px] sm:max-h-[600px] md:aspect-[16/10] md:max-h-[540px] overflow-hidden bg-black pt-[92px] md:pt-[100px] lg:pt-0 lg:max-h-none lg:aspect-auto lg:absolute lg:inset-0 lg:pointer-events-none"
        >
          <picture className="block h-full w-full">
            <source media="(min-width: 768px)" srcSet={heroDesktop} />
            <img
              src={heroMobile}
              alt="Model wearing an oversized Deez Prints Doctor Doom graphic tee"
              width={1672}
              height={941}
              className="h-full w-full object-cover object-[50%_42%] md:object-[64%_22%] lg:object-[54%_12%] lg:scale-[0.92] lg:-translate-x-[8.5%] xl:scale-100 xl:-translate-x-[9.5%] 2xl:-translate-x-[8%] lg:translate-y-7"
              fetchPriority="high"
            />
          </picture>

          {/* Mobile/tablet bottom fade: subtle edge blend so the full tee graphic stays visible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Desktop directional dark gradient: blends left edge of photo into dark background */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-y-0 left-0 lg:w-[46%] xl:w-[48%] z-[1]"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #000000 32%, rgba(0, 0, 0, 0.8) 58%, transparent 82%)",
          }}
        />

        {/* Desktop right-side dark gradient behind Doomsday countdown widget */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-y-0 right-0 lg:w-[34%] xl:w-[32%] z-[1]"
          style={{
            background:
              "linear-gradient(to left, #000000 0%, #000000 38%, rgba(0, 0, 0, 0.85) 68%, transparent 100%)",
          }}
        />

        {/* Desktop subtle bottom fade to seamlessly meet feature strip */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-x-0 bottom-0 h-28 z-[1]"
          style={{
            background: "linear-gradient(to top, #000000 0%, transparent 100%)",
          }}
        />

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
        <div className="relative z-10 px-5 pb-10 pt-2 md:pt-4 lg:pt-24 lg:pb-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8 lg:mx-auto lg:h-full lg:max-w-[1560px] lg:pl-10 lg:pr-12 xl:pl-12 xl:pr-14">
          {/* Headline + Main CTAs (hidden on mobile/tablet during temporary Doom drop, left on desktop) */}
          <div className="hidden lg:block order-2 lg:order-1 max-w-[340px] xl:max-w-[490px] 2xl:max-w-[520px] lg:-translate-x-[10px] xl:-translate-x-[18px]">
            {/* Main headline - Exactly ONE h1 */}
            <h1
              className="font-display uppercase leading-[0.92] md:leading-[0.855] tracking-tight md:tracking-[-0.01em] pr-0 md:pr-4 xl:pr-6 text-[36px] xs:text-[42px] lg:text-[clamp(56px,5.8vw,78px)] xl:text-[clamp(76px,7.4vw,112px)] 2xl:text-[clamp(90px,8.2vw,126px)]"
            >
              {/* Mobile 2-line layout: WEAR WHAT / YOU CREATE */}
              <span className="block md:hidden font-black text-white">Wear What</span>
              <span className="block md:hidden font-black text-white">
                You Create
                <span className="inline-block h-3 w-3 bg-[color:var(--accent)] ml-1.5 align-baseline" />
              </span>

              {/* Desktop 4-line layout */}
              {["Wear", "What", "You"].map((word, i) => (
                <span key={word} className="hidden md:block overflow-hidden">
                  <motion.span
                    custom={i}
                    initial={false}
                    animate="show"
                    variants={lineVariants}
                    className="inline-block font-black text-white"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}

              {/* Desktop "CREATE." */}
              <span className="hidden md:block overflow-visible py-1">
                <motion.span
                  custom={3}
                  initial={false}
                  animate="show"
                  variants={lineVariants}
                  className="inline-block font-black text-outline pr-6"
                >
                  Create.
                </motion.span>
              </span>
            </h1>

            {/* Horizontal Divider on mobile */}
            <div className="my-4 h-px w-full bg-white/15 md:hidden" />

            {/* Sub-bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7, ease }}
              className="space-y-1.5 md:space-y-2 md:mt-8"
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
              className="mt-5 md:mt-8 xl:mt-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 xl:gap-4"
            >
              <Link
                to="/collections"
                className="group relative flex sm:inline-flex h-[44px] xl:h-[48px] items-center justify-between sm:justify-center gap-2.5 xl:gap-4 bg-[color:var(--accent)] px-4 xl:px-7 text-[11px] xl:text-xs font-black uppercase tracking-[0.15em] xl:tracking-[0.2em] text-black transition-all duration-300 hover:bg-white hover:scale-105 active:scale-[0.97] rounded shadow-lg"
              >
                <span>Shop All</span>
                <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[3]" />
              </Link>

              <Link
                to="/custom-print"
                className="group flex sm:inline-flex h-[44px] xl:h-[48px] items-center justify-between sm:justify-center gap-2 xl:gap-3 border border-white/30 bg-white/10 px-4 xl:px-6 text-[11px] xl:text-xs font-black uppercase tracking-[0.15em] xl:tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-[0.97] rounded"
              >
                <span className="truncate">Explore Custom</span>
                <ArrowRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 text-white shrink-0 stroke-[3]" />
              </Link>
            </motion.div>
          </div>

          {/* Avengers: Doomsday Countdown & Collection CTA (below image on mobile/tablet, dedicated right zone on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end lg:ml-auto lg:pr-2 xl:pr-4 shrink-0"
          >
            <DoomsdayHeroWidget />
          </motion.div>
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
      <div className="relative z-10 border-t border-white/[0.06] bg-[#080808] overflow-hidden">
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
