import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/data/navigation";
import type { NavItem } from "@/types/portfolio";

function HeaderNavLink({ item, index }: { item: NavItem; index: number }) {
  const orderLabel = `//${String(index + 1).padStart(2, "0")}.`;
  return (
    <a
      href={item.href}
      className="group relative text-xs text-slate-400 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-neon after:transition-transform after:duration-300 hover:text-neon hover:after:scale-x-100 motion-reduce:after:transition-none sm:text-sm"
    >
      <span className="mr-1 text-neon/50 transition-colors group-hover:text-neon/80">
        {orderLabel}
      </span>
      {`<${item.label}/>`}
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-hacker-border bg-hacker-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-center px-6 py-4 sm:justify-between">
        <a
          href="#top"
          aria-label="Back to top"
          className="hidden text-neon transition-all hover:text-glow hover:drop-shadow-[0_0_10px_rgba(0,230,138,0.6)] sm:flex sm:items-center"
        >
          <Logo />
        </a>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:gap-x-6">
          {navItems.map((item, index) => (
            <HeaderNavLink key={item.href} item={item} index={index} />
          ))}
        </nav>
      </div>
    </header>
  );
}
