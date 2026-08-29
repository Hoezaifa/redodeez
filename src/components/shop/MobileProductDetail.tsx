import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  RotateCcw,
  Truck,
  Maximize2,
  Minimize2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SizeChart } from "@/components/shop/SizeChart";
import { ColorDropdown } from "@/components/shop/ColorDropdown";

/* ─── Types ──────────────────────────────────────────────── */

interface MobileProductDetailProps {
  product: Product;
  availableColors: string[];
  availableSizes: string[];
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  size: string;
  setSize: (s: string) => void;
  err: boolean;
  setErr: (v: boolean) => void;
  colorErr: boolean;
  setColorErr: (v: boolean) => void;
  handleAdd: () => void;
  handleBuyNow: () => void;
  needsSize: boolean;
  needsColor: boolean;
  isDropShoulder: boolean;
  isAcidWash: boolean;
  showSizeChart: boolean;
  setShowSizeChart: (v: boolean | ((p: boolean) => boolean)) => void;
}

/* ─── Component ──────────────────────────────────────────── */

export function MobileProductDetail({
  product,
  availableColors,
  availableSizes,
  selectedColor,
  setSelectedColor,
  size,
  setSize,
  err,
  setErr,
  colorErr,
  setColorErr,
  handleAdd,
  handleBuyNow,
  needsSize,
  needsColor,
  isDropShoulder,
  isAcidWash,
  showSizeChart,
  setShowSizeChart,
}: MobileProductDetailProps) {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalImages = product.images.length;
  const currentSrc = product.images[carouselIdx] || product.images[0] || "";
  const hasMultipleImages = totalImages > 1;

  /* ── Navigation ────────────────────────────── */

  const goToImage = useCallback(
    (idx: number) => {
      setCarouselIdx(Math.max(0, Math.min(totalImages - 1, idx)));
      setIsZoomed(false);
    },
    [totalImages]
  );

  const handlePrev = useCallback(() => {
    if (!hasMultipleImages) return;
    setCarouselIdx((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    setIsZoomed(false);
  }, [hasMultipleImages, totalImages]);

  const handleNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setCarouselIdx((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  }, [hasMultipleImages, totalImages]);

  /* ── Touch Swiping ─────────────────────────── */

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  /* ── Zoom ──────────────────────────────────── */

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

  /* ── Rating ────────────────────────────────── */

  const rating = product.rating ?? 4.8;
  const reviewCount = Math.floor(rating * 64);

  return (
    <div className="mobile-pdp pb-24">
      {/* ═══════════════════ IMAGE CAROUSEL ═══════════════════ */}
      <div
        ref={containerRef}
        onClick={handleToggleZoom}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "mobile-pdp__hero relative w-full aspect-square overflow-hidden bg-surface select-none",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={`${product.title} — view ${carouselIdx + 1}`}
            initial={{ opacity: 0 }}
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
              opacity: { duration: 0.15 },
            }}
            className="h-full w-full object-cover pointer-events-none"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {hasMultipleImages && !isZoomed && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 pointer-events-none z-10">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm">
            {isZoomed ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════ CAROUSEL INDICATORS ═══════════════════ */}
      {hasMultipleImages && (
        <div className="flex justify-center gap-2.5 pt-4 pb-2">
          {product.images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`View image ${idx + 1}`}
              onClick={() => goToImage(idx)}
              className={cn(
                "h-[3px] rounded-full transition-all duration-300 cursor-pointer",
                carouselIdx === idx ? "w-8 bg-white" : "w-8 bg-white/30"
              )}
            />
          ))}
        </div>
      )}

      {/* ═══════════════════ MORE VIEWS THUMBNAILS ═══════════════════ */}
      {hasMultipleImages && (
        <div className="px-5 pt-3 pb-1">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {product.images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => goToImage(idx)}
                className={cn(
                  "relative w-14 h-14 aspect-square overflow-hidden border transition-all duration-200 cursor-pointer bg-surface shrink-0 active:scale-95",
                  carouselIdx === idx
                    ? "border-2 border-primary ring-1 ring-primary opacity-100"
                    : "border-border opacity-65 hover:opacity-100"
                )}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════ COLOR SELECTOR DROPDOWN ═══════════════════ */}
      {needsColor && (
        <div className="px-5 pt-4 pb-2">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2.5">
            COLOR
          </p>
          <ColorDropdown
            availableColors={availableColors}
            selectedColor={selectedColor}
            onSelectColor={(c) => {
              setSelectedColor(c);
              setColorErr(false);
            }}
          />
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-mono text-muted-foreground/80">
            <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span>More colors available in the dropdown</span>
          </div>
          {colorErr && (
            <p className="mt-1.5 text-xs font-mono text-destructive">
              Please select a color to proceed
            </p>
          )}
        </div>
      )}

      {/* ═══════════════════ PRODUCT INFO ═══════════════════ */}
      <div className="px-5 pt-4 space-y-3">
        {/* Brand tag */}
        <p className="text-primary text-[11px] font-mono font-bold tracking-[0.2em] uppercase">
          DEEZ PRINTS
        </p>

        {/* Title */}
        <h1 className="text-[22px] sm:text-[26px] font-display font-black tracking-tight leading-tight uppercase">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3.5 w-3.5",
                  s <= Math.round(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-none text-muted-foreground/40"
                )}
              />
            ))}
          </div>
          <span className="text-[13px] text-muted-foreground font-medium">
            {rating.toFixed(1)} ({reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-display font-black tracking-tight">
          {formatPrice(product.price)}
        </p>

        {/* Stock + Delivery */}
        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-semibold">In stock</span>
          </div>
          <span className="text-border-strong">|</span>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span>Free delivery on orders above Rs. 8,000</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════ SIZE SELECTOR ═══════════════════ */}
      {needsSize && (
        <div className="px-5 pt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Size: <span className="text-foreground font-bold">{size || "—"}</span>
            </p>
            <button
              type="button"
              onClick={() => setShowSizeChart((prev: boolean) => !prev)}
              className="flex items-center gap-1 text-[11px] font-mono font-semibold text-primary hover:underline cursor-pointer uppercase tracking-wider"
            >
              <span>📐 Size Guide</span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  showSizeChart && "rotate-180"
                )}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {availableSizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setErr(false);
                }}
                className={cn(
                  "min-w-[52px] h-[46px] px-4 border font-mono text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer rounded-sm",
                  size === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {err && (
            <p className="mt-2 text-xs font-mono text-destructive">
              Please select a size to proceed
            </p>
          )}

          {/* Inline Size Chart */}
          <AnimatePresence>
            {showSizeChart && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-3"
              >
                <SizeChart isDropShoulder={isDropShoulder} isAcidWash={isAcidWash} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ═══════════════════ ACTION BUTTONS ═══════════════════ */}
      <div className="px-5 pt-6 pb-2 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 h-[52px] border border-border bg-surface hover:bg-elevated text-foreground font-mono text-[13px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] cursor-pointer rounded-sm"
        >
          <ShoppingCart className="h-4 w-4 text-primary" />
          ADD TO CART
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 h-[52px] bg-primary hover:brightness-110 text-primary-foreground font-mono text-[13px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] cursor-pointer rounded-sm shadow-lg shadow-primary/20"
        >
          <Zap className="h-4 w-4" />
          BUY IT NOW
        </button>
      </div>

      {/* ═══════════════════ TRUST BAR ═══════════════════ */}
      <div className="px-5 pt-5 pb-6">
        <div className="grid grid-cols-3 gap-2 border-t border-border pt-5">
          <div className="flex flex-col items-center text-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
              Premium Quality
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              Built to last
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <RotateCcw className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
              Easy Returns
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              7 days return
            </span>
          </div>
          <div className="flex flex-col items-center text-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
              Secure Payments
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              100% secure checkout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
