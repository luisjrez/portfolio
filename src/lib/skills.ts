import { parseListItems, readMarkdownDir, UNORDERED } from "@/lib/markdown";
import type { SkillGroup } from "@/types/portfolio";

interface SkillFrontmatter {
  title?: string;
  order?: number;
}

/**
 * Reads skill groups from content/skills/*.md at build time.
 * Each file: frontmatter with `title` and `order`, body with one `- skill` per line.
 */
export function getSkillGroups(): SkillGroup[] {
  return readMarkdownDir<SkillFrontmatter>("skills")
    .map(({ fileName, frontmatter, body }) => ({
      category: frontmatter.title ?? fileName.replace(/\.md$/, ""),
      order: frontmatter.order ?? UNORDERED,
      skills: parseListItems(body),
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ category, skills }) => ({ category, skills }));
}
