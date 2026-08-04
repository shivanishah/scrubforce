# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

ScrubForce is a marketing website for a professional, "geeky" cleaning services business.

- **Positioning:** Adelaide-based, independently operated — explicitly **not a franchise**. Covers all of metropolitan Adelaide, South Australia.
- **Brand voice:** Professional + technical/geeky. Clean grid layouts, monospace accent labels, numbered/systematic section headers (`01 —`, `02 —`), subtle micro-interactions. Reads like a sharp, detail-oriented operation, not a "cute cleaning company."
- `BUILD_PLAN.md` has the original step-by-step build order (Steps 0–10, all complete) — keep it around as build history/reference, but this file is the source of truth for current architecture.

## Commands

```bash
npm run dev      # start dev server (Turbopack) at localhost:3000
npm run build    # production build — run before every commit
npm run start    # serve the production build (needed for realistic Lighthouse numbers)
npm run lint     # ESLint (flat config, eslint.config.mjs)
npx tsc --noEmit # typecheck only
```

No test runner is configured yet.

## Tech Stack

- **Next.js 16 (App Router) + TypeScript** — `src/app` directory, one route per top-level nav tab
- **Tailwind CSS v4** — CSS-first config (no `tailwind.config.js`); all theme tokens live in `src/app/globals.css` under `@theme inline` and `:root`. New design tokens go there as CSS variables, never in a JS config file.
- **shadcn/ui** (`style: base-nova`, `baseColor: neutral`) — components generated into `src/components/ui`, installed via `npx shadcn@latest add <component>`. This project uses shadcn's **Base UI** flavor (`@base-ui/react`), not Radix:
  - Components take a `render={<Element />}` prop for polymorphism, not `asChild`.
  - To style a `Link`/anchor as a button, apply `buttonVariants({...})` to its `className` directly — but always wrap it in `cn(buttonVariants({...}))`, never pass the raw string. `buttonVariants` (cva) does plain string concatenation, not tailwind-merge, so the base class's `border-transparent` and the `outline` variant's `border-border` both land in the class list; without `cn()`'s twMerge pass, CSS cascade order (not class order) silently decides the winner and can drop a visible border.
  - Base UI's `Select` (used via RHF `Controller`) must be given a defined initial value (`""`, not `undefined`) in `defaultValues` — otherwise it logs an uncontrolled→controlled warning on first selection. An empty string still shows the placeholder correctly (Base UI checks the stringified value, not just `!= null`).
- **Framer Motion** — scroll-reveal only for content genuinely below the fold (see "Scroll-reveal" below); must respect `prefers-reduced-motion`.
- **React Hook Form + Zod** — quote form and contact form, with matching Zod schemas shared between client and server (`src/lib/quote-schema.ts`, `src/lib/contact-schema.ts`).
- **Resend** — transactional email for both forms (see "Forms & email" below).
- **Fonts:** Manrope (body/headings, `--font-manrope`) + Space Mono (accent/labels/mono numerals, `--font-space-mono`), loaded via `next/font/google` in `src/app/layout.tsx`.

## Design Tokens

Defined as CSS custom properties in `src/app/globals.css` (`:root`), consumed via Tailwind's `@theme inline` mapping (`bg-background`, `text-foreground`, `bg-primary`, etc.):

| Token | Value | Use |
|---|---|---|
| `--background` | `#eee6d2` | Warm cream page background |
| `--foreground` | `#1f1b16` | Charcoal body/heading text |
| `--card` / `--popover` | `#f6f0e0` | Slightly lighter cream for raised surfaces |
| `--primary` | `#d97706` | Amber "signal" accent — CTA button backgrounds, badges |
| `--primary-foreground` | `#1f1b16` | Charcoal text on amber buttons (5.4:1, passes AA) — don't swap for white (~3.2:1, fails) |
| `--primary-text` | `#a3480a` | **Darker amber for standalone text on the cream background** (taglines, "01 —" numbers, stat values, "Learn more" links) — `#d97706` only hits 2.6:1 as text-on-cream (fails AA); this hits 4.8:1. Icons paired with a visible `text-foreground` label still use plain `text-primary`/`bg-primary` — the adjacent compliant text label covers the info, so the lower-contrast icon accent is an accepted tradeoff, not a bug. |
| `--secondary` | `#ded2b3` | Muted tan for secondary buttons |
| `--muted` / `--muted-foreground` | `#e2d8c0` / `#6b6255` | De-emphasized text/surfaces (4.8:1 on background) |
| `--accent` | `#e6dcc3` | Subtle hover/active backgrounds |
| `--destructive` | `#b91c1c` | Form error text/borders — darkened from shadcn's default `#dc2626` (3.9:1, fails AA) to hit 5.2:1 |
| `--border` / `--input` | `#d8cbac` | Dividers, input borders |
| `--ring` | `#a3480a` | Focus ring color — same darker amber as `--primary-text`. All `focus-visible:ring-ring/50` classes were changed to full-opacity `focus-visible:ring-ring`; at 50% opacity even the darkest reasonable amber blends to ~2:1 against the cream background (fails the 3:1 non-text contrast minimum for focus indicators) |
| `--radius` | `0.375rem` | Sharper corners than shadcn's default `0.625rem`, for a more systematic/grid feel |

