import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Mail, MapPin, Clock, HelpCircle, RefreshCw, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink, SITE_URL } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Center & Customer Help — Deez Prints" },
      {
        name: "description",
        content:
          "Need help with your order, sizing, custom artwork, or delivery status? Access the Deez Prints Support Center or contact our Karachi studio on WhatsApp.",
      },
      { property: "og:title", content: "Support Center — Deez Prints" },
      {
        property: "og:description",
        content: "Customer support, order help, WhatsApp assistance, and policies.",
      },
      { property: "og:url", content: `${SITE_URL}/support` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/support` }],
  }),
  component: SupportPage,
});

const supportTopics = [
  {
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    desc: "Find quick answers on payment options, shipping times, custom art specs, and sizing.",
    link: "/faq",
    cta: "Browse FAQ",
  },
  {
    icon: Truck,
    title: "Shipping & Delivery Info",
    desc: "Track your parcel status across Pakistan, courier partners (TCS & Leopards), and rates.",
    link: "/shipping",
    cta: "View Shipping Policy",
  },
  {
    icon: RefreshCw,
    title: "Returns & Exchange",
    desc: "Initiate a 7-day hassle-free size exchange or report a defective print.",
    link: "/returns",
    cta: "Return Guidelines",
  },
  {
    icon: ShieldCheck,
    title: "Payment Gateways",
    desc: "Learn how to pay via Meezan Bank, Easypaisa, JazzCash, or Card transfer.",
    link: "/payments",
    cta: "Payment Help",
  },
];

function SupportPage() {
  return (
    <div className="edge py-14 md:py-20 space-y-16">
      {/* Header */}
      <SectionHeading
        eyebrow="Help Center"
        title={"Customer\nSupport"}
        sub="We're here to assist you 7 days a week. Fast responses, dedicated studio team."
      />

      {/* Primary Contact Channels Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Channel */}
        <Reveal>
          <div className="h-full bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:border-emerald-500/60 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Fastest Response</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-1">
                  WhatsApp Support
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Chat directly with our Karachi studio team for instant order status, sizing advice, or custom art mockups.
              </p>
            </div>
            <a
              href={whatsappLink("Hi Deez Prints! I need assistance with an order.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-colors"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp (+92 327 2487127)
            </a>
          </div>
        </Reveal>

        {/* Email Channel */}
        <Reveal delay={0.08}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Within 1 Working Day</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-1">
                  Email Studio
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Send formal inquiries, corporate custom orders, or detailed artwork files.
              </p>
            </div>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-primary text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" /> {site.email}
            </a>
          </div>
        </Reveal>

        {/* Studio Info */}
        <Reveal delay={0.16}>
          <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Main Workshop</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide mt-1">
                  Karachi Studio
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Operating online 24/7 across Pakistan. Physical dispatch studio based in Karachi.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 border-t border-white/5 pt-4">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>{site.hours}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Self-Help Support Topics Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
          Explore Support Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportTopics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <Reveal key={topic.title} delay={i * 0.06}>
                <Link
                  to={topic.link}
                  className="group h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 transition-all"
                >
                  <div className="space-y-3">
                    <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-base font-bold text-white uppercase group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{topic.desc}</p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs font-mono font-bold text-primary">
                    <span>{topic.cta}</span> <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
