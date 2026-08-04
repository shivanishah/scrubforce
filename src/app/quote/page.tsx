import type { Metadata } from "next";

import { QuoteForm } from "@/components/quote/QuoteForm";
import { AIQuoteFlow } from "@/components/quote/AIQuoteFlow";

export const metadata: Metadata = {
  title: "Get Your Quote | ScrubForce",
  description:
    "Request a cleaning quote for your Adelaide home or business — residential and commercial, one-off or recurring.",
};

export default function QuotePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary-text">
          {"// get started"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get Your Quote
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tell us about the job and we&apos;ll get back to you with a quote —
          no call centre, no franchise markup.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>
          <div>
            <AIQuoteFlow />
          </div>
        </div>
      </section>
    </main>
  );
}
