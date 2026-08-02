import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Tag } from "lucide-react";
import { products, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

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

  const results: Product[] = query.trim()
    ? products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.subcategory.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8)
    : [];

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
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
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
              ) : (
                <div className="py-8 text-center text-white/50">
                  <p className="text-sm">No products matching &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-white/30 mt-1">
                    Try searching for &apos;hoodie&apos;, &apos;t-shirt&apos;, or &apos;acid
                    wash&apos;.
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
