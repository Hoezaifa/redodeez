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

export function buildOrderEmailHtml(order: any): string {
  const o = order || {};
  const itemsList = Array.isArray(o.items) ? o.items : [];
  const isCustom = o.orderType === "custom" || itemsList.some((i: any) => i && i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(o.createdAt);

  const itemRows = itemsList
    .map((item: any) => {
      if (!item) return "";
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
          <strong>${title}</strong> ×${item.qty || 1}
          ${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}
        </td>
        <td style="padding:4px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;">
          ${formatCurrency((item.price || 0) * (item.qty || 1))}
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
      <td colspan="2" style="font-size:18px;font-weight:800;color:#18181b;padding-top:2px;">#${esc(o.orderId || "N/A")}</td>
    </tr>
  </table>
</td></tr>

${HR_HTML}

<!-- Customer -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer</p>
  <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;">${esc(o?.name || "N/A")}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">📱 ${esc(o?.phone || "N/A")}</p>
  ${o?.email ? `<p style="margin:2px 0 0;font-size:13px;color:#52525b;">✉️ ${esc(o.email)}</p>` : ""}
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
      <td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${formatCurrency(o.subtotal || 0)}</td>
    </tr>
    <tr>
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td>
      <td style="font-size:13px;color:#18181b;text-align:right;padding:3px 0;">${(o.shipping || 0) === 0 ? "FREE" : formatCurrency(o.shipping)}</td>
    </tr>
    ${o.discount ? `<tr>
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Discount</td>
      <td style="font-size:13px;color:#dc2626;text-align:right;padding:3px 0;">-${formatCurrency(o.discount)}</td>
    </tr>` : ""}
    <tr>
      <td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td>
      <td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${formatCurrency(o.total || 0)}</td>
    </tr>
  </table>
</td></tr>

${HR_HTML}

<!-- Payment -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment</p>
  <p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${esc(o.paymentMethod || "N/A")}</p>
</td></tr>

${HR_HTML}

<!-- Delivery Address -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p>
  <p style="margin:0;font-size:14px;color:#18181b;">${esc(o.city || "N/A")}</p>
  <p style="margin:2px 0 0;font-size:13px;color:#52525b;">${esc(o.address || "N/A")}</p>
</td></tr>

${o.notes ? `${HR_HTML}
<!-- Notes -->
<tr><td style="padding:0 28px;">
  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Customer Notes</p>
  <p style="margin:0;font-size:14px;color:#52525b;font-style:italic;">${esc(o.notes)}</p>
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

export function buildOrderEmailPlainText(order: any): string {
  const o = order || {};
  const itemsList = Array.isArray(o.items) ? o.items : [];
  const isCustom = o.orderType === "custom" || itemsList.some((i: any) => i && i.isCustom);
  const label = isCustom ? "NEW CUSTOM ORDER" : "NEW ORDER";
  const { date, time } = formatDate(o.createdAt);

  const itemLines = itemsList
    .map((item: any) => {
      if (!item) return "";
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
      return `  ${title} ×${item.qty || 1} — ${formatCurrency((item.price || 0) * (item.qty || 1))}${meta ? `\n    ${meta}` : ""}`;
    })
    .join("\n");

  const parts = [
    HR_PLAIN,
    "DEEZ PRINTS",
    label,
    HR_PLAIN,
    "",
    `Order: #${o.orderId || "N/A"}`,
    `Date:  ${date} · ${time}`,
    "",
    HR_PLAIN,
    "Customer",
    HR_PLAIN,
    "",
    o?.name || "N/A",
    `Phone: ${o?.phone || "N/A"}`,
    o?.email ? `Email: ${o.email}` : "",
    "",
    HR_PLAIN,
    "Products",
    HR_PLAIN,
    "",
    itemLines,
    "",
    HR_PLAIN,
    `Subtotal:  ${formatCurrency(o.subtotal || 0)}`,
    `Shipping:  ${(o.shipping || 0) === 0 ? "FREE" : formatCurrency(o.shipping)}`,
    o.discount ? `Discount:  -${formatCurrency(o.discount)}` : "",
    `Total:     ${formatCurrency(o.total || 0)}`,
    HR_PLAIN,
    "",
    `Payment: ${o.paymentMethod || "N/A"}`,
    "",
    HR_PLAIN,
    "Delivery Address",
    HR_PLAIN,
    "",
    o.city || "N/A",
    o.address || "N/A",
  ];

  if (o.notes) {
    parts.push("", HR_PLAIN, "Customer Notes", HR_PLAIN, "", o.notes);
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

export function buildOrderEmailSubject(order: any): string {
  const o = order || {};
  const itemsList = Array.isArray(o.items) ? o.items : [];
  const isCustom = o.orderType === "custom" || itemsList.some((i: any) => i && i.isCustom);
  const prefix = isCustom ? "🎨" : "🛒";
  return `${prefix} New Order #${o.orderId || "N/A"} — Rs ${(o.total || 0).toLocaleString()}`;
}
