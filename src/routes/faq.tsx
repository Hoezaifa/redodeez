import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/shop/ProductRow";
import { faqs, SITE_URL } from "@/data/site";
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
      { property: "og:url", content: `${SITE_URL}/faq` },
      { property: "og:site_name", content: "Deez Prints" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/faq` }],
  }),
  component: Faq,
});

const sizeCharts: Record<
  string,
  {
    data: [string, string, string][];
    note: string;
  }
> = {
  "Acid Wash": {
    data: [
      ["Small", "22", "28"],
      ["Medium", "23", "29"],
      ["Large", "24", "30"],
    ],
    note: "Acid Wash vintage tees are available in S, M, and L sizes only.",
  },
  "Drop Shoulder": {
    data: [
      ["Small", "21", "27"],
      ["Medium", "22", "28"],
      ["Large", "23", "29"],
      ["XL", "24", "30"],
    ],
    note: "Drop shoulder fits run oversized — size down for a regular fit.",
  },
  "Regular Fit": {
    data: [
      ["Small", "19", "26"],
      ["Medium", "20", "27"],
      ["Large", "21", "28"],
      ["XL", "22", "29"],
      ["XXL", "23", "30"],
    ],
    note: "Standard breathable everyday streetwear fit.",
  },
};

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFit, setActiveFit] = useState<keyof typeof sizeCharts>("Acid Wash");

  const categories = ["All", "Payments", "Shipping", "Returns", "Custom Orders", "Sizing", "Production"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="edge py-14 md:py-20">
      <JsonLd data={faqPageSchema(faqs)} />
      <SectionHeading eyebrow="Help" title={"Questions,\nanswered"} />

      {/* Category filter pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpen(0);
            }}
            className={cn(
              "px-4 py-2 text-xs font-mono font-bold uppercase transition-all rounded-full border border-white/10 cursor-pointer",
              selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-surface text-muted-foreground hover:border-white/20 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="border-t border-border">
          {filteredFaqs.map((f, i) => (
            <div key={f.q} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <div className="space-y-1">
                  {f.category && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block">
                      {f.category}
                    </span>
                  )}
                  <span className="font-display text-lg font-extrabold uppercase tracking-tight block">
                    {f.q}
                  </span>
                </div>
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
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <p className="label-mono font-bold uppercase tracking-wider text-primary">Size guide (inches)</p>
          </div>

          {/* Fit Selector Tabs */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {Object.keys(sizeCharts).map((fitName) => (
              <button
                key={fitName}
                type="button"
                onClick={() => setActiveFit(fitName)}
                className={cn(
                  "px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider border rounded-none transition-colors cursor-pointer",
                  activeFit === fitName
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface/80 text-muted-foreground border-border hover:text-foreground hover:border-border/80"
                )}
              >
                {fitName}
              </button>
            ))}
          </div>

          <table className="mt-5 w-full text-sm">
            <thead>
              <tr className="label-mono text-muted-foreground text-xs uppercase">
                <th className="py-2 text-left font-bold">Size</th>
                <th className="py-2 text-center font-bold">Chest</th>
                <th className="py-2 text-right font-bold">Length</th>
              </tr>
            </thead>
            <tbody>
              {sizeCharts[activeFit].data.map(([s, c, l]) => (
                <tr key={s} className="border-t border-border">
                  <td className="py-2.5 font-mono font-semibold text-foreground">{s}</td>
                  <td className="py-2.5 text-center font-mono text-foreground">{c}&Prime;</td>
                  <td className="py-2.5 text-right font-mono text-foreground">{l}&Prime;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="label-mono mt-4 text-xs text-muted-foreground border-t border-border/60 pt-3">
            {sizeCharts[activeFit].note}
          </p>
        </aside>
      </div>
    </div>
  );
}
