# Personal Portfolio

Hacker/terminal-style portfolio for Luis Juárez — Senior Mobile Engineer. Built with Next.js (App Router), TypeScript (strict) and Tailwind CSS. Fully static, deployed to GitHub Pages for free.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating your content (quick guide)

Everything you'd want to change lives in plain markdown files under `content/`. To update the live site:

1. **Add a skill / job / project** → create or edit a `.md` file in the matching folder:
   - New skill or skill group → `content/skills/`
   - New job → `content/experience/`
   - New project → `content/projects/`
2. **Change your name, bio, or social links** → edit `src/data/profile.ts`.
3. **Save, then commit and push:**
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
4. Done. GitHub Actions rebuilds and redeploys automatically (~1–2 min). Your changes appear on the live site — no code, no manual build.

> Tip: copy an existing file in the folder as a template and tweak the fields. The formats are shown below.

## Editing content

All dynamic content lives in markdown under `content/` and is read at build time — add or edit a file, push, and CI rebuilds the UI with it. No component changes needed.

| Source | What it controls |
| --- | --- |
| `content/skills/*.md` | Skill groups |
| `content/experience/*.md` | Work history entries (placeholders — replace with real ones) |
| `content/projects/*.md` | Project cards (placeholders — replace with real ones) |
| `src/data/profile.ts` | Name, role, bio, email, taglines (typewriter), social links |
| `src/data/navigation.ts` | Header anchor links |

### Skills — one file per group

```md
---
title: AI Engineering
order: 5
---

- Spec-driven development
- Claude Code
```

Each `- item` line becomes a skill tag; `order` sorts the groups.

### Experience — one file per job

```md
---
role: Senior Mobile Engineer
company: Company One
period: 2023 — Present
order: 1
stack:
  - React Native
  - TypeScript
---

Lead paragraph shown as the description.

- Each bullet becomes a highlight.
- Another highlight.
```

`order: 1` is shown first (use it to keep the most recent on top).

### Projects — one file per card

```md
---
name: Health Platform API
order: 1
href: https://github.com/user/repo # optional link
stack:
  - NestJS
  - Prisma
---

The body is the card description.
```

## Deployment (GitHub Pages)

CI/CD lives in `.github/workflows/deploy.yml`: every push to `main` lints, builds the static export (`out/`) and publishes it to GitHub Pages. One-time setup:

1. Create a **public** GitHub repository and push this project:
   ```bash
   git remote add origin git@github.com:<user>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push (or run the workflow manually from the Actions tab). The site publishes at `https://<user>.github.io/<repo>/`.

The workflow computes the `basePath` automatically: project repos get `/<repo-name>`, a `<user>.github.io` repo deploys at the domain root. No paid hosting required.

### Public vs. private repository

GitHub Pages is free from **public** repositories on the GitHub Free plan — this is the setup here.

Publishing Pages from a **private** repository requires a paid plan (**GitHub Pro**, Team, or Enterprise). Note that even with a private repo, the *published site* is still publicly accessible via its URL — only the source code stays private. Since this is a portfolio meant to be seen, a public repo on the free plan is the simplest, zero-cost option.

## Architecture

```
content/         # Markdown content, parsed at build time (gray-matter)
├── skills/
├── experience/
└── projects/
src/
├── types/       # Shared TypeScript interfaces (strict, no `any`)
├── data/        # Structural config (profile, navigation)
├── lib/         # Markdown loaders & utilities (markdown, skills, experience, projects, cn)
├── components/
│   ├── ui/      # Primitives & animations (Terminal, Typewriter, Reveal, ScrollProgress…)
│   ├── layout/  # Header, Footer
│   └── sections/# Hero, Experience, Projects, Skills, Contact
└── app/         # Next.js App Router entry (layout, page, globals)
```

`next.config.ts` uses `output: "export"`, so `npm run build` emits a plain static site in `out/` — deployable to any static host.

## Scripts

- `npm run dev` — development server
- `npm run build` — static export into `out/`
- `npm run lint` — ESLint
