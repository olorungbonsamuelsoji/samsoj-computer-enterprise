import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, need, message } = body;

    if (!name || !phone || !need || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "SAMSOJ Website <onboarding@resend.dev>",
      to: ["olorungbonsamuelsoji@gmail.com"],
      replyTo: email || undefined,
      subject: `New SAMSOJ Enquiry - ${need}`,
      text: `
New enquiry received from the SAMSOJ COMPUTER ENTERPRISE website.

Customer Details
----------------
Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email || "Not provided"}
Enquiry Type: ${need}

Message
-------
${message}

Please contact the customer through their preferred available channel.
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send enquiry email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending the enquiry.",
      },
      { status: 500 }
    );
  }
}