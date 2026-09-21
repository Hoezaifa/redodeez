import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Truck,
  Users,
  Calendar,
  ShieldCheck,
  Gem,
  RefreshCw,
  Headphones,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_URL } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Transparency — Real People. Real Prints. No Bullshit | Deez Prints" },
      {
        name: "description",
        content:
          "Deez Prints is built by people who actually care about what they wear. 10,000+ orders delivered, heavyweight blanks, detailed prints, and 7-day exchange.",
      },
      { property: "og:title", content: "Trust & Transparency | Deez Prints" },
      {
        property: "og:description",
        content:
          "Real People. Real Prints. No Bullshit. 10,000+ orders delivered across Pakistan. 100% quality guaranteed with 7-day exchange.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/trust` },
      { property: "og:site_name", content: "Deez Prints" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trust & Transparency — Deez Prints" },
      {
        name: "twitter:description",
        content: "Real People. Real Prints. No Bullshit. Made to order at our Karachi studio.",
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/trust` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Permanent+Marker&display=swap",
      },
    ],
  }),
  component: TrustPage,
});

/* ─── Typography presets ────────────────────────────────── */
const condensedFont = { fontFamily: "'Bebas Neue', sans-serif" };
const markerFont = { fontFamily: "'Permanent Marker', cursive" };

/* ─── Stats Strip Data ──────────────────────────────────── */
const stats = [
  {
    icon: Truck,
    value: "10,000+",
    label: "Orders Delivered",
    sub: "Across Pakistan",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Happy Customers",
    sub: "Nationwide Community",
  },
  {
    icon: Calendar,
    value: "6+ Years",
    label: "Printing Experience",
    sub: "Est. 2023 (Rebuilt 2026)",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Quality Guaranteed",
    sub: "7-Day Exchange",
  },
];

/* ─── Promises Data ─────────────────────────────────────── */
const promises = [
  {
    icon: Gem,
    title: "Premium Quality",
    desc: "Heavyweight blanks, high-detail prints, built to last.",
  },
  {
    icon: Truck,
    title: "Nationwide Shipping",
    desc: "TCS, Leopards, M&P, Bykea.\nUsually within 3–5 working days.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    desc: "Meezan Bank, Easypaisa,\nJazzCash & Raast.",
  },
  {
    icon: RefreshCw,
    title: "7-Day Exchange",
    desc: "If something isn't right,\nwe've got you covered.",
  },
  {
    icon: Headphones,
    title: "Real Support",
    desc: "Actual humans. Fast replies.\nNo automated nonsense.",
  },
];

/* ─── Process Steps Data ────────────────────────────────── */
const processSteps = [
  {
    num: "01",
    title: "You Order",
    desc: "Pick your design or send us your custom artwork.",
  },
  {
    num: "02",
    title: "We Print",
    desc: "Produced at our Karachi studio.",
  },
  {
    num: "03",
    title: "We Pack",
    desc: "Carefully inspected, securely packed.",
  },
  {
    num: "04",
    title: "It Ships",
    desc: "Nationwide, with tracking. Usually 3–5 working days.",
  },
];

/* ─── Community Photos ──────────────────────────────────── */
const communityPhotos = [
  {
    title: "Zoro Bushido Acid Wash Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970863/deez-prints/covers/zoro_bushido_acid_wash_new.jpg",
  },
  {
    title: "Majin Vegeta Acid Wash Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970867/deez-prints/covers/majin_vegeta_acid_wash_new.jpg",
  },
  {
    title: "Berserk Skull Blade Acid Wash Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970854/deez-prints/covers/berserk_skull_blade_acid_wash_new.jpg",
  },
  {
    title: "Cupid Vintage Drop Shoulder Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970851/deez-prints/covers/cupid_vintage_white_new.jpg",
  },
  {
    title: "Formula Speed Acid Wash Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970860/deez-prints/covers/formula_speed_acid_wash_new.jpg",
  },
  {
    title: "Sukuna Cursed Drop Shoulder Tee",
    src: "https://res.cloudinary.com/okcxaese/image/upload/v1788970875/deez-prints/covers/sukuna_cursed_drop_shoulder_new.png",
  },
];

function TrustPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Trust & Transparency", url: `${SITE_URL}/trust` },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-primary selection:text-black">
      {/* Structured Data */}
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        {/* Background ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none" />

        <div className="edge py-12 md:py-20 lg:py-24 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column — Statement & CTAs */}
            <Reveal className="lg:col-span-7 flex flex-col" y={20}>
              <div
                className="font-mono text-primary uppercase tracking-[0.2em] mb-4 text-xs font-bold"
              >
                TRUST &amp; TRANSPARENCY
              </div>

              <h1
                className="uppercase leading-[0.9] tracking-[0.01em] text-white"
                style={{
                  ...condensedFont,
                  fontSize: "clamp(3.8rem, 10vw, 7.5rem)",
                }}
              >
                REAL PEOPLE.
                <br />
                REAL PRINTS.
                <br />
                <span className="text-primary">NO BULLSHIT.</span>
              </h1>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mt-6 mb-8 max-w-xl">
                Deez Prints is built by people who actually care about what they wear. From premium
                blanks to detailed prints, we keep things authentic, transparent, and customer-first.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 bg-primary text-black font-extrabold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(249,115,22,0.4)] active:scale-[0.98]"
                >
                  EXPLORE COLLECTIONS &rarr;
                </Link>

                <a
                  href="#story"
                  className="inline-flex items-center gap-2 border border-white/20 bg-black/40 text-white font-extrabold uppercase tracking-wider text-xs md:text-sm px-7 py-3.5 transition-all duration-200 hover:border-white/50 hover:bg-white/5 active:scale-[0.98]"
                >
                  OUR STORY &rarr;
                </a>
              </div>
            </Reveal>

            {/* Right Column — Model Photo with Graffiti */}
            <Reveal className="lg:col-span-5 relative" delay={0.15} y={20}>
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-none overflow-hidden border border-white/[0.08] shadow-2xl group">
                <img
                  src="/assets/trust/hero-streetwear.webp"
                  alt="Deez Prints heavyweight streetwear t-shirt back print editorial campaign"
                  className="w-full h-auto object-cover max-h-[560px] filter brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-[1.02]"
                  width={800}
                  height={1000}
                  loading="eager"
                />

                {/* Graffiti Chalk Overlays */}
                <div
                  className="absolute top-6 left-6 text-white/40 text-sm md:text-base leading-tight select-none pointer-events-none -rotate-6"
                  style={markerFont}
                >
                  STREETWEAR
                  <br />
                  CUSTOM PRINTS
                  <br />
                  NO LIMITS.
                </div>

                <div
                  className="absolute bottom-6 right-6 text-right select-none pointer-events-none rotate-3"
                  style={markerFont}
                >
                  <span className="text-white/60 text-xs md:text-sm block">KARACHI</span>
                  <span className="text-primary text-sm md:text-base block">TO EVERYWHERE</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: STATS STRIP
          ═══════════════════════════════════════════════════════ */}
      <section className="border-b border-white/[0.08] bg-[#080808]">
        <div className="edge py-8 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {stats.map((st, i) => {
              const Icon = st.icon;
              return (
                <Reveal key={st.label} delay={i * 0.05}>
                  <div
                    className={`flex items-start gap-4 ${
                      i !== 0 ? "pt-4 md:pt-0 md:pl-6 lg:pl-8" : ""
                    }`}
                  >
                    <div className="p-2.5 rounded-none bg-primary/10 text-primary shrink-0 mt-0.5 border border-primary/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div
                        className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none"
                        style={condensedFont}
                      >
                        {st.value}
                      </div>
                      <div className="text-xs font-bold text-zinc-200 mt-1 uppercase tracking-wider">
                        {st.label}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        {st.sub}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: OUR STORY
          ═══════════════════════════════════════════════════════ */}
      <section id="story" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#060606]">
        <div className="edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column — Workshop Photo Collage */}
            <div className="lg:col-span-4 relative">
              <Reveal y={16}>
                <div className="relative space-y-4">
                  {/* Workshop Photo */}
                  <div className="border border-white/[0.1] bg-[#0c0c0c] p-2 shadow-2xl relative">
                    <img
                      src="/assets/trust/workshop-screenprint.webp"
                      alt="Deez Prints garment printing workshop press and screens in Karachi"
                      className="w-full h-auto object-cover filter contrast-105"
                      width={600}
                      height={450}
                      loading="lazy"
                    />
                  </div>

                  {/* Taped Sticky Note */}
                  <div
                    className="absolute -bottom-6 -right-3 sm:-right-6 bg-[#f0f0f0] text-black px-5 py-4 shadow-2xl rotate-3 border border-black/10 z-20"
                    style={{ maxWidth: "160px" }}
                  >
                    {/* Simulated Tape Strip */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-100/50 backdrop-blur-xs -rotate-2 border-l border-r border-black/10" />

                    <div
                      className="text-center font-bold tracking-wider text-xs md:text-sm uppercase leading-tight"
                      style={markerFont}
                    >
                      IDEAS
                      <br />
                      BLANKS
                      <br />
                      PRINTS
                      <br />
                      PEOPLE
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Center Column — The Story Copy */}
            <Reveal className="lg:col-span-5 flex flex-col" delay={0.1} y={20}>
              <div className="font-mono text-primary uppercase tracking-[0.2em] mb-2 text-xs font-bold">
                OUR STORY
              </div>

              <h2
                className="text-white uppercase leading-[0.92] tracking-[0.01em] mb-6"
                style={{
                  ...condensedFont,
                  fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                }}
              >
                FROM AN IDEA
                <br />
                TO A REAL BRAND
              </h2>

              <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
                <p>
                  Deez Prints started in 2023 with a simple idea: make the kind of clothes you
                  actually want to wear — not whatever happens to be sitting on a shelf.
                </p>

                <p className="italic text-zinc-500 font-mono text-xs">
                  Then, well... procrastination happened.
                </p>

                <p>
                  The idea never really went away. In 2026, we brought it back properly — with a
                  real storefront, a growing catalog, better production, and a much clearer vision
                  for what Deez Prints should be.
                </p>

                <p>
                  Today, we're a streetwear and custom print brand based in Karachi, Pakistan,
                  making heavyweight tees, oversized and drop-shoulder cuts, acid wash pieces,
                  hoodies, jerseys, tapestries and accessories — plus fully custom printing for
                  when you already have the idea and just need someone to bring it to life.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-white text-black font-extrabold uppercase tracking-wider text-xs px-6 py-3.5 transition-all duration-200 hover:bg-primary hover:text-black active:scale-[0.98]"
                >
                  LEARN MORE ABOUT US &rarr;
                </Link>
              </div>
            </Reveal>

            {/* Right Column — Collar Tag Macro Shot */}
            <Reveal className="lg:col-span-3 relative hidden sm:block" delay={0.2} y={16}>
              <div className="border border-white/[0.1] bg-[#0c0c0c] p-2 relative shadow-2xl">
                <img
                  src="/assets/trust/collar-tag.webp"
                  alt="Deez Prints heavyweight garment woven collar tag macro"
                  className="w-full h-auto object-cover filter contrast-105"
                  width={400}
                  height={400}
                  loading="lazy"
                />

                <div
                  className="mt-4 text-center text-white/50 text-xs md:text-sm tracking-widest uppercase"
                  style={markerFont}
                >
                  GOOD IDEAS TAKE TIME.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: OUR PROMISES
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#080808]">
        <div className="edge">
          <Reveal y={16}>
            <div className="mb-12">
              <div className="font-mono text-primary uppercase tracking-[0.2em] mb-2 text-xs font-bold">
                OUR PROMISES
              </div>
              <h2
                className="text-white uppercase leading-[0.92] tracking-[0.01em]"
                style={{
                  ...condensedFont,
                  fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                }}
              >
                WHAT YOU CAN EXPECT
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {promises.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 0.05} y={16}>
                  <div className="p-6 border border-white/[0.08] bg-black/40 h-full flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:bg-black/60 group">
                    <div>
                      <div className="w-10 h-10 flex items-center justify-center border border-white/20 text-white mb-5 group-hover:border-primary group-hover:text-primary transition-colors">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                      <h3
                        className="text-lg font-bold text-white uppercase tracking-wider mb-2"
                        style={condensedFont}
                      >
                        {p.title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: OUR PROCESS
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#060606]">
        <div className="edge">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column — Hoodie Model Photograph */}
            <Reveal className="lg:col-span-5" y={16}>
              <div className="border border-white/[0.1] bg-[#0a0a0a] overflow-hidden shadow-2xl">
                <img
                  src="/assets/trust/process-hoodie.webp"
                  alt="Deez Prints heavyweight washed hoodie editorial model photoshoot"
                  className="w-full h-auto object-cover max-h-[520px] filter contrast-105"
                  width={600}
                  height={800}
                  loading="lazy"
                />
              </div>
            </Reveal>

            {/* Right Column — Process Steps */}
            <div className="lg:col-span-7 flex flex-col">
              <Reveal y={16}>
                <div className="font-mono text-primary uppercase tracking-[0.2em] mb-2 text-xs font-bold">
                  OUR PROCESS
                </div>
                <h2
                  className="text-white uppercase leading-[0.92] tracking-[0.01em] mb-4"
                  style={{
                    ...condensedFont,
                    fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                  }}
                >
                  MADE TO ORDER.
                  <br />
                  MADE WITH CARE.
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-xl">
                  Every piece is printed to order at our studio in Karachi. No mass overproduction,
                  no unnecessary waste — just high-quality, on-demand streetwear.
                </p>
              </Reveal>

              {/* 4 Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {processSteps.map((step, i) => (
                  <Reveal key={step.num} delay={i * 0.05} y={16}>
                    <div className="p-4 border border-white/[0.08] bg-black/30 h-full flex flex-col justify-between">
                      <div>
                        <div
                          className="text-2xl md:text-3xl font-extrabold text-primary mb-1 tracking-tight"
                          style={condensedFont}
                        >
                          {step.num}
                        </div>
                        <div
                          className="text-sm font-bold text-white uppercase tracking-wider mb-1.5"
                          style={condensedFont}
                        >
                          {step.title}
                        </div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: OUR COMMUNITY
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-b border-white/[0.08] bg-[#080808]">
        <div className="edge">
          {/* Header Row */}
          <Reveal y={16}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="font-mono text-primary uppercase tracking-[0.2em] mb-2 text-xs font-bold">
                  OUR COMMUNITY
                </div>
                <h2
                  className="text-white uppercase leading-[0.92] tracking-[0.01em]"
                  style={{
                    ...condensedFont,
                    fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                  }}
                >
                  REAL PEOPLE. REAL STYLE.
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm mt-2 font-mono">
                  Tag us{" "}
                  <a
                    href="https://instagram.com/deezprints"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    @deezprints
                  </a>{" "}
                  to get featured.
                </p>
              </div>

              <div>
                <a
                  href="https://instagram.com/deezprints"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary uppercase tracking-wider text-xs font-extrabold hover:text-white transition-colors"
                >
                  VIEW MORE ON INSTAGRAM &rarr;
                </a>
              </div>
            </div>
          </Reveal>

          {/* 6-Item Community Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {communityPhotos.map((photo, i) => (
              <Reveal key={photo.src} delay={i * 0.04} y={16}>
                <div className="group relative aspect-[3/4] overflow-hidden border border-white/[0.08] bg-zinc-950">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={533}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-[10px] font-mono text-zinc-300 line-clamp-2">
                      {photo.title}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: BE A PART OF DEEZ PRINTS (CTA BANNER)
          ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden border-b border-white/[0.08]">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="edge relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            {/* Left Marker */}
            <div
              className="text-white/40 text-sm md:text-base tracking-wider uppercase -rotate-6 select-none hidden lg:block"
              style={markerFont}
            >
              MORE DESIGNS.
              <br />
              MORE STORIES.
            </div>

            {/* Center Headline & Buttons */}
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
              <h2
                className="text-white uppercase leading-[0.95] tracking-[0.01em] mb-3"
                style={{
                  ...condensedFont,
                  fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
                }}
              >
                BE A PART OF DEEZ PRINTS
              </h2>

              <p className="text-zinc-400 text-sm md:text-base mb-8 font-mono">
                Streetwear, custom prints, tapestries and more.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 bg-primary text-black font-extrabold uppercase tracking-wider text-xs md:text-sm px-8 py-3.5 transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(249,115,22,0.4)] active:scale-[0.98]"
                >
                  SHOP NOW &rarr;
                </Link>

                <Link
                  to="/custom-print"
                  className="inline-flex items-center gap-2 border border-white/30 bg-black/60 text-white font-extrabold uppercase tracking-wider text-xs md:text-sm px-8 py-3.5 transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-[0.98]"
                >
                  CUSTOM PRINT &rarr;
                </Link>
              </div>
            </div>

            {/* Right Marker with Globe */}
            <div
              className="text-white/40 text-sm md:text-base tracking-wider uppercase rotate-6 select-none hidden lg:block text-right"
              style={markerFont}
            >
              <div className="flex items-center gap-2 justify-end">
                <span>KARACHI TO THE WORLD</span>
                <Globe className="w-5 h-5 inline text-primary/70" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8: KARACHI, PAKISTAN SIGNOFF
          ═══════════════════════════════════════════════════════ */}
      <section className="py-8 bg-black border-b border-white/[0.04]">
        <div className="edge flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-zinc-300 font-bold uppercase tracking-wider">
              KARACHI, PAKISTAN
            </span>
          </div>

          <div className="uppercase tracking-widest text-[11px] text-zinc-600">
            BUILT BY CREATIVES. FOR CREATIVES.
          </div>
        </div>
      </section>
    </div>
  );
}
