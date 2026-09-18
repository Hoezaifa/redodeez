import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { products, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";

const QUICK_TAGS = ["Hoodies", "Acid Wash", "T-Shirts", "Mugs", "Drop Shoulder", "Tapestries"];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          // Open signal handled if parent passes setter or we add window event
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const queryLower = query.trim().toLowerCase();
  const queryTokens = queryLower.split(/\s+/).filter(Boolean);

  // Suggested category/page destinations
  const suggestedPage = useMemo(() => {
    if (!queryLower) return null;
    if (queryLower.includes("custom") || queryLower.includes("print")) {
      return {
        title: "Custom Printing Studio",
        desc: "Upload your own high-res artwork for DTF printing on tees & hoodies",
        to: "/custom-print",
      };
    }
    if (queryLower.includes("tapestr") || queryLower.includes("wall art") || queryLower.includes("flag")) {
      return {
        title: "Tapestries Collection",
        desc: "Browse 33 high-definition satin wall tapestries & aesthetic decor",
        to: "/collections/tapestries",
      };
    }
    if (queryLower.includes("hoodie")) {
      return {
        title: "Hoodies Collection",
        desc: "Oversized heavyweight streetwear hoodies with thermal brushed interior",
        to: "/collections/hoodies",
      };
    }
    if (queryLower.includes("acid")) {
      return {
        title: "Acid Wash Collection",
        desc: "Vintage mineral acid wash graphic tees",
        to: "/collections/acid-wash",
      };
    }
    if (queryLower.includes("drop") || queryLower.includes("shoulder")) {
      return {
        title: "Drop Shoulder Collection",
        desc: "240+ GSM oversized drop-shoulder graphic tees",
        to: "/collections/drop-shoulder",
      };
    }
    return null;
  }, [queryLower]);

  const results: Product[] = useMemo(() => {
    if (!queryLower || queryTokens.length === 0) return [];

    return products
      .filter((p) => {
        const titleL = p.title.toLowerCase();
        const catL = p.category.toLowerCase();
        const subcatL = p.subcategory.toLowerCase();
        const aestheticL = (p.aesthetic || "").toLowerCase();
        const descL = (p.description || "").toLowerCase();

        // Synonym expansion
        const isOnePieceQuery = queryLower.includes("one piece");
        if (isOnePieceQuery && (titleL.includes("luffy") || titleL.includes("zoro") || titleL.includes("gear 5"))) {
          return true;
        }

        const isHoodieQuery = queryLower.includes("hoodie");
        if (isHoodieQuery && (catL.includes("hoodie") || subcatL.includes("hoodie"))) {
          return true;
        }

        const isTapestryQuery = queryLower.includes("tapestr") || queryLower.includes("wall art");
        if (isTapestryQuery && (catL === "tapestries" || subcatL === "tapestries" || subcatL === "flags")) {
          return true;
        }

        // Match tokens against searchable fields
        return queryTokens.every(
          (t) =>
            titleL.includes(t) ||
            catL.includes(t) ||
            subcatL.includes(t) ||
            aestheticL.includes(t) ||
            descL.includes(t)
        );
      })
      .slice(0, 8);
  }, [queryLower, queryTokens]);

  // Track search analytics with 600ms debounce
  useEffect(() => {
    if (!queryLower || queryLower.length < 2) return;
    const timer = setTimeout(() => {
      trackEvent.search(queryLower, results.length);
    }, 600);
    return () => clearTimeout(timer);
  }, [queryLower, results.length]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/15 bg-zinc-950 text-white shadow-2xl z-10"
          >
            {/* Input Bar */}
            <div className="relative flex items-center border-b border-white/10 px-4 py-4 sm:px-6">
              <Search className="h-5 w-5 text-white/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, hoodies, acid wash..."
                className="w-full bg-transparent px-4 py-1 text-base sm:text-lg font-sans text-white placeholder:text-white/40 focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-block rounded border border-white/20 px-2 py-0.5 text-[10px] font-mono text-white/40">
                  ESC
                </kbd>
              )}
            </div>

            {/* Quick Tags / Results Container */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
              {!query.trim() ? (
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40">
                    Popular Searches
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {QUICK_TAGS.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setQuery(tag)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="grid gap-2">
                  {suggestedPage && (
                    <div className="mb-2">
                      <p className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold mb-1">
                        Featured Destination
                      </p>
                      <Link
                        to={suggestedPage.to as any}
                        onClick={onClose}
                        className="group flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                            {suggestedPage.title}
                          </p>
                          <p className="text-xs text-white/60 font-mono mt-0.5">
                            {suggestedPage.desc}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-orange-400 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                      </Link>
                    </div>
                  )}
                  <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
                    Products ({results.length})
                  </p>
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to="/products/$productId"
                      params={{ productId: p.id }}
                      onClick={onClose}
                      className="group flex items-center gap-4 rounded-lg p-2.5 hover:bg-white/10 transition-colors"
                    >
                      <div className="h-14 w-12 shrink-0 overflow-hidden rounded bg-zinc-800">
                        {p.images[0] && (
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="h-full w-full object-cover img-zoom"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold uppercase tracking-wider text-white truncate">
                          {p.title}
                        </p>
                        <p className="text-xs text-white/50 font-mono mt-0.5">
                          {p.category} · {p.subcategory.replace(/-/g, " ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-orange-400">
                          {formatPrice(p.price)}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all ml-1" />
                    </Link>
                  ))}
                </div>
              ) : suggestedPage ? (
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold mb-2">
                    Matching Destination
                  </p>
                  <Link
                    to={suggestedPage.to as any}
                    onClick={onClose}
                    className="group flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                        {suggestedPage.title}
                      </p>
                      <p className="text-xs text-white/60 font-mono mt-0.5">
                        {suggestedPage.desc}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-orange-400 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                  </Link>
                </div>
              ) : (
                <div className="py-8 text-center text-white/50">
                  <p className="text-sm">No products matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-white/30 mt-1">
                    Try searching for &apos;hoodie&apos;, &apos;t-shirt&apos;, &apos;tapestry&apos;, or &apos;custom print&apos;.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6 bg-white/[0.02]">
              <span className="text-[11px] font-mono text-white/40">
                Press <kbd className="text-white/70">ESC</kbd> to close
              </span>
              <Link
                to="/collections"
                onClick={onClose}
                className="text-xs font-mono uppercase text-orange-400 hover:underline inline-flex items-center gap-1"
              >
                View all products <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
