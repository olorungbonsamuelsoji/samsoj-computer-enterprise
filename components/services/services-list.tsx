"use client";

import { useState, useEffect } from "react";
import { Service } from "@/types/service";
import { Card } from "@/components/ui/card";
import { getServiceWhatsAppUrl, getMaintenanceWhatsAppUrl, getRemoteSupportWhatsAppUrl } from "@/lib/whatsapp";

const categoryTabs = [
  { id: "all", label: "All Services" },
  { id: "maintenance", label: "Computer Maintenance & Remote Support" },
  { id: "repairs", label: "Hardware Repairs" },
  { id: "web_dev", label: "Web Design" },
  { id: "networking", label: "Networking" },
  { id: "cctv", label: "CCTV Security" },
  { id: "pos", label: "POS Systems" },
];

export function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (data.success && data.services) {
          setServices(data.services);
        }
      } catch (err) {
        console.error("Failed to load services from CMS:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const filteredServices = services.filter((s) => {
    if (s.id === "computer-maintenance-remote-support" && activeTab === "all") return false;
    if (activeTab === "all") return true;
    if (activeTab === "maintenance") return s.category === "maintenance" || s.category === "remote_it";
    return s.category === activeTab;
  });

  const getActionUrl = (service: Service) => {
    if (service.category === "remote_it") {
      return getRemoteSupportWhatsAppUrl(service.title);
    }
    if (service.category === "maintenance" || service.category === "repairs") {
      return getMaintenanceWhatsAppUrl(service.title);
    }
    return getServiceWhatsAppUrl(service.title);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
            <span>⚙️</span> Full Technology Capabilities
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Services Built for Your Success
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
            Managed directly from our live catalog — updated with transparent pricing, remote capabilities, and direct WhatsApp consultations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border/80 pb-4">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="mt-12 text-center py-12 text-muted-foreground text-sm">
            Loading services catalog...
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                interactive
                className="flex flex-col justify-between border border-border/80 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                      {service.icon}
                    </div>
                    {service.deliveryMode === "remote_only" && (
                      <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                        🌐 100% Remote
                      </span>
                    )}
                    {service.deliveryMode === "physical_and_remote" && (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        ⚡ Remote & Onsite
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {service.title}
                  </h3>

                  {/* Pricing Tag */}
                  {service.pricing && (
                    <div className="mt-2.5 inline-block rounded-lg bg-muted/80 px-2.5 py-1 text-xs font-semibold text-foreground border border-border/60">
                      💰 {service.pricing.priceLabel || "Contact For Quote"}
                    </div>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.shortDescription}
                  </p>

                  {/* Features Bullet points */}
                  {service.features && service.features.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-1.5">
                          <span className="text-accent font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                  <a
                    href={getActionUrl(service)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-accent transition-colors hover:underline"
                  >
                    <span>{service.ctaLabel || "Enquire Now"}</span>
                    <span>→</span>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
