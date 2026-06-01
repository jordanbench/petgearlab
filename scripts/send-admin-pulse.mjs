import fs from "node:fs";
import { loadEnv } from "./lib/env.mjs";
loadEnv(".env");
const key = process.env.RESEND_API_KEY;
const to = process.env.CTA_NOTIFY_EMAIL || "jbench1234@gmail.com";
const from = process.env.CTA_NOTIFY_FROM || process.env.NEWSLETTER_FROM;
if (!key || !from) {
  console.log("Missing RESEND_API_KEY or sender env; wrote local report only.");
  process.exit(0);
}
const subject = "Pet Gear Lab weekly affiliate pulse";
const text = ["Pet Gear Lab weekly pulse", "", "Guides live: 5", "Curated ASINs: 6", "Amazon tag: abbeybench-20", "", "Run npm run report:weekly for the local markdown report."].join("\n");
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
  body: JSON.stringify({ from, to, subject, text })
});
const result = await response.text();
if (!response.ok) throw new Error(result);
console.log(result);
