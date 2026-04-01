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
        return sectionTop - rootTop + section.offsetHeight / 2;
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
        // so the line reaches a section as soon as it enters viewport.
        const nextIndex = Math.max(...Array.from(visibleIndexes));
        setActiveIndex(nextIndex);
      },
      {
        threshold: [0.01, 0.08, 0.15],
        rootMargin: "20% 0px -45% 0px",
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
    <div className="absolute bottom-0 left-1/2 top-0 hidden w-[2px] -translate-x-1/2 sm:flex pointer-events-none z-[-1] justify-center overflow-visible">
      <div
        className="relative w-[2px] bg-neutral-200/80 dark:bg-neutral-800/80"
        style={{ height: lineHeight || "100%" }}
      >
        <div
          className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-sky-400 via-pink-500 to-amber-400 shadow-[0_0_15px_rgba(236,72,153,0.55)] dark:shadow-[0_0_18px_rgba(236,72,153,0.75)]"
          style={{
            height: progressHeight,
            transition: "height 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {sectionPoints.map((point, index) => (
          <div
            key={`${point}-${index}`}
            className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-1000 ${
              index < activeIndex
                ? "border-pink-400/60 bg-white shadow-[0_0_8px_rgba(236,72,153,0.2)] dark:bg-neutral-900"
                : index === activeIndex
                  ? "border-amber-400 bg-white shadow-[0_0_12px_rgba(251,191,36,0.4)] dark:bg-neutral-900"
                  : "border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900"
            }`}
            style={{ top: point }}
          />
        ))}
      </div>
    </div>
  );
}
