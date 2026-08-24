"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/config";
import { BusinessConfig } from "@/types/admin";
import { Product } from "@/types/product";
import { getRemoteSupportWhatsAppUrl, getProductWhatsAppUrl } from "@/lib/whatsapp";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomerAssistant } from "@/components/ai/customer-assistant";
import { ProductImage } from "@/components/products/ProductImage";

export default function Home() {
  const [settings, setSettings] = useState<BusinessConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const remoteSupportUrl = getRemoteSupportWhatsAppUrl();

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, productsRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/products"),
        ]);
        const settingsData = await settingsRes.json();
        const productsData = await productsRes.json();

        if (settingsData.success && settingsData.settings) {
          setSettings(settingsData.settings);
        }
        if (productsData.success && productsData.products) {
          setProducts(productsData.products);
        }
      } catch {
        // Fallback to default
      } finally {
        setProductsLoading(false);
      }
    }
    loadData();
  }, []);

  const announcement = settings?.announcement || business.announcement;

  const departmentHubs = [
    {
      title: "Computer Maintenance & Remote Support",
      icon: "🛠️",
      badge: "Core Specialization",
      description: "Diagnostics, Windows 7 to 11 Pro installation, custom disk partitioning, software setup (games, education, security, utilities, media), and remote desktop support.",
      actionText: "Explore Computer Maintenance",
      href: "/maintenance",
    },
    {
      title: "Hardware Catalog & IT Equipment",
      icon: "🛒",
      badge: "Tested Stock",
      description: "HP, Dell, and Lenovo business laptops, customized Core i5/i7 workstations, laser printers, CCTV kits, POS setups, and accessories.",
      actionText: "View Hardware Catalog",
      href: "/products",
    },
    {
      title: "Transparent Pricing Policy",
      icon: "💰",
      badge: "Honest Rates",
      description: "Fixed starting rates (Windows Setup from ₦10,000), diagnostic variable estimation rules, and 4-factor cost disclosures.",
      actionText: "View Pricing Guide",
      href: "/pricing",
    },
    {
      title: "Contact & Customer Enquiry Desk",
      icon: "📞",
      badge: "Fast Response",
      description: "Submit custom quotes, technical requests, or talk directly with our workshop desk via WhatsApp, Phone call, or Email.",
      actionText: "Contact & Make Enquiry",
      href: "/contact",
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Top Announcement Bar */}
      {announcement?.enabled && (
        <div className="bg-gradient-to-r from-primary via-blue-600 to-accent px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm flex flex-wrap items-center justify-center gap-2">
          {announcement.badge && (
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur-sm">
              {announcement.badge}
            </span>
          )}
          <span>{announcement.message}</span>
          {announcement.linkText && (
            <Link
              href={announcement.linkUrl || "/maintenance"}
              className="underline hover:text-white/80 font-extrabold ml-1"
            >
              {announcement.linkText} →
            </Link>
          )}
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/80 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute top-1/4 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/5 blur-3xl" />

        <Container>
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left Content */}
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent shadow-sm">
                <span className="flex size-2 rounded-full bg-accent animate-pulse" />
                <span>Computer Maintenance • Remote IT Support • IT Equipment</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1]">
                Empowering your work with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-accent">
                  reliable technology.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl">
                Expert computer maintenance & remote IT troubleshooting, tested business laptops, customized desktop workstations, printers, networking, CCTV security, and professional IT solutions from <strong>SAMSOJ COMPUTER ENTERPRISE</strong>.
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link href="/maintenance" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base font-bold shadow-lg shadow-primary/20">
                    <span>🛠️ Computer Maintenance</span>
                  </Button>
                </Link>

                <a
                  href={remoteSupportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto text-base font-bold gap-2 shadow-lg shadow-emerald-500/15"
                  >
                    <span>🌐</span>
                    <span>Get Remote Support</span>
                  </Button>
                </a>

                <Link href="/products" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-semibold">
                    <span>Explore Products</span>
                  </Button>
                </Link>
              </div>

              {/* Metrics Grid */}
              <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border/80 pt-8">
                <div>
                  <p className="text-2xl font-extrabold text-foreground">From ₦10k</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Formatting & Windows Setup
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-foreground">100%</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Remote Support Available
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-foreground">Tested</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Hardware Guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Right Brand Card */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-blue-500/10 to-accent/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-col items-center text-center border-b border-border pb-6">
                  <div className="relative size-28 overflow-hidden rounded-3xl bg-background border-2 border-primary/30 p-2 shadow-xl shadow-primary/10">
                    <Image
                      src="/logo.png"
                      alt="SAMSOJ Logo"
                      fill
                      className="object-contain p-1"
                      sizes="112px"
                      priority
                    />
                  </div>

                  <div className="mt-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-accent">
                      <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                      <span>Computer Maintenance & IT Solutions</span>
                    </div>

                    <h2 className="mt-2 text-2xl font-black text-foreground tracking-tight">
                      SAMSOJ
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      Computer Enterprise
                    </p>
                  </div>
                </div>

                {/* Direct Gateway Links */}
                <div className="mt-6 space-y-3">
                  <Link href="/maintenance" className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40 hover:bg-muted/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                      🌐
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Instant Remote PC Support
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Troubleshoot software, drivers & glitches online
                      </p>
                    </div>
                  </Link>

                  <Link href="/maintenance" className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40 hover:bg-muted/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                      🔄
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Windows 7 to 11 Pro Setup
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Starting from ₦10,000 with software setup
                      </p>
                    </div>
                  </Link>

                  <Link href="/products" className="flex items-center gap-3.5 rounded-2xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-primary/40 hover:bg-muted/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-xl">
                      🛒
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Certified Hardware & Laptops
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Browse laptops, desktops & accessories
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED PRODUCTS SHOWCASE GRID (HOMEPAGE SHOWCASE) */}
      <Section className="bg-background border-b border-border/80">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">
                <span>🛒 Product Showcase</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Hardware & IT Products
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-2xl">
                Browse our selection of business laptops, workstations, printers, CCTV kits, POS terminals, and accessories. Click any item to view complete details on the Products page.
              </p>
            </div>

            <Link href="/products">
              <Button size="sm" variant="outline" className="font-bold shrink-0">
                View Full Catalog →
              </Button>
            </Link>
          </div>

          {/* Product Grid */}
          {productsLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-3xl bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.filter((p) => p.featured).slice(0, 8).map((product) => (
                <Card
                  key={product.id}
                  interactive
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40"
                >
                  {/* Real Product Image with Badges */}
                  <div className="relative">
                    <ProductImage product={product} containerClass="h-44" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />

                    {product.badge && (
                      <span className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-accent border border-primary/20 shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    {product.sourceInfo && (
                      <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-blue-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white border border-blue-500/20 shadow-sm">
                        <span>✓</span> Verified
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {product.brand ? `${product.brand} · ` : ""}{product.category}
                    </p>

                    <h3 className="mt-1 text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      {product.pricingType === "fixed" && product.price ? (
                        <p className="text-base font-extrabold text-foreground">
                          {business.currencySymbol}{product.price.toLocaleString()}
                        </p>
                      ) : product.pricingType === "starting_from" && product.price ? (
                        <div>
                          <p className="text-[10px] text-muted-foreground">Starting from</p>
                          <p className="text-base font-extrabold text-foreground">
                            {business.currencySymbol}{product.price.toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs font-bold text-accent">📞 Contact for Price</p>
                      )}

                      <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                        product.status === "available" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                        product.status === "limited" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                        product.status === "available_on_request" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                        product.status === "enquire_for_availability" ? "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" :
                        "bg-red-500/10 text-red-600 border-red-500/20"
                      }`}>
                        {product.status === "available" ? "✅ In Stock" :
                         product.status === "limited" ? "⚡ Limited" :
                         product.status === "available_on_request" ? "📩 On Request" :
                         product.status === "enquire_for_availability" ? "📞 Enquire" :
                         "📞 Contact"}
                      </span>
                    </div>

                    {/* Action buttons linking to dedicated product details page */}
                    <div className="mt-4 flex gap-2">
                      <Link href={`/products?selected=${product.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full text-xs font-bold">
                          View Details →
                        </Button>
                      </Link>
                      <a
                        href={getProductWhatsAppUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" variant="whatsapp" className="text-xs font-bold px-3">
                          💬
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/products">
              <Button size="lg" className="font-bold gap-2">
                <span>Browse All Products in Hardware Store</span>
                <span>→</span>
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* 3. CENTRAL GATEWAY BANNER & DEPARTMENT HUBS */}
      <Section className="bg-muted/30 border-b border-border/80">
        <Container>
          {/* Banner message requested by user */}
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-8 shadow-md text-center max-w-4xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-accent border border-primary/20">
              <span>🏛️ Central Gateway</span>
            </div>
            <h2 className="mt-3 text-2xl font-black text-foreground sm:text-3xl">
              Explore Our Dedicated Products & Services
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Browse our products and explore our dedicated service sections to find exactly what you need. Click on any product or service to learn more on its dedicated page.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departmentHubs.map((hub) => (
              <Card
                key={hub.title}
                interactive
                className="flex flex-col justify-between border border-border/80 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/40"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                      {hub.icon}
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-accent">
                      {hub.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {hub.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {hub.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <Link href={hub.href} className="block w-full">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold justify-between">
                      <span>{hub.actionText}</span>
                      <span>→</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. WHY CHOOSE SAMSOJ */}
      <Section id="why-samsoj" className="bg-background">
        <Container>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              <span>⭐ Our Commitment</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Why partner with SAMSOJ
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
              We eliminate guesswork by delivering tested IT hardware, transparent pricing, and responsive technical support.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {business.reasons.map((reason, index) => (
              <Card
                key={reason.title}
                className="border border-border/80 bg-card p-6 transition-all duration-200 hover:border-primary/30"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary text-base font-extrabold text-primary-foreground shadow-md">
                  0{index + 1}
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {reason.title}
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Floating AI Assistant Widget */}
      <CustomerAssistant />
    </main>
  );
}