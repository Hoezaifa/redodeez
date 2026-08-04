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
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: process.env.SMTP_SECURE !== "false", // default true for port 465
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    adminEmail: process.env.ADMIN_EMAIL || "",
  };
}

function isConfigured(): boolean {
  const { user, pass, adminEmail } = getSmtpConfig();
  return !!(user && pass && adminEmail);
}

// ─── Transporter (lazy, reused across invocations within same lambda) ─────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (_transporter) return _transporter;

  const { host, port, secure, user, pass } = getSmtpConfig();

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000, // 10s max connection
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });

  return _transporter;
}

// ─── Send with Single Retry ──────────────────────────────────────────────────

async function trySend(order: OrderData): Promise<boolean> {
  const { user, adminEmail } = getSmtpConfig();
  const transporter = getTransporter();

  const mailOptions = {
    from: `"Deez Prints" <${user}>`,
    to: adminEmail,
    subject: buildOrderEmailSubject(order),
    text: buildOrderEmailPlainText(order),
    html: buildOrderEmailHtml(order),
  };

  await transporter.sendMail(mailOptions);
  return true;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send an admin email notification for a new order.
 *
 * - Never throws. All errors are caught and logged.
 * - Retries once after 3 seconds on SMTP failure.
 * - Returns true if email was sent, false otherwise.
 *
 * Designed for future extension: can support customer confirmation,
 * shipping updates, and cancellation emails without API changes.
 */
export async function sendOrderEmailNotification(
  order: any,
): Promise<boolean> {
  const o = order || {};
  const orderIdStr = o.orderId || "unknown";

  if (!isConfigured()) {
    console.log(
      `[Email] Skipped — SMTP not configured (order ${orderIdStr})`,
    );
    return false;
  }

  const timestamp = new Date().toISOString();

  // Attempt 1
  try {
    await trySend(o);
    console.log(
      `[Email] ✅ Sent — order ${orderIdStr} at ${timestamp}`,
    );
    return true;
  } catch (err: any) {
    console.warn(
      `[Email] ⚠️ Attempt 1 failed — order ${orderIdStr} at ${timestamp}: ${err.message || err}`,
    );
  }

  // Retry after 3 seconds
  await delay(3000);

  // Attempt 2
  try {
    // Reset transporter in case of stale connection
    _transporter = null;
    await trySend(o);
    console.log(
      `[Email] ✅ Sent (retry) — order ${orderIdStr} at ${timestamp}`,
    );
    return true;
  } catch (err: any) {
    console.error(
      `[Email] ❌ Failed — order ${orderIdStr} at ${timestamp}: ${err.message || err}`,
    );
    return false;
  }
}
