"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme ?? (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white text-neutral-700 transition-all duration-200 hover:border-pink-300/70 hover:bg-neutral-50 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-amber-300/40 dark:hover:bg-neutral-800"
      aria-label="Toggle light and dark theme"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-300" aria-hidden="true">
            <path
              d="M12 3.75V2m0 20v-1.75M4.75 12H3m18 0h-1.75M6.88 6.88 5.64 5.64m12.72 12.72-1.24-1.24m0-10.48 1.24-1.24M6.88 17.12l-1.24 1.24M12 17.25a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 0 1 0 10.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-500" aria-hidden="true">
            <path
              d="M21 14.25A8.25 8.25 0 0 1 9.75 3a8.25 8.25 0 1 0 11.25 11.25Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
