/**
 * Deez Prints — Telegram Notification Service (v2)
 *
 * Fresh rewrite: clean HTML templates, dynamic credentials from Admin Settings,
 * artwork dispatch, connection testing, and re-send capability.
 */

import { getAdminSettings, type StoredOrder } from "./ordersStore";

// ─── Legacy compat export (used by checkout.tsx) ──────────────────────────────

export type { StoredOrder as OrderPayload } from "./ordersStore";

// ─── Credential Resolution ────────────────────────────────────────────────────

function getCredentials() {
  const s = getAdminSettings();
  return {
    token: s.telegramBotToken,
    chatId: s.telegramChatId,
    apiBase: (s.telegramApiBase || "https://api.telegram.org").replace(/\/$/, ""),
    enabled: s.enableNotifications,
    sendArtwork: s.sendArtwork,
  };
}

// ─── HTML Escaping ────────────────────────────────────────────────────────────

function esc(text: string | undefined | null): string {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── Message Builder ──────────────────────────────────────────────────────────

function buildOrderMessage(order: StoredOrder): { html: string; plain: string } {
  const isCustom = order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const icon = isCustom ? "🟠" : "🟢";
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const sep = "━━━━━━━━━━━━━━";

  // Items HTML
  const itemsHtml = order.items
    .map((item) => {
      if (item.isCustom) {
        const parts = [
          `  🎨 <b>${esc(item.blankItem || item.title)}</b>`,
          `  • Color: ${esc(item.color || "N/A")}`,
          `  • Size: ${esc(item.size || "N/A")}`,
          `  • Placement: ${esc(item.placement || "N/A")}`,
          `  • Qty: ${item.qty}`,
          `  • Price: Rs ${(item.price || 0).toLocaleString()}`,
        ];
        if (item.frontArtworkUrl?.startsWith("http")) {
          parts.push(`  • <a href="${esc(item.frontArtworkUrl)}">Front Artwork ↗</a>`);
        }
        if (item.backArtworkUrl?.startsWith("http")) {
          parts.push(`  • <a href="${esc(item.backArtworkUrl)}">Back Artwork ↗</a>`);
        }
        return parts.join("\n");
      }
      return `  • <b>${esc(item.title)}</b> ${item.size ? `(${esc(item.size)})` : ""} ×${item.qty} — Rs ${(item.price || 0).toLocaleString()}`;
    })
    .join("\n\n");

  // Items plain
  const itemsPlain = order.items
    .map((item) => {
      if (item.isCustom) {
        const parts = [
          `  🎨 ${item.blankItem || item.title}`,
          `  • Color: ${item.color || "N/A"}`,
          `  • Size: ${item.size || "N/A"}`,
          `  • Placement: ${item.placement || "N/A"}`,
          `  • Qty: ${item.qty}`,
          `  • Price: Rs ${(item.price || 0).toLocaleString()}`,
        ];
        if (item.frontArtworkUrl?.startsWith("http")) parts.push(`  • Front: ${item.frontArtworkUrl}`);
        if (item.backArtworkUrl?.startsWith("http")) parts.push(`  • Back: ${item.backArtworkUrl}`);
        return parts.join("\n");
      }
      return `  • ${item.title} ${item.size ? `(${item.size})` : ""} ×${item.qty} — Rs ${(item.price || 0).toLocaleString()}`;
    })
    .join("\n\n");

  const cleanPhone = (order.phone || "").replace(/[^0-9]/g, "");
  const date = new Date(order.createdAt).toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `${icon} <b>${label}</b>
${sep}

<b>Order:</b>  ${esc(order.orderId)}
<b>Date:</b>   ${date}
<b>Customer:</b> ${esc(order.name)}
<b>Phone:</b>  ${esc(order.phone)}
<b>Email:</b>  ${esc(order.email || "N/A")}
<b>City:</b>   ${esc(order.city)}
<b>Address:</b> ${esc(order.address)}

${sep}
<b>📦 Items:</b>

${itemsHtml}

${sep}
<b>Payment:</b> ${esc(order.paymentMethod)}

<b>Subtotal:</b>  Rs ${(order.subtotal || 0).toLocaleString()}
<b>Shipping${order.deliveryLocation ? ` (${order.deliveryLocation} / ${order.shippingMethod || "Courier"})` : ""}:</b>  Rs ${(order.shipping || 0).toLocaleString()}${order.discount ? `\n<b>Discount:</b>  -Rs ${order.discount.toLocaleString()}` : ""}
<b>Total:</b>     <b>Rs ${(order.total || 0).toLocaleString()}</b>
${sep}${order.notes ? `\n<b>Notes:</b> ${esc(order.notes)}` : ""}

💬 <a href="https://wa.me/${cleanPhone}">WhatsApp Customer ↗</a>`;

  const plain = `${icon} ${label}
${sep}

Order: ${order.orderId}
Date: ${date}
Customer: ${order.name}
Phone: ${order.phone}
Email: ${order.email || "N/A"}
City: ${order.city}
Address: ${order.address}

${sep}
Items:

${itemsPlain}

${sep}
Payment: ${order.paymentMethod}

Subtotal: Rs ${(order.subtotal || 0).toLocaleString()}
Shipping${order.deliveryLocation ? ` (${order.deliveryLocation} / ${order.shippingMethod || "Courier"})` : ""}: Rs ${(order.shipping || 0).toLocaleString()}${order.discount ? `\nDiscount: -Rs ${order.discount.toLocaleString()}` : ""}
Total: Rs ${(order.total || 0).toLocaleString()}
${sep}${order.notes ? `\nNotes: ${order.notes}` : ""}

WhatsApp: https://wa.me/${cleanPhone}`;

  return { html, plain };
}

// ─── Send Functions ───────────────────────────────────────────────────────────

/** Helper to send requests to Telegram API via Vercel proxy or direct fallback */
async function callTelegramApi(token: string, endpoint: string, payload: any, customApiBase?: string): Promise<{ ok: boolean; status?: number; data?: any; error?: string }> {
  // 1. Try Vercel Serverless Endpoint /api/telegram (runs on server outside Pakistan, NO VPN needed!)
  try {
    const proxyRes = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint, token, payload }),
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      return { ok: !!data.ok, status: proxyRes.status, data, error: data.description };
    }
  } catch (proxyErr) {
    // /api/telegram proxy unreachable (e.g. local vite dev without vercel function server)
  }

  // 2. Direct fallback (for local dev or custom proxy URL)
  const base = (customApiBase || getCredentials().apiBase).replace(/\/$/, "");
  const directUrl = `${base}/bot${token}/${endpoint}`;

  try {
    const directRes = await fetch(directUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await directRes.json();
    return { ok: !!data.ok, status: directRes.status, data, error: data.description };
  } catch (err) {
    return {
      ok: false,
      error: `Unable to reach Telegram (${String(err)}). If testing locally without WARP, note that production Vercel deployment routes automatically through serverless proxy.`,
    };
  }
}

