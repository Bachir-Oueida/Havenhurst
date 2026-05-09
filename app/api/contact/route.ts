import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "bachir@oueida.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

type ContactPayload = {
  name?: string;
  email?: string;
  date?: string;
  phone?: string;
  message?: string;
};

function validatePayload(
  body: ContactPayload,
):
  | { valid: true; data: { name: string; email: string; date: string; phone: string; message: string } }
  | { valid: false; error: string } {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !date) {
    return { valid: false, error: "Please complete all required fields." };
  }

  return { valid: true, data: { name, email, date, phone, message } };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const validation = validatePayload(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Set RESEND_API_KEY.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);
    const { name, email, date, phone, message } = validation.data;

    await resend.emails.send({
      from: fromEmail,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: "New Showing Request — 1283 Havenhurst",
      text: [
        "New inquiry from the 1283 Havenhurst website:",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Preferred Date: ${date}`,
        `Phone: ${phone || "(Not provided)"}`,
        `Message: ${message || "(Not provided)"}`,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred while sending email.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
