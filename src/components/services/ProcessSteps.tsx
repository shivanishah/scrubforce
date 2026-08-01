export function ProcessSteps({
  steps,
}: {
  steps: { number: string; title: string; description: string }[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.number} className="flex flex-col gap-2">
          <span className="font-mono text-sm font-bold text-primary">
            {step.number} —
          </span>
          <h3 className="font-semibold text-foreground">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
