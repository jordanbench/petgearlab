export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const body = await readBody(req);
  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return res.status(400).json({ error: "Valid email required" });
  const siteId = "petgearlab";
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    await fetch(`${supabaseUrl}/rest/v1/affiliate_subscribers`, {
      method: "POST",
      headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json", prefer: "resolution=merge-duplicates" },
      body: JSON.stringify({ site_id: siteId, email, source_path: req.headers.referer || "/" })
    });
  }
  await notifyAdmin({ email, siteId, referer: req.headers.referer || "" });
  res.writeHead(302, { Location: "/?subscribed=1" });
  res.end();
}
async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if ((req.headers["content-type"] || "").includes("application/json")) return JSON.parse(raw || "{}");
  return Object.fromEntries(new URLSearchParams(raw));
}
async function notifyAdmin(payload) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CTA_NOTIFY_EMAIL || "jbench1234@gmail.com";
  const from = process.env.CTA_NOTIFY_FROM || process.env.NEWSLETTER_FROM;
  if (!key || !from) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to, subject: `New Pet Gear Lab subscriber`, text: JSON.stringify(payload, null, 2) })
  });
}