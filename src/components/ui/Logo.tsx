import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
}

/** LJ monogram badge — a rounded neon square framing the initials. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="LJ"
      className={cn("h-8 w-8", className)}
    >
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        letterSpacing="1"
        fill="currentColor"
        style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
      >
        LJ
      </text>
    </svg>
  );
}
