---
title: A flight scheduling front end for a major airline
subtitle: Scrolling a full season of flights as one smooth chart
client: A major Australian airline
clientNamed: false
sector: Aviation
role: Lead engineer
through: Terem
start: 2025-05
end: 2025-09
stack: [React, TypeScript, Zustand, Vite, Node.js, PostgreSQL]
relevantIf: A lead for a new React front end that handles very large data.
summary: I led the front end of a flight scheduling tool for a major airline. We rebuilt its main chart so planners can scroll a year of flights smoothly.
featured: false
order: 5
---

## At a glance

The airline’s planners needed to check a full season of flights for rule breaches. The first version of their tool was slow and showed only one week at a time. I led the front end at Terem, and we rebuilt the main chart. Planners can now scroll and zoom the whole season in one smooth view.

## The situation

The airline built a new internal tool for its operations planners. Planners upload a season’s flight schedule. The tool checks it against rules such as curfews, turn times and crew limits.

The main screen is a chart with a row for each aircraft and a block for each flight. A season holds thousands of flights across 173 ports. The first version slowed down as the data grew.

## What I did

- Set up the front end from scratch, with automated checks on every change.
- Designed the breach view, which highlights the flights that break a rule.
- Built the screens for managing rules and schedules.
- Made large uploads fast and reliable, so big schedule files no longer slow the system down.
- Co-led the rebuild of the main chart, so planners see the whole season in one view.
- Made the chart draw only what is on screen, so it stays fast however large the schedule is.
- Tested a cleverer design, found it made scrolling worse, and chose the smoother one.

## The result

Planners can scroll and zoom a full season of flights as one smooth chart. The chart stays fast as schedules grow, because its work depends on the screen size, not the amount of data. The new chart replaced the first version in July 2025.

<details>
<summary>Technical detail</summary>

**Scale**

- A season is about seven months of flights across 173 ports and the whole fleet.
- At the most detailed zoom, the timeline is about 5,000 columns and 400,000 pixels wide.
- Each schedule file is tens of megabytes of JSON, with about 160 fields per flight.

**Uploads**

- A streaming parser reads each flight as it arrives, instead of loading the whole file into memory.
- Each flight is cut down to the fields the screen needs. The full data goes to S3, and only metadata goes to PostgreSQL.
- Rule checks run in a background worker. The API replies at once, so uploads of up to 512 MB do not block it.

**Chart structure**

- The first version was tuned with lazy loading, less detail when zoomed out, and fewer redraws in the side panels. This helped, but it could not handle a full season.
- The second version uses one native scroll container. CSS sticky positioning holds the time header and the aircraft column in place. This replaced code that kept several panes in line by hand.

**Drawing only what is on screen**

- The backend sorts flights by departure time. A binary search on that order finds only the flights in view.
- Row virtualisation draws only the visible rows. When zoomed in, it made scrolling worse and lost highlights, so we kept it only at the two most zoomed-out levels.
- We tried a virtualisation library and dropped it. A chart with items of different widths on a time axis suited a custom approach better.

**Fewer redraws**

- Each component subscribes only to the Zustand state it needs. Each flight block listens only to its own breaches.
- Scroll position lives in the store, and the scroll handler runs at most every 150 milliseconds.
- Each flight block redraws only when its position, width or flight changes.
- Lookup maps replace repeated searches, for example from aircraft to row.
- Zoom recalculates when the user releases the slider, and the view stays on the same date.

**Why not canvas?**

HTML elements gave us accessibility, tooltips and simple styling. Drawing only what is on screen kept the page small enough that canvas was not needed.

</details>

## Stack

React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix, Zustand, React Query, Vitest, React Testing Library, Node.js, PostgreSQL, S3 and GitHub Actions.
