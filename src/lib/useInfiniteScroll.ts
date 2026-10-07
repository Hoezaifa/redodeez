import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/**
 * Shared infinite-scroll hook for product grids.
 *
 * Because Deez Prints' catalogue is loaded in-memory (static data file),
 * this hook performs client-side progressive rendering rather than
 * server-round-trip pagination. The full sorted/filtered list is passed
 * in, and the hook reveals it in batches as the user scrolls.
 *
 * Features:
 * - IntersectionObserver-based sentinel (no scroll-event handlers)
 * - Configurable batch size and root margin
 * - Duplicate-free, deterministic rendering
 * - Resets when the input list identity changes (filter/sort/collection change)
 * - Exposes a "Load More" callback as a manual fallback
 * - Reports loading, hasMore, and displayedCount for UI
 */

export interface UseInfiniteScrollOptions {
  /** Number of items to show per batch */
  batchSize?: number;
  /** IntersectionObserver root margin (e.g. "200px") */
  rootMargin?: string;
  /** Optional key to trigger reset when filters/query/sort changes */
  resetKey?: string | number;
}

export interface UseInfiniteScrollResult<T> {
  /** The currently-visible slice of items */
  visibleItems: T[];
  /** Ref to attach to the sentinel element at the bottom of the grid */
  sentinelRef: React.RefCallback<HTMLElement>;
  /** Whether more items remain to be shown */
  hasMore: boolean;
  /** Whether a "load" is in progress (simulated short delay for UX) */
  isLoading: boolean;
  /** Manual load-more trigger (fallback button) */
  loadMore: () => void;
  /** Total items in the full list */
  totalCount: number;
  /** Number of currently visible items */
  displayedCount: number;
}

export function useInfiniteScroll<T>(
  allItems: T[],
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollResult<T> {
  const { batchSize = 24, rootMargin = "400px", resetKey } = options;

  // Track how many items to show
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);

  // Compute a list signature to detect changes even if reference is recreated
  const listSignature = useMemo(() => {
    if (resetKey !== undefined) return String(resetKey);
    const len = allItems.length;
    const first = len > 0 ? (allItems[0] as any)?.id ?? (allItems[0] as any) : "";
    const last = len > 0 ? (allItems[len - 1] as any)?.id ?? (allItems[len - 1] as any) : "";
    return `${len}-${first}-${last}`;
  }, [allItems, resetKey]);

  // Reset visible count when the input list changes (new filter/sort/collection)
  useEffect(() => {
    setVisibleCount(batchSize);
    setIsLoading(false);
  }, [listSignature, batchSize]);

  const hasMore = visibleCount < allItems.length;

  const visibleItems = useMemo(
    () => allItems.slice(0, visibleCount),
    [allItems, visibleCount]
  );

  // Guard against concurrent loads
  const loadingRef = useRef(false);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setIsLoading(true);

    // Small delay for a smooth visual transition — since data is in-memory
    // this prevents a jarring instant paint and gives the loading indicator
    // a moment to appear.
    requestAnimationFrame(() => {
      setVisibleCount((prev) => Math.min(prev + batchSize, allItems.length));
      setIsLoading(false);
      loadingRef.current = false;
    });
  }, [hasMore, batchSize, allItems.length]);

  // IntersectionObserver callback ref for the sentinel element
  const observerRef = useRef<IntersectionObserver | null>(null);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !hasMore) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            loadMore();
          }
        },
        { rootMargin }
      );

      observerRef.current.observe(node);
    },
    [hasMore, loadMore, rootMargin]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    visibleItems,
    sentinelRef,
    hasMore,
    isLoading,
    loadMore,
    totalCount: allItems.length,
    displayedCount: visibleItems.length,
  };
}
