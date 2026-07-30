export function formatPrice(v: number) {
  return `Rs. ${v.toLocaleString("en-PK")}`;
}

export function slugToTitle(s: string) {
  return s.replace(/-/g, " ").toUpperCase();
}
