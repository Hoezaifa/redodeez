import { createFileRoute } from "@tanstack/react-router";
import { Building2, Smartphone, Wallet, ShieldCheck, CheckCircle2, Copy, CreditCard, Banknote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shop/ProductRow";
import { bankDetails, paymentMethods, whatsappLink } from "@/data/site";
import { useState } from "react";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Payment Methods & Secure Checkout — Deez Prints" },
      {
        name: "description",
        content:
          "Official payment guide for Deez Prints. Supported methods include Visa/Mastercard (IBAN), Meezan Bank Direct, Easypaisa, JazzCash, Zindigi, and Cash on Delivery.",
      },
      { property: "og:title", content: "Payment Methods — Deez Prints" },
      {
        property: "og:description",
        content: "Pay securely via Meezan Bank, Easypaisa, JazzCash, or Card.",
      },
    ],
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
        sub="Transparent, encrypted, and direct. Pay using bank transfer, mobile wallets, or card."
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

        {/* Mobile Wallets (Easypaisa / JazzCash / Zindigi) */}
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
                Send money directly from your mobile wallet application in seconds.
              </p>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Wallets:</span> <span className="text-white font-bold">Easypaisa / JazzCash / Zindigi</span>
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

        {/* Visa / Mastercard & Cards */}
        <Reveal delay={0.16}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                Visa &amp; Mastercard
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Pay using any debit or credit card through bank transfer or online banking apps.
              </p>

              <div className="bg-zinc-900 border border-white/5 rounded-xl p-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Cards Supported:</span> <span className="text-white font-bold">Visa / Mastercard / UnionPay</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Protection:</span> <span className="text-emerald-400 font-bold">3D Secure Verified</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Verification:</span> <span className="text-white font-bold">Instant Reference</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-900/60 px-3 py-1.5 rounded border border-white/5 inline-block text-center">
              Bank App Card Transfer
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
            ["01", "Select Method", "Choose Meezan Bank, Easypaisa, or JazzCash at checkout."],
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
