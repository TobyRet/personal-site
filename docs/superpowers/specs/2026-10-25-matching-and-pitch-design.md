# Design: case studies for matching, and a home page that pitches

Date: 25 October 2026. Status: approved by the owner.

## Why

A hiring manager asks four questions, roughly in this order:

1. Can they do the role? Seniority, role type, hands-on or not.
2. Have they done something like our problem? Sector, stack, the kind of situation.
3. Can we actually get them? Availability, location, contract or permanent.
4. Is there proof? Outcomes and recognisable clients.

Each page should answer all four in its first screen, so a visitor can decide in under a minute. The detail lower down serves the engineering lead who keeps reading after deciding.

The owner wants the home page to work as a pitch. A visitor should see proof and availability, then get in touch. Case studies are supporting evidence.

## Goals

- Every case study follows one format, with the facts that help matching in the margin.
- The home page leads with the new headline, proof, availability and a contact prompt in the first screen.
- Case study cards (home and Work index) show sector, role and two or three stack tags.
- Recognisable clients appear on the home page.
- All copy stays in content files and `src/site.config.ts`. All styling uses design tokens.

## Non-goals

- Employment eligibility details. The owner chose to leave them off for now.
- SEO work (titles, Open Graph, sitemap). That is a later phase.
- The contact form. That is phase 4.
- Any change to the header, footer, navigation, "Aa" reading settings, or other pages.

## Anti-goals (a failure even if it works)

- Breaking the handout world: a serif reading column with notes in a wide margin, hairline rules, no boxes, cards, shadows, gradients, badges in colour, centred heroes or hero banners. See `.impeccable/surfaces/src-pages-index-astro.md`.
- Client logos as images. There are no logo files and no permission to use them. Coloured logos would also break the black-and-white, text-led brand. The one exception is the monochrome Equal Experts logo in the quote credit, which the owner chose.
- Inventing facts. Every claim must come from the existing case study files, the two new source files, or the CV facts in `PRODUCT.md`.
- Personal data the repo rules forbid (see `CLAUDE.md`).
- New TODO comments in code or content. Follow-ups go in `private/todo.md`, copy notes in `private/copy-notes.md`.

## The case study format

Every file in `src/content/work/` uses these body sections, in this order:

1. **At a glance**: one short paragraph. Who the client is, what was built, my role and the headline outcome.
2. **The situation**: the problem and context. Constraints that used to be a separate section fold in here.
3. **What I did**: plain-language bullets.
4. **The result**: outcomes.
5. **Technical detail**: optional. A collapsed `<details>` block with a `<summary>Technical detail</summary>`, holding bold group labels and bullets.
6. **Stack**: the full stack as one sentence.

"The constraints" and "What I would do differently" are removed from all five files. Their lorem ipsum goes with them.

### Frontmatter

The existing schema in `src/content.config.ts` stays, with these changes:

- `stack` becomes the **key stack**: four to six items, enforced by the schema (min 4, max 6). The order matters, because cards show the first three. The full stack lives in the body's Stack section.
- New required `relevantIf`: one line that completes "Relevant if you need…". Example: "a lead for a new React front end that handles very large data."
- New optional `team`: the team's size or shape, only where the source says it. Example: "Team in Australia and India".

### Content per file

- **Abcam** (`abcam-ecommerce-rebuild.md`) and **Airline** (`airline-flight-scheduling.md`): replace each with its new source file. The sources are `abcam-ecommerce-rebuild_1.md` and `airline-flight-scheduling_1.md`, copied into the session scratchpad. Remove the source's TODO comment. Convert dates to `YYYY-MM`: Abcam is 2022-01 to 2024-10, Airline 2025-05 to 2025-09. Keep `clientNamed`, `featured` and `order` from the current files. Trim `stack` to six items.
- **Amador**, **Student housing** and **Super fund**: restructure their existing copy into the new sections. Do not add facts. In Amador, the deeper engineering bullets (Postgres functions, Row Level Security, the AI workflow and its review agents, the ledger detail) move into Technical detail. Plain outcome bullets stay in What I did. Student housing and Super fund have no technical source material, so they have no Technical detail section.
- Drafted lines (`relevantIf`, `team`, At a glance paragraphs for the three restructured files) are listed in `private/copy-notes.md` for the owner to review.

### Case study page

- The margin (CaseStudyFacts) shows, in this order: **Relevant if you need** (accent tone, the first thing seen), Client, Sector, Role, Dates, Through, **Team** (when present), **Key stack** (the `stack` items). On phones the notes fold under the title, as now.
- The body renders the Markdown as now. `<details>` needs styling in `Prose.astro`. The summary line uses the UI face with a visible open and closed marker. It needs a keyboard focus ring and enough click area, and a hairline rule above and below. Open content uses the same rhythm as the rest of the prose. Use tokens only.
- The "Need something similar?" block and pagination stay.

## Case study cards

`CaseStudyCard.astro` is used on the home page and the Work index. It adds two or three stack tags: the first three `stack` items, rendered with the existing `Tag` component. The meta line keeps sector, role and dates. Cards stay in `order`, which the owner sets by relevance.

