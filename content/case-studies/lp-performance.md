---
slug: lp-performance
title: Cutting a Critical Screen's Load from 20s to 3s
company: Luxury Presence
role: Senior Software Engineer
period: 2024
stack:
  - React Native
  - Profiling
  - Performance
  - Lazy Loading
  - Pagination
metrics:
  - value: "20s → 3s"
    label: time to interactive
  - value: "~85%"
    label: faster to usable
  - value: "6+"
    label: tabs optimized
---

## The problem

The most important screen in the app took roughly 20 seconds to become interactive. It packed 6+ tabs, each with its own infinite-scrolling list, and rendered them all up front — so the main thread was flooded with work, JS frames dropped, and agents were left waiting on a screen they used constantly.

## My role

I owned the investigation and the fix. Rather than guessing, I ran a full research effort — evaluating tooling, profiling the screen, and building small POCs — until the real bottlenecks were clear, then optimized the screen and its components down to a ~3-second time to interactive.

## How I found the bottlenecks

- **Profiling first, not assumptions.** I researched and trialed profiling and debugging tools, then measured the screen under real conditions to see where time and frames were actually going.
- **POCs to validate each hypothesis.** For each suspected cause I built a small proof of concept, so every optimization was backed by a measured before/after rather than a hunch.

## What I changed

- **Tamed the heavy components.** I identified the most expensive components on the screen and reworked them so they no longer blocked the main thread on mount.
- **Split and paginated every query.** The screen fired large, monolithic queries; I broke them up and paginated them so data arrived incrementally instead of all at once.
- **Lazy-loaded the tabs.** With 6+ tabs of infinite lists, I made only the active tab render and lazy-loaded the rest — so the screen no longer paid for content the user wasn't looking at.

## The result

Time to interactive dropped from ~20 seconds to ~3 — a roughly 85% improvement — and the JS frame drops that made the screen feel sluggish were largely gone. The screen the agents rely on most became fast and fluid, and the profiling-and-POC approach became a repeatable playbook for performance work.