Dark mode (`.dark` block) is generated by shadcn defaults but **unused** — this brand is cream-only, no dark mode toggle is planned.

## Folder Structure

```
src/
  app/
    layout.tsx          Fonts, <html>/<body> shell, renders Header/Footer/ContactWidget globally
    page.tsx             Home (renders Hero)
    services/page.tsx    Services overview
    residential/page.tsx Residential detail page
    commercial/page.tsx  Commercial detail page
    why-us/page.tsx
    contact/page.tsx
    quote/page.tsx
    api/quote/route.ts   Quote form submit handler
    api/contact/route.ts Contact form submit handler
  components/
    Header.tsx, Footer.tsx, ContactWidget.tsx   Global chrome
    ui/                  shadcn-generated primitives — prefer `npx shadcn add` over hand-editing
    home/Hero.tsx
    services/            ServiceCard, DetailServiceCard, TrustBadges, ProcessSteps, PlaceholderImage
    quote/                QuoteForm, AIQuoteFlow
    contact/ContactForm.tsx
    motion/Reveal.tsx     Shared scroll-reveal wrapper
  lib/
    utils.ts              shadcn's cn() helper
    nav-links.ts           NAV_LINKS/QUOTE_LINK — shared by Header and Footer
    contact-channels.ts    CONTACT_CHANNELS/CONTACT_INFO — shared by Contact page, Footer, ContactWidget
    quote-schema.ts, contact-schema.ts   Zod schemas shared by client forms and API routes
```

### Shared components worth knowing about

- **`ServiceCard`** (`services/ServiceCard.tsx`) — small icon/title/description/"Learn more" card, used on the Services overview page. Links to an anchor on the matching Residential/Commercial detail page (e.g. `/residential#regular-house-cleaning`).
- **`DetailServiceCard`** (`services/DetailServiceCard.tsx`) — larger card used on Residential/Commercial: icon, `id` (anchor target, `scroll-mt-20` to clear the sticky header), `<h2>` title (no `<h2>` precedes these cards on either page, so they're the first heading level after `<h1>` — do not change back to `<h3>`, that skips a level and fails the Lighthouse heading-order audit), description, "Get a Quote" CTA. Optional `imageLabel` prop renders a `PlaceholderImage` above the icon (only Commercial's cards use this).
- **`TrustBadges`** (`services/TrustBadges.tsx`) — reusable `{icon, label}[]` badge grid (2 cols mobile / 4 cols desktop); each page supplies its own badge content.
- **`ProcessSteps`** (`services/ProcessSteps.tsx`) — reusable `{number, title, description}[]` numbered list, styled with the geeky monospace `01 —` numbering. Used by Commercial's "How It Works" and Why Us's "How It Works".
- **`PlaceholderImage`** (`services/PlaceholderImage.tsx`) — dashed-border, grid-patterned placeholder used everywhere a real photo will eventually go. No image-generation tool is available in this environment and no real photos have been supplied — decided with the user to use these instead of hotlinked stock photos. Takes a `label` describing what the real photo should show. **When real photos are ready, replace every usage with an actual `<Image>`** — check `src/app/commercial/page.tsx` (1 hero banner + 4 card images) and `src/app/contact/page.tsx` (1 map placeholder).
- **`Reveal`** (`motion/Reveal.tsx`) — fade/slide-up scroll reveal (`whileInView`, `once: true`), no-ops via `useReducedMotion()` when the user prefers reduced motion. **Only wrap content that's genuinely below the fold.** Wrapping above-the-fold content (a page's hero/intro block right after `<h1>`) measurably hurts Lighthouse LCP, because the element paints at `opacity: 0` first and only becomes visible after React hydrates and Framer Motion runs — that later repaint is what gets measured as "largest contentful paint". This is why `Hero.tsx` and the top blocks of `/quote` and `/contact` are **not** wrapped in `Reveal` (removed after measuring a 4.0s → 2.7s LCP improvement on Home and 3.6s → ~1.0s-equivalent-class improvement on Contact), while lower sections on `/services`, `/residential`, `/commercial`, and `/why-us` are.

