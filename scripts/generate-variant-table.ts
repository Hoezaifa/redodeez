import { products, type Product } from "../src/data/products";

// Group products by design keywords
const designThemes: { name: string; regex: RegExp }[] = [
  { name: "Zoro (One Piece)", regex: /zoro/i },
  { name: "Dragon Ball Z (DBZ / Vegeta / Goku)", regex: /dbz|vegeta|goku|saiyan/i },
  { name: "Naruto / Itachi / Sasuke", regex: /naruto|itachi|sasuke|akatsuki/i },
  { name: "Berserk / Guts", regex: /berserk|guts|eclipse/i },
  { name: "Attack on Titan (AOT)", regex: /aot|eren|levi|titan/i },
  { name: "Jujutsu Kaisen (JJK / Gojo / Sukuna)", regex: /jjk|gojo|sukuna/i },
  { name: "Death Note / Ryuk / Kira", regex: /death note|ryuk|kira/i },
  { name: "Hunter x Hunter (Killua / Gon / Kurapika)", regex: /killua|kurapika|gon|hunter/i },
  { name: "Bleach / Ichigo", regex: /bleach|ichigo/i },
  { name: "Vagabond / Musashi", regex: /vagabond|musashi/i },
];

console.log("# Near-Duplicate Style Variants Audit & Product-Family Table\n");
console.log("| Design Family | Product ID | Title | Subcategory / Style | Price (PKR) | Distinct Garment / Format | URL Status |");
console.log("| :--- | :--- | :--- | :--- | :--- | :--- | :--- |");

for (const theme of designThemes) {
  const matching = products.filter(
    (p) => theme.regex.test(p.title) || theme.regex.test(p.id)
  );

  if (matching.length > 0) {
    for (const p of matching) {
      const distinctFormat =
        p.subcategory === "acid-wash"
          ? "Acid-washed vintage treatment (mineral wash, heavy 240+ GSM)"
          : p.subcategory === "drop-shoulder"
          ? "Oversized boxy streetwear silhouette (wide shoulders, loose sleeves)"
          : p.subcategory === "regular"
          ? "Classic standard crewneck fit (everyday silhouette)"
          : p.subcategory === "tapestries"
          ? "Wall tapestry (satin polyester fabric, home decor)"
          : p.subcategory === "mugs"
          ? "Ceramic sublimation coffee mug"
          : `${p.subcategory} format`;

      console.log(
        `| **${theme.name}** | \`${p.id}\` | ${p.title} | ${p.subcategory} | Rs. ${p.price.toLocaleString()} | ${distinctFormat} | **Self-Canonical** (Indexable) |`
      );
    }
  }
}
