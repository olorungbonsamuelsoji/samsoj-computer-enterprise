"use client";

import { useState, useEffect } from "react";
import { CustomerEnquiryRecord } from "@/types/admin";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<CustomerEnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetch("/api/admin/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success && data.enquiries) {
          setEnquiries(data.enquiries);
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

  const handleStatusChange = async (id: string, status: CustomerEnquiryRecord["status"]) => {
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer enquiry record?")) return;
    await fetch(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-extrabold text-foreground">Customer Enquiries Inbox</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Real-time audit log of all enquiries received through the website with 1-click WhatsApp quick replies.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading customer enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-xs text-muted-foreground">
          No customer enquiries logged yet. When customers submit the website enquiry form, they will appear here instantly.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => {
            const cleanPhone = enq.phone.replace(/\D/g, "");
            const waNumber = cleanPhone.startsWith("234") ? cleanPhone : cleanPhone.startsWith("0") ? `234${cleanPhone.slice(1)}` : `234${cleanPhone}`;
            const waText = encodeURIComponent(`Hello ${enq.name}, thank you for reaching out to SAMSOJ COMPUTER ENTERPRISE regarding "${enq.need}". How may we assist you today?`);
            const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

            return (
              <div key={enq.id} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="text-xs font-bold text-foreground">{enq.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({enq.phone})</span>
                    {enq.email && <span className="text-xs text-muted-foreground ml-2">• {enq.email}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{new Date(enq.createdAt).toLocaleString()}</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as CustomerEnquiryRecord["status"])}
                      className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground"
                    >
                      <option value="new">🔴 New</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="in_progress">🔵 In Progress</option>
                      <option value="resolved">🟢 Resolved</option>
                      <option value="archived">⚪ Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-accent">Topic / Need: {enq.need}</p>
                  {enq.productName && <p className="text-xs text-muted-foreground">Product: {enq.productName}</p>}
                  <p className="text-xs leading-relaxed text-foreground mt-2 bg-muted/40 p-3 rounded-xl border border-border/60">
                    {enq.message}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-foreground hover:brightness-105"
                    >
                      <span>💬</span>
                      <span>Reply on WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${enq.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted"
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(enq.id)}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Delete Record
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
