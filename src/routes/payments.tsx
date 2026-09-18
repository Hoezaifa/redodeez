import { createFileRoute } from "@tanstack/react-router";
import { Building2, Smartphone, Wallet, ShieldCheck, CheckCircle2, Copy, CreditCard, Banknote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shop/ProductRow";
import { bankDetails, paymentMethods, whatsappLink, SITE_URL } from "@/data/site";
import { useState } from "react";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payment Methods & Secure Checkout — Deez Prints" },
      {
        name: "description",
        content:
          "Official payment guide for Deez Prints. Supported methods include Meezan Bank Direct Transfer, Easypaisa, JazzCash, and Raast Instant Pay.",
      },
      { property: "og:title", content: "Payment Methods — Deez Prints" },
      {
        property: "og:description",
        content: "Pay securely via Meezan Bank, Easypaisa, JazzCash, or Raast.",
      },
      { property: "og:url", content: `${SITE_URL}/payments` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/payments` }],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="edge py-14 md:py-20 space-y-16">
      {/* Header */}
      <SectionHeading
        eyebrow="Payment Options"
        title={"Supported\nPayment Methods"}
        sub="Transparent, direct, and zero-fee. Pay using Meezan Bank transfer, Easypaisa, JazzCash, or Raast."
      />

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Meezan Bank */}
        <Reveal>
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

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Bank:</span> <span className="text-white font-bold">{bankDetails.meezan.bankName}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Title:</span> <span className="text-white font-bold">{bankDetails.meezan.accountTitle}</span>
                </div>
                <div className="flex justify-between text-zinc-400 items-center">
                  <span>Account #:</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.meezan.accountNumber, "meezan")}
                    className="flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    {bankDetails.meezan.accountNumber} <Copy className="w-3 h-3" />
                  </button>
                </div>
                {copied === "meezan" && (
                  <p className="text-[10px] text-emerald-400 text-right">Copied to clipboard!</p>
                )}
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Instant IBFT Settlement
            </span>
          </div>
        </Reveal>

        {/* Mobile Wallets (Easypaisa & JazzCash) */}
        <Reveal delay={0.08}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Easypaisa &amp; JazzCash
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Send money directly from your Easypaisa or JazzCash mobile wallet in seconds.
              </p>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Wallets:</span> <span className="text-white font-bold">Easypaisa / JazzCash</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Title:</span> <span className="text-white font-bold">{bankDetails.easypaisa.accountTitle}</span>
                </div>
                <div className="flex justify-between text-zinc-400 items-center">
                  <span>Number:</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.easypaisa.accountNumber, "wallet")}
                    className="flex items-center gap-1 text-emerald-400 font-bold hover:underline"
                  >
                    {bankDetails.easypaisa.accountNumber} <Copy className="w-3 h-3" />
                  </button>
                </div>
                {copied === "wallet" && (
                  <p className="text-[10px] text-emerald-400 text-right">Copied to clipboard!</p>
                )}
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Zero Wallet Transfer Fee
            </span>
          </div>
        </Reveal>

        {/* Raast Instant Pay */}
        <Reveal delay={0.16}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-amber-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Raast Instant Pay
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                State Bank of Pakistan's instant payment system. Pay from any Pakistani bank app using our Raast ID.
              </p>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Network:</span> <span className="text-white font-bold">SBP Raast System</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Title:</span> <span className="text-white font-bold">{bankDetails.raast.accountTitle}</span>
                </div>
                <div className="flex justify-between text-zinc-400 items-center">
                  <span>Raast ID:</span>
                  <button
                    onClick={() => copyToClipboard(bankDetails.raast.accountNumber, "raast")}
                    className="flex items-center gap-1 text-amber-400 font-bold hover:underline"
                  >
                    {bankDetails.raast.accountNumber} <Copy className="w-3 h-3" />
                  </button>
                </div>
                {copied === "raast" && (
                  <p className="text-[10px] text-emerald-400 text-right">Copied to clipboard!</p>
                )}
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Zero Transaction Fee · Instant
            </span>
          </div>
        </Reveal>
      </div>

      {/* Step-by-Step Payment Process */}
      <div className="border border-white/10 bg-surface/50 rounded-2xl p-8 sm:p-10 space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <p className="label-mono text-primary">How It Works</p>
          <h2 className="text-2xl font-bold uppercase text-white">4 Simple Steps to Complete Payment</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ["01", "Select Method", "Choose Meezan Bank, Easypaisa, JazzCash, or Raast at checkout."],
            ["02", "Transfer Funds", "Transfer the exact order total using the account details above."],
            ["03", "Keep Receipt", "Save the transaction reference number or take a screenshot."],
            ["04", "Instant Confirm", "Enter reference at checkout or WhatsApp us for instant dispatch."],
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
