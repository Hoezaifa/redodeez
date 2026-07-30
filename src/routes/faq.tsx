import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/shop/ProductRow";
import { faqs } from "@/data/site";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Size Guide — Deez Prints" },
      {
        name: "description",
        content:
          "Answers on delivery times, payment methods, exchanges, order tracking and sizing for Deez Prints orders across Pakistan.",
      },
      { property: "og:title", content: "FAQ — Deez Prints" },
      { property: "og:description", content: "Delivery, payments, exchanges and sizing answered." },
    ],
  }),
  component: Faq,
});

const sizeChart = [
  ["S", "38", "27"],
  ["M", "40", "28"],
  ["L", "42", "29"],
  ["XL", "44", "30"],
  ["XXL", "46", "31"],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="edge py-14 md:py-20">
      <JsonLd data={faqPageSchema(faqs)} />
      <SectionHeading eyebrow="Help" title={"Questions,\nanswered"} />

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="border-t border-border">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-extrabold uppercase tracking-tight">
                  {f.q}
                </span>
                <Plus
                  className={cn(
                    "h-4 w-4 shrink-0 text-primary transition-transform duration-300",
                    open === i && "rotate-45",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                )}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <aside className="self-start border border-border bg-surface p-6">
          <p className="label-mono">Size guide (inches)</p>
          <table className="mt-5 w-full text-sm">
            <thead>
              <tr className="label-mono text-muted-foreground">
                <th className="py-2 text-left font-normal">Size</th>
                <th className="py-2 text-left font-normal">Chest</th>
                <th className="py-2 text-left font-normal">Length</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map(([s, c, l]) => (
                <tr key={s} className="border-t border-border">
                  <td className="py-2.5 font-mono">{s}</td>
                  <td className="py-2.5 text-muted-foreground">{c}</td>
                  <td className="py-2.5 text-muted-foreground">{l}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="label-mono mt-5 text-muted-foreground">
            Drop shoulder fits run oversized — size down for a regular fit.
          </p>
        </aside>
      </div>
    </div>
  );
}
