import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const UNORDERED = Number.MAX_SAFE_INTEGER;

export interface MarkdownEntry<TFrontmatter> {
  fileName: string;
  frontmatter: TFrontmatter;
  body: string;
}

/** Reads every .md file in content/<relativeDir> and parses its frontmatter. */
export function readMarkdownDir<TFrontmatter>(
  relativeDir: string,
): MarkdownEntry<TFrontmatter>[] {
  const dir = path.join(process.cwd(), "content", relativeDir);
  return fs
    .readdirSync(dir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
      const { data, content } = matter(raw);
      return {
        fileName,
        frontmatter: data as TFrontmatter,
        body: content.trim(),
      };
    });
}

/** Extracts `- item` bullet lines from a markdown body. */
export function parseListItems(body: string): string[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

/** Joins the paragraph lines that appear before the first bullet list. */
export function parseLeadParagraph(body: string): string {
  const paragraphLines: string[] = [];
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      break;
    }
    if (trimmed) {
      paragraphLines.push(trimmed);
    }
  }
  return paragraphLines.join(" ");
}
