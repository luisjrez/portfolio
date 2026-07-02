"use client";

export function CommandHint() {
  const open = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="hidden items-center gap-1.5 rounded border border-hacker-border px-2 py-1 text-xs text-slate-500 transition-colors hover:border-neon/50 hover:text-neon sm:inline-flex"
    >
      <kbd className="font-sans">⌘</kbd>
      <kbd className="font-sans">K</kbd>
    </button>
  );
}
