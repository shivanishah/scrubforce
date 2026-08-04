import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  Fingerprint,
  Leaf,
  CheckCircle2,
} from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { TrustBadges } from "@/components/services/TrustBadges";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Why Us | ScrubForce",
  description:
    "Adelaide-owned, independently operated, fully insured — no franchise, direct accountability.",
};

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: UserCheck, label: "Trained & Inducted Staff" },
  { icon: Fingerprint, label: "Background-Checked" },
  { icon: Leaf, label: "Eco-Friendly Products" },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Get Your Quote",
    description: "Tell us what you need — we'll get back to you with a quote, fast.",
  },
  {
    number: "02",
    title: "We Clean",
    description: "Our crew arrives on schedule and works through a systematic checklist.",
  },
  {
    number: "03",
    title: "Enjoy Your Space",
    description: "Spotless, every time — with a re-clean guarantee if something's missed.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary-text">
          {"// why scrubforce"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why Us
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Adelaide-owned, independently operated, and accountable to you
          directly — not a franchise call centre.
        </p>

        <Reveal className="mt-12 flex flex-col items-start gap-3 rounded-lg border border-primary/30 bg-card p-6 sm:flex-row sm:items-center">
          <CheckCircle2 className="size-8 shrink-0 text-primary" aria-hidden />
          <div>
            <h2 className="font-semibold text-foreground">
              Our re-clean guarantee
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Not happy with a spot we cleaned? Tell us within 24 hours and
              we&apos;ll come back and re-clean it, free of charge.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <TrustBadges items={TRUST_ITEMS} />
        </Reveal>

        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">
            How It Works
          </h2>
          <div className="mt-6">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Reveal>

        <Reveal className="mt-16 rounded-lg border border-border bg-card p-6">
          <p className="font-mono text-xs tracking-wide text-primary-text">
            {"// no franchise"}
          </p>
          <p className="mt-2 max-w-2xl text-foreground">
            ScrubForce is Adelaide-owned and independently operated — no
            franchise territories, no subcontracting out, no call centre
            between you and the people doing the work. Every suburb,
            every job, direct accountability.
          </p>
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-start gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-foreground">
            Ready to see the difference? Get a quote in minutes.
          </p>
          <Link href="/quote" className={cn(buttonVariants(), "shrink-0")}>
            Get Your Quote
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
