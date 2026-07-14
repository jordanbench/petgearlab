# Monthly Catalog Reviews

The monthly review is planning-only. It rechecks every active row in `data/products.json` and writes a complete snapshot to `data/catalog-review.json`.

For each active ASIN, verify the exact model/variant, first-party product evidence, official safety or recall evidence, meaningful ownership or failure-mode evidence, link integrity, and whether it remains distinct from the rest of the catalog.

Allowed statuses:

- `keep`: evidence and decision role remain sound.
- `refresh`: keep active, but the guide, evidence, positioning, or candidate record needs work.
- `retire-review`: recommend human/editorial removal review; never remove or replace a live product in this planning-only job.

Write a dated note named `YYYY-MM-DD-catalog-review.md` containing each product's status, evidence links, reason, and the next action. Do not edit guides, remove products, sync Supabase, deploy, or send public email.
