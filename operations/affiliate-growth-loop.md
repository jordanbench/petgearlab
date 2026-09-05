# Pet Gear Bench Operating Plan

## SEO Cadence

- Monday: run planning-only product discovery for one unresolved buyer problem; research 5-8 candidates and approve 0-2.
- Tuesday: publish or materially improve one buyer-intent page and activate only approved, pending candidates that improve its decision coverage.
- First Thursday of each month: reverify the full active catalog and record keep/refresh/retire-review recommendations without changing public pages.
- Other Thursdays: add one internal-link or comparison expansion when separately scheduled.
- Saturday: send admin pulse with candidate funnel, guide count, curated ASIN count, product/link growth, catalog-review flags, Supabase parity, next SEO action, and blockers.

## Product Growth Contract

- Treat `data/product-candidates.json` as the research and decision ledger; treat `data/products.json` as the active catalog.
- Start with a reader problem and distinct decision slots, not a product quota. Research 5-8 candidates and approve 0-2.
- Approval requires score 75+, every hard gate, exact ASIN/variant verification, first-party evidence, an exact Amazon listing, independent or owner-pattern evidence, and an official safety/recall check.
- Every record must state best-for, skip-if, main tradeoff, closest alternative, evidence limitations, and a plain-language editorial thesis.
- Commercial value is capped at 5/100 points. It cannot rescue weak reader fit, thin evidence, redundancy, ownership burden, or safety/return risk.
- Tuesday publishing cannot bypass the registry or promote hold/reject candidates. Reusing only existing ASINs is a zero-product run and must be reported honestly.
- When an approved product is activated, update its activation state, add a useful guide placement, run `npm run check`, then run `npm run sync:products`. Do not print credentials or imply sync success when it fails.

## Guardrails

- No auto-public newsletter sends.
- No price or availability claims without approved Amazon data.
- No auto-redirects to Amazon.
- No public outreach, backlinking, or social posting unless explicitly requested.
- Keep disclosures clear and visible.

## First Metrics

- Outbound affiliate clicks by page and ASIN.
- Email subscribers by source path.
- Top guide pages by Search Console once configured.
- Internal links pointing to each money page.
- Net-new curated ASINs and affiliate-link placements per weekly release.
- Local-to-Supabase product catalog parity.
- Candidates reviewed, approved, held, rejected, and awaiting activation.
- Monthly keep/refresh/retire-review catalog flags.

## Next Recommended Action

Build the automatic feeder, travel, and cleaning clusters, then watch which problems drive outbound clicks.
