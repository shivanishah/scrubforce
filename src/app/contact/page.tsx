import type { Metadata } from "next";
import { Phone, Mail, Clock } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { PlaceholderImage } from "@/components/services/PlaceholderImage";
import { CONTACT_CHANNELS, CONTACT_INFO } from "@/lib/contact-channels";

export const metadata: Metadata = {
  title: "Contact Us | ScrubForce",
  description:
    "Get in touch with ScrubForce — phone, email, WhatsApp, Messenger, Instagram, and TikTok.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <p className="font-mono text-sm tracking-wide text-primary-text">
          {"// get in touch"}
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Adelaide-based, independently operated — reach us directly, no
          call centre in between.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {CONTACT_INFO.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {CONTACT_INFO.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 sm:col-span-2">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Business hours
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                Message us directly
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {CONTACT_CHANNELS.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
                  >
                    <channel.icon className="size-4 text-primary" aria-hidden />
                    {channel.label}
                  </a>
                ))}
              </div>
            </div>

            <PlaceholderImage
              label="Map: ScrubForce covers all of metropolitan Adelaide"
              className="aspect-video"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              Or send a message
            </p>
            <div className="mt-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
