"use client";

import { useCallback } from "react";
import { useKonamiCode } from "@/lib/use-konami-code";

/**
 * Listens for the Konami code (↑↑↓↓←→←→) and, when entered, scrolls to the
 * top and dispatches `hero-snake:start` so the hero terminal boots Snake.
 */
export function KonamiListener() {
  const onUnlock = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new Event("hero-snake:start"));
  }, []);

  useKonamiCode(onUnlock);
  return null;
}
