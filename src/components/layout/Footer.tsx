import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-hacker-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 px-6 py-8 sm:flex-row">
        <p className="text-xs text-slate-500">
          <span className="text-neon/60">© {new Date().getFullYear()}</span>{" "}
          {profile.name}
        </p>
        <p className="text-xs text-slate-500">
          Built with <span className="text-neon/80">Next.js</span> &{" "}
          <span className="text-neon/80">Tailwind CSS</span>
          <span aria-hidden className="ml-2 text-neon/40">
            {"// EOF"}
          </span>
        </p>
      </div>
    </footer>
  );
}
