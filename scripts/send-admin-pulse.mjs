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
const html = renderAdminPulseHtml({
  brand: "Pet Gear Bench",
  siteUrl: "https://www.petgearbench.com",
  accent: "#047857",
  text,
});

if (!key || !from) {
  console.log("Missing RESEND_API_KEY or sender env; wrote local report only.");
  process.exit(0);
}

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
  body: JSON.stringify({ from, to, subject: "Pet Gear Bench weekly affiliate pulse", text, html })
});

const result = await response.text();
if (!response.ok) throw new Error(result);
console.log(result);

function renderAdminPulseHtml({ brand, siteUrl, accent, text }) {
  const parsed = parseMarkdownReport(text);
  const baseline = parsed.sections.get("Local baseline") || [];
  const latestChanged = parsed.sections.get("Latest changed pages") || [];
  const nextActions = parsed.sections.get("Next recommended SEO action") || [];
  const productGrowth = parsed.sections.get("Product catalog growth") || [];
  const productDiscovery = parsed.sections.get("Product discovery funnel") || [];
  const blockers = parsed.sections.get("Recent blockers") || parsed.sections.get("Known blockers") || [];
  const guideLines = parsed.sections.get("Guides live") || [];
  const credentials = parsed.sections.get("Credential availability") || [];
  const statItems = baseline
    .map(parseListItem)
    .filter((item) => item.label && item.value);
  const statRows = [];
  for (let index = 0; index < statItems.length; index += 2) {
    statRows.push(statItems.slice(index, index + 2));
  }
  const statCards = statRows
    .map((row) => `<tr>${row.map(renderStatCard).join("")}${row.length === 1 ? '<td width="50%" style="width:50%;padding:8px;"></td>' : ""}</tr>`)
    .join("");

  return `<!doctype html>
<html>
<body style="margin:0;background:#f7f5ef;color:#17211b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Weekly affiliate pulse for ${escapeHtml(brand)}: guides, ASINs, next SEO action, and blockers.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5ef;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="width:680px;max-width:100%;background:#fbfaf6;border:1px solid #d9ded8;border-radius:10px;overflow:hidden;">
          <tr>
            <td style="padding:28px 30px 22px;background:${accent};color:#ffffff;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:.1em;font-weight:800;opacity:.85;">Weekly affiliate pulse</div>
              <h1 style="margin:8px 0 6px;font-size:30px;line-height:1.1;">${escapeHtml(brand)}</h1>
              <a href="${siteUrl}" style="color:#ffffff;text-decoration:underline;font-weight:700;">${siteUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-spacing:8px;border-collapse:separate;">
                <tbody>${statCards}</tbody>
              </table>
              ${renderSection("Product catalog growth", productGrowth, "priority")}
              ${renderSection("Product discovery funnel", productDiscovery, "priority")}
              ${renderSection("Next recommended SEO action", nextActions, "priority")}
              ${renderSection("Recent blockers", blockers, "warning")}
              ${renderSection("Latest changed pages", latestChanged)}
              ${renderSection("Guides live", guideLines)}
              ${renderSection("Credential availability", credentials)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function parseMarkdownReport(text) {
  const sections = new Map();
  let title = "";
  let current = "";
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("# ")) {
      title = line.replace(/^#\s+/, "");
      continue;
    }
    if (line.startsWith("## ")) {
      current = line.replace(/^##\s+/, "");
      sections.set(current, []);
      continue;
    }
    if (current) sections.get(current).push(line.replace(/^-\s+/, ""));
  }
  return { title, sections };
}

function parseListItem(line) {
  const index = line.indexOf(":");
  if (index === -1) return { label: line, value: "" };
  return { label: line.slice(0, index), value: line.slice(index + 1).trim() };
}

function renderStatCard(item) {
  return `<td width="50%" style="width:50%;padding:8px;vertical-align:top;">
    <div style="padding:12px 14px;border:1px solid #d9ded8;border-radius:8px;background:#ffffff;">
      <div style="font-size:11px;line-height:1.3;text-transform:uppercase;letter-spacing:.08em;color:#5b675f;font-weight:700;">${escapeHtml(item.label)}</div>
      <div style="font-size:16px;line-height:1.35;color:#17211b;font-weight:800;word-break:break-word;">${escapeHtml(item.value)}</div>
    </div>
  </td>`;
}

function renderSection(title, lines, variant = "default") {
  if (!lines.length) return "";
  const border = variant === "warning" ? "#d97706" : variant === "priority" ? "#0f766e" : "#d9ded8";
  const bg = variant === "warning" ? "#fff7ed" : variant === "priority" ? "#ecfdf5" : "#ffffff";
  const items = lines.map((line) => `<li style="margin:0 0 8px;">${escapeHtml(line)}</li>`).join("");
  return `<section style="margin:20px 0 0;padding:18px 20px;border:1px solid ${border};border-radius:8px;background:${bg};">
    <h2 style="margin:0 0 12px;font-size:18px;line-height:1.25;color:#17211b;">${escapeHtml(title)}</h2>
    <ul style="margin:0;padding-left:20px;color:#17211b;">${items}</ul>
  </section>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}
