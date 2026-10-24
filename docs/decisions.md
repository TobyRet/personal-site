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

All tokens live in `src/styles/tokens.css`. Raw values sit on `:root`. A `@theme static` block exposes them to Tailwind after `--*: initial` clears every default colour, font, spacing step, radius and shadow. So a class like `bg-red-500`, `p-5`, `rounded` or `shadow` does not exist, and using a value outside the system fails silently at build time instead of slipping through.

We kept Tailwind over plain CSS or CSS modules for two reasons:

- Utility classes in components can only name tokens. That enforces the brief's "no magic values" rule mechanically.
- Styles sit next to the markup, so small components stay single-purpose and easy to change.

Shared class strings for controls live in `src/components/ui/styles.ts`, so the React contact form island looks the same as the Astro components.

Focus styles are plain CSS outside Tailwind's layers, so no utility class can override them.

## Design direction

The direction is GOV.UK-influenced, text-led, black and white, with signal yellow as the one accent. Product context is in `PRODUCT.md`. The design contract is in `.impeccable/surfaces/`.

- Font: Atkinson Hyperlegible Next, with its Mono sibling for data such as dates and stacks. It is open-licence, designed for legibility, not Inter, and self-hosted through `@fontsource-variable`. The packages pin the font version and generate the `@font-face` rules.
- The impeccable detector flags the thick left border on `Callout` and on form fields with errors. We keep both on purpose. They are GOV.UK's inset text and error patterns, which the brief asks for.

## Email provider

<!-- TODO: complete in phase 4. -->

## Analytics

<!-- TODO: complete in phase 5. -->
