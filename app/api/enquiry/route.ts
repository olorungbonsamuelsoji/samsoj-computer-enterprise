import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/config";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      need,
      message,
      productName,
      productId,
      botField, // Honeypot field for bot spam prevention
    } = body;

    // Reject bot submissions silently
    if (botField) {
      return NextResponse.json({
        success: true,
        message: "Enquiry submitted successfully.",
      });
    }

    if (!name?.trim() || !phone?.trim() || !need?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields (Name, Phone/WhatsApp, Subject, and Message).",
        },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn("RESEND_API_KEY is not configured. Simulating enquiry receipt in development.");
      return NextResponse.json({
        success: true,
        message: "Enquiry received! (Development simulation mode)",
      });
    }

    const recipientEmail = business.email;
    const fromAddress =
      process.env.EMAIL_FROM_ADDRESS || "SAMSOJ Website <onboarding@resend.dev>";

    const subjectLine = productName
      ? `New Product Enquiry: ${productName} - ${name}`
      : `New Website Enquiry: ${need} - ${name}`;

    const textContent = `
New enquiry received from the SAMSOJ COMPUTER ENTERPRISE website.

Customer Details:
-----------------
Name: ${name}
Phone / WhatsApp: ${phone}
Email: ${email?.trim() || "Not provided"}
Category / Subject: ${need}
${productName ? `Referenced Product: ${productName} (ID: ${productId || "N/A"})` : ""}

Customer Message:
-----------------
${message}

Time: ${new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" })} (WAT)
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.5; }
    .card { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .header { background: #0f172a; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; }
    .badge { display: inline-block; background: #10b981; color: #ffffff; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; margin-top: 6px; }
    .body { padding: 24px; background: #ffffff; }
    .field { margin-bottom: 16px; }
    .label { font-size: 12px; text-transform: uppercase; color: #64748b; font-weight: bold; }
    .value { font-size: 15px; color: #0f172a; margin-top: 2px; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px 16px; border-radius: 6px; margin-top: 16px; }
    .footer { background: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>SAMSOJ COMPUTER ENTERPRISE</h2>
      <div class="badge">New Customer Enquiry</div>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Customer Name</div>
        <div class="value"><strong>${name}</strong></div>
      </div>
      <div class="field">
        <div class="label">Phone / WhatsApp</div>
        <div class="value"><a href="https://wa.me/234${phone.replace(/\D/g, "").replace(/^0/, "")}">${phone}</a></div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${email?.trim() ? `<a href="mailto:${email.trim()}">${email.trim()}</a>` : "Not provided"}</div>
      </div>
      <div class="field">
        <div class="label">Enquiry Topic</div>
        <div class="value"><strong>${need}</strong></div>
      </div>
      ${
        productName
          ? `
      <div class="field">
        <div class="label">Product Referenced</div>
        <div class="value">${productName} (Code: ${productId || "N/A"})</div>
      </div>`
          : ""
      }
      <div class="field">
        <div class="label">Customer Message</div>
        <div class="message-box">${message.replace(/\n/g, "<br/>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent from SAMSOJ Website Enquiry Form • ${new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" })}
    </div>
  </div>
</body>
</html>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      replyTo: email?.trim() || undefined,
      subject: subjectLine,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Unable to send enquiry email right now. Please reach out via WhatsApp.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
      message: "Your enquiry has been successfully delivered to SAMSOJ!",
    });
  } catch (error) {
    console.error("Enquiry API Exception:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or use WhatsApp.",
      },
      { status: 500 }
    );
  }
}