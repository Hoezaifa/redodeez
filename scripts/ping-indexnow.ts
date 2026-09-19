/**
 * DEEZ PRINTS — INDEXNOW NOTIFICATION SCRIPT (T19B)
 *
 * Pings the IndexNow endpoint (Bing, Yandex, Seznam) with updated URLs:
 * - https://www.bing.com/webmasters/help/indexnow-0z209wby
 * - https://api.indexnow.org/indexnow
 */

import { SITE_URL } from "../src/data/site";
import { products } from "../src/data/products";

const INDEXNOW_KEY = "deezprints89ff210a48b94ce5a189f7";
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

export async function pingIndexNow(urlList?: string[]): Promise<boolean> {
  const targetUrls =
    urlList && urlList.length > 0
      ? urlList
      : [
          `${SITE_URL}/`,
          `${SITE_URL}/collections/anime-archive`,
          `${SITE_URL}/collections/acid-wash`,
          `${SITE_URL}/collections/drop-shoulder`,
          `${SITE_URL}/collections/t-shirts`,
          `${SITE_URL}/collections/tapestries`,
          ...products.slice(0, 10).map((p) => `${SITE_URL}/products/${p.id}`),
        ];

  const payload = {
    host: "deezprints.com",
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: targetUrls,
  };

  console.log(`Submitting ${targetUrls.length} URLs to IndexNow API...`);
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`IndexNow response code: ${res.status}`);
    if (res.status === 200 || res.status === 202) {
      console.log("✅ Successfully dispatched URLs to IndexNow network!");
      return true;
    } else {
      console.warn(`IndexNow returned status ${res.status}: ${await res.text()}`);
      return false;
    }
  } catch (err: any) {
    console.error("IndexNow ping failed (network error or offline):", err.message);
    return false;
  }
}

const isDirectRun = process.argv[1]?.includes("ping-indexnow");
if (isDirectRun) {
  pingIndexNow();
}
