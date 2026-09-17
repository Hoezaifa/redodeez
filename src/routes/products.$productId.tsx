import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getProducts, type Product } from "@/data/products";
import {
  site,
  sizes as ALL_SIZES,
  whatsappLink,
  SITE_URL,
  toAbsoluteImageUrl,
  toOgImageUrl,
  ACID_WASH_SIZES,
  ACID_WASH_COLORS,
  REGULAR_TEE_SIZES,
  REGULAR_TEE_COLORS,
  DROP_SHOULDER_SIZES,
  DROP_SHOULDER_COLORS,
  COLOR_HEX_MAP,
} from "@/data/site";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/shop/ProductCard";
import { SizeChart } from "@/components/shop/SizeChart";
import { ProductDetail } from "@/components/shop/DesktopProductDetail";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/structuredData";

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    const allProducts = await getProducts();
    const product = allProducts.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product, allProducts };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const rawImg = p?.images[0];
    const absoluteImgUrl = toAbsoluteImageUrl(rawImg);
    const ogImgUrl = toOgImageUrl(rawImg);
    const isTapestryMeta = p?.subcategory === "tapestries" || p?.subcategory === "flags";
    const desc = isTapestryMeta
      ? `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. High-definition digital sublimation printed satin wall tapestry by Deez Prints. Made in Karachi, delivered across Pakistan.`
      : `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)}. Premium graphic streetwear by Deez Prints. Orders take 2–3 working days to prepare before dispatch across Pakistan.`;
    const title = `${p?.title ?? "Product"} — Deez Prints`;
    const url = `${SITE_URL}/products/${p?.id ?? ""}`;

    const isSelfHostedImg = rawImg?.startsWith("/assets/") || rawImg?.startsWith("/");

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: `${p?.title ?? "Product"} — ${formatPrice(p?.price ?? 0)} | Deez Prints` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Deez Prints" },
        { property: "og:image", content: ogImgUrl },
        { property: "og:image:secure_url", content: ogImgUrl },
        ...(!isSelfHostedImg
          ? [
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              { property: "og:image:type", content: "image/jpeg" },
            ]
          : []),
        { property: "og:image:alt", content: p?.title ?? "Deez Prints Product" },
        { property: "og:price:amount", content: String(p?.price ?? 0) },
        { property: "og:price:currency", content: "PKR" },
        { property: "product:price:amount", content: String(p?.price ?? 0) },
        { property: "product:price:currency", content: "PKR" },
        { property: "og:availability", content: "instock" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@deez_prints" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: ogImgUrl },
        { name: "twitter:image:alt", content: p?.title ?? "Deez Prints Product" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, allProducts } = Route.useLoaderData();
  const navigate = useNavigate();
  const { add, wishlist, toggleWish } = useCart();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/collections" },
    { name: product.title, url: `/products/${product.id}` },
  ];

  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags";
  const isAcidWash =
    product.subcategory === "acid-wash" ||
    product.title.toLowerCase().includes("acid wash");
  const isDropShoulder =
    product.subcategory === "drop-shoulder" ||
    product.title.toLowerCase().includes("drop shoulder");

  // Sizes are always enforced by category — no per-product overrides for apparel
  const availableSizes = isTapestry
    ? product.sizes || ['Small (50 x 30)', 'Large (70 x 50)']
    : isAcidWash
    ? [...ACID_WASH_SIZES]
    : isDropShoulder
    ? [...DROP_SHOULDER_SIZES]
    : [...REGULAR_TEE_SIZES];

  // Colors are always the full category list — images are just showcases,
  // customers can pick any color available in the category
  const availableColors: string[] =
    isTapestry || product.category === "accessories" || product.subcategory === "mugs"
    ? []
    : isAcidWash
    ? [...ACID_WASH_COLORS]
    : isDropShoulder
    ? [...DROP_SHOULDER_COLORS]
    : [...REGULAR_TEE_COLORS];

  const [size, setSize] = useState<string>(isTapestry ? (product.sizes?.[0] || 'Small (50 x 30)') : "");
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0] || "");
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [err, setErr] = useState(false);
  const [colorErr, setColorErr] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const needsSize =
    (product.category !== "accessories" || isTapestry) &&
    product.subcategory !== "mugs" &&
    availableSizes.length > 0;
  const needsColor = availableColors.length > 0;
  const wished = wishlist.includes(product.id);
  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category && p.images.length)
    .slice(0, 4);

  const isLargeTapestry = isTapestry && (size?.includes("70 x 50") || size?.toLowerCase().includes("large"));
  const currentPrice = isLargeTapestry ? 4200 : product.price;

  function handleAdd() {
    let hasError = false;
    if (needsSize && !size) {
      setErr(true);
      hasError = true;
    }
    if (needsColor && !selectedColor) {
      setColorErr(true);
      hasError = true;
    }
    if (hasError) return;

    add({
      productId: product.id,
      title: product.title,
      price: currentPrice,
      image: product.images[0] ?? "",
      size: size || undefined,
      color: selectedColor || undefined,
      qty,
    });
  }

  function handleBuyNow() {
    let hasError = false;
    if (needsSize && !size) {
      setErr(true);
      hasError = true;
    }
    if (needsColor && !selectedColor) {
      setColorErr(true);
      hasError = true;
    }
    if (hasError) return;

    add({
      productId: product.id,
      title: product.title,
      price: currentPrice,
      image: product.images[0] ?? "",
      size: size || undefined,
      color: selectedColor || undefined,
      qty,
    });
    navigate({ to: "/checkout" });
  }

  const offerRange = isTapestry && availableSizes.length > 1
    ? {
        lowPrice: product.price,
        highPrice: 4200,
        offerCount: availableSizes.length,
      }
    : undefined;

  return (
    <div className="pt-12 pb-8 md:pt-16 md:pb-12">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={productSchema(product, offerRange)} />

      <div className="edge">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground mb-6 lg:mb-8">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/collections" className="hover:text-primary">
            Shop
          </Link>{" "}
          / <span className="text-foreground">{product.title}</span>
        </nav>

        <ProductDetail
          product={product}
          availableColors={availableColors}
          availableSizes={availableSizes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          size={size}
          setSize={setSize}
          qty={qty}
          setQty={setQty}
          err={err}
          setErr={setErr}
          colorErr={colorErr}
          setColorErr={setColorErr}
          handleAdd={handleAdd}
          handleBuyNow={handleBuyNow}
          needsSize={needsSize}
          needsColor={needsColor}
          isDropShoulder={isDropShoulder}
          isAcidWash={isAcidWash}
          showSizeChart={showSizeChart}
          setShowSizeChart={setShowSizeChart}
        />
      </div>

      {/* You Might Also Like */}
      {related.length > 0 && (
        <section className="mt-16 lg:mt-24 border-t border-border pt-8 lg:pt-12 edge">
          <h2 className="display-md">You might also like</h2>
          <div className="mt-6 lg:mt-8 grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
