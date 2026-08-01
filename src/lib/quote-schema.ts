import { z } from "zod";

export const RESIDENTIAL_SERVICE_OPTIONS = [
  "Regular House Cleaning",
  "Deep / Spring Clean",
  "End of Lease Cleaning",
  "Window & Glass Cleaning",
  "Bathroom Cleaning",
] as const;

export const COMMERCIAL_SERVICE_OPTIONS = [
  "Commercial Builders / Offices",
  "Banks / Financial Institutions",
  "Gyms / Fitness Centres",
  "Auto / Car Dealerships",
] as const;

export const FREQUENCY_OPTIONS = [
  { value: "one-off", label: "One-off" },
  { value: "weekly", label: "Weekly" },
  { value: "fortnightly", label: "Fortnightly" },
  { value: "monthly", label: "Monthly" },
] as const;

export const quoteFormSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(8, "Enter a valid phone number")
      .regex(/^[0-9+\-()\s]+$/, "Enter a valid phone number"),
    suburbPostcode: z.string().trim().min(2, "Enter your suburb or postcode"),
    propertyType: z.enum(["residential", "commercial"], {
      message: "Select a property type",
    }),
    service: z.string().trim().min(1, "Select a service"),
    frequency: z.enum(
      FREQUENCY_OPTIONS.map((option) => option.value) as [string, ...string[]],
      { message: "Select a frequency" }
    ),
    message: z.string().trim().max(1000).optional(),
  })
  .refine(
    (data) =>
      data.propertyType === "residential"
        ? (RESIDENTIAL_SERVICE_OPTIONS as readonly string[]).includes(data.service)
        : (COMMERCIAL_SERVICE_OPTIONS as readonly string[]).includes(data.service),
    { message: "Select a valid service for the chosen property type", path: ["service"] }
  );

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
