"use client";

import { business } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { EnquirySection } from "@/components/enquiry/enquiry-section";
import { CustomerAssistant } from "@/components/ai/customer-assistant";

export default function ContactPage() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <main className="relative min-h-screen">
      {/* Dedicated Contact & Enquiry Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 py-14 text-white shadow-lg border-b border-teal-500/20">
        <div className="absolute top-0 right-10 -z-0 size-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 -z-0 size-80 rounded-full bg-accent/10 blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
              <span>📞 Official Business Contact & Priority Enquiry Desk</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Contact & Enquire
            </h1>
            <p className="mt-3 text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-2xl">
              Get in touch directly with our workshop desk, request a service quote, or submit your IT enquiry below. Submissions connect directly to our database and 1-click WhatsApp desk.
            </p>
          </div>
        </Container>
      </div>

      {/* 1. DIRECT CONTACT CARDS */}
      <section className="py-12 bg-background border-b border-border/60">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Contact Card 1: WhatsApp Major Channel */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl">
                  💬
                </div>
                <h3 className="mt-3 text-lg font-bold text-foreground">WhatsApp Direct Desk</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Our primary channel! Instant quotes, remote support setup, or product availability.
                </p>
                <p className="mt-3 text-base font-extrabold text-foreground">{business.whatsApp}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-emerald-500/20">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="whatsapp" className="w-full font-bold text-xs gap-2">
                    <span>💬</span>
                    <span>Chat on WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Card 2: Direct Phone Line */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  📞
                </div>
                <h3 className="mt-3 text-lg font-bold text-foreground">Direct Call Line</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Speak directly with our technical support team during business hours.
                </p>
                <p className="mt-3 text-base font-extrabold text-foreground">{business.phoneDisplay}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-border">
                <a href={`tel:${business.phone}`} className="block w-full">
                  <Button variant="outline" className="w-full font-bold text-xs gap-2">
                    <span>📞</span>
                    <span>Call Desk</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Card 3: Email & Hours */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-2xl">
                  📧
                </div>
                <h3 className="mt-3 text-lg font-bold text-foreground">Email & Operation Hours</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Official correspondence & invoice requests.
                </p>
                <p className="mt-2 text-xs font-bold text-foreground">{business.email}</p>
                <p className="mt-2 text-xs font-semibold text-accent">{business.hours}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-border">
                <a href={`mailto:${business.email}`} className="block w-full">
                  <Button variant="outline" className="w-full font-bold text-xs gap-2">
                    <span>📧</span>
                    <span>Send Email</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. DEDICATED CUSTOMER ENQUIRY FORM SECTION */}
      <section className="bg-muted/30 py-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-accent border border-primary/20">
              📩 Submit Your Request
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-foreground sm:text-3xl">
              Customer Request & Quotation Form
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Select what you need help with, enter your contact details, and describe your requirement. We log your request and provide a 1-click WhatsApp quick connection.
            </p>
          </div>

          <EnquirySection />
        </Container>
      </section>

      {/* Floating AI Assistant Widget */}
      <CustomerAssistant />
    </main>
  );
}
