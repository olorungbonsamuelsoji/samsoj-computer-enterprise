import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/product-catalog";
import { CustomerAssistant } from "@/components/ai/customer-assistant";
import { Container } from "@/components/ui/container";

export default function ProductsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Dedicated Products Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 py-14 text-white shadow-lg border-b border-emerald-500/20">
        <div className="absolute top-0 right-1/4 -z-0 size-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>🛒 Brand-Certified Hardware & Equipment Store</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Hardware Catalog & IT Products
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl">
              Explore tested HP, Dell & Lenovo business laptops, customized desktop PCs, printers, networking hardware, CCTV security systems, POS equipment, and computer accessories.
            </p>
          </div>
        </Container>
      </div>

      {/* Interactive Products Catalog Grid with Detail Modal */}
      <Suspense fallback={<div className="py-20 text-center text-muted-foreground">Loading products catalog…</div>}>
        <ProductCatalog />
      </Suspense>

      {/* Floating AI Assistant Widget */}
      <CustomerAssistant />
    </main>
  );
}
