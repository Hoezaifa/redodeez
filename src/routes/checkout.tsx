import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Package,
  Printer,
  MapPin,
  ArrowRight,
  X,
  Banknote,
  Smartphone,
  Building2,
  MessageCircle,
  HelpCircle,
  RotateCcw,
  Download,
  Copy,
  Share2,
} from "lucide-react";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { paymentMethods, site, whatsappLink, bankDetails } from "@/data/site";
import { sendOrderTelegramNotification, type OrderPayload } from "@/lib/sendTelegramOrder";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Deez Prints" },
      {
        name: "description",
        content:
          "Complete your Deez Prints order. Cash on delivery, Meezan bank transfer, Easypaisa, JazzCash and SadaPay accepted.",
      },
      { property: "og:title", content: "Checkout — Deez Prints" },
      { property: "og:description", content: "Cash on delivery and bank transfer supported." },
    ],
  }),
  component: Checkout,
});

/* ─── Payment method config ───────────────────────────────── */
const paymentCards = [
  {
    id: "Cash on Delivery",
    label: "Cash On Delivery",
    sub: "Recommended",
    Icon: Banknote,
  },
  {
    id: "Easypaisa",
    label: "Easypaisa",
    sub: "Mobile wallet",
    Icon: Smartphone,
  },
  {
    id: "JazzCash",
    label: "JazzCash",
    sub: "Mobile wallet",
    Icon: Smartphone,
  },
  {
    id: "Meezan Bank Transfer",
    label: "Meezan Bank",
    sub: "Bank transfer",
    Icon: Building2,
  },
  {
    id: "SadaPay",
    label: "SadaPay",
    sub: "Instant transfer",
    Icon: CreditCard,
  },
];

