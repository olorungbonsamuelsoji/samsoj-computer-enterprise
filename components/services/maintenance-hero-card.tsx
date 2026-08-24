"use client";

import { Button } from "@/components/ui/button";
import { getMaintenanceWhatsAppUrl, getRemoteSupportWhatsAppUrl } from "@/lib/whatsapp";

export function MaintenanceHeroCard() {
  const maintenanceWhatsApp = getMaintenanceWhatsAppUrl();
  const remoteSupportWhatsApp = getRemoteSupportWhatsAppUrl();

  const maintenanceCapabilities = [
    { title: "Computer Diagnostics & Troubleshooting", icon: "🔍", desc: "Precise hardware & software fault isolation" },
    { title: "Computer Formatting / Resetting", icon: "🔄", desc: "Starting from ₦10,000 with driver & app setup" },
    { title: "Windows 7 to 11 Pro Installation", icon: "🪟", desc: "Genuine OS setup, disk partitioning & configuration" },
    { title: "Multi-Category Software Setup", icon: "📦", desc: "Games, educational, security, utilities, media & office" },
    { title: "Instant Remote Desktop Support", icon: "🌐", desc: "AnyDesk & TeamViewer nationwide assistance" },
    { title: "System Optimization & Speed Boost", icon: "⚡", desc: "SSD upgrade setup, thermal paste & junk cleanup" },
    { title: "Virus, Malware & Popup Removal", icon: "🛡️", desc: "Deep cleaning without losing your personal data" },
    { title: "Business IT Maintenance Retainers", icon: "🏢", desc: "Scheduled preventive maintenance for offices & schools" },
  ];

  return (
    <section id="maintenance" className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-primary/5 via-card to-background border-y border-border">
      {/* Background Ambient Glows */}
      <div className="absolute -top-24 left-1/4 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 -z-10 size-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent shadow-sm">
            <span>🛠️</span> Core Business Specialization
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Computer Maintenance &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">
              Remote IT Support
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Keep your computer running smoothly with reliable maintenance, troubleshooting, and technical support from <strong>SAMSOJ COMPUTER ENTERPRISE</strong>. Whether you need physical maintenance in our workshop or instant remote assistance from anywhere in Nigeria, we diagnose and resolve computer problems efficiently.
          </p>

          {/* Remote Highlight Alert */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
            <span className="flex size-2 rounded-full bg-blue-500 animate-ping" />
            <span>✨ <strong>Remote Support Available:</strong> You don’t always need to bring your PC down physically! We connect securely online.</span>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={remoteSupportWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto gap-2 text-base font-bold shadow-xl shadow-emerald-500/15"
              >
                <span>🌐</span>
                <span>Get Remote Support Now</span>
              </Button>
            </a>

            <a
              href={maintenanceWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 text-base font-bold shadow-xl shadow-primary/20"
              >
                <span>🛠️</span>
                <span>Request Computer Maintenance</span>
              </Button>
            </a>

            <a href="#pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold">
                <span>View Transparent Pricing</span>
              </Button>
            </a>
          </div>
        </div>

        {/* 8-Card Capabilities Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {maintenanceCapabilities.map((cap) => (
            <div
              key={cap.title}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-transform group-hover:scale-110">
                {cap.icon}
              </div>
              <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                {cap.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
