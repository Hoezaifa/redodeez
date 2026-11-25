/**
 * Deez Prints GA4 Ecommerce Funnel Analytics Helper
 *
 * Implements standard GA4 recommended ecommerce events:
 * - view_item
 * - add_to_cart
 * - begin_checkout
 * - purchase
 * - search
 * - custom_print_started
 * - upload_started
 * - whatsapp_click
 *
 * All parameters conform to Google Analytics 4 schema.
 * Never captures PII (names, phone numbers, addresses, card info).
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

const ORDER_EVENT_STORAGE_KEY = "dp_tracked_order_events_v1";
const MAX_STORED_ORDER_EVENTS = 100;
const trackedOrderEvents = new Set<string>();

function readStoredOrderEvents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDER_EVENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function hasTrackedOrderEvent(key: string): boolean {
  if (trackedOrderEvents.has(key)) return true;
  const stored = readStoredOrderEvents();
  if (stored.includes(key)) {
    trackedOrderEvents.add(key);
    return true;
  }
  return false;
}

function markTrackedOrderEvent(key: string): void {
  trackedOrderEvents.add(key);
  if (typeof window === "undefined") return;
  try {
    const stored = readStoredOrderEvents();
    if (!stored.includes(key)) {
      const next = [...stored, key].slice(-MAX_STORED_ORDER_EVENTS);
      window.localStorage.setItem(ORDER_EVENT_STORAGE_KEY, JSON.stringify(next));
    }
  } catch {
    // Ignore storage quota or private-mode errors
  }
}

function sendMetaEvent(
  eventName: string,
  params: Record<string, any> = {},
  options?: Record<string, any>,
) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  if (options) {
    window.fbq("track", eventName, params, options);
  } else {
    window.fbq("track", eventName, params);
  }
}

function sendEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const eventPayload = {
    ...params,
    traffic_type: isLocalhost ? "internal" : "production",
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventPayload);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventPayload,
    });
  }
}

export const trackEvent = {
  viewItem: (item: { id: string; title: string; price: number; category?: string; subcategory?: string }) => {
    sendEvent("view_item", {
      currency: "PKR",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.title,
          price: item.price,
          item_category: item.category || "streetwear",
          item_category2: item.subcategory || "graphic",
        },
      ],
    });
    sendMetaEvent("ViewContent", {
      content_ids: [item.id],
      content_name: item.title,
      content_type: "product",
      content_category: item.category || "streetwear",
      currency: "PKR",
      value: item.price,
    });
  },

  addToCart: (item: { productId: string; title: string; price: number; qty?: number; size?: string; color?: string }) => {
    const qty = item.qty || 1;
    const value = item.price * qty;
    sendEvent("add_to_cart", {
      currency: "PKR",
      value,
      items: [
        {
          item_id: item.productId,
          item_name: item.title,
          price: item.price,
          quantity: qty,
          item_variant: [item.size, item.color].filter(Boolean).join(" / ") || undefined,
        },
      ],
    });
    sendMetaEvent("AddToCart", {
      content_ids: [item.productId],
      content_name: item.title,
      content_type: "product",
      currency: "PKR",
      value,
      num_items: qty,
    });
  },

  beginCheckout: (items: Array<{ productId: string; title: string; price: number; qty: number }>, total: number) => {
    sendEvent("begin_checkout", {
      currency: "PKR",
      value: total,
      items: items.map((i) => ({
        item_id: i.productId,
        item_name: i.title,
        price: i.price,
        quantity: i.qty,
      })),
    });
    sendMetaEvent("InitiateCheckout", {
      content_ids: items.map((i) => i.productId),
      content_type: "product",
      currency: "PKR",
      value: total,
      num_items: items.reduce((sum, i) => sum + i.qty, 0),
    });
  },

  purchase: (order: {
    orderId: string;
    total: number;
    items: Array<{ productId?: string; id?: string; title: string; price: number; qty: number }>;
    shipping?: number;
    paymentMethod?: string;
  }) => {
    const orderId = order.orderId?.trim();
    const contentIds = order.items.map((i) => i.productId || i.id || "").filter(Boolean);
    const numItems = order.items.reduce((sum, i) => sum + i.qty, 0);

    const gaItems = order.items.map((i) => ({
      item_id: i.productId || i.id || "",
      item_name: i.title,
      price: i.price,
      quantity: i.qty,
    }));

    const gaPurchaseKey = orderId ? `ga4_purchase:${orderId}` : "";
    if (!gaPurchaseKey || !hasTrackedOrderEvent(gaPurchaseKey)) {
      if (gaPurchaseKey) markTrackedOrderEvent(gaPurchaseKey);
      sendEvent("purchase", {
        transaction_id: order.orderId,
        currency: "PKR",
        value: order.total,
        shipping: order.shipping || 0,
        ...(order.paymentMethod ? { payment_type: order.paymentMethod } : {}),
        items: gaItems,
      });
    }

    const metaPurchaseKey = orderId ? `meta_purchase:${orderId}` : "";
    if (!metaPurchaseKey || !hasTrackedOrderEvent(metaPurchaseKey)) {
      if (metaPurchaseKey) markTrackedOrderEvent(metaPurchaseKey);
      sendMetaEvent(
        "Purchase",
        {
          content_ids: contentIds,
          content_type: "product",
          currency: "PKR",
          value: order.total,
          num_items: numItems,
          ...(order.paymentMethod ? { payment_method: order.paymentMethod } : {}),
        },
        orderId ? { eventID: orderId } : undefined,
      );
    }
  },

  search: (searchTerm: string, resultsCount: number) => {
    sendEvent("search", {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  },

  customPrintStarted: (productType: string) => {
    sendEvent("custom_print_started", {
      product_type: productType,
    });
  },

  uploadStarted: (fileCount: number) => {
    sendEvent("upload_started", {
      file_count: fileCount,
    });
  },

  whatsappClick: (context: string) => {
    sendEvent("whatsapp_click", {
      click_location: context,
    });
  },
};
