import { MessageCircle, MessagesSquare, Camera, Music2 } from "lucide-react";

/**
 * Placeholder hrefs — swap for real WhatsApp/Messenger/Instagram/TikTok
 * links once those accounts exist. Shared by the Contact page and the
 * floating ContactWidget so there's a single source of truth.
 */
export const CONTACT_CHANNELS = [
  { label: "WhatsApp", href: "#", icon: MessageCircle },
  { label: "Facebook Messenger", href: "#", icon: MessagesSquare },
  { label: "Instagram", href: "#", icon: Camera },
  { label: "TikTok", href: "#", icon: Music2 },
] as const;

/** Placeholder business contact details — replace with real values before launch. */
export const CONTACT_INFO = {
  phone: "(08) XXXX XXXX",
  email: "hello@scrubforce.com.au",
  hours: "Monday – Sunday, 8:00 AM – 8:00 PM",
} as const;
