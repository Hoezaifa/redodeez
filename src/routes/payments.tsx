import { createFileRoute } from "@tanstack/react-router";
import { Building2, Smartphone, ShieldCheck, CheckCircle2, Banknote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shop/ProductRow";
import { SITE_URL } from "@/data/site";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payment Methods & Secure Checkout — Deez Prints" },
      {
        name: "description",
        content:
          "Official payment guide for Deez Prints. Supported methods include Easypaisa, Meezan Bank Transfer, and Cash on Delivery (Karachi only).",
      },
      { property: "og:title", content: "Payment Methods — Deez Prints" },
      {
        property: "og:description",
        content: "Pay securely via Easypaisa, Meezan Bank Transfer, or Cash on Delivery (Karachi only).",
      },
      { property: "og:url", content: `${SITE_URL}/payments` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/payments` }],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <div className="edge py-14 md:py-20 space-y-16">
      {/* Header */}
      <SectionHeading
        eyebrow="Payment Options"
        title={"Supported\nPayment Methods"}
        sub="Transparent, direct, and zero-fee. Pay using Easypaisa, Meezan Bank transfer, or Cash on Delivery (Karachi only)."
      />

      {/* Authoritative Methods Grid matching Checkout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Easypaisa */}
        <Reveal>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Easypaisa
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Send payment directly from your Easypaisa mobile wallet or via Raast ID. Available for all orders nationwide.
              </p>

              <div className="bg-zinc-900/90 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Instant Mobile App &amp; Raast Transfer</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed pt-1.5 border-t border-white/5">
                  Official payment details are provided securely at checkout on your private order confirmation screen when placing your order.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Available Nationwide · Zero Fee
            </span>
          </div>
        </Reveal>

        {/* Meezan Bank */}
        <Reveal delay={0.08}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-orange-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Meezan Bank Transfer
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Direct online bank transfer via Meezan Mobile App, IBFT, or any Pakistani bank account.
              </p>

              <div className="bg-zinc-900/90 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-orange-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Meezan Bank · Online IBFT · Raast ID</span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed pt-1.5 border-t border-white/5">
                  Full bank account details and Raast transfer coordinates are shown securely at checkout on your order confirmation page.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Available Nationwide · Instant IBFT
            </span>
          </div>
        </Reveal>

        {/* Cash on Delivery (Karachi Only) */}
        <Reveal delay={0.16}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Banknote className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Cash on Delivery
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded font-semibold">
                  Karachi Only
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pay with cash directly to the rider upon delivery at your doorstep in Karachi. Orders are verified via WhatsApp before dispatch.
              </p>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Karachi delivery via rider</span>
                </div>
                <div className="text-[11px] text-zinc-400 pt-1 leading-relaxed border-t border-white/5">
                  <strong className="text-zinc-300">Outside Karachi:</strong> Advance payment via Easypaisa or Meezan Bank is required to confirm your order.
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20 inline-block text-center">
              Strictly Karachi Only
            </span>
          </div>
        </Reveal>
      </div>

      {/* Step-by-Step Payment Process */}
      <div className="border border-white/10 bg-surface/50 rounded-2xl p-8 sm:p-10 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <p className="label-mono text-primary">How It Works</p>
          <h2 className="text-2xl font-bold uppercase text-white">Pay Online &amp; Share Receipt on WhatsApp</h2>
          <p className="text-xs sm:text-sm text-zinc-400">Place your order, transfer the payment, then share the receipt on WhatsApp.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ["01", "Place Order", "Choose Easypaisa, Meezan Bank, or Cash on Delivery (Karachi only) at checkout."],
            ["02", "Transfer Funds", "Use the official payment account details shown on your order confirmation screen to complete the transfer."],
            ["03", "Keep Receipt", "Save the transaction reference number or take a payment screenshot."],
            ["04", "WhatsApp Us", "Share receipt on WhatsApp (0327 2487127) for instant order confirmation."],
          ].map(([num, title, desc]) => (
            <div key={num} className="bg-zinc-950 border border-white/5 rounded-xl p-5 space-y-2">
              <span className="label-mono text-primary font-bold text-sm">{num}</span>
              <h4 className="font-bold text-white uppercase text-base">{title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Statement */}
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto text-center space-y-4">
        <ShieldCheck className="w-10 h-10 text-primary mx-auto" />
        <h3 className="text-xl font-bold uppercase text-white">100% Protected Transactions</h3>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto">
          We prioritize absolute security. All payment receipts are double-verified by our Karachi finance team. No hidden processing charges or extra taxes added at checkout.
        </p>
      </div>
    </div>
  );
}
