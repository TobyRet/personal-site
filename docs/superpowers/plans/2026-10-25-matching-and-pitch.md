# Case study matching and home page pitch: implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put every case study in one format with matching facts in the margin, add stack tags to cards, and reshape the home page into a pitch with proof, a quote and client names.

**Architecture:** Astro static pages built from typed content collections (`src/content.config.ts`). Copy lives in Markdown frontmatter and bodies, and in `src/site.config.ts`. Components use Tailwind classes that name design tokens only. Pages compose components.

**Tech Stack:** Astro 7, TypeScript (strict), Tailwind CSS 4 with project tokens, Vitest (unit), Playwright with axe (e2e), Bun.

**Spec:** `docs/superpowers/specs/2026-10-25-matching-and-pitch-design.md`. Read it before starting any task.

## Global Constraints

- Bun only: `bun run <script>`, `bunx <tool>`. Never npm or pnpm.
- Tokens only. No Tailwind arbitrary values (`p-[13px]`), no inline `style` attributes, no raw colours or sizes in components. `bun run lint` enforces this.
- Copy: Simple Technical English, short sentences, active voice. No em dashes. Never "elevate", "empower", "seamless", "unlock" or "leverage". No three-part slogans. The quote is the only exception, and it must stay word for word.
- No TODO comments in code or content. Draft copy is listed in `private/copy-notes.md`. Follow-ups go in `private/todo.md`.
- Never invent facts. Use only the existing case study files, the two source files (their path is in your task brief), and `PRODUCT.md`.
- The repo is public. Never name the quote's author. Run `bun run check:pii` before each commit (the pre-commit hook also runs it).
- WCAG 2.2 AA. The e2e suite runs axe on every page in light and dark mode.
- Keep the handout look: serif reading column, notes in the margin, hairline rules. No boxes, shadows, cards, gradients, coloured badges or centred heroes.
- Before UI edits, read impeccable's craft floor: `~/.claude/plugins/marketplaces/impeccable/plugin/skills/impeccable/reference/craft-floor.md`.
- Each task ends with: `bun run lint`, `bun run check`, `bun run test`, `bun run build`, `bun run e2e`, all passing. Then commit. No `Co-Authored-By` or AI attribution lines in commit messages.

## Review Focus

- `<details>` with keyboard only: the summary takes focus with a visible ring, Enter and Space toggle it, and axe passes with it open and closed. (Task 2 tests.)
- 360px phones: long client names, stack tags and margin notes wrap with no horizontal scroll. (Tasks 3 and 4 test `scrollWidth <= clientWidth`.)
- Dark mode: the `currentColor` logo, the tags and the details marker keep AA contrast. (Covered by the axe dark-mode runs. Task 4 also checks the logo is visible.)
- Optional content missing: a case study with no `team` and no Technical detail, or a home page with no `testimonial`, leaves no empty label, rule or figure. (Task 2 tests super fund; Task 4 renders the quote only when `testimonial` exists.)
- First screen: the home page's first "Get in touch" button is in view without scrolling at 360×780 and 1280×800. (Task 4 test.)

---

### Task 1: Case study content in the new format

**Files:**

- Modify: `src/content.config.ts` (work schema)
- Modify: all five files in `src/content/work/`
- Modify: `PRODUCT.md` (the "Each body has" line), `README.md` (the "six sections" line)
- Create: `tests/unit/caseStudyFormat.test.ts`
- Modify (gitignored, not committed): `private/copy-notes.md`

**Interfaces:**

- Produces: work schema fields used by Tasks 2 and 3:
  - `stack: string[]`, min 4 and max 6. This is the key stack, and cards show the first three.
  - `relevantIf: string`, required. A full sentence that completes "Relevant if you need".
  - `team?: string`

- [ ] **Step 1: Write the failing test** `tests/unit/caseStudyFormat.test.ts`. Read every `src/content/work/*.md` with `node:fs`. Collect the `## ` headings outside the frontmatter.
  - `every case study has the required sections in order`: the headings equal `['At a glance', 'The situation', 'What I did', 'The result', 'Stack']`.
  - `technical detail, when present, sits between The result and Stack`: if the body contains `<details>`, it contains `<summary>Technical detail</summary>`, and the `<details>` index is after `## The result` and before `## Stack`.
  - `no placeholder copy`: no body matches `/lorem ipsum/i` or `/TODO/`.
