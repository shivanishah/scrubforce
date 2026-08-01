import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DetailServiceCard({
  id,
  icon: Icon,
  title,
  description,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-20 flex-col gap-3 rounded-lg border border-border bg-card p-6"
    >
      <Icon className="size-6 text-primary" aria-hidden />
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="flex-1 text-sm text-muted-foreground">{description}</p>
      <Link
        href="/quote"
        className={cn(buttonVariants({ size: "sm" }), "self-start")}
      >
        Get a Quote
      </Link>
    </div>
  );
}
