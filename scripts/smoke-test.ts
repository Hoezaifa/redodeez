async function smokeTest() {
  const tests = [
    { url: "https://deezprints.com/", label: "Homepage" },
    { url: "https://deezprints.com/collections", label: "Collections" },
    { url: "https://deezprints.com/collections/tapestries", label: "Tapestries Collection" },
    { url: "https://deezprints.com/collections/hoodies", label: "Hoodies Collection" },
    { url: "https://deezprints.com/custom-print", label: "Custom Print Studio" },
    { url: "https://deezprints.com/products/breakout-tee", label: "Breakout Tee PDP" },
    { url: "https://deezprints.com/products/scarlet-bloom-tee", label: "Scarlet Bloom Tee PDP" },
    { url: "https://deezprints.com/products/dp-acid-wash-zoro-2", label: "Zoro Acid Wash PDP" },
    { url: "https://deezprints.com/products/tapestry-berserk-eclipse-tapestry", label: "Berserk Tapestry PDP" },
    { url: "https://deezprints.com/sitemap.xml", label: "Sitemap XML" },
    { url: "https://deezprints.com/products/kanye-yeezus-shirt", label: "Legacy Slug (Redirect Expected)", redirectExpected: true },
  ];

  console.log("══════════════════════════════════════════════════════════════════════");
  console.log("  DEEZ PRINTS — LIVE PRODUCTION SMOKE TEST");
  console.log("══════════════════════════════════════════════════════════════════════\n");

  let allPassed = true;

  for (const t of tests) {
    try {
      const res = await fetch(t.url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        redirect: "manual",
      });

      const isRedirect = [301, 302, 307, 308].includes(res.status);
      const isOk = res.status === 200;

      if (t.redirectExpected) {
        const location = res.headers.get("location");
        if (isRedirect) {
          console.log(`✅ [${res.status}] ${t.label}: Redirects to ${location}`);
        } else {
          console.log(`⚠️ [${res.status}] ${t.label}: Expected redirect, got ${res.status}`);
        }
      } else if (isOk) {
        const text = await res.text();
        const titleMatch = text.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1].trim() : "(no title)";

        // Check for specific anti-patterns
        const hasShahzain = text.includes("Shahzain");
        const has32k = text.includes("32,000") || text.includes("32000");

        if (hasShahzain || has32k) {
          allPassed = false;
          console.error(`❌ [200] ${t.label}: CONTAINS BAD OVERRIDE DATA! (Shahzain: ${hasShahzain}, 32k: ${has32k})`);
        } else {
          console.log(`✅ [200] ${t.label}: "${title.slice(0, 60)}"`);
        }
      } else {
        allPassed = false;
        console.error(`❌ [${res.status}] ${t.label}: HTTP ${res.status}`);
      }
    } catch (err: any) {
      allPassed = false;
      console.error(`❌ ${t.label}: Fetch failed: ${err.message}`);
    }
  }

  console.log("\n══════════════════════════════════════════════════════════════════════");
  if (allPassed) {
    console.log("  🎉 ALL PRODUCTION SMOKE TESTS PASSED CLEANLY!");
  } else {
    console.log("  ⚠️ SOME PRODUCTION SMOKE TESTS FAILED OR PENDING DEPLOYMENT");
  }
  console.log("══════════════════════════════════════════════════════════════════════\n");
}

smokeTest();
