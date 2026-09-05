import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const errors = [];

if (!Array.isArray(products)) throw new Error("data/products.json must contain an array.");

const productByAsin = new Map();
for (const [index, product] of products.entries()) {
  const label = `data/products.json item ${index + 1}`;
  for (const field of ["asin", "name", "positioning", "category", "affiliateUrl"]) {
    if (typeof product[field] !== "string" || !product[field].trim()) errors.push(`${label}: missing ${field}`);
  }
  if (!/^[A-Z0-9]{10}$/.test(product.asin || "")) errors.push(`${label}: invalid ASIN ${product.asin || "(missing)"}`);
  if (productByAsin.has(product.asin)) errors.push(`${label}: duplicate ASIN ${product.asin}`);
  const expectedUrl = `https://www.amazon.com/dp/${product.asin}/ref=nosim?tag=abbeybench-20`;
  if (product.affiliateUrl !== expectedUrl) errors.push(`${label}: affiliateUrl must be ${expectedUrl}`);
  productByAsin.set(product.asin, product);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".vercel", "node_modules", "reports"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}
walk(root);

const linkCounts = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  let affiliateLinksInFile = 0;
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const anchor = match[0];
    const href = anchor.match(/\bhref="([^"]+)"/i)?.[1];
    if (!href?.includes("amazon.com/dp/")) continue;
    const canonical = href.match(/^https:\/\/www\.amazon\.com\/dp\/([A-Z0-9]{10})\/ref=nosim\?tag=abbeybench-20$/);
    if (!canonical) {
      errors.push(`${relative}: non-canonical Amazon affiliate URL ${href}`);
      continue;
    }
    const asin = canonical[1];
    const dataAsin = anchor.match(/\bdata-asin="([^"]+)"/i)?.[1];
    if (dataAsin !== asin) errors.push(`${relative}: data-asin must match affiliate URL ASIN ${asin}`);
    const rel = new Set((anchor.match(/\brel="([^"]+)"/i)?.[1] || "").split(/\s+/));
    for (const value of ["sponsored", "nofollow", "noopener"]) {
      if (!rel.has(value)) errors.push(`${relative}: Amazon link ${asin} is missing rel=${value}`);
    }
    if (!productByAsin.has(asin)) errors.push(`${relative}: linked ASIN ${asin} is missing from data/products.json`);
    linkCounts.set(asin, (linkCounts.get(asin) || 0) + 1);
    affiliateLinksInFile += 1;
  }
  if (affiliateLinksInFile && !html.includes("As an Amazon Associate I earn from qualifying purchases.")) {
    errors.push(`${relative}: page with affiliate links is missing the required Amazon Associate disclosure`);
  }
}

for (const product of products) {
  if (!linkCounts.has(product.asin)) errors.push(`data/products.json: ${product.asin} is not linked from any HTML page`);
}

if (errors.length) throw new Error(`Affiliate catalog audit failed:\n- ${errors.join("\n- ")}`);

console.log(`Affiliate catalog audit passed: ${products.length} products, ${linkCounts.size} linked ASINs, ${htmlFiles.length} HTML files checked.`);
