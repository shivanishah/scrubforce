import type { LucideIcon } from "lucide-react";

export function TrustBadges({
  items,
}: {
  items: { icon: LucideIcon; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-4 py-6 text-center"
        >
          <Icon className="size-5 text-primary" aria-hidden />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
