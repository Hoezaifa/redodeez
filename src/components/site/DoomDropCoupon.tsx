import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, Copy, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { PROMO_DOOM5 } from "@/lib/promo";
import { cn } from "@/lib/utils";

const SESSION_POPUP_SEEN_KEY = "deez_doom5_home_popup_seen_v1";

function isDoomRoute(pathname: string): boolean {
  const path = pathname.toLowerCase();
  if (path === "/doomsday" || path.startsWith("/doomsday/")) return true;
  if (path.startsWith("/products/")) {
    return /doctor-doom|dr-doom|doomsday|dooms-/.test(path);
  }
  return false;
}

export function DoomDropCoupon() {
  const location = useLocation();
  const { drawerOpen, appliedPromo, setAppliedPromo } = useCart();

  const isHome = location.pathname === "/";
  const isDoom = isDoomRoute(location.pathname);
  const shouldShowOnRoute = isHome || isDoom;

  const [homePopupOpen, setHomePopupOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const sidePanelRef = useRef<HTMLDivElement>(null);

  const isApplied = appliedPromo === PROMO_DOOM5;

  // Homepage: show compact centered popup once per session after a short beat
  useEffect(() => {
    if (!isHome) {
      setHomePopupOpen(false);
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_POPUP_SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }

    if (seen || isApplied) return;

    const timer = window.setTimeout(() => {
      setHomePopupOpen(true);
    }, 900);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome]);

  // Close side panel on route change
  useEffect(() => {
    setSideOpen(false);
  }, [location.pathname]);

  // Close with Escape
  useEffect(() => {
    if (!homePopupOpen && !sideOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (homePopupOpen) closeHomePopup();
        if (sideOpen) setSideOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [homePopupOpen, sideOpen]);

  // Click outside to close side panel
  useEffect(() => {
    if (!sideOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (sidePanelRef.current && !sidePanelRef.current.contains(e.target as Node)) {
        setSideOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [sideOpen]);

  if (!shouldShowOnRoute || drawerOpen) {
    return null;
  }

  const markHomePopupSeen = () => {
    try {
      sessionStorage.setItem(SESSION_POPUP_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const closeHomePopup = () => {
    markHomePopupSeen();
    setHomePopupOpen(false);
  };

  const handleApply = () => {
    setAppliedPromo(PROMO_DOOM5);
    markHomePopupSeen();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(PROMO_DOOM5);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      {/* ── 1. Homepage Compact Centered Popup (once per session) ── */}
      <AnimatePresence>
        {isHome && homePopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeHomePopup}
              className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="5% off coupon code"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[340px] bg-[#111111] border border-white/15 text-foreground shadow-[0_24px_64px_rgba(0,0,0,0.85)]"
            >
              {/* Crisp top accent rule */}
              <div aria-hidden="true" className="h-[2px] w-full bg-primary" />

              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  DEEZ PRINTS · DROP CODE
                </span>
                <button
                  type="button"
                  onClick={closeHomePopup}
                  aria-label="Close popup"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="p-4">
                <p className="font-display text-2xl font-black uppercase tracking-[-0.03em] leading-[0.94] text-foreground">
                  TAKE 5% OFF.
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground leading-snug">
                  Good on tees &amp; hoodies. Applied straight to your bag, no minimum.
                </p>

                <div className="mt-3.5 flex items-center justify-between border border-dashed border-white/20 bg-black/50 px-3 py-2">
                  <span className="font-mono text-sm font-bold tracking-[0.18em] text-foreground select-all">
                    {PROMO_DOOM5}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 text-[#4ade80]" />
                        <span className="text-[#4ade80]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {isApplied ? (
                  <div className="mt-2.5 flex items-center justify-between border border-[#34a860]/50 bg-[#121f17] px-3 py-2.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#6ee79a]">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      <span>5% Applied to Bag</span>
                    </span>
                    <button
                      type="button"
                      onClick={closeHomePopup}
                      className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground hover:text-primary cursor-pointer"
                    >
                      Shop
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleApply}
                    className="mt-2.5 w-full bg-primary py-2.5 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-foreground hover:text-background cursor-pointer"
                  >
                    Apply 5% at checkout
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 2. High-Visibility Right-Edge Pull Tab (Doom pages + Homepage after popup dismissed) ── */}
      {!homePopupOpen && !sideOpen && (
        <motion.button
          key="side-tab"
          type="button"
          initial={{ x: 48, opacity: 0 }}
          animate={
            isApplied
              ? { x: 0, opacity: 1 }
              : {
                  x: [0, -7, 0, -4, 0],
                  opacity: 1,
                }
          }
          transition={
            isApplied
              ? { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              : {
                  opacity: { duration: 0.3 },
                  x: {
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1.1,
                    repeat: Infinity,
                    repeatDelay: 5.5,
                  },
                }
          }
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSideOpen(true)}
          aria-label={isApplied ? "5% off code DOOM5 applied" : "Open 5% off coupon"}
          className={cn(
            "group fixed right-0 bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-40 overflow-hidden",
            "flex flex-col items-center justify-center gap-2 border-y border-l",
            "px-2 py-3.5 sm:px-3 sm:py-4.5",
            "shadow-[-6px_10px_28px_rgba(0,0,0,0.75)] transition-colors cursor-pointer select-none",
            isApplied
              ? "bg-[#101c15] border-[#34a860]/70 text-[#6ee79a] hover:border-[#4ade80]"
              : isDoom
                ? "bg-[#13241a] border-[#4ade80]/75 text-white hover:bg-[#193023] hover:border-[#4ade80]"
                : "bg-primary border-primary text-black hover:bg-foreground hover:border-foreground",
          )}
        >
          {/* Subtle diagonal metallic sheen sweep (only while unapplied) */}
          {!isApplied && (
            <motion.span
              aria-hidden="true"
              initial={{ y: "-140%" }}
              animate={{ y: ["-140%", "180%"] }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 5.15,
              }}
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-14 -skew-y-12",
                isDoom
                  ? "bg-gradient-to-b from-transparent via-[#86efac]/25 to-transparent"
                  : "bg-gradient-to-b from-transparent via-white/35 to-transparent",
              )}
            />
          )}

          {/* Left edge accent strip */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute left-0 top-0 bottom-0 w-[3px]",
              isApplied
                ? "bg-[#4ade80]"
                : isDoom
                  ? "bg-[#4ade80]"
                  : "bg-black/25",
            )}
          />

          <ChevronLeft
            className={cn(
              "relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5",
              isApplied ? "text-[#6ee79a]" : isDoom ? "text-[#4ade80]" : "text-black",
            )}
          />

          <span
            className={cn(
              "relative z-10 [writing-mode:vertical-rl] rotate-180 font-display text-[12px] sm:text-[14px] font-black uppercase tracking-[0.12em] leading-none",
              isApplied ? "text-[#6ee79a]" : isDoom ? "text-white" : "text-black",
            )}
          >
            {isApplied ? "5% ON" : "5% OFF"}
          </span>

          <span
            className={cn(
              "relative z-10 hidden sm:inline-block [writing-mode:vertical-rl] rotate-180 font-mono text-[9.5px] font-bold uppercase tracking-[0.18em] leading-none",
              isApplied
                ? "text-[#6ee79a]/75"
                : isDoom
                  ? "text-[#86efac]"
                  : "text-black/75",
            )}
          >
            {PROMO_DOOM5}
          </span>
        </motion.button>
      )}

      {/* ── 3. Short Compact Side Popover (anchored to right edge, never full-height) ── */}
      <AnimatePresence>
        {!homePopupOpen && sideOpen && (
          <motion.aside
            ref={sidePanelRef}
            role="dialog"
            aria-label="5% off coupon"
            initial={{ x: "100%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed right-0 bottom-16 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-40",
              "w-[272px] sm:w-[288px] bg-[#111111] border-y border-l border-white/15 text-foreground shadow-[-12px_12px_36px_rgba(0,0,0,0.75)]",
            )}
          >
            {/* Thin left edge accent */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 bottom-0 w-[2px]",
                isDoom || isApplied ? "bg-[#34a860]" : "bg-primary",
              )}
            />

            <div className="flex items-center justify-between border-b border-white/10 pl-3.5 pr-2 py-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
                5% OFF · {PROMO_DOOM5}
              </span>
              <button
                type="button"
                onClick={() => setSideOpen(false)}
                aria-label="Close coupon panel"
                className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="pl-3.5 pr-3 py-3">
              <div className="flex items-center justify-between border border-dashed border-white/20 bg-black/50 px-2.5 py-1.5">
                <span className="font-mono text-xs font-bold tracking-[0.18em] text-foreground select-all">
                  {PROMO_DOOM5}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-[#4ade80]" />
                      <span className="text-[#4ade80]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {isApplied ? (
                <div className="mt-2 flex items-center justify-between border border-[#34a860]/45 bg-[#121f17] px-2.5 py-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#6ee79a]">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                    <span>5% Applied to Bag</span>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleApply}
                  className={cn(
                    "mt-2 w-full py-2 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer",
                    isDoom
                      ? "bg-[#1a2920] text-[#e8f5ec] border border-[#34a860]/60 hover:bg-[#23382b] hover:border-[#4ade80]"
                      : "bg-primary text-primary-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  Apply 5% at checkout
                </button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
