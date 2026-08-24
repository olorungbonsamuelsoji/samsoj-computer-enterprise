"use client";

import { useState, useEffect } from "react";
import { FAQItem } from "@/types/faq";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;
    fetch("/api/faqs?all=true")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success && data.faqs) {
          setFaqs(data.faqs);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) return;
    setSaving(true);
    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFaq),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingFaq(null);
        setRefreshTrigger((prev) => prev + 1);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/faqs?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Frequently Asked Questions (FAQs)</h1>
          <p className="text-xs text-muted-foreground">Manage customer questions on remote support, pricing, turnaround times, and repairs.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingFaq({ question: "", answer: "", category: "maintenance", isPublished: true, sortOrder: faqs.length + 1 });
            setIsModalOpen(true);
          }}
          className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:brightness-105"
        >
          + Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading FAQs...</div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-2xl border border-border bg-card p-4 flex justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-accent uppercase">{faq.category}</p>
                <h3 className="text-sm font-bold text-foreground mt-0.5">{faq.question}</h3>
                <p className="text-xs text-muted-foreground mt-1.5">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => { setEditingFaq({ ...faq }); setIsModalOpen(true); }}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(faq.id)}
                  className="rounded-lg bg-red-500/10 px-2.5 py-1.5 text-xs font-bold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-foreground mb-4">{editingFaq.id ? "Edit FAQ" : "Add FAQ"}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Question *</label>
                <input
                  type="text"
                  value={editingFaq.question || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  required
                  className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Answer *</label>
                <textarea
                  rows={4}
                  value={editingFaq.answer || ""}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-xl border border-border px-4 py-2 text-xs font-bold">Cancel</button>
                <button type="submit" disabled={saving} className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