/* ─── Progress Stepper ────────────────────────────────────── */
function ProgressStepper({ step }: { step: number }) {
  const steps = [
    { label: "Cart", icon: Package },
    { label: "Delivery", icon: MapPin },
    { label: "Payment", icon: CreditCard },
    { label: "Done", icon: Check },
  ];
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((s, i) => {
        const done = i < step;
        const current = i === step;
        const Icon = s.icon;
        return (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-500",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : current
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "label-mono text-[10px]",
                  done || current ? "text-primary" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("step-line mx-2 w-8 sm:mx-3 sm:w-14", done && "done")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Trust Row ───────────────────────────────────────────── */
function TrustRow() {
  const items = [
    { icon: ShieldCheck, text: "Secure Checkout" },
    { icon: Banknote, text: "COD Available" },
    { icon: Truck, text: `${site.deliveryTime}` },
    { icon: RotateCcw, text: "7-Day Exchange" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-y border-border py-3">
      {items.map((t) => (
        <span key={t.text} className="flex items-center gap-2 label-mono text-muted-foreground">
          <t.icon className="h-3.5 w-3.5 text-primary" />
          {t.text}
        </span>
      ))}
    </div>
  );
}

/* ─── Floating Input ──────────────────────────────────────── */
function FloatInput({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="float-label">
      <input
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-surface p-3.5 text-sm outline-hidden transition-all duration-300"
      />
      <span className="float-label-text">{label}</span>
      {value.length > 2 && (
        <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
      )}
    </div>
  );
}

/* ─── Main Checkout ───────────────────────────────────────── */
function Checkout() {
  const { lines, subtotal, remove, setQty, clear } = useCart();
  const [payment, setPayment] = useState(paymentMethods[0]);
  const [placed, setPlaced] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const [completedOrder, setCompletedOrder] = useState<OrderPayload | null>(null);

  const total = lines.length ? subtotal + (subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee) : 0;
  const shippingCost = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;

  // Generate a mock order number and delivery date
  const orderNumber = useMemo(
    () => `DP-${String(Math.floor(1000 + Math.random() * 9000))}`,
    [],
  );
  const deliveryDate = useMemo(() => {
    const d1 = new Date();
    d1.setDate(d1.getDate() + 3);
    const d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
    return `${fmt(d1)} – ${fmt(d2)}`;
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const orderData: OrderPayload = {
      orderId: orderNumber,
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      notes: form.notes,
      paymentMethod: payment,
      items: lines.map((l) => ({
        id: l.id,
        title: l.title,
        size: l.size,
        qty: l.qty,
        price: l.price,
      })),
      subtotal,
      shipping: shippingCost,
      total,
    };

    setCompletedOrder(orderData);
    setPlaced(true);

    // Send Telegram notification to store owner (async, non-blocking)
    sendOrderTelegramNotification(orderData);

    clear();
  }

  const handleDownloadReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        filter: (node) => {
          if (node.tagName?.toLowerCase() === "button") {
            const ignore = node.getAttribute("data-html2canvas-ignore");
            if (ignore === "true") return false;
          }
          return true;
        },
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `DeezPrints-Receipt-${orderNumber}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate receipt", err);
      alert("Failed to download receipt image.");
    } finally {
      setDownloading(false);
    }
  };

  /* ── ORDER SUCCESS STATE ── */
  if (placed && completedOrder) {
    const suggested = products
      .filter((p) => p.images.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const whatsappMessage = `Hi Deez Prints! I just placed Order #${completedOrder.orderId}.\n\n*Name:* ${completedOrder.name}\n*Total:* PKR ${completedOrder.total.toLocaleString()}\n*Payment:* ${completedOrder.paymentMethod}\n\nAttached is my payment receipt screenshot.`;

    return (
      <div className="edge py-14 md:py-20">
        <ProgressStepper step={3} />

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary"
          >
            <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
          </motion.div>
          <h1 className="display-lg mt-6">Order Confirmed!</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you, <span className="text-foreground font-semibold">{completedOrder.name}</span>. We've received your order and alerted our team on Telegram.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 label-mono text-muted-foreground">
            <span>
              Order <span className="text-foreground font-bold">{completedOrder.orderId}</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
            <span>
              Est. delivery <span className="text-foreground font-bold">{deliveryDate}</span>
            </span>
          </div>
        </motion.div>

        {/* ── Official Downloadable / Printable Payment Receipt Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto max-w-lg shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 bg-white text-zinc-900 my-10"
        >
          <div
            ref={receiptRef}
            className="p-6 sm:p-8 relative text-left bg-white text-zinc-900"
            style={{ backgroundColor: "#ffffff", color: "#18181b" }}
          >
            {/* Top Brand Stripe */}
            <div
              className="absolute top-0 inset-x-0 h-2"
              style={{ background: "linear-gradient(to right, #fb923c, #ea580c)" }}
            />

            {/* Receipt Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mt-1">
              <div>
                <h2 className="font-display font-black text-2xl tracking-tight text-zinc-900 uppercase">
                  DEEZ PRINTS
                </h2>
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  OFFICIAL PAYMENT RECEIPT
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-zinc-900 block">
                  #{completedOrder.orderId}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block">
                  {new Date().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Total Amount Banner */}
            <div className="my-5 p-4 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase block">Payment Method</span>
                <span className="text-xs font-bold text-zinc-900">{completedOrder.paymentMethod}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-zinc-500 uppercase block">Total Amount</span>
                <span className="text-xl font-black text-emerald-600">
                  PKR {completedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-1.5 py-3 border-y border-zinc-100 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-zinc-500">Customer:</span>
                <span className="font-semibold text-zinc-900">{completedOrder.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone:</span>
                <span className="font-mono font-semibold text-zinc-900">{completedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">City / Address:</span>
                <span className="font-medium text-zinc-900 text-right max-w-[220px] truncate">
                  {completedOrder.city}, {completedOrder.address}
                </span>
              </div>
            </div>

            {/* Ordered Items Breakdown */}
            <div className="py-4 border-b border-zinc-100">
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase mb-2">
                Ordered Items ({completedOrder.items.length})
              </p>
              <div className="space-y-2 text-xs">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-zinc-800">
                    <span className="truncate pr-2 max-w-[240px]">
                      • {item.title} {item.size ? `(${item.size})` : ""} × {item.qty}
                    </span>
                    <span className="font-mono font-semibold shrink-0">
                      PKR {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Transfer Information Box */}
            {completedOrder.paymentMethod !== "Cash on Delivery" && (
              <div className="mt-4 p-4 rounded-xl bg-orange-50/60 border border-orange-100 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-950 uppercase tracking-wider text-[11px]">
                    BANK PAYMENT DETAILS
                  </span>
                  <span className="text-[10px] font-mono text-orange-700 font-bold">MEEZAN BANK</span>
                </div>
                <div className="flex justify-between text-zinc-700">
                  <span>Account Title:</span>
                  <span className="font-bold text-zinc-900">{bankDetails.accountTitle}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-zinc-700">IBAN:</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-zinc-900 bg-white px-2 py-1 rounded border border-orange-200 text-[11px]">
                    <span>{bankDetails.iban}</span>
                    <button
                      type="button"
                      data-html2canvas-ignore="true"
                      onClick={() => {
                        navigator.clipboard.writeText(bankDetails.iban);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-orange-600 hover:text-orange-800 font-sans text-[10px] underline ml-1 cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Instructions inside Receipt */}
            <div className="mt-5 text-center text-[10px] font-mono text-zinc-400">
              <p>Download this receipt image & share on WhatsApp to confirm delivery.</p>
              <p className="mt-0.5 font-semibold text-zinc-500">Deez Prints — Streetwear. No limits.</p>
            </div>
          </div>
        </motion.div>

        {/* ── Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto max-w-lg space-y-3"
        >
          <button
            type="button"
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="w-full bg-zinc-900 text-white hover:bg-black font-display font-black uppercase text-xs tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span>{downloading ? "GENERATING RECEIPT..." : "DOWNLOAD RECEIPT (PNG)"}</span>
          </button>

          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-black uppercase text-xs tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-center cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>SEND RECEIPT ON WHATSAPP</span>
          </a>

          <Link
            to="/collections"
            className="block text-center border border-border px-6 py-3.5 label-mono text-xs hover:border-primary hover:text-primary transition-colors rounded-xl"
          >
            Continue Shopping
          </Link>
        </motion.div>

        {/* Suggested products */}
        {suggested.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-20 border-t border-border pt-12"
          >
            <h2 className="display-md">You might also like</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
              {suggested.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    );
  }

  /* ── EMPTY CART ── */
  if (lines.length === 0) {
    return (
      <div className="edge grid min-h-[60vh] place-items-center py-20 text-center">
        <div>
          <h1 className="display-md">Your bag is empty</h1>
          <Link
            to="/collections"
            className="mt-8 inline-block bg-primary px-6 py-4 label-mono text-primary-foreground"
          >
            Shop all
          </Link>
        </div>
      </div>
    );
  }

  /* ── CHECKOUT FORM ── */
  return (
    <div className="edge py-14 md:py-20">
      {/* Progress stepper */}
      <ProgressStepper step={1} />

      {/* Trust row */}
      <div className="mt-8">
        <TrustRow />
      </div>

      {/* Heading */}
      <div className="mt-10">
        <p className="label-mono text-primary">Checkout</p>
        <h1 className="display-md mt-3">Delivery details</h1>
      </div>

      <form
        onSubmit={submit}
        className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]"
      >
        <div className="grid gap-6">
          {/* Name + Phone */}
          <div className="grid gap-6 sm:grid-cols-2">
            <FloatInput
              label="Full name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <FloatInput
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
          </div>
          <FloatInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <FloatInput
            label="Address"
            value={form.address}
            onChange={(v) => setForm({ ...form, address: v })}
          />
          <FloatInput
            label="City"
            value={form.city}
            onChange={(v) => setForm({ ...form, city: v })}
          />

          {/* Notes */}
          <div className="float-label">
            <textarea
              rows={3}
              placeholder=" "
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-border bg-surface p-3.5 text-sm outline-hidden transition-all duration-300"
            />
            <span className="float-label-text">Order notes (optional)</span>
          </div>

          {/* Payment method cards */}
          <div>
            <p className="label-mono">Payment method</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {paymentCards.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayment(m.id)}
                  className={cn("pay-card border p-4 text-left", payment === m.id && "selected")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border-2 transition-all",
                        payment === m.id
                          ? "border-primary bg-primary"
                          : "border-border",
                      )}
                    >
                      {payment === m.id && (
                        <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{m.label}</p>
                      <p className="label-mono text-muted-foreground">{m.sub}</p>
                    </div>
                    <m.Icon className="ml-auto h-5 w-5 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
            <p className="label-mono mt-3 text-muted-foreground">
              Bank transfer details are shared over WhatsApp after you place the order.
            </p>
          </div>

          {/* Support section */}
          <div className="border-t border-border pt-6">
            <p className="label-mono text-muted-foreground">Need help?</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { label: "FAQs", to: "/faq", icon: HelpCircle },
                { label: "Shipping Info", to: "/shipping", icon: Truck },
                { label: "Returns & Exchange", to: "/returns", icon: RotateCcw },
                { label: "Contact Us", to: "/contact", icon: MessageCircle },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                  <ArrowRight className="ml-auto h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Order Summary Sidebar ── */}
        <aside className="border border-border bg-surface p-6 lg:sticky lg:top-32 lg:self-start">
          <p className="label-mono">Order Summary</p>

          {/* Line items with images */}
          <ul className="mt-5 grid gap-4">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-3">
                {/* Thumbnail */}
                <div className="h-[60px] w-[48px] shrink-0 overflow-hidden bg-elevated">
                  {l.image && (
                    <img src={l.image} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold break-words">{l.title}</p>
                      <p className="label-mono text-muted-foreground">
                        {[l.size, `×${l.qty}`].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => remove(l.id)}
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="label-mono mt-1">{formatPrice(l.price * l.qty)}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Free shipping progress */}
          {subtotal < site.freeShippingThreshold && (
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-semibold">
                  {formatPrice(site.freeShippingThreshold - subtotal)}
                </span>{" "}
                away from free shipping!
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden bg-elevated">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (subtotal / site.freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
          {subtotal >= site.freeShippingThreshold && (
            <div className="mt-5 border-t border-border pt-4">
              <p className="flex items-center gap-2 text-xs text-primary font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Free shipping unlocked!
              </p>
            </div>
          )}

          <dl className="mt-5 grid gap-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className={shippingCost === 0 ? "text-primary font-semibold" : ""}>
                {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
            <span className="label-mono">Total</span>
            <span className="font-display text-2xl font-extrabold">{formatPrice(total)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-primary py-4 label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Place order
          </button>
          <p className="mt-3 text-center label-mono text-muted-foreground">
            {site.deliveryTime} · {site.couriers}
          </p>
        </aside>
      </form>
    </div>
  );
}
