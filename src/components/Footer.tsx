import Link from "next/link";

import { NAV_LINKS } from "@/lib/nav-links";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-lg font-bold tracking-tight text-foreground">
              ScrubForce
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Adelaide-owned, independently operated cleaning — proudly
              servicing all of metropolitan Adelaide, South Australia.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-2 text-sm sm:items-end"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap gap-4">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <channel.icon className="size-4 text-primary" aria-hidden />
              {channel.label}
            </a>
          ))}
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ScrubForce. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