- [ ] **Step 2:** Run `bun run test`. Expected: FAIL, because the old files still have "The constraints" and lorem ipsum.
- [ ] **Step 3: Update the schema.** In `src/content.config.ts`, set `stack` to `.min(4).max(6)`, add `relevantIf: z.string()` and `team: z.string().optional()`. Add one-line doc comments in the file's existing style.
- [ ] **Step 4: Replace Abcam and Airline** with the source files, keeping their bodies word for word. Make these frontmatter changes:
  - Remove the TODO comment line.
  - Dates: Abcam `start: 2022-01`, `end: 2024-10`. Airline `start: 2025-05`, `end: 2025-09`.
  - Keep `clientNamed`, `featured` and `order` from the current files: Abcam `clientNamed: true`, `featured: true`, `order: 4`. Airline `clientNamed: false`, `featured: false`, `order: 5`.
  - Abcam `stack: [React, Next.js, TypeScript, GraphQL, AWS, Kafka]`. Airline `stack: [React, TypeScript, Zustand, Vite, Node.js, PostgreSQL]`.
  - Abcam `relevantIf: A senior engineer for sign-in, customer data and a multi-region launch.`
  - Airline `relevantIf: A lead for a new React front end that handles very large data.`
- [ ] **Step 5: Restructure Amador, Student housing and Super fund.** Move existing sentences only. Add no new facts. Delete "The constraints" and "What I would do differently", including their lorem ipsum.
  - **Amador.** `stack: [Next.js, TypeScript, Supabase, Stripe, Cloudflare, Vercel]`. `relevantIf: A hands-on lead to take a prototype to a live product.` `team: Sole lead engineer, working with the founder`.
    - At a glance: "Amador is a two-sided marketplace where brands find creators for user-generated content. I joined as sole lead engineer when the product was an inherited prototype. I took it to a live production platform in about four months. More than 140 brands and creators now use it."
    - What I did keeps the plain bullets: prototype to live, campaigns and surveys, the AI onboarding flow, the points ledger and subscription model (one line), and the AI-assisted workflow (one line).
    - The deep detail goes into a Technical detail `<details>` block with bold group labels **Payments and data**, **Security** and **AI-assisted delivery**. It holds: atomic, idempotent Postgres functions; ledger and Stripe reconciliation detail; Row Level Security audits; edge rate limiting; review agents and their scope; trunk-based development and CI.
  - **Student housing.** `stack: [PHP Laravel, TypeScript, NestJS, Datadog, Sentry]`. `relevantIf: A lead to steady a legacy platform and meet a fixed deadline.` `team: Team in Australia and India`.
    - At a glance: "A global student housing platform bought an unstable legacy rental platform with no tests or monitoring. I led an Equal Experts team in Australia and India. We met a fixed regulatory deadline without changing the legacy core. We also added the first monitoring and tests, so the team could move from firefighting to planned work."
    - Fold the three constraint bullets into The situation as sentences.
  - **Super fund.** `stack: [React, TypeScript, Sass, Azure DevOps, Figma]`. `relevantIf: Cover for a key front-end role in a regulated environment.` No `team`.
    - At a glance: "A superannuation fund's member portal team needed front-end cover. I joined for one month, and the fund extended the contract each month to five. I released two member journeys and built the platform's first automated deployment pipeline."
    - Fold the two constraint bullets into The situation.
- [ ] **Step 6: Docs.** In `PRODUCT.md` and `README.md`, change the list of case study sections to: At a glance, The situation, What I did, The result, Technical detail (optional, collapsed), Stack.
- [ ] **Step 7: Copy notes.** In `private/copy-notes.md`, add a section "Matching copy drafts (25 October 2026)". List every drafted line from this task: each `relevantIf`, `team`, At a glance paragraph and stack trim. Note that the Airline source says a season of about seven months across 173 ports, while older copy said a 12-month schedule across about 170 ports. Note that student housing names India and Pakistan in What I did, but Australia and India elsewhere. In "Placeholders by page", remove the case study lines this task resolved.
- [ ] **Step 8:** Run `bun run test` (PASS), then `bun run lint`, `bun run check`, `bun run build` and `bun run e2e`. The e2e test "a visitor can open a case study from the home page" still lists the old headings. Update its list to the new five headings in this task.
- [ ] **Step 9: Commit:** `git add src/content.config.ts src/content/work PRODUCT.md README.md tests && git commit -m "content: put every case study in the matching format"`

