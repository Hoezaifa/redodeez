import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductZoomImageProps {
  images: string[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  alt: string;
  badgeText?: string;
}

export function ProductZoomImage({
  images,
  activeIndex,
  onIndexChange,
  alt,
  badgeText = "PREMIUM STREETWEAR",
}: ProductZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentSrc = images[activeIndex] || images[0] || "";

  const handlePrev = () => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    setIsZoomed(false);
    onIndexChange((activeIndex + 1) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleToggleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
    setIsZoomed((prev) => !prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Threshold 40px for swipe action
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      ref={containerRef}
      onClick={handleToggleZoom}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsZoomed(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative aspect-square md:aspect-4/5 overflow-hidden border border-border bg-surface rounded-none group transition-all duration-300 select-none",
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      )}
    >
      {/* Zoomable Image — Edge-to-Edge object-cover without padding gaps */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSrc}
          src={currentSrc}
          alt={alt}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: isZoomed ? 2.5 : 1,
          }}
          exit={{ opacity: 0 }}
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
          transition={{
            scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2 },
          }}
          className="h-full w-full object-cover p-0 pointer-events-none"
        />
      </AnimatePresence>

      {/* Top Left Badge */}
      {badgeText && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] label-mono font-bold px-3 py-1 rounded-none uppercase tracking-wider pointer-events-none z-10 shadow-md">
          {badgeText}
        </div>
      )}

      {/* Navigation Arrows for Multiple Images (Light Translucent Style) */}
      {images.length > 1 && !isZoomed && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-9 w-9 place-items-center rounded-none bg-white/85 text-black border border-white/30 backdrop-blur-md shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-9 w-9 place-items-center rounded-none bg-white/85 text-black border border-white/30 backdrop-blur-md shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Light Circular Zoom Icon Button */}
      <div className="absolute bottom-4 right-4 pointer-events-none z-10">
        <div className="grid h-9 w-9 place-items-center rounded-none bg-white/85 text-black border border-white/30 backdrop-blur-md shadow-md transition-all group-hover:scale-105">
          {isZoomed ? (
            <Minimize2 className="h-4 w-4 stroke-[2.5]" />
          ) : (
            <Maximize2 className="h-4 w-4 stroke-[2.5]" />
          )}
        </div>
      </div>
    </div>
  );
}
