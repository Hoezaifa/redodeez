import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductZoomImageProps {
  src: string;
  alt: string;
  badgeText?: string;
}

export function ProductZoomImage({ src, alt, badgeText = "PREMIUM STREETWEAR" }: ProductZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      onClick={handleToggleZoom}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsZoomed(false)}
      className={cn(
        "relative aspect-square md:aspect-4/5 overflow-hidden border border-border bg-surface rounded-2xl group transition-all duration-300 select-none",
        isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      )}
    >
      {/* Zoomable Image Container */}
      <motion.img
        key={src}
        src={src}
        alt={alt}
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: 1,
          scale: isZoomed ? 2.5 : 1,
        }}
        style={{
          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
        }}
        transition={{
          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.3 },
        }}
        className="h-full w-full object-contain p-3 pointer-events-none"
      />

      {/* Top Left Badge */}
      {badgeText && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] label-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider pointer-events-none z-10 shadow-md">
          {badgeText}
        </div>
      )}

      {/* Zoom Helper Indicator Button */}
      <div className="absolute bottom-4 right-4 bg-background/85 backdrop-blur-md border border-border text-foreground text-xs label-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 pointer-events-none transition-opacity duration-200 z-10 shadow-md">
        {isZoomed ? (
          <>
            <ZoomOut className="h-3.5 w-3.5 text-primary" />
            <span>Click to reset</span>
          </>
        ) : (
          <>
            <ZoomIn className="h-3.5 w-3.5 text-primary" />
            <span>Click to zoom</span>
          </>
        )}
      </div>
    </div>
  );
}
