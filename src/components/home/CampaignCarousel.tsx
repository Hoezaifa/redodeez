import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface CampaignSlide {
  id: string;
  badge: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
  ctaParams?: Record<string, string>;
  image: string;
}

const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: "deez-fit",
    badge: "CAMPAIGN 01",
    headline: "THE DEEZ FIT",
    description:
      "Precision cut. Raw aesthetic. Our latest drop redefines the silhouette of modern streetwear.",
    ctaLabel: "SHOP THIS FIT",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "drop-shoulder" },
    image: "/assets/campaign/campaign_deez_fit.png",
  },
  {
    id: "acid-wash",
    badge: "CAMPAIGN 02",
    headline: "RAW ACID WASH",
    description:
      "Heavyweight vintage wash cotton. Hand-finished vintage textures engineered for the underground.",
    ctaLabel: "EXPLORE ACID WASH",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "acid-wash" },
    image: "/assets/campaign/campaign_acid_wash.png",
  },
  {
    id: "anime-archive",
    badge: "CAMPAIGN 03",
    headline: "ANIME ARCHIVE",
    description:
      "Iconic graphics inspired by classics and new-gen legends. Custom printed with high-density DTF.",
    ctaLabel: "DISCOVER ARCHIVE",
    ctaTo: "/collections/$slug",
    ctaParams: { slug: "anime-archive" },
    image: "/assets/campaign/campaign_anime_archive.png",
  },
  {
    id: "custom-print",
    badge: "CAMPAIGN 04",
    headline: "YOUR DESIGN. NO LIMITS.",
    description:
      "Turn your vision into wearable art. Premium DTF & sublimation printing delivered across Pakistan.",
    ctaLabel: "START CUSTOM PRINTING",
    ctaTo: "/custom-print",
    image: "/assets/campaign/campaign_custom_print.png",
  },
];

export function CampaignCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + CAMPAIGN_SLIDES.length) % CAMPAIGN_SLIDES.length
    );
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Autoplay interval (~5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swiped left -> next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // Swiped right -> prev
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = CAMPAIGN_SLIDES[currentIndex];

  return (
    <section
      aria-label="Campaign Banner Carousel"
      className="relative w-full border-t border-b border-border bg-black overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Container aspect & height: ~440px on mobile, 520px - 580px on desktop */}
      <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] lg:h-[580px]">
        {/* Background Image Carousel with AnimatePresence */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.headline}
              loading="lazy"
              className="h-full w-full object-cover object-center md:object-right"
            />

            {/* Dark Cinematic Vignette/Gradient Overlay */}
            {/* Left to right gradient for desktop legibility */}
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.82) 35%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.15) 100%)",
              }}
            />
            {/* Top/bottom gradient for mobile legibility */}
            <div
              className="absolute inset-0 z-10 pointer-events-none md:hidden"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.5) 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Container (Left-aligned text matching reference screenshot) */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id + "-text"}
              initial={{
                opacity: 0,
                x: direction === "right" ? 20 : -20,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "right" ? -20 : 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-xl text-left pt-2 pb-16 md:pb-0"
            >
              {/* Campaign Label Badge */}
              <div className="inline-block border border-primary/80 bg-primary/10 px-3 py-1 mb-4">
                <span className="label-mono text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em]">
                  {currentSlide.badge}
                </span>
              </div>

              {/* Campaign Headline */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92] drop-shadow-lg mb-4">
                {currentSlide.headline}
              </h2>

              {/* Supporting Copy */}
              <p className="text-zinc-300 text-xs sm:text-sm font-sans max-w-md leading-relaxed mb-6 sm:mb-8 text-shadow">
                {currentSlide.description}
              </p>

              {/* Minimal Rectangular White CTA Button */}
              <div>
                <Link
                  to={currentSlide.ctaTo}
                  params={currentSlide.ctaParams}
                  className="bg-white text-black font-mono font-black text-xs uppercase tracking-[0.15em] px-6 py-3.5 inline-flex items-center gap-3 hover:bg-primary transition-colors duration-300 shadow-xl shadow-black/60 group rounded-none"
                >
                  {currentSlide.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Left: Progress Bar Indicators */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 md:bottom-10 md:left-12 z-30 flex items-center gap-2.5">
          {CAMPAIGN_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="py-2 cursor-pointer focus:outline-none group"
              >
                <div
                  className={cn(
                    "h-1 transition-all duration-300 rounded-none",
                    isActive
                      ? "w-10 bg-primary"
                      : "w-8 bg-zinc-700/80 group-hover:bg-zinc-500"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Right: Previous / Next Navigation Buttons */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 md:bottom-10 md:right-12 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Campaign Slide"
            className="w-10 h-10 border border-zinc-800 bg-black/80 text-white flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 cursor-pointer rounded-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Campaign Slide"
            className="w-10 h-10 border border-zinc-800 bg-black/80 text-white flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-200 active:scale-95 cursor-pointer rounded-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
