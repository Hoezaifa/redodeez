import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { galleryImages } from "@/data/galleryImages";
import { SITE_URL } from "@/data/site";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Deez Prints Gallery" },
      {
        name: "description",
        content:
          "A look at what we've printed over the years. Browse our gallery of custom streetwear, oversized tees, and unique designs from Deez Prints, Karachi.",
      },
      { property: "og:title", content: "Our Work — Deez Prints Gallery" },
      {
        property: "og:description",
        content: "A look at what we've printed over the years. Custom streetwear and unique prints from Karachi.",
      },
      { property: "og:url", content: `${SITE_URL}/our-work` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/our-work` }],
  }),
  component: OurWork,
});

/* ─── Lightbox ──────────────────────────────────────────── */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];
  const startX = useRef<number | null>(null);

  /* Keyboard navigation */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Touch / swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? onPrev() : onNext();
    }
    startX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Image */}
      <motion.img
        key={index}
        src={img.src}
        alt={img.alt}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-sm object-contain sm:max-w-[80vw]"
        draggable={false}
      />

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 label-mono text-white/60">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

function OurWork() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null)),
    [],
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i !== null ? (i + 1) % galleryImages.length : null)),
    [],
  );

  return (
    <>
      <section className="edge pb-20 pt-32 md:pt-40">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 label-mono text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Our Work</li>
            </ol>
          </nav>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.05}>
          <h1 className="display-lg">
            OUR WORK<span className="text-primary">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed md:text-base">
            A look at what we've printed over the years.
          </p>
        </Reveal>

        {/* Gallery Grid: CSS Grid with 1:1 aspect ratio containers prevents any column-break fragmentation and layout shifts */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {galleryImages.map((img, i) => (
            <div key={img.src} className="w-full">
              <button
                type="button"
                onClick={() => setLightboxIdx(i)}
                className="group relative block w-full aspect-square overflow-hidden rounded-sm bg-surface border border-border/40 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={i < 8 ? "eager" : "lazy"}
                  decoding={i < 8 ? "sync" : "async"}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  draggable={false}
                />
                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={galleryImages}
            index={lightboxIdx}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
