import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useRef, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { motion, AnimatePresence } from "motion/react";
import { Check, Download, Share2, ArrowLeft, Info, MapPin } from "lucide-react";
import { toPng } from "html-to-image";
import { useCart } from "@/lib/cart";
import { bankDetails, whatsappLink, site, SHIPPING_OPTIONS, type DeliveryLocation } from "@/data/site";
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
          "Complete your Deez Prints order with Easypaisa, Bank Transfer, or Cash on Delivery.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Checkout,
});

type PaymentMethod = "easypaisa" | "bank" | "cod";

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("easypaisa");
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>("karachi");
  const [placed, setPlaced] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const [copiedPaymentId, setCopiedPaymentId] = useState<string | null>(null);
  const [cityMode, setCityMode] = useState<"karachi" | "other">("karachi");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "Karachi",
    notes: "",
  });

  const [completedOrder, setCompletedOrder] = useState<StoredOrder | null>(null);

  const shippingOption = SHIPPING_OPTIONS[deliveryLocation];
  const isFreeShipping = subtotal >= site.freeShippingThreshold && deliveryLocation === "karachi";
  const shippingCost = isFreeShipping ? 0 : shippingOption.fee;
  const total = lines.length ? subtotal + shippingCost : 0;

  const hasCustomItems = lines.some((l) => l.isCustom);
  const hasMugInCart = useMemo(
    () => lines.some((l) => l.productId.startsWith("mug-") || l.title.toLowerCase().includes("mug")),
    [lines]
  );

  useEffect(() => {
    if (hasMugInCart) {
      setCityMode("karachi");
      setDeliveryLocation("karachi");
      setFormData((f) => ({ ...f, city: "Karachi" }));
    }
  }, [hasMugInCart]);

  useEffect(() => {
    if (lines.length > 0) {
      trackEvent.beginCheckout(lines, total);
    }
  }, []);

  const orderNumber = useMemo(() => generateOrderId(), []);

  const shippingLabel = `${shippingOption.label} / ${shippingOption.method}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim() ||
      !formData.city.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (hasMugInCart) {
      if (formData.city.trim().toLowerCase() !== "karachi" || deliveryLocation !== "karachi") {
        alert("Ceramic mugs are fragile and can only be delivered within Karachi via local rider. Please use a Karachi delivery address or remove mugs from your bag to order nationwide.");
        return;
      }
    } else if (formData.city.trim().toLowerCase() !== "karachi" && deliveryLocation === "karachi") {
      setDeliveryLocation("nationwide");
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    const methodTitle =
      paymentMethod === "bank"
        ? "Bank Transfer (Meezan)"
        : paymentMethod === "cod"
        ? "Cash on Delivery"
        : "Easypaisa";

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
      deliveryLocation: shippingOption.label,
      shippingMethod: shippingOption.method,
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

    trackEvent.purchase({
      orderId: orderData.orderId,
      total: orderData.total,
      items: orderData.items,
      shipping: orderData.shipping,
    });

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

  /** Copy an account number to clipboard */
  const copyNumber = (number: string, label: string) => {
    navigator.clipboard.writeText(number);
    setCopiedPaymentId(label);
    setTimeout(() => setCopiedPaymentId(null), 2000);
  };

  /* ── ORDER SUCCESS / STEP 3 RECEIPT ── */
  if (placed && completedOrder) {
    const suggested = products
      .filter((p) => p.images.length > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    const whatsappMessage = paymentMethod === "cod"
      ? `Hi Deez Prints! I just placed Order #${completedOrder.orderId} (Cash on Delivery).\n\n*Name:* ${completedOrder.name}\n*Total:* PKR ${completedOrder.total.toLocaleString()}\n*Payment:* ${completedOrder.paymentMethod}\n\nPlease confirm my order for dispatch.`
      : `Hi Deez Prints! I just placed Order #${completedOrder.orderId}.\n\n*Name:* ${completedOrder.name}\n*Total:* PKR ${completedOrder.total.toLocaleString()}\n*Payment:* ${completedOrder.paymentMethod}\n\nAttached is my payment receipt.`;

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
              Shipping — <strong className="text-white">{completedOrder.deliveryLocation || "Standard"} / {completedOrder.shippingMethod || "Courier"}</strong>
            </span>
          </div>

          {/* Prominent WhatsApp Payment Notice */}
          <div className="mt-6 max-w-md mx-auto p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-200 text-xs sm:text-sm font-medium text-center shadow-lg">
            <p className="leading-relaxed">
              {completedOrder.paymentMethod === "Cash on Delivery"
                ? <>💬 <strong>Please confirm your order on WhatsApp</strong> so we can prepare it for dispatch.</>
                : <>💬 <strong>Please share your payment screenshot on WhatsApp</strong> to confirm your order dispatch!</>
              }
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

            {/* Receipt Totals Breakdown */}
            <div className="py-3 border-b border-zinc-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-zinc-800">Rs. {completedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping — {completedOrder.deliveryLocation || "Standard"} / {completedOrder.shippingMethod || "Courier"}</span>
                <span className="font-mono font-semibold text-zinc-800">Rs. {completedOrder.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-200 text-zinc-900 font-bold text-sm">
                <span>Total</span>
                <span className="font-mono">Rs. {completedOrder.total.toLocaleString()}</span>
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
            onClick={() => trackEvent.whatsappClick("checkout_receipt")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase text-xs tracking-wider py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-center cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>{completedOrder.paymentMethod === "Cash on Delivery" ? "CONFIRM ORDER ON WHATSAPP" : "SEND RECEIPT ON WHATSAPP"}</span>
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

  /* ── 2-COLUMN CHECKOUT LAYOUT ── */
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
                  <div className="space-y-2.5">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCityMode("karachi");
                          setDeliveryLocation("karachi");
                          setFormData((f) => ({ ...f, city: "Karachi" }));
                        }}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          cityMode === "karachi"
                            ? "bg-zinc-800/90 border-orange-500 text-white"
                            : "bg-zinc-900/40 border-white/10 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        Karachi
                      </button>
                      <button
                        type="button"
                        disabled={hasMugInCart}
                        onClick={() => {
                          if (hasMugInCart) return;
                          setCityMode("other");
                          setDeliveryLocation("nationwide");
                          setFormData((f) => ({ ...f, city: f.city === "Karachi" ? "" : f.city }));
                        }}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                          hasMugInCart
                            ? "opacity-40 cursor-not-allowed bg-zinc-900/20 border-white/5 text-zinc-500"
                            : cityMode === "other"
                            ? "bg-zinc-800/90 border-orange-500 text-white cursor-pointer"
                            : "bg-zinc-900/40 border-white/10 text-zinc-400 hover:border-white/20 cursor-pointer"
                        }`}
                      >
                        Other City {hasMugInCart && "(Unavailable)"}
                      </button>
                    </div>

                    {hasMugInCart ? (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong className="text-amber-400 font-bold">Karachi Delivery Only: </strong>
                          Your bag contains ceramic drinkware. Because ceramic is fragile, delivery is strictly limited to Karachi via local rider. Nationwide shipping is disabled for this order.
                        </p>
                      </div>
                    ) : cityMode === "other" ? (
                      <input
                        required
                        name="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (deliveryLocation !== "nationwide") {
                            setDeliveryLocation("nationwide");
                          }
                        }}
                        autoFocus
                        className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 outline-none transition-colors"
                      />
                    ) : null}
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

                {/* Delivery Location */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Delivery Location</h3>
                    {isFreeShipping && (
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        FREE SHIPPING APPLIED
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.entries(SHIPPING_OPTIONS) as [DeliveryLocation, typeof SHIPPING_OPTIONS["karachi"]][]).map(([key, opt]) => {
                      const isDisabled = hasMugInCart && key === "nationwide";
                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            if (isDisabled) return;
                            setDeliveryLocation(key);
                            if (key === "karachi") {
                              setCityMode("karachi");
                              setFormData((f) => ({ ...f, city: "Karachi" }));
                            } else {
                              setCityMode("other");
                              setFormData((f) => ({ ...f, city: f.city === "Karachi" ? "" : f.city }));
                            }
                          }}
                          className={`flex flex-col p-3.5 rounded-xl border text-left transition-all ${
                            isDisabled
                              ? "opacity-35 cursor-not-allowed bg-zinc-900/20 border-white/5"
                              : deliveryLocation === key
                              ? "bg-zinc-800/90 border-orange-500 shadow-md cursor-pointer"
                              : "bg-zinc-900/40 border-white/10 hover:border-white/20 cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <span className="font-bold text-xs text-white">
                              {opt.label} {isDisabled && "(Unavailable for Mugs)"}
                            </span>
                            <div className={`w-3.5 h-3.5 rounded-full border ${
                              deliveryLocation === key
                                ? "border-4 border-orange-500 bg-white"
                                : "border-zinc-500"
                            }`} />
                          </div>
                          <span className="text-[11px] text-zinc-400">
                            {isDisabled ? (
                              <span className="text-amber-400/80 font-medium">Karachi only</span>
                            ) : isFreeShipping && key === "karachi" ? (
                              <span className="text-emerald-400 font-bold">FREE — {opt.method}</span>
                            ) : (
                              `Rs. ${opt.fee} — ${opt.method}`
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-amber-400/90 leading-relaxed bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2.5">
                    ⏳ {site.orderPrepNotice}
                  </p>
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

                {/* ── PAYMENT OPTIONS ── */}
                <div className="space-y-2.5">

                  {/* ── Easypaisa ── */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("easypaisa")}
                    className={`w-full text-left transition-all cursor-pointer rounded-xl border ${
                      paymentMethod === "easypaisa"
                        ? "bg-zinc-800/90 border-orange-500 ring-1 ring-orange-500/30"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/payment/easypaisa.svg"
                          alt="Easypaisa"
                          className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
                        />
                        <div>
                          <span className="font-bold text-sm text-white block">Easypaisa</span>
                          <span className="text-[11px] text-zinc-400">Pay now</span>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          paymentMethod === "easypaisa"
                            ? "border-orange-500 bg-orange-500"
                            : "border-zinc-500"
                        }`}
                      >
                        {paymentMethod === "easypaisa" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {paymentMethod === "easypaisa" && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Account Title</span>
                            <span className="text-white font-semibold">{bankDetails.easypaisa.accountTitle}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-400">
                            <span>Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white tracking-wide">{bankDetails.easypaisa.accountNumber}</span>
                              <span
                                onClick={(e) => { e.stopPropagation(); copyNumber(bankDetails.easypaisa.accountNumber, "easypaisa"); }}
                                className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold hover:bg-emerald-500/30 cursor-pointer transition-colors"
                              >
                                {copiedPaymentId === "easypaisa" ? "Copied!" : "Copy"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* ── Bank Transfer (Meezan) ── */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`w-full text-left transition-all cursor-pointer rounded-xl border ${
                      paymentMethod === "bank"
                        ? "bg-zinc-800/90 border-orange-500 ring-1 ring-orange-500/30"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="/assets/payment/meezan.svg"
                          alt="Meezan Bank"
                          className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0"
                        />
                        <div>
                          <span className="font-bold text-sm text-white block">Bank Transfer</span>
                          <span className="text-[11px] text-zinc-400">Pay now</span>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          paymentMethod === "bank"
                            ? "border-orange-500 bg-orange-500"
                            : "border-zinc-500"
                        }`}
                      >
                        {paymentMethod === "bank" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {paymentMethod === "bank" && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
                          <div className="flex justify-between text-zinc-400">
                            <span>Bank</span>
                            <span className="text-white font-semibold">Meezan Bank</span>
                          </div>
                          <div className="flex justify-between text-zinc-400">
                            <span>Account Title</span>
                            <span className="text-white font-semibold">{bankDetails.meezan.accountTitle}</span>
                          </div>
                          <div className="flex items-center justify-between text-zinc-400">
                            <span>Account Number</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white tracking-wide">{bankDetails.meezan.accountNumber}</span>
                              <span
                                onClick={(e) => { e.stopPropagation(); copyNumber(bankDetails.meezan.accountNumber, "bank"); }}
                                className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold hover:bg-emerald-500/30 cursor-pointer transition-colors"
                              >
                                {copiedPaymentId === "bank" ? "Copied!" : "Copy"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* ── Cash on Delivery ── */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full text-left transition-all cursor-pointer rounded-xl border ${
                      paymentMethod === "cod"
                        ? "bg-zinc-800/90 border-orange-500 ring-1 ring-orange-500/30"
                        : "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg bg-zinc-700/60 flex items-center justify-center text-[11px] font-black text-white tracking-tight">
                          COD
                        </div>
                        <div>
                          <span className="font-bold text-sm text-white block">Cash on Delivery</span>
                          <span className="text-[11px] text-zinc-400">Pay when your order arrives</span>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          paymentMethod === "cod"
                            ? "border-orange-500 bg-orange-500"
                            : "border-zinc-500"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>

                    {/* Expanded description */}
                    {paymentMethod === "cod" && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-xs text-zinc-400 leading-relaxed">
                            Order will be confirmed via WhatsApp before dispatch. Pay the full amount to the courier at delivery.
                          </p>
                        </div>
                      </div>
                    )}
                  </button>
                </div>

                {/* Custom Order Advance Notice — only shown when cart has custom items */}
                {hasCustomItems && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      Custom print orders require a{" "}
                      <span className="text-orange-500 font-semibold">Rs. 500 advance</span>{" "}
                      to start production. The remaining balance can be paid on delivery.
                    </p>
                  </div>
                )}

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

        {/* Right Column: Order Summary */}
        <div>
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 sticky top-28">
            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>

            {hasMugInCart && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-400">Karachi Delivery Only: </span>
                  <span>Order contains ceramic mugs (local rider dispatch).</span>
                </div>
              </div>
            )}

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
                    {(item.productId.startsWith("mug-") || item.title.toLowerCase().includes("mug")) && (
                      <span className="inline-block mt-0.5 text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1 rounded">
                        Karachi Only
                      </span>
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
                <span>Shipping — {shippingLabel}</span>
                <span className="text-white font-medium">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-bold font-mono">FREE</span>
                  ) : (
                    `Rs. ${shippingCost.toLocaleString()}`
                  )}
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

