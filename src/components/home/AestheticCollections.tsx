import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
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
    description: "Iconic anime graphics inspired by classics and new-generation legends.",
    image: "/assets/collections/anime_archive.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
  },
  {
    id: "dark-archive",
    title: "DARK ARCHIVE",
    count: "28+ DESIGNS",
    description: "Punk, skulls, metal and distressed graphic graphics from the underground.",
    image: "/assets/collections/dark_archive.png",
    link: "/collections/$slug",
    params: { slug: "acid-wash" },
  },
  {
    id: "culture-club",
    title: "CULTURE CLUB",
    count: "35+ DESIGNS",
    description: "Music, movies, comics and hip hop references pulled straight from culture.",
    image: "/assets/collections/culture_club.png",
    link: "/collections/$slug",
    params: { slug: "graphic" },
  },
  {
    id: "essentials",
    title: "ESSENTIALS",
    count: "18+ DESIGNS",
    description: "Minimal graphics, small chest prints and clean typography on luxury basics.",
    image: "/assets/collections/essentials.png",
    link: "/collections/$slug",
    params: { slug: "t-shirts" },
  },
  {
    id: "art-drop",
    title: "ART DROP",
    count: "22+ DESIGNS",
    description: "Experimental illustration, surreal crops and creative artwork you won't see twice.",
    image: "/assets/collections/art_drop.png",
    link: "/collections/$slug",
    params: { slug: "wall-art" },
  },
  {
    id: "street-aesthetic",
    title: "STREET AESTHETIC",
    count: "28+ DESIGNS",
    description: "Bold typography, street energy and everyday statements.",
    image: "/assets/collections/street_aesthetic.png",
    link: "/collections/$slug",
    params: { slug: "drop-shoulder" },
  },
];

export function AestheticCollections() {
  return (
    <section className="edge border-t border-border py-16 md:py-24 bg-background">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <Reveal>
          <p className="label-mono text-primary text-xs tracking-widest uppercase font-bold">
            BROWSE BY AESTHETIC
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-foreground leading-[0.95] mt-2">
            EXPLORE
            <br />
            COLLECTIONS
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm text-muted-foreground max-w-xs font-sans leading-relaxed md:text-right">
            Six design universes. Pick a world first — then choose your fit inside it.
          </p>
        </Reveal>
      </div>

      {/* 2-Column Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {aestheticCards.map((card, index) => (
          <Reveal key={card.id} delay={index * 0.08}>
            <Link
              to={card.link}
              params={card.params}
              className="group relative flex min-h-[380px] sm:min-h-[420px] flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-surface p-6 sm:p-8 transition-all duration-500 hover:border-primary/50"
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
                <div className="inline-block rounded bg-background/90 px-3 py-1 label-mono text-xs font-bold text-foreground border border-border/60 backdrop-blur-md">
                  {card.count}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground/90 font-sans max-w-xs line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Action Bottom */}
              <div className="relative z-10 pt-6">
                <span className="inline-flex items-center gap-2 rounded border border-foreground/20 bg-background/80 px-4 py-2 label-mono text-xs font-bold text-foreground uppercase tracking-wider backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground group-hover:translate-x-1">
                  EXPLORE <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Bottom Tagline */}
      <div className="mt-12 text-center">
        <p className="label-mono text-[11px] text-muted-foreground/70 tracking-widest uppercase">
          MORE COLLECTIONS. MORE WORLDS. ONLY AT{" "}
          <span className="text-primary font-bold">DEEZ PRINTS</span>.
        </p>
      </div>
    </section>
  );
}
