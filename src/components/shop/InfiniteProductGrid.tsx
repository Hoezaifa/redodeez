import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

/**
 * Continuous product grid displaying all matching active products in one
 * continuous list without requiring additional clicks, load-more triggers,
 * or pagination slicing.
 *
 * All matching product links are included in the initial HTML for complete
 * crawler and customer discoverability. Images below the fold are lazy-loaded.
 */

interface InfiniteProductGridProps {
  /** Full sorted+filtered product list */
  products: Product[];
  /** Deprecated legacy prop retained for interface compatibility */
  batchSize?: number;
  /** Whether products are "coming soon" preview (forwarded to ProductCard) */
  isComingSoon?: boolean;
  /** Deprecated legacy prop retained for interface compatibility */
  searchParams?: Record<string, unknown>;
  /** Deprecated legacy prop retained for interface compatibility */
  paginationBasePath?: string;
  /** Deprecated legacy prop retained for interface compatibility */
  resetKey?: string;
}

export function InfiniteProductGrid({
  products,
  isComingSoon = false,
}: InfiniteProductGridProps) {
  return (
    <>
      {/* Complete Continuous Product Grid */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-8">
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            isComingSoon={isComingSoon}
          />
        ))}
      </div>

      {/* Complete Catalogue Status */}
      {products.length > 0 && (
        <div className="flex items-center justify-center py-10 md:py-12 border-t border-border/40 mt-8 md:mt-12">
          <span className="label-mono text-xs text-muted-foreground uppercase tracking-widest">
            All {products.length} matching pieces shown
          </span>
        </div>
      )}
    </>
  );
}

// Alias for clean naming
export { InfiniteProductGrid as ContinuousProductGrid };
