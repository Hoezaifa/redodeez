import { createFileRoute, Link, useNavigate, notFound, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
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
import { cn, getProductImageAlt } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema, breadcrumbSchema } from "@/lib/structuredData";

const LEGACY_PRODUCT_SLUGS: Record<string, string> = {
  "tshirt-acid-4": "dp-acid-wash-berserk-skull-blade",
  "tshirt-acid-9": "dp-acid-wash-spiderverse",
  "tshirt-reg-5": "dp-regular-spiderverse",
  "tshirt-reg-2": "dp-regular-divine",
  "tshirt-reg-3": "dp-regular-lcnst",
  "tshirt-reg-4": "dp-regular-snake",
  "tshirt-reg-6": "dp-regular-abstract-wings",
  "tshirt-reg-7": "dp-regular-ferrari",
  "tshirt-acid-1": "dp-acid-wash-berserk-warrior",
  "tshirt-acid-2": "dp-acid-wash-divine",
  "tshirt-acid-3": "dp-acid-wash-punk-is-dead",
  "tshirt-acid-5": "dp-acid-wash-ferrari",
  "tshirt-acid-6": "dp-acid-wash-knightfall",
  "tshirt-acid-7": "dp-acid-wash-abstract-wings",
  "tshirt-acid-8": "dp-acid-wash-berserk-classic",
  "tshirt-acid-10": "dp-acid-wash-breakout",
  "tshirt-drop-1": "dp-drop-shoulder-berserk",
  "tshirt-drop-2": "dp-drop-shoulder-divine",
  "tshirt-drop-3": "dp-drop-shoulder-punk-is-dead",
  "tshirt-drop-4": "dp-drop-shoulder-lcnst",
  "tshirt-drop-5": "dp-drop-shoulder-tbsm-calm",
  "tshirt-drop-6": "dp-drop-shoulder-tbsm-encore",
  "tshirt-drop-7": "dp-drop-shoulder-punish",
  "tshirt-drop-8": "dp-drop-shoulder-ferrari",
  "tshirt-drop-9": "dp-drop-shoulder-tbsm",
  "tshirt-drop-10": "dp-drop-shoulder-abstract-wings",
  "tshirt-drop-11": "dp-drop-shoulder-snake",
};

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params }) => {
    if (LEGACY_PRODUCT_SLUGS[params.productId]) {
      throw redirect({
        to: "/products/$productId",
        params: { productId: LEGACY_PRODUCT_SLUGS[params.productId] },
        statusCode: 301,
      });
    }
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
    const subcatLabel = p?.subcategory ? p.subcategory.replace(/-/g, " ") : "streetwear";
    const desc = p?.description
      ? `${p.title} (${formatPrice(p.price)}): ${p.description}. Custom made in Karachi, delivered across Pakistan.`
      : isTapestryMeta
        ? `${p?.title ?? "Product"} (${formatPrice(p?.price ?? 0)}) — High-definition digital sublimation printed satin wall tapestry by Deez Prints. Made in Karachi, delivered across Pakistan.`
        : `${p?.title ?? "Product"} (${formatPrice(p?.price ?? 0)}) — Premium ${subcatLabel} graphic apparel by Deez Prints. 100% cotton, DTF printed in Karachi. Dispatched across Pakistan.`;
    const title = `${p?.title ?? "Product"} | ${subcatLabel.toUpperCase()} — Deez Prints`;
    const url = `${SITE_URL}/products/${p?.id ?? ""}`;

    const isSelfHostedImg = rawImg?.startsWith("/assets/") || rawImg?.startsWith("/");
    const imageAlt = p ? getProductImageAlt(p, rawImg, 0, p.images.length) : "Deez Prints Product";

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
        { property: "og:image:alt", content: imageAlt },
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
        { name: "twitter:image:alt", content: imageAlt },
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

  useEffect(() => {
    trackEvent.viewItem(product);
  }, [product.id]);

  const isTapestry = product.subcategory === "tapestries" || product.subcategory === "flags" || product.category === "tapestries";
  const isAcidWash =
    product.subcategory === "acid-wash" ||
    product.title.toLowerCase().includes("acid wash");
  const isDropShoulder =
    product.subcategory === "drop-shoulder" ||
    product.title.toLowerCase().includes("drop shoulder");

  const breadcrumbs = (() => {
    const crumbs = [{ name: "Home", url: "/" }];
    if (isTapestry) {
      crumbs.push({ name: "Tapestries", url: "/collections/tapestries" });
    } else if (product.category === "hoodies" || product.subcategory === "hoodies") {
      crumbs.push({ name: "Hoodies", url: "/collections/hoodies" });
    } else if (product.category === "accessories" || product.subcategory === "mugs") {
      crumbs.push({ name: "Accessories", url: "/collections/accessories" });
    } else if (product.category === "t-shirts") {
      if (isDropShoulder) {
        crumbs.push({ name: "Drop Shoulder", url: "/collections/drop-shoulder" });
      } else if (isAcidWash) {
        crumbs.push({ name: "Acid Wash", url: "/collections/acid-wash" });
      } else {
        crumbs.push({ name: "Regular Tees", url: "/collections/t-shirts" });
      }
    } else {
      crumbs.push({ name: "Shop", url: "/collections" });
    }
    crumbs.push({ name: product.title, url: `/products/${product.id}` });
    return crumbs;
  })();

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
        <nav aria-label="Breadcrumb" className="label-mono text-muted-foreground mb-6 lg:mb-8 text-xs flex flex-wrap items-center gap-1.5">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <span key={crumb.url} className="inline-flex items-center gap-1.5">
                {idx > 0 && <span className="text-muted-foreground/60">/</span>}
                {isLast ? (
                  <span className="text-foreground">{crumb.name}</span>
                ) : (
                  <Link to={crumb.url} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </span>
            );
          })}
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
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6 lg:mb-8">
            <h2 className="display-md">You might also like</h2>
            {breadcrumbs.length >= 2 && (
              <Link
                to={breadcrumbs[breadcrumbs.length - 2].url as any}
                className="label-mono text-xs text-primary hover:underline font-semibold"
              >
                View all in {breadcrumbs[breadcrumbs.length - 2].name} →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
