"use client";

import { useEffect, useRef } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
];

/**
 * Fires `onUnlock` when the Konami code (↑↑↓↓←→←→) is entered.
 * Ignores keystrokes while the user is typing in an input/textarea.
 */
export function useKonamiCode(onUnlock: () => void) {
  const progressRef = useRef(0);
  const callbackRef = useRef(onUnlock);

  useEffect(() => {
    callbackRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return;
      }

      const expected = KONAMI_SEQUENCE[progressRef.current];
      if (event.key === expected) {
        progressRef.current += 1;
        if (progressRef.current === KONAMI_SEQUENCE.length) {
          progressRef.current = 0;
          callbackRef.current();
        }
      } else {
        // Allow a wrong key to still start a fresh attempt.
        progressRef.current = event.key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}
