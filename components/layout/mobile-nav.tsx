"use client";

import { useEffect } from "react";
import { business } from "@/lib/config";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Enquire", href: "#enquire" },
];

const whatsappNumber = business.whatsApp.replace(/\D/g, "").replace(/^0/, "234");
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (!open) {
      document.body.classList.remove("overflow-hidden");
      return;
    }

    document.body.classList.add("overflow-hidden");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Close navigation"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-full w-[min(90%,24rem)] flex-col border-l border-border bg-background shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <span className="font-semibold tracking-tight text-foreground">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close navigation"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col p-4" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex min-h-11 items-center border-b border-border px-2 py-4 text-lg font-medium text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <p className="mb-3 text-sm text-muted-foreground">
            Contact {business.name}
          </p>

          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center rounded-md bg-whatsapp px-4 py-3 font-medium text-whatsapp-foreground transition-colors hover:bg-whatsapp/90"
            >
              Chat on WhatsApp
            </a>

            <a
              href={`mailto:${business.email}`}
              className="flex min-h-11 items-center rounded-md border border-border px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              Send us an email
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
