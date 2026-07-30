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

export async function sendOrderTelegramNotification(payload: OrderPayload) {
  const TELEGRAM_BOT_TOKEN = "8279119193:AAFeJGDEKNfxDoMg4k8rWDWr6eJNWI91aac";
  const TELEGRAM_CHAT_ID = "6105402097";

  const hasCustom = payload.items.some((item) => item.isCustom);
  const headerIcon = hasCustom ? "🟠 *NEW CUSTOM ORDER*" : "🛒 *NEW DEEZ PRINTS ORDER*";

  const itemsList = payload.items
    .map((item) => {
      if (item.isCustom) {
        return [
          `🎨 *CUSTOM ITEM:* ${item.blankItem || item.title}`,
          `• *Color:* ${item.color || "N/A"}`,
          `• *Size:* ${item.size || "N/A"}`,
          `• *Placement:* ${item.placement || "N/A"}`,
          `• *Quantity:* ${item.qty}`,
          `• *Price:* Rs ${item.price.toLocaleString()}`,
          item.frontArtworkUrl ? `• *Front Artwork:* ${item.frontArtworkUrl}` : "",
          item.backArtworkUrl ? `• *Back Artwork:* ${item.backArtworkUrl}` : "",
        ]
          .filter(Boolean)
          .join("\n");
      }
      return `• *${item.title}* ${item.size ? `(Size: ${item.size})` : ""} x${item.qty} — Rs ${item.price.toLocaleString()}`;
    })
    .join("\n\n");

  const message = `${headerIcon}

*Order ID:* ${payload.orderId}
*Name:* ${payload.name}
*Phone:* ${payload.phone}
*Email:* ${payload.email || "N/A"}
*City:* ${payload.city}
*Address:* ${payload.address}
*Payment Method:* ${payload.paymentMethod}
${payload.notes ? `*Notes:* ${payload.notes}\n` : ""}
*Items Ordered:*
${itemsList}

*Subtotal:* Rs ${payload.subtotal.toLocaleString()}
*Shipping:* Rs ${payload.shipping.toLocaleString()}
*Total Amount:* Rs ${payload.total.toLocaleString()}

💬 *WhatsApp Direct:*
https://wa.me/${payload.phone.replace(/[^0-9]/g, "")}`;

  try {
    // 1. Send Telegram text message
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    // 2. Dispatch artwork images as Telegram photos if present
    const mediaGroup: Array<{ type: "photo"; media: string; caption?: string }> = [];

    payload.items.forEach((item) => {
      if (item.isCustom) {
        if (item.frontArtworkUrl && item.frontArtworkUrl.startsWith("http")) {
          mediaGroup.push({
            type: "photo",
            media: item.frontArtworkUrl,
            caption: `Order #${payload.orderId} — Front Artwork (${item.blankItem || "Custom"})`,
          });
        }
        if (item.backArtworkUrl && item.backArtworkUrl.startsWith("http")) {
          mediaGroup.push({
            type: "photo",
            media: item.backArtworkUrl,
            caption: `Order #${payload.orderId} — Back Artwork (${item.blankItem || "Custom"})`,
          });
        }
      }
    });

    if (mediaGroup.length === 1) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          photo: mediaGroup[0].media,
          caption: mediaGroup[0].caption,
        }),
      });
    } else if (mediaGroup.length > 1) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          media: mediaGroup,
        }),
      });
    }
  } catch (err) {
    console.error("Telegram notification dispatch error:", err);
  }
}
