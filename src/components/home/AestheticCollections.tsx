import { Link } from "@tanstack/react-router";
import { ArrowRight, Upload, Printer, Shirt, Globe } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LOGO_URL } from "@/data/site";

interface AestheticCard {
  id: string;
  title: string;
  count: string;
  description: string;
  image: string;
  link: string;
  params?: Record<string, string>;
  isAvailable?: boolean;
}

const aestheticCards: AestheticCard[] = [
  {
    id: "anime-archive",
    title: "ANIME ARCHIVE",
    count: "AUTHENTIC DROPS",
    description: "Iconic anime graphics inspired by classics and new-gen legends.",
    image: "/assets/collections/anime_archive_v3.webp",
    link: "/collections/$slug",
    params: { slug: "anime-archive" },
    isAvailable: true,
  },
  {
    id: "comic-universe",
    title: "COMIC UNIVERSE",
    count: "COMING SOON",
    description: "Marvel, DC, Comics, Superheroes.",
    image: "/assets/collections/comic_universe.webp",
    link: "/collections/$slug",
    params: { slug: "comic-universe" },
    isAvailable: false,
  },
  {
    id: "minimal-drops",
    title: "MINIMAL DROPS",
    count: "COMING SOON",
    description: "Small chest prints, clean graphics, typography, symbols, understated everyday wear.",
    image: "/assets/collections/minimal_drops.webp",
    link: "/collections/$slug",
    params: { slug: "minimal-drops" },
    isAvailable: false,
  },
  {
    id: "cinema-collection",
    title: "CINEMA COLLECTION",
    count: "COMING SOON",
    description: "Iconic films, unforgettable characters, and legendary moments brought to life.",
    image: "/assets/collections/cinema_collection.webp",
    link: "/collections/$slug",
    params: { slug: "cinema-collection" },
    isAvailable: false,
  },
];

const MOCKUP_IMG = "/assets/custom_banner.jpg";

