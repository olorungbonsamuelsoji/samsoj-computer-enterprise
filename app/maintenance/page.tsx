"use client";

import { MaintenanceHeroCard } from "@/components/services/maintenance-hero-card";
import { ServicesList } from "@/components/services/services-list";
import { CustomerAssistant } from "@/components/ai/customer-assistant";
import { Container } from "@/components/ui/container";

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen">
      {/* Dedicated Technical Support & Maintenance Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 py-14 text-white shadow-lg border-b border-blue-500/20">
        {/* Technical grid ambient glow */}
        <div className="absolute top-0 right-0 -z-0 size-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 -z-0 size-80 rounded-full bg-accent/10 blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
              <span>🛠️ Computer Maintenance & Remote Support Center</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Computer Maintenance & Remote IT Support
            </h1>
            <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
              Professional computer diagnostics, Windows 7 to 11 Pro setup, custom disk partitioning, software setup (games, education, security, utilities, media), and instant remote desktop support across Nigeria.
            </p>
          </div>
        </Container>
      </div>

      {/* Core Maintenance Capabilities & Remote Support Card */}
      <MaintenanceHeroCard />

      {/* Maintenance Services Grid */}
      <ServicesList />

      {/* AI Assistant */}
      <CustomerAssistant />
    </main>
  );
}
