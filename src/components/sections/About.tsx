import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAbout } from "@/lib/about";

export function About() {
  const about = getAbout();
  return (
    <section className="py-12">
      <SectionHeading id="about" title={about.title} />
      <div className="mt-8 max-w-2xl space-y-4">
        {about.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} delayMs={index * 100}>
            <p className="leading-relaxed text-slate-400">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
