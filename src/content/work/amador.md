---
title: Amador, from prototype to live marketplace
subtitle: Sole lead engineer on a two-sided marketplace for brands and creators
client: Amador
clientNamed: true
sector: Startup, creator marketplace
role: Technical lead (part-time)
start: 2025-04
stack: [Next.js, React, TypeScript, Supabase, Stripe, Cloudflare, Vercel]
summary: I took an inherited prototype to a live production platform in about four months. More than 140 brands and creators now use it.
featured: true
order: 1
---

## The situation

Amador is a two-sided marketplace. Brands use it to find creators for user-generated content. Amador was selected for the Antler Australia pre-seed residency.

When I joined, the product was an inherited prototype. I am the sole lead engineer. I work with the founder on technical direction and product.

## The constraints

<!-- TODO: copy. Replace with the real constraints (team size, budget, timeline, investor milestones). -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## What I did

- I took the prototype to a live production platform in about four months.
- I built campaigns, brand surveys and polls.
- I built an AI onboarding flow. It uses OpenAI to write a brand identity and community kit. A token balance meters each brand's AI use.
- I designed the points ledger and a tiered subscription model. It has campaign-slot limits, scheduled plan changes and Stripe webhook reconciliation.
- I made the Postgres functions that move money atomic and idempotent.
- I set up an AI-assisted engineering workflow with Claude Code. Each change goes through a spike, a spec and a review before the build. Review agents check security, database, Stripe and UX changes. Each agent has a written scope and read-only production access. A person approves every merge.
- I run the product with trunk-based development, pull request gates, CI and a typecheck ratchet.
- I added Row Level Security audits, and rate limiting at a Cloudflare edge Worker.

## The result

More than 140 brands and creators use the platform.

<!-- TODO: copy. Add any other results you can share, such as revenue, retention or speed of delivery. -->

## Stack

Next.js, React and TypeScript on Vercel. Supabase for Postgres and authentication. Stripe for payments and subscriptions. Cloudflare for the edge Worker. OpenAI for the onboarding flow.

## What I would do differently

<!-- TODO: copy. -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
