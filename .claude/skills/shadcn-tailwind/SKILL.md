---
name: shadcn-tailwind
description: Conventions for styling React apps with Tailwind CSS and shadcn/ui — install/setup, design tokens, theming, and using/extending components. Use when adding UI components or styling in a Tailwind project.
---

# shadcn/ui + Tailwind

shadcn/ui is **not a dependency** — it copies component source into your repo (under `components/ui/`) so you own and edit it. Tailwind provides the utility layer; shadcn gives accessible, unstyled-by-default primitives built on Radix UI.

## Setup

Tailwind v4 with a Vite/Next React + TypeScript project:

```bash
npx shadcn@latest init      # sets up tailwind, cssVariables theme, lib/utils, components.json
npx shadcn@latest add button card dialog   # add only the components you use
```

Choose the **CSS-variables** color mode at init — it makes theming and dark mode trivial. The `cn()` helper (clsx + tailwind-merge) lives in `lib/utils.ts`; use it to compose conditional classes without duplicate-utility conflicts.

## Design tokens & theming

- Define the palette as HSL CSS variables in the global stylesheet (`--background`, `--foreground`, `--primary`, `--accent`, `--muted`, `--border`, `--radius`). Reference them via Tailwind's semantic classes (`bg-background`, `text-foreground`, `border-border`).
- Don't scatter raw hex values in markup — drive color, radius, and spacing from tokens so the whole site re-themes from one place. Derive these tokens from the [[frontend-design]] plan, not from defaults.
- Dark mode via the `.dark` class on `<html>`; define the dark token set under `.dark { … }`.
- Set custom fonts as CSS variables and wire them into `theme` so `font-display` / `font-sans` map to the chosen typefaces.

## Using components

- `add` components into the repo, then **edit them freely** — they're yours. Adjust variants in the component's `cva` config rather than overriding with `!important`.
- Use `cva` (class-variance-authority) for component variants (size, intent) instead of ad-hoc conditional strings.
- Prefer composing shadcn primitives (`Card`, `Dialog`, `Sheet`, `Tabs`) over rebuilding accessibility from scratch — they bring focus management, ARIA, and keyboard handling from Radix.
- Keep one-off layout in Tailwind utilities directly in JSX; promote to a component only when reused.

## Tailwind discipline

- Order/group utilities consistently (layout → spacing → typography → color → state). Use the Prettier Tailwind plugin to auto-sort.
- Use responsive (`md:`, `lg:`) and state (`hover:`, `focus-visible:`, `data-[state=open]:`) variants instead of custom CSS where possible.
- Reach for `@apply` sparingly — only for genuinely repeated utility clusters; otherwise make it a component.
- Always provide visible `focus-visible` styles and honor `motion-reduce:` variants.

Pairs with [[react]] for component architecture and [[frontend-design]] for the aesthetic direction.
