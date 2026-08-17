import { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Edit2,
  RotateCcw,
  Check,
  X,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Tag,
  Layers,
  ChevronRight,
} from "lucide-react";
import { products as baseProducts, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import {
  getProductOverridesFn,
  saveProductOverrideFn,
  deleteProductOverrideFn,
} from "@/lib/productFunctions";

interface ProductOverrideData {
  title?: string;
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
}

const ADMIN_PIN = "0000";

const STANDARD_SIZES = ["S", "M", "L", "XL", "XXL", "3XL"];

export function ProductsView() {
  const [overrides, setOverrides] = useState<Record<string, ProductOverrideData>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load product overrides from DB on mount
  const loadOverrides = async () => {
    try {
      setRefreshing(true);
      const data = await getProductOverridesFn();
      if (data && typeof data === "object") {
        setOverrides(data);
        return;
      }
    } catch {
      /* fallback below */
    }

    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setOverrides(data.overrides || {});
      }
    } catch (err) {
      console.warn("Failed to load product overrides:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOverrides().finally(() => setLoading(false));
  }, []);

  // Compute merged products array
  const mergedProducts = useMemo(() => {
    return baseProducts.map((base) => {
      const ov = overrides[base.id];
      if (!ov) return base;
      return {
        ...base,
        ...(ov.title !== undefined ? { title: ov.title } : {}),
        ...(ov.price !== undefined ? { price: ov.price } : {}),
        ...(ov.description !== undefined ? { description: ov.description } : {}),
        ...(ov.sizes !== undefined ? { sizes: ov.sizes } : {}),
        ...(ov.colors !== undefined ? { colors: ov.colors } : {}),
      };
    });
  }, [overrides]);

  // Counts
  const overriddenCount = Object.keys(overrides).length;

  // Collection tabs definitions
  const tabs = [
    { id: "regular", label: "Regular", filter: (p: Product) => p.subcategory === "regular" },
    { id: "drop-shoulder", label: "Drop Shlder", filter: (p: Product) => p.subcategory === "drop-shoulder" },
    { id: "acid-wash", label: "Acid", filter: (p: Product) => p.subcategory === "acid-wash" },
    { id: "hoodies", label: "Hoodies", filter: (p: Product) => p.subcategory === "hoodies" },
    { id: "wall-art", label: "Wall Art", filter: (p: Product) => ["tapestries", "flags"].includes(p.subcategory) },
    { id: "accessories", label: "Accessories", filter: (p: Product) => p.category === "accessories" },
    { id: "overridden", label: `Edited (${overriddenCount})`, filter: (p: Product) => Boolean(overrides[p.id]) },
    { id: "all", label: "All Products", filter: () => true },
  ];

  // Filter products by tab & search query
  const filteredProducts = useMemo(() => {
    const tabObj = tabs.find((t) => t.id === activeTab) || tabs[tabs.length - 1];
    return mergedProducts.filter((p) => {
      const matchesTab = tabObj.filter(p);
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [mergedProducts, activeTab, searchQuery, overrides]);

  // Save handler for modal
  const handleSaveProduct = async (productId: string, updatedData: ProductOverrideData) => {
    let fnError: Error | null = null;
    try {
      const newOverrides = await saveProductOverrideFn({
        data: {
          productId,
          ...updatedData,
        },
      });
      if (newOverrides && typeof newOverrides === "object") {
        setOverrides(newOverrides);
        return;
      }
    } catch (err: any) {
      console.warn("saveProductOverrideFn failed:", err);
      fnError = err;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-PIN": ADMIN_PIN,
        },
        body: JSON.stringify({
          productId,
          ...updatedData,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.overrides) {
          setOverrides(data.overrides);
          return;
        }
      }
    } catch {
      /* ignore REST fallback error */
    }

    if (fnError) {
      throw fnError;
    }
    throw new Error("Failed to save product changes");
  };

  // Reset handler
  const handleResetProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to reset this product to its original catalog defaults?")) {
      return;
    }

    let fnError: Error | null = null;
    try {
      const newOverrides = await deleteProductOverrideFn({ data: productId });
      if (newOverrides && typeof newOverrides === "object") {
        setOverrides(newOverrides);
        return;
      }
    } catch (err: any) {
      console.warn("deleteProductOverrideFn failed:", err);
      fnError = err;
    }

    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(productId)}`, {
        method: "DELETE",
        headers: {
          "X-Admin-PIN": ADMIN_PIN,
        },
      });

      if (res.ok) {
        setOverrides((prev) => {
          const next = { ...prev };
          delete next[productId];
          return next;
        });
        return;
      }
    } catch {
      /* ignore REST fallback error */
    }

    if (fnError) {
      alert(fnError.message || "Failed to reset product override.");
    } else {
      alert("Failed to reset product override.");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white">Products</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/30">
              {mergedProducts.length} total
            </span>
            {overriddenCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {overriddenCount} modified
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            Live catalog overrides — edit prices, descriptions, and size options instantly across your store.
          </p>
        </div>

        <button
          onClick={loadOverrides}
          disabled={refreshing}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-primary" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs & Search controls */}
      <div className="space-y-3">
        {/* Collection Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-white/[0.08]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-black shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, ID, or collection..."
            className="w-full bg-zinc-900/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:border-primary/50 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product List Grid */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary mx-auto" />
          <p className="text-xs font-mono text-zinc-500">Loading catalog data...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center border border-white/10 rounded-2xl bg-zinc-900/30 p-8 space-y-3">
          <ShoppingBag className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-sm font-bold text-zinc-300">No products found</p>
          <p className="text-xs text-zinc-500">
            No products match the selected collection filter or search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const isOverridden = Boolean(overrides[product.id]);
            const baseProduct = baseProducts.find((b) => b.id === product.id) || product;
            const hasCustomPrice = isOverridden && overrides[product.id]?.price !== undefined;
            const currentPrice = product.price;
            const originalPrice = baseProduct.price;

            const sizeSummary = product.sizes && product.sizes.length > 0
              ? product.sizes.join(", ")
              : "Standard Sizes";

            return (
              <div
                key={product.id}
                className={`group relative rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                  isOverridden
                    ? "bg-amber-950/10 border-amber-500/30 hover:border-amber-500/50"
                    : "bg-zinc-900/40 border-white/[0.08] hover:border-white/20"
                }`}
              >
                <div>
                  {/* Top Row: Thumbnail + Info */}
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail Image (Read-only reference) */}
                    <div className="relative w-16 h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-950 border border-white/10 group-hover:border-primary/40 transition-colors">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-zinc-400 text-center py-0.5 tracking-tight border-t border-white/10">
                        REF IMG
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase text-primary tracking-wider truncate">
                          {product.subcategory.replace(/-/g, " ")}
                        </span>
                        {isOverridden && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                            LIVE EDIT
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-extrabold uppercase text-white tracking-wide truncate mt-0.5">
                        {product.title}
                      </h3>

                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5 truncate">
                        ID: {product.id}
                      </p>

                      {/* Price Section */}
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-sm font-black font-mono text-white">
                          {formatPrice(currentPrice)}
                        </span>
                        {hasCustomPrice && currentPrice !== originalPrice && (
                          <span className="text-[11px] font-mono text-zinc-500 line-through">
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Options Summary */}
                  <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span className="font-mono text-zinc-500 uppercase text-[10px]">Sizes:</span>
                      <span className="font-mono font-semibold text-zinc-300 truncate max-w-[200px] text-right">
                        {sizeSummary}
                      </span>
                    </div>
                    {product.description && (
                      <div className="text-[11px] text-zinc-400 line-clamp-2 mt-1 italic">
                        &ldquo;{product.description}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-primary" /> Edit Details
                  </button>

                  {isOverridden && (
                    <button
                      onClick={() => handleResetProduct(product.id)}
                      title="Reset product to baseline defaults"
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer shrink-0"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Edit Modal */}
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          baseProduct={baseProducts.find((b) => b.id === editingProduct.id) || editingProduct}
          isOverridden={Boolean(overrides[editingProduct.id])}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
          onReset={handleResetProduct}
        />
      )}
    </div>
  );
}

// ─── Modal Editor Component ──────────────────────────────────────────────────

function ProductEditModal({
  product,
  baseProduct,
  isOverridden,
  onClose,
  onSave,
  onReset,
}: {
  product: Product;
  baseProduct: Product;
  isOverridden: boolean;
  onClose: () => void;
  onSave: (id: string, data: ProductOverrideData) => Promise<void>;
  onReset: (id: string) => Promise<void>;
}) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState<number | string>(product.price);
  const [description, setDescription] = useState(product.description || "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    product.sizes && product.sizes.length > 0 ? product.sizes : STANDARD_SIZES
  );
  const [customSizeInput, setCustomSizeInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const addCustomSize = () => {
    if (!customSizeInput.trim()) return;
    const clean = customSizeInput.trim().toUpperCase();
    if (!selectedSizes.includes(clean)) {
      setSelectedSizes((prev) => [...prev, clean]);
    }
    setCustomSizeInput("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setErrorMsg("Please enter a valid price in PKR.");
      return;
    }

    try {
      setSaving(true);
      await onSave(product.id, {
        title: title.trim(),
        price: numPrice,
        description: description.trim(),
        sizes: selectedSizes,
      });

      setSuccessMsg("✓ Product updated successfully! Live website updated.");
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to save product edits.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag className="w-5 h-5 m-auto text-zinc-500" />
              )}
            </div>
            <div>
              <h2 className="text-base font-extrabold uppercase text-white tracking-wide">
                Edit Product
              </h2>
              <p className="text-[11px] font-mono text-zinc-400">
                ID: {product.id} · {product.subcategory}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Product Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Product Title / Name
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Price (PKR)
              </label>
              <span className="text-[10px] font-mono text-zinc-500">
                Original: {formatPrice(baseProduct.price)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-zinc-500">
                PKR
              </span>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-14 pr-4 py-2.5 text-sm text-white font-mono font-bold focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description or details to show on the product page..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:border-primary outline-none transition-colors"
            />
          </div>

          {/* Sizes Selector */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Available Sizes / Options
            </label>

            {/* Standard Quick Chips */}
            <div className="flex flex-wrap gap-2">
              {STANDARD_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground border border-primary shadow-md"
                        : "bg-zinc-900 text-zinc-400 border border-white/10 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Custom Sizes Tag List */}
            {selectedSizes.filter((s) => !STANDARD_SIZES.includes(s)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedSizes
                  .filter((s) => !STANDARD_SIZES.includes(s))
                  .map((size) => (
                    <span
                      key={size}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-zinc-800 text-primary border border-primary/30 flex items-center gap-1.5"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => toggleSize(size)}
                        className="hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
              </div>
            )}

            {/* Add Custom Size Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomSize();
                  }
                }}
                placeholder="Add custom option (e.g. 4XL, One Size)..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:border-primary outline-none"
              />
              <button
                type="button"
                onClick={addCustomSize}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {isOverridden ? (
              <button
                type="button"
                onClick={async () => {
                  await onReset(product.id);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset to Original
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-orange-600 text-primary-foreground text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
