import { NextResponse } from "next/server";
import { Resend } from "resend";

import { quoteFormSchema } from "@/lib/quote-schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error(
      "Quote form submission received but RESEND_API_KEY / QUOTE_TO_EMAIL is not configured:",
      parsed.data
    );
    return NextResponse.json(
      { error: "Quote email is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const { name, email, phone, suburbPostcode, propertyType, service, frequency, message } =
    parsed.data;

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL ?? "ScrubForce Quotes <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New quote request — ${name} (${propertyType})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Suburb / Postcode: ${suburbPostcode}`,
        `Property type: ${propertyType}`,
        `Service: ${service}`,
        `Frequency: ${frequency}`,
        `Message: ${message || "(none)"}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send quote email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 500 }
    );
  }
}
