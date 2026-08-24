"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { business } from "@/lib/config";
import { ProductImage } from "@/components/products/ProductImage";

const categoryTabs = [
  { id: "all", label: "All Products" },
  { id: "laptops-computers", label: "💻 Laptops & Computers" },
  { id: "printers-scanners", label: "🖨️ Printers & Scanners" },
  { id: "networking", label: "📡 Networking" },
  { id: "storage-hardware", label: "💾 Storage & Hardware" },
  { id: "cctv-security", label: "📹 CCTV & Security" },
  { id: "pos-equipment", label: "🧾 POS Systems" },
  { id: "accessories", label: "🖱️ Accessories" },
];

const statusStyles: Record<string, string> = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  limited: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  available_on_request: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  out_of_stock: "bg-red-500/10 text-red-600 border-red-500/20",
  enquire_for_availability: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  contact_for_price: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const statusLabels: Record<string, string> = {
  available: "✅ In Stock",
  limited: "⚡ Limited Stock",
  available_on_request: "📩 Available on Request",
  out_of_stock: "❌ Out of Stock",
  enquire_for_availability: "📞 Enquire for Availability",
  contact_for_price: "📞 Contact for Price",
};

interface ProductCatalogProps {
  onSelectProductForEnquiry?: (product: Product) => void;
}

import { useSearchParams } from "next/navigation";

export function ProductCatalog({ onSelectProductForEnquiry }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const selectedParam = searchParams.get("selected");
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products) {
          setProducts(data.products);
          if (selectedParam) {
            const found = data.products.find((p: Product) => p.id === selectedParam || p.slug === selectedParam);
            if (found) {
              setSelectedProduct(found);
            }
          }
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedParam]);

  const filtered = products.filter((p) => {
    const matchesTab = activeTab === "all" || p.categoryId === activeTab;
    const term = search.toLowerCase().trim();
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      (p.brand && p.brand.toLowerCase().includes(term)) ||
      (p.modelNumber && p.modelNumber.toLowerCase().includes(term)) ||
      (p.sku && p.sku.toLowerCase().includes(term)) ||
      (p.category && p.category.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      (p.specifications && p.specifications.some((s) => s.toLowerCase().includes(term)));

    return matchesTab && matchesSearch;
  });

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-card/40 to-background">
      <Container>
        {/* Visually Distinct Product Category & Filter Control Deck */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-card via-primary/5 to-card p-6 shadow-xl shadow-primary/5 backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-accent border border-primary/20">
                <span>🎯 Catalog Filtering</span>
              </div>
              <h2 className="mt-2 text-xl font-extrabold text-foreground">
                Browse & Filter Inventory
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Search laptops, desktops, printers, CCTV…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-base">🔍</span>
            </div>
          </div>

          {/* Category Tabs Deck */}
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Select Product Category:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all border ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-[1.02]"
                      : "bg-background/80 text-muted-foreground border-border/80 hover:border-primary/40 hover:text-foreground hover:bg-card"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center">
            <p className="text-4xl">📦</p>
            <p className="mt-3 font-bold text-foreground">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search ? `No matches for "${search}" in this category.` : "No products in this category yet."}
            </p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button size="sm" variant="outline">Make a Custom Enquiry →</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <Card
                key={product.id}
                interactive
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40 cursor-pointer"
              >
                {/* Product Real Image with fallback and badges */}
                <div className="relative">
                  <ProductImage product={product} containerClass="h-48" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />

                  {product.badge && (
                    <span className="absolute top-3 right-3 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-accent border border-primary/20 shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {product.featured && (
                    <span className="absolute top-3 left-3 rounded-full bg-amber-500/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-white border border-amber-500/20 shadow-sm">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {product.brand ? `${product.brand} · ` : ""}{product.category}
                  </p>

                  <h3 className="mt-1.5 text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
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
                        <p className="text-sm font-extrabold text-foreground">
                          {business.currencySymbol}{product.price.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs font-bold text-accent">Contact for Price</p>
                    )}

                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusStyles[product.status] || ""}`}
                    >
                      {statusLabels[product.status] || product.status}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      View Details
                    </Button>
                    <a
                      href={getProductWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
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

        {/* Admin link */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          Looking for something not listed?{" "}
          <Link href="/contact" className="font-bold text-primary hover:underline">
            Make a custom enquiry →
          </Link>
        </p>
      </Container>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Brand & Model Tags */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-accent border border-primary/20">
                {selectedProduct.category}
              </span>
              {selectedProduct.brand && (
                <span className="rounded-full bg-card px-2.5 py-0.5 text-[10px] font-bold text-foreground border border-border">
                  Brand: {selectedProduct.brand}
                </span>
              )}
              {selectedProduct.modelNumber && (
                <span className="rounded-full bg-card px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground border border-border">
                  Model: {selectedProduct.modelNumber}
                </span>
              )}
            </div>

            {/* Real Product Image in Modal */}
            <div className="mt-3">
              <ProductImage product={selectedProduct} containerClass="h-56" large sizes="(max-width: 768px) 100vw, 500px" />
            </div>

            <h2 className="mt-4 text-xl font-black text-foreground leading-snug">
              {selectedProduct.name}
            </h2>

            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Status & Verification */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[selectedProduct.status] || ""}`}>
                {statusLabels[selectedProduct.status] || selectedProduct.status}
              </span>

              {selectedProduct.sourceInfo && (
                selectedProduct.sourceInfo.manufacturerUrl ? (
                  <a
                    href={selectedProduct.sourceInfo.manufacturerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:bg-blue-500/20 transition-colors"
                  >
                    <span>✓</span>
                    <span>Verified Manufacturer Specs ↗</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                    <span>✓</span>
                    <span>Verified Specs</span>
                  </span>
                )
              )}
            </div>

            {/* Specifications */}
            {selectedProduct.specifications?.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                  Specifications
                </p>
                <ul className="space-y-1.5">
                  {selectedProduct.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 shrink-0 text-primary">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            <div className="mt-5 border-t border-border pt-4 flex items-center justify-between">
              {selectedProduct.pricingType === "fixed" && selectedProduct.price ? (
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-2xl font-extrabold text-foreground">
                    {business.currencySymbol}{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-base font-bold text-accent">Contact for Current Price</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={getProductWhatsAppUrl(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="whatsapp" className="w-full font-bold gap-2">
                  <span>💬</span>
                  <span>Enquire on WhatsApp</span>
                </Button>
              </a>

              <Link
                href={`/contact?product=${encodeURIComponent(selectedProduct.name)}&category=${encodeURIComponent(selectedProduct.category)}`}
                className="flex-1"
                onClick={() => {
                  setSelectedProduct(null);
                  onSelectProductForEnquiry?.(selectedProduct);
                }}
              >
                <Button variant="outline" className="w-full font-bold">
                  📩 Submit Enquiry Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
