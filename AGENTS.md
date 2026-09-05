# Pet Gear Bench Agent Guide

Read this before changing content, affiliate links, schema, automations, or deployment behavior.

## Architecture

- Static HTML on Vercel from the repo root.
- Production host: `https://www.petgearbench.com`.
- No Amazon Product Advertising API or Creators API is required for the MVP.
- Curated ASINs live in `data/products.json`, the source of truth, and are mirrored to Supabase with `npm run sync:products`.
- Evidence-backed candidates live in `data/product-candidates.json` and must pass `npm run validate:candidates` against the shared schema and scoring policy before activation.
- Amazon URLs must use `https://www.amazon.com/dp/{ASIN}/ref=nosim?tag=abbeybench-20`.
- Do not show prices or availability unless they are served through an approved Amazon workflow.
- Keep the required disclosure visible: "As an Amazon Associate I earn from qualifying purchases."

## Operating Pattern

- Publish buyer-intent pages first: comparisons, best-for-use-case roundups, setup guides, and tutorials.
- Every money page should receive internal links from the guide hub, one adjacent guide, and one tutorial or setup page.
- Admin reporting goes to `jbench1234@gmail.com` through Resend when env is configured.
- Monday product discovery is planning-only: research 5-8 candidates for one unresolved buyer problem, record evidence, and approve 0-2. It must not publish, activate products, sync Supabase, deploy, or send email.
- Tuesday publishing may activate only candidates with `decision: "approve"` and `activation.status: "pending"`. A run may activate 0-2 products; zero is correct when no approved candidate improves the chosen guide.
- Automated research must use `experienceBasis: "research-only"` and never imply physical testing. Hands-on status requires user-supplied or real first-party testing evidence.
- Monthly catalog review is planning-only and records keep/refresh/retire-review recommendations without removing products.
- When products change, update the candidate activation record and `data/products.json`, run both validators, and attempt the Supabase sync before deploy. The admin pulse must state candidate decisions, product/link deltas, and catalog-review flags even when counts are zero.

## Verification

Run before finalizing changes:

```bash
npm run check
npm run validate:candidates
npm run report:weekly
npm run sync:products -- --dry-run
git diff --check
```

Never commit `.env`, `.vercel`, `reports/`, or secret values.
