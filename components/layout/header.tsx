"use client";

import Link from "next/link";
import { useState } from "react";
import { business } from "@/lib/config";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Enquire", href: "#enquire" },
];

const whatsappNumber = business.whatsApp.replace(/\D/g, "").replace(/^0/, "234");
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={business.name}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              S
            </span>

            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-bold tracking-tight text-foreground">
                SAMSOJ
              </span>
              <span className="block truncate text-[10px] font-medium tracking-[0.12em] text-muted-foreground">
                COMPUTER ENTERPRISE
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-10 items-center gap-2 rounded-md bg-whatsapp px-4 text-sm font-medium text-whatsapp-foreground transition-colors hover:bg-whatsapp/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.77 11.77 0 0 0 12.06 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L.14 24l6.43-1.64a11.8 11.8 0 0 0 5.49 1.39h.01c6.52 0 11.82-5.3 11.82-11.82a11.77 11.77 0 0 0-3.37-8.45ZM12.07 21.73h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.82.97 1.02-3.72-.23-.38a9.88 9.88 0 0 1-1.51-5.2C2.11 6.34 6.57 1.88 12.07 1.88c2.67 0 5.18 1.04 7.06 2.93a9.91 9.91 0 0 1 2.92 7.06c0 5.49-4.47 9.96-9.98 9.96Zm5.46-7.45c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.24-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
              </svg>
              WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
