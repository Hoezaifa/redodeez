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
  },

  addToCart: (item: { productId: string; title: string; price: number; qty?: number; size?: string; color?: string }) => {
    sendEvent("add_to_cart", {
      currency: "PKR",
      value: item.price * (item.qty || 1),
      items: [
        {
          item_id: item.productId,
          item_name: item.title,
          price: item.price,
          quantity: item.qty || 1,
          item_variant: [item.size, item.color].filter(Boolean).join(" / ") || undefined,
        },
      ],
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
  },

  purchase: (order: {
    orderId: string;
    total: number;
    items: Array<{ productId?: string; id?: string; title: string; price: number; qty: number }>;
    shipping?: number;
  }) => {
    sendEvent("purchase", {
      transaction_id: order.orderId,
      currency: "PKR",
      value: order.total,
      shipping: order.shipping || 0,
      items: order.items.map((i) => ({
        item_id: i.productId || i.id || "",
        item_name: i.title,
        price: i.price,
        quantity: i.qty,
      })),
    });
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
