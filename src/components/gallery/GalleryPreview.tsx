import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye } from "lucide-react";
import { galleryImages } from "@/data/galleryImages";
import { Reveal } from "@/components/motion/Reveal";

interface GalleryPreviewProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  className?: string;
  compact?: boolean;
}

const condensedFont = { fontFamily: "'Bebas Neue', sans-serif" };

export function GalleryPreview({
  eyebrow = "ACTUAL PRINTS. OUR WORK.",
  title = "REAL WORK. REAL FINISH.",
  subtitle = "High-definition DTF and sublimation prints on heavyweight blanks, photographed directly from our Karachi studio.",
  limit = 6,
  className = "",
  compact = false,
}: GalleryPreviewProps) {
  // Use first 6 representative garment photographs from the existing gallery data
  const previewImages = galleryImages.slice(0, limit);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="edge py-10 md:py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
          <Reveal>
            <p className="font-mono text-primary uppercase tracking-[0.2em] text-xs font-bold mb-2">
              {eyebrow}
            </p>
            <h2
              className="uppercase leading-[0.92] tracking-tight text-white"
              style={{
                ...condensedFont,
                fontSize: compact ? "clamp(2rem, 5vw, 3.2rem)" : "clamp(2.5rem, 6vw, 4rem)",
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
                {subtitle}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.08} className="shrink-0">
            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 border border-primary text-primary font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-none hover:bg-primary hover:text-black transition-colors active:scale-95 group"
            >
              <span>View All Our Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {previewImages.map((img, idx) => (
            <Reveal key={img.src} delay={idx * 0.04}>
              <Link
                to="/our-work"
                className="group relative block aspect-[4/5] bg-zinc-950 border border-white/10 overflow-hidden hover:border-primary/50 transition-colors"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Caption overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-left">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary mb-1">
                    <Eye className="w-3 h-3" />
                    <span>Actual Print #{idx + 1}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-300 font-medium line-clamp-2 leading-snug">
                    {img.alt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Mobile footer CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/our-work"
            className="inline-flex items-center justify-center gap-2 w-full py-3 border border-primary bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-black transition-colors"
          >
            <span>Explore Complete Gallery ({galleryImages.length}+ Prints)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
