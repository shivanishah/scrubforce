import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <Icon className="size-6 text-primary" aria-hidden />
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="flex-1 text-sm text-muted-foreground">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
