import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, Check } from "lucide-react";
import { LOGO_URL, navLinks, collections } from "@/data/site";
import { useCart } from "@/lib/cart";
import { SearchModal } from "@/components/site/SearchModal";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Header() {
  const { count, setDrawerOpen, wishlist, lastAdded, dismissToast } = useCart();
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Auto-dismiss cart toast after 4 seconds
  useEffect(() => {
    if (!lastAdded) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [lastAdded, dismissToast]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > prev && y > 240 && !shopOpen);
  });

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <motion.header
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setShopOpen(false)}
      >
        <div className="hidden overflow-hidden border-b border-border bg-background md:block">
          <div className="flex whitespace-nowrap py-2">
            <div className="flex animate-marquee gap-16 pr-16">
              {Array.from({ length: 2 }).map((_, k) => (
                <div key={k} className="flex shrink-0 gap-16">
                  {[
                    "Flat Rs. 200 nationwide delivery",
                    "Free shipping above Rs. 5,000",
                    "Meezan, Easypaisa & JazzCash accepted",
                    "7-day exchange",
                    "Printed in Karachi",
                  ].map((t) => (
                    <span key={t} className="label-mono text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "edge relative border-b transition-colors duration-500",
            solid || shopOpen
              ? "border-border bg-background/95 backdrop-blur-md"
              : "border-transparent bg-linear-to-b from-background/80 to-transparent",
          )}
        >
          {/* Main nav row — logo left, icons right, desktop nav centered */}
          <div className="flex items-center" style={{ width: "100%" }}>
            <Link to="/" className="flex items-center py-4 active:scale-95 transition-transform" style={{ flexShrink: 0 }}>
              <img src={LOGO_URL} alt="Deez Prints" className="h-7 w-auto md:h-8" />
            </Link>

            <nav className="hidden items-center justify-center gap-8 lg:flex" style={{ flex: 1 }}>
              {navLinks.map((l) => {
                const isActive =
                  l.to === "/" ? location.pathname === "/" : location.pathname.startsWith(l.to);

                return (
                  <div
                    key={l.to}
                    onMouseEnter={() => setShopOpen(l.label === "Shop")}
                    className="relative py-5"
                  >
                    <Link
                      to={l.to}
                      className={cn(
                        "label-mono whitespace-nowrap transition-colors duration-200 hover:text-primary",
                        isActive ? "text-foreground font-bold" : "text-muted-foreground",
                      )}
                    >
                      {l.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-5" style={{ marginLeft: "auto", flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="hover:text-primary active:scale-95 transition-transform cursor-pointer"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <Link
                to="/account"
                aria-label="Account"
                className="hidden hover:text-primary active:scale-95 transition-transform sm:block"
              >
                <User className="h-[18px] w-[18px]" />
              </Link>
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative hidden hover:text-primary active:scale-95 transition-transform sm:block"
              >
                <Heart className="h-[18px] w-[18px]" />
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center bg-primary px-1 font-mono text-[10px] text-primary-foreground"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>
              <button
                type="button"
                aria-label="Open cart"
                onClick={() => setDrawerOpen(true)}
                className="relative hover:text-primary active:scale-95 transition-transform cursor-pointer"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: [1.4, 0.95, 1], opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center bg-primary px-1 font-mono text-[10px] text-primary-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </button>
              <button
                type="button"
                aria-label="Menu"
                onClick={() => setOpen(true)}
                className="lg:hidden active:scale-95 transition-transform cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cart Toast Notification — positioned absolutely, outside flex flow */}
          <AnimatePresence>
            {lastAdded && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-4 top-full mt-2 z-50 w-72 sm:w-80 rounded border border-border bg-background/95 p-3.5 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2">
                  <span className="flex items-center gap-1.5 font-sans text-xs font-bold text-emerald-500 uppercase tracking-wide">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> Added to Cart
                  </span>
                  <button
                    type="button"
                    onClick={dismissToast}
                    className="text-muted-foreground hover:text-foreground text-xs p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-3 py-2.5">
                  {lastAdded.image && (
                    <img
                      src={lastAdded.image}
                      alt=""
                      className="h-11 w-11 rounded object-cover bg-surface shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-bold text-foreground uppercase">
                      {lastAdded.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {lastAdded.size ? `Size: ${lastAdded.size} • ` : ""}
                      {formatPrice(lastAdded.price)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={dismissToast}
                    className="flex-1 py-1.5 text-center text-xs font-semibold label-mono border border-border rounded hover:bg-surface transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      dismissToast();
                      setDrawerOpen(true);
                    }}
                    className="flex-1 py-1.5 text-center text-xs font-semibold label-mono bg-primary text-primary-foreground rounded hover:bg-foreground hover:text-background transition-colors"
                  >
                    View Cart
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {shopOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md"
            >
              <div className="edge py-8 grid grid-cols-4 gap-8">
                {collections.map((c) => (
                  <Link
                    key={c.slug}
                    to="/collections/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setShopOpen(false)}
                    className="group flex flex-col gap-3"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-surface rounded">
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-full w-full object-cover group-hover:scale-105"
                        style={{ transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                      />
                    </div>
                    <span className="font-display text-sm font-extrabold uppercase group-hover:text-primary transition-colors">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-60 bg-background/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 z-70 flex h-full w-4/5 max-w-sm flex-col bg-background border-r border-border p-6 lg:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <img src={LOGO_URL} alt="Deez Prints" className="h-6 w-auto" />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block font-display text-xl font-extrabold uppercase hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
