---
name: website-baseline
description: Finishing checklist and defaults for every website built for Jonathan. Use whenever building or substantially modifying a website, landing page, or web app, before declaring it done.
---

# Website Baseline

Every site ships with the same finishing pass. Do these without being asked:

## Required on every site
1. **Favicon** — generate one matching the brand (emoji-based SVG favicon is fine for demos).
2. **Share card** — Open Graph + Twitter card meta tags (og:title, og:description, og:image, twitter:card). Generate an og:image if none exists.
3. **Mobile support** — responsive layout, viewport meta tag, tap targets ≥44px, test at 375px width.
4. **Overlap/layout review** — before finishing, render the page (or reason through breakpoints) and verify no text overlaps, nothing clips off-screen, and long strings (Hebrew/Chinese included) wrap correctly.
5. **RTL check** — if the site has Hebrew content, verify `dir="rtl"` handling on those elements/pages.
6. **Meta basics** — `<title>`, meta description, lang attribute.

## Deployment defaults
- Stack preference: Next.js on Vercel, pushed via GitHub (this is the established pipeline; WordPress sites are being migrated *away* from GoDaddy).
- Domains: apex domains sometimes redirect to subdomains (e.g. newvoices.ai → insight.newvoices.ai); ask which pattern applies before wiring DNS instructions.

## Style notes
- Jonathan likes bold, imagery-driven design ("adventure", "luxury explorer" aesthetics have come up for finance brands) — propose a visual direction, don't ship gray boilerplate.
- Bilingual/trilingual (EN/ZH/HE) is common — structure copy so translation is easy even if v1 is English-only.
