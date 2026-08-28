"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import type { BusinessConfig } from "@/types/admin";

const navigation = [
  { label: "Home", href: "/" },
  { label: "🛠️ Computer Maintenance", href: "/maintenance" },
  { label: "🛒 Products", href: "/products" },
  { label: "💰 Pricing", href: "/pricing" },
  { label: "📞 Contact & Enquire", href: "/contact" },
];

export function Header({ businessConfig }: { businessConfig: BusinessConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = getGeneralWhatsAppUrl(businessConfig);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md shadow-sm transition-all">
        <Container className="flex h-20 items-center justify-between">
          {/* Prominent SAMSOJ Business Logo Identity */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl p-1.5 transition-all"
            aria-label={`${businessConfig.name} Home`}
          >
            <div className="relative size-14 overflow-hidden rounded-2xl bg-gradient-to-br from-card via-background to-primary/5 border-2 border-primary/30 p-1 shadow-md shadow-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/60">
              <Image
                src="/logo.png"
                alt="SAMSOJ Computer Enterprise Logo"
                fill
                className="object-contain p-0.5"
                sizes="56px"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-foreground sm:text-xl flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
                  SAMSOJ
                </span>
                <span className="size-2 rounded-full bg-accent animate-pulse hidden sm:inline-block" />
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20 w-fit">
                Computer Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-sm font-bold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden lg:inline-flex"
            >
              <Button variant="outline" size="sm" className="font-bold">
                Get a Quote
              </Button>
            </Link>

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

            <ThemeToggle />

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
        businessConfig={businessConfig}
      />
    </>
  );
}