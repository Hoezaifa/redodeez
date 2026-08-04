/**
 * Deez Prints — Unified Notification Dispatcher
 *
 * Single entry point for server-side order notifications.
 * Executes all notification channels in parallel via Promise.allSettled —
 * a failure in one channel never affects the other.
 *
 * Note: Telegram notifications are sent client-side from checkout.tsx
 * via sendOrderTelegramNotification(). This dispatcher handles only
 * server-side channels (currently: Email).
 */

import { sendOrderEmailNotification } from "./sendEmailOrder";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderData {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  orderType?: string;
  items: {
    title: string;
    size?: string;
    color?: string;
    qty: number;
    price: number;
    isCustom?: boolean;
    frontArtworkUrl?: string;
    backArtworkUrl?: string;
    placement?: string;
    blankItem?: string;
  }[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  status?: string;
  createdAt?: string;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Dispatch all server-side order notifications in parallel.
 * Called from api/orders.ts after a successful order insert.
 *
 * Uses Promise.allSettled — if one channel fails, others still execute.
 * Never throws. Never blocks order response.
 */
export async function sendOrderNotifications(order: OrderData): Promise<void> {
  try {
    const results = await Promise.allSettled([
      sendOrderEmailNotification(order),
      // Future channels can be added here:
      // sendOrderWhatsAppNotification(order),
      // sendOrderSlackNotification(order),
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[Notifications] Channel error:", result.reason);
      }
    }
  } catch (err) {
    // Absolute safety net — should never reach here
    console.error("[Notifications] Dispatcher error:", err);
  }
}

export { sendOrderEmailNotification } from "./sendEmailOrder";
