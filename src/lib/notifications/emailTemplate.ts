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
  frontArtworkUrl?: string;
  backArtworkUrl?: string;
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

      const artworkLinks: string[] = [];
      if (item.isCustom && item.frontArtworkUrl?.startsWith("http")) {
        artworkLinks.push(`<a href="${esc(item.frontArtworkUrl)}" style="color:#f97316;text-decoration:underline;font-size:12px;">📎 Front Artwork</a>`);
      }
      if (item.isCustom && item.backArtworkUrl?.startsWith("http")) {
        artworkLinks.push(`<a href="${esc(item.backArtworkUrl)}" style="color:#f97316;text-decoration:underline;font-size:12px;">📎 Back Artwork</a>`);
      }

      return `<tr>
        <td style="padding:4px 0;font-size:14px;color:#18181b;">
          <strong>${title}</strong> ×${item.qty || 1}
          ${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}
          ${artworkLinks.length ? `<br/>${artworkLinks.join(" &nbsp; ")}` : ""}
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
      <td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping${o.deliveryLocation ? ` — ${o.deliveryLocation} / ${o.shippingMethod || "Courier"}` : ""}</td>
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
  <a href="https://deezprints.com/admin" style="display:inline-block;background:#18181b;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:10px 24px;border-radius:8px;letter-spacing:0.5px;">Open Admin Dashboard</a>
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
      const artLinks: string[] = [];
      if (item.isCustom && item.frontArtworkUrl?.startsWith("http")) artLinks.push(`    Front Artwork: ${item.frontArtworkUrl}`);
      if (item.isCustom && item.backArtworkUrl?.startsWith("http")) artLinks.push(`    Back Artwork: ${item.backArtworkUrl}`);
      return `  ${title} ×${item.qty || 1} — ${formatCurrency((item.price || 0) * (item.qty || 1))}${meta ? `\n    ${meta}` : ""}${artLinks.length ? `\n${artLinks.join("\n")}` : ""}`;
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
    `Shipping${o.deliveryLocation ? ` (${o.deliveryLocation} / ${o.shippingMethod || "Courier"})` : ""}:  ${(o.shipping || 0) === 0 ? "FREE" : formatCurrency(o.shipping)}`,
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
    "Admin: https://deezprints.com/admin",
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

export function buildCustomerOrderEmailHtml(order: any): string {
  const o = order || {};
  const itemsList = Array.isArray(o.items) ? o.items : [];
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
        item.isCustom && item.placement ? `Placement: ${esc(item.placement)}` : "",
      ]
        .filter(Boolean)
        .join(" · ");

      return `<tr><td style="padding:6px 0;font-size:14px;color:#18181b;"><strong>${title}</strong> ×${item.qty || 1}${meta ? `<br/><span style="font-size:12px;color:#71717a;">${meta}</span>` : ""}</td><td style="padding:6px 0;font-size:14px;color:#18181b;text-align:right;white-space:nowrap;font-weight:600;">${formatCurrency((item.price || 0) * (item.qty || 1))}</td></tr>`;
    })
    .join("");

  const isCOD = (o.paymentMethod || "").toLowerCase().includes("cash");
  const paymentInstructions = isCOD
    ? `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px;margin-top:12px;color:#9a3412;font-size:13px;line-height:1.5;"><strong>Cash on Delivery (Karachi):</strong> Please keep exact cash of <strong>${formatCurrency(o.total || 0)}</strong> ready upon delivery. Our rider will contact you prior to arrival.</div>`
    : `<div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:14px;margin-top:12px;color:#9a3412;font-size:13px;line-height:1.5;"><strong>Payment Confirmation:</strong> If you haven't sent your payment receipt yet, please share it on WhatsApp at <strong>+92 327 2487127</strong> with your Order ID (<strong>#${esc(o.orderId || "N/A")}</strong>) so we can dispatch your parcel immediately.</div>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;width:100%;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
<tr><td style="background:#18181b;padding:24px 28px;"><h1 style="margin:0;font-size:22px;font-weight:900;color:#fff;letter-spacing:2px;">DEEZ PRINTS</h1><p style="margin:6px 0 0;font-size:13px;font-weight:700;color:#f97316;letter-spacing:1px;">ORDER CONFIRMATION</p></td></tr>
<tr><td style="padding:24px 28px 0;"><h2 style="margin:0 0 8px;font-size:18px;color:#18181b;">Thank you for your order, ${esc(o.name || "Customer")}!</h2><p style="margin:0;font-size:14px;color:#52525b;line-height:1.5;">We’ve received your order and are getting it ready. You’ll receive updates as soon as your items are produced and dispatched.</p></td></tr>
<tr><td style="padding:16px 28px 0;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;">Order Number</td><td style="text-align:right;font-size:13px;color:#71717a;">${date} · ${time}</td></tr><tr><td colspan="2" style="font-size:18px;font-weight:800;color:#f97316;padding-top:2px;">#${esc(o.orderId || "N/A")}</td></tr></table></td></tr>
${HR_HTML}
<tr><td style="padding:0 28px;"><p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Your Order</p><table width="100%">${itemRows}</table></td></tr>
${HR_HTML}
<tr><td style="padding:0 28px;"><table width="100%"><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Subtotal</td><td style="font-size:13px;color:#18181b;text-align:right;">${formatCurrency(o.subtotal || 0)}</td></tr><tr><td style="font-size:13px;color:#71717a;padding:3px 0;">Shipping</td><td style="font-size:13px;color:#18181b;text-align:right;">${(o.shipping || 0) === 0 ? "FREE" : formatCurrency(o.shipping)}</td></tr>${o.discount ? `<tr><td style="font-size:13px;color:#71717a;">Discount</td><td style="font-size:13px;color:#dc2626;text-align:right;">-${formatCurrency(o.discount)}</td></tr>` : ""}<tr><td style="font-size:16px;font-weight:800;color:#18181b;padding:8px 0 0;">Total</td><td style="font-size:16px;font-weight:800;color:#18181b;text-align:right;padding:8px 0 0;">${formatCurrency(o.total || 0)}</td></tr></table></td></tr>
${HR_HTML}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Delivery Address</p><p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${esc(o.name || "")} (${esc(o.phone || "")})</p><p style="margin:2px 0 0;font-size:14px;color:#18181b;">${esc(o.city || "N/A")}</p><p style="margin:2px 0 0;font-size:13px;color:#52525b;">${esc(o.address || "N/A")}</p></td></tr>
${HR_HTML}
<tr><td style="padding:0 28px;"><p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Payment Method</p><p style="margin:0;font-size:14px;font-weight:600;color:#18181b;">${esc(o.paymentMethod || "N/A")}</p>${paymentInstructions}</td></tr>
${HR_HTML}
<tr><td style="padding:0 28px 24px;" align="center"><p style="margin:0 0 12px;font-size:13px;color:#71717a;">Need to modify your order or have questions?</p><a href="https://wa.me/923272487127?text=${encodeURIComponent(`Hi Deez Prints! I have a question regarding my Order #${o.orderId || ""}`)}" style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:700;text-decoration:none;padding:11px 24px;border-radius:8px;">💬 Chat on WhatsApp (+92 327 2487127)</a></td></tr>
<tr><td style="background:#fafafa;padding:16px 28px;text-align:center;"><p style="margin:0;font-size:11px;color:#a1a1aa;">Deez Prints — Streetwear. No limits.<br/>Karachi, Pakistan</p></td></tr>
</table></td></tr></table></body></html>`;
}

export function buildCustomerOrderEmailPlainText(order: any): string {
  const o = order || {};
  const itemsList = Array.isArray(o.items) ? o.items : [];
  const items = itemsList
    .map((i: any) => {
      if (!i) return "";
      const title = i.isCustom ? `🎨 ${i.blankItem || i.title}` : (i.title || "Item");
      const meta = [
        i.size ? `Size: ${i.size}` : "",
        i.color ? `Color: ${i.color}` : "",
        i.isCustom && i.placement ? `Placement: ${i.placement}` : "",
      ]
        .filter(Boolean)
        .join(" · ");
      return `  ${title} ×${i.qty || 1} — ${formatCurrency((i.price || 0) * (i.qty || 1))}${meta ? ` (${meta})` : ""}`;
    })
    .filter(Boolean)
    .join("\n");

  return [
    HR_PLAIN,
    "DEEZ PRINTS — ORDER CONFIRMATION",
    HR_PLAIN,
    `Order #${o.orderId || "N/A"}`,
    `Thank you, ${o.name || "Customer"}! We have received your order.`,
    "",
    HR_PLAIN,
    "Items Ordered",
    HR_PLAIN,
    items,
    "",
    HR_PLAIN,
    `Subtotal: ${formatCurrency(o.subtotal || 0)}`,
    `Shipping: ${(o.shipping || 0) === 0 ? "FREE" : formatCurrency(o.shipping)}`,
    o.discount ? `Discount: -${formatCurrency(o.discount)}` : "",
    `Total:    ${formatCurrency(o.total || 0)}`,
    HR_PLAIN,
    "",
    `Delivery: ${o.city || "N/A"} — ${o.address || "N/A"}`,
    `Contact:  ${o.phone || "N/A"}`,
    `Payment:  ${o.paymentMethod || "N/A"}`,
    "",
    "Have questions? WhatsApp us at +92 327 2487127",
    "Deez Prints — Streetwear. No limits."
  ].filter(l => l !== "").join("\n");
}
