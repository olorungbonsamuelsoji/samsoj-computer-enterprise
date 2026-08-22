"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { business } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Why SAMSOJ", href: "#why-samsoj" },
  { label: "Enquire", href: "#enquire" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
        <Container className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            aria-label={`${business.name} Home`}
          >
            <div className="relative size-14 overflow-hidden rounded-xl bg-card border border-border/60 p-1 shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="SAMSOJ Computer Enterprise Logo"
                fill
                className="object-contain p-0.5"
                sizes="56px"
                priority
              />
            </div>

            <div>
              <p className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
                SAMSOJ
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                Computer Enterprise
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#enquire"
              className="hidden lg:inline-flex"
            >
              <Button variant="outline" size="sm">
                Get a Quote
              </Button>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button variant="whatsapp" size="sm" className="gap-2 shadow-sm">
                <span>💬</span>
                <span>WhatsApp Us</span>
              </Button>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigation={navigation}
      />
    </>
  );
}