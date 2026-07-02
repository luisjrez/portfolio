import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

interface About {
  title: string;
  paragraphs: string[];
}

/** Reads the About section from content/about.md at build time. */
export function getAbout(): About {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "about.md"),
    "utf8",
  );
  const { data, content } = matter(raw);
  const paragraphs = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return {
    title: (data as { title?: string }).title ?? "About",
    paragraphs,
  };
}
