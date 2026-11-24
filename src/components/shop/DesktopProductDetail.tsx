import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  Zap,
  Minus,
  Plus,
  Maximize2,
  Minimize2,
  Truck,
  ShieldCheck,
  Clock,
  Info,
  RotateCcw,
  MapPin,
  X,
} from "lucide-react";
import { cn, getProductImageAlt } from "@/lib/utils";
import type { Product } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { SizeChart } from "@/components/shop/SizeChart";
import { ApparelAccordion } from "@/components/shop/ApparelAccordion";
import { AccordionItem } from "@/components/shop/AccordionItem";
import { ColorDropdown } from "@/components/shop/ColorDropdown";
import { useDoomsdayCountdown } from "@/components/hero/DoomsdayCountdown";
import doomsdayCollectionDropImg from "@/assets/doomsday-collection-drop.jpg";

/* ─── Types ──────────────────────────────────────────────── */

interface DesktopProductDetailProps {
  product: Product;
  availableColors: string[];
  availableSizes: string[];
  selectedColor: string;
  setSelectedColor: (c: string) => void;
  size: string;
  setSize: (s: string) => void;
  qty: number;
  setQty: (v: number | ((q: number) => number)) => void;
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

/* ─── Doomsday Collection Banner, Mobile Strip & Popup ───── */

function padUnit(n: number): string {
  return String(n).padStart(2, "0");
}

function DoomsdayMobileTopBar() {
  const timeLeft = useDoomsdayCountdown();

  const units = [
    { label: "D", value: timeLeft ? padUnit(timeLeft.days) : "--" },
    { label: "H", value: timeLeft ? padUnit(timeLeft.hours) : "--" },
    { label: "M", value: timeLeft ? padUnit(timeLeft.minutes) : "--" },
    { label: "S", value: timeLeft ? padUnit(timeLeft.seconds) : "--" },
  ];

  return (
    <Link
      to="/doomsday"
      aria-label="Explore the full Doctor Doom Doomsday Collection"
      className="lg:hidden grid grid-cols-[124px_1fr] items-center gap-3 rounded-lg border border-white/20 border-l-2 border-l-primary bg-[#0b0b0e] p-2.5 cursor-pointer transition-colors active:scale-[0.99] hover:border-white/35"
    >
      <img
        src={doomsdayCollectionDropImg}
        alt="Doctor Doom Doomsday Collection"
        width={1024}
        height={768}
        decoding="async"
        className="w-full h-auto rounded-md border border-white/15"
      />
      <div className="min-w-0 flex flex-col gap-1">
        <p className="font-display text-[11px] font-black uppercase tracking-wide text-primary leading-tight truncate">
          THE DOOMSDAY DROP IS LIVE
        </p>
        <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] text-white/75 leading-none truncate">
          GET YOURS BEFORE TIME RUNS OUT
        </p>
        <div className="grid grid-cols-4 gap-1 mt-0.5">
          {units.map((u) => (
            <span
              key={u.label}
              className="flex flex-col items-center justify-center rounded border border-white/15 bg-black/85 py-1 font-display text-xs font-black text-white tabular-nums leading-none"
            >
              <span>{u.value}</span>
              <span className="mt-0.5 font-mono text-[7px] font-bold text-white/55">{u.label}</span>
            </span>
          ))}
        </div>
        <span className="inline-flex items-center justify-center rounded-sm border border-primary/70 bg-primary/15 py-1 font-mono text-[9.5px] font-black uppercase tracking-[0.14em] text-primary leading-none">
          EXPLORE FULL DROP →
        </span>
      </div>
    </Link>
  );
}

