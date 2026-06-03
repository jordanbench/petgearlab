export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(204).end();
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return res.status(204).end();
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  let body = {};
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch {}
  await fetch(`${supabaseUrl}/rest/v1/affiliate_clicks`, {
    method: "POST",
    headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json" },
    body: JSON.stringify({ site_id: "petgearbench", asin: body.asin || null, page_path: body.path || null })
  });
  res.status(204).end();
}