import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./lib/env.mjs";

loadEnv(".env");

const key = process.env.RESEND_API_KEY;
const to = process.env.CTA_NOTIFY_EMAIL || "jbench1234@gmail.com";
const from = process.env.CTA_NOTIFY_FROM || process.env.NEWSLETTER_FROM;
const reportPath = path.join(process.cwd(), "reports", `weekly-pulse-${new Date().toISOString().slice(0, 10)}.md`);

if (!fs.existsSync(reportPath)) {
  await import("./weekly-pulse.mjs");
}

const text = fs.existsSync(reportPath)
  ? fs.readFileSync(reportPath, "utf8")
  : "Pet Gear Bench weekly pulse could not find the local report.";

if (!key || !from) {
  console.log("Missing RESEND_API_KEY or sender env; wrote local report only.");
  process.exit(0);
}

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
  body: JSON.stringify({ from, to, subject: "Pet Gear Bench weekly affiliate pulse", text })
});

const result = await response.text();
if (!response.ok) throw new Error(result);
console.log(result);
