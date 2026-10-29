import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, ChevronLeft, X, Check, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PROMO_FIRSTDROP } from "@/lib/promo";

export function FirstOrderOfferTab() {
  const location = useLocation();
  const {
    drawerOpen,
    isFirstOrderClaimed,
    claimFirstOrderOffer,
    appliedPromo,
    isOfferOpen,
    setIsOfferOpen,
    count,
  } = useCart();

  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Hide on checkout or admin pages
  const isCheckout = location.pathname.startsWith("/checkout");
  const isAdmin = location.pathname.startsWith("/cocnballs");

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOfferOpen) {
        setIsOfferOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOfferOpen, setIsOfferOpen]);

  // Click outside to close panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOfferOpen(false);
      }
    };
    if (isOfferOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOfferOpen, setIsOfferOpen]);

  if (isCheckout || isAdmin) {
    return null;
  }

  const isApplied = isFirstOrderClaimed || appliedPromo === PROMO_FIRSTDROP;

  const handleClaim = () => {
    claimFirstOrderOffer();
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(PROMO_FIRSTDROP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* ── Compact Floating Tab Attached to Right Edge ── */}
      {/* Hidden when cart drawer or offer panel is active */}
      {!drawerOpen && !isOfferOpen && (
        <button
          type="button"
          onClick={() => setIsOfferOpen(true)}
          aria-label={isApplied ? "First order discount claimed" : "Unlock 10% off first order"}
          className="fixed right-0 z-40 top-[48%] sm:top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 bg-[#121212]/95 hover:bg-zinc-900 text-white pl-2.5 sm:pl-3 pr-2 py-2.5 sm:py-3 rounded-l-xl border-y border-l border-orange-500/90 shadow-xl transition-all duration-200 hover:-translate-x-1 focus:outline-none focus:ring-2 focus:ring-orange-500 select-none group"
        >
          {/* Outlined Ticket Icon */}
          <div className="flex flex-col items-center">
            {isApplied ? (
              <div className="relative">
                <Ticket className="w-4 h-4 text-emerald-400 stroke-[2]" />
                <Check className="w-2.5 h-2.5 text-emerald-400 absolute -bottom-1 -right-1 stroke-[3]" />
              </div>
            ) : (
              <Ticket className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-orange-500 stroke-[1.8]" />
            )}
          </div>

          {/* Offer text */}
          <div className="flex flex-col items-start text-left leading-none">
            <span className="font-display font-black text-xs sm:text-[13px] tracking-tight text-orange-500 group-hover:text-orange-400">
              10% OFF
            </span>
            <span className="font-mono text-[7.5px] sm:text-[8.5px] font-bold tracking-widest text-zinc-300 uppercase mt-0.5">
              {isApplied ? "CLAIMED" : "FIRST ORDER"}
            </span>
          </div>

          {/* Subtle chevron */}
          <ChevronLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-400 transition-transform group-hover:-translate-x-0.5 ml-0.5" />
        </button>
      )}

      {/* ── Slide-Out Offer Panel / Modal ── */}
      <AnimatePresence>
        {isOfferOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOfferOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-out Sheet on Right Edge */}
            <motion.div
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="offer-panel-title"
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm sm:max-w-md bg-[#121212] border-l border-zinc-800 text-white shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Header / Close */}
              <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 grid place-items-center">
                    <Ticket className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-orange-400">
                    Exclusive Welcome Drop
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOfferOpen(false)}
                  aria-label="Close offer panel"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <h2
                    id="offer-panel-title"
                    className="font-display text-2xl sm:text-[26px] font-black uppercase tracking-tight text-white leading-tight"
                  >
                    Your first Deez Prints order,{" "}
                    <span className="text-orange-500">10% off.</span>
                  </h2>
                  <p className="mt-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    Join the drop. Unlock 10% off heavyweight acid wash, oversized tees, tapestries and standard streetwear pieces.
                  </p>
                </div>

                {/* Coupon Code Block */}
                <div className="bg-zinc-900/90 border border-orange-500/30 rounded-lg p-3.5 flex items-center justify-between">
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                      Promo Code
                    </span>
                    <span className="font-mono text-base font-black text-orange-400 tracking-wider">
                      {PROMO_FIRSTDROP}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="border border-zinc-700 hover:border-orange-500 text-zinc-300 hover:text-orange-400 px-3 py-1.5 rounded text-xs font-mono transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Status Indicator */}
                {isApplied ? (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">10% discount applied!</p>
                      <p className="text-[11px] text-emerald-400/80 mt-0.5">
                        Code <strong>{PROMO_FIRSTDROP}</strong> will be automatically calculated on your merchandise in your bag and checkout.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs text-zinc-400 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-zinc-300 font-bold">Auto-applied at checkout</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Click below to lock in your discount. It persists as you browse and automatically calculates your rupee savings.
                      </p>
                    </div>
                  </div>
                )}

                {/* Brief Terms */}
                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-300 font-bold block mb-1.5">
                    Offer Terms & Details:
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-zinc-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      First-order customers only; 10% off merchandise.
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      Excludes delivery / courier shipping charges.
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      Cannot be stacked with other promo codes.
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      Excludes unpriced custom quotes and bulk orders.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 space-y-2.5">
                {!isApplied ? (
                  <button
                    type="button"
                    onClick={handleClaim}
                    className="w-full bg-primary hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest py-3.5 px-5 rounded transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>Unlock my 10%</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setIsOfferOpen(false)}
                      className="w-full bg-primary hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest py-3.5 px-5 rounded transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <span>10% Unlocked · Start Shopping</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {count > 0 && (
                      <Link
                        to="/cart"
                        onClick={() => setIsOfferOpen(false)}
                        className="w-full block text-center border border-zinc-700 hover:border-white text-zinc-300 hover:text-white font-mono text-xs py-2.5 rounded transition-colors"
                      >
                        View Bag & Savings ({count} items)
                      </Link>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsOfferOpen(false)}
                  className="w-full text-center text-zinc-500 hover:text-zinc-400 font-mono text-[10px] tracking-wider uppercase py-1"
                >
                  Continue browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
