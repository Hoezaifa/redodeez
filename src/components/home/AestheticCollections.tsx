import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface AestheticCard {
  id: string;
  title: string;
  count: string;
  description: string;
  image: string;
  link: string;
  params?: Record<string, string>;
}

const aestheticCards: AestheticCard[] = [
  {
    id: "anime-archive",
    title: "ANIME ARCHIVE",
    count: "48+ DESIGNS",
    description: "Iconic anime graphics inspired by classics and new-gen legends.",
    image: "/assets/collections/anime_archive.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
  },
  {
    id: "dark-archive",
    title: "DARK ARCHIVE",
    count: "28+ DESIGNS",
    description: "Punk, skulls, metal and distressed gothic graphics from the underground.",
    image: "/assets/collections/dark_archive.png",
    link: "/collections/$slug",
    params: { slug: "acid-wash" },
  },
  {
    id: "culture-club",
    title: "CULTURE CLUB",
    count: "35+ DESIGNS",
    description: "Music, movies, comics & hip hop references pulled straight from culture.",
    image: "/assets/collections/culture_club.png",
    link: "/collections/$slug",
    params: { slug: "graphic" },
  },
  {
    id: "essentials",
    title: "ESSENTIALS",
    count: "18+ DESIGNS",
    description: "Minimal graphics, clean types and everyday premium basics.",
    image: "/assets/collections/essentials.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
  },
  {
    id: "art-drop",
    title: "ART DROP",
    count: "22+ DESIGNS",
    description: "Experimental artwork, surreal graphics and limited releases.",
    image: "/assets/collections/art_drop.png",
    link: "/collections/$slug",
    params: { slug: "wall-art" },
  },
  {
    id: "street-aesthetic",
    title: "STREET AESTHETIC",
    count: "28+ DESIGNS",
    description: "Bold typography, street energy and new everyday statements.",
    image: "/assets/collections/street_aesthetic.png",
    link: "/collections/$slug",
    params: { slug: "drop-shoulder" },
  },
];

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
            Six design universes. Pick a world first — then choose your fit inside it.
          </p>
        </Reveal>
      </div>

      {/* Mobile Collection Banner List (Full-width right-image cards) */}
      <div className="flex flex-col gap-4 md:hidden">
        {aestheticCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 0.04}>
            <Link
              to={card.link}
              params={card.params}
              className="group relative flex min-h-[165px] w-full flex-col justify-between overflow-hidden border border-white/10 bg-zinc-950 p-5 transition-all duration-300 active:scale-[0.99] rounded-none"
            >
              {/* Background Image on Right with Dark Fade Gradient */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute right-0 top-0 h-full w-[65%] object-cover object-center opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 via-50% to-transparent z-10" />
              </div>

              {/* Card Left Text Overlay */}
              <div className="relative z-20 space-y-1 max-w-[62%]">
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs font-mono font-bold text-primary tracking-wide">
                  {card.count}
                </p>
                <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed pt-1">
                  {card.description}
                </p>
              </div>

              {/* Bottom Orange Arrow */}
              <div className="relative z-20 pt-3">
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Desktop 2-Column Grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-2">
        {aestheticCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 0.08}>
            <Link
              to={card.link}
              params={card.params}
              className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-between overflow-hidden rounded-none border border-border/80 bg-surface p-6 sm:p-8 transition-all duration-500 hover:border-primary/50"
            >
              {/* Background Image with Dark Vignette */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-65 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
              </div>

              {/* Card Content Top */}
              <div className="relative z-10 space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground drop-shadow-md">
                  {card.title}
                </h3>
                <div className="inline-block rounded-none bg-background/90 px-3 py-1 label-mono text-xs font-bold text-foreground border border-border/60 backdrop-blur-md">
                  {card.count}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/90 font-sans max-w-xs line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Action Bottom */}
              <div className="relative z-10 pt-6">
                <span className="inline-flex items-center gap-2 rounded-none border border-foreground/20 bg-background/80 px-4 py-2 label-mono text-xs font-bold text-foreground uppercase tracking-wider backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                  EXPLORE <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
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
