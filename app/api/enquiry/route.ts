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

    // Log enquiry to persistent JSON database for Admin Inbox
    try {
      const { logEnquiry } = await import("@/lib/db/enquiries-repository");
      await logEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || undefined,
        need: need.trim(),
        message: message.trim(),
        productId: productId || undefined,
        productName: productName || undefined,
        channel: "website_email",
      });
    } catch (logErr) {
      console.warn("Failed to log enquiry to database:", logErr);
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

    // Format customer phone for WhatsApp reply link
    const cleanPhoneDigits = phone.replace(/\D/g, "");
    const formattedWaNumber = cleanPhoneDigits.startsWith("234")
      ? cleanPhoneDigits
      : cleanPhoneDigits.startsWith("0")
      ? `234${cleanPhoneDigits.slice(1)}`
      : `234${cleanPhoneDigits}`;

    const replyWhatsAppText = encodeURIComponent(
      `Hello ${name}, thank you for reaching out to SAMSOJ COMPUTER ENTERPRISE regarding "${need}". How may we assist you today?`
    );
    const customerWhatsAppLink = `https://wa.me/${formattedWaNumber}?text=${replyWhatsAppText}`;
    const emailReplyLink = email?.trim() ? `mailto:${email.trim()}?subject=RE: ${encodeURIComponent(subjectLine)}` : "";

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

Quick Actions:
--------------
• Reply via WhatsApp: ${customerWhatsAppLink}
${emailReplyLink ? `• Reply via Email: ${emailReplyLink}` : ""}
• Call Customer: tel:${phone}

Time: ${new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" })} (WAT)
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.5; }
    .card { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff; }
    .header { background: #0f172a; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
    .badge { display: inline-block; background: #22c55e; color: #ffffff; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; margin-top: 6px; }
    .body { padding: 24px; background: #ffffff; }
    .field { margin-bottom: 14px; }
    .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; letter-spacing: 0.05em; }
    .value { font-size: 15px; color: #0f172a; margin-top: 2px; }
    .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 14px 16px; border-radius: 6px; margin-top: 14px; color: #334155; font-size: 14px; line-height: 1.6; }
    .actions { margin-top: 24px; padding: 18px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; }
    .action-title { font-size: 13px; font-weight: bold; color: #166534; margin-bottom: 12px; }
    .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 14px; margin-right: 8px; margin-bottom: 8px; }
    .btn-wa { background: #25D366; color: #ffffff !important; }
    .btn-email { background: #2563eb; color: #ffffff !important; }
    .btn-call { background: #0f172a; color: #ffffff !important; }
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
        <div class="value"><a href="${customerWhatsAppLink}"><strong>${phone}</strong></a></div>
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

      <!-- Quick Reply Actions for SAMSOJ -->
      <div class="actions">
        <div class="action-title">⚡ Instant Reply Actions:</div>
        <a href="${customerWhatsAppLink}" class="btn btn-wa" target="_blank">💬 Reply to Customer on WhatsApp</a>
        ${email?.trim() ? `<a href="mailto:${email.trim()}?subject=RE: ${encodeURIComponent(subjectLine)}" class="btn btn-email">✉️ Reply via Email</a>` : ""}
        <a href="tel:${phone}" class="btn btn-call">📞 Call Customer</a>
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
      customerWhatsAppLink,
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