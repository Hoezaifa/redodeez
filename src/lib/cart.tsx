import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  qty: number;
  note?: string;
  isCustom?: boolean;
  frontArtworkUrl?: string;
  backArtworkUrl?: string;
  placement?: string;
  blankItem?: string;
};

export type CartToastInfo = {
  productId: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  timestamp: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "id">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  wishlist: string[];
  toggleWish: (id: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  lastAdded: CartToastInfo | null;
  dismissToast: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "deez-cart-v1";
const WKEY = "deez-wishlist-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartToastInfo | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
      const w = localStorage.getItem(WKEY);
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem(WKEY, JSON.stringify(wishlist));
    } catch {
      /* ignore */
    }
  }, [wishlist]);

  const value = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (line) => {
      const id = [
        line.productId,
        line.size ?? "",
        line.color ?? "",
        line.note ?? "",
        line.frontArtworkUrl ?? "",
        line.placement ?? "",
      ].join("|");
      setLines((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + line.qty } : l));
        }
        return [...prev, { ...line, id }];
      });
      // Do NOT auto-open drawer per UX spec. Trigger toast & badge animation instead.
      setLastAdded({
        productId: line.productId,
        title: line.title,
        price: line.price,
        image: line.image,
        size: line.size,
        timestamp: Date.now(),
      });
    };
    return {
      lines,
      add,
      remove: (id) => setLines((p) => p.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setLines((p) =>
          qty <= 0 ? p.filter((l) => l.id !== id) : p.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      wishlist,
      toggleWish: (id) =>
        setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
      drawerOpen,
      setDrawerOpen,
      lastAdded,
      dismissToast: () => setLastAdded(null),
    };
  }, [lines, wishlist, drawerOpen, lastAdded]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
