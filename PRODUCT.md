# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro with React islands only where interactivity is needed (the contact form). TypeScript strict. Tailwind CSS 4 with a CSS-first config whose defaults are replaced by our own tokens. Deployed to Cloudflare Workers with static assets; the Worker serves only the contact endpoint and `/health`. Bun is the package manager.

## Users

- Hiring managers and engineering leads deciding whether to bring in a contractor for a specific project.
- Recruiters and consultancies matching a contractor to a client brief.

They arrive from a CV, LinkedIn or a referral link, often on a phone between other tasks. Within 10 seconds they need to know who this is, what they do, whether they are available and how to get in touch.

## Product Purpose

A personal portfolio site that wins contract work for a hands-on technical lead and senior full-stack engineer. Success means the right people get in touch through the contact form or LinkedIn, already knowing what kind of engagement they want.

## Positioning

Four claims the site must make specific and true through case studies:

1. Steadies troubled projects: steps into legacy, at-risk or uncovered delivery and gets it back on track.
2. Marketing and digital product background: bridges business stakeholders and engineering.
3. A hands-on lead: leads teams while still shipping production code across front end and back end.
4. AI-assisted delivery: uses AI tooling in a disciplined way and helps teams adopt it.

## Operating Context

Visitors scan and compare. They read a case study to check fit with their own situation: sector, constraints, role and stack. They may download the CV to forward it internally. Engagement types: hands-on tech lead, senior engineer, stepping in to cover or steady a project, AI-assisted delivery.

## Capabilities and Constraints

- Pages: Home, Work index plus one page per case study, How I work, About, CV (HTML plus PDF download), Contact, Privacy, 404, an internal noindex styleguide.
- Case studies are typed content collection entries. Each body has: The situation, The constraints, What I did, The result, Stack, What I would do differently.
- Initial case studies: Amador (startup marketplace), legacy platform stabilisation (global student housing platform), member portal cover (super fund), Abcam e-commerce rebuild, airline flight scheduling front end.
- Contact form: name, email, company (optional), message. Turnstile, server-side Zod validation, honeypot, rate limiting, email to the owner. The destination address is a Cloudflare secret, never in the repo or in `wrangler.jsonc`.
- Cloudflare Web Analytics by default; GA4 possible later behind cookie consent.
- Open decision: whether clients can be named. Until decided, keep the brief's split (Amador and Abcam named; the student housing platform, super fund and airline described by sector).
- Identity (from the CV): Toby Retallick, Technical Lead and Senior Full-Stack Engineer. Based in the Greater Brisbane Area, Queensland. Works remotely across Australia and is happy to travel. Contracts through Byte Size Australia Pty Ltd. Available from November 2026.
- Looking for hands-on tech lead or senior engineer roles in product engineering, on any web stack. Prefers contract work, and is open to fixed-term or permanent roles for the right organisation.
- Phone number and email address: not published on the site or in the repo. Visitors use the contact form or LinkedIn. The repo is public.

## Brand Commitments

- Inspired by GOV.UK's plainness, clarity and respect for the reader, but never a copy of it: no GOV.UK patterns used as a look (yellow-and-black focus bar, black service strip, crown, Transport font or government branding). Revised by the owner on 24 October 2026 after the first build looked too close to GOV.UK.
- The goal is a simple, beautiful site that is a pleasure to read on desktop and mobile, like reading on an e-reader: a calm reading column, a real reading face, generous margins and nothing competing with the text.
- Black and white with at most one accent colour. Open-licence, self-hosted, highly readable font that is not Inter.
- Left-aligned, text-led layouts. No gradients, glassmorphism, drop-shadow cards, emoji icons, stock illustrations, animated blobs or centred heroes.
- Voice: Simple Technical English. Short sentences, active voice, plain words, one idea per sentence. No em dashes, no three-part slogans, and never "elevate", "empower", "seamless", "unlock" or "leverage".

## Evidence on Hand

- CV PDF: kept in `private/cv/` (gitignored) (4 pages, dated 22 October 2026). It is the source of truth for roles, dates, stacks and outcomes. The public download must be a separate version without the phone number.
- The CV backs real facts for every planned case study: Amador (inherited prototype to live in about four months, more than 140 brands and creators, Antler pre-seed residency); the student housing platform (3 million residents in 25 countries, first monitoring, tests and a strangler-pattern plan); the super fund (one month of cover extended to five, two member journeys released, first automated deployment pipeline, no unplanned outages); Abcam (global e-commerce rebuild, launched in the US, Europe, China and Japan); the airline (12-month schedule checker, Gantt chart across about 170 ports).
- Government background: GDS (data.gov.uk), Department for Education, Ministry of Justice. The GOV.UK influence is earned, not borrowed. It is still not a licence to use government branding.
- Marketing background: marketing, communications and digital product roles from 2004 to 2014, a Bachelor of Commerce in Marketing, and the Makers software engineering course in 2014.
- Open source: Code Review AI Assistant (github.com/TobyRet/code-review-assistant).
- Headshot photo: exists, not yet in the repo.
- Testimonials: a LinkedIn post from a former Equal Experts colleague, kept in `private/sources/` (gitignored) until they agree to be quoted. Others exist and are not yet in the repo.
- Absent: client logos. Do not invent results, numbers, client names or quotes beyond the CV.

## Product Principles

1. Ten seconds to know who, what, availability and contact, on any device.
2. Show, through specific case studies, rather than claim.
3. Readability first: text carries the site.
4. Easy to change: copy lives in content files, and design decisions live in tokens.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard access, visible high-contrast focus, skip link, correct heading order, labelled form fields with GOV.UK-style error summaries, sufficient contrast and respect for prefers-reduced-motion. Checked at 360px, 768px and 1280px.
