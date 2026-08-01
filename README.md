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

Under active section-by-section build — see `BUILD_PLAN.md` for the full build order and `CLAUDE.md` for architecture/design tokens. Currently: Step 9 (footer) complete — copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`/`QUOTE_TO_EMAIL` for the quote and contact forms to actually send. Hero trust-stat numbers, Commercial page images, and phone/email/social links (`src/lib/contact-channels.ts`, shown on both the Contact page and footer) are all placeholders pending real business details (no image-gen tool available in this environment for the photos).

## Deployment

Not yet deployed. Planned target: Vercel.
