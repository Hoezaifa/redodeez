import https from "https";
import http from "http";

const sitemapUrl = "https://deezprints.store/sitemap.xml";

const pingTargets = [
  { name: "Google Ping", url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
  { name: "Bing Ping", url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
];

console.log("=== PINGING SEARCH ENGINES FOR DEEZ PRINTS SITEMAP ===\n");

async function ping(target) {
  return new Promise((resolve) => {
    const client = target.url.startsWith("https") ? https : http;
    client
      .get(target.url, (res) => {
        console.log(`📡 [${target.name}] Status Code: ${res.statusCode}`);
        resolve();
      })
      .on("error", (err) => {
        console.log(`⚠️ [${target.name}] Request note: ${err.message}`);
        resolve();
      });
  });
}

async function main() {
  for (const target of pingTargets) {
    await ping(target);
  }
  console.log("\n✅ Search engine notification ping completed.");
}

main();
