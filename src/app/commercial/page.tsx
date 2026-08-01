import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Landmark,
  Dumbbell,
  Car,
  ShieldCheck,
  UserCheck,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";

import { DetailServiceCard } from "@/components/services/DetailServiceCard";
import { PlaceholderImage } from "@/components/services/PlaceholderImage";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { TrustBadges } from "@/components/services/TrustBadges";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Commercial Cleaning | ScrubForce",
  description:
    "Commercial cleaning for offices, banks, gyms, and car dealerships across all of metropolitan Adelaide.",
};

const COMMERCIAL_SERVICES = [
  {
    id: "builders-offices",
    icon: Building2,
    title: "Commercial Builders / Offices",
    description:
      "Post-construction cleans and routine office servicing that keep workspaces client-ready.",
    imageLabel: "Photo: office / post-construction clean",
  },
  {
    id: "banks-financial",
    icon: Landmark,
    title: "Banks / Financial Institutions",
    description:
      "Discreet, high-standard cleaning for customer-facing financial premises, scheduled around trading hours.",
    imageLabel: "Photo: bank / financial branch",
  },
  {
    id: "gyms-fitness",
    icon: Dumbbell,
    title: "Gyms / Fitness Centres",
    description:
      "High-traffic sanitisation for equipment, mats, and change rooms, built around your class timetable.",
    imageLabel: "Photo: gym / fitness centre",
  },
  {
    id: "auto-dealerships",
    icon: Car,
    title: "Auto / Car Dealerships",
    description:
      "Showroom-standard floors and glass that match the presentation of the stock on your lot.",
    imageLabel: "Photo: car dealership showroom",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Get Your Quote",
    description: "Tell us about your site, hours, and scope — we'll scope a plan around it.",
  },
  {
    number: "02",
    title: "We Schedule Around You",
    description: "A consistent day and time, arranged with your dedicated contact.",
  },
  {
    number: "03",
    title: "We Clean to Spec",
    description: "The same checklist-driven standard, every visit, from the same crew.",
  },
  {
    number: "04",
    title: "Ongoing Quality Checks",
    description: "Your dedicated contact follows up to keep the standard consistent.",
  },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: UserCheck, label: "Trained Staff" },
  { icon: CalendarCheck, label: "Consistent Scheduling" },
  { icon: PhoneCall, label: "Dedicated Contact — Not a Call Centre" },
];

export default function CommercialPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary">
          {"// for your business"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Commercial Cleaning
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Four sectors, one systematic standard — delivered by an
          independently operated Adelaide crew covering every metro suburb,
          not a franchise territory.
        </p>

        <PlaceholderImage
          label="Photo: ScrubForce crew on a commercial site"
          className="mt-10 aspect-[21/9]"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COMMERCIAL_SERVICES.map((service) => (
            <DetailServiceCard key={service.id} {...service} />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">
            How It Works
          </h2>
          <div className="mt-6">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">
            Trust Signals
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Direct accountability, not a franchise call centre — you deal
            with the same team every time.
          </p>
          <div className="mt-6">
            <TrustBadges items={TRUST_ITEMS} />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground">
            Ready for a consistent commercial clean? Get a quote in minutes.
          </p>
          <Link href="/quote" className={cn(buttonVariants(), "shrink-0")}>
            Get Your Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