## Forms & Email

Both forms follow the same pattern: RHF + Zod on the client, the same Zod schema re-validated server-side in a Next.js Route Handler, then a Resend email send.

- **Quote form** (`/quote`, `QuoteForm.tsx` → `POST /api/quote`) — name, email, phone, suburb/postcode, property type, service (options depend on property type — Residential's 5 vs Commercial's 4), frequency, optional message.
- **Contact form** (`/contact`, `ContactForm.tsx` → `POST /api/contact`) — name, email, message.
- Both routes require `RESEND_API_KEY` and `QUOTE_TO_EMAIL` env vars (see `.env.example`); `QUOTE_FROM_EMAIL` is optional (defaults to Resend's shared testing address `onboarding@resend.dev`). Without the required vars, the route returns a 500 with a clear message and logs the submission server-side instead of losing it.
- **Real secrets go in `.env.local` (gitignored, never committed).** `.env.example` must stay blank placeholders — it *is* committed as the template for other developers. This came up because real Resend API key/email values were pasted into `.env.example` twice during the build; both times they were moved to `.env.local` and the example file reset to blanks.

## AI Quote Flow (Phase 2 — scaffolded, not wired)

`src/components/quote/AIQuoteFlow.tsx`, rendered next to `QuoteForm` on `/quote`. Renders an inert step-indicator + property-type-picker preview (`pointer-events-none`, `tabIndex={-1}` on all controls), dimmed behind a "coming soon" badge overlay. No pricing logic, no step transitions — purely a visual shell per the original build plan, kept isolated so it can be built out later without touching the working Phase 1 form.

## Placeholder Content (needs real data before launch)

- **Hero trust stats** (`Hero.tsx`): 500+ homes/offices cleaned, 98% satisfaction, 20+ suburbs — placeholder numbers.
- **Contact details** (`lib/contact-channels.ts`): phone `(08) XXXX XXXX`, email `hello@scrubforce.com.au`, and all four social channel `href`s (WhatsApp/Messenger/Instagram/TikTok) are `"#"`. This one file is the single source of truth for the Contact page, Footer, and `ContactWidget` — update it once to go live everywhere.
- **Photos**: every `PlaceholderImage` usage (see above).
- **Map embed** (`/contact`): currently a `PlaceholderImage` — needs a real business address before a Google Maps embed is worth adding.

## Content Reference

**Residential services (5):** Regular House Cleaning, Deep/Spring Clean, End of Lease Cleaning, Window & Glass Cleaning, Bathroom Cleaning

**Commercial sectors (4):** Commercial Builders/Offices, Banks/Financial Institutions, Gyms/Fitness Centres, Auto/Car Dealerships

**Business hours:** Monday–Sunday, 8:00 AM–8:00 PM

## Accessibility & Performance Notes

Lighthouse (production build, all 7 pages): Accessibility 100, Best Practices 100, SEO 100, Performance 92–97. Fixed during the polish pass:

- Amber-on-cream text contrast (`--primary-text` token — see Design Tokens)
- Destructive/error color contrast (`--destructive` darkened)
- Focus ring contrast (`--ring` darkened + opacity modifier removed — see Design Tokens)
- Heading order on Residential/Commercial (`DetailServiceCard` title is `<h2>`, not `<h3>` — no `<h2>` precedes it on either page)
- `ContactWidget` keyboard access: the panel is rendered *after* the trigger button in DOM order (with `flex-col-reverse` to keep the panel visually above the button) so Tab moves from button → panel items in the right order; opening the panel moves focus to the first link, and Escape closes it and returns focus to the button.
- LCP: don't wrap above-the-fold content in `Reveal` (see the `Reveal` note above).

## Git Workflow

Every commit in this repo's history follows: implement → `npm run build && npm run lint` clean → visually verify at mobile/tablet/desktop → update this file + `README.md` → commit → ask before pushing to `origin/main` (pushed on request, not automatically). Keep following that pattern for future work in this repo.

## Decisions Made

- Font pairing: **Manrope + Space Mono** (chosen over Inter/JetBrains Mono alternatives)
- CTA accent color: **amber `#d97706`**, button text charcoal not white (for AA contrast); a separate darker amber `--primary-text`/`--ring` (`#a3480a`) is used for standalone text and focus rings
- Corner radius tightened to `0.375rem` for a sharper, more systematic feel
- Quote/contact form backend: **Resend** (chosen over a database) — simpler for this volume, no DB to manage
- Images: **styled placeholder blocks**, not hotlinked stock photos — no image-gen tool available in this environment and no real photos supplied yet
