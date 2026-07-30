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
    qty: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

export async function sendOrderTelegramNotification(payload: OrderPayload) {
  const TELEGRAM_BOT_TOKEN = "8279119193:AAFeJGDEKNfxDoMg4k8rWDWr6eJNWI91aac";
  const TELEGRAM_CHAT_ID = "6105402097";

  const itemsList = payload.items
    .map(
      (item) =>
        `• *${item.title}* ${item.size ? `(Size: ${item.size})` : ""} x${item.qty} — Rs ${item.price.toLocaleString()}`
    )
    .join("\n");

  const message = `🛒 *NEW DEEZ PRINTS ORDER*

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
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Telegram notification dispatch error:", err);
  }
}
