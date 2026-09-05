import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./lib/env.mjs";

loadEnv(".env");

const siteId = "petgearbench";
const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/products.json"), "utf8"));
const rows = products.map(({ asin, name, category, positioning }) => ({ site_id: siteId, asin, name, category, positioning }));

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify({ status: "dry-run", siteId, localProducts: rows.length }));
  process.exit(0);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing SUPABASE_URL and/or server-side Supabase key; product sync was not attempted.");

const baseUrl = url.replace(/\/$/, "");
const headers = { apikey: key, authorization: `Bearer ${key}`, "content-type": "application/json" };
const response = await fetch(`${baseUrl}/rest/v1/affiliate_products?on_conflict=site_id%2Casin`, {
  method: "POST",
  headers: { ...headers, prefer: "resolution=merge-duplicates,return=representation" },
  body: JSON.stringify(rows),
});
if (!response.ok) throw new Error(`Supabase product sync failed (HTTP ${response.status}): ${(await response.text()).slice(0, 500)}`);

const verifyResponse = await fetch(`${baseUrl}/rest/v1/affiliate_products?site_id=eq.${siteId}&select=asin&order=asin`, { headers });
if (!verifyResponse.ok) throw new Error(`Supabase product sync verification failed (HTTP ${verifyResponse.status}).`);
const remoteProducts = await verifyResponse.json();
const remoteAsins = new Set(remoteProducts.map((product) => product.asin));
const missing = rows.filter((row) => !remoteAsins.has(row.asin)).map((row) => row.asin);
if (missing.length) throw new Error(`Supabase product sync verification failed; missing remote ASINs: ${missing.join(", ")}`);

console.log(JSON.stringify({ status: "synced", siteId, localProducts: rows.length, remoteProducts: remoteProducts.length }));
