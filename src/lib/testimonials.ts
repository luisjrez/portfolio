import { readMarkdownDir, UNORDERED } from "@/lib/markdown";
import type { Testimonial } from "@/types/portfolio";

interface TestimonialFrontmatter {
  author: string;
  title: string;
  company: string;
  order?: number;
}

/**
 * Reads testimonials from content/testimonials/*.md at build time.
 * Entries whose body still starts with "TODO:" are skipped, so unfilled
 * placeholders never render.
 */
export function getTestimonials(): Testimonial[] {
  return readMarkdownDir<TestimonialFrontmatter>("testimonials")
    .filter(({ body }) => body.length > 0 && !body.startsWith("TODO:"))
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? UNORDERED) - (b.frontmatter.order ?? UNORDERED),
    )
    .map(({ frontmatter, body }) => ({
      quote: body,
      author: frontmatter.author,
      title: frontmatter.title,
      company: frontmatter.company,
    }));
}
