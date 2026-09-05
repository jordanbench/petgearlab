# Product Discovery Research

This directory stores dated, planning-only evidence notes. Discovery and publishing are separate jobs.

## Weekly workflow

1. Start with one unresolved buyer problem, not an Amazon category or commission opportunity.
2. Research 5-8 candidates and update one record per ASIN in `data/product-candidates.json`.
3. Verify exact product, model, variant, and ASIN. Never infer an ASIN from a product family.
4. Run `npm run validate:candidates`.
5. Save a dated note named `YYYY-MM-DD-{buyer-problem}.md`.
6. Do not edit `data/products.json`, guides, sitemap, or production in the research run.

## Evidence ladder

An approved candidate needs at least four unique current sources:

- Exact Amazon listing for identity only.
- Manufacturer page or official manual.
- Independent review or a clearly summarized owner-reported pattern.
- Official safety or recall check.

Label every statement as a verified specification, manufacturer claim, owner-reported pattern, editorial inference, or hands-on observation. Automated research must use `experienceBasis: "research-only"` and must never imply physical testing.

## Decision rules

- Research 5-8 candidates; approve 0-2.
- Approval requires a score of at least 75, every hard gate, and the full evidence mix.
- Hold requires a score of at least 60 but allows unresolved evidence or a failed non-safety gate.
- Reject weak, redundant, mismatched, unsafe, or unverifiable candidates.
- Commercial value is capped at 5 points and cannot rescue a weak recommendation.
- A distinct decision slot is mandatory: default, budget, upgrade, constraint, maintenance, compatibility, safety, or other.

## Dated note template

```markdown
# Product discovery: {buyer problem}

- Run date:
- Guide/cluster:
- Reader decision:
- Evidence limitations:
- Candidates reviewed:
- Approved:
- Held:
- Rejected:

## Candidate decisions

### {Product name} — {approve|hold|reject}

- ASIN and exact variant:
- Decision slot:
- Best for:
- Skip if:
- Main tradeoff:
- Closest alternative:
- Score:
- Hard gates:
- Evidence:
- Decision reason:

## What should change on the site

- Approved candidates awaiting activation:
- Guide that could use them:
- Claims or language to avoid:
- Next unresolved product gap:
```
