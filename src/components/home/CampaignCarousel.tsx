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
    image: "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773571102/place_d2aqxn.webp",
  },
  {
    id: "drop-shoulder",
    title1: "BUILT FOR",
    title2: "COMFORT",
    description: "RELAXED SHOULDERS. EVERYDAY WEAR. EFFORTLESS STYLE.",
    buttonText: "SHOP DROP SHOULDER",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "drop-shoulder" },
    image: "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773574932/drp_btiwfr.webp",
  },
  {
    id: "acid-wash",
    title1: "BUILT FOR",
    title2: "TEXTURE",
    description: "VINTAGE WASH. HEAVYWEIGHT FEEL. UNIQUE FINISH.",
    buttonText: "VIEW ACID WASH",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "acid-wash" },
    image: "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1773575788/acioddddd_byto0p.webp",
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
      <div className="relative w-full h-[420px] md:min-h-[500px]">
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
            {/* MOBILE: Full-bleed image with text overlay */}
            <div className="md:hidden relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title2}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              {/* Strong bottom gradient for text legibility */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.3) 60%, rgba(0,0,0,0.1) 100%)",
                }}
              />
              {/* Text overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-5 pb-14">
                <div className="text-primary font-bold tracking-widest mb-2 text-xs">
                  - - -
                </div>
                <h2 className="font-display text-4xl font-bold uppercase leading-none mb-2">
                  <span className="text-white block">{slide.title1}</span>
                  <span className="text-primary block">{slide.title2}</span>
                </h2>
                <p className="text-[11px] text-zinc-400 font-bold tracking-wider uppercase leading-relaxed mb-4 max-w-[280px]">
                  {slide.description}
                </p>
                <Link
                  to={slide.ctaTo}
                  params={slide.ctaParams}
                  className="group inline-flex items-center justify-center px-5 py-2.5 font-bold text-white uppercase tracking-widest text-[10px] rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-300 active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    {slide.buttonText}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* DESKTOP: Split layout (image left, text right) */}
            <div className="hidden md:flex md:flex-row md:items-stretch w-full h-full">
              {/* Left: Image */}
              <div className="relative w-1/2 h-full">
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
                <img
                  src={slide.image}
                  alt={slide.title2}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>

              {/* Right: Content */}
              <div className="relative z-20 w-1/2 p-16 flex flex-col justify-center">
                <div className="text-primary font-bold tracking-widest mb-4">
                  - - -
                </div>
                <h2
                  className="text-6xl lg:text-[5.5rem] tracking-wide font-bold uppercase leading-none mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-white block">{slide.title1}</span>
                  <span className="text-primary block">{slide.title2}</span>
                </h2>

                <p className="text-sm text-zinc-400 font-bold tracking-wider mb-8 uppercase leading-relaxed max-w-sm">
                  {slide.description}
                </p>

                <div className="flex">
                  <Link
                    to={slide.ctaTo}
                    params={slide.ctaParams}
                    className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white uppercase tracking-widest text-xs rounded-lg bg-[#141414] border border-white/10 transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slide.buttonText}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
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
