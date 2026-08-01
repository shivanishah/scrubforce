# ScrubForce Website — Claude Code Build Instructions

## Project Overview
Build a professional, "geeky" cleaning services website called **ScrubForce**.

- **Positioning:** Adelaide-based, independently operated — explicitly **not a franchise**. Covers all of metropolitan Adelaide, South Australia.
- **Background color:** `#eee6d2` (warm cream)
- **Vibe:** Professional + technical/geeky (clean grid layouts, monospace accent labels, numbered/systematic sections, subtle micro-interactions — reads like a sharp, detail-oriented operation, not a "cute cleaning company")
- **Header tabs:** Home, Services, Residential, Commercial, Get Your Quote, Why Us, Contact Us

## Reference Sites (for structure/tone inspiration only — do not copy text or code)
- **selectcleaningrd.com** — overall layout patterns for services, suburb coverage list, "how it works" process, guarantee section, FAQ. Use as the primary structural reference for Services, Residential, and Why Us.
- **quote.jccommercial.com.au** — the animated multi-step quiz-style quote flow (business type icon picker → size slider → frequency → timing → animated calculation reveal → estimate). This is the pattern for the **Phase 2 AI quote flow** (see Step 6 below).

## Tech Stack
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion (subtle animations only, respect `prefers-reduced-motion`)
- React Hook Form + Zod (for the quote/contact forms)
- Fonts: Manrope or Inter (body/headings) + JetBrains Mono or Space Mono (accent/labels)

## Ground Rules for Claude Code

1. **Work section by section.** Do not build the whole site in one shot.
2. **After every section:** run the dev build, verify it compiles with no errors, visually sanity-check the section (via a screenshot or component render check), fix any issues, and only then commit.
3. **Never commit broken code.** If a build/test fails, fix it before committing — do not skip ahead.
4. **Commit messages** should be clear and scoped, e.g. `feat: add header navigation with sticky scroll behavior`.
5. **Update `CLAUDE.md` and `README.md` continuously** — not just at the end. Each should reflect the current state of the project after every commit.
6. **Ask before making design decisions not specified below** (e.g. exact icon set, stock imagery source) rather than guessing silently.

## Step-by-Step Build Order

### Step 0 — Project Setup
- Scaffold Next.js + TypeScript + Tailwind project
- Install and configure shadcn/ui
- Set up fonts (Manrope/Inter + JetBrains Mono)
- Set Tailwind theme: background `#eee6d2`, a complementary dark accent (charcoal/near-black) for text/nav, and one "signal" accent color for CTAs
- Create `CLAUDE.md` with: project purpose, tech stack, design tokens (colors/fonts), folder structure conventions, and the section build order below
- Create `README.md` with: project description, setup instructions, scripts (`dev`, `build`, `lint`)
- Verify project runs (`npm run dev`), then commit: `chore: initial project scaffold`

### Step 1 — Layout Shell + Header/Nav
- Build the sticky header with tabs: Home, Services, Residential, Commercial, Get Your Quote, Why Us, Contact Us
- Mobile responsive nav (hamburger menu)
- "Get Your Quote" styled as a distinct CTA button, not a plain tab
- Build empty page routes for each section so nav links resolve
- Test: build passes, all nav links route correctly, mobile menu opens/closes
- Update CLAUDE.md/README.md with header component notes
- Commit: `feat: add responsive header and navigation`

### Step 2 — Home / Hero Section
- Hero headline + subheadline emphasizing **Adelaide-based, no franchises, covering all of Adelaide**
- Primary CTA ("Get Your Quote"), secondary CTA ("View Services")
- Subtle geeky visual touch (e.g. grid background pattern, monospace tagline like `// spotless. systematic. scrubforce.`)
- Trust stat row (e.g. homes/offices cleaned, satisfaction rate, suburbs covered) — placeholder numbers, ask user for real figures later
- Test: renders correctly at mobile/tablet/desktop breakpoints
- Update docs
- Commit: `feat: add hero section to home page`

### Step 3 — Services Overview Section
- Grid/card layout of core services with icons, split conceptually into Residential and Commercial groups
- Each card links to more detail (anchors to Residential/Commercial pages)
- Reinforce "all of Adelaide, no franchise" positioning somewhere in this section
- Test: build + responsive check
- Update docs
- Commit: `feat: add services overview section`

### Step 4 — Residential Page
Build out these five specific services, each with its own card/section (icon, short description, CTA to quote):
1. **Regular House Cleaning**
2. **Deep / Spring Clean**
3. **End of Lease Cleaning**
4. **Window & Glass Cleaning**
5. **Bathroom Cleaning**

Structure this page similarly to selectcleaningrd.com's residential sections: service cards up top, then a "what's included" checklist-style breakdown, then trust/guarantee reinforcement.
- Test + update docs
- Commit: `feat: add residential services page`

