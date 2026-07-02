import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseListItems } from "@/lib/markdown";

export interface AiWorkflowPoint {
  title: string;
  body: string;
}

export interface AiWorkflow {
  title: string;
  intro: string;
  points: AiWorkflowPoint[];
}

/**
 * Reads content/ai-workflow.md at build time.
 * Each `- Title :: body` line becomes a point.
 */
export function getAiWorkflow(): AiWorkflow {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content", "ai-workflow.md"),
    "utf8",
  );
  const { data, content } = matter(raw);
  const frontmatter = data as { title?: string; intro?: string };

  const points = parseListItems(content).map((item) => {
    const [title, ...rest] = item.split("::");
    return { title: title.trim(), body: rest.join("::").trim() };
  });

  return {
    title: frontmatter.title ?? "How I work with AI",
    intro: frontmatter.intro ?? "",
    points,
  };
}
