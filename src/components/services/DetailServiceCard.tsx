import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { PlaceholderImage } from "@/components/services/PlaceholderImage";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DetailServiceCard({
  id,
  icon: Icon,
  title,
  description,
  imageLabel,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  imageLabel?: string;
}) {
  return (
    <div
      id={id}
      className="flex scroll-mt-20 flex-col gap-3 rounded-lg border border-border bg-card p-6"
    >
      {imageLabel && (
        <PlaceholderImage label={imageLabel} className="aspect-video" />
      )}
      <Icon className="size-6 text-primary" aria-hidden />
      <h2 className="font-semibold text-foreground">{title}</h2>
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
