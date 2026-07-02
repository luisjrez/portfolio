---
slug: luxury-ai-notes
title: AI-Powered Contact Notes at Luxury Presence
company: Luxury Presence
role: Senior Software Engineer
period: 2026
stack:
  - React Native
  - React
  - NestJS
  - Federated GraphQL
  - Clean Architecture
  - Langfuse
  - AWS S3
metrics:
  - value: "70k+"
    label: notes migrated in prod
  - value: "147k+"
    label: notes created since
  - value: "2 weeks"
    label: phased rollout
---

## The problem

At Luxury Presence, contact notes lived as a flat collection with no real association to individual contacts, which made them impossible to build on. To unlock AI features on top of an agent's notes, the data first had to be isolated per contact — a change that required migrating 70,000+ production notes into a new `contact_notes` model without disrupting live usage.

## My role

I owned this feature end to end across the entire stack — mobile app, web CRM and backend — from planning through rollout. I authored the ARM (architecture/migration plan) describing every change: the production data migration, the move from a standalone microservice to the company's federated GraphQL server, and the new API surface.

## Key decisions

- **Planned the production migration up front.** I wrote a detailed ARM covering the schema change and the migration of 70k+ notes into the new `contact_notes` table, so the cutover was deliberate rather than reactive.
- **Migrated to the federated GraphQL server.** I moved the domain off a standalone microservice onto the federated graph used company-wide, building the NestJS resolvers plus the full GraphQL query and mutation layer.
- **Shipped progressively behind feature flags.** The rollout ran behind feature flags on a two-week target, de-risking the release and allowing a controlled ramp.
- **Versioned AI prompts with Langfuse.** Instead of hardcoding prompts, I managed them in Langfuse so they can be iterated and shipped without a backend deploy.
- **Spec-driven development with clean architecture.** I drove the implementation spec-first and kept the code in clean architecture, keeping the domain isolated from infrastructure.

## What we built

With notes now isolated per contact, the feature set opened up:

- **Rich note editing** in a TinyMCE editor, with the option to attach photos uploaded to an S3 bucket.
- **Voice notes** — the agent records audio, we transcribe it with AI and stream the result back into the editor in real time, so it can be reviewed and edited on the spot.
- **AI assistance** on any note — suggest a title, enhance the content, and fix errors.
- **AI on isolated data** — smart tasks and suggestions built on top of per-contact notes.

## Migrating the surfaces

Both clients were moved onto the new architecture, not just re-pointed:

- **CRM (web):** migrated to the federated graph server and rebuilt pixel-perfect to the new design.
- **Mobile app:** migrated to the federated graph server and rebuilt pixel-perfect to the new design.

## The result

The migration landed cleanly and the new architecture is now the foundation for AI on contact notes. Since launch, agents have created **147,650+ notes** on top of it — and because prompts are versioned in Langfuse, the AI features keep improving without backend redeploys.