### Step 5 — Commercial Page
Build out these four target sectors, each with its own card/section (icon, short description, CTA to quote):
1. **Commercial Builders / Offices**
2. **Banks / Financial Institutions**
3. **Gyms / Fitness Centres**
4. **Auto / Car Dealerships**

For structure, follow selectcleaningrd.com's pattern (service cards → process → trust signals) but adapt content to these four sectors instead of residential end-of-lease framing. Include a general trust-signals block (insured, trained staff, consistent scheduling, dedicated contact — not a call centre).
- Test + update docs
- Commit: `feat: add commercial services page`

### Step 6 — Get Your Quote Section (Two Phases)

**Phase 1 (build now): Standard form**
- Multi-field form: name, email, phone, suburb/postcode, property type (residential/commercial), specific service needed (pull from the Residential/Commercial lists above), frequency (one-off/weekly/fortnightly/monthly), message
- React Hook Form + Zod validation
- Submit handler — ask the user whether this should go to an email service (e.g. Resend) or a database, if not yet decided
- Success/error states
- Test: form validation works, submission handled gracefully, accessible labels/errors
- Update docs
- Commit: `feat: add quote request form with validation`

**Phase 2 (build as a placeholder now, real logic later): AI Quote — Coming Soon**
- Add a visible banner/badge near the quote form: *"AI-powered instant quotes — coming soon"*
- Scaffold (but don't fully wire up) a multi-step quiz-style flow inspired by quote.jccommercial.com.au's pattern: step indicator → property/service type icon picker → size or scope slider → frequency picker → timing preference → animated "calculating" transition → estimate reveal screen
- Keep this component isolated (e.g. `components/quote/AIQuoteFlow.tsx`) and feature-flagged off / hidden behind the "coming soon" state so it doesn't replace the working Phase 1 form yet
- Test: Phase 1 form still fully functional; Phase 2 UI shell renders but is clearly marked not-yet-active
- Update docs (note in CLAUDE.md that Phase 2 is scaffolded but not wired to real pricing logic)
- Commit: `feat: add quote form (phase 1) and AI quote flow scaffold (phase 2, coming soon)`

### Step 7 — Why Us Section
Structure this after selectcleaningrd.com's trust-building sections:
- Guarantee statement (e.g. re-clean guarantee / satisfaction guarantee)
- Trust badge row: fully insured, trained & inducted staff, background-checked, eco-friendly products
- Numbered "how it works" process (Get Your Quote → We Clean → Enjoy Your Space), styled with the geeky monospace numbering (`01 —`, `02 —`, `03 —`)
- Reinforce local/independent positioning: Adelaide-owned, no franchise, direct accountability
- Test + update docs
- Commit: `feat: add why us section`

### Step 8 — Contact Us Page
Include:
- Phone number, email address
- Business hours: **Monday–Sunday, 8:00 AM – 8:00 PM**
- Direct links/icons for WhatsApp, Facebook Messenger, Instagram, and TikTok chat
- A floating chat widget (bottom-right bubble) that expands to show the multiple contact channels above as quick options — similar in concept to the live-chat pattern used on whitespotgroup.com.au. Build this as a self-contained component (e.g. `components/ContactWidget.tsx`) so channel links can be swapped for a real chat provider (Tawk.to, Crisp, Intercom, etc.) later if the user wants one
- Optional: contact form (can reuse quote form components) + map embed of Adelaide service area
- Test + update docs
- Commit: `feat: add contact us page with multi-channel chat widget`

### Step 9 — Footer
- Nav links repeated, social links (WhatsApp/Facebook/Instagram/TikTok), Adelaide service area note, copyright
- Test + update docs
- Commit: `feat: add footer`

### Step 10 — Polish Pass
- Add Framer Motion scroll-reveal animations (subtle — fade/slide only, respect `prefers-reduced-motion`)
- Run full accessibility check (color contrast against `#eee6d2`, alt text, focus states, chat widget keyboard accessibility)
- Run Lighthouse/perf check
- Final full-site test across breakpoints
- Final update to CLAUDE.md and README.md summarizing full architecture
- Commit: `chore: final polish, accessibility, and performance pass`

## What CLAUDE.md Should Contain (keep updated throughout)
- Project summary and brand voice ("professional and geeky", Adelaide-based, no franchise)
- Full tech stack and why
- Design tokens: colors (`#eee6d2` background + accents), fonts, spacing scale
- Component/folder structure
- Build/test/commit workflow (this document, essentially)
- Full list of Residential services (5) and Commercial sectors (4) so future edits stay consistent
- Status of the two-phase quote system (Phase 1 live, Phase 2 scaffolded/coming soon) and what's needed to activate Phase 2
- Any decisions made along the way (e.g. form backend choice, chat provider choice)

## What README.md Should Contain
- What ScrubForce is (one-line project description: Adelaide-based, independent, all-metro-Adelaide cleaning service)
- Tech stack list
- Setup instructions (`npm install`, `npm run dev`)
- Available scripts
- Deployment notes (e.g. Vercel)
