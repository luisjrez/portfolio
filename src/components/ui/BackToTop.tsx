"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 600;

/** Floating "cd ~/" button that appears after scrolling down. */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={cn(
        "fixed right-6 bottom-6 z-30 cursor-pointer rounded border border-neon/40 bg-hacker-surface px-3 py-2 text-xs text-neon transition-all duration-300 hover:border-neon hover:shadow-neon active:scale-95 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      cd ~/
    </button>
  );
}
