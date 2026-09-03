import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SizeChart } from "@/components/shop/SizeChart";
import { ApparelAccordion } from "@/components/shop/ApparelAccordion";
import { AccordionItem } from "@/components/shop/AccordionItem";
import { ColorDropdown } from "@/components/shop/ColorDropdown";

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
    <div className="grid grid-cols-2 gap-12 xl:gap-16">
      {/* ═══════════════════ LEFT COLUMN: IMAGE ═══════════════════ */}
      <div className="space-y-4">
        <div
          ref={containerRef}
          onClick={handleToggleZoom}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
          className={cn(
            "relative aspect-square overflow-hidden border border-border bg-surface rounded-none group select-none transition-all duration-300",
            isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
          )}
        >
          {/* Badge */}
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] label-mono font-bold px-3 py-1 rounded-none uppercase tracking-wider pointer-events-none z-10 shadow-md">
            PREMIUM STREETWEAR
          </div>

          {/* Image */}
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
                opacity: { duration: 0.2 },
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

        {/* MORE VIEWS Thumbnail Strip */}
        {hasMultipleImages && (
          <div className="pt-2">
            <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => goToImage(idx)}
                  className={cn(
                    "relative w-16 h-16 aspect-square overflow-hidden border transition-all duration-200 cursor-pointer bg-surface shrink-0",
                    carouselIdx === idx
                      ? "border-2 border-primary ring-1 ring-primary"
                      : "border-border opacity-65 hover:opacity-100 hover:border-border-strong"
                  )}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
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
        <h1 className="font-display font-black text-4xl xl:text-5xl tracking-tight leading-[0.92] uppercase">
          {product.title}
        </h1>

        {/* Price */}
        <div>
          <span className="font-display text-2xl xl:text-3xl font-black text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Stock + Delivery + Returns info bar */}
        <div className="flex items-center gap-4 text-[12px] text-muted-foreground font-medium border-y border-border py-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-400 font-semibold">In stock</span>
          </div>
          <span className="text-border-strong">|</span>
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span>Free delivery on orders above Rs. 8,000</span>
          </div>
          <span className="text-border-strong">|</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span>7 days easy returns</span>
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
                  <SizeChart isDropShoulder={isDropShoulder} isAcidWash={isAcidWash} />
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

        {/* ── Secure Checkout Badge ───────────────── */}
        <div className="flex items-center justify-center gap-2 border border-border rounded-none py-3 text-xs text-muted-foreground font-mono">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="uppercase tracking-wider font-semibold">100% Secure Checkout</span>
          <ShieldCheck className="h-4 w-4 text-emerald-500 ml-auto" />
        </div>

        {/* ── Accordion Sections ──────────────────── */}
        {product.category === "t-shirts" || product.category === "hoodies" ? (
          <ApparelAccordion product={product} />
        ) : (
          <div className="mt-8 border-t border-border/60">
            <AccordionItem title="Materials & Details">
              {product.subcategory === "tapestries" || product.subcategory === "flags"
                ? "100% High-definition digital sublimation printed satin wall tapestry with clean hemmed edges."
                : "Premium quality materials with precision printing and durable finishing."}
            </AccordionItem>
            <AccordionItem title="Shipping Information">
              <p>
                Standard delivery time is 3-5 working days across Pakistan, and 2-4 working days for
                Karachi. You will receive an instant order notification & confirmation update.
              </p>
            </AccordionItem>
            <AccordionItem title="Refund & Exchange">
              <p className="mb-2">
                We replace any defective or damaged products immediately upon delivery.
              </p>
              <p>
                For size adjustments or support, contact our team via WhatsApp or email at{" "}
                <span className="text-primary font-mono">deezprints69@gmail.com</span>.
              </p>
            </AccordionItem>
          </div>
        )}
      </div>
    </div>
  );
}
