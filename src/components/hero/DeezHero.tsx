import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Search, User, ShoppingBag, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroModel from "@/assets/hero-model.jpg";
import { useCart } from "@/lib/cart";
import { LOGO_URL } from "@/data/site";
import { SearchModal } from "@/components/site/SearchModal";

/* ─── Constants ─────────────────────────────────────────────── */

const navLinks = [
  {
    name: "T-SHIRTS",
    href: "/collections/t-shirts",
    subcategories: [
      { name: "Regular Fit", href: "/collections/regular" },
      { name: "Drop Shoulder", href: "/collections/drop-shoulder" },
      { name: "Acid Wash", href: "/collections/acid-wash" },
    ],
  },
  { name: "HOODIES", href: "/collections/hoodies" },
  { name: "JERSEYS", href: "/collections/jerseys" },
  {
    name: "ACCESSORIES",
    href: "/collections/accessories",
    subcategories: [
      { name: "Mugs", href: "/collections/mugs" },
      { name: "Flags", href: "/collections/flags" },
      { name: "Tapestries", href: "/collections/tapestries" },
      { name: "Wristbands", href: "/collections/wristbands" },
      { name: "Badges", href: "/collections/badges" },
      { name: "Wallet Cards", href: "/collections/wallet-cards" },
      { name: "Keychains", href: "/collections/keychains" },
      { name: "Magnets", href: "/collections/magnets" },
      { name: "Notebooks", href: "/collections/notebooks" },
      { name: "Corporate Gift Boxes", href: "/collections/gift-boxes" },
    ],
  },
  { name: "CUSTOM PRINT", href: "/custom-print" },
  { name: "ABOUT", href: "/about" },
];

