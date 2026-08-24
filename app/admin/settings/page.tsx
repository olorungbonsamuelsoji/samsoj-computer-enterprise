"use client";

import { useState, useEffect } from "react";
import { BusinessConfig } from "@/types/admin";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<BusinessConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) setConfig(data.settings);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Business settings & announcement banner updated successfully!", type: "success" });
      }
    } catch {
      setMessage({ text: "Failed to update settings.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return <div className="text-center py-12 text-sm text-muted-foreground">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="border-b border-border pb-5">
        <h1 className="text-2xl font-extrabold text-foreground">Business Information & Announcement Bar</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Edit official contact numbers, email, business hours, and live website banner announcements.</p>
      </div>

      {message && (
        <div className={`rounded-xl p-3 text-xs font-bold ${
          message.type === "success" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" : "bg-red-500/10 text-red-600 border border-red-500/30"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Announcement Banner Box */}
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">📢 Live Website Announcement Banner</h2>
            <label className="flex items-center gap-2 text-xs font-bold text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={config.announcement?.enabled ?? false}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    announcement: {
                      message: config.announcement?.message || "Remote IT Support Available!",
                      badge: config.announcement?.badge || "Announcement",
                      linkText: config.announcement?.linkText || "Learn More",
                      linkUrl: config.announcement?.linkUrl || "#remote-support",
                      enabled: e.target.checked,
                    },
                  })
                }
                className="size-4 rounded"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Banner Message</label>
              <input
                type="text"
                value={config.announcement?.message || ""}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    announcement: { ...config.announcement, message: e.target.value, enabled: config.announcement?.enabled ?? true },
                  })
                }
                placeholder="e.g. Special Discount: Computer Formatting starting from ₦10,000 this week!"
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Badge Label</label>
                <input
                  type="text"
                  value={config.announcement?.badge || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: {
                        message: config.announcement?.message || "Remote IT Support Available!",
                        badge: e.target.value,
                        linkText: config.announcement?.linkText,
                        linkUrl: config.announcement?.linkUrl,
                        enabled: config.announcement?.enabled ?? true,
                      },
                    })
                  }
                  placeholder="e.g. Remote Support Ready"
                  className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Button Text</label>
                <input
                  type="text"
                  value={config.announcement?.linkText || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      announcement: {
                        message: config.announcement?.message || "Remote IT Support Available!",
                        badge: config.announcement?.badge,
                        linkText: e.target.value,
                        linkUrl: config.announcement?.linkUrl,
                        enabled: config.announcement?.enabled ?? true,
                      },
                    })
                  }
                  placeholder="e.g. Get Remote Support"
                  className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-sm font-bold text-foreground">Official Business Contacts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">WhatsApp Number</label>
              <input
                type="text"
                value={config.whatsApp || ""}
                onChange={(e) => setConfig({ ...config, whatsApp: e.target.value })}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-muted-foreground">Direct Phone</label>
              <input
                type="text"
                value={config.phone || ""}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Business Email</label>
              <input
                type="email"
                value={config.email || ""}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Opening Hours</label>
              <input
                type="text"
                value={config.hours || ""}
                onChange={(e) => setConfig({ ...config, hours: e.target.value })}
                className="mt-1 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-md hover:brightness-105 transition disabled:opacity-50"
        >
          {saving ? "Saving Business Settings..." : "Save Business Settings"}
        </button>
      </form>
    </div>
  );
}