export function AestheticCollections() {
  return (
    <section className="edge border-t border-border py-12 md:py-24 bg-background">
      {/* Mobile Header */}
      <div className="flex md:hidden items-end justify-between mb-6">
        <div>
          <p className="label-mono text-primary text-xs font-bold uppercase tracking-widest">
            EXPLORE
          </p>
          <h2 className="font-display text-3xl font-extrabold uppercase text-foreground tracking-tight leading-none mt-1">
            COLLECTIONS
          </h2>
        </div>
        <Link
          to="/collections"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline pb-0.5"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex flex-row items-end justify-between gap-6 mb-12">
        <Reveal>
          <p className="label-mono text-primary text-xs tracking-widest uppercase font-bold">
            BROWSE BY AESTHETIC
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95] mt-2">
            EXPLORE
            <br />
            COLLECTIONS
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm text-muted-foreground max-w-xs font-sans leading-relaxed text-right">
            Four design universes + custom printing. Pick a world — or create your own.
          </p>
        </Reveal>
      </div>

      {/* ═══════════ MOBILE ═══════════ */}
      <div className="flex flex-col gap-5 md:hidden">
        {/* 4 collection cards */}
        {aestheticCards.map((card, index) => {
          const parts = card.title.split(" ");
          const word1 = parts[0];
          const word2 = parts.slice(1).join(" ");
          const isSoon = card.isAvailable === false;

          return (
            <Reveal key={card.id} delay={index * 0.04}>
              <Link
                to={card.link}
                params={card.params}
                className="group relative flex min-h-[220px] w-full flex-col justify-between overflow-hidden border border-zinc-800/80 bg-black p-6 transition-all duration-300 active:scale-[0.99] rounded-none"
              >
                {/* Background Image Right-Aligned with Dark Left-to-Right Fade */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover object-right opacity-95 img-zoom group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500",
                      isSoon && "grayscale-[30%] opacity-80"
                    )}
                  />
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none" 
                    style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 25%, transparent 45%)' }} 
                  />
                </div>

                {/* Card Left Text Overlay */}
                <div className="relative z-20 space-y-3 max-w-[70%] text-left pt-1 pl-1 pointer-events-none">
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.88] drop-shadow-md">
                    <span className="block text-white">{word1}</span>
                    {word2 && <span className="block text-primary">{word2}</span>}
                  </h3>
                  <div className={cn(
                    "inline-block px-3 py-1 label-mono text-[11px] font-extrabold uppercase tracking-widest rounded-none backdrop-blur-sm border",
                    isSoon
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                      : "bg-zinc-900/90 border-zinc-700/60 text-white"
                  )}>
                    {card.count}
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed pt-0.5 max-w-[240px]">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Button */}
                <div className="relative z-20 pt-4 pl-1 pb-1 pointer-events-none">
                  {isSoon ? (
                    <span className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 px-4 py-2 label-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider backdrop-blur-md">
                      COMING SOON
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 border border-zinc-700/70 bg-zinc-900/90 px-4 py-2 label-mono text-[11px] font-bold text-white uppercase tracking-wider backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                      EXPLORE <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </Link>
            </Reveal>
          );
        })}

        {/* ── 5th Card: Custom Print Banner (Mobile) ── */}
        <Reveal delay={0.2}>
          <Link
            to="/custom-print"
            className="group relative flex min-h-[280px] w-full flex-col justify-between overflow-hidden border border-zinc-800/80 bg-[#0a0a0a] p-6 transition-all duration-300 active:scale-[0.99] rounded-none"
          >
            {/* Background banner image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={MOCKUP_IMG}
                alt="Custom Print"
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-60 img-zoom group-hover:scale-110 group-hover:-rotate-2"
              />
              {/* Dark overlay — lighter to let the banner show */}
              <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0.3) 100%)' }}
              />
            </div>

            {/* Print area corner brackets */}
            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-primary/50 z-20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-primary/50 z-20" />
            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-primary/50 z-20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-primary/50 z-20" />

            {/* Content */}
            <div className="relative z-20 space-y-3 text-left pt-1 pl-1">
              <div className="flex items-center gap-2 mb-1">
                <img src={LOGO_URL} alt="Deez Prints" className="h-4 w-auto opacity-60" />
                <span className="flex items-center gap-1 text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em]">
                  <Globe className="w-2.5 h-2.5" />
                  Printed in Pakistan
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.88] drop-shadow-md">
                <span className="block text-white">YOUR DESIGN.</span>
                <span className="block text-primary">NO LIMITS.</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-relaxed max-w-[260px]">
                From concept to fabric. We print it <span className="text-primary font-semibold italic">your way</span>.
              </p>

              {/* Mini steps row */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5">
                  <Upload className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">Upload</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Printer className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">We Print</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shirt className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">You Wear</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="relative z-20 pt-4 pl-1 pb-1">
              <span className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 label-mono text-[11px] font-black text-black uppercase tracking-wider transition-all duration-300 group-hover:bg-white group-hover:text-black">
                START CUSTOMIZING <ArrowRight className="h-3.5 w-3.5 stroke-[3]" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* ═══════════ DESKTOP ═══════════ */}
      <div className="hidden md:block">
        {/* 2x2 Grid for 4 collection cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {aestheticCards.map((card, index) => {
            const parts = card.title.split(" ");
            const word1 = parts[0];
            const word2 = parts.slice(1).join(" ");
            const isSoon = card.isAvailable === false;

            return (
              <Reveal key={card.id} delay={index * 0.08}>
                <Link
                  to={card.link}
                  params={card.params}
                  className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-between overflow-hidden rounded-none border border-zinc-800/80 bg-black p-8 lg:p-10 transition-all duration-500 hover:border-primary/50"
                >
                  {/* Background Image with Dark Left-to-Right Fade */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className={cn(
                        "h-full w-full object-cover opacity-95 img-zoom group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500",
                        isSoon && "grayscale-[30%] opacity-80"
                      )}
                    />
                    <div 
                      className="absolute inset-0 z-10 pointer-events-none" 
                      style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 25%, transparent 45%)' }} 
                    />
                  </div>

                  {/* Card Content Top */}
                  <div className="relative z-20 space-y-4 text-left max-w-sm pointer-events-none">
                    <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[0.88] drop-shadow-md">
                      <span className="block text-white">{word1}</span>
                      {word2 && <span className="block text-primary">{word2}</span>}
                    </h3>
                    <div className={cn(
                      "inline-block rounded-none px-3.5 py-1.5 label-mono text-xs font-bold border backdrop-blur-md tracking-widest uppercase",
                      isSoon
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
                        : "bg-zinc-900/90 border-zinc-700/60 text-white"
                    )}>
                      {card.count}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-[260px] leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Action Bottom */}
                  <div className="relative z-20 pt-6 pointer-events-none">
                    {isSoon ? (
                      <span className="inline-flex items-center gap-2.5 rounded-none border border-amber-500/40 bg-amber-500/10 px-6 py-3 label-mono text-xs font-bold text-amber-400 uppercase tracking-wider backdrop-blur-md">
                        COMING SOON
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 rounded-none border border-zinc-700/70 bg-zinc-900/90 px-6 py-3 label-mono text-xs font-bold text-white uppercase tracking-wider backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                        EXPLORE <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* ── 5th Card: Full-width Custom Print Banner (Desktop) ── */}
        <Reveal delay={0.35}>
          <Link
            to="/custom-print"
            className="group relative flex min-h-[320px] lg:min-h-[360px] w-full overflow-hidden rounded-none border border-zinc-800/80 bg-[#0a0a0a] mt-6 transition-all duration-500 hover:border-primary/50"
          >
            {/* Background banner image — full width */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={MOCKUP_IMG}
                alt="Custom Print Banner"
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-70 img-zoom group-hover:scale-110 group-hover:-rotate-2"
              />
              {/* Dark gradient — strong on left for text readability, fading to let image show on right */}
              <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to right, rgba(10, 10, 10, 0.93) 0%, rgba(10, 10, 10, 0.75) 30%, rgba(10, 10, 10, 0.3) 55%, rgba(10, 10, 10, 0.1) 100%)' }}
              />
            </div>

            {/* Scan lines overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-[6] opacity-[0.025]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
              }}
            />

            {/* Corner brackets */}
            <div className="absolute top-5 right-5 w-5 h-5 border-r-2 border-t-2 border-primary/40 z-20" />
            <div className="absolute bottom-5 right-5 w-5 h-5 border-r-2 border-b-2 border-primary/40 z-20" />
            <div className="absolute top-5 left-5 w-5 h-5 border-l-2 border-t-2 border-primary/40 z-20" />
            <div className="absolute bottom-5 left-5 w-5 h-5 border-l-2 border-b-2 border-primary/40 z-20" />

            {/* Content — left-aligned text only */}
            <div className="relative z-20 flex items-center w-full">
              <div className="flex-1 p-8 lg:p-12 space-y-5 max-w-2xl">
                {/* Logo + badge */}
                <div className="flex items-center gap-3">
                  <img src={LOGO_URL} alt="Deez Prints" className="h-5 w-auto opacity-50" />
                  <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">
                    <Globe className="w-3 h-3 text-zinc-600" />
                    Printed in Pakistan
                  </span>
                </div>

                {/* Heading */}
                <h3 className="font-display text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[0.92]">
                  YOUR DESIGN.
                  <br />
                  <span className="text-primary">NO LIMITS.</span>
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-sm">
                  From concept to fabric. We print it <span className="text-primary font-semibold italic">your way</span>.
                </p>

                {/* 3 Steps */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-700/60 text-primary">
                      <Upload className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">Upload</p>
                      <p className="text-[9px] text-zinc-500 font-sans">Your design</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-700/60 text-primary">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">We Print</p>
                      <p className="text-[9px] text-zinc-500 font-sans">Premium quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 flex items-center justify-center border border-zinc-700/60 text-primary">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-white uppercase tracking-wide">You Wear</p>
                      <p className="text-[9px] text-zinc-500 font-sans">Delivered to you</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="py-3.5 px-7 bg-primary text-black font-mono font-black uppercase text-[11px] tracking-[0.15em] inline-flex items-center gap-2.5 transition-all duration-300 group-hover:bg-white shadow-lg shadow-primary/20">
                    Start Customizing <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Bottom Tagline */}
      <div className="mt-10 md:mt-12 text-center">
        <p className="label-mono text-[11px] text-muted-foreground/70 tracking-widest uppercase">
          MORE COLLECTIONS. MORE WORLDS. ONLY AT{" "}
          <span className="text-primary font-bold">DEEZ PRINTS</span>.
        </p>
      </div>
    </section>
  );
}
