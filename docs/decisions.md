# Decisions

Each entry records a decision and the reason for it.

## Framework: Astro with React islands

Astro outputs static HTML with no JavaScript by default.
React runs only where a page needs it, such as the contact form.
This keeps pages fast and makes a Lighthouse score of 95 or more realistic.

## Hosting: Cloudflare Workers with static assets

Cloudflare now recommends Workers with static assets for new projects, not Pages.
One `wrangler.jsonc` file configures both the static site and the Worker.
Static files are served without running the Worker, so they cost nothing to serve.
Only the contact endpoint and `/health` run Worker code.

The adapter has sessions turned off and optimises images at build time.
So the Worker needs no KV namespace and no Images binding.

## Package manager: Bun

Bun installs packages quickly and runs the project scripts.
Astro, Wrangler and Playwright still run on Node.js.

## TypeScript 6.0, not 7.0

`@astrojs/check` and `typescript-eslint` do not support TypeScript 7 yet.
We will upgrade when they do.

## Styling: Tailwind CSS 4 with our tokens only

All tokens live in `src/styles/tokens.css`. Raw values sit on `:root`. A `@theme static` block exposes them to Tailwind after `--*: initial` clears every default colour, font, spacing step, radius and shadow. So a class like `bg-red-500`, `p-5`, `rounded` or `shadow` does not exist.

We kept Tailwind over plain CSS or CSS modules for two reasons:

- Utility classes in components can only name tokens. That enforces the brief's "no magic values" rule mechanically.
- Styles sit next to the markup, so small components stay single-purpose and easy to change.

`scripts/check-design.mjs` (part of `bun run lint`) fails on Tailwind arbitrary values such as `p-[13px]` and on inline `style` attributes. Layout values that need a token use Tailwind's custom property syntax, for example `grid-cols-(--layout-handout)`.

Shared class strings for controls live in `src/components/ui/styles.ts`, so the React contact form island looks the same as the Astro components.

Focus styles are plain CSS outside Tailwind's layers, so no utility class can override them.

## Design direction: the margin-note handout

The first build followed GOV.UK too closely and looked like a copy. The owner asked for GOV.UK's plainness without its look, and for reading as pleasant as an e-reader. We ran impeccable's direction round. Its dice assigned a "letter of introduction" direction (5th on our ranked list). After hearing that, the owner chose the top-ranked direction, the margin-note handout. Product context is in `PRODUCT.md`. The design contract is in `.impeccable/surfaces/`.

- Each page is a calm reading column of about 34em, with facts in a margin to the right. On phones the margin folds in under the title.
- Literata for reading and headings: an open-licence serif made for e-book reading. We load the weight-only files (about 52 KB for Latin), not the optical-size files (about 110 KB), to protect page speed.
- Atkinson Hyperlegible Next for the interface: nav, labels, forms, buttons and notes. It was designed for low-vision legibility.
- One accent, blue-black ink, for links, notes and focus. Light and dark themes, with every text colour at AA contrast or better.

## Theme switch without a framework

Readers can switch between light and dark. With no choice saved, the site follows the device. The choice is stored in `localStorage` and applied as `data-theme` on `<html>`, which the tokens read.

- The switch replaced an "Aa" reading settings control (text size, font and theme). Text size repeated browser zoom, the font choice was rarely useful, and the control crowded the phone header. The owner chose to keep only light and dark.
- The switch is an Astro component with a small script (a custom element), not a React island. A React island in the header would load React (about 40 to 45 KB compressed) on every page.
- A tiny inline script in `<head>` applies a saved choice before the page paints, so there is no flash.
- Without JavaScript the button stays hidden, and the site follows the device's dark mode.
- React is still installed for the contact form, which is the only island.

## Search and AI visibility

The site is built to be read by people first, and by search engines and AI tools second. Everything is generated from the content and `site.config.ts`, so it stays current when copy changes.

- **Addresses:** `url` in `site.config.ts` sets canonical URLs, Open Graph tags, the sitemap, `robots.txt` and `llms.txt`.
- **Sitemap:** `@astrojs/sitemap`. Internal and hidden pages (styleguide, share card, privacy) are left out and marked `noindex`.
- **robots.txt:** allows every crawler, AI crawlers included, because being found and summarised by AI tools helps the site's goal.
- **llms.txt:** a plain Markdown summary for AI tools (https://llmstxt.org): who, availability, good fit, every case study with its summary, and links.
- **Structured data:** JSON-LD on every page describes the site and a Person (with LinkedIn and GitHub as `sameAs`). Case studies add a CreativeWork credited to the Person, and a BreadcrumbList.
- **Share image:** one 1200 by 630 card for every page, made with `bun run og-image`.

## Analytics: Cloudflare Web Analytics

Cloudflare Web Analytics counts page views and visits without cookies and without tracking individual visitors, so the site needs no cookie banner.

- The beacon is added by `BaseLayout.astro` when `analytics.cloudflareToken` is set in `site.config.ts`. The token is public: it appears in every page.
- Cloudflare's automatic injection did not reach pages served from the Worker's static assets, so the site uses the manual snippet ("Enable with JS Snippet installation" in the dashboard).
- GA4 can be added later through `analytics.ga4MeasurementId`, and must load only after cookie consent.
