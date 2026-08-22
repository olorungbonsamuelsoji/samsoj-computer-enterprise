"use client";

import { useState } from "react";
import Image from "next/image";
import { business } from "@/lib/config";
import { Product } from "@/types/product";
import { getGeneralWhatsAppUrl, getServiceWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductCatalog } from "@/components/products/product-catalog";
import { EnquirySection } from "@/components/enquiry/enquiry-section";
import { CustomerAssistant } from "@/components/ai/customer-assistant";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const whatsappUrl = getGeneralWhatsAppUrl();

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="relative min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/80 bg-background pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-1/4 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl" />

        <Container>
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Content */}
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-accent shadow-sm">
                <span className="flex size-2 rounded-full bg-accent animate-pulse" />
                <span>{business.tagline}</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                Empowering your work with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">
                  reliable technology.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl">
                Explore brand-certified laptops, custom desktop PCs, printers, high-speed networking, CCTV security, professional web design & development, and expert computer repairs from SAMSOJ COMPUTER ENTERPRISE.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a href="#products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base font-bold shadow-lg shadow-primary/20">
                    Explore Products
                  </Button>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto text-base font-bold gap-2 shadow-lg shadow-emerald-500/10"
                  >
                    <span>💬</span>
                    <span>Chat on WhatsApp</span>
                  </Button>
                </a>

                <a href="#enquire" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold">
                    Request a Quote
                  </Button>
                </a>
              </div>

              {/* Metrics Grid */}
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border/80 pt-8">
                <div>
                  <p className="text-2xl font-extrabold text-foreground">100%</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Tested Hardware
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-foreground">24/7</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Enquiry Access
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-foreground">Rapid</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Technical Support
                  </p>
                </div>
              </div>
            </div>

            {/* Right Brand Showcase Card */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-blue-500/10 to-accent/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm">
                {/* Logo & Identity Showcase */}
                <div className="flex flex-col items-center text-center border-b border-border pb-6">
                  <div className="relative size-28 overflow-hidden rounded-3xl bg-background border-2 border-primary/20 p-2 shadow-xl shadow-primary/10">
                    <Image
                      src="/logo.png"
                      alt="SAMSOJ Logo"
                      fill
                      className="object-contain p-1"
                      sizes="112px"
                      priority
                    />
                  </div>

                  <div className="mt-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-accent">
                      <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                      <span>Verified IT & Hardware Partner</span>
                    </div>

                    <h2 className="mt-2 text-2xl font-extrabold text-foreground tracking-tight">
                      SAMSOJ
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Computer Enterprise
                    </p>
                  </div>
                </div>

                {/* Trust & Capability Pillars (Non-repeating) */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                      🛡️
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Certified & Tested Hardware
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Quality-verified laptops, desktops, and accessories
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-xl">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Rapid Diagnosis & Repairs
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Fast turnaround for motherboard, screen & SSD fixes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                      📍
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Nationwide Service & Support
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Safe delivery and onsite network/CCTV installation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="mt-6 flex gap-2.5">
                  <a href="#products" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      View Catalog
                    </Button>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="whatsapp" size="sm" className="w-full text-xs font-bold gap-1.5">
                      <span>💬</span>
                      <span>Chat Support</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SERVICES SECTION */}
      <Section id="services" className="bg-muted/30">
        <Container>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              <span>⚙️</span> Professional IT Capabilities
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Technology services built for your success
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
              From individual computer maintenance to enterprise office network installations, we deliver dependable IT solutions tailored to your operational requirements.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {business.services.map((service) => (
              <Card
                key={service.id}
                interactive
                className="flex flex-col justify-between border border-border/80 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/40"
              >
                <div>
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                    {service.icon}
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <a
                    href={getServiceWhatsAppUrl(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:underline"
                  >
                    <span>{service.action}</span>
                    <span>→</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 3. PRODUCT CATALOG COMPONENT */}
      <ProductCatalog onSelectProductForEnquiry={handleSelectProduct} />

      {/* 4. WHY CHOOSE SAMSOJ */}
      <Section id="why-samsoj" className="bg-muted/40 border-t border-border/80">
        <Container>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              <span>⭐</span> Our Commitment
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Why partner with SAMSOJ
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
              We eliminate guesswork by delivering tested IT hardware, transparent pricing, and responsive support.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {business.reasons.map((reason, index) => (
              <Card
                key={reason.title}
                className="border border-border/80 bg-card p-6 transition-all duration-200 hover:border-primary/30"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-primary-foreground shadow-md">
                  0{index + 1}
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {reason.title}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. DUAL-MODE ENQUIRY SECTION */}
      <EnquirySection
        selectedProduct={selectedProduct}
        onClearSelectedProduct={handleClearProduct}
      />

      {/* 6. FLOATING AI ASSISTANT WIDGET */}
      <CustomerAssistant />
    </main>
  );
}