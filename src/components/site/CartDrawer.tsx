import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { site } from "@/data/site";
import { products } from "@/data/products";

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, setQty, remove, add, subtotal } = useCart();

  // "Complete the look" — random products with images, not already in cart
  const suggestions = useMemo(() => {
    const cartIds = new Set(lines.map((l) => l.productId));
    return products
      .filter((p) => p.images.length > 0 && !cartIds.has(p.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [lines]);



  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-60 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col border-l border-border bg-surface"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <p className="label-mono">Your bag ({lines.length})</p>
              <button type="button" aria-label="Close cart" onClick={() => setDrawerOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="display-md">Bag&apos;s empty</p>
                <Link
                  to="/collections"
                  onClick={() => setDrawerOpen(false)}
                  className="bg-primary px-6 py-3 label-mono text-primary-foreground"
                >
                  Shop all
                </Link>
              </div>
            ) : (
              <>
                {/* Shipping info */}
                <div className="border-b border-border px-5 py-3">
                  <p className="text-xs text-muted-foreground">
                    Shipping: <span className="text-primary font-semibold">Karachi Rs. 200</span> · <span className="text-primary font-semibold">Nationwide Rs. 300</span>
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Cart items */}
                  {lines.map((l) => (
                    <div key={l.id} className="flex gap-4 border-b border-border p-5">
                      <div className="h-28 w-22 shrink-0 overflow-hidden bg-elevated">
                        {l.image && (
                          <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="font-sans text-xs sm:text-sm font-bold uppercase leading-snug break-words">
                          {l.title}
                        </p>
                        <p className="label-mono mt-1 text-muted-foreground">
                          {[l.size, l.color].filter(Boolean).join(" / ") || "One size"}
                        </p>
                        {l.note && <p className="mt-1 text-xs text-muted-foreground">{l.note}</p>}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(l.id, l.qty - 1)}
                              className="px-2 py-1.5 hover:text-primary active:scale-90 transition-transform"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <motion.span
                              key={l.qty}
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.15 }}
                              className="w-7 text-center font-mono text-xs"
                            >
                              {l.qty}
                            </motion.span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(l.id, l.qty + 1)}
                              className="px-2 py-1.5 hover:text-primary active:scale-90 transition-transform"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="label-mono">{formatPrice(l.price * l.qty)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => remove(l.id)}
                        className="self-start text-muted-foreground hover:text-primary active:scale-90 transition-transform"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {/* Complete the look */}
                  {suggestions.length > 0 && (
                    <div className="border-b border-border px-5 py-5">
                      <p className="label-mono text-muted-foreground">Complete the look</p>
                      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                        {suggestions.map((p) => (
                          <div key={p.id} className="flex w-[140px] shrink-0 flex-col">
                            <Link
                              to="/products/$productId"
                              params={{ productId: p.id }}
                              onClick={() => setDrawerOpen(false)}
                              className="aspect-[4/5] overflow-hidden bg-elevated"
                            >
                              <img
                                src={p.images[0]}
                                alt={p.title}
                                loading="lazy"
                                className="h-full w-full object-cover img-zoom"
                              />
                            </Link>
                            <p className="mt-2 text-xs font-semibold uppercase leading-snug break-words">
                              {p.title}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="label-mono text-muted-foreground text-[10px]">
                                {formatPrice(p.price)}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  add({
                                    productId: p.id,
                                    title: p.title,
                                    price: p.price,
                                    image: p.images[0],
                                    size: "M",
                                    qty: 1,
                                  })
                                }
                                className="label-mono text-[10px] text-primary hover:underline"
                              >
                                + Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border p-5">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-muted-foreground">Subtotal</span>
                    <span className="font-display text-xl font-extrabold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="label-mono mt-2 text-muted-foreground">
                    Karachi Rs. 200 · Nationwide Rs. 300
                  </p>
                  <div className="mt-5 grid gap-2">
                    <Link
                      to="/checkout"
                      onClick={() => setDrawerOpen(false)}
                      className="bg-primary py-4 text-center label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                    >
                      Checkout
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setDrawerOpen(false)}
                      className="border border-border-strong py-4 text-center label-mono hover:border-primary hover:text-primary"
                    >
                      View bag
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
