"use client";

import { useState, useEffect } from "react";
import { BackupSnapshot } from "@/types/admin";

export default function AdminBackupsPage() {
  const [snapshots, setSnapshots] = useState<BackupSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const loadSnapshots = async () => {
    try {
      const res = await fetch("/api/admin/backup");
      const data = await res.json();
      if (data.success && data.snapshots) setSnapshots(data.snapshots);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSnapshots(); }, []);

  const handleCreateSnapshot = async () => {
    const label = prompt("Enter a label for this backup snapshot:", "Manual Snapshot Before Major Change");
    if (!label) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", label }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Backup snapshot created successfully!", type: "success" });
        await loadSnapshots();
      }
    } finally {
      setCreating(false);
    }
  };

  const handleRestore = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to restore the snapshot "${label}"? This will rollback all services, products, and settings to that point.`)) return;
    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", snapshotId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Data restored successfully! The website is updated.", type: "success" });
      }
    } catch {
      setMessage({ text: "Failed to restore snapshot.", type: "error" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Data Backups & Rollback Center</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Recover previous versions of services, products, prices, and settings with 1 click.</p>
        </div>
        <button
          type="button"
          onClick={handleCreateSnapshot}
          disabled={creating}
          className="rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground shadow-md hover:brightness-105 disabled:opacity-50"
        >
          {creating ? "Creating Snapshot..." : "+ Create Manual Backup"}
        </button>
      </div>

      {message && (
        <div className={`rounded-xl p-3 text-xs font-bold ${
          message.type === "success" ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30" : "bg-red-500/10 text-red-600 border border-red-500/30"
        }`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading snapshots...</div>
      ) : snapshots.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-xs text-muted-foreground">
          No manual snapshots taken yet. Click &quot;+ Create Manual Backup&quot; above to record your current state.
        </div>
      ) : (
        <div className="space-y-3">
          {snapshots.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">{s.label || "Automated Snapshot"}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Created: {new Date(s.createdAt).toLocaleString()} • Snapshot ID: <code className="text-[10px]">{s.id}</code>
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRestore(s.id, s.label)}
                className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 self-start sm:self-center"
              >
                🔄 1-Click Rollback / Restore
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
