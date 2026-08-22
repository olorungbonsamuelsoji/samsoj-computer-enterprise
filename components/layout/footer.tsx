import Image from "next/image";
import { business } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-md">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative size-14 overflow-hidden rounded-xl bg-background border border-border p-1 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="SAMSOJ Logo"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>

              <div>
                <p className="text-base font-extrabold tracking-tight text-foreground">
                  SAMSOJ
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Computer Enterprise
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {business.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm" className="gap-2 text-xs">
                  <span>WhatsApp: {business.whatsApp}</span>
                </Button>
              </a>

              <a href={`mailto:${business.email}`}>
                <Button variant="outline" size="sm" className="text-xs">
                  Email Us
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href="#services" className="transition-colors hover:text-primary">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#products" className="transition-colors hover:text-primary">
                  Product Catalogue
                </a>
              </li>
              <li>
                <a href="#why-samsoj" className="transition-colors hover:text-primary">
                  Why Choose SAMSOJ
                </a>
              </li>
              <li>
                <a href="#enquire" className="transition-colors hover:text-primary">
                  Request a Quotation
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-primary">
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Computers & Laptops</li>
              <li>Repairs & Maintenance</li>
              <li>Web Design & Development</li>
              <li>Networking & Cabling</li>
              <li>CCTV & Security Systems</li>
              <li>POS & Business Software</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Business Hours
            </h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{business.hours}</p>
              <p className="text-xs text-accent font-semibold">
                {business.serviceAvailability}
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Location: <span className="text-foreground font-medium">{business.country}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            (C) {currentYear} {business.name}. All rights reserved.
          </p>
          <p className="font-medium text-foreground/80">
            {business.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
