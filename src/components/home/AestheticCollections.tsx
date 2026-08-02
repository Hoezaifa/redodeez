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
    image: "/assets/collections/anime_archive_v3.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
  },
  {
    id: "comic-universe",
    title: "COMIC UNIVERSE",
    count: "28+ DESIGNS",
    description: "Marvel, DC, Comics, Superheroes.",
    image: "/assets/collections/comic_universe.png",
    link: "/collections/$slug",
    params: { slug: "graphic" },
  },
  {
    id: "minimal-drops",
    title: "MINIMAL DROPS",
    count: "35+ DESIGNS",
    description: "Small chest prints, clean graphics, typography, symbols, understated everyday wear.",
    image: "/assets/collections/minimal_drops.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
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

      {/* Mobile Collection Banner List */}
      <div className="flex flex-col gap-5 md:hidden">
        {aestheticCards.map((card, index) => {
          const parts = card.title.split(" ");
          const word1 = parts[0];
          const word2 = parts.slice(1).join(" ");

          return (
            <Reveal key={card.id} delay={index * 0.04}>
              <Link
                to={card.link}
                params={card.params}
                className="group relative flex min-h-[210px] w-full flex-col justify-between overflow-hidden border border-border/80 bg-zinc-950 p-6 transition-all duration-300 active:scale-[0.99] rounded-none"
              >
                {/* Background Image Right-Aligned with Dark Left-to-Right Fade */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-right opacity-90 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 via-50% to-transparent z-10" />
                </div>

                {/* Card Left Text Overlay (Generous padding from card edges) */}
                <div className="relative z-20 space-y-2.5 max-w-[65%] text-left pt-1 pl-1">
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight leading-[0.9] drop-shadow-md">
                    <span className="block text-white">{word1}</span>
                    {word2 && <span className="block text-primary">{word2}</span>}
                  </h3>
                  <div className="inline-block bg-background/90 border border-border/80 px-2.5 py-0.5 label-mono text-[10px] font-extrabold text-foreground uppercase tracking-wider rounded-none">
                    {card.count}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-sans line-clamp-2 leading-relaxed pt-0.5">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Button */}
                <div className="relative z-20 pt-4 pl-1 pb-1">
                  <span className="inline-flex items-center gap-1.5 border border-border/80 bg-background/80 px-3.5 py-2 label-mono text-[10px] font-bold text-foreground uppercase tracking-wider backdrop-blur-md transition-all group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                    EXPLORE <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Desktop 2-Column Grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-2">
        {aestheticCards.map((card, index) => {
          const parts = card.title.split(" ");
          const word1 = parts[0];
          const word2 = parts.slice(1).join(" ");

          return (
            <Reveal key={card.id} delay={index * 0.08}>
              <Link
                to={card.link}
                params={card.params}
                className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-between overflow-hidden rounded-none border border-border/80 bg-surface p-8 lg:p-10 transition-all duration-500 hover:border-primary/50"
              >
                {/* Background Image with Dark Left-to-Right Fade */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 via-45% to-transparent z-10" />
                </div>

                {/* Card Content Top (Safe margins from card walls) */}
                <div className="relative z-20 space-y-3.5 text-left max-w-sm">
                  <h3 className="font-display text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[0.88] drop-shadow-md">
                    <span className="block text-foreground">{word1}</span>
                    {word2 && <span className="block text-primary">{word2}</span>}
                  </h3>
                  <div className="inline-block rounded-none bg-background/90 px-3 py-1 label-mono text-xs font-bold text-foreground border border-border/60 backdrop-blur-md">
                    {card.count}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground/90 font-sans max-w-xs leading-relaxed pt-1">
                    {card.description}
                  </p>
                </div>

                {/* Card Action Bottom */}
                <div className="relative z-20 pt-6">
                  <span className="inline-flex items-center gap-2 rounded-none border border-border/80 bg-background/80 px-5 py-2.5 label-mono text-xs font-bold text-foreground uppercase tracking-wider backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                    EXPLORE <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
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
