---
title: A flight scheduling front end for a major airline
subtitle: Checking a year of flights against the rules, from design to first release
client: A major Australian airline
clientNamed: false
sector: Aviation
role: Lead engineer
through: Terem
start: 2025-05
end: 2025-09
stack:
  [
    React,
    TypeScript,
    Vite,
    Tailwind CSS,
    shadcn/ui,
    Radix,
    Vitest,
    React Testing Library,
    GitHub Actions,
  ]
summary: I led engineering on a new front end that checks the full 12-month network schedule against rules such as curfews, turn times and crew limits.
featured: false
order: 5
---

## The situation

A major Australian airline needed a new front-end application for flight scheduling. The system checks the full 12-month network schedule, for every port and flight, against rules such as curfews, turn times and crew limits.

I led engineering on the front end, from design to a successful first-phase release.

## The constraints

- The schedule covers a full year of flights across about 170 ports and the whole fleet.
- Schedule files are very large.

## What I did

- I set up the front end from scratch with React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui and Radix, with Vitest and React Testing Library for tests.
- I added a GitHub Actions pipeline that checks every pull request.
- I built a fast Gantt chart that shows a year of flights across about 170 ports and the whole fleet.
- I designed the breach view. It shows where the schedule breaks a rule.
- I built the constraint and schedule management screens, including processing for very large schedule files.

## The result

The first phase released successfully.

## Stack

React 19 and TypeScript, built with Vite. Tailwind CSS with shadcn/ui and Radix for components. Vitest and React Testing Library for tests. GitHub Actions for CI.

## What I would do differently

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate.
