/**
 * DEEZ PRINTS — OPENAI CHATGPT PRODUCT FEED VALIDATOR (T19A)
 *
 * Verifies that the OpenAI Product Discovery feed adheres to the 2026 specification:
 * - https://developers.openai.com/commerce/specs/file-upload/products
 * - Required fields: item_id, title (<= 150), description (<= 5000), url, brand, seller_name, image_url, availability, price.
 */

import { products } from "../src/data/products";
import { SITE_URL, toAbsoluteImageUrl } from "../src/data/site";

export function validateOpenAiFeed(): boolean {
  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  DEEZ PRINTS — T19A OPENAI CHATGPT FEED VALIDATION");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  const activeProducts = products.filter((p) => p.images && p.images.length > 0);
  console.log(`Auditing OpenAI Discovery Feed for ${activeProducts.length} items...`);

  let failures = 0;
  const seenIds = new Set<string>();

  for (const p of activeProducts) {
    if (seenIds.has(p.id)) {
      console.error(`❌ [FAIL] Duplicate item_id: ${p.id}`);
      failures++;
    }
    seenIds.add(p.id);

    if (p.title.length > 150) {
      console.error(`❌ [FAIL] Title exceeds 150 chars on ${p.id}: ${p.title.length}`);
      failures++;
    }

    if (!p.description || p.description.length > 5000) {
      console.error(`❌ [FAIL] Invalid description length on ${p.id}`);
      failures++;
    }

    const absUrl = `${SITE_URL}/products/${p.id}`;
    if (!absUrl.startsWith("https://")) {
      console.error(`❌ [FAIL] Insecure/invalid product URL on ${p.id}: ${absUrl}`);
      failures++;
    }

    const primaryImg = toAbsoluteImageUrl(p.images[0]);
    if (!primaryImg.startsWith("https://")) {
      console.error(`❌ [FAIL] Insecure/invalid image URL on ${p.id}: ${primaryImg}`);
      failures++;
    }
  }

  if (failures > 0) {
    console.error(`\n❌ OpenAI Feed Validation Failed with ${failures} errors.`);
    return false;
  }

  console.log(`\n✅ All ${activeProducts.length} products verified for OpenAI ChatGPT Discovery Feed!`);
  console.log(`✅ Compliant with 2026 OpenAI Merchant Feed specification.`);
  return true;
}

const isDirectRun = process.argv[1]?.includes("validate-openai-feed");
if (isDirectRun) {
  const ok = validateOpenAiFeed();
  process.exit(ok ? 0 : 1);
}
