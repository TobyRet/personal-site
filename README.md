# Personal site

Portfolio site for contract work. Astro, with static HTML for every page.
A small Cloudflare Worker handles the contact form and `/health`.

## Requirements

- [Bun](https://bun.sh) 1.2 or later (package manager and script runner)
- Node.js 22.23 or later (Astro and Wrangler run on Node)

You do not need a Cloudflare account to run the site locally.

## Run it locally

```sh
bun install
bun run dev       # Astro dev server at http://localhost:4321
bun run preview   # production build, served by the real Worker at http://localhost:8787
```

Use `dev` while you work. Use `preview` to check the exact Worker you will deploy.

## Scripts

| Script               | What it does                                      |
| -------------------- | ------------------------------------------------- |
| `bun run dev`        | Start the dev server with live reload.            |
| `bun run build`      | Build the site into `dist/`.                      |
| `bun run preview`    | Build, then serve it with `wrangler dev`.         |
| `bun run lint`       | ESLint, Prettier and the design token check.      |
| `bun run format`     | Format every file with Prettier.                  |
| `bun run check`      | Type-check Astro and TypeScript files.            |
| `bun run test`       | Run unit tests (Vitest).                          |
| `bun run e2e`        | Run browser tests and accessibility checks.       |
| `bun run cf-typegen` | Regenerate Worker types after editing `wrangler`. |
| `bun run deploy`     | Build and deploy to Cloudflare.                   |

A pre-commit hook runs ESLint and Prettier on staged files.
CI runs lint, type checks, unit tests, the build and browser tests on every pull request.

## Folder structure

```text
src/
  components/ui/        Small building blocks: Heading, Button, Input, Tag.
  components/layout/    Page, Container, Stack, Grid, Section.
  components/nav/       Header, Footer, SkipLink, Breadcrumbs.
  components/sections/  Larger page sections built from ui components.
  components/islands/   React components that run in the browser.
  layouts/              Page shells: head tags, SEO, structured data.
  content/              Case studies and page copy in Markdown.
  lib/                  Plain TypeScript: SEO helpers, contact form logic.
  pages/                Routes. These only compose components.
  styles/               Design tokens and global CSS.
tests/unit/             Vitest tests.
tests/e2e/              Playwright tests.
docs/decisions.md       Key decisions and why we made them.
```

## Design system

- Tokens: `src/styles/tokens.css`. Change a colour, size or space here and it changes everywhere.
- Styleguide: run `bun run dev` and open http://localhost:4321/styleguide/ to see every token and component.
- Components use token classes only. `bun run lint` fails on Tailwind arbitrary values (`p-[13px]`) and inline `style` attributes.
- Site-wide settings (name, links, availability, analytics): `src/site.config.ts`.
- Light and dark themes and the reader's Aa settings are handled in `tokens.css`. Components never pick colours for a theme themselves.

<!-- TODO: expand this README as each phase lands (content editing, contact form setup, deploy, uptime monitoring). -->
