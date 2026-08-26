"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [passkey, setPasskey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Invalid passkey.");
      }
    } catch {
      setError("Login network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <div className="relative mx-auto size-20 overflow-hidden rounded-2xl bg-background border border-border p-1 shadow-sm">
            <Image src="/logo.png" alt="SAMSOJ Logo" fill className="object-contain p-1" sizes="80px" priority />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground">SAMSOJ CMS</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">
            Administrator Authentication
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs font-bold text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="passkey" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Admin Passkey
            </label>
            <input
              id="passkey"
              type="password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              required
              placeholder="Enter administrator passkey..."
              className="mt-1.5 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Enter the administrator passkey provided to you.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:brightness-105 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Unlock Admin Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
