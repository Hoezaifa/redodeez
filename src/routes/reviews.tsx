import { createFileRoute } from "@tanstack/react-router";
import { Star, CheckCircle2, MapPin, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shop/ProductRow";
import { site, whatsappLink } from "@/data/site";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Testimonials — Deez Prints" },
      {
        name: "description",
        content:
          "Read verified 4.9/5 star reviews from streetwear enthusiasts across Pakistan. Real feedback on oversized drop-shoulder tees, acid wash, custom DTF prints, and delivery.",
      },
      { property: "og:title", content: "Customer Reviews — Deez Prints" },
      {
        property: "og:description",
        content: "Rated 4.9/5 by 500+ verified streetwear buyers in Pakistan.",
      },
    ],
  }),
  component: ReviewsPage,
});

const testimonials = [
  {
    name: "Hassan Raza",
    location: "Lahore",
    rating: 5,
    date: "Verified Buyer",
    item: "Oversized Acid Wash Tee",
    comment:
      "The heavy fabric and print quality exceeded my expectations. Print detail is sharp and crisp after multiple washes. Best streetwear brand in Pakistan right now!",
  },
  {
    name: "Zainab Malik",
    location: "Islamabad",
    rating: 5,
    date: "Verified Buyer",
    item: "Custom DTF Hoodie",
    comment:
      "Sent my artwork on WhatsApp and received a mockup within 30 minutes. Order arrived in 3 days. Super slick packaging and solid customer support!",
  },
  {
    name: "Usman Tariq",
    location: "Karachi",
    rating: 5,
    date: "Verified Buyer",
    item: "Retro Football Jersey",
    comment:
      "Fast dispatch, payment verification was seamless via Easypaisa, and the fit is perfect drop-shoulder. Will definitely order again.",
  },
  {
    name: "Bilal Ahmed",
    location: "Rawalpindi",
    rating: 5,
    date: "Verified Buyer",
    item: "Berserk Oversized Drop Shoulder Tee",
    comment:
      "240 GSM heavy cotton feel is insane. Doesn't feel cheap at all. Print doesn't peel off like local vendors. 10/10 recommendation.",
  },
  {
    name: "Ayesha Khan",
    location: "Peshawar",
    rating: 5,
    date: "Verified Buyer",
    item: "Anime Tapestry Wall Art",
    comment:
      "Hanged it in my studio room and it instantly changed the vibe. Color vibrancy is top notch and fabric quality is super durable.",
  },
  {
    name: "Hamza Sheikh",
    location: "Faisalabad",
    rating: 5,
    date: "Verified Buyer",
    item: "Custom DTF T-Shirt",
    comment:
      "Got 5 custom printed tees for our indie band. Deez Prints delivered within 4 days with precise color matching. Fantastic service!",
  },
];

function ReviewsPage() {
  return (
    <div className="edge py-14 md:py-20 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Community Voice"
          title={"Customer\nReviews"}
          sub="Real feedback from streetwear enthusiasts and custom print clients across Pakistan."
        />
        <div className="flex items-center gap-3 bg-surface border border-white/10 px-5 py-3 rounded-2xl text-sm self-start md:self-auto">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-bold text-white text-base">4.9 / 5.0</span>
          <span className="text-zinc-500 font-mono text-xs">· 500+ Verified Reviews</span>
        </div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {testimonials.map((t, idx) => (
          <Reveal key={t.name} delay={idx * 0.06}>
            <div className="h-full bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {t.date}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 italic leading-relaxed">
                  &quot;{t.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-primary" /> {t.location}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-white/5">
                  {t.item}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Submit Review CTA */}
      <div className="border border-white/10 bg-surface/50 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto mt-12">
        <h3 className="text-xl font-bold uppercase text-white">Own a Deez Prints Piece?</h3>
        <p className="text-sm text-muted-foreground">
          We&apos;d love to hear your thoughts or see your fit pic! Share your review directly with our Karachi studio team.
        </p>
        <div className="pt-2">
          <MagneticButton href={whatsappLink("Hi! I'd like to leave a review for my recent Deez Prints order.")}>
            <MessageSquare className="w-4 h-4" /> Submit Feedback via WhatsApp
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
