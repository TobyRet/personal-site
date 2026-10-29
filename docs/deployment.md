# Deployment and routing

This page explains how the site gets to Cloudflare and how Cloudflare answers a request.

## Build

`astro build` writes the site to `dist/`.

- `dist/client/` holds the static files: HTML pages, `_astro/` bundles, images, `_headers`, the sitemap, `robots.txt` and `llms.txt`.
- `dist/server/entry.mjs` is the Worker. It runs only the routes that set `export const prerender = false`.
- `dist/server/wrangler.json` is the config that Wrangler deploys.

The adapter makes `dist/server/wrangler.json` from `wrangler.jsonc`.
`.wrangler/deploy/config.json` tells Wrangler to use that generated file.
So edit `wrangler.jsonc`, but read the generated file to see what is deployed.

## Deploy

GitHub Actions deploys the site. See `.github/workflows/ci.yml`.

1. Every pull request and every push to `main` runs the `verify` job.
   It runs `check:pii`, lint, `astro check`, unit tests, the build and the Playwright tests.
2. A push to `main` also runs the `deploy` job, but only after `verify` passes.
   It uses the `production` environment and runs one deploy at a time.
3. The `deploy` job runs `bun run build`, then `bunx wrangler deploy`.
   Wrangler signs in with the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

`wrangler.jsonc` sets `account_id` to the personal Cloudflare account.
Deploys must not go to any other account.

To deploy by hand, run `bun run deploy`.
To test the deployed Worker on your machine, run `bun run preview`.

## Domain

The Worker `personal-site` serves `tobyretallick.com` as a Custom Domain.
Cloudflare creates the DNS record and the certificate.
`workers_dev` and `preview_urls` are off, so the site has no `workers.dev` or preview address.
Workers observability is on.

## Routing

Astro maps each file in `src/pages/` to a URL when it builds the site.
Each page becomes a folder with an `index.html` file.

| Source              | Build output                         | URL                         |
| ------------------- | ------------------------------------ | --------------------------- |
| `index.astro`       | `dist/client/index.html`             | `/`                         |
| `about.astro`       | `dist/client/about/index.html`       | `/about`                    |
| `work/[slug].astro` | `dist/client/work/<slug>/index.html` | `/work/<slug>`              |
| `robots.txt.ts`     | `dist/client/robots.txt`             | `/robots.txt`               |
| `404.astro`         | `dist/client/404.html`               | any URL that does not match |
| `health.ts`         | Worker code in `dist/server/`        | `/health`                   |

`work/[slug].astro` makes one page for each case study at build time.

Cloudflare handles a request in this order:

1. The static asset layer looks for a file that matches the path.
   It maps `/about` to `about/index.html`.
   If it finds a file, it serves it with the headers from `_headers`.
   The Worker does not run.
2. If no file matches, the Worker runs.
   Astro's router in the Worker checks the routes that render on request.
   Today that is only `/health`.
3. If no route matches, the Worker returns the 404 page.

Most requests never reach the Worker.
Static files do not count as Worker requests.
