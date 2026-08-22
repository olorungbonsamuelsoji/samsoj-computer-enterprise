"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { categories, products } from "@/lib/products";
import { business } from "@/lib/config";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ProductCatalogProps {
  onSelectProductForEnquiry?: (product: Product) => void;
}

export function ProductCatalog({
  onSelectProductForEnquiry,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categoryId === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.specifications.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleEnquireProduct = (product: Product) => {
    if (onSelectProductForEnquiry) {
      onSelectProductForEnquiry(product);
    }
    const element = document.getElementById("enquire");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="products" className="py-20 lg:py-28">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
              <span>📦</span> Verified Hardware & Equipment
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Technology Catalogue
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
              Explore authentic desktop PCs, laptops, printers, networking hardware, CCTV security kits, and accessories backed by SAMSOJ support.
            </p>
          </div>

          {/* Live Search */}
          <div className="w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-card px-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
              <span className="absolute left-3.5 top-3 text-muted-foreground text-sm">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Showing <strong className="text-foreground">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "product" : "products"}
            {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </p>
          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="font-medium text-accent hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-4xl">🔍</p>
            <h3 className="mt-4 text-lg font-bold text-foreground">
              No matching products found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any item matching &ldquo;{searchQuery}&rdquo;. Don&apos;t worry — we can source it for you directly!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Clear Search
              </Button>
              <a
                href={getProductWhatsAppUrl({
                  id: "custom-request",
                  name: searchQuery || "Custom Equipment Request",
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp">Ask on WhatsApp</Button>
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const whatsappUrl = getProductWhatsAppUrl(product);

              return (
                <Card
                  key={product.id}
                  interactive
                  className="flex flex-col justify-between overflow-hidden border border-border/80 bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/30"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-primary/95 backdrop-blur px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-md">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <CardContent className="p-5">
                      {/* Category & Pricing */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                          {product.category}
                        </span>

                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-muted text-foreground">
                          {product.pricingType === "fixed" && product.price
                            ? `${business.currencySymbol}${product.price.toLocaleString()}`
                            : "Quote on Request"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-2.5 text-base font-bold leading-snug text-foreground line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>

                      {/* Specification snippets */}
                      <div className="mt-3 space-y-1 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
                        {product.specifications.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="text-accent font-bold">•</span>
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveModalProduct(product)}
                        className="mt-2 text-[11px] font-semibold text-primary hover:underline block"
                      >
                        View Full Specifications ({product.specifications.length}) →
                      </button>
                    </CardContent>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0">
                    <div className="grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs font-semibold"
                        onClick={() => handleEnquireProduct(product)}
                      >
                        Enquire
                      </Button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          size="sm"
                          variant="whatsapp"
                          className="w-full text-xs font-semibold gap-1.5"
                        >
                          <span>💬</span>
                          <span>WhatsApp</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Product Quick View / Specification Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
              onClick={() => setActiveModalProduct(null)}
              aria-hidden="true"
            />

            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {activeModalProduct.category}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                    {activeModalProduct.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {activeModalProduct.pricingType === "fixed" && activeModalProduct.price
                      ? `Price: ${business.currencySymbol}${activeModalProduct.price.toLocaleString()}`
                      : "Pricing: Contact Us for Current Quote"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeModalProduct.description}
                </p>

                <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-foreground">
                  Technical Specifications
                </h4>

                <ul className="mt-3 space-y-2 rounded-2xl bg-muted/40 p-4 border border-border/60 text-xs sm:text-sm text-foreground">
                  {activeModalProduct.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={() => {
                      const prod = activeModalProduct;
                      setActiveModalProduct(null);
                      handleEnquireProduct(prod);
                    }}
                  >
                    Send Website Enquiry
                  </Button>

                  <a
                    href={getProductWhatsAppUrl(activeModalProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="whatsapp" size="lg" className="w-full gap-2">
                      <span>💬</span>
                      <span>Order on WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
