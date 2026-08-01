"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { cn } from "@/lib/utils";

/**
 * Self-contained floating chat bubble. Channel hrefs live in
 * `contact-channels.ts` as placeholders — swap in real links/handles there,
 * or swap this component's contents for a real chat provider (Tawk.to,
 * Crisp, Intercom, etc.) later without touching call sites.
 */
export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Contact channels"
          className="flex w-56 flex-col gap-1 rounded-lg border border-border bg-card p-2 shadow-lg"
        >
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              role="menuitem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <channel.icon className="size-4 text-primary" aria-hidden />
              {channel.label}
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <MessageCircle className="size-5" aria-hidden />
        )}
      </button>
    </div>
  );
}
