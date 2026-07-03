"use client";

import { useCallback, useEffect, useState } from "react";
import { SnakeGame } from "@/components/ui/SnakeGame";
import { useKonamiCode } from "@/lib/use-konami-code";

/**
 * Hidden easter egg: entering the Konami code (↑↑↓↓←→←→) opens a
 * matrix-styled Snake game in an overlay.
 */
export function KonamiSnake() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  useKonamiCode(open);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-lg border border-neon/40 bg-hacker-surface p-5 shadow-neon"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-2 border-b border-hacker-border pb-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-flame/70" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-neon/70" />
          <span className="ml-2 text-xs text-slate-500">
            luis@portfolio — ./snake
          </span>
        </div>
        <SnakeGame />
      </div>
    </div>
  );
}
