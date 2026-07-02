import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

interface CircleLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function CircleLink({ href, label, external = false }: CircleLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex h-28 w-28 flex-col items-center justify-center gap-0.5 rounded-full border border-neon/30 text-center text-xs text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-neon hover:text-neon hover:shadow-neon active:scale-95 motion-reduce:transition-none motion-reduce:hover:transform-none"
    >
      <span aria-hidden className="text-[10px] text-neon/50">
        {"<>"}
      </span>
      {label}
      <span aria-hidden className="text-[10px] text-neon/50">
        {"</>"}
      </span>
    </a>
  );
}

function ConnectorLine() {
  return (
    <div aria-hidden className="mx-auto mt-2 flex h-20 w-px flex-col items-center bg-neon/30">
      <span className="h-2 w-2 -translate-x-[0.5px] rounded-full border border-neon bg-hacker-bg animate-neon-pulse" />
      <span className="mt-auto h-2 w-2 -translate-x-[0.5px] rounded-full border border-neon bg-hacker-bg animate-neon-pulse" />
    </div>
  );
}

export function Contact() {
  return (
    <section className="py-12 pb-24 text-center">
      <div className="flex justify-center">
        <SectionHeading id="contact" title="Connect with me" />
      </div>
      <ConnectorLine />
      <Reveal>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-slate-400">
          {profile.availability.open
            ? `Currently ${profile.availability.status.toLowerCase()} — ${profile.availability.preferences.join(" · ")}. The fastest way to reach me is by email.`
            : "The fastest way to reach me is by email."}
        </p>
        {profile.availability.scheduleUrl && (
          <a
            href={profile.availability.scheduleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded border border-neon bg-neon px-6 py-3 text-sm font-bold text-hacker-bg transition-all hover:bg-transparent hover:text-neon hover:shadow-neon active:scale-95 motion-reduce:transition-none"
          >
            {"<Book_a_call/>"}
          </a>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <CircleLink href={`mailto:${profile.email}`} label="Email" />
          {profile.socialLinks.map((link) => (
            <CircleLink
              key={link.href}
              href={link.href}
              label={link.label}
              external
            />
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          <span className="text-neon">$ </span>mail -s &quot;Hello&quot;{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-neon/80 underline decoration-neon/30 underline-offset-4 transition-colors hover:text-neon"
          >
            {profile.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
