---
name: react
description: Patterns and conventions for building React applications well — component structure, hooks, state management, data fetching, and performance. Use when writing or refactoring React code, especially for a Vite/Next.js single-page or static site.
---

# React

Write modern React (18+) with function components and hooks only. No class components. Favor small, composable components with clear single responsibilities over large multi-purpose ones.

## Project setup

Default to **Vite + React + TypeScript** for a SPA/portfolio site unless the brief needs SSR/SSG, in which case use **Next.js (App Router)**. Use a strict `tsconfig`. Keep the source layout flat and obvious:

```
src/
  components/   reusable presentational + small logic components
  sections/     page-level composition blocks (Hero, About, Projects…)
  hooks/        custom hooks (useX)
  lib/          pure helpers, no JSX
  styles/       global css / tailwind entry
  App.tsx, main.tsx
```

## Components

- One component per file, named the same as the file (`Hero.tsx` exports `Hero`).
- Type props with an explicit `interface` / `type`; destructure props in the signature.
- Prefer composition (`children`, slots) over boolean prop explosions.
- Keep components pure: no side effects during render. Derive values inline instead of mirroring props into state.
- Lift state only as high as needed; colocate state with the component that uses it.

## Hooks

- `useState` for local UI state; `useReducer` when transitions get complex.
- `useEffect` is for synchronizing with external systems (DOM, subscriptions, network), not for deriving data — compute derived values during render or with `useMemo`.
- Always specify dependency arrays correctly; don't disable the lint rule to silence it — fix the dependency instead.
- Extract reusable stateful logic into custom hooks prefixed with `use`.
- `useMemo`/`useCallback` only when there's a measured cost or referential-equality requirement; don't wrap everything by default.

## State & data

- For a portfolio/marketing site, keep state local — avoid Redux/global stores unless there's genuine cross-cutting state.
- For server data, use TanStack Query rather than hand-rolled `useEffect` fetching.
- Keep content (project list, bio, links) in typed data modules under `lib/` so the UI maps over data instead of hardcoding markup.

## Performance & quality

- Lazy-load heavy/below-the-fold sections with `React.lazy` + `Suspense`.
- Provide stable `key`s from data ids, never array index for dynamic lists.
- Respect `prefers-reduced-motion`; ensure keyboard focus is visible and interactive elements are real `<button>`/`<a>`.
- Use semantic HTML; one `<h1>` per page, meaningful landmarks.
- Run `tsc --noEmit` and lint before declaring done.

Pairs with [[shadcn-tailwind]] for styling and [[frontend-design]] for visual direction.
