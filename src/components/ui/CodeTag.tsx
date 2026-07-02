import { cn } from "@/lib/cn";

interface CodeTagProps {
  label: string;
  className?: string;
}

/** Decorative HTML-tag label (e.g. "<h1>") used as a visual accent. */
export function CodeTag({ label, className }: CodeTagProps) {
  return (
    <span aria-hidden className={cn("select-none text-xs text-neon/40", className)}>
      {label}
    </span>
  );
}
