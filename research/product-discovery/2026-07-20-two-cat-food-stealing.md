# Product discovery: stopping food stealing in a two-cat home

- Run date: 2026-07-20
- Guide/cluster: `/guides/best-automatic-cat-feeders-two-cats/` / automatic feeders
- Reader decision: How can a two-cat household keep each cat on the correct food when one cat grazes, steals meals, or needs a separate diet?
- Evidence limitations: This was research-only. No product was physically tested. Amazon pages can change by seller or variation, so each recorded ASIN is tied to the exact variant visible on 2026-07-20. CPSC API checks found no matching brand/product recall records, but that result is not a safety certification. Owner reports conflict on whether every feeder can resist a very persistent cat.
- Candidates reviewed: 5
- Approved: 2
- Held: 2
- Rejected: 1

## Why this reader problem

The current two-cat feeder guide already says a shared scheduled feeder is a poor fit when one cat steals food, one cat grazes, or the cats need different diets. It does not yet offer evidence-backed alternatives for that exact gap. This run therefore evaluated selective-access feeders, not a broad automatic-feeder category and not commission potential.

Scoring followed the repository weights: reader-problem fit 25, evidence confidence 20, ownership longevity 15, meaningful differentiation 15, risk and return fit 15, demand signal 5, and commercial value 5. Commercial value never exceeded 4 and did not change a weak recommendation into an approval.

## Candidate decisions

### SureFeed Microchip Pet Feeder — approve

