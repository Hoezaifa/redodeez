/**
 * Deez Prints — Email Notification Templates
 *
 * Generates HTML + plain-text multipart email content for admin order alerts.
 * Designed for Gmail rendering on desktop and mobile. No marketing design.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  title: string;
  size?: string;
  color?: string;
  qty: number;
  price: number;
  isCustom?: boolean;
  placement?: string;
  blankItem?: string;
}

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
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  createdAt?: string;
}

// ─── HTML Escaping ────────────────────────────────────────────────────────────

function esc(text: string | undefined | null): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Separator ────────────────────────────────────────────────────────────────

const HR_HTML = `<tr><td style="padding:12px 0;"><hr style="border:none;border-top:1px solid #e4e4e7;margin:0;" /></td></tr>`;
const HR_PLAIN = "────────────────────────────────";

// ─── Format Helpers ───────────────────────────────────────────────────────────

function formatDate(iso?: string): { date: string; time: string } {
  const d = iso ? new Date(iso) : new Date();
  const date = d.toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-PK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { date, time };
}

function formatCurrency(amount: number): string {
  return `Rs ${amount.toLocaleString()}`;
}

// ─── HTML Template ────────────────────────────────────────────────────────────

export function buildOrderEmailHtml(order: OrderData): string {
  const isCustom =
    order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(order.createdAt);

  const itemRows = order.items
    .map((item) => {
      const title = item.isCustom
        ? `🎨 ${esc(item.blankItem || item.title)}`
        : esc(item.title);
      const meta = [
        item.size ? `Size: ${esc(item.size)}` : "",
        item.color ? `Color: ${esc(item.color)}` : "",
        item.isCustom && item.placement
          ? `Placement: ${esc(item.placement)}`
          : "",
      ]
        .filter(Boolean)
        .join(" · ");

      return `<tr>
        <td style="padding:4px 0;font-size:14px;color:#18181b;">
          <strong>${title}</strong> ×${item.qty}
          ${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}
        </td>
        <td style="padding:4px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;">
          ${formatCurrency(item.price * item.qty)}
        </td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">

<!-- Header -->
<tr><td style="background:#18181b;padding:24px 28px;">
  <h1 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:2px;">DEEZ PRINTS</h1>
  <p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">${label}</p>
</td></tr>

<!-- Order ID Badge -->
<tr><td style="padding:20px 28px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-size:13px;color:#71717a;">Order</td>
      <td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td>
    </tr>
    <tr>
      <td colspan="2" style="font-size:18px;font-weight:800;color:#18181b;padding-top:2px;">#${esc(order.orderId)}</td>
    </tr>
  </table>
</td></tr>

${HR_HTML}

<!-- Customer -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer</p>
  <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${esc(order.name)}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">📱 ${esc(order.phone)}</p>
  ${order.email ? `<p style="margin:2px 0 0;font-size:13px;color:#52525b;">✉️ ${esc(order.email)}</p>` : ""}
</td></tr>

${HR_HTML}

<!-- Products -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Products</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${itemRows}
  </table>
</td></tr>

${HR_HTML}

<!-- Totals -->
<tr><td style="padding:0 28px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Subtotal</td>
      <td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${formatCurrency(order.subtotal)}</td>
    </tr>
    <tr>
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td>
      <td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</td>
    </tr>
    ${order.discount ? `<tr>
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Discount</td>
      <td style="font-size:13px;color:#dc2626;text-align:right;padding:3px 0;">-${formatCurrency(order.discount)}</td>
    </tr>` : ""}
    <tr>
      <td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td>
      <td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${formatCurrency(order.total)}</td>
    </tr>
  </table>
</td></tr>

${HR_HTML}

<!-- Payment -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment</p>
  <p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${esc(order.paymentMethod)}</p>
</td></tr>

${HR_HTML}

<!-- Delivery Address -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p>
  <p style="margin:0;font-size:14px;color:#18181b;">${esc(order.city)}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">${esc(order.address)}</p>
</td></tr>

${order.notes ? `${HR_HTML}
<!-- Notes -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer Notes</p>
  <p style="margin:0;font-size:14px;color:#52525b;font-style:italic;">${esc(order.notes)}</p>
</td></tr>` : ""}

${HR_HTML}

<!-- Admin Link -->
<tr><td style="padding:0 28px 24px;" align="center">
  <a href="https://deezprints.store/admin" style="display:inline-block;background:#18181b;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:8px;letter-spacing:0.5px;">Open Admin Dashboard</a>
</td></tr>

<!-- Footer -->
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;">
  <p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Plain Text Template ──────────────────────────────────────────────────────

export function buildOrderEmailPlainText(order: OrderData): string {
  const isCustom =
    order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(order.createdAt);

  const itemLines = order.items
    .map((item) => {
      const title = item.isCustom
        ? `🎨 ${item.blankItem || item.title}`
        : item.title;
      const meta = [
        item.size ? `Size: ${item.size}` : "",
        item.color ? `Color: ${item.color}` : "",
        item.isCustom && item.placement ? `Placement: ${item.placement}` : "",
      ]
        .filter(Boolean)
        .join(" · ");
      return `  ${title} ×${item.qty} — ${formatCurrency(item.price * item.qty)}${meta ? `\n    ${meta}` : ""}`;
    })
    .join("\n");

  const parts = [
    HR_PLAIN,
    "DEEZ PRINTS",
    label,
    HR_PLAIN,
    "",
    `Order: #${order.orderId}`,
    `Date:  ${date} · ${time}`,
    "",
    HR_PLAIN,
    "Customer",
    HR_PLAIN,
    "",
    order.name,
    `Phone: ${order.phone}`,
    order.email ? `Email: ${order.email}` : "",
    "",
    HR_PLAIN,
    "Products",
    HR_PLAIN,
    "",
    itemLines,
    "",
    HR_PLAIN,
    `Subtotal:  ${formatCurrency(order.subtotal)}`,
    `Shipping:  ${order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}`,
    order.discount ? `Discount:  -${formatCurrency(order.discount)}` : "",
    `Total:     ${formatCurrency(order.total)}`,
    HR_PLAIN,
    "",
    `Payment: ${order.paymentMethod}`,
    "",
    HR_PLAIN,
    "Delivery Address",
    HR_PLAIN,
    "",
    order.city,
    order.address,
  ];

  if (order.notes) {
    parts.push("", HR_PLAIN, "Customer Notes", HR_PLAIN, "", order.notes);
  }

  parts.push(
    "",
    HR_PLAIN,
    "",
    "Admin: https://deezprints.store/admin",
    "",
    "Deez Prints — Streetwear. No limits.",
  );

  return parts.filter((line) => line !== undefined).join("\n");
}

// ─── Subject Line ─────────────────────────────────────────────────────────────

export function buildOrderEmailSubject(order: OrderData): string {
  const isCustom =
    order.orderType === "custom" || order.items.some((i) => i.isCustom);
  const prefix = isCustom ? "🎨" : "🛒";
  return `${prefix} New Order #${order.orderId} — Rs ${order.total.toLocaleString()}`;
}
