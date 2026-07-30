import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Upload,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Shirt,
  Sparkles,
  Lock,
  HelpCircle,
} from "lucide-react";
import { products } from "@/data/products";
import { whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/custom-print")({
  head: () => ({
    meta: [
      { title: "Custom Printing — Upload Artwork | Deez Prints" },
      {
        name: "description",
        content:
          "Custom print Regular Tees, Drop Shoulder, Acid Wash, and Tapestries. Send your quote request and get replied within minutes on WhatsApp.",
      },
      { property: "og:title", content: "Custom Printing — Deez Prints" },
      {
        property: "og:description",
        content: "Custom prints on premium blanks and tapestries. Direct quote response on WhatsApp within minutes.",
      },
    ],
  }),
  component: CustomPrint,
});

// Thumbnails from existing products
const regTeeProduct = products.find((p) => p.subcategory === "oversized") ?? products[0];
const dropProduct = products.find((p) => p.title.toLowerCase().includes("drop")) ?? products[1];
const acidProduct = products.find((p) => p.subcategory === "acid-wash") ?? products[2];
const tapestryProduct = products.find((p) => p.category === "wall-art") ?? products[3];

const bases = [
  {
    id: "regular",
    label: "REGULAR TEE",
    subtitle: "180 GSM Premium Cotton",
    isClothing: true,
    image: regTeeProduct.images[0],
  },
  {
    id: "drop-shoulder",
    label: "DROP SHOULDER",
    subtitle: "Oversized Streetwear Cut",
    isClothing: true,
    image: dropProduct.images[0],
  },
  {
    id: "acid-wash",
    label: "ACID WASH",
    subtitle: "Hand-dyed Vintage Finish",
    isClothing: true,
    image: acidProduct.images[0],
  },
  {
    id: "tapestry",
    label: "TAPESTRY",
    subtitle: "High-Quality Wall Piece",
    isClothing: false,
    image: tapestryProduct.images[0],
  },
];

const clothingSizes = ["S", "M", "L", "XL", "XXL"];
const tapestrySizes = ["3x2 ft", "4x3 ft", "5x3 ft", "6x4 ft"];

const colorOptions = [
  { id: "black", name: "Black", colorHex: "#0a0a0a" },
  { id: "white", name: "White", colorHex: "#ffffff" },
  { id: "off-white", name: "Off White", colorHex: "#f5f5dc" },
  { id: "red", name: "Red", colorHex: "#dc2626" },
  { id: "navy", name: "Navy", colorHex: "#1e3a8a" },
  { id: "dark-green", name: "Dark Green", colorHex: "#14532d" },
  { id: "beige", name: "Beige", colorHex: "#d6c0b3" },
  { id: "vintage-gray", name: "Vintage Gray", colorHex: "#52525b" },
];

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  preview: string;
}

