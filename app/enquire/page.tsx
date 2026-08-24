"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnquirePageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact");
  }, [router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center text-center p-6">
      <div>
        <p className="text-lg font-bold text-foreground">Redirecting to Contact & Enquire…</p>
        <p className="text-xs text-muted-foreground mt-1">Please wait while we transfer you to our main contact and enquiry portal.</p>
      </div>
    </div>
  );
}