### Task 2: Case study page: margin facts and Technical detail

**Files:**

- Modify: `src/components/sections/CaseStudyFacts.astro`, `src/pages/work/[slug].astro`, `src/components/ui/Prose.astro`
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**

- Consumes: the Task 1 schema fields `relevantIf`, `team?` and `stack`.
- Produces: new `CaseStudyFacts` props `relevantIf: string`, `team?: string | undefined` and `stack: string[]`.

- [ ] **Step 1: Write the failing e2e tests:**
  - `case study margin leads with the match line`: on `/work/airline-flight-scheduling/`, the Notes region (`getByRole('complementary', { name: 'Notes' })`) contains, in order, "Relevant if you need", "A lead for a new React front end that handles very large data.", then "Client", then "Key stack" with "Zustand".
  - `team shows only when known`: on `/work/student-housing-platform-stabilisation/`, Notes contains "Team" and "Team in Australia and India". On `/work/super-fund-member-portal/`, Notes does not contain the label "Team".
  - `technical detail opens with the keyboard`: on `/work/abcam-ecommerce-rebuild/`, find `getByText('Technical detail')` (the summary). Focus it with Tab or `.focus()`, press Enter, and expect the `details` element to have the `open` attribute and "Sign-in and access control" to be visible. Run AxeBuilder again while it's open, and expect no violations.
- [ ] **Step 2:** Run `bun run e2e`. Expected: the new tests FAIL.
- [ ] **Step 3: CaseStudyFacts.** Show "Relevant if you need" first, using `MarginNote` `tone="accent"`. Then Client, Sector, Role, Dates and Through, as now. Then Team (only when present). Then "Key stack" as a plain list of the stack items. Pass the new props from `[slug].astro`.
- [ ] **Step 4: Style `<details>` in `Prose.astro`,** with tokens only, following the spec:
  - The summary is set in the UI face, with a visible open and closed marker and a pointer cursor. Its click area is at least the token closest to 44px tall.
  - The summary's focus ring comes from the global focus style. Do not remove the outline.
  - Hairline `border-rule` rules sit above and below the block.
  - Open content keeps the prose rhythm, and its bold group labels read as small headings.
  - Use the craft floor's guidance for the marker and respect reduced motion. Animation is optional.
- [ ] **Step 5:** Run all gates. Expected: PASS.
- [ ] **Step 6: Commit:** `feat: show match facts and a technical detail section on case studies`

### Task 3: Stack tags on case study cards

**Files:**

- Modify: `src/components/sections/CaseStudyCard.astro`, `src/pages/index.astro`, `src/pages/work/index.astro`
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**

- Consumes: `stack` from Task 1.
- Produces: a new `CaseStudyCard` prop `tags: string[]`. Callers pass `entry.data.stack.slice(0, 3)`.

