import { marked } from "marked";
import { readMarkdownDir } from "@/lib/markdown";
import type { CaseStudy, CaseStudyMeta, Stat } from "@/types/portfolio";

interface CaseStudyFrontmatter {
  slug: string;
  title: string;
  company: string;
  role: string;
  period: string;
  stack?: string[];
  metrics?: Stat[];
}

function toMeta(frontmatter: CaseStudyFrontmatter): CaseStudyMeta {
  return {
    slug: frontmatter.slug,
    title: frontmatter.title,
    company: frontmatter.company,
    role: frontmatter.role,
    period: frontmatter.period,
    stack: frontmatter.stack ?? [],
    metrics: frontmatter.metrics ?? [],
  };
}

/** Lightweight list of case studies for cards and static params. */
export function getCaseStudyList(): CaseStudyMeta[] {
  return readMarkdownDir<CaseStudyFrontmatter>("case-studies").map(
    ({ frontmatter }) => toMeta(frontmatter),
  );
}

/** Full case study (with rendered HTML) for a given slug, or null. */
export function getCaseStudy(slug: string): CaseStudy | null {
  const entry = readMarkdownDir<CaseStudyFrontmatter>("case-studies").find(
    ({ frontmatter }) => frontmatter.slug === slug,
  );
  if (!entry) {
    return null;
  }
  return {
    ...toMeta(entry.frontmatter),
    contentHtml: marked.parse(entry.body, { async: false }),
  };
}