function DoomsdayProductCollectionBanner() {
  const timeLeft = useDoomsdayCountdown();

  const units = [
    { label: "DAYS", value: timeLeft ? padUnit(timeLeft.days) : "--" },
    { label: "HRS", value: timeLeft ? padUnit(timeLeft.hours) : "--" },
    { label: "MIN", value: timeLeft ? padUnit(timeLeft.minutes) : "--" },
    { label: "SEC", value: timeLeft ? padUnit(timeLeft.seconds) : "--" },
  ];

  return (
    <aside
      aria-label="Doctor Doom Doomsday Collection"
      className="grid grid-cols-1 sm:grid-cols-[235px_1fr] xl:grid-cols-[255px_1fr] items-center gap-3 sm:gap-4 rounded-lg border border-white/15 bg-[#0b0b0e] p-2.5 sm:p-3"
    >
      {/* Left: Compact Clickable Collection Artwork */}
      <Link
        to="/doomsday"
        aria-label="Explore the full Doctor Doom Doomsday Collection"
        className="group block w-full overflow-hidden rounded-md border border-white/15 cursor-pointer transition-all duration-300 hover:border-white/30 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={doomsdayCollectionDropImg}
          alt="Doctor Doom Doomsday Collection — Explore the full drop"
          width={1024}
          height={768}
          decoding="async"
          className="block w-full h-auto transition-transform duration-300 ease-out sm:group-hover:scale-[1.02]"
        />
      </Link>

      {/* Right: Live Countdown Timer */}
      <div className="flex flex-col justify-center min-w-0 px-1 sm:px-0">
        <span className="font-display text-xs sm:text-sm xl:text-[15px] font-black uppercase tracking-wide text-primary leading-tight">
          THE DOOMSDAY DROP IS LIVE
        </span>
        <span className="mt-1 font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/75 leading-snug">
          GET YOURS BEFORE THE CLOCK RUNS OUT
        </span>

        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {units.map((u) => (
            <div
              key={u.label}
              className="flex flex-col items-center justify-center rounded border border-white/15 bg-black/85 px-1.5 py-2"
            >
              <span className="font-display text-base xl:text-lg font-black tracking-tight text-white tabular-nums leading-none">
                {u.value}
              </span>
              <span className="mt-1 font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-white/50 leading-none">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/doomsday"
          className="mt-3 inline-flex items-center justify-center border border-primary/70 bg-primary/12 hover:bg-primary hover:text-black text-primary font-mono text-[10px] font-black uppercase tracking-[0.14em] px-3 py-2 transition-colors whitespace-nowrap active:scale-[0.98]"
        >
          EXPLORE FULL COLLECTION →
        </Link>
      </div>
    </aside>
  );
}

function DoomsdayCollectionPopup({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setOpen(false);
    const timer = window.setTimeout(() => {
      setOpen(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Doctor Doom Doomsday Collection"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px]"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close Doomsday Collection popup"
              className="absolute -top-3 -right-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/90 text-white shadow-lg transition-colors hover:border-white hover:bg-black cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <Link
              to="/doomsday"
              onClick={dismiss}
              aria-label="Explore the full Doctor Doom Doomsday Collection"
              className="group block w-full overflow-hidden rounded-xl border border-white/20 shadow-2xl cursor-pointer transition-all duration-300 hover:border-white/40 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={doomsdayCollectionDropImg}
                alt="Doctor Doom Doomsday Collection — Explore the full drop"
                width={1024}
                height={768}
                decoding="async"
                className="block w-full h-auto transition-transform duration-300 ease-out sm:group-hover:scale-[1.01]"
              />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Component ──────────────────────────────────────────── */

export function DesktopProductDetail({
  product,
  availableColors,
  availableSizes,
  selectedColor,
  setSelectedColor,
  size,
  setSize,
  qty,
  setQty,
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
}: DesktopProductDetailProps) {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalImages = product.images.length;
  const currentSrc = product.images[carouselIdx] || product.images[0] || "";
  const hasMultipleImages = totalImages > 1;

  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const isMug = product.subcategory === "mugs" || product.category === "accessories";
  const isDoomsdayProduct = /doctor doom|dr\.?\s*doom|doomsday/i.test(`${product.title} ${product.id}`);
  const isLargeTapestry = isTapestry && (size?.includes("70 x 50") || size?.toLowerCase().includes("large"));
  const displayPrice = isLargeTapestry ? 4200 : product.price;

  /* ── Navigation ────────────────────────────── */

  const goToImage = useCallback(
    (idx: number) => {
      setCarouselIdx(Math.max(0, Math.min(totalImages - 1, idx)));
      setIsZoomed(false);
    },
    [totalImages]
  );

  // Synchronize displayed image when selectedColor changes if a variant image exists
  useEffect(() => {
    if (!selectedColor) return;
    const colorLower = selectedColor.toLowerCase();
    const idx = product.images.findIndex((img) => {
      const lower = img.toLowerCase();
      return (
        lower.includes(`--${colorLower}--`) ||
        lower.includes(`-${colorLower}-`) ||
        lower.includes(`_${colorLower}_`) ||
        lower.includes(`-${colorLower}.`) ||
        lower.includes(`_${colorLower}.`) ||
        lower.includes(`/${colorLower}/`)
      );
    });
    if (idx !== -1) {
      setCarouselIdx(idx);
    }
  }, [selectedColor, product.images]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
      {/* ═══════════════════ LEFT COLUMN: IMAGE ═══════════════════ */}
      <div className="space-y-3 lg:space-y-4">
        {/* Mobile Above-the-Fold Doomsday Strip (visible immediately without scrolling) */}
        {isDoomsdayProduct && <DoomsdayMobileTopBar />}

        <div
          ref={containerRef}
          onClick={handleToggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "relative aspect-[4/5] sm:aspect-square overflow-hidden border border-border bg-surface rounded-none group select-none transition-all duration-300",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
        >
          {/* Badge */}
          <div
            className={cn(
              "absolute top-4 left-4 text-[10px] label-mono font-bold px-3 py-1 rounded-none uppercase tracking-wider pointer-events-none z-10 shadow-md",
              isMug ? "bg-amber-500 text-black font-black" : "bg-primary text-primary-foreground"
            )}
          >
            {isMug ? "KARACHI DELIVERY ONLY" : "PREMIUM STREETWEAR"}
          </div>

          {/* Image */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentSrc}
              src={currentSrc}
              alt={getProductImageAlt(product, currentSrc, carouselIdx, totalImages)}
              initial={false}
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
              fetchPriority="high"
              loading="eager"
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-none bg-black/60 text-white border border-white/10 backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-none bg-black/60 text-white border border-white/10 backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Zoom icon */}
          <div className="absolute bottom-4 right-4 pointer-events-none z-10">
            <div className="grid h-9 w-9 place-items-center rounded-none bg-black/60 text-white border border-white/10 backdrop-blur-sm transition-all group-hover:scale-105">
              {isZoomed ? (
                <Minimize2 className="h-4 w-4 stroke-[2.5]" />
              ) : (
                <Maximize2 className="h-4 w-4 stroke-[2.5]" />
              )}
            </div>
          </div>
        </div>

        {/* Dash Indicators */}
        {hasMultipleImages && (
          <div className="flex justify-center gap-2 pt-1">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View image ${idx + 1}`}
                onClick={() => goToImage(idx)}
                className={cn(
                  "h-[3px] rounded-full transition-all duration-300 cursor-pointer",
                  carouselIdx === idx
                    ? "w-8 bg-primary"
                    : "w-8 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        )}

        {/* MORE VIEWS Thumbnail Strip (secondary views excluding cover) */}
        {hasMultipleImages && (
          <div className="pt-2">
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
              {product.images.slice(1).map((img, sliceIdx) => {
                const originalIdx = sliceIdx + 1;
                return (
                  <button
                    key={img + originalIdx}
                    type="button"
                    onClick={() => goToImage(originalIdx)}
                    className={cn(
                      "relative w-16 h-16 aspect-square overflow-hidden border transition-all duration-200 cursor-pointer bg-surface shrink-0",
                      carouselIdx === originalIdx
                        ? "border-2 border-primary ring-1 ring-primary"
                        : "border-border opacity-65 hover:opacity-100 hover:border-border-strong"
                    )}
                  >
                    <img
                      src={img}
                      alt={getProductImageAlt(product, img, originalIdx, totalImages)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════ RIGHT COLUMN: INFO ═══════════════════ */}
      <div className="lg:sticky lg:top-28 lg:self-start space-y-5">
        {/* Brand + subcategory */}
        <p className="label-mono text-primary font-bold tracking-[0.2em] text-xs uppercase">
          DEEZ PRINTS · {product.subcategory.replace(/-/g, " ")}
        </p>

        {/* Title */}
        <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl tracking-tight leading-tight lg:leading-[0.92] uppercase">
          {product.title}
        </h1>

        {/* Product Description */}
        {product.description && (
          <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed max-w-prose">
            {product.description}
          </p>
        )}

        {/* Doomsday Collection Banner + Timer (below description, above price) */}
        {isDoomsdayProduct && <DoomsdayProductCollectionBanner />}
        {isDoomsdayProduct && <DoomsdayCollectionPopup productId={product.id} />}

        {/* Karachi Delivery Only Alert for Mugs */}
        {isMug && (
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-amber-400 uppercase tracking-wide label-mono">Karachi Delivery Only: </span>
              <span className="text-zinc-300">
                Fragile ceramic item. Safely dispatched via direct rider exclusively within Karachi (delivered around day 3 after confirmation). Nationwide courier shipping is not available for drinkware.
              </span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl xl:text-3xl font-black text-foreground">
            {formatPrice(displayPrice * qty)}
          </span>
          {qty > 1 && (
            <span className="text-xs font-mono text-muted-foreground font-semibold">
              ({formatPrice(displayPrice)} each)
            </span>
          )}
        </div>

        {/* Stock + Delivery + Returns info bar */}
        <div className="flex items-center gap-4 text-[12px] text-muted-foreground font-medium border-y border-border py-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-400 font-semibold">In stock</span>
          </div>
          <span className="text-border-strong">|</span>
          <div className="flex items-center gap-1.5">
            <Truck className={cn("h-3.5 w-3.5", isMug ? "text-amber-400" : "text-muted-foreground/60")} />
            {isMug ? (
              <span className="text-amber-300 font-semibold">Delivery only in Karachi</span>
            ) : (
              <span>Free Karachi delivery on orders above Rs. {site.freeShippingThreshold.toLocaleString()}</span>
            )}
          </div>
          <span className="text-border-strong">|</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span>7-Day Defect/Wrong Item Exchange</span>
          </div>
        </div>

        {/* ── Color Selector Dropdown ───────────────── */}
        {needsColor && (
          <div>
            <p className="label-mono uppercase text-xs font-bold text-muted-foreground mb-2.5 tracking-wider">
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
            <div className="flex items-center gap-1.5 mt-2 text-xs label-mono text-muted-foreground/80">
              <Info className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span>More colors available in the dropdown</span>
            </div>
            {colorErr && (
              <p className="mt-1.5 label-mono text-xs text-destructive">
                Please select a color to proceed
              </p>
            )}
          </div>
        )}

        {/* ── Size Selector ───────────────────────── */}
        {needsSize && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="label-mono uppercase text-xs text-muted-foreground font-bold tracking-wider">
                Select Size
              </p>
              {product.subcategory !== "tapestries" && (
                <button
                  type="button"
                  onClick={() => setShowSizeChart((prev: boolean) => !prev)}
                  className="label-mono text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer font-bold tracking-wider"
                >
                  <span>📐 Size Guide</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      showSizeChart && "rotate-180"
                    )}
                  />
                </button>
              )}
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
                    "min-w-[48px] h-[44px] px-4 rounded-none label-mono transition-all duration-200 active:scale-95 font-bold border text-sm cursor-pointer",
                    size === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {product.subcategory === "tapestries" && (
              <p className="mt-2 text-xs text-muted-foreground label-mono">
                {size?.includes("70 x 50") || size?.toLowerCase().includes("large")
                  ? "* Note: Size is 70 x 50 inches or 50 x 70 inches depending on the design orientation (vertical vs. horizontal)."
                  : "* Note: Size is 50 x 30 inches or 30 x 50 inches depending on the design orientation (vertical vs. horizontal)."}
              </p>
            )}
            {err && (
              <p className="mt-2 label-mono text-xs text-destructive">
                Please select a size to proceed
              </p>
            )}

            <AnimatePresence>
              {showSizeChart && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-3"
                >
                  <SizeChart
                    isDropShoulder={isDropShoulder}
                    isAcidWash={isAcidWash}
                    isAcidWashHoodie={product.subcategory === "acid-wash-hoodies"}
                    isHoodie={product.subcategory === "hoodies"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}



        {/* ── Quantity Selector ───────────────────── */}
        <div>
          <p className="label-mono uppercase text-xs text-muted-foreground font-bold mb-3 tracking-wider">
            Quantity
          </p>
          <div className="flex items-center border border-border bg-surface rounded-none w-fit">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q: number) => Math.max(1, q - 1))}
              className="w-11 h-11 flex items-center justify-center hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-mono text-base font-bold border-x border-border">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q: number) => q + 1)}
              className="w-11 h-11 flex items-center justify-center hover:bg-elevated text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Action Buttons ──────────────────────── */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2.5 h-[52px] border border-border-strong bg-surface hover:bg-elevated text-foreground label-mono text-sm font-bold transition-all rounded-none cursor-pointer active:scale-[0.97]"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-2.5 h-[52px] bg-primary hover:brightness-110 text-primary-foreground label-mono text-sm font-bold transition-all rounded-none shadow-lg shadow-primary/20 cursor-pointer active:scale-[0.97]"
          >
            <Zap className="h-4 w-4" />
            BUY NOW
          </button>
        </div>

        {/* ── Mobile Trust Bar ───────────────────── */}
        <div className="grid grid-cols-3 gap-2 border-t border-border pt-4 lg:hidden">
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
              7-Day Exchange
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              Defect / wrong item
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

        {/* ── Desktop Secure Checkout Badge ───────────────── */}
        <div className="hidden lg:flex items-center justify-center gap-2 border border-border rounded-none py-3 text-xs text-muted-foreground font-mono">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="uppercase tracking-wider font-semibold">100% Secure Checkout</span>
          <ShieldCheck className="h-4 w-4 text-emerald-500 ml-auto" />
        </div>

        {/* ── Accordion Sections ──────────────────── */}
        {product.category === "t-shirts" || product.category === "hoodies" ? (
          <ApparelAccordion product={product} />
        ) : (
          <div className="mt-8 border-t border-border/60">
            {product.description && (
              <AccordionItem title="Product Description" defaultOpen>
                <p className="leading-relaxed">{product.description}</p>
              </AccordionItem>
            )}
            <AccordionItem title="Materials & Details">
              {product.subcategory === "tapestries" || product.subcategory === "flags" ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>Dimensions: Small (50 x 30 in) or Large (70 x 50 in) depending on design orientation — vertical or horizontal</li>
                  <li>Material: Premium High-Density Satin Fabric (Smooth, Soft & Durable)</li>
                  <li>Printing: High-Definition Digital Sublimation Printing (Ultra-vibrant, edge-to-edge color)</li>
                  <li>Hanging & Setup: Reinforced Brass Metal Grommets at corners for effortless wall mounting</li>
                  <li>Care & Maintenance: Machine washable, fade-resistant, wrinkle-free drape</li>
                  <li>Usage: Premium Wall Art & Room Aesthetic Decor (Decorative Tapestry — Non-apparel)</li>
                </ul>
              ) : product.subcategory === "mugs" ? (
                <ul className="list-disc list-inside space-y-1">
                  <li>Material: High-grade, heat-resistant Ceramic with Polymer Coating.</li>
                  <li>Finish: High-gloss white for vibrant, full-color reproduction.</li>
                  <li>Durability: Fade-resistant, scratch-resistant, built for daily use.</li>
                  <li>Capacity: Standard 11oz (325ml).</li>
                </ul>
              ) : (
                "Premium quality materials with precision printing and durable finishing."
              )}
            </AccordionItem>
            <AccordionItem title="Shipping Information">
              {isMug ? (
                <div className="space-y-1.5 text-sm leading-relaxed">
                  <p className="text-amber-300 font-bold">
                    ⚠️ Karachi Delivery Exclusively
                  </p>
                  <p>
                    Due to the fragile nature of high-gloss ceramic, all mugs are hand-packaged with bubble wrap and dispatched exclusively via direct rider within Karachi (orders usually prepared within 2 days and delivered around day 3 after confirmation) to guarantee zero damage. Mugs cannot be dispatched via nationwide courier services.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Karachi:</strong> Orders are usually prepared within 2 days and delivered around day 3 after confirmation.
                  </p>
                  <p>
                    <strong className="text-foreground">Outside Karachi:</strong> Preparation usually takes 2–3 days. Courier delivery then typically takes around 3–4 additional days, but can take longer depending on the courier and destination.
                  </p>
                </div>
              )}
            </AccordionItem>
            <AccordionItem title="7-Day Exchange Policy">
              <p className="mb-2 leading-relaxed text-sm">
                Exchange is available within 7 days only if you receive a defective item, incorrect product, or a different size than the one you ordered.
              </p>
              <p className="leading-relaxed text-sm text-muted-foreground">
                Please check the size chart, fit and order details carefully before confirming your order. Incorrect size selection or change of mind is not eligible for exchange. Items must be unworn, unwashed, unused, and in original condition.
              </p>
            </AccordionItem>
          </div>
        )}
      </div>
    </div>
  );
}

export { DesktopProductDetail as ProductDetail };

