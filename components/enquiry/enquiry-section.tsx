"use client";

import { useState } from "react";
import { business } from "@/lib/config";
import { Product } from "@/types/product";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const enquiryOptions = [
  "Computer Maintenance & Diagnostics",
  "Computer Formatting / Resetting (From ₦10,000)",
  "Remote IT Support (AnyDesk / Online)",
  "Hardware Repairs & Screen/Battery Fix",
  "Laptops & Computers Sales",
  "Printers & Scanners",
  "Networking & Structured Cabling",
  "CCTV & Security Surveillance",
  "POS & Business Software",
  "Web Design & Development",
  "Accessories & Components",
  "General Consultation",
];

interface EnquirySectionProps {
  selectedProduct?: Product | null;
  onClearSelectedProduct?: () => void;
}

export function EnquirySection({
  selectedProduct,
  onClearSelectedProduct,
}: EnquirySectionProps) {
  const [formChannel, setFormChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [whatsappFollowUp, setWhatsappFollowUp] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    need: "Laptops & Computers",
    message: "",
    botField: "",
  });

  const activeCategory = selectedProduct ? selectedProduct.category : form.need;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setStatusMessage({
        type: "error",
        text: "Please provide your Name, Phone Number, and Message.",
      });
      return;
    }

    const lines = [
      `Hello ${business.name},`,
      "",
      "I would like to make an enquiry:",
      `• Customer Name: ${form.name}`,
      `• Phone/WhatsApp: ${form.phone}`,
      form.email ? `• Email: ${form.email}` : "",
      `• Category: ${activeCategory}`,
      selectedProduct ? `• Product Referenced: ${selectedProduct.name} (${selectedProduct.id})` : "",
      "",
      "Message:",
      form.message,
    ].filter(Boolean);

    const url = buildWhatsAppUrl(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");

    setStatusMessage({
      type: "success",
      text: "Opening WhatsApp with your formatted enquiry...",
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    setWhatsappFollowUp(null);

    // Pre-calculate fallback WhatsApp link in case customer also wants to chat
    const waLines = [
      `Hello ${business.name},`,
      "I just submitted an enquiry on your website:",
      `• Customer Name: ${form.name}`,
      `• Phone: ${form.phone}`,
      `• Need: ${activeCategory}`,
      "",
      "Message:",
      form.message,
    ];
    const instantWaUrl = buildWhatsAppUrl(waLines.join("\n"));

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        need: activeCategory,
        message: form.message,
        productId: selectedProduct?.id,
        productName: selectedProduct?.name,
        botField: form.botField,
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage({
          type: "success",
          text: data.message || "Thank you! Your enquiry has been delivered to SAMSOJ.",
        });
        setWhatsappFollowUp(instantWaUrl);
        setForm({
          name: "",
          phone: "",
          email: "",
          need: "Laptops & Computers",
          message: "",
          botField: "",
        });
        if (onClearSelectedProduct) onClearSelectedProduct();
      } else {
        setStatusMessage({
          type: "error",
          text: data.message || "Failed to submit enquiry. Please reach out directly on WhatsApp.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Network error submitting form. Please send your enquiry via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquire" className="relative overflow-hidden py-20 lg:py-28 bg-card border-t border-border/80">
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 -z-10 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 size-96 rounded-full bg-accent/5 blur-3xl" />

      <Container>
        <div id="contact" className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left Column: Direct Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              <span>💬</span> Fast Quotations & Enquiries
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Get in touch with SAMSOJ
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Whether you need to buy laptops, request a computer repair, set up office networking, or design a professional website, our team is ready to assist.
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-8 space-y-4">
              <a
                href={buildWhatsAppUrl("Hello SAMSOJ, I would like to chat directly with support.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-whatsapp hover:bg-whatsapp/5 group"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-whatsapp/10 text-2xl group-hover:scale-110 transition-transform">
                  💬
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Instant WhatsApp Chat
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {business.whatsApp}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-primary hover:bg-primary/5 group"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-2xl group-hover:scale-110 transition-transform">
                  📞
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Direct Phone Support
                  </p>
                  <p className="text-base font-bold text-foreground">
                    {business.phoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:border-accent hover:bg-accent/5 group"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-2xl group-hover:scale-110 transition-transform">
                  ✉️
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Business Email
                  </p>
                  <p className="text-base font-bold text-foreground break-all">
                    {business.email}
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-border/80 bg-background/50 p-5 text-xs text-muted-foreground">
              <p className="font-bold text-foreground">Opening Hours:</p>
              <p className="mt-1">{business.hours}</p>
              <p className="mt-2 text-accent font-semibold">
                ✓ {business.serviceAvailability}
              </p>
            </div>
          </div>

          {/* Right Column: Dual-Mode Form */}
          <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-xl">
            {/* Header & Mode Switcher */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-5">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Send Your Enquiry
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select your preferred submission pathway
                </p>
              </div>

              {/* Channel Tabs */}
              <div className="flex rounded-xl bg-muted p-1 border border-border/60">
                <button
                  type="button"
                  onClick={() => setFormChannel("whatsapp")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    formChannel === "whatsapp"
                      ? "bg-whatsapp text-whatsapp-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormChannel("email")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    formChannel === "email"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>✉️</span>
                  <span>Direct Email</span>
                </button>
              </div>
            </div>

            {/* Product Reference Chip (if active) */}
            {selectedProduct && (
              <div className="mb-5 flex items-center justify-between rounded-xl bg-primary/10 border border-primary/20 p-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">📦 Inquiring about:</span>
                  <span className="font-bold text-foreground">
                    {selectedProduct.name}
                  </span>
                </div>
                {onClearSelectedProduct && (
                  <button
                    type="button"
                    onClick={onClearSelectedProduct}
                    className="rounded px-2 py-0.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-background/80"
                  >
                    ✕ Clear
                  </button>
                )}
              </div>
            )}

            {/* Status Alert */}
            {statusMessage && (
              <div
                className={`mb-5 rounded-xl p-4 text-xs font-medium border ${
                  statusMessage.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
                }`}
              >
                <p>{statusMessage.text}</p>
                {whatsappFollowUp && (
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-200">
                      Want an instant reply on your phone?
                    </span>
                    <a
                      href={whatsappFollowUp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground shadow-sm hover:brightness-105 transition"
                    >
                      <span>💬</span>
                      <span>Chat on WhatsApp now</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            <form
              onSubmit={
                formChannel === "whatsapp"
                  ? handleWhatsAppSubmit
                  : handleEmailSubmit
              }
              className="space-y-4"
            >
              {/* Spam Honeypot */}
              <input
                type="text"
                name="botField"
                value={form.botField}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Samuel Johnson"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 08012345678"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email Address {formChannel === "email" && "*"}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required={formChannel === "email"}
                    placeholder="e.g. you@example.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="need" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    What service or item do you need? *
                  </label>
                  <select
                    id="need"
                    name="need"
                    value={activeCategory}
                    onChange={handleChange}
                    required
                    className="mt-1.5 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {enquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Message or Requirement *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={
                    selectedProduct
                      ? `I would like to inquire about availability and pricing for ${selectedProduct.name}...`
                      : "Describe what you are looking for, specifications, budget, or device problem..."
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-2">
                {formChannel === "whatsapp" ? (
                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    className="w-full gap-2 text-sm font-bold shadow-md"
                  >
                    <span>💬</span>
                    <span>Send Enquiry on WhatsApp</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2 text-sm font-bold shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry to SAMSOJ...</span>
                    ) : (
                      <>
                        <span>✉️</span>
                        <span>Submit Direct Email Enquiry</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
