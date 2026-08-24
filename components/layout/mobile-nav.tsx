"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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
            <div className="relative size-12 overflow-hidden rounded-2xl bg-gradient-to-br from-card to-primary/10 border border-primary/30 p-1 shadow-sm">
              <Image
                src="/logo.png"
                alt="SAMSOJ Logo"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-base font-black text-foreground">SAMSOJ</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-1.5 py-0.5 rounded-full border border-accent/20">
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
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30 font-bold"
                    : "text-foreground hover:bg-muted active:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col gap-3 border-t border-border/80 pt-6">
          <Link href="/contact" onClick={onClose}>
            <Button className="w-full" size="lg">
              Contact & Make Enquiry
            </Button>
          </Link>

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