const features = [
  "Oversized Fits",
  "Premium Quality",
  "Bold Graphics",
  "Custom Made",
  "Fast Delivery",
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── Navbar ─────────────────────────────────────────────────── */

function Navbar({ scrolled, onOpenSearch }: { scrolled: boolean; onOpenSearch: () => void }) {
  const { count, setDrawerOpen } = useCart();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[color:var(--ink-0)]/95 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
          : "bg-[color:var(--ink-0)] border-b border-white/[0.05]"
      }`}
    >
      <div className="mx-auto grid h-[62px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:px-10">
        {/* Logo image */}
        <Link
          to="/"
          aria-label="Deez Prints — Home"
          className="flex items-center shrink-0 active:scale-95 transition-transform"
        >
          <img src={LOGO_URL} alt="Deez Prints" className="h-7 w-auto md:h-8" />
        </Link>

        {/* Center nav matching original deezprints.store */}
        <nav aria-label="Primary" className="hidden items-center justify-center gap-2 lg:flex">
          {navLinks.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className="relative z-10 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 transition-colors duration-300 hover:text-white whitespace-nowrap"
              >
                {item.name}
                {item.subcategories && (
                  <ChevronDown
                    className="h-3 w-3 text-white/50 transition-transform duration-300 group-hover:rotate-180 group-hover:text-white"
                    strokeWidth={2.5}
                  />
                )}
              </Link>

              {/* Hover Highlight Pill */}
              <span className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />

              {/* Dropdown matching original deezprints.store */}
              {item.subcategories && openDropdown === item.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 p-2">
                  {item.subcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block px-3.5 py-2.5 text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right — icon-only actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-none text-white/60 transition-colors duration-200 hover:text-white hover:bg-white/[0.06] active:scale-90"
          >
            <Search className="h-[17px] w-[17px]" strokeWidth={2} />
          </button>

          {/* Divider */}
          <span className="mx-0.5 h-4 w-px bg-white/[0.12]" aria-hidden />

          {/* Account */}
          <Link
            to="/account"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-none text-white/60 transition-colors duration-200 hover:text-white hover:bg-white/[0.06]"
          >
            <User className="h-[17px] w-[17px]" strokeWidth={2} />
          </Link>

          {/* Cart */}
          <button
            type="button"
            aria-label={`Cart — ${count} item${count !== 1 ? "s" : ""}`}
            onClick={() => setDrawerOpen(true)}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-none text-white/60 transition-colors duration-200 hover:text-white hover:bg-white/[0.06]"
          >
            <ShoppingBag className="h-[17px] w-[17px]" strokeWidth={2} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-[15px] w-[15px] place-items-center rounded-full bg-[color:var(--accent)] text-[8px] font-black leading-none text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─── Geometric Accent Lines (SVG overlay) ───────────────────── */

function AccentLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {/* Main diagonal slash — top-right quadrant */}
      <svg
        className="absolute right-0 top-0 h-full w-[55%] opacity-60"
        viewBox="0 0 600 700"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Bold diagonal slash */}
        <line
          x1="520"
          y1="-20"
          x2="320"
          y2="400"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Thinner parallel slash */}
        <line
          x1="560"
          y1="-20"
          x2="360"
          y2="380"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
        {/* Short accent tick upper-right */}
        <line
          x1="480"
          y1="30"
          x2="530"
          y2="80"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
        {/* Horizontal accent line */}
        <line
          x1="330"
          y1="305"
          x2="540"
          y2="305"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.25"
        />
      </svg>
    </div>
  );
}

/* ─── Main Hero Export ───────────────────────────────────────── */

export function DeezHero() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 55]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lineVariants = {
    hidden: { y: "108%", opacity: 0 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
    }),
  };

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div
        ref={ref}
        className="relative min-h-screen overflow-hidden bg-[color:var(--ink-0)] text-white"
      >
        <Navbar scrolled={scrolled} onOpenSearch={() => setSearchOpen(true)} />

        {/* ── Hero canvas ── */}
        {/* ── MOBILE HERO (< md) ── */}
        <div className="flex flex-col md:hidden bg-[color:var(--ink-0)] text-white">
          {/* Photography Frame */}
          <div className="relative w-full aspect-[4/5] max-h-[460px] overflow-hidden bg-[color:var(--ink-0)]">
            <img
              src={heroModel}
              alt="Model wearing an oversized Deez Prints graphic tee"
              width={800}
              height={1000}
              className="h-full w-full object-cover object-[50%_15%]"
              fetchPriority="high"
            />
            {/* Top vignette under navbar */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[color:var(--ink-0)] to-transparent opacity-80" />
            {/* Bottom smooth fade into dark text panel */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[color:var(--ink-0)]/70 to-[color:var(--ink-0)]" />
          </div>

          {/* Text & CTAs Content Block */}
          <div className="px-5 pb-12 pt-2 flex flex-col">
            <h1 className="font-display font-black uppercase text-white leading-[0.88] tracking-tight text-[44px] xs:text-[52px]">
              WEAR WHAT
              <br />
              YOU CREATE
              <span className="inline-block h-3.5 w-3.5 bg-[color:var(--accent)] ml-1.5 align-baseline" />
            </h1>

            {/* Horizontal Divider */}
            <div className="my-5 h-px w-full bg-white/15" />

            {/* Sub-bullets */}
            <ul className="space-y-2">
              {["STREETWEAR. CUSTOM PRINTS.", "NO LIMITS."].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <span className="shrink-0 text-[14px] leading-none text-[color:var(--accent)] font-black">
                    ✱
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-white/85">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs Row */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Link
                to="/collections"
                className="flex items-center justify-between bg-[color:var(--accent)] px-4 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-black transition-all active:scale-[0.97] rounded shadow-md"
              >
                <span>SHOP ALL</span>
                <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
              </Link>

              <Link
                to="/custom-print"
                className="flex items-center justify-between border border-white/30 bg-white/10 px-4 py-3.5 text-[11px] font-black uppercase tracking-[0.15em] text-white transition-all active:scale-[0.97] rounded"
              >
                <span className="truncate">EXPLORE CUSTOM</span>
                <ArrowRight className="h-3.5 w-3.5 text-white shrink-0 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── DESKTOP HERO (≥ md) ── */}
        <section
          aria-label="Hero"
          className="hidden md:block relative overflow-hidden"
          style={{ minHeight: "calc(100vh - 62px - 40px)" }}
        >
          {/* Base bg */}
          <div className="absolute inset-0 bg-[color:var(--ink-0)]" />

          {/* Film-grain overlay */}
          <div className="pointer-events-none absolute inset-0 grain opacity-60" />

          {/* Geometric accent lines */}
          <AccentLines />

          {/* ── Model image — full width background with seamless dark gradient ── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease }}
            style={{ y: imgY }}
            className="pointer-events-none absolute inset-0"
          >
            <img
              src={heroModel}
              alt="Model wearing an oversized Deez Prints graphic tee"
              width={1600}
              height={1200}
              className="h-full w-full object-cover object-[70%_15%] md:object-[68%_15%]"
              fetchPriority="high"
            />

            {/* Seamless dark gradient overlay (left to right) — removes all sharp box boundaries */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, 
                  #0a0a0a 0%, 
                  #0a0a0a 28%, 
                  rgba(10, 10, 10, 0.95) 42%, 
                  rgba(10, 10, 10, 0.78) 58%, 
                  rgba(10, 10, 10, 0.48) 72%, 
                  rgba(10, 10, 10, 0.18) 88%, 
                  transparent 100%)`,
              }}
            />
            {/* Top and bottom subtle vignettes for header and footer blend */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, 
                  rgba(10, 10, 10, 0.5) 0%, 
                  transparent 18%, 
                  transparent 82%, 
                  rgba(10, 10, 10, 0.75) 100%)`,
              }}
            />
          </motion.div>

          {/* ── Vertical brand label (right side) ── */}
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

          {/* ── Content ── */}
          <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 py-16 md:px-10 md:py-20 lg:py-24">
            <div className="max-w-[560px] md:-translate-x-[20px]">
              {/* Main headline */}
              <h1
                className="font-display uppercase leading-[0.855] tracking-[-0.01em] pr-6"
                style={{ fontSize: "clamp(62px, 9.5vw, 128px)" }}
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

                {/* "CREATE." — outlined */}
                <span className="block overflow-visible py-1">
                  <motion.span
                    custom={3}
                    initial="hidden"
                    animate="show"
                    variants={lineVariants}
                    className="inline-block font-black text-outline pr-6"
                  >
                    Create.
                  </motion.span>
                </span>
              </h1>

              {/* Sub-bullets */}
              <motion.ul
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.7, ease }}
                className="mt-7 space-y-2 md:mt-8"
              >
                {["Streetwear. Custom Prints.", "No Limits."].map((line) => (
                  <li key={line} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="shrink-0 text-[14px] leading-none text-[color:var(--accent)] font-black"
                    >
                      ✱
                    </span>
                    <span className="text-[11.5px] font-black uppercase tracking-[0.18em] text-white/85">
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
                className="mt-8 flex flex-wrap items-center gap-4 md:mt-10"
              >
                {/* Primary — Solid Orange */}
                <Link
                  to="/collections"
                  className="group relative inline-flex h-[48px] items-center gap-4 bg-[color:var(--accent)] px-7 text-xs font-black uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 rounded shadow-lg"
                >
                  Shop All
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[3]" />
                </Link>

                {/* Secondary — Dark glass button */}
                <Link
                  to="/custom-print"
                  className="group inline-flex h-[48px] items-center gap-3 border border-white/30 bg-white/10 px-6 text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-black active:scale-95 rounded"
                >
                  Explore Custom
                  <ArrowRight className="h-4 w-4 stroke-[3]" />
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
    </>
  );
}

export default DeezHero;