- [ ] **Step 1: Write the failing e2e tests:**
  - `work cards show sector, role and stack tags`: on `/work/`, the Airline card (`getByRole('article').filter({ hasText: 'flight scheduling' })`) contains "Aviation", "Lead engineer", "React", "TypeScript" and "Zustand", and does not contain "Vite".
  - `no horizontal scroll on phones`: for `/` and `/work/`, at viewport 360×780, `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Render the tags with the existing `Tag` component, in a list (`ul` or `role="list"`) labelled for screen readers, for example a visually hidden "Stack". Place it under the meta line, wrapping with token gaps. Pass `tags` from both pages.
- [ ] **Step 4:** Run all gates. Expected: PASS.
- [ ] **Step 5: Commit:** `feat: add stack tags to case study cards`

### Task 4: Home page pitch

**Files:**

- Modify: `src/content.config.ts` (pages schema), `src/content/pages/home.md`, `src/site.config.ts`, `src/pages/index.astro`, `src/components/layout/Handout.astro`
- Create: `src/components/sections/Testimonial.astro`, `src/components/sections/ClientList.astro`, `src/components/sections/GoodFitList.astro` (names are a suggestion; keep the responsibilities separate)
- Use: `src/assets/logos/equal-experts.svg` (already in the repo, untracked: commit it in this task)
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**

- Pages schema gains these optional fields:
  - `goodFit?: string[]`
  - `testimonial?: { quote: string; attribution: string; sourceHref: string (url) }`
- `SiteConfig` gains `clients: string[]`.
- `Handout` gains an optional `lead` slot. On phones the order is title, lead, notes, body. On desktop (`lg`) the lead and body stack in the reading column, and the notes stay in the margin beside them, starting level with the title, as now.

- [ ] **Step 1: Write the failing e2e tests:**
  - `home leads with the pitch`: the h1 is "I get important software into production safely". The page contains "An inherited prototype taken to production in about four months".
  - `get in touch is in the first screen`: at 360×780 and at 1280×800, the first `getByRole('link', { name: 'Get in touch' })` is `toBeInViewport()` without scrolling.
  - `quote is credited and linked`: a `figure` contains "What sets him apart is the combination". Its figcaption contains "A colleague at Equal Experts Australia" and a link "Read the original post on LinkedIn" whose `href` is `https://www.linkedin.com/feed/update/urn:li:activity:7518490572039294976/`. The figure contains an `svg`, the logo, with `aria-hidden="true"` and a non-zero bounding box.
  - `clients and good fit are listed`: the page contains "Clients include", "Department for Education" and "Good fit if you need", with three list items under that heading.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3: Content.** In `home.md`:
  - Set `title` to "I get important software into production safely".
  - Set `subtitle` to "Technical lead and senior full-stack engineer. 12 years of consulting and contract work in the UK and Australia."
  - Set `goodFit` to the spec's three items, verbatim.
  - Set `testimonial` with the exact quote and URL from the spec, and `attribution: A colleague at Equal Experts Australia`.
  - Replace the body with two paragraphs: the spec's intro, then the proof line ("An inherited prototype taken to production in about four months, now used by more than 140 brands and creators.").
  - In `site.config.ts`, set `clients: ['Abcam', 'Mastercard', 'the Department for Education', 'the Ministry of Justice', 'the Government Digital Service']`. The component renders "Clients include" plus a natural list: "Abcam, Mastercard, …, and …" or the house style without the Oxford comma ("A, B and C"), matching the site's existing lists.
- [ ] **Step 4: Handout `lead` slot** as in the Interfaces block. Other pages are unchanged. Check the 404 page, About, Contact and a case study render as before.
- [ ] **Step 5: Home page composition,** in the spec's order:
  - Lead slot: the body prose (intro and proof), then the primary `Button` "Get in touch" linking to `/contact/`.
  - Body: the Testimonial, then ClientList, then GoodFitList (with an `h2` "Good fit if you need"), then Selected work with tagged cards, then the closing "Work with me".
  - Remove the old second paragraph.
  - Testimonial: inline the SVG so `currentColor` works. Astro can import an SVG file as a component. Use the text colour token. Height is about the heading cap height, using a size token. Render only when `page.data.testimonial` exists.
  - Use the existing `Quote` component. Extend it only if needed, with an optional slot, so the styleguide still works.
- [ ] **Step 6:** Run all gates. Expected: PASS.
- [ ] **Step 7: Commit:** `feat: reshape the home page as a pitch with proof, a quote and clients`

---

## After the tasks (controller)

1. Run the impeccable detector once on the changed UI files: `~/.claude/plugins/marketplaces/impeccable/plugin/skills/impeccable/scripts/impeccable detect --json <files>`.
2. On the local dev server, screenshot `/`, `/work/`, `/work/amador/`, `/work/abcam-ecommerce-rebuild/` and `/work/super-fund-member-portal/` at 360, 768 and 1280, in light and dark mode, with Technical detail opened once. Fix what one look shows.
3. Whole-branch code review, then `bun run check:pii`, push, and confirm the CI deploy.
