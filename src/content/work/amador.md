---
title: Amador, from prototype to live marketplace
subtitle: Sole lead engineer for a startup marketplace
client: Amador
clientNamed: true
clientHref: https://www.amador.life
sector: Startup, creator marketplace
role: Technical lead (part-time)
start: 2025-04
stack: [Next.js, TypeScript, Supabase, Stripe, Cloudflare, Vercel]
relevantIf: A hands-on lead to take a prototype to a live product.
team: Sole lead engineer, working with the founder
summary: I took an inherited prototype to a live product in about four months, with AI-powered onboarding and an AI-assisted engineering workflow.
featured: true
order: 1
---

## At a glance

Amador is a two-sided marketplace where brands find creators for user-generated content. I joined as sole lead engineer when the product was an inherited prototype, and I took it live in about four months.

## The situation

Amador was selected for the Antler Australia pre-seed residency. When I joined, the product was an inherited prototype.

I work with the founder on technical direction and product.

## What I did

- I took the prototype to a live production platform.
- I built campaigns, brand surveys and polls.
- I designed the points ledger and a tiered subscription model.

## How I used AI

### In the product

- I built an onboarding flow that uses the OpenAI API to write a brand identity and community kit.
- Each brand has a token balance that meters its AI use.

### In my engineering work

- I use Claude Code. Each change goes through a spike, a spec and a review before the build.
- Review agents check security, database, Stripe and UX changes.
- Scheduled agents triage dependency updates, fix issues, review pull requests and reduce type errors.

### Keeping it safe

- Each agent has a written scope and read-only access to production.
- Nothing pushes to main. A person approves every merge.

## The result

- More than 140 brands and creators use the platform.
- The founder can release changes safely, through a guarded workflow.
- Amador was accepted into the Vercel for Startups programme.

<details>
<summary>Technical detail</summary>

**Payments and data**

- The subscription model has campaign-slot limits, scheduled plan changes and Stripe webhook reconciliation.
- I made the Postgres functions that move money atomic and idempotent.

**Security**

- I added Row Level Security audits, and rate limiting at a Cloudflare edge Worker.

**Delivery**

- I run the product with trunk-based development, pull request gates, CI and a typecheck ratchet.

</details>

## Stack

Next.js, React and TypeScript on Vercel. Supabase for Postgres and authentication. Stripe for payments and subscriptions. Cloudflare for the edge Worker. OpenAI for the onboarding flow.
