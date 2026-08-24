"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "📊 Dashboard", href: "/admin" },
  { label: "🛠️ Services & Pricing", href: "/admin/services" },
  { label: "📦 Products Catalog", href: "/admin/products" },
  { label: "💬 Customer Enquiries", href: "/admin/enquiries" },
  { label: "❓ FAQs Manager", href: "/admin/faqs" },
  { label: "⚙️ Business Settings", href: "/admin/settings" },
  { label: "🔄 Backup & Rollback", href: "/admin/backups" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (pathname === "/admin/login") {
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (!isMounted) return;
        if (!data.authenticated) {
          router.replace("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        if (isMounted) router.replace("/admin/login");
      }
    }
    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground text-sm">
        Verifying administrator session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="border-b border-border pb-5">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-base font-extrabold tracking-tight text-foreground">SAMSOJ</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Admin Control Panel</p>
              </div>
            </Link>
          </div>

          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition"
          >
            <span>🌐</span>
            <span>View Public Website</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
          >
            <span>🔒</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header Bar */}
        <header className="flex md:hidden items-center justify-between border-b border-border bg-card p-4">
          <div className="font-bold text-sm text-foreground">SAMSOJ CMS</div>
          <div className="flex gap-2">
            <Link href="/" target="_blank" className="text-xs font-semibold text-primary px-2 py-1">View Site</Link>
            <button onClick={handleLogout} className="text-xs font-bold text-red-500 px-2 py-1">Logout</button>
          </div>
        </header>

        {/* Mobile Nav Pills */}
        <div className="flex md:hidden overflow-x-auto gap-2 p-3 bg-muted/40 border-b border-border">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold ${
                pathname === item.href ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="p-6 sm:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
