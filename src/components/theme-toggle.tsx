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
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-neutral-300 active:scale-95 dark:border-white/10 dark:bg-neutral-900/90 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:border-white/20"
      aria-label="Toggle light and dark theme"
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        theme === "dark" 
          ? "bg-gradient-to-tr from-amber-500/10 to-orange-500/5 opacity-100" 
          : "bg-gradient-to-tr from-indigo-500/10 to-blue-500/5 opacity-100"
      }`} />

      <div className="relative h-5 w-5">
        {/* Sun Icon (shown in dark mode to switch to light) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
        }`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </div>

        {/* Moon Icon (shown in light mode to switch to dark) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "light" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </div>

      {/* Hover Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300 group-hover:border-amber-500/10 dark:group-hover:border-amber-400/10" />
    </button>
  );
}