async function sendTelegramText(token: string, chatId: string, html: string, plain: string, apiBase?: string) {
  // Try HTML first
  let res = await callTelegramApi(
    token,
    "sendMessage",
    { chat_id: chatId, text: html, parse_mode: "HTML", disable_web_page_preview: false },
    apiBase,
  );

  if (!res.ok) {
    console.warn("Telegram HTML failed, trying plain text:", res.error);
    res = await callTelegramApi(
      token,
      "sendMessage",
      { chat_id: chatId, text: plain },
      apiBase,
    );
    if (!res.ok) {
      console.error("Telegram plain text also failed:", res.error);
    }
  }

  return res.ok;
}

async function sendTelegramPhoto(token: string, chatId: string, url: string, caption: string, apiBase?: string) {
  try {
    const res = await callTelegramApi(
      token,
      "sendPhoto",
      { chat_id: chatId, photo: url, caption },
      apiBase,
    );
    if (!res.ok) console.warn("Photo send failed:", res.error);
  } catch (err) {
    console.warn("Photo send error:", err);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Send order notification to Telegram. Called from checkout. */
export async function sendOrderTelegramNotification(order: StoredOrder): Promise<boolean> {
  const { token, chatId, apiBase, enabled, sendArtwork } = getCredentials();
  if (!enabled || !token || !chatId) return false;

  const { html, plain } = buildOrderMessage(order);
  const textOk = await sendTelegramText(token, chatId, html, plain, apiBase);

  // Send artwork images if enabled
  if (sendArtwork) {
    for (const item of order.items) {
      if (!item.isCustom) continue;
      if (item.frontArtworkUrl?.startsWith("http")) {
        await sendTelegramPhoto(
          token, chatId, item.frontArtworkUrl,
          `Order #${order.orderId} — Front Artwork (${item.blankItem || "Custom"})`,
          apiBase,
        );
      }
      if (item.backArtworkUrl?.startsWith("http")) {
        await sendTelegramPhoto(
          token, chatId, item.backArtworkUrl,
          `Order #${order.orderId} — Back Artwork (${item.blankItem || "Custom"})`,
          apiBase,
        );
      }
    }
  }

  return textOk;
}

/** Re-send notification for an existing order (Admin Dashboard) */
export async function resendOrderTelegramNotification(order: StoredOrder): Promise<boolean> {
  return sendOrderTelegramNotification(order);
}

/** Send status update notification */
export async function sendStatusUpdateNotification(
  order: StoredOrder,
  newStatus: string,
): Promise<boolean> {
  const { token, chatId, apiBase, enabled } = getCredentials();
  const settings = getAdminSettings();
  if (!enabled || !settings.notifyStatusChanges || !token || !chatId) return false;

  const statusEmoji: Record<string, string> = {
    Pending: "⏳",
    Processing: "🔄",
    Dispatched: "🚚",
    Delivered: "✅",
    Cancelled: "❌",
  };

  const msg = `${statusEmoji[newStatus] || "📋"} <b>STATUS UPDATE</b>

<b>Order:</b> ${esc(order.orderId)}
<b>Customer:</b> ${esc(order.name)}
<b>New Status:</b> <b>${esc(newStatus)}</b>${order.trackingNumber ? `\n<b>Tracking:</b> ${esc(order.trackingNumber)}` : ""}`;

  return sendTelegramText(token, chatId, msg, msg.replace(/<[^>]+>/g, ""), apiBase);
}

/** Test Telegram bot connection */
export async function testTelegramConnection(
  token?: string,
  chatId?: string,
  customApiBase?: string,
): Promise<{ ok: boolean; botName?: string; error?: string }> {
  const creds = getCredentials();
  const t = token || creds.token;
  const c = chatId || creds.chatId;

  if (!t || !c) return { ok: false, error: "Bot token and Chat ID are required" };

  // Test getMe via callTelegramApi
  const meRes = await callTelegramApi(t, "getMe", {}, customApiBase);
  if (!meRes.ok) return { ok: false, error: meRes.error || "Invalid bot token or network issue" };

  // Test sending a message
  const testRes = await callTelegramApi(
    t,
    "sendMessage",
    { chat_id: c, text: "✅ Deez Prints Bot — Connection test successful!" },
    customApiBase,
  );

  if (!testRes.ok) return { ok: false, error: testRes.error || "Failed to send test message" };

  return { ok: true, botName: meRes.data?.result?.first_name || "Deez Prints Bot" };
}
