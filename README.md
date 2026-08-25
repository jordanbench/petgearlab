# Pet Gear Bench

Pet Gear Bench helps dog and cat owners choose feeders, fountains, travel gear, litter tools, toys, and pet tech for real homes.

## MVP

- Static Vercel site at `https://www.petgearbench.com`.
- Amazon Associates tag: `abbeybench-20`.
- Curated ASIN database in `data/products.json`.
- Affiliate URL format: `https://www.amazon.com/dp/{ASIN}/ref=nosim?tag=abbeybench-20`.
- Supabase tables track products, subscribers, and outbound affiliate clicks.
- Resend sends admin pulses only; no public newsletter send is automated.

## Current Public Pages

- `/guides/best-automatic-litter-boxes-apartments/` - Best Automatic Litter Boxes for Apartments
- `/guides/best-automatic-cat-feeders-two-cats/` - Best Automatic Cat Feeders for Two-Cat Homes
- `/guides/dog-car-hammock-vs-seat-cover/` - Dog Car Hammock vs Seat Cover for Summer Travel
- `/guides/stainless-steel-pet-fountain-review/` - Stainless Steel Pet Fountain Review After 30 Days
- `/guides/best-cat-litter-mats-small-apartments/` - Best Cat Litter Mat for Small Apartments
- `/guides/best-indoor-dog-toys-working-owners/` - Best Indoor Dog Toy for Working Owners: Supervised Enrichment
- `/guides/best-pet-cameras-while-away/` - Best Pet Cameras for Checking In While Away
- `/guides/new-puppy-starter-kit-amazon/` - New Puppy Starter Kit on Amazon
- `/guides/best-pet-water-bottles-travel/` - Best Portable Dog Water Bottles for Travel
- `/guides/cat-fountain-vs-water-bowl/` - Cat Fountain vs Water Bowl
- `/guides/best-enzyme-cleaners-pet-stains/` - Best Enzyme Cleaners for Pet Stains
- `/guides/best-cat-trees-small-spaces/` - Best Cat Trees for Small Spaces
- `/guides/pet-travel-checklist-car-rides/` - Pet Travel Checklist for Car Rides

Trust pages: `/about/`, `/contact/`, `/privacy/`, and `/affiliate-disclosure/`.

## Commands

```bash
npm run check
npm run audit:catalog
npm run validate:candidates
npm run sync:products
npm run report:weekly
npm run send:admin-pulse
```
