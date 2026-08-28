"use client";

import { useBusinessConfig } from "@/components/hooks/use-business-config";
import { Button } from "@/components/ui/button";
import { getMaintenanceWhatsAppUrl, getRemoteSupportWhatsAppUrl } from "@/lib/whatsapp";

export function PricingGuide() {
  const businessConfig = useBusinessConfig();
  const maintenanceWhatsApp = getMaintenanceWhatsAppUrl(undefined, undefined, businessConfig);
  const remoteSupportWhatsApp = getRemoteSupportWhatsAppUrl(undefined, undefined, businessConfig);

  const pricingTiers = [
    {
      title: "Windows 7 to 11 Pro Installation & Formatting",
      badge: "Starting Price",
      icon: "🪟",
      priceDisplay: "From ₦10,000",
      priceType: "starting_from",
      subtitle: "Includes genuine Windows 7, 8, 10, or 11 Pro setup, disk partitioning, driver pack installation & software setup.",
      factors: "Final cost depends on backup data volume, drive partitioning layout, and software suites requested (games, education, security, utilities, media).",
      actionText: "Book Windows Setup",
      actionUrl: getMaintenanceWhatsAppUrl("Windows 7 to 11 Pro Installation (Starting from ₦10,000)", undefined, businessConfig),
      isPopular: true,
    },
    {
      title: "Remote Computer Support",
      badge: "Remote Assistance",
      icon: "🌐",
      priceDisplay: "Depends on issue complexity",
      priceType: "diagnostic_variable",
      subtitle: "Instant AnyDesk/TeamViewer session to troubleshoot glitches, printer drivers, software errors, or virus popups.",
      factors: "Price varies depending on diagnosis, time required, and nature of the software conflict.",
      actionText: "Get Remote Support",
      actionUrl: remoteSupportWhatsApp,
      isPopular: false,
    },
    {
      title: "Computer Troubleshooting & Hardware Repairs",
      badge: "Diagnosis Required",
      icon: "🔧",
      priceDisplay: "Depends on PC spec & issue",
      priceType: "diagnostic_variable",
      subtitle: "Board diagnostics, laptop screen replacement, battery fix, power port repair, overheating servicing, and upgrades.",
      factors: "Price varies based on your PC hardware specifications, fault severity, and required replacement parts.",
      actionText: "Request Diagnosis",
      actionUrl: maintenanceWhatsApp,
      isPopular: false,
    },
    {
      title: "System Optimization & Speed Upgrade",
      badge: "Speed Enhancement",
      icon: "⚡",
      priceDisplay: "From ₦8,000",
      priceType: "starting_from",
      subtitle: "Make your slow PC fast again! Thermal cleaning, startup trimming, registry optimization, and NVMe SSD migration.",
      factors: "Hardware component costs (SSDs, RAM modules) added if physical upgrade is required.",
      actionText: "Speed Up My PC",
      actionUrl: getMaintenanceWhatsAppUrl("System Optimization & Speed Upgrade (Starting from ₦8,000)", undefined, businessConfig),
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent shadow-sm">
            <span>💎</span> Clear & Honest Pricing
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Transparent Service Pricing
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            At <strong>{businessConfig.name}</strong>, we believe in honest, transparent pricing. We provide clear baseline starting rates and explain exactly why hardware repairs require diagnosis before final billing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:shadow-2xl ${
                tier.isPopular
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                    {tier.icon}
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {tier.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold text-foreground">
                  {tier.title}
                </h3>

                <div className="mt-4 border-y border-border/60 py-3">
                  <p className="text-xl font-extrabold text-foreground tracking-tight">
                    {tier.priceDisplay}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-accent">
                    {tier.priceType === "starting_from" ? "✓ Baseline starting price" : "ℹ️ Quoted after issue assessment"}
                  </p>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {tier.subtitle}
                </p>

                <div className="mt-4 rounded-xl bg-muted/60 p-3 text-[11px] text-muted-foreground">
                  <p className="font-bold text-foreground">Pricing note:</p>
                  <p className="mt-0.5">{tier.factors}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60">
                <a
                  href={tier.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant={tier.isPopular ? "primary" : "outline"}
                    size="sm"
                    className="w-full text-xs font-bold gap-1.5"
                  >
                    <span>💬</span>
                    <span>{tier.actionText}</span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Factors Transparency Card */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/5 via-background to-accent/5 p-6 sm:p-8 lg:p-10 shadow-lg">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-accent">
              <span>📋</span> Why Do Repair Prices Vary?
            </div>
            <h3 className="mt-3 text-xl font-extrabold text-foreground sm:text-2xl">
              Understanding our diagnostic and quotation process
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We never quote misleading flat fees for repairs that require diagnosis. The final price for computer repairs and maintenance depends on these four critical factors:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <span className="text-xl">💻</span>
              <p className="mt-2 text-xs font-bold text-foreground">1. PC Specification & Model</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Processor tier (Core i3/i5/i7/Ryzen), generation, MacBook vs Windows PC, and board architecture.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <span className="text-xl">🔍</span>
              <p className="mt-2 text-xs font-bold text-foreground">2. Type & Severity of Fault</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Whether the issue is quick software troubleshooting or complex board-level micro-soldering.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <span className="text-xl">⚙️</span>
              <p className="mt-2 text-xs font-bold text-foreground">3. Replacement Parts Required</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Cost of authentic parts (e.g. Original IPS Screen, NVMe SSD, High-Capacity Battery, Power IC).
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <span className="text-xl">⏱️</span>
              <p className="mt-2 text-xs font-bold text-foreground">4. Labor & Time Complexity</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Total bench time required for data recovery, multi-layer testing, thermal servicing, and quality check.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
