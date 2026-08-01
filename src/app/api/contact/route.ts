import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactFormSchema } from "@/lib/contact-schema";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

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
      "Contact form submission received but RESEND_API_KEY / QUOTE_TO_EMAIL is not configured:",
      parsed.data
    );
    return NextResponse.json(
      { error: "Contact email is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.QUOTE_FROM_EMAIL ?? "ScrubForce Contact <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New contact message — ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
