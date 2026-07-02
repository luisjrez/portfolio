import { CodeTag } from "@/components/ui/CodeTag";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Terminal, type TerminalLine } from "@/components/ui/Terminal";
import { Typewriter } from "@/components/ui/Typewriter";
import { Stats } from "@/components/sections/Stats";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";

const terminalLines: TerminalLine[] = [
  { kind: "command", text: "cat about.txt" },
  { kind: "output", text: profile.bio },
  { kind: "command", text: "echo $LOCATION" },
  { kind: "output", text: profile.location },
];

export function Hero() {
  return (
    <section id="top" className="pt-20 pb-12">
      <span className="inline-flex items-center gap-2 rounded border border-neon/25 bg-neon/5 px-3 py-1 text-xs font-medium text-neon/90">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
        </span>
        {profile.availability}
      </span>
      <p className="mt-8 text-sm text-slate-400">
        <CodeTag label="<p>" /> <span className="text-neon">This is</span>{" "}
        <CodeTag label="</p>" />
      </p>
      <div className="mt-2">
        <CodeTag label="<h1>" className="block" />
        <h1 className="glitch-hover my-1 w-fit cursor-default pl-6 text-5xl font-bold tracking-tight text-slate-100 text-glow sm:text-6xl">
          {profile.name}
        </h1>
        <CodeTag label="</h1>" className="block" />
      </div>
      <p className="mt-6 text-lg text-neon sm:text-xl">
        <span aria-hidden className="text-neon/50">
          {"> "}
        </span>
        <Typewriter phrases={profile.taglines} />
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">
        {profile.headline}
      </p>
      <Terminal host="luis@portfolio:~" lines={terminalLines} />
      <div className="mt-8 flex flex-wrap items-center gap-6">
        <a
          href={`mailto:${profile.email}`}
          className="rounded border border-neon bg-neon px-5 py-2.5 text-sm font-bold text-hacker-bg transition-all hover:bg-transparent hover:text-neon hover:shadow-neon active:scale-95 motion-reduce:transition-none"
        >
          {"<Get_in_touch/>"}
        </a>
        <a
          href={withBasePath(profile.resumeUrl)}
          download
          className="rounded border border-neon/40 px-5 py-2.5 text-sm font-bold text-neon transition-all hover:border-neon hover:shadow-neon active:scale-95 motion-reduce:transition-none"
        >
          {"<Download_CV/>"}
        </a>
        {profile.socialLinks.map((link) => (
          <ExternalLink key={link.href} href={link.href} label={link.label} />
        ))}
      </div>
      <Stats />
    </section>
  );
}
