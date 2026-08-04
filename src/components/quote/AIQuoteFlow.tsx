import { Home, Building2, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const STEPS = [
  { number: "01", label: "Property Type" },
  { number: "02", label: "Size / Scope" },
  { number: "03", label: "Frequency" },
  { number: "04", label: "Timing" },
  { number: "05", label: "Estimate" },
];

/**
 * Phase 2 scaffold only — visual shell for the future animated AI quote quiz.
 * Not wired to real pricing logic; all controls are inert and the whole
 * card is dimmed behind a "coming soon" overlay so it can't be mistaken
 * for the working Phase 1 form.
 */
export function AIQuoteFlow() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-dashed border-border bg-card p-6">
      <div className="pointer-events-none select-none opacity-40">
        <ol className="flex items-center gap-3 overflow-x-auto">
          {STEPS.map((step) => (
            <li key={step.number} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-mono text-xs font-bold text-primary-text">
                {step.number}
              </span>
              <span className="text-xs text-muted-foreground">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">
            What type of property is this for?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              tabIndex={-1}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background px-4 py-6"
            >
              <Home className="size-6 text-primary" aria-hidden />
              <span className="text-sm text-foreground">Residential</span>
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background px-4 py-6"
            >
              <Building2 className="size-6 text-primary" aria-hidden />
              <span className="text-sm text-foreground">Commercial</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/70 p-6 text-center backdrop-blur-[1px]">
        <Lock className="size-5 text-muted-foreground" aria-hidden />
        <Badge>AI-powered instant quotes — coming soon</Badge>
        <p className="max-w-xs text-xs text-muted-foreground">
          A step-by-step quiz that estimates your quote instantly. For now,
          use the form to request a quote.
        </p>
      </div>
    </div>
  );
}
