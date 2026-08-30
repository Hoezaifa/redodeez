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
import { whatsappLink, SITE_URL } from "@/data/site";
import { cn } from "@/lib/utils";

import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { uploadArtworkToCloudinary } from "@/lib/cloudinary";

export const Route = createFileRoute("/custom-print")({
  head: () => ({
    meta: [
      { title: "Custom Printing — Upload Artwork | Deez Prints" },
      {
        name: "description",
        content:
          "Custom print Regular Tees, Drop Shoulder, Acid Wash, and Tapestries. Upload artwork and order custom streetwear across Pakistan.",
      },
      { property: "og:title", content: "Custom Printing — Deez Prints" },
      {
        property: "og:description",
        content:
          "Custom prints on premium blanks and tapestries. Fast nationwide delivery in 3–5 days.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/custom-print` },
      { property: "og:site_name", content: "Deez Prints" },
      { property: "og:image", content: `${SITE_URL}/assets/custom_print_mockup.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@deez_prints" },
      { name: "twitter:title", content: "Custom Printing — Deez Prints" },
      {
        name: "twitter:description",
        content:
          "Custom prints on premium blanks and tapestries. Fast nationwide delivery in 3–5 days.",
      },
      { name: "twitter:image", content: `${SITE_URL}/assets/custom_print_mockup.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/custom-print` }],
  }),
  component: CustomPrint,
});

// Thumbnails and dynamic prices from catalog products
const regTeeProduct = products.find((p) => (p.subcategory as string) === "oversized") ?? products[0];
const dropProduct = products.find((p) => p.title.toLowerCase().includes("drop")) ?? products[1];
const acidProduct = products.find((p) => p.subcategory === "acid-wash") ?? products[2];
const tapestryProduct = products.find((p) => (p.category as string) === "wall-art") ?? products[3];

const bases = [
  {
    id: "regular",
    label: "REGULAR TEE",
    subtitle: "180 GSM Premium Cotton",
    isClothing: true,
    image: regTeeProduct.images[0],
    price: regTeeProduct.price,
  },
  {
    id: "drop-shoulder",
    label: "DROP SHOULDER",
    subtitle: "Oversized Streetwear Cut",
    isClothing: true,
    image: dropProduct.images[0],
    price: dropProduct.price,
  },
  {
    id: "acid-wash",
    label: "ACID WASH",
    subtitle: "Hand-dyed Vintage Finish",
    isClothing: true,
    image: acidProduct.images[0],
    price: acidProduct.price,
  },
  {
    id: "tapestry",
    label: "TAPESTRY",
    subtitle: "High-Quality Wall Piece",
    isClothing: false,
    image: tapestryProduct.images[0],
    price: tapestryProduct.price,
  },
];

const clothingSizes = ["S", "M", "L", "XL", "XXL"];
const acidWashSizes = ["S", "M", "L"];
const tapestrySizes = ["3x2 ft", "4x3 ft", "5x3 ft", "6x4 ft"];

const regularTeeColorOptions = [
  { id: "black", name: "Black", colorHex: "#0a0a0a" },
  { id: "charcoal", name: "Charcoal", colorHex: "#363636" },
  { id: "white", name: "White", colorHex: "#ffffff" },
  { id: "steel-grey", name: "Steel Grey", colorHex: "#71717a" },
  { id: "navy-blue", name: "Navy Blue", colorHex: "#1e3a8a" },
  { id: "army-green", name: "Army Green", colorHex: "#3f4e38" },
  { id: "red", name: "Red", colorHex: "#dc2626" },
  { id: "beige", name: "Beige", colorHex: "#d6c0b3" },
  { id: "brown", name: "Brown", colorHex: "#5c3d2e" },
];

const dropShoulderColorOptions = [
  { id: "black", name: "Black", colorHex: "#0a0a0a" },
  { id: "white", name: "White", colorHex: "#ffffff" },
  { id: "grey", name: "Grey", colorHex: "#52525b" },
  { id: "red", name: "Red", colorHex: "#dc2626" },
  { id: "blue", name: "Blue", colorHex: "#2563eb" },
  { id: "army-green", name: "Army Green", colorHex: "#3f4e38" },
  { id: "beige", name: "Beige", colorHex: "#d6c0b3" },
  { id: "brown", name: "Brown", colorHex: "#5c3d2e" },
];

const acidWashColorOptions = [
  { id: "black", name: "Black", colorHex: "#0a0a0a" },
  { id: "grey", name: "Grey", colorHex: "#52525b" },
  { id: "maroon", name: "Maroon", colorHex: "#6b1d2f" },
];

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  preview: string;
}

function CustomPrint() {
  const navigate = useNavigate();
  const { add } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [base, setBase] = useState(bases[0].id);
  const [color, setColor] = useState(dropShoulderColorOptions[0].name);

  const [clothingSize, setClothingSize] = useState("L");
  const [tapestrySize, setTapestrySize] = useState("4x3 ft");

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [singlePlacement, setSinglePlacement] = useState<"Front" | "Back">("Front");

  const [notes, setNotes] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const selectedBase = bases.find((b) => b.id === base)!;
  const isClothing = selectedBase.isClothing;
  const isAcidWash = base === "acid-wash";
  const isDropShoulder = base === "drop-shoulder";
  const maxAllowedFiles = isClothing ? 2 : 1;
  const availableClothingSizes = isAcidWash ? acidWashSizes : clothingSizes;
  const availableColors = isAcidWash
    ? acidWashColorOptions
    : isDropShoulder
    ? dropShoulderColorOptions
    : regularTeeColorOptions;
  const currentSize = isClothing ? clothingSize : tapestrySize;
  const placementText = !isClothing
    ? "Wall Print"
    : files.length === 2
      ? "Front + Back"
      : singlePlacement;

  function handleSelectBase(newBaseId: string) {
    setBase(newBaseId);
    if (newBaseId === "tapestry" && files.length > 1) {
      setFiles((prev) => prev.slice(0, 1));
    }
    const targetSizes = newBaseId === "acid-wash" ? acidWashSizes : clothingSizes;
    const targetColors =
      newBaseId === "acid-wash"
        ? acidWashColorOptions
        : newBaseId === "drop-shoulder"
        ? dropShoulderColorOptions
        : regularTeeColorOptions;

    if (!targetSizes.includes(clothingSize)) {
      setClothingSize(targetSizes[0]);
    }
    if (!targetColors.some((c) => c.name === color)) {
      setColor(targetColors[0].name);
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

  async function handlePlaceCustomOrder() {
    if (files.length === 0) {
      alert("Please upload at least 1 artwork file for your custom print.");
      fileInputRef.current?.click();
      return;
    }

    try {
      setIsUploading(true);

      // Upload artwork to Cloudinary
      const frontUrl = await uploadArtworkToCloudinary(files[0].file);
      let backUrl: string | undefined = undefined;
      if (files.length > 1) {
        backUrl = await uploadArtworkToCloudinary(files[1].file);
      }

      // Base price + optional double-sided add-on (Rs. 500)
      const doubleSidedFee = files.length === 2 ? 500 : 0;
      const finalItemPrice = selectedBase.price + doubleSidedFee;

      // Add custom line item to cart
      add({
        productId: `custom-${selectedBase.id}-${Date.now()}`,
        title: `CUSTOM ${selectedBase.label}`,
        price: finalItemPrice,
        image: frontUrl || files[0].preview,
        size: currentSize,
        color,
        qty: 1,
        note: notes,
        isCustom: true,
        frontArtworkUrl: frontUrl,
        backArtworkUrl: backUrl,
        placement: placementText,
        blankItem: selectedBase.label,
      });

      // Redirect to checkout
      navigate({ to: "/checkout" });
    } catch (err) {
      console.error("Failed to prepare custom order", err);
      alert("There was an error uploading your artwork. Please try again.");
    } finally {
      setIsUploading(false);
    }
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
                      "flex flex-col justify-center px-3 py-2.5 rounded-lg border transition-all text-center cursor-pointer",
                      selected
                        ? "border-primary bg-primary/10 text-white font-bold shadow-sm"
                        : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white",
                    )}
                  >
                    <span className="font-display font-black text-[11px] uppercase tracking-wider block truncate text-white">
                      {b.label}
                    </span>
                    <span className="text-[9px] text-zinc-400 block truncate font-sans mt-0.5">
                      {b.isClothing ? "Apparel" : "Wall Art"}
                    </span>
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
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider text-zinc-300"
                  >
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

                  <div
                    className={cn(
                      "grid gap-3",
                      files.length === 2 ? "grid-cols-2" : "max-w-xs mx-auto",
                    )}
                  >
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
                          {isClothing ? `Design ${idx + 1}: ` : "Wall Art: "}
                          {fileObj.name}
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
                  High-definition single-sided wall print. Seamless edges with hemmed borders for
                  effortless wall mounting.
                </p>

                <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-xs uppercase text-white">
                      HD Full Bleed Print
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
                      Edge-to-edge wall artwork printing on premium fabric banner.
                    </p>
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
                desc: isClothing
                  ? "Soft, heavy-grade cotton for long lasting wear."
                  : "Durable wall hanging fabric canvas.",
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
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">{item.desc}</p>
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
                      "relative flex items-center justify-between border rounded-lg p-3.5 text-left transition-all cursor-pointer",
                      selected
                        ? "border-primary bg-zinc-900/90 shadow-md shadow-primary/5"
                        : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-display font-black text-xs uppercase tracking-wider text-white block">
                        {b.label}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-sans block truncate mt-0.5">
                        {b.subtitle}
                      </span>
                    </div>

                    {/* Active checkmark badge right */}
                    {selected && (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-black shrink-0 ml-3">
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
              {availableColors.map((c) => {
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
              <div className={`grid gap-2 ${isAcidWash ? "grid-cols-3" : "grid-cols-5"}`}>
                {availableClothingSizes.map((s) => {
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

          {/* Optional Print Notes */}
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
              SPECIAL INSTRUCTIONS / NOTES (OPTIONAL)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., print size (A3/A4), placement tweaks, or design adjustments..."
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-md p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary resize-none h-20"
            />
          </div>

          {/* Place Custom Order CTA Button */}
          <div className="border-t border-zinc-800 pt-5 space-y-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={handlePlaceCustomOrder}
              className="w-full bg-primary text-black font-display font-black uppercase text-xs tracking-wider py-4 px-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>UPLOADING ARTWORK & PREPARING ORDER...</span>
                </>
              ) : (
                <>
                  <span>PLACE CUSTOM ORDER</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-zinc-400 hover:text-white transition-colors cursor-pointer pt-1">
              <HelpCircle className="h-3.5 w-3.5" />
              <a
                href={whatsappLink("Hi Deez Prints! I have a question about custom printing.")}
                target="_blank"
                rel="noreferrer"
              >
                Need help? Contact us on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
