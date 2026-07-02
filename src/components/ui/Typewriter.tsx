"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}

/** Cycles through phrases with a terminal-style typing/deleting animation. */
export function Typewriter({
  phrases,
  typingMs = 65,
  deletingMs = 30,
  pauseMs = 2000,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex % phrases.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === phrase) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      }, typingMs);
    } else {
      timeout = setTimeout(
        () => {
          const nextLength = text.length + (isDeleting ? -1 : 1);
          setText(phrase.slice(0, nextLength));
        },
        isDeleting ? deletingMs : typingMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingMs, deletingMs, pauseMs]);

  return (
    <span>
      {text}
      <span aria-hidden className="animate-blink text-neon">
        ▊
      </span>
    </span>
  );
}
