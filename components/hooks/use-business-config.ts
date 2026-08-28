"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/config";
import type { BusinessConfig } from "@/types/admin";

/**
 * Client-side accessor for the saved BusinessConfig.
 *
 * Returns the static defaults immediately (so there is no layout flash) and
 * then re-fetches the live configuration from the settings API so the public
 * website automatically reflects changes made in Admin Settings.
 */
export function useBusinessConfig(): BusinessConfig {
  const [config, setConfig] = useState<BusinessConfig>(
    business as unknown as BusinessConfig
  );

  useEffect(() => {
    let active = true;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.success && data?.settings) {
          setConfig(data.settings as BusinessConfig);
        }
      })
      .catch(() => {
        // Keep the static fallback already in state.
      });
    return () => {
      active = false;
    };
  }, []);

  return config;
}
