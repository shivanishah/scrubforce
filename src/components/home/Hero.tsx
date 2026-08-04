import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_STATS = [
  { value: "500+", label: "homes & offices cleaned" },
  { value: "98%", label: "client satisfaction rate" },
  { value: "20+", label: "Adelaide suburbs covered" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="flex flex-col items-center">
          <p className="font-mono text-sm tracking-wide text-primary-text">
            {"// spotless. systematic. scrubforce."}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Professional cleaning, Adelaide-wide.
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
            ScrubForce is independently operated right here in Adelaide —{" "}
            <span className="font-medium text-foreground">not a franchise</span>
            . We cover all of metropolitan Adelaide with the same systematic,
            detail-obsessed crew every time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className={cn(buttonVariants({ size: "lg" }))}>
              Get Your Quote
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View Services
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-3">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-2xl font-bold text-primary-text">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
