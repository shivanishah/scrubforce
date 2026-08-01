import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Sparkles,
  KeyRound,
  AppWindow,
  Bath,
  Building2,
  Landmark,
  Dumbbell,
  Car,
} from "lucide-react";

import { ServiceCard } from "@/components/services/ServiceCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services | ScrubForce",
  description:
    "Residential and commercial cleaning services covering all of metropolitan Adelaide.",
};

const RESIDENTIAL_SERVICES = [
  {
    icon: Home,
    title: "Regular House Cleaning",
    description: "Weekly, fortnightly, or monthly cleans that keep your home consistently spotless.",
    href: "/residential#regular-house-cleaning",
  },
  {
    icon: Sparkles,
    title: "Deep / Spring Clean",
    description: "A top-to-bottom reset for the areas everyday cleaning doesn't reach.",
    href: "/residential#deep-spring-clean",
  },
  {
    icon: KeyRound,
    title: "End of Lease Cleaning",
    description: "Bond-back standard cleaning, done systematically so nothing gets missed.",
    href: "/residential#end-of-lease-cleaning",
  },
  {
    icon: AppWindow,
    title: "Window & Glass Cleaning",
    description: "Streak-free interior and exterior glass, from sliding doors to shopfronts.",
    href: "/residential#window-glass-cleaning",
  },
  {
    icon: Bath,
    title: "Bathroom Cleaning",
    description: "Deep sanitisation of tiles, grout, showers and fixtures.",
    href: "/residential#bathroom-cleaning",
  },
];

const COMMERCIAL_SERVICES = [
  {
    icon: Building2,
    title: "Commercial Builders / Offices",
    description: "Post-construction and routine office cleans that keep workspaces presentable.",
    href: "/commercial#builders-offices",
  },
  {
    icon: Landmark,
    title: "Banks / Financial Institutions",
    description: "Discreet, high-standard cleaning for customer-facing financial premises.",
    href: "/commercial#banks-financial",
  },
  {
    icon: Dumbbell,
    title: "Gyms / Fitness Centres",
    description: "High-traffic sanitisation for equipment, mats, and change rooms.",
    href: "/commercial#gyms-fitness",
  },
  {
    icon: Car,
    title: "Auto / Car Dealerships",
    description: "Showroom-standard floors and glass that match the presentation of the stock.",
    href: "/commercial#auto-dealerships",
  },
];

export default function ServicesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary">
          {"// what we do"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Services
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          One independently operated crew, covering all of metropolitan
          Adelaide — no franchise territories, no subcontracting out. Every
          job below is handled the same systematic way.
        </p>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">
            Residential
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RESIDENTIAL_SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-semibold text-foreground">
            Commercial
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMERCIAL_SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground">
            Adelaide-owned and operated — every suburb, every job, direct
            accountability.
          </p>
          <Link href="/quote" className={cn(buttonVariants(), "shrink-0")}>
            Get Your Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
