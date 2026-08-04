# ScrubForce

ScrubForce is an independently operated cleaning service covering all of metropolitan Adelaide, South Australia — not a franchise.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- shadcn/ui (Base UI flavor)
- Framer Motion
- React Hook Form + Zod
- Resend (transactional email)

## Setup

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY and QUOTE_TO_EMAIL
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Without `RESEND_API_KEY`/`QUOTE_TO_EMAIL` set, the quote and contact forms still validate and submit, but the API routes return a friendly error instead of sending an email (and log the submission server-side).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages

Home, Services, Residential, Commercial, Why Us, Contact Us, Get Your Quote — plus a sitewide floating multi-channel chat widget and footer.

## Status

Initial build complete (`BUILD_PLAN.md` Steps 0–10). See `CLAUDE.md` for full architecture, design tokens, and component reference.

**Placeholder content that needs real data before launch** (all documented in `CLAUDE.md`):
- Hero trust stats (homes cleaned / satisfaction / suburbs covered)
- Phone, email, and WhatsApp/Messenger/Instagram/TikTok links (`src/lib/contact-channels.ts` — single source of truth for the Contact page, footer, and chat widget)
- Commercial page photos and the Contact page map embed (styled placeholders — no image-generation tool was available and no real photos/address were supplied)

Lighthouse (production build, all pages): Accessibility 100, Best Practices 100, SEO 100, Performance 92–97.

## Deployment

Not yet deployed. Planned target: Vercel.
