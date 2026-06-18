# Mahdi Kchaou — Personal Site

Personal portfolio for **Mahdi Kchaou**, Revenue Operations & Data practitioner.
One coherent story: turning messy CRM and pipeline data into a single source of truth.

**Live:** https://mahdi-kchaou-portfolio.vercel.app

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** (design tokens in `src/index.css`)
- **Motion** (framer-motion) for the reconciliation signature + reveals
- **Fraunces / IBM Plex Sans / IBM Plex Mono** type system
- Deployed on **Vercel**

## Design notes

- The hero "signature" (`ReconciliationFigure`) enacts the value prop: three
  conflicting CRM records reconcile into one verified golden record.
- All content lives in `src/data/profile.ts` — a single source of truth.
- The two recommendation letters are real signed PDFs in `public/letters/`,
  surfaced via an accessible in-page viewer (`LetterDialog`).
- Accessibility: keyboard focus, focus-trapped modal, `prefers-reduced-motion`
  respected throughout.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build
```

Requires Node 22 (`engines.node: 22.x`).

## Visual checks

`scripts/shoot.mjs` and `scripts/sections.mjs` use Playwright (Chrome channel)
to screenshot the site for design review.
