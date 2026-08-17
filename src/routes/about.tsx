import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/shop/ProductRow";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { site, usps, HERO_IMAGE, whatsappLink, SITE_URL } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Deez Prints — A Karachi Print Studio" },
      {
        name: "description",
        content:
          "Deez Prints is a Karachi-based print studio making premium streetwear and custom prints for people who'd rather wear their own ideas.",
      },
      { property: "og:title", content: "About Deez Prints" },
      { property: "og:description", content: "A Karachi print studio for bold, wearable ideas." },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:image", content: HERO_IMAGE },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: About,
});

function About() {
  return (
    <div className="edge py-14 md:py-20">
      <SectionHeading eyebrow="About" title={"Printed in\nKarachi"} sub={site.tagline} />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal className="aspect-4/5 overflow-hidden bg-surface">
          <img
            src={HERO_IMAGE}
            alt="Deez Prints oversized tee"
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={0.1} className="grid gap-6 text-sm leading-relaxed text-muted-foreground">
          <p>
            Deez Prints started with one idea: the clothes people actually want rarely exist on a
            shelf. So we built a studio around making them — heavyweight blanks, oversized cuts, and
            prints loud enough to carry a whole outfit.
          </p>
          <p>
            Everything is printed to order from our workshop in {site.location}. Drop shoulder tees,
            acid wash one-of-ones, hoodies, jerseys, tapestries and accessories — plus fully custom
            work where you send us the artwork and we handle the press.
          </p>
          <p>
            We ship nationwide via {site.couriers}, usually within {site.deliveryTime}, with secure
            payment options via Meezan Bank, Easypaisa, and JazzCash. If something isn&apos;t right,
            our 7-day exchange policy has you covered.
          </p>
          <div className="mt-2 grid gap-px bg-border sm:grid-cols-2">
            {usps.map((u) => (
              <div key={u.title} className="bg-background p-5">
                <p className="font-display text-base font-extrabold uppercase text-foreground">
                  {u.title}
                </p>
                <p className="mt-1 text-sm">{u.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <MagneticButton to="/collections">Shop the catalogue</MagneticButton>
            <MagneticButton href={whatsappLink("Hi Deez Prints!")} variant="outline">
              Talk to us
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
