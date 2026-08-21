# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A marketing/landing site ("AI Solutions") built with Vite + React + TypeScript + Tailwind CSS + shadcn/ui. This project was scaffolded/is synced with [Lovable](https://lovable.dev) — note the `cdn.gpteng.co/gptengineer.js` script tag in [index.html](index.html); edits made via the Lovable web UI can land in this repo outside of normal git workflow.

## Commands

Package manager: `npm` (there is a `package-lock.json`, but `bun.lockb` and `yarn.lock` are also present in the repo — check with the user which one is authoritative before adding/upgrading dependencies).

- `npm run dev` — start the Vite dev server on port 8080
- `npm run build` — production build
- `npm run build:dev` — build in development mode (unminified, useful for debugging build output)
- `npm run preview` — preview a production build locally
- `npm run lint` — run ESLint over the whole repo

There is no test framework configured in this repo (no Jest/Vitest, no `*.test.*`/`*.spec.*` files).

## Architecture

**Routing is minimal but nav links exist for future pages.** [src/App.tsx](src/App.tsx) only registers two routes: `/` (→ `Index`) and a catch-all `*` (→ `NotFound`, localized via `t()`). [Navbar](src/components/layout/Navbar.tsx) and [Footer](src/components/layout/Footer.tsx) both already link to `/services`, `/projects`, `/blog`, `/contact` (via router `Link`, plus `#services`/`#contact` in-page anchors from the Hero CTAs), which don't exist as routes yet — they currently resolve to `NotFound`. Both navs render the same [src/config/navigation.ts](src/config/navigation.ts) `navLinks` array (single source of truth — don't hand-duplicate link lists again). The entire home experience lives on one page, [src/pages/Index.tsx](src/pages/Index.tsx), which just stacks section components: `Navbar → Hero → Services → Contact → Footer`.

**Provider stack** ([src/App.tsx](src/App.tsx)): `QueryClientProvider` (TanStack Query, client created but not yet wired to any real data fetching) → `LanguageProvider` → `TooltipProvider` → toasters (`Toaster` + Sonner `Toaster`) → `BrowserRouter`.

**i18n is a hand-rolled context, not a library.** [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx) exposes `useLanguage()` → `{ language, setLanguage, t }`; `language` defaults to `'es'` and is synced to `document.documentElement.lang` in an effect. `t(path)` does a dot-path lookup (e.g. `t('hero.cta1')`) into the nested object in [src/utils/translations.ts](src/utils/translations.ts), which holds parallel `es` and `en` trees — there's still no key-existence validation or fallback library, but the lookup itself is guarded (`hasOwnProperty` check per segment, typed-result check at the end) so any missing/mistyped key or non-string leaf safely falls back to returning the raw path string instead of throwing. `Services.tsx` is the one call site passing a dynamic key (`service.titleKey`) rather than a literal, so it's the one most likely to hit that fallback. When adding UI text, add the key to **both** language trees in translations.ts, keeping the two trees structurally identical. The context value/`t` closure are memoized (`useMemo`) off `language`, so it's safe to wrap consumers in `React.memo` if needed later.

**`src/components/ui/` is shadcn/ui, not hand-written.** These are generated via the shadcn CLI per [components.json](components.json) (style: default, baseColor: slate, path aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks`). Prefer `npx shadcn@latest add <component>` to bring in new primitives rather than hand-authoring them, and treat existing files in this folder as generated/replaceable rather than bespoke application code. Actual page/feature UI lives in `src/components/home/` and `src/components/layout/`.

**Theme colors: `primary`/`accent` are intentionally hardcoded hex, everything else follows the CSS vars.** [src/index.css](src/index.css) defines the standard shadcn CSS-variable palette (`--background`, `--secondary`, `--card`, `--popover`, `--destructive`, `--input`, `--ring`, `--sidebar-*`, etc., HSL triples, with a `.dark` override block), and [tailwind.config.ts](tailwind.config.ts)'s `theme.extend.colors` maps all of those through as `hsl(var(--x))` tokens (including `primary-foreground`/`accent-foreground`) — that mapping used to be incomplete (most non-primary/accent tokens were missing, which silently broke any shadcn component using `bg-secondary`, `bg-destructive`, `bg-popover`, etc.), so if a shadcn/ui class looks unstyled, check this block still has an entry for it before assuming the component is broken. `primary`/`accent` themselves stay literal hex (`#0F172A` / `#5c65c0`) by design, not CSS vars — that's the brand color, edited directly in tailwind.config.ts.

- Path alias: `@/*` → `./src/*` (configured in both [vite.config.ts](vite.config.ts) and `tsconfig*.json`).
- Styling: Tailwind CSS with `tailwindcss-animate`; utility class merging via `cn()` in [src/lib/utils.ts](src/lib/utils.ts) (`clsx` + `tailwind-merge`).
- Forms: [Contact](src/components/home/Contact.tsx) uses `react-hook-form` + `zod` (`@hookform/resolvers`) with the shadcn `Form`/`FormField` primitives — the pattern to follow for any other form. There's no backend: submitting builds a `mailto:` link (recipient in [src/config/contact.ts](src/config/contact.ts)) and navigates to it, so "sending" only stages an email in the visitor's own mail client — it does not deliver anything server-side. If a real backend/API is ever wired up, update the toast copy in translations.ts (`contact.success`/`successDetail`) to match, since it's currently worded for the mailto flow specifically.
