export interface OrderPayload {
  orderId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: string;
  items: Array<{
    id: string;
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
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  orderType?: "normal" | "custom";
  createdAt?: string;
  status?: "Pending" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function dataURLtoBlob(dataurl: string): Blob {
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch {
    return new Blob([], { type: "image/png" });
  }
}

export async function sendOrderTelegramNotification(payload: OrderPayload) {
  const TELEGRAM_BOT_TOKEN = "8279119193:AAFeJGDEKNfxDoMg4k8rWDWr6eJNWI91aac";
  const TELEGRAM_CHAT_ID = "6105402097";

  const hasCustom = payload.items.some((item) => item.isCustom);
  const headerIconHtml = hasCustom
    ? "🟠 <b>NEW CUSTOM ORDER</b>"
    : "🛒 <b>NEW DEEZ PRINTS ORDER</b>";
  const headerIconPlain = hasCustom ? "🟠 NEW CUSTOM ORDER" : "🛒 NEW DEEZ PRINTS ORDER";

  // Build HTML formatted items list
  const itemsListHtml = payload.items
    .map((item) => {
      if (item.isCustom) {
        const parts = [
          `🎨 <b>CUSTOM ITEM:</b> ${escapeHtml(item.blankItem || item.title)}`,
          `• <b>Color:</b> ${escapeHtml(item.color || "N/A")}`,
          `• <b>Size:</b> ${escapeHtml(item.size || "N/A")}`,
          `• <b>Placement:</b> ${escapeHtml(item.placement || "N/A")}`,
          `• <b>Quantity:</b> ${item.qty}`,
          `• <b>Price:</b> Rs ${(item.price || 0).toLocaleString()}`,
        ];

        if (item.frontArtworkUrl) {
          if (item.frontArtworkUrl.startsWith("http")) {
            parts.push(
              `• <b>Front Artwork:</b> <a href="${escapeHtml(item.frontArtworkUrl)}">View Image</a>`,
            );
          } else {
            parts.push(`• <b>Front Artwork:</b> Custom Image Attached`);
          }
        }

        if (item.backArtworkUrl) {
          if (item.backArtworkUrl.startsWith("http")) {
            parts.push(
              `• <b>Back Artwork:</b> <a href="${escapeHtml(item.backArtworkUrl)}">View Image</a>`,
            );
          } else {
            parts.push(`• <b>Back Artwork:</b> Custom Image Attached`);
          }
        }

        return parts.join("\n");
      }
      return `• <b>${escapeHtml(item.title)}</b> ${item.size ? `(Size: ${escapeHtml(item.size)})` : ""} x${item.qty} — Rs ${(item.price || 0).toLocaleString()}`;
    })
    .join("\n\n");

  // Build Plain Text items list (Fallback that NEVER fails parsing)
  const itemsListPlain = payload.items
    .map((item) => {
      if (item.isCustom) {
        const parts = [
          `🎨 CUSTOM ITEM: ${item.blankItem || item.title}`,
          `• Color: ${item.color || "N/A"}`,
          `• Size: ${item.size || "N/A"}`,
          `• Placement: ${item.placement || "N/A"}`,
          `• Quantity: ${item.qty}`,
          `• Price: Rs ${(item.price || 0).toLocaleString()}`,
        ];

        if (item.frontArtworkUrl && item.frontArtworkUrl.startsWith("http")) {
          parts.push(`• Front Artwork: ${item.frontArtworkUrl}`);
        }
        if (item.backArtworkUrl && item.backArtworkUrl.startsWith("http")) {
          parts.push(`• Back Artwork: ${item.backArtworkUrl}`);
        }

        return parts.join("\n");
      }
      return `• ${item.title} ${item.size ? `(Size: ${item.size})` : ""} x${item.qty} — Rs ${(item.price || 0).toLocaleString()}`;
    })
    .join("\n\n");

  const cleanPhone = (payload.phone || "").replace(/[^0-9]/g, "");

  const messageHtml = `${headerIconHtml}

<b>Order ID:</b> ${escapeHtml(payload.orderId)}
<b>Name:</b> ${escapeHtml(payload.name)}
<b>Phone:</b> ${escapeHtml(payload.phone)}
<b>Email:</b> ${escapeHtml(payload.email || "N/A")}
<b>City:</b> ${escapeHtml(payload.city)}
<b>Address:</b> ${escapeHtml(payload.address)}
<b>Payment Method:</b> ${escapeHtml(payload.paymentMethod)}
${payload.notes ? `<b>Notes:</b> ${escapeHtml(payload.notes)}\n` : ""}
<b>Items Ordered:</b>
${itemsListHtml}

<b>Subtotal:</b> Rs ${(payload.subtotal || 0).toLocaleString()}
<b>Shipping:</b> Rs ${(payload.shipping || 0).toLocaleString()}
<b>Total Amount:</b> Rs ${(payload.total || 0).toLocaleString()}

💬 <b>WhatsApp Direct:</b>
https://wa.me/${cleanPhone}`;

  const messagePlain = `${headerIconPlain}

Order ID: ${payload.orderId}
Name: ${payload.name}
Phone: ${payload.phone}
Email: ${payload.email || "N/A"}
City: ${payload.city}
Address: ${payload.address}
Payment Method: ${payload.paymentMethod}
${payload.notes ? `Notes: ${payload.notes}\n` : ""}
Items Ordered:
${itemsListPlain}

Subtotal: Rs ${(payload.subtotal || 0).toLocaleString()}
Shipping: Rs ${(payload.shipping || 0).toLocaleString()}
Total Amount: Rs ${(payload.total || 0).toLocaleString()}

WhatsApp Direct:
https://wa.me/${cleanPhone}`;

  // 1. Send Main Text Message (HTML Mode first, with automatic Plain Text fallback)
  try {
    let textRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageHtml,
        parse_mode: "HTML",
        disable_web_page_preview: false,
      }),
    });

    if (!textRes.ok) {
      const errText = await textRes.text();
      console.warn("Telegram HTML sendMessage failed, trying Plain Text fallback:", errText);

      // Plain Text Fallback (Guaranteed to succeed, zero formatting rules)
      textRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messagePlain,
        }),
      });

      if (!textRes.ok) {
        console.error("Telegram Plain Text sendMessage also failed:", await textRes.text());
      }
    }
  } catch (err) {
    console.error("Telegram sendMessage network error:", err);
  }

  // 2. Dispatch Artwork Images directly to Telegram as Photos
  for (const item of payload.items) {
    if (item.isCustom) {
      // Front Artwork Photo
      if (item.frontArtworkUrl) {
        try {
          if (item.frontArtworkUrl.startsWith("http")) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                photo: item.frontArtworkUrl,
                caption: `Order #${payload.orderId} — Front Artwork (${item.blankItem || "Custom"})`,
              }),
            });
          } else if (item.frontArtworkUrl.startsWith("data:")) {
            const blob = dataURLtoBlob(item.frontArtworkUrl);
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID);
            formData.append("photo", blob, `order-${payload.orderId}-front.png`);
            formData.append(
              "caption",
              `Order #${payload.orderId} — Front Artwork (${item.blankItem || "Custom"})`,
            );

            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: "POST",
              body: formData,
            });
          }
        } catch (photoErr) {
          console.warn("Telegram front photo send failed:", photoErr);
        }
      }

      // Back Artwork Photo
      if (item.backArtworkUrl) {
        try {
          if (item.backArtworkUrl.startsWith("http")) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                photo: item.backArtworkUrl,
                caption: `Order #${payload.orderId} — Back Artwork (${item.blankItem || "Custom"})`,
              }),
            });
          } else if (item.backArtworkUrl.startsWith("data:")) {
            const blob = dataURLtoBlob(item.backArtworkUrl);
            const formData = new FormData();
            formData.append("chat_id", TELEGRAM_CHAT_ID);
            formData.append("photo", blob, `order-${payload.orderId}-back.png`);
            formData.append(
              "caption",
              `Order #${payload.orderId} — Back Artwork (${item.blankItem || "Custom"})`,
            );

            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
              method: "POST",
              body: formData,
            });
          }
        } catch (photoErr) {
          console.warn("Telegram back photo send failed:", photoErr);
        }
      }
    }
  }
}
