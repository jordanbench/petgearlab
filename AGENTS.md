# Pet Gear Bench Agent Guide

Read this before changing content, affiliate links, schema, automations, or deployment behavior.

## Architecture

- Static HTML on Vercel from the repo root.
- No Amazon Product Advertising API or Creators API is required for the MVP.
- Curated ASINs live in `data/products.json` and can be mirrored to Supabase with `supabase/seed.sql`.
- Amazon URLs must use `https://www.amazon.com/dp/{ASIN}/ref=nosim?tag=abbeybench-20`.
- Do not show prices or availability unless they are served through an approved Amazon workflow.
- Keep the required disclosure visible: "As an Amazon Associate I earn from qualifying purchases."

## Operating Pattern

- Publish buyer-intent pages first: comparisons, best-for-use-case roundups, setup guides, and tutorials.
- Every money page should receive internal links from the hub, one adjacent comparison, one tutorial, and one seasonal page when relevant.
- Admin reporting goes to `jbench1234@gmail.com` through Resend when env is configured.
- Scheduled Codex automations should run reports, publish or refresh one SEO page, and email blockers/results.

## Verification

Run before finalizing changes:

```bash
npm run check
npm run report:weekly
git diff --check
```

Never commit `.env`, `.vercel`, `reports/`, or secret values.
