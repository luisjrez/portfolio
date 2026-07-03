"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";

interface HistoryEntry {
  input: string;
  output: string[];
}

const SECTIONS = ["experience", "projects", "skills", "contact"] as const;

const HELP_LINES = [
  "Available commands:",
  "  help        show this message",
  "  whoami      about me",
  "  skills      list skill groups",
  "  goto <sec>  jump to a section (experience, projects, skills, contact)",
  "  cv          download my résumé",
  "  social      show my links",
  "  clear       clear the screen",
  "  exit        close the palette",
];

function runCommand(
  raw: string,
  close: () => void,
): { output: string[]; clear?: boolean } {
  const [command, ...args] = raw.trim().split(/\s+/);
  switch (command.toLowerCase()) {
    case "":
      return { output: [] };
    case "help":
      return { output: HELP_LINES };
    case "whoami":
      return { output: [`${profile.name} — ${profile.role}`, profile.headline] };
    case "skills":
      return {
        output: [
          "Mobile · Frontend · Backend & Data · Platforms & DevOps · AI Engineering",
          "Run `goto skills` to see the full list.",
        ],
      };
    case "goto": {
      const target = args[0]?.toLowerCase();
      if (target && SECTIONS.includes(target as (typeof SECTIONS)[number])) {
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth" });
        close();
        return { output: [`Jumping to #${target}...`] };
      }
      return { output: [`Unknown section. Try: ${SECTIONS.join(", ")}`] };
    }
    case "cv":
      window.open(withBasePath(profile.resumeUrl), "_blank");
      return { output: ["Opening résumé..."] };
    case "social":
      return {
        output: [
          `email   ${profile.email}`,
          ...profile.socialLinks.map((link) => `${link.label.toLowerCase().padEnd(8)}${link.href}`),
        ],
      };
    case "clear":
      return { output: [], clear: true };
    case "exit":
      close();
      return { output: [] };
    default:
      return { output: [`command not found: ${command} — try \`help\``] };
  }
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setValue("");
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      } else if (event.key === "Escape") {
        close();
      }
    };
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = runCommand(value, close);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { input: value, output: result.output }]);
    }
    setValue("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-neon/40 bg-hacker-surface shadow-neon"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-hacker-border px-4 py-2.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-amber-flame/70" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-neon/70" />
          <span className="ml-2 text-xs text-slate-500">
            luis@portfolio — type `help`
          </span>
        </div>
        <div
          ref={scrollRef}
          className="max-h-[40vh] space-y-2 overflow-y-auto px-4 py-4 text-sm"
        >
          {history.length === 0 && (
            <p className="text-slate-500">
              Type a command and hit enter. Try{" "}
              <span className="text-neon">help</span>.
            </p>
          )}
          {history.map((entry, index) => (
            <div key={index}>
              <p className="text-slate-300">
                <span className="text-neon">$ </span>
                {entry.input}
              </p>
              {entry.output.map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className="whitespace-pre-wrap break-words text-slate-400"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-hacker-border px-4 py-3"
        >
          <span aria-hidden className="text-neon">
            $
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command"
            data-terminal-input
            className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
            placeholder="help"
          />
        </form>
      </div>
    </div>
  );
}
