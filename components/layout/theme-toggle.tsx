"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  const savedTheme = localStorage.getItem("theme");

  return savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "system"
    ? savedTheme
    : "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function cycleTheme() {
    const nextTheme: Theme =
      theme === "light"
        ? "dark"
        : theme === "dark"
          ? "system"
          : "light";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  const label =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Use system theme"
        : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
