# ScrubForce

ScrubForce is an independently operated cleaning service covering all of metropolitan Adelaide, South Australia — not a franchise.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- React Hook Form + Zod

## Setup

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Status

Under active section-by-section build — see `BUILD_PLAN.md` for the full build order and `CLAUDE.md` for architecture/design tokens. Currently: Step 6 Phase 1 (quote request form, emailing via Resend) complete — copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`/`QUOTE_TO_EMAIL` for the form to actually send. Hero trust-stat numbers are placeholders pending real figures; Commercial page images are styled placeholders pending real photos (no image-gen tool available in this environment).

## Deployment

Not yet deployed. Planned target: Vercel.
