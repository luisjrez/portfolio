import {
  parseLeadParagraph,
  parseListItems,
  readMarkdownDir,
  UNORDERED,
} from "@/lib/markdown";
import type { ExperienceItem } from "@/types/portfolio";

interface ExperienceFrontmatter {
  role: string;
  company: string;
  period: string;
  order?: number;
  stack?: string[];
}

/**
 * Reads work history from content/experience/*.md at build time.
 * Frontmatter: role, company, period, order, stack (list).
 * Body: lead paragraph = description, `- item` lines = highlights.
 */
export function getExperience(): ExperienceItem[] {
  return readMarkdownDir<ExperienceFrontmatter>("experience")
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? UNORDERED) - (b.frontmatter.order ?? UNORDERED),
    )
    .map(({ frontmatter, body }) => ({
      role: frontmatter.role,
      company: frontmatter.company,
      period: frontmatter.period,
      description: parseLeadParagraph(body),
      highlights: parseListItems(body),
      stack: frontmatter.stack ?? [],
    }));
}
