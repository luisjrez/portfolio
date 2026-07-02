import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/testimonials";
import type { Testimonial } from "@/types/portfolio";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-lg border border-hacker-border bg-hacker-surface p-6">
      <span aria-hidden className="text-2xl leading-none text-neon/40">
        {'"'}
      </span>
      <blockquote className="mt-2 text-sm leading-relaxed text-slate-300">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-4 text-xs text-slate-500">
        <span className="text-neon/80">{testimonial.author}</span> ·{" "}
        {testimonial.title}, {testimonial.company}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const testimonials = getTestimonials();
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <section className="py-12">
      <SectionHeading id="testimonials" title="References" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.author} delayMs={index * 120}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
