import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function PlaceholderImage({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] px-4 py-10 text-center",
        className
      )}
    >
      <ImageIcon className="size-6 text-muted-foreground" aria-hidden />
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
