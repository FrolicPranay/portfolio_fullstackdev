"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Experience", href: "#experience" },
  { name: "Expertise", href: "#expertise" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-3 z-[100] w-[calc(100%-1rem)] -translate-x-1/2 transition-all duration-300 sm:top-5 ${
        scrolled ? "max-w-[520px]" : "max-w-[680px]"
      }`}
    >
      <div className="ui-panel relative flex items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-5 sm:py-3">
        <Link
          href="/"
          className="shrink-0 text-base font-black tracking-tighter transition-opacity hover:opacity-80 sm:text-lg"
          aria-label="Pranay Langhe home"
        >
          PL<span className="text-amber-500">.</span>
        </Link>
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-xs font-bold text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 sm:hidden"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
