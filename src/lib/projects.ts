import { parseLeadParagraph, readMarkdownDir, UNORDERED } from "@/lib/markdown";
import type { Project } from "@/types/portfolio";

interface ProjectFrontmatter {
  name: string;
  order?: number;
  stack?: string[];
  href?: string;
}

/**
 * Reads project cards from content/projects/*.md at build time.
 * Frontmatter: name, order, stack (list), optional href.
 * Body: the project description.
 */
export function getProjects(): Project[] {
  return readMarkdownDir<ProjectFrontmatter>("projects")
    .sort(
      (a, b) =>
        (a.frontmatter.order ?? UNORDERED) - (b.frontmatter.order ?? UNORDERED),
    )
    .map(({ frontmatter, body }) => ({
      name: frontmatter.name,
      description: parseLeadParagraph(body),
      stack: frontmatter.stack ?? [],
      href: frontmatter.href,
    }));
}
