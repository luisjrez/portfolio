import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tag } from "@/components/ui/Tag";
import { getCaseStudy, getCaseStudyList } from "@/lib/case-studies";
import { withBasePath } from "@/lib/base-path";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCaseStudyList().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return {};
  }
  return {
    title: `${study.title} — Case Study`,
    description: `${study.role} at ${study.company}. ${study.title}.`,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    notFound();
  }

  return (
    <>
      <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <a
          href={withBasePath("/")}
          className="text-sm text-neon/70 transition-colors hover:text-neon"
        >
          {"< cd .."}
        </a>

        <p className="mt-8 text-xs font-medium uppercase tracking-wider text-neon/70">
          {study.role} · {study.company} · {study.period}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 text-glow sm:text-4xl">
          {study.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.stack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        {study.metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-hacker-border py-6">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="text-xl font-bold text-neon text-glow sm:text-2xl">
                  {metric.value}
                </dd>
                <p className="mt-1 text-xs text-slate-400">{metric.label}</p>
              </div>
            ))}
          </dl>
        )}

        <article
          className="case-study mt-10 leading-relaxed text-slate-400"
          dangerouslySetInnerHTML={{ __html: study.contentHtml }}
        />
      </main>
      <Footer />
    </>
  );
}
