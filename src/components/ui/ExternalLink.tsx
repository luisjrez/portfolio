interface ExternalLinkProps {
  href: string;
  label: string;
}

export function ExternalLink({ href, label }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-sm font-medium text-neon/80 transition-colors hover:text-neon"
    >
      <span aria-hidden className="text-neon/40">
        {"["}
      </span>
      {label}
      <span aria-hidden className="text-neon/40">
        {"]"}
      </span>
      <span
        aria-hidden
        className="text-xs transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}
