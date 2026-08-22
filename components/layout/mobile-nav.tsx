"use client";

import Image from "next/image";
import { business } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileNav({ open, onClose, navigation }: MobileNavProps) {
  if (!open) return null;

  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-border bg-card p-6 shadow-2xl transition-transform animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative size-11 overflow-hidden rounded-xl bg-background border border-border p-1">
              <Image
                src="/logo.png"
                alt="SAMSOJ Logo"
                fill
                className="object-contain"
                sizes="44px"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">SAMSOJ</p>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Computer Enterprise
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted"
            aria-label="Close menu"
          >
            <span className="text-lg leading-none">✕</span>
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1.5" aria-label="Mobile Navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted active:bg-muted"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-6">
          <a href="#enquire" onClick={onClose}>
            <Button className="w-full" size="lg">
              Make an Enquiry
            </Button>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <Button variant="whatsapp" className="w-full gap-2" size="lg">
              <span>💬</span>
              <span>Chat on WhatsApp</span>
            </Button>
          </a>

          <div className="mt-4 rounded-xl bg-muted/60 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Direct Contact:</p>
            <p className="mt-1">📞 {business.phoneDisplay}</p>
            <p className="mt-1 break-all">✉️ {business.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
