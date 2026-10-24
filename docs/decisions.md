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

## Styling: Tailwind CSS 4

<!-- TODO: complete in phase 2, with the token approach. -->

## Email provider

<!-- TODO: complete in phase 4. -->

## Analytics

<!-- TODO: complete in phase 5. -->
