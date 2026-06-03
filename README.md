# Pet Gear Bench

Pet Gear Bench helps dog and cat owners choose feeders, fountains, travel gear, litter tools, toys, and pet tech for real homes.

## MVP

- Static Vercel site.
- Amazon Associates tag: `abbeybench-20`.
- Curated ASIN database in `data/products.json`.
- Affiliate URL format: `https://www.amazon.com/dp/{ASIN}/ref=nosim?tag=abbeybench-20`.
- Supabase schema for products, subscribers, and outbound affiliate clicks.
- Resend admin pulse script.
- Initial SEO content batch under `guides/`.

## Commands

```bash
npm run check
npm run report:weekly
npm run send:admin-pulse
```

## Domain

Intended production host: `https://www.petgearbench.com`.

After buying the domain, point DNS to Vercel and update `PUBLIC_SITE_URL` / `PUBLIC_BASE_URL` if needed.
