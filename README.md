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

## Editing content

You can change all copy without touching components.

- **Page copy:** `src/content/pages/*.md`. The frontmatter holds the title, subtitle and meta description. The body is Markdown.
- **Case studies:** `src/content/work/*.md`, one file each. The file name is the URL, for example `amador.md` becomes `/work/amador/`. The frontmatter is checked against the schema in `src/content.config.ts`. Each body uses six sections: The situation, The constraints, What I did, The result, Stack, What I would do differently.
- **Show a case study on the home page:** set `featured: true`. Change the order with `order`.
- **CV entries:** `src/content/cv.json`.
- **Availability, links and the CV PDF:** `src/site.config.ts`.
- **Placeholders:** unfinished sections hold lorem ipsum. `bun run lint` prints how many are left.

Copy rules: Simple Technical English, no em dashes, and none of the banned words in `CLAUDE.md`. `bun run lint` checks the last two.

Personal data: this repo is public. Keep the CV, testimonials and anything private in `private/`, which git ignores. `bun run check:pii` checks the repo.

## Design system

- Tokens: `src/styles/tokens.css`. Change a colour, size or space here and it changes everywhere.
- Styleguide: run `bun run dev` and open http://localhost:4321/styleguide/ to see every token and component.
- Components use token classes only. `bun run lint` fails on Tailwind arbitrary values (`p-[13px]`), spacing classes with no token (`w-40`) and inline `style` attributes.
- Site-wide settings (name, links, availability, analytics): `src/site.config.ts`.
- Light and dark themes and the reader's Aa settings are handled in `tokens.css`. Components never pick colours for a theme themselves.
