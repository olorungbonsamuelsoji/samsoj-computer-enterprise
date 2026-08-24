"use client";

import { useState, useEffect } from "react";
import { Product, PricingType, ProductStatus } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success && data.products) {
          setProducts(data.products);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [refreshTrigger]);

  const handleEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      name: "",
      slug: "",
      category: "Laptops & Computers",
      categoryId: "laptops-computers",
      description: "",
      specifications: ["Spec 1", "Spec 2"],
      price: 100000,
      pricingType: "fixed",
      status: "available",
      image: "/products/laptops.jpg",
      featured: true,
      badge: "New Arrival",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setMessage({ text: "Product deleted.", type: "success" });
      }
    } catch {
      setMessage({ text: "Failed to delete product.", type: "error" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Product saved successfully!", type: "success" });
        setIsModalOpen(false);
        setEditingProduct(null);
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch {
      setMessage({ text: "Failed to save product.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Hardware Catalog & Products Manager</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add new inventory, change prices, update hardware specifications, and manage featured badges.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:brightness-105 transition"
        >
          <span>+</span>
          <span>Add New Product</span>
        </button>
      </div>

      {message && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-600">
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {products.map((p) => (
            <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">{p.name}</h3>
                  {p.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-accent">{p.badge}</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{p.category} • Image: {p.image}</p>
                <p className="text-xs font-bold text-foreground mt-1">
                  {p.pricingType === "fixed" && p.price ? `₦${p.price.toLocaleString()}` : "Contact for Price"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/20 transition"
                >
                  Edit / Price
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.name)}
                  className="rounded-lg bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-3">
              {editingProduct.name ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSave} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Product Name *</label>
                <input
                  type="text"
                  value={editingProduct.name || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Category Name</label>
                  <input
                    type="text"
                    value={editingProduct.category || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    required
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Brand (e.g. HP, Dell, Canon)</label>
                  <input
                    type="text"
                    value={editingProduct.brand || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    placeholder="HP, Dell, TP-Link, Canon…"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Model Number</label>
                  <input
                    type="text"
                    value={editingProduct.modelNumber || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, modelNumber: e.target.value })}
                    placeholder="840 G6, Latitude 7490…"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">SKU / Item Code</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    placeholder="HP-EB840G6-01"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Pricing Type</label>
                  <select
                    value={editingProduct.pricingType || "fixed"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, pricingType: e.target.value as PricingType })}
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  >
                    <option value="fixed">Fixed Price (₦)</option>
                    <option value="starting_from">Starting From Price (₦)</option>
                    <option value="contact">Contact for Quote</option>
                    <option value="price_on_request">Price on Request</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Availability / Stock Status</label>
                  <select
                    value={editingProduct.status || "available"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as ProductStatus })}
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  >
                    <option value="available">✅ In Stock</option>
                    <option value="limited">⚡ Limited Stock</option>
                    <option value="available_on_request">📩 Available on Request</option>
                    <option value="enquire_for_availability">📞 Enquire for Availability</option>
                    <option value="contact_for_price">📞 Contact for Price</option>
                    <option value="out_of_stock">❌ Out of Stock</option>
                  </select>
                </div>
              </div>

              {(editingProduct.pricingType === "fixed" || editingProduct.pricingType === "starting_from") && (
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Price (₦ NGN)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value, 10) || 0 })}
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Local Image Path</label>
                  <input
                    type="text"
                    value={editingProduct.image || "/products/laptops.jpg"}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    placeholder="/products/laptops.jpg"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Direct Product Image URL</label>
                  <input
                    type="url"
                    value={editingProduct.imageUrl || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                    placeholder="https://... (Direct image link)"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Datasheet / Reference</label>
                  <input
                    type="text"
                    value={editingProduct.sourceInfo?.retailerSource || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        sourceInfo: {
                          ...(editingProduct.sourceInfo || {}),
                          retailerSource: e.target.value,
                          lastChecked: new Date().toISOString().split("T")[0],
                          checkedBy: "Admin User",
                        },
                      })
                    }
                    placeholder="Official HP Specs, Canon Datasheet…"
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Manufacturer URL</label>
                  <input
                    type="url"
                    value={editingProduct.sourceInfo?.manufacturerUrl || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        sourceInfo: {
                          ...(editingProduct.sourceInfo || {}),
                          manufacturerUrl: e.target.value,
                          lastChecked: new Date().toISOString().split("T")[0],
                          checkedBy: "Admin User",
                        },
                      })
                    }
                    placeholder="https://support.hp.com/..."
                    className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Specifications (one per line)</label>
                <textarea
                  rows={4}
                  value={editingProduct.specifications ? editingProduct.specifications.join("\n") : ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      specifications: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
