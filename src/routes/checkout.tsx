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
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { paymentMethods, site, whatsappLink } from "@/data/site";
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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

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

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  /* ── ORDER SUCCESS STATE ── */
  if (placed) {
    const suggested = products
      .filter((p) => p.images.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const timeline = [
      { label: "Order Placed", done: true },
      { label: "Preparing", done: false },
      { label: "Printing", done: false },
      { label: "Packed", done: false },
      { label: "Shipped", done: false },
      { label: "Delivered", done: false },
    ];

    const nextSteps = [
      "We received your order.",
      "Our team confirms it via WhatsApp.",
      "Printing begins.",
      "Tracking number shared.",
      "Delivered to your door.",
    ];

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
          <h1 className="display-lg mt-6">Order Confirmed</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 label-mono text-muted-foreground">
            <span>
              Order <span className="text-foreground">{orderNumber}</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
            <span>
              Est. delivery <span className="text-foreground">{deliveryDate}</span>
            </span>
          </div>
        </motion.div>

        {/* Timeline + What happens next */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="label-mono text-primary">Order Timeline</p>
            <div className="mt-6 space-y-0">
              {timeline.map((t, i) => (
                <div key={t.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full border-2",
                        t.done
                          ? "border-primary bg-primary text-primary-foreground"
                          : i === 1
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground",
                      )}
                    >
                      {t.done ? (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </div>
                    {i < timeline.length - 1 && (
                      <div
                        className={cn(
                          "w-px flex-1 min-h-[32px]",
                          t.done ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                  <p
                    className={cn(
                      "pb-6 text-sm",
                      t.done ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <p className="label-mono text-primary">What Happens Next</p>
            <ol className="mt-6 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="label-mono text-primary shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/collections"
            className="bg-primary px-7 py-4 label-mono text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Continue Shopping
          </Link>
          <a
            href={whatsappLink(`Hi! I just placed order ${orderNumber}.`)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-border-strong px-7 py-4 label-mono hover:border-primary hover:text-primary transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Track on WhatsApp
          </a>
        </motion.div>

        {/* Suggested products */}
        {suggested.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
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
