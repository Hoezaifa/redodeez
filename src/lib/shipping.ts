import { products, type Product } from "@/data/products";
import { SHIPPING_OPTIONS, site, type DeliveryLocation } from "@/data/site";
import type { CartLine } from "@/lib/cart";

export type ShippingTier = "standard" | "heavy";

export type ShippingQuote = {
  tier: ShippingTier;
  isHeavyTier: boolean;
  hoodieCount: number;
  tshirtCount: number;
  karachiBaseFee: number;
  nationwideBaseFee: number;
  karachiFee: number;
  nationwideFee: number;
  isFreeKarachi: boolean;
  isFreeShipping: boolean;
  baseFee: number;
  fee: number;
};

const productsById = new Map<string, Product>(products.map((p) => [p.id, p]));

const TSHIRT_PATTERN =
  /\b(tee|tees|t-shirt|t-shirts|tshirt|tshirts|shirt|shirts|drop-shoulder|drop shoulder|acid-wash|acid wash|jersey|jerseys)\b/i;

function classifyCartLine(line: Pick<CartLine, "productId" | "title" | "blankItem">): "hoodie" | "tshirt" | "other" {
  const product = productsById.get(line.productId);
  if (product) {
    if (
      product.category === "hoodies" ||
      product.subcategory === "hoodies" ||
      product.subcategory === "acid-wash-hoodies"
    ) {
      return "hoodie";
    }
    if (product.category === "t-shirts" || product.category === "jerseys") {
      return "tshirt";
    }
    return "other";
  }

  const descriptor = `${line.blankItem ?? ""} ${line.title ?? ""} ${line.productId ?? ""}`.toLowerCase();
  if (descriptor.includes("hoodie") || descriptor.includes("sweatshirt")) {
    return "hoodie";
  }
  if (TSHIRT_PATTERN.test(descriptor)) {
    return "tshirt";
  }
  return "other";
}

/**
 * Dynamic delivery pricing:
 * - Standard tier (up to 3 T-shirts OR 1 Hoodie):
 *   Karachi: Rs. 200 | Nationwide: Rs. 450
 * - Heavy tier (more than 3 T-shirts OR more than 1 Hoodie, or mixed exceeding 1 hoodie / 3 tees):
 *   Karachi: Rs. 350 | Nationwide: Rs. 550
 * - Free delivery applies ONLY to Karachi orders of Rs. 5,000 or more (never nationwide).
 */
export function calculateShipping(
  lines: ReadonlyArray<Pick<CartLine, "productId" | "title" | "blankItem" | "qty">>,
  location: DeliveryLocation,
  subtotal: number,
): ShippingQuote {
  let hoodieCount = 0;
  let tshirtCount = 0;

  for (const line of lines) {
    const qty = Math.max(0, Number(line.qty) || 0);
    if (qty === 0) continue;

    const kind = classifyCartLine(line);
    if (kind === "hoodie") {
      hoodieCount += qty;
    } else if (kind === "tshirt") {
      tshirtCount += qty;
    }
  }

  // Standard tier holds up to 3 T-shirts OR 1 Hoodie (weight equivalent: 1 hoodie = 3 tees).
  const isHeavyTier = hoodieCount * 3 + tshirtCount > 3;
  const tier: ShippingTier = isHeavyTier ? "heavy" : "standard";

  const karachiBaseFee = isHeavyTier
    ? SHIPPING_OPTIONS.karachi.heavyFee
    : SHIPPING_OPTIONS.karachi.fee;
  const nationwideBaseFee = isHeavyTier
    ? SHIPPING_OPTIONS.nationwide.heavyFee
    : SHIPPING_OPTIONS.nationwide.fee;

  const isFreeKarachi = subtotal >= site.freeShippingThreshold;
  const karachiFee = isFreeKarachi ? 0 : karachiBaseFee;
  const nationwideFee = nationwideBaseFee;

  const isFreeShipping = location === "karachi" && isFreeKarachi;
  const baseFee = location === "karachi" ? karachiBaseFee : nationwideBaseFee;
  const fee = location === "karachi" ? karachiFee : nationwideFee;

  return {
    tier,
    isHeavyTier,
    hoodieCount,
    tshirtCount,
    karachiBaseFee,
    nationwideBaseFee,
    karachiFee,
    nationwideFee,
    isFreeKarachi,
    isFreeShipping,
    baseFee,
    fee,
  };
}
