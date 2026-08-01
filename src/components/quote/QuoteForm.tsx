"use client";

import { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle } from "lucide-react";

import {
  quoteFormSchema,
  type QuoteFormValues,
  RESIDENTIAL_SERVICE_OPTIONS,
  COMMERCIAL_SERVICE_OPTIONS,
  FREQUENCY_OPTIONS,
} from "@/lib/quote-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      suburbPostcode: "",
      propertyType: "" as QuoteFormValues["propertyType"],
      service: "",
      frequency: "" as QuoteFormValues["frequency"],
      message: "",
    },
  });

  const propertyType = useWatch({ control, name: "propertyType" });
  const serviceOptions =
    propertyType === "commercial"
      ? COMMERCIAL_SERVICE_OPTIONS
      : RESIDENTIAL_SERVICE_OPTIONS;

  const onSubmit = async (values: QuoteFormValues) => {
    setStatus("idle");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-8 text-center"
      >
        <CheckCircle2 className="size-8 text-primary" aria-hidden />
        <h3 className="text-lg font-semibold text-foreground">
          Quote request sent
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks — we&apos;ve got your details and will be in touch shortly.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="suburbPostcode">Suburb / Postcode</Label>
          <Input
            id="suburbPostcode"
            autoComplete="postal-code"
            aria-invalid={!!errors.suburbPostcode}
            aria-describedby={
              errors.suburbPostcode ? "suburbPostcode-error" : undefined
            }
            {...register("suburbPostcode")}
          />
          {errors.suburbPostcode && (
            <p id="suburbPostcode-error" className="text-xs text-destructive">
              {errors.suburbPostcode.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="propertyType">Property type</Label>
          <Controller
            control={control}
            name="propertyType"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("service", "");
                }}
              >
                <SelectTrigger
                  id="propertyType"
                  className="w-full"
                  aria-invalid={!!errors.propertyType}
                >
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.propertyType && (
            <p className="text-xs text-destructive">
              {errors.propertyType.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="service">Service needed</Label>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="service"
                  className="w-full"
                  aria-invalid={!!errors.service}
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.service && (
            <p className="text-xs text-destructive">{errors.service.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="frequency">Frequency</Label>
          <Controller
            control={control}
            name="frequency"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="frequency"
                  className="w-full"
                  aria-invalid={!!errors.frequency}
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.frequency && (
            <p className="text-xs text-destructive">
              {errors.frequency.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Anything else we should know?"
          {...register("message")}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="self-start">
        {isSubmitting ? "Sending..." : "Get Your Quote"}
      </Button>
    </form>
  );
}
