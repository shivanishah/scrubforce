import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Sparkles,
  KeyRound,
  AppWindow,
  Bath,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Leaf,
  BadgeCheck,
} from "lucide-react";

import { DetailServiceCard } from "@/components/services/DetailServiceCard";
import { TrustBadges } from "@/components/services/TrustBadges";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Residential Cleaning | ScrubForce",
  description:
    "Regular house cleaning, deep cleans, end of lease, window & glass, and bathroom cleaning across all of metropolitan Adelaide.",
};

const RESIDENTIAL_SERVICES = [
  {
    id: "regular-house-cleaning",
    icon: Home,
    title: "Regular House Cleaning",
    description:
      "Weekly, fortnightly, or monthly visits from the same crew, so your home stays consistently spotless without you having to think about it.",
  },
  {
    id: "deep-spring-clean",
    icon: Sparkles,
    title: "Deep / Spring Clean",
    description:
      "A systematic, top-to-bottom reset — skirting boards, behind appliances, inside cupboards — for the spots everyday cleaning skips.",
  },
  {
    id: "end-of-lease-cleaning",
    icon: KeyRound,
    title: "End of Lease Cleaning",
    description:
      "Bond-back standard cleaning against a full checklist, timed to your inspection so nothing gets missed.",
  },
  {
    id: "window-glass-cleaning",
    icon: AppWindow,
    title: "Window & Glass Cleaning",
    description:
      "Streak-free interior and exterior glass, tracks, and sliding doors — done safely at any height.",
  },
  {
    id: "bathroom-cleaning",
    icon: Bath,
    title: "Bathroom Cleaning",
    description:
      "Deep sanitisation of tiles, grout, showers, and fixtures, targeting soap scum and mould buildup.",
  },
];

const WHATS_INCLUDED = [
  "Kitchen wiped down — benchtops, stovetop, external cabinets, sink",
  "Bathrooms scrubbed — tiles, showers, sinks, toilets, mirrors",
  "All floors vacuumed and mopped",
  "Dusting throughout — surfaces, skirting boards, light fittings",
  "Bins emptied and rubbish taken out",
  "Glass surfaces and mirrors cleaned",
  "Bedrooms and living areas tidied and dusted",
  "Final walkthrough before we leave",
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: UserCheck, label: "Trained & Inducted Staff" },
  { icon: Leaf, label: "Eco-Friendly Products" },
  { icon: BadgeCheck, label: "Satisfaction Guarantee" },
];

export default function ResidentialPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary">
          {"// for your home"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Residential Cleaning
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Five services, one systematic standard — delivered by an
          independently operated Adelaide crew covering every metro suburb,
          not a franchise territory.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESIDENTIAL_SERVICES.map((service) => (
            <DetailServiceCard key={service.id} {...service} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">
            What&apos;s Included
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Every regular and deep clean covers this baseline checklist —
            no surprises, no upsells for the basics.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {WHATS_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">
            Our Guarantee
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Not happy with a spot we cleaned? Tell us within 24 hours and
            we&apos;ll come back and re-clean it, free of charge.
          </p>
          <div className="mt-6">
            <TrustBadges items={TRUST_ITEMS} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground">
            Ready for a spotless home? Get a quote in minutes.
          </p>
          <Link href="/quote" className={cn(buttonVariants(), "shrink-0")}>
            Get Your Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
