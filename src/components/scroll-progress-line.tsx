"use client";

import { useEffect, useMemo, useState } from "react";

export default function ScrollProgressLine() {
  const [sectionPoints, setSectionPoints] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-scroll-root]");
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scroll-section]")
    );
    if (!sections.length) return;

    const calculatePoints = () => {
      const rootTop = root.getBoundingClientRect().top + window.scrollY;
      const points = sections.map((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return sectionTop - rootTop;
      });
      setSectionPoints(points);
    };

    calculatePoints();
    window.addEventListener("resize", calculatePoints);

    const visibleIndexes = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index === -1) continue;

          if (entry.isIntersecting) {
            visibleIndexes.add(index);
          } else {
            visibleIndexes.delete(index);
          }
        }

        if (!visibleIndexes.size) return;

        // Activate the newest (lowest) visible section immediately
        const nextIndex = Math.max(...Array.from(visibleIndexes));
        setActiveIndex(nextIndex);
      },
      {
        threshold: [0.1, 0.2, 0.3], // Wait slightly longer for cleaner activation
        rootMargin: "0px 0px -20% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    const resizeObserver = new ResizeObserver(() => calculatePoints());
    resizeObserver.observe(root);
    sections.forEach((section) => resizeObserver.observe(section));

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculatePoints);
    };
  }, []);

  const lineHeight = useMemo(() => {
    if (!sectionPoints.length) return 0;
    return sectionPoints[sectionPoints.length - 1];
  }, [sectionPoints]);

  const progressHeight = useMemo(() => {
    if (!sectionPoints.length) return 0;
    return sectionPoints[Math.min(activeIndex, sectionPoints.length - 1)] ?? 0;
  }, [activeIndex, sectionPoints]);

  return (
    <>
      {/* BACKGROUND LAYER: The Track Line (Hidden inside sections) */}
      <div className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 pointer-events-none justify-center overflow-visible sm:flex z-0">
        <div
          className="relative w-[1px] bg-neutral-200/40 dark:bg-neutral-800/40"
          style={{ height: lineHeight || "100%" }}
        >
          {/* Main Progress Line */}
          <div
            className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-sky-400 via-pink-500 to-amber-400 shadow-[0_0_8px_rgba(236,72,153,0.2)]"
            style={{
              height: progressHeight,
              transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </div>

      {/* FOREGROUND LAYER: The Markers & Glows (Always visible on top) */}
      <div className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 pointer-events-none justify-center overflow-visible sm:flex z-[100]">
        <div 
          className="relative w-full"
          style={{ height: lineHeight || "100%" }}
        >
          {/* Active Tip Glow - Larger and more vibrant */}
          <div
            className="absolute left-1/2 h-24 w-12 -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-400/20 via-pink-500/20 to-amber-400/20 blur-2xl transition-opacity duration-500"
            style={{
              top: progressHeight,
              opacity: activeIndex === 0 ? 0 : 1,
              transform: `translate(-50%, -50%)`,
              transition: "top 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s",
            }}
          />

          {/* Traveling Bead tip - "The Guiding Light" */}
          <div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(251,191,36,0.6)] ring-1 ring-amber-400/50 transition-opacity duration-500 flex items-center justify-center"
            style={{
              top: progressHeight,
              opacity: activeIndex === 0 ? 0 : 1,
              transition: "top 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s",
            }}
          >
             <div className="h-1 w-1 rounded-full bg-amber-400 animate-pulse" />
          </div>

          {sectionPoints.map((point, index) => {
            if (index === 0) return null;
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <div
                key={`${point}-${index}`}
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out flex items-center justify-center ${
                  isActive
                    ? "h-5 w-5 scale-110"
                    : isCompleted
                      ? "h-3 w-3"
                      : "h-2.5 w-2.5"
                }`}
                style={{ top: point }}
              >
                {/* Glassmorphic Outer Ring */}
                <div className={`absolute inset-0 rounded-full border transition-all duration-500 ${
                  isActive 
                    ? "border-amber-400/80 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.4)]" 
                    : isCompleted
                      ? "border-pink-500/30 bg-white/5 backdrop-blur-[2px]"
                      : "border-neutral-300/30 bg-neutral-200/5 dark:border-neutral-700/30"
                }`} />

                {/* Inner Core */}
                <div className={`rounded-full transition-all duration-500 ${
                  isActive
                    ? "h-2 w-2 bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                    : isCompleted
                      ? "h-1.5 w-1.5 bg-pink-500/60"
                      : "h-1 w-1 bg-neutral-300/40 dark:bg-neutral-700/40"
                }`} />

                {/* Active Pulsing Aura */}
                {isActive && (
                  <>
                    <div className="absolute inset-[-6px] animate-[ping_2.5s_linear_infinite] rounded-full border border-amber-400/30" />
                    <div className="absolute inset-[-12px] animate-[ping_4s_linear_infinite] rounded-full border border-sky-400/10" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
