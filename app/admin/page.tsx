"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    servicesCount: 0,
    productsCount: 0,
    enquiriesCount: 0,
    faqsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [sRes, pRes, eRes, fRes] = await Promise.all([
          fetch("/api/services?all=true"),
          fetch("/api/products"),
          fetch("/api/admin/enquiries"),
          fetch("/api/faqs?all=true"),
        ]);
        const [sData, pData, eData, fData] = await Promise.all([
          sRes.json(),
          pRes.json(),
          eRes.json(),
          fRes.json(),
        ]);

        setStats({
          servicesCount: sData.services?.length || 0,
          productsCount: pData.products?.length || 0,
          enquiriesCount: eData.enquiries?.length || 0,
          faqsCount: fData.faqs?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-accent/10 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-accent">
              <span>🛡️</span> Live Content Management System
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              SAMSOJ Business Control Center
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Update services, change starting prices, manage hardware products, and review customer enquiries without touching source code.
            </p>
          </div>
          <Link
            href="/admin/services"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-md hover:brightness-105 transition"
          >
            <span>🛠️</span>
            <span>Manage Services & Prices</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Services</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{loading ? "..." : stats.servicesCount}</p>
          <Link href="/admin/services" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">Edit prices & services →</Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Catalog Products</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{loading ? "..." : stats.productsCount}</p>
          <Link href="/admin/products" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">Edit products & inventory →</Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Logged Enquiries</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{loading ? "..." : stats.enquiriesCount}</p>
          <Link href="/admin/enquiries" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">Open customer inbox →</Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live FAQs</p>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{loading ? "..." : stats.faqsCount}</p>
          <Link href="/admin/faqs" className="mt-2 inline-block text-xs font-semibold text-accent hover:underline">Manage questions →</Link>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span>⚡</span> Quick Price & Service Actions
          </h2>
          <div className="mt-4 space-y-3">
            <Link
              href="/admin/services"
              className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/50 transition text-xs font-medium"
            >
              <div>
                <p className="font-bold text-foreground">Computer Formatting Price</p>
                <p className="text-muted-foreground">Change baseline starting price (e.g. from ₦10,000 to ₦15,000)</p>
              </div>
              <span className="text-accent font-bold">Edit →</span>
            </Link>

            <Link
              href="/admin/services"
              className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/50 transition text-xs font-medium"
            >
              <div>
                <p className="font-bold text-foreground">Add New Service</p>
                <p className="text-muted-foreground">e.g. Remote Printer Troubleshooting, Data Recovery</p>
              </div>
              <span className="text-accent font-bold">+ Add →</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted/50 transition text-xs font-medium"
            >
              <div>
                <p className="font-bold text-foreground">Announcement Banner</p>
                <p className="text-muted-foreground">Post promotions, remote support announcements, or holiday alerts</p>
              </div>
              <span className="text-accent font-bold">Update →</span>
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <span>🛡️</span> Data Safety & Backup Controls
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Every time you modify services, products, or settings, the CMS automatically takes a safety snapshot. You can restore previous versions at any time.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/admin/backups"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground shadow-sm hover:brightness-105 transition"
            >
              <span>🔄</span>
              <span>Open Snapshot & Rollback Center</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition"
            >
              <span>🌐</span>
              <span>Preview Live Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
