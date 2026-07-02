interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-block rounded border border-neon/25 bg-neon/5 px-2.5 py-1 text-xs text-neon/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-neon/60 hover:text-neon hover:shadow-neon motion-reduce:transition-none motion-reduce:hover:transform-none">
      {label}
    </span>
  );
}
