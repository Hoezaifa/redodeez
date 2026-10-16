/**
 * Deez Prints — Email Notification Service
 *
 * Sends admin order notification emails via Gmail SMTP (Nodemailer).
 * Designed for Vercel Serverless: 10s timeout, single retry with 3s delay.
 *
 * Failures are caught and logged — never thrown. Email issues must never
 * affect order creation or Telegram notifications.
 */

import nodemailer from "nodemailer";
import {
  buildOrderEmailHtml,
  buildOrderEmailPlainText,
  buildOrderEmailSubject,
  buildCustomerOrderEmailHtml,
  buildCustomerOrderEmailPlainText,
} from "./emailTemplate";

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
    placement?: string;
    blankItem?: string;
  }[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  createdAt?: string;
}

// ─── SMTP Configuration ──────────────────────────────────────────────────────

function getSmtpConfig() {
  const user = (process.env.SMTP_USER || "deezprints69@gmail.com").trim();
  const rawPass = (process.env.SMTP_PASS || "beai viol ixrb zhoq").trim();
  const pass = rawPass.replace(/[\r\n]/g, "");
  const adminEmail = (process.env.ADMIN_EMAIL || user || "deezprints69@gmail.com").trim();
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";

  return { host, port, secure, user, pass, adminEmail };
}

function isConfigured(): boolean {
  const { user, pass } = getSmtpConfig();
  return !!(user && pass);
}

// ─── Transporter (lazy, reused across invocations within same process) ─────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (_transporter) return _transporter;

  const { host, port, secure, user, pass } = getSmtpConfig();

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  return _transporter;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send admin order notification and customer confirmation emails.
 *
 * - Never throws. All errors are caught and logged.
 * - Retries once after 2 seconds on SMTP failure.
 * - Returns { adminSent, customerSent }.
 */
export async function sendOrderEmailNotification(
  order: any,
): Promise<{ adminSent: boolean; customerSent: boolean }> {
  const o = order || {};
  const orderIdStr = o.orderId || "unknown";

  if (!isConfigured()) {
    console.log(
      `[Email] Skipped — SMTP not configured (order ${orderIdStr})`,
    );
    return { adminSent: false, customerSent: false };
  }

  const { user, adminEmail } = getSmtpConfig();
  const customerEmail = o.email && typeof o.email === "string" && o.email.includes("@") ? o.email.trim() : null;
  const timestamp = new Date().toISOString();

  let adminSent = false;
  let customerSent = false;

  // 1. Admin Email
  if (adminEmail) {
    const adminMail = {
      from: `"Deez Prints" <${user}>`,
      to: adminEmail,
      subject: buildOrderEmailSubject(o),
      text: buildOrderEmailPlainText(o),
      html: buildOrderEmailHtml(o),
    };

    try {
      const transporter = getTransporter();
      await transporter.sendMail(adminMail);
      console.log(`[Email] ✅ Admin notification sent — order ${orderIdStr} at ${timestamp}`);
      adminSent = true;
    } catch (err: any) {
      console.warn(`[Email] ⚠️ Admin attempt 1 failed — order ${orderIdStr}: ${err.message || err}`);
      try {
        await new Promise((r) => setTimeout(r, 2000));
        _transporter = null;
        await getTransporter().sendMail(adminMail);
        console.log(`[Email] ✅ Admin notification sent (retry) — order ${orderIdStr}`);
        adminSent = true;
      } catch (retryErr: any) {
        console.error(`[Email] ❌ Admin notification failed — order ${orderIdStr}: ${retryErr.message || retryErr}`);
      }
    }
  }

  // 2. Customer Confirmation Email
  if (customerEmail) {
    const customerMail = {
      from: `"Deez Prints" <${user}>`,
      to: customerEmail,
      subject: `Order Confirmed #${orderIdStr} — Deez Prints`,
      text: buildCustomerOrderEmailPlainText(o),
      html: buildCustomerOrderEmailHtml(o),
    };

    try {
      const transporter = getTransporter();
      await transporter.sendMail(customerMail);
      console.log(`[Email] ✅ Customer confirmation sent — ${customerEmail} (order ${orderIdStr})`);
      customerSent = true;
    } catch (err: any) {
      console.warn(`[Email] ⚠️ Customer attempt 1 failed — ${customerEmail}: ${err.message || err}`);
      try {
        await new Promise((r) => setTimeout(r, 2000));
        _transporter = null;
        await getTransporter().sendMail(customerMail);
        console.log(`[Email] ✅ Customer confirmation sent (retry) — ${customerEmail}`);
        customerSent = true;
      } catch (retryErr: any) {
        console.error(`[Email] ❌ Customer confirmation failed — ${customerEmail}: ${retryErr.message || retryErr}`);
      }
    }
  }

  return { adminSent, customerSent };
}
