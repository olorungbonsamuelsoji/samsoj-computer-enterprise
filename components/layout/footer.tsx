import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import type { BusinessConfig } from "@/types/admin";

export function Footer({ businessConfig }: { businessConfig: BusinessConfig }) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getGeneralWhatsAppUrl(businessConfig);

  return (
    <footer className="border-t border-border/80 bg-card text-card-foreground">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative size-12 overflow-hidden rounded-xl bg-background border border-border p-1">
                <Image
                  src="/logo.png"
                  alt="SAMSOJ Logo"
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>

              <div>
                <p className="text-base font-extrabold text-foreground">
                  SAMSOJ
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Computer Enterprise
                </p>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Your trusted partner for computer maintenance, remote IT support, tested hardware sales, networking, CCTV, and web development.
            </p>

            <div className="flex gap-2.5 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="sm" className="text-xs gap-1.5">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </Button>
              </a>

              <a href={`mailto:${businessConfig.email}`}>
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
                <Link href="/maintenance" className="transition-colors hover:text-primary">
                  Computer Maintenance
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-primary">
                  Products Catalogue
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-primary">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  Contact & Enquiry Desk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Core Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/maintenance" className="hover:text-primary transition">🛠️ Computer Maintenance</Link></li>
              <li><Link href="/maintenance" className="hover:text-primary transition">🌐 Remote IT Support</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition">💎 Transparent Pricing</Link></li>
              <li><Link href="/products" className="hover:text-primary transition">💻 Hardware Catalog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">🚀 Web Design & Dev</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">📡 Networking & CCTV</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Business Hours
            </h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{businessConfig.hours}</p>
              <p className="text-xs text-accent font-semibold">
                {businessConfig.serviceAvailability}
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Location: <span className="text-foreground font-medium">{businessConfig.country}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            (C) {currentYear} {businessConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="font-medium text-foreground/80">
              {businessConfig.tagline}
            </p>
            <a href="/admin" className="text-muted-foreground/60 hover:text-accent font-semibold transition">
              🔐 Admin CMS
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
