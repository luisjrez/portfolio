"use client";

import { useEffect, useState } from "react";

export interface TerminalLine {
  kind: "command" | "output";
  text: string;
}

interface TerminalProps {
  host: string;
  lines: TerminalLine[];
  typingMs?: number;
  commandPauseMs?: number;
  outputPauseMs?: number;
}

function Prompt() {
  return <span className="text-neon">$ </span>;
}

/** Terminal window that replays its lines like a live session: commands are
 * typed character by character, outputs are printed after a short beat. */
export function Terminal({
  host,
  lines,
  typingMs = 45,
  commandPauseMs = 400,
  outputPauseMs = 550,
}: TerminalProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const isDone = lineIndex >= lines.length;

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      const skip = setTimeout(() => setLineIndex(lines.length), 0);
      return () => clearTimeout(skip);
    }
    if (lineIndex >= lines.length) {
      return;
    }

    const line = lines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (line.kind === "command" && charCount < line.text.length) {
      timeout = setTimeout(() => setCharCount((count) => count + 1), typingMs);
    } else {
      timeout = setTimeout(
        () => {
          setLineIndex((index) => index + 1);
          setCharCount(0);
        },
        line.kind === "command" ? commandPauseMs : outputPauseMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [lineIndex, charCount, lines, typingMs, commandPauseMs, outputPauseMs]);

  const currentLine = isDone ? null : lines[lineIndex];

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-hacker-border bg-hacker-surface">
      <div className="flex items-center gap-2 border-b border-hacker-border px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-flame/70" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-neon/70" />
        <span className="ml-2 text-xs text-slate-500">{host}</span>
      </div>
      <div className="space-y-3 px-4 py-4 text-sm leading-relaxed" aria-live="polite">
        {lines.slice(0, lineIndex).map((line) =>
          line.kind === "command" ? (
            <p key={line.text}>
              <Prompt />
              <span className="text-slate-300">{line.text}</span>
            </p>
          ) : (
            <p key={line.text} className="animate-fade-in text-slate-400">
              {line.text}
            </p>
          ),
        )}
        {currentLine?.kind === "command" && (
          <p>
            <Prompt />
            <span className="text-slate-300">
              {currentLine.text.slice(0, charCount)}
            </span>
            <span aria-hidden className="animate-blink text-neon">
              ▊
            </span>
          </p>
        )}
        {isDone && (
          <p>
            <Prompt />
            <span aria-hidden className="animate-blink text-neon">
              ▊
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
