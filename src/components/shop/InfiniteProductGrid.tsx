import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { useInfiniteScroll } from "@/lib/useInfiniteScroll";

/**
 * InfiniteProductGrid — shared product grid with infinite scroll.
 *
 * Replaces numbered pagination across collection/shop pages with a
 * seamless scroll-to-load experience while preserving SEO crawlable
 * pagination links as a hidden <nav>.
 */

interface InfiniteProductGridProps {
  /** Full sorted+filtered product list (already in memory) */
  products: Product[];
  /** Number of items per batch (default 24) */
  batchSize?: number;
  /** Whether products are "coming soon" preview (forwarded to ProductCard) */
  isComingSoon?: boolean;
  /** Optional: current search params for SEO pagination links */
  searchParams?: Record<string, unknown>;
  /** Optional: base route path for SEO pagination links (e.g. "/collections") */
  paginationBasePath?: string;
  /** Key to force reset (e.g. stringified filter state) */
  resetKey?: string;
}

export function InfiniteProductGrid({
  products,
  batchSize = 24,
  isComingSoon = false,
  searchParams,
  paginationBasePath,
  resetKey,
}: InfiniteProductGridProps) {
  const {
    visibleItems,
    sentinelRef,
    hasMore,
    isLoading,
    loadMore,
    totalCount,
    displayedCount,
  } = useInfiniteScroll(products, { batchSize, resetKey });

  const totalPages = Math.max(1, Math.ceil(totalCount / batchSize));

  return (
    <>
      {/* Product Grid */}
      <div className="mt-4 md:mt-6 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-4 md:gap-x-4 md:gap-y-8">
        {visibleItems.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            isComingSoon={isComingSoon}
          />
        ))}
      </div>

      {/* Loading sentinel + indicator */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center gap-4 py-12">
          {/* Dedicated sentinel observed by IntersectionObserver */}
          <div
            ref={sentinelRef as React.RefCallback<HTMLDivElement>}
            className="h-1 w-full"
            aria-hidden="true"
          />

          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground" aria-live="polite">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="label-mono text-xs">Loading more…</span>
            </div>
          )}

          {/* Load More fallback button — always visible when there are more items */}
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-2.5 label-mono text-xs border border-border hover:border-primary hover:text-primary transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Load More ({displayedCount} of {totalCount})
          </button>
        </div>
      )}

      {/* End-of-results indicator */}
      {!hasMore && totalCount > batchSize && (
        <div className="flex items-center justify-center py-8">
          <span className="label-mono text-xs text-muted-foreground">
            All {totalCount} products shown
          </span>
        </div>
      )}

      {/* SEO-only crawlable pagination links (visually hidden, available to bots) */}
      {paginationBasePath && totalPages > 1 && (
        <nav
          aria-label="Catalogue pagination"
          className="sr-only"
        >
          <p>
            Page 1 of {totalPages}
          </p>
          <ul>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p}>
                <Link
                  to={paginationBasePath as any}
                  search={{
                    ...searchParams,
                    page: p === 1 ? undefined : p,
                  } as any}
                >
                  Page {p}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