function CustomPrint() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [base, setBase] = useState(bases[0].id);
  const [color, setColor] = useState(colorOptions[0].name);

  const [clothingSize, setClothingSize] = useState("L");
  const [tapestrySize, setTapestrySize] = useState("4x3 ft");

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [singlePlacement, setSinglePlacement] = useState<"Front" | "Back">("Front");

  const [notes, setNotes] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  const selectedBase = bases.find((b) => b.id === base)!;
  const isClothing = selectedBase.isClothing;
  const maxAllowedFiles = isClothing ? 2 : 1;
  const currentSize = isClothing ? clothingSize : tapestrySize;

  function handleSelectBase(newBaseId: string) {
    setBase(newBaseId);
    setQuoteSent(false);
    if (newBaseId === "tapestry" && files.length > 1) {
      setFiles((prev) => prev.slice(0, 1));
    }
  }

  function handleFilesAdded(newFilesList: FileList | File[]) {
    const array = Array.from(newFilesList).slice(0, maxAllowedFiles - files.length);
    if (array.length === 0) return;

    const newUploaded: UploadedFile[] = array.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newUploaded].slice(0, maxAllowedFiles));
    setQuoteSent(false);
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].preview);
      next.splice(index, 1);
      return next;
    });
  }

  function resetPlacement() {
    setSinglePlacement("Front");
  }

  function generateWhatsAppMessage() {
    const lines = [
      "🎨 *Custom Print Quote Request*",
      `• *Item:* ${selectedBase.label}`,
      `• *Color:* ${color}`,
      `• *Size:* ${currentSize}`,
    ];

    if (!isClothing) {
      lines.push(`• *Item Type:* Wall Tapestry`);
      lines.push(`• *Placement:* Single-Sided Wall Print`);
      lines.push(`• *Artwork:* ${files.length > 0 ? files[0].name : "(Will send artwork directly in WhatsApp)"}`);
    } else if (files.length === 0) {
      lines.push(`• *Placement:* ${singlePlacement}`);
      lines.push(`• *Artwork:* (Will send artwork directly in WhatsApp)`);
    } else if (files.length === 1) {
      lines.push(`• *Placement:* ${singlePlacement}`);
      lines.push(`• *Artwork File:* ${files[0].name}`);
    } else if (files.length === 2) {
      lines.push(`• *Placement:* Front + Back`);
      lines.push(`• *Front Design:* ${files[0].name}`);
      lines.push(`• *Back Design:* ${files[1].name}`);
    }

    if (notes.trim()) {
      lines.push(`• *Notes:* ${notes.trim()}`);
    }

    lines.push("\n_Please send custom quote & pricing (expecting reply within minutes)._");
    return lines.join("\n");
  }

  function sendQuote() {
    const msg = generateWhatsAppMessage();
    const url = whatsappLink(msg);
    window.open(url, "_blank");
    setQuoteSent(true);
  }

  return (
    <div className="pt-24 sm:pt-32 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Responsive Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left & Center Main Section */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-8">
          
          {/* Quick Base Item Selector Bar (Mobile & Desktop synchronized) */}
          <div className="border border-zinc-800/80 bg-zinc-950/90 rounded-xl p-4 space-y-3">
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white">
              SELECT CUSTOM BASE ITEM
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {bases.map((b) => {
                const selected = base === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSelectBase(b.id)}
                    className={cn(
                      "flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left cursor-pointer",
                      selected
                        ? "border-primary bg-primary/10 text-white font-bold shadow-sm"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white"
                    )}
                  >
                    <img src={b.image} alt={b.label} className="h-8 w-8 rounded object-cover shrink-0 border border-zinc-800" />
                    <div className="min-w-0 flex-1">
                      <span className="font-display font-black text-[11px] uppercase tracking-wider block truncate text-white">
                        {b.label}
                      </span>
                      <span className="text-[9px] text-zinc-400 block truncate font-sans">
                        {b.isClothing ? "Apparel" : "Wall Art"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hero Row: Left Title + Middle Artwork Dropzone */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            
            {/* Hero Left Title Block */}
            <div className="flex flex-col justify-between py-2 space-y-6">
              <div>
                <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl tracking-tight uppercase leading-[0.92] text-white">
                  YOUR DESIGN<span className="text-primary">.</span>
                  <br />
                  OUR PRESS<span className="text-primary">.</span>
                </h1>
                <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                  {isClothing
                    ? "Upload your artwork for custom streetwear t-shirts. Front, back, or double-sided prints."
                    : "Upload high-res artwork for custom HD fabric tapestries and wall art hanging pieces."}
                </p>
              </div>

              {/* 4 Feature Badges Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
                {[
                  { label: "PREMIUM QUALITY", icon: ShieldCheck },
                  { label: isClothing ? "DURABLE FABRIC" : "HD CANVAS", icon: Shirt },
                  { label: "FAST TURNAROUND", icon: Zap },
                  { label: "MADE TO LAST", icon: Sparkles },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider text-zinc-300">
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary shrink-0">
                      <item.icon className="h-3 w-3" />
                    </span>
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Artwork Dropzone Card */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesAdded(e.dataTransfer.files);
              }}
              className="border border-dashed border-zinc-800/90 bg-zinc-950/80 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[310px] relative"
            >
              {files.length === 0 ? (
                <div className="py-2 flex flex-col items-center">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <Upload className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wide text-white">
                    DROP YOUR {isClothing ? "ARTWORK" : "TAPESTRY ART"} HERE
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400 font-sans">
                    Upload a file or drag &amp; drop
                  </p>
                  <p className="mt-2 text-[11px] text-zinc-500 font-sans">
                    Supports: PNG, JPG, PDF, AI, PSD (Max 50MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-5 bg-primary text-black font-display font-black uppercase text-xs tracking-widest px-8 py-3.5 rounded-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-primary/20"
                  >
                    CHOOSE FILES
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-sans">
                    <Lock className="h-3 w-3" />
                    <span>Your files are secure &amp; private</span>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                    <span className="font-mono text-xs text-zinc-300">
                      Uploaded Artwork ({files.length} / {maxAllowedFiles})
                    </span>
                    {files.length < maxAllowedFiles && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        + Add 2nd Design
                      </button>
                    )}
                  </div>

                  <div className={cn("grid gap-3", files.length === 2 ? "grid-cols-2" : "max-w-xs mx-auto")}>
                    {files.map((fileObj, idx) => (
                      <div
                        key={fileObj.id}
                        className="relative border border-zinc-800 bg-zinc-900/80 rounded-lg p-2.5 flex flex-col items-center"
                      >
                        <div className="relative h-32 w-full flex items-center justify-center overflow-hidden rounded-md bg-zinc-950">
                          <img
                            src={fileObj.preview}
                            alt={fileObj.name}
                            className="h-full w-full object-contain p-2"
                          />
                          <button
                            type="button"
                            aria-label="Remove artwork"
                            onClick={() => removeFile(idx)}
                            className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/80 text-white hover:text-primary transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-2 text-[10px] font-mono text-zinc-400 truncate max-w-full">
                          {isClothing ? `Design ${idx + 1}: ` : "Wall Art: "}{fileObj.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.ai,.psd"
                multiple={isClothing}
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files) handleFilesAdded(e.target.files);
                }}
              />
            </div>
          </div>

          {/* PRINT PLACEMENT / TAPESTRY SPECS Card */}
          <div className="border border-zinc-800 bg-zinc-950/80 rounded-xl p-6 space-y-4">
            {isClothing ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    PRINT PLACEMENT
                  </h3>
                  <button
                    type="button"
                    onClick={resetPlacement}
                    className="text-xs font-mono text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                <p className="text-xs text-zinc-400 font-sans">
                  Where should your design be printed?
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSinglePlacement("Front")}
                    className={cn(
                      "py-4 px-5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-3 transition-all cursor-pointer",
                      singlePlacement === "Front"
                        ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white",
                    )}
                  >
                    <Shirt className="h-5 w-5 stroke-[1.75]" />
                    <span>FRONT ONLY</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSinglePlacement("Back")}
                    className={cn(
                      "py-4 px-5 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-3 transition-all cursor-pointer",
                      singlePlacement === "Back"
                        ? "border-primary bg-primary/10 text-primary shadow-md shadow-primary/10"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white",
                    )}
                  >
                    <Shirt className="h-5 w-5 stroke-[1.75]" />
                    <span>BACK ONLY</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    TAPESTRY PRINT DETAILS
                  </h3>
                  <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/30 px-2.5 py-0.5 rounded">
                    Wall Hanging
                  </span>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  High-definition single-sided wall print. Seamless edges with hemmed borders for effortless wall mounting.
                </p>

                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-white">HD Full Bleed Print</h4>
                    <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Edge-to-edge wall artwork printing on premium fabric banner.</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 3 Lower Highlights Cards */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "HD PRINTING",
                desc: "High resolution prints with vibrant colors that pop.",
                icon: Sparkles,
              },
              {
                title: isClothing ? "PREMIUM GARMENT" : "FABRIC CANVAS",
                desc: isClothing ? "Soft, heavy-grade cotton for long lasting wear." : "Durable wall hanging fabric canvas.",
                icon: Shirt,
              },
              {
                title: "CUSTOM RUNS",
                desc: "No minimum orders. Print your vision.",
                icon: Zap,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-zinc-800/80 bg-zinc-950/60 rounded-xl p-5 flex flex-col gap-2"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <h4 className="font-display font-black text-xs uppercase tracking-wider text-white mt-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Section */}
        <aside className="lg:col-span-5 xl:col-span-5 border border-zinc-800 bg-zinc-950/90 rounded-xl p-6 space-y-6 lg:sticky lg:top-28">
          
          {/* 1. SELECT BLANK ITEM */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
              1. SELECT BLANK ITEM
            </label>
            <div className="grid gap-2.5">
              {bases.map((b) => {
                const selected = base === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSelectBase(b.id)}
                    className={cn(
                      "relative flex items-center gap-3.5 border rounded-lg p-3 text-left transition-all cursor-pointer",
                      selected
                        ? "border-primary bg-zinc-900/90 shadow-md shadow-primary/5"
                        : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60",
                    )}
                  >
                    {/* Thumbnail Image */}
                    <div className="h-12 w-12 rounded-md bg-zinc-950 overflow-hidden border border-zinc-800 shrink-0">
                      <img src={b.image} alt={b.label} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="font-display font-black text-xs uppercase tracking-wider text-white block">
                        {b.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block truncate mt-0.5">
                        {b.subtitle}
                      </span>
                    </div>

                    {/* Active checkmark badge top right */}
                    {selected && (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-black shrink-0">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. SELECT COLOR */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
              2. SELECT COLOR
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => {
                const selected = color === c.name;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "h-9 px-3 rounded-md font-sans text-xs flex items-center gap-2 border transition-all cursor-pointer",
                      selected
                        ? "border-primary bg-zinc-900 text-white font-bold shadow-sm"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700",
                    )}
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.colorHex }}
                    />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. SELECT SIZE */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
              3. SELECT SIZE
            </label>
            {isClothing ? (
              <div className="grid grid-cols-5 gap-2">
                {clothingSizes.map((s) => {
                  const selected = clothingSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setClothingSize(s)}
                      className={cn(
                        "h-10 rounded-md font-mono text-xs font-bold border transition-all cursor-pointer",
                        selected
                          ? "bg-primary text-black border-primary shadow-sm"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {tapestrySizes.map((ts) => {
                  const selected = tapestrySize === ts;
                  return (
                    <button
                      key={ts}
                      type="button"
                      onClick={() => setTapestrySize(ts)}
                      className={cn(
                        "py-2.5 rounded-md font-mono text-xs font-bold border transition-all text-center cursor-pointer",
                        selected
                          ? "bg-primary text-black border-primary shadow-sm"
                          : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700",
                      )}
                    >
                      {ts}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* WhatsApp Quote Banner / CTA Button */}
          <div className="border-t border-zinc-800 pt-5 space-y-3">
            <button
              type="button"
              onClick={sendQuote}
              className="w-full bg-primary text-black font-display font-black uppercase text-xs tracking-wider py-4 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/20"
            >
              <span>CONTINUE TO PREVIEW</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            {quoteSent && (
              <div className="p-3 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>Quote opened in WhatsApp! We will reply within minutes.</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-zinc-400 hover:text-white transition-colors cursor-pointer pt-1">
              <HelpCircle className="h-3.5 w-3.5" />
              <a href={whatsappLink("Hi Deez Prints! I have a question about custom printing.")} target="_blank" rel="noreferrer">
                Need help? Contact us on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