## Home page (impeccable shape brief)

**Job and audience.** A hiring manager, engineering lead, recruiter or consultancy, often on a phone, often from a CV or LinkedIn link. Mode: Persuade, inside the established handout world.

**Outcome.** Primary action: get in touch. Success: within the first screen the visitor knows the role, the kind of problem, availability and one piece of proof, and can reach the contact page in one tap.

**Sequence (reading column).**

1. H1: "I get important software into production safely". Subtitle: "Technical lead and senior full-stack engineer. 12 years of consulting and contract work in the UK and Australia."
2. Intro: "Clients bring me in when a platform is unstable, a prototype needs to go live, or a regulated deadline is close. I lead the team and I write the code."
3. A proof line: "An inherited prototype taken to production in about four months, now used by more than 140 brands and creators." Do not use the super fund outage claim.
4. The primary "Get in touch" button, inside the first screen on a 360px phone and on desktop.
5. **A stand-out quote.** A testimonial from a colleague's public LinkedIn post, rendered with the existing `Quote` component and placed after the "Get in touch" button. It is driven by optional content in the home page frontmatter: a `testimonial` with `quote`, `attribution` and `sourceHref`. When the entry is missing, nothing renders. The owner chose to use it now. The text is quoted word for word, and shortened only with an ellipsis:
   - Quote: "What sets him apart is the combination … Proven, high quality engineering paired with genuine consulting skills … an ability to read the room, earn trust with stakeholders and bring the team along, you don't find that in a single lead often." Keep it exactly as written, including its punctuation. The copy check does not apply to quoted text, but this excerpt passes it anyway.
   - Logo: the Equal Experts logo, monochrome, in the quote's credit. The owner chose to add it before asking Equal Experts. The file is `src/assets/logos/equal-experts.svg`: the logo from equalexperts.com, cleaned, with every fill set to `currentColor`, so it takes the theme's text colour in light and dark. Inline it, so `currentColor` works. Mark it decorative, because the credit text names Equal Experts Australia. Size it with tokens, about the cap height of the heading face.
   - Attribution: "A colleague at Equal Experts Australia". Do not name the author in the repo.
   - Source link, labelled "Read the original post on LinkedIn": https://www.linkedin.com/feed/update/urn:li:activity:7518490572039294976/
6. **Clients include**: a typeset line of client names, not logos. Use only names already public on the site or CV: Abcam, Mastercard, the Department for Education, the Ministry of Justice and the Government Digital Service. Keep the list in `src/site.config.ts`. Amador is not in the line, because the proof line already names its work.
7. **Good fit if you need**: a short list of three items:
   - "A hands-on lead for a new build or an inherited product."
   - "Someone to steady a legacy platform."
   - "Cover for a key role in a regulated environment."
8. **Selected work**: the featured cards, with stack tags, then "All case studies".
9. A closing "Work with me" contact block, as now.

**Margin.** Availability (accent), Based in, Get in touch, as now. Desktop keeps the margin beside the column. On phones, the home page only shows the intro, proof line and button first, then the folded notes, then the rest. This is a home-only option on `Handout.astro`; other pages keep notes under the title. (Builder's call, made for the owner.)

**First screen.** The button must be visible without scrolling at 360×780 and at 1280×800. The current second paragraph of `home.md` (sectors and stacks) is removed. The "Good fit" list, client names and card stack tags now carry that information.

**Copy location.** The H1, subtitle and description stay in `src/content/pages/home.md` frontmatter. The intro and proof line go in its body. The "Good fit" items and the client list go in `src/site.config.ts` or frontmatter, not in components.

**States and ranges.** One to four featured case studies. Client list of three to eight names. Long client names wrap cleanly at 360px.

**Untouched.** Header, footer, navigation, the "Aa" control, tokens other than any new ones the details block needs, and all other pages.

## Constraints

- Tokens only. `bun run lint` runs the design token check.
- Copy rules: Simple Technical English, no em dashes, no banned words. `bun run lint` runs the copy check.
- WCAG 2.2 AA. The e2e suite runs axe on every page in light and dark mode. `<details>` must pass, keyboard included.
- Bun only. Before done: `bun run lint`, `bun run check`, `bun run test`, `bun run build`, `bun run e2e`, `bun run check:pii`.
- Read impeccable's craft floor before UI edits: `~/.claude/plugins/marketplaces/impeccable/plugin/skills/impeccable/reference/craft-floor.md`. After UI changes, run the detector once: `~/.claude/plugins/marketplaces/impeccable/plugin/skills/impeccable/scripts/impeccable detect --json <changed files>`.

## Known data notes

- The new Airline source says a season of about seven months across 173 ports. Older copy said a 12-month schedule across about 170 ports. Follow the new source, and list the difference in `private/copy-notes.md`.
- Amador has seven stack items. Trim to six and record the choice in `private/copy-notes.md`.

## Left to the builder

- Exact component names, and whether "Good fit" and "Clients include" are new section components or reuse `Prose`.
- The exact `<details>` styling inside the rules above.
- Test design. At minimum: a content test that every case study has the required sections in order, and e2e coverage of the new home sections and the details block.
