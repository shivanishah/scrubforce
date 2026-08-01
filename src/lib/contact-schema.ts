import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(5, "Enter a message"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
