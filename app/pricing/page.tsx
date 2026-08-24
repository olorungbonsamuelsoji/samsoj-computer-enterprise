"use client";

import { PricingGuide } from "@/components/services/pricing-guide";
import { CustomerAssistant } from "@/components/ai/customer-assistant";
import { Container } from "@/components/ui/container";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen">
      {/* Dedicated Pricing Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 py-14 text-white shadow-lg border-b border-indigo-500/20">
        <div className="absolute top-0 right-10 -z-0 size-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>💰 Honest & Transparent Rates Policy</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Service Pricing & Diagnostic Transparency
            </h1>
            <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-2xl">
              No hidden costs or unexpected charges. Review our fixed starting prices (Windows Setup from ₦10,000) and understand our transparent 4-factor diagnostic rules.
            </p>
          </div>
        </Container>
      </div>

      {/* Transparent Pricing Matrix & Transparency Disclosures */}
      <PricingGuide />

      {/* Floating AI Assistant Widget */}
      <CustomerAssistant />
    </main>
  );
}
