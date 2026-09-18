import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface CampaignSlide {
  id: string;
  title1: string;
  title2: string;
  description: string;
  buttonText: string;
  ctaTo: string;
  ctaParams?: Record<string, string>;
  image: string;
  imagePosition?: string;
}

const SLIDES: CampaignSlide[] = [
  {
    id: "tees",
    title1: "BUILT FOR",
    title2: "PRESENCE",
    description: "PREMIUM COTTON. OVERSIZED FIT. STATEMENT GRAPHICS.",
    buttonText: "EXPLORE TEES",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "t-shirts" },
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788958599/deez-prints/covers/cupid_vintage_beige.png",
    imagePosition: "object-[center_15%]",
  },
  {
    id: "drop-shoulder",
    title1: "BUILT FOR",
    title2: "COMFORT",
    description: "RELAXED SHOULDERS. EVERYDAY WEAR. EFFORTLESS STYLE.",
    buttonText: "SHOP DROP SHOULDER",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "drop-shoulder" },
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788958761/deez-prints/covers/sukuna_cursed_drop_shoulder.png",
    imagePosition: "object-[center_15%]",
  },
  {
    id: "acid-wash",
    title1: "BUILT FOR",
    title2: "TEXTURE",
    description: "VINTAGE WASH. HEAVYWEIGHT FEEL. UNIQUE FINISH.",
    buttonText: "VIEW ACID WASH",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "acid-wash" },
    image: "https://res.cloudinary.com/okcxaese/image/upload/v1788958809/deez-prints/covers/zoro_bushido_acid_wash.png",
    imagePosition: "object-[center_15%]",
  },
  {
    id: "tapestries",
    title1: "BUILT FOR",
    title2: "YOUR SPACE",
    description: "HIGH-DEFINITION SATIN. CORNER GROMMETS. STATEMENT ART.",
    buttonText: "EXPLORE TAPESTRIES",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "tapestries" },
    image: "/assets/products/tapestries/one_piece_gear_5_luffy_tapestry.webp",
    imagePosition: "object-center",
  },
];

export function CampaignCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      setCurrentSlide(
        (prev) => (prev - 1 + SLIDES.length) % SLIDES.length
      );
    } else if (info.offset.x < -100) {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      className="bg-[#050505] relative z-10 border-y border-border overflow-hidden"
      aria-label="Campaign Banner Carousel"
    >
      <div className="relative w-full h-[440px] sm:h-[480px] md:h-[540px] lg:h-[600px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Unified Responsive Slide Tree */}
            <div className="relative w-full h-full flex flex-col justify-end md:flex-row md:items-stretch overflow-hidden bg-black">
              {/* Image Container: full-bleed on mobile, left half on desktop */}
              <div className="absolute inset-0 md:relative md:w-1/2 md:h-full overflow-hidden bg-black">
                <img
                  src={slide.image}
                  alt={slide.title2}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover",
                    slide.imagePosition || "object-top md:object-[center_15%]"
                  )}
                />
                {/* Mobile bottom gradient for text legibility */}
                <div
                  className="md:hidden absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.3) 60%, rgba(0,0,0,0.1) 100%)",
                  }}
                />
                {/* Desktop edge fade into dark right half */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[#050505] via-[#050505]/70 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Content Container: bottom overlay on mobile, right half centered on desktop */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-5 pb-14 md:relative md:inset-auto md:w-1/2 md:p-12 lg:p-16 flex flex-col justify-end md:justify-center">
                <div className="text-primary font-bold tracking-widest text-xs mb-2 md:mb-4">
                  - - -
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-[5.5rem] font-bold uppercase leading-none mb-2 md:mb-6 tracking-tight md:tracking-wide">
                  <span className="text-white block">{slide.title1}</span>
                  <span className="text-primary block">{slide.title2}</span>
                </h2>
                <p className="text-[11px] md:text-sm text-zinc-400 font-bold tracking-wider uppercase leading-relaxed mb-4 md:mb-8 max-w-[280px] md:max-w-sm">
                  {slide.description}
                </p>
                <div className="flex">
                  <Link
                    to={slide.ctaTo}
                    params={slide.ctaParams}
                    className="group relative inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 font-bold text-white uppercase tracking-widest text-[10px] md:text-xs rounded-lg bg-white/10 md:bg-[#141414] border border-white/20 md:border-white/10 backdrop-blur-sm md:backdrop-blur-none transition-all duration-300 active:scale-95 md:hover:bg-white md:hover:text-black md:hover:border-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slide.buttonText}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-4 right-5 md:bottom-6 md:right-16 z-30 flex gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 cursor-pointer",
                currentSlide === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