- ASIN and exact variant: `B00O0UIPTY`; MPF001 standard version / manufacturer item 194705; white; one feeder; canonical affiliate URL `https://www.amazon.com/dp/B00O0UIPTY/ref=nosim?tag=abbeybench-20`.
- Decision slot: default
- Best for: A grazing cat that needs protected access to wet or dry food without wearing a collar tag, when its implanted microchip is compatible and readable.
- Skip if: Timed hopper dispensing is required, C-cell battery upkeep is unacceptable, or a persistent thief can reach from the open rear.
- Main tradeoff: It controls bowl access but does not dispense scheduled portions.
- Closest alternative: Closer Pets MiBowl CP500 for a more enclosed rear and sides.
- Score: 88/100 — reader fit 24/25; evidence 19/20; longevity 13/15; differentiation 13/15; risk/return 12/15; demand 4/5; commercial 3/5.
- Hard gates: ASIN verified; distinct slot; no matching CPSC recall found; claims supportable; canonical affiliate format compliant.
- Strengths: Implanted-microchip or supplied-tag access; wet/dry bowl; training mode; no app or hub requirement.
- Failure modes: Rear reach-around while the authorized cat is eating; incompatible or migrated chip; four C batteries; manual filling.
- Evidence:
  - [Amazon exact listing](https://www.amazon.com/dp/B00O0UIPTY) — verified specification and variant identity.
  - [Sure Petcare support](https://www.surepetcare.com/en-us/support/microchip-pet-feeder) — manufacturer documentation for setup, cleaning, dimensions, manuals, and training.
  - [Current owner discussion](https://www.reddit.com/r/CatAdvice/comments/1s70j63/questions_for_anyone_who_uses_the_surepet/) — owner-reported multi-year separate-diet success plus battery upkeep.
  - [CPSC recall API check](https://www.saferproducts.gov/RestWebServices/Recall?ProductName=SureFeed&format=json) — official search returned no matching SureFeed records on the run date; not a certification.
- Decision reason: It directly solves the food-separation problem with the least connected overhead and the strongest current evidence. Any future guide placement must explain that it is a protected bowl rather than a scheduled hopper and that a rear guard can matter for determined cats.

### Closer Pets MiBowl Smart Selective Microchip Pet Feeder — approve

- ASIN and exact variant: `B09ZLJCYSR`; CP500; white; one feeder; 12-ounce bowl; canonical affiliate URL `https://www.amazon.com/dp/B09ZLJCYSR/ref=nosim?tag=abbeybench-20`.
- Decision slot: constraint
- Best for: Small or medium cats where a persistent food thief makes enclosed rear and side access the deciding constraint.
- Skip if: The pet lacks a compatible 15-digit chip and will not tolerate the supplied ID disc, or the household needs app tracking or hopper dispensing.
- Main tradeoff: Stronger enclosure geometry, but still a manually filled bowl powered by four C batteries.
- Closest alternative: SureFeed MPF001 as the more established default.
- Score: 83/100 — reader fit 23/25; evidence 18/20; longevity 12/15; differentiation 14/15; risk/return 12/15; demand 2/5; commercial 2/5.
- Hard gates: ASIN verified; distinct slot; no matching CPSC recall found; claims supportable; canonical affiliate format compliant.
- Strengths: Enclosed back and sides; compatible implanted-chip or ID-disc access; wet/dry food; current official support.
- Failure modes: No scheduled dispensing; chip compatibility; pet acclimation; batteries and cleaning.
- Evidence:
  - [Amazon exact listing](https://www.amazon.com/dp/B09ZLJCYSR) — verified CP500 model, ASIN, white single-unit variant, and current manufacturer seller.
  - [Closer Pets product page](https://closerpets.com/products/mibowl-automatic-microchip-pet-feeder-cp500) — manufacturer claims and exact CP500 identity.
  - [Closer Pets CP500 support](https://closerpets.com/pages/support_mibowl_and_mibowl_plus_cp500) — manufacturer documentation for wet/dry use, chip/tag compatibility, bowl, batteries, and cleaning.
  - [Independent owner-review pattern](https://www.ebay.com/urw/-/product-reviews/24060821130) — reports that the enclosed design blocks a larger greedy cat, with household-specific acclimation.
  - [CPSC recall API check](https://www.saferproducts.gov/RestWebServices/Recall?ProductName=MiBowl&format=json) — official search returned no matching MiBowl records on the run date; not a certification.
- Decision reason: The enclosed geometry is a real constraint-based difference from the default, not a redundant feature. Copy must not promise that any feeder is unbeatable.

### PETLIBRO One RFID Smart Feeder — hold

- ASIN and exact variant: `B0FJMFYPNH`; PLAF301 / Amazon item AF301-W; white; 3-liter; pack of one; proprietary collar tag; canonical affiliate URL `https://www.amazon.com/dp/B0FJMFYPNH/ref=nosim?tag=abbeybench-20`.
- Decision slot: upgrade
- Best for: Dry-food households that want scheduled dispensing and app logs and know the cat will wear the required tag.
- Skip if: Implanted-microchip recognition or wet food is required, the cat rejects collars, or the thief persistently pries at feeder lids.
- Main tradeoff: Scheduling plus access control adds value, but the access system depends on the included tag and current owner reports conflict on tag and lid reliability.
- Closest alternative: SureFeed MPF001 for implanted-chip access and wet food.
- Score: 77/100 — reader fit 22/25; evidence 17/20; longevity 10/15; differentiation 13/15; risk/return 8/15; demand 4/5; commercial 3/5.
- Hard gates: ASIN verified; distinct slot; no matching CPSC recall found; affiliate format compliant; claims-support gate failed because current owner reports conflict with a broad anti-stealing claim.
- Strengths: Scheduling, individual access, app logs, stainless bowl, current official support.
- Failure modes: Proprietary tag only; collar rejection; forced-lid and co-feeding reports; connectivity, sensor, alert, and rotor failure points.
- Evidence:
  - [Amazon exact listing](https://www.amazon.com/dp/B0FJMFYPNH) — exact AF301-W white 3-liter pack-of-one identity.
  - [PETLIBRO PLAF301 support](https://petlibro.com/pages/faq-product/one-rfid-smart-feeder) and [official manual](https://m.media-amazon.com/images/I/91jIGdVsPOL.pdf) — manufacturer setup, operating, cleaning, tag, and troubleshooting constraints.
  - [Recent owner reviews](https://www.chewy.com/petlibro-one-rfid-automatic-wifi-app/product-reviews/2481470) — some successful two-cat separation alongside conflicting tag, collar, and theft-resistance reports.
  - [CPSC recall API check](https://www.saferproducts.gov/RestWebServices/Recall?ProductName=PETLIBRO&format=json) — official search returned no matching PETLIBRO records on the run date; not a certification.
- Decision reason: The score is high enough to hold, but not to approve through a failed claims-support gate. Reverify variant-specific durability and owner failure patterns before any Tuesday activation.

### PawsPik PortionPro Rx RFID Automatic Pet Feeder — hold

- ASIN and exact variant: `B0D6GVDP4Q`; PPRX1700; upgraded gray feeder; new white silicone-loop tag; 32-cup dry-food hopper; canonical affiliate URL `https://www.amazon.com/dp/B0D6GVDP4Q/ref=nosim?tag=abbeybench-20`.
- Decision slot: other — large-capacity scheduled access control
- Best for: Dry-food households that need both scheduled portions and active-tag access control and can use the one-half-cup minimum daily setting.
- Skip if: The cat needs less than one-half cup per day, rejects a larger active tag, eats wet food, or needs implanted-microchip recognition.
- Main tradeoff: Large scheduled capacity with selective access, but coarse cat portions, tag burden, and a large footprint.
- Closest alternative: PETLIBRO One RFID for a smaller tag-based scheduler or SureFeed MPF001 for implanted-chip access.
- Score: 72/100 — reader fit 18/25; evidence 17/20; longevity 10/15; differentiation 12/15; risk/return 8/15; demand 3/5; commercial 4/5.
- Hard gates: ASIN verified; distinct specialist slot; no matching CPSC recall found; claims supportable; canonical affiliate format compliant.
- Strengths: Scheduled portions, 32-cup hopper, active RFID open/closed modes, current PawsPik documentation.
- Failure modes: One-half-cup daily minimum; large powered tag; dry food only; large footprint and feeder-spacing guidance.
- Evidence:
  - [Amazon exact listing](https://www.amazon.com/dp/B0D6GVDP4Q) — exact upgraded PortionPro Rx variant.
  - [PawsPik product page](https://pawspik.com/products/portionprorx-automatic-pet-feeder) — current manufacturer specifications and ownership constraints.
  - [ASIN-specific manual](https://manuals.plus/asin/B0D6GVDP4Q.pdf) — PPRX1700 setup, portions, tag, cleaning, and troubleshooting.
  - [Independent review](https://www.catfooddispensersreviews.com/portionpro-rx-automatic-pet-feeder-review/) — effective theft control with tag-size and small-cat portion limitations.
  - [CPSC recall API check](https://www.saferproducts.gov/RestWebServices/Recall?ProductName=PortionPro&format=json) — official search returned no matching PortionPro records on the run date; not a certification.
- Decision reason: The evidence is adequate but the reader fit is specialist, producing a 72 below the approval threshold. The 4 commercial points do not rescue the minimum-portion and ownership burdens.

### SureFeed Microchip Pet Feeder Connect — reject

- ASIN and exact variant: `B07RHZHHGN`; manufacturer item 394540; white Connect feeder only; hub sold separately; canonical affiliate URL `https://www.amazon.com/dp/B07RHZHHGN/ref=nosim?tag=abbeybench-20`.
- Decision slot: compatibility
- Best for: Existing Sure Petcare Hub owners who specifically value portion-weight guidance and feeding-history data.
- Skip if: The household does not already own a verified compatible hub or the standard SureFeed already solves the problem.
- Main tradeoff: Adds tracking and scales while retaining manual filling, C batteries, and the rear-access weakness, plus a separate hub dependency.
- Closest alternative: SureFeed MPF001 standard version.
- Score: 58/100 — reader fit 18/25; evidence 16/20; longevity 10/15; differentiation 5/15; risk/return 4/15; demand 2/5; commercial 3/5.
- Hard gates: ASIN verified; compatibility slot defined; no matching CPSC recall found; claims supportable; canonical affiliate format compliant.
- Strengths: Implanted-chip access, wet/dry use, portion guidance, current manual and support.
- Failure modes: Hub not included; connected-account burden; manual bowl and C batteries; rear reach-around; strong overlap with the standard model.
- Evidence:
  - [Amazon exact listing](https://www.amazon.com/dp/B07RHZHHGN) — exact Connect variant and repeated hub-sold-separately warning.
  - [Sure Petcare Connect support](https://www.surepetcare.com/en-us/support/microchip-pet-feeder-connect) and [Connect manual](https://i00.eu/file/403/18214-manual-en.pdf) — manufacturer workflow and ownership dependencies.
  - [Owner discussion](https://www.reddit.com/r/CatAdvice/comments/1oof33t/surefeed_microchip_feeder_worth_it/) — owners often prefer the basic model and report rear-access limitations.
  - [CPSC recall API check](https://www.saferproducts.gov/RestWebServices/Recall?ProductName=SureFeed&format=json) — official search returned no matching SureFeed records on the run date; not a certification.
- Decision reason: Reject because the hub dependency and connected overhead do not improve the core reader recommendation enough to justify a second SureFeed slot. At 58 it is below the hold threshold.

## Evidence blockers

- PETLIBRO anti-stealing performance is conflicting: current exact-variant listing and official support are clear, but owner reports include forced-lid, sensor, and collar-tolerance failures.
- No CPSC brand/model matches were found for the evaluated feeders. That only establishes the result of the official database searches on 2026-07-20; it does not establish comprehensive product safety.
- Microchip readability depends on chip standard, location, migration, pet posture, and feeder geometry. No guide should promise universal compatibility.
- Exact Amazon variants can change or become unavailable. Tuesday activation must re-open the exact ASIN before editing the catalog or guide.

## What should change on the site

- Approved candidates awaiting activation: 2 — SureFeed MPF001 (`B00O0UIPTY`) and Closer Pets MiBowl CP500 (`B09ZLJCYSR`).
- Guide that could use them: `/guides/best-automatic-cat-feeders-two-cats/`, if Tuesday verification confirms each exact listing and the two decision slots remain distinct.
- Claims or language to avoid: “guarantees no stealing,” “works with every microchip,” “automatic feeder” without distinguishing a protected bowl from scheduled dispensing, any health or weight-loss outcome, and any price or availability statement.
- Next unresolved product gap: A genuinely reliable wet-food feeder that combines timed dispensing with implanted-microchip access; none of the five candidates fully covers that job.

This note records research decisions only. It does not authorize catalog activation, guide edits, Supabase sync, deployment, or email.
