import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Smartphone, Building2, Download, Share2, ArrowLeft, Banknote } from "lucide-react";
import { toPng } from "html-to-image";
import { useCart } from "@/lib/cart";
import { bankDetails, whatsappLink, site } from "@/data/site";
import { sendOrderTelegramNotification } from "@/lib/sendTelegramOrder";
import { saveOrder, generateOrderId, type StoredOrder } from "@/lib/ordersStore";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Deez Prints" },
      {
        name: "description",
        content:
          "Complete your Deez Prints order with Meezan Bank transfer, Easypaisa, or JazzCash.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"easypaisa" | "meezan">("easypaisa");
  const [placed, setPlaced] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [copiedEasypaisa, setCopiedEasypaisa] = useState(false);
  const [copiedMeezan, setCopiedMeezan] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    zip: "",
    notes: "",
  });

  const [completedOrder, setCompletedOrder] = useState<StoredOrder | null>(null);

  const shippingCost = subtotal >= site.freeShippingThreshold ? 0 : site.shippingFee;
  const total = lines.length ? subtotal + shippingCost : 0;

  const orderNumber = useMemo(() => generateOrderId(), []);

  const deliveryDate = useMemo(() => {
    const d1 = new Date();
    d1.setDate(d1.getDate() + 3);
    const d2 = new Date();
    d2.setDate(d2.getDate() + 5);
    const fmt = (d: Date) => d.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
    return `${fmt(d1)} – ${fmt(d2)}`;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone ||
      !formData.city
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    const methodTitle =
      paymentMethod === "meezan"
        ? "Meezan Bank Transfer"
        : "Easypaisa / JazzCash / Zindigi";

    const hasCustomItems = lines.some((l) => l.isCustom);

    const now = new Date().toISOString();
    const orderData: StoredOrder = {
      orderId: orderNumber,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      notes: formData.notes,
      paymentMethod: methodTitle,
      items: lines.map((l) => ({
        id: l.id,
        title: l.title,
        size: l.size,
        color: l.color,
        qty: l.qty,
        price: l.price,
        isCustom: l.isCustom,
        frontArtworkUrl: l.frontArtworkUrl,
        backArtworkUrl: l.backArtworkUrl,
        placement: l.placement,
        blankItem: l.blankItem,
      })),
      subtotal,
      shipping: shippingCost,
      discount: 0,
      total,
      orderType: hasCustomItems ? "custom" : "normal",
      status: "Pending",
      statusHistory: [{ status: "Pending", date: now }],
      createdAt: now,
      updatedAt: now,
    };

    // Save order to Neon database (fully awaited)
    await saveOrder(orderData);

    setCompletedOrder(orderData);
    setPlaced(true);
    setStep(3);

    // Send Telegram notification (includes artwork images if custom order)
    try {
      await sendOrderTelegramNotification(orderData);
    } catch (err) {
      console.warn("Telegram order notification warning:", err);
    }

    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  /* ── ORDER SUCCESS / STEP 3 RECEIPT ── */
  if (placed && completedOrder) {
    const suggested = products
      .filter((p) => p.images.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const whatsappMessage = `Hi Deez Prints! I just placed Order #${completedOrder.orderId}.\n\n*Name:* ${completedOrder.name}\n*Total:* PKR ${completedOrder.total.toLocaleString()}\n*Payment:* ${completedOrder.paymentMethod}\n\nAttached is my payment receipt.`;

    return (
      <div className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 text-xs font-bold tracking-widest text-muted-foreground mb-10">
          <span className="text-zinc-400">1. INFORMATION</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="text-zinc-400">2. PAYMENT</span>
          <span className="w-8 h-px bg-white/10" />
          <span className="text-primary font-black">3. COMPLETE</span>
        </div>

        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary mb-4">
            <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Thank you, <span className="text-white font-semibold">{completedOrder.name}</span>. We
            have received your order!
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-zinc-400">
            <span>
              Order <strong className="text-white">#{completedOrder.orderId}</strong>
            </span>
            <span>•</span>
            <span>
              Est. delivery <strong className="text-white">{deliveryDate}</strong>
            </span>
          </div>

          {/* Prominent WhatsApp Payment Notice */}
          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-200 text-xs sm:text-sm font-medium text-center shadow-lg">
            <p className="leading-relaxed">
              💬 <strong>Please share your payment screenshot on WhatsApp</strong> to confirm your
              order dispatch!
            </p>
          </div>
        </motion.div>

        {/* Official Printable Payment Receipt Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-auto max-w-md shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 bg-white text-zinc-900 my-8"
        >
          <div ref={receiptRef} className="p-6 relative text-left bg-white text-zinc-900">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mt-1">
              <div>
                <h2 className="font-extrabold text-xl tracking-tight text-zinc-900 uppercase">
                  DEEZ PRINTS
                </h2>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  OFFICIAL PAYMENT RECEIPT
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold text-zinc-900 block">
                  #{completedOrder.orderId}
                </span>
                <span className="text-[10px] text-zinc-400 block">
                  {new Date().toLocaleDateString("en-PK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="my-4 p-3 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                  Payment Method
                </span>
                <span className="text-xs font-bold text-zinc-900">
                  {completedOrder.paymentMethod}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                  Total Amount
                </span>
                <span className="text-lg font-black text-emerald-600">
                  Rs. {completedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-1 py-2.5 border-y border-zinc-100 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Customer:</span>
                <span className="font-semibold text-zinc-900">{completedOrder.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone:</span>
                <span className="font-mono font-semibold text-zinc-900">
                  {completedOrder.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">City / Address:</span>
                <span className="font-medium text-zinc-900 text-right truncate max-w-[200px]">
                  {completedOrder.city}, {completedOrder.address}
                </span>
              </div>
            </div>

            <div className="py-3 border-b border-zinc-100">
              <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mb-2">
                Ordered Items ({completedOrder.items.length})
              </p>
              <div className="space-y-1.5 text-xs">
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-zinc-800">
                    <span className="truncate pr-2 max-w-[220px]">
                      • {item.title}{" "}
                      {[item.size, item.color].filter(Boolean).length
                        ? `(${[item.size, item.color].filter(Boolean).join(" / ")})`
                        : ""}{" "}
                      × {item.qty}
                    </span>
                    <span className="font-mono font-semibold shrink-0">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center text-[10px] text-zinc-400">
              <p>Download receipt image & share on WhatsApp to confirm delivery.</p>
              <p className="mt-0.5 font-semibold text-zinc-500">
                Deez Prints — Streetwear. No limits.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mx-auto max-w-md space-y-3">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="w-full bg-zinc-900 text-white hover:bg-black font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Download className="h-4 w-4" />
            <span>{downloading ? "GENERATING RECEIPT..." : "DOWNLOAD RECEIPT"}</span>
          </button>

          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-center cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>SEND RECEIPT ON WHATSAPP</span>
          </a>

          <Link
            to="/collections"
            className="block text-center border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors rounded-xl"
          >
            Continue Shopping
          </Link>
        </div>

        {suggested.length > 0 && (
          <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-xl font-bold uppercase mb-6">You might also like</h2>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
              {suggested.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── EMPTY CART ── */
  if (lines.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center px-4">
        <h1 className="text-3xl font-extrabold uppercase">Your bag is empty</h1>
        <Link
          to="/collections"
          className="mt-6 inline-block bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground rounded-xl"
        >
          Shop all
        </Link>
      </div>
    );
  }

  /* ── 2-COLUMN CHECKOUT LAYOUT (IMAGE 1) ── */
  return (
    <div className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Column: Form Steps */}
        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-muted-foreground">
            <span className={step >= 1 ? "text-white font-black" : "text-zinc-500"}>
              1. INFORMATION
            </span>
            <span className="w-8 h-px bg-white/15" />
            <span className={step >= 2 ? "text-white font-black" : "text-zinc-500"}>
              2. PAYMENT
            </span>
            <span className="w-8 h-px bg-white/15" />
            <span className={step >= 3 ? "text-primary font-black" : "text-zinc-500"}>
              3. COMPLETE
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                onSubmit={handleSubmitInfo}
                className="space-y-5"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white">Contact Information</h2>
                <div className="space-y-3.5">
                  <input
                    required
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                  />
                  <input
                    required
                    name="address"
                    placeholder="Shipping Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                  />
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (e.g. 0300 1234567)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-3.5">
                    <input
                      required
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                    />
                    <input
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                    />
                  </div>
                  <textarea
                    rows={2}
                    name="notes"
                    placeholder="Order notes (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 text-base font-extrabold bg-primary text-primary-foreground hover:bg-orange-600 rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Continue to Payment
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="space-y-5"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white">Payment Method</h2>
                <div className="space-y-3">
                  {/* Option 1: Easypaisa */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("easypaisa")}
                    className={`w-full flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === "easypaisa"
                        ? "bg-zinc-800/90 border-orange-500 shadow-md"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold text-sm text-white">
                          Easypaisa / JazzCash / Zindigi
                        </span>
                      </div>
                      <div
                        className={`w-3.5 h-3.5 rounded-full border ${
                          paymentMethod === "easypaisa"
                            ? "border-4 border-orange-500 bg-white"
                            : "border-zinc-500"
                        }`}
                      />
                    </div>
                    {paymentMethod === "easypaisa" && (
                      <div className="pt-2 text-xs text-zinc-300 space-y-1 border-t border-white/10 mt-2">
                        <p>
                          Title:{" "}
                          <strong className="text-white">
                            {bankDetails.easypaisa.accountTitle}
                          </strong>
                        </p>
                        <div className="flex items-center justify-between">
                          <p>
                            Number:{" "}
                            <strong className="text-white font-mono">
                              {bankDetails.easypaisa.accountNumber}
                            </strong>
                          </p>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(bankDetails.easypaisa.accountNumber);
                              setCopiedEasypaisa(true);
                              setTimeout(() => setCopiedEasypaisa(false), 2000);
                            }}
                            className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-[11px] font-bold hover:bg-emerald-500/30 cursor-pointer transition-colors"
                          >
                            {copiedEasypaisa ? "Copied!" : "Copy"}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Option 2: Meezan Bank */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("meezan")}
                    className={`w-full flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === "meezan"
                        ? "bg-zinc-800/90 border-orange-500 shadow-md"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2.5">
                        <Building2 className="w-5 h-5 text-orange-400" />
                        <span className="font-bold text-sm text-white">Meezan Bank Transfer</span>
                      </div>
                      <div
                        className={`w-3.5 h-3.5 rounded-full border ${
                          paymentMethod === "meezan"
                            ? "border-4 border-orange-500 bg-white"
                            : "border-zinc-500"
                        }`}
                      />
                    </div>
                    {paymentMethod === "meezan" && (
                      <div className="pt-2 text-xs text-zinc-300 space-y-1 border-t border-white/10 mt-2">
                        <p>
                          Title:{" "}
                          <strong className="text-white">{bankDetails.meezan.accountTitle}</strong>
                        </p>
                        <div className="flex items-center justify-between">
                          <p>
                            Account:{" "}
                            <strong className="text-white font-mono">
                              {bankDetails.meezan.accountNumber}
                            </strong>
                          </p>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(bankDetails.meezan.accountNumber);
                              setCopiedMeezan(true);
                              setTimeout(() => setCopiedMeezan(false), 2000);
                            }}
                            className="px-2.5 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg text-[11px] font-bold hover:bg-orange-500/30 cursor-pointer transition-colors"
                          >
                            {copiedMeezan ? "Copied!" : "Copy"}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 h-12 font-bold text-sm border border-white/15 text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="w-2/3 h-12 text-base font-extrabold bg-primary text-primary-foreground hover:bg-orange-600 rounded-xl transition-all shadow-lg cursor-pointer"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary (Image 1 design) */}
        <div>
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 sticky top-28">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

            {/* Item List */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              {lines.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-2 border-b border-white/10"
                >
                  <span className="px-2 py-0.5 bg-zinc-800 border border-white/10 rounded text-xs font-bold text-white shrink-0">
                    {item.qty}x
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate uppercase">{item.title}</p>
                    {(item.size || item.color) && (
                      <p className="text-[11px] text-zinc-400">
                        {[item.size, item.color].filter(Boolean).join(" / ")}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white font-mono shrink-0">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white font-mono font-bold">
                  Rs. {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span className="text-white font-medium">
                  {shippingCost === 0 ? "FREE" : `Rs. ${shippingCost}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/15 pt-4 mt-4 text-white">
              <span className="text-base font-extrabold uppercase">Total</span>
              <span className="text-xl font-extrabold font-mono text-primary">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
