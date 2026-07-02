export interface SocialLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Availability {
  /** Whether the person is currently looking. */
  open: boolean;
  /** Short status line, e.g. "Open to new opportunities". */
  status: string;
  /** Work preferences shown as chips, e.g. ["Remote", "Full-time"]. */
  preferences: string[];
  /** Timezone label, e.g. "GMT-6 · Mexico". */
  timezone: string;
  /** Optional scheduling link (Calendly, cal.com…). */
  scheduleUrl?: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  availability: Availability;
  /** Path to the downloadable résumé, relative to the site root. */
  resumeUrl: string;
  /** Headline metrics shown in the hero stats bar. */
  stats: Stat[];
  /** Phrases cycled by the hero typewriter animation. */
  taglines: string[];
  socialLinks: SocialLink[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  href?: string;
  /** Slug of a case study page, if this project has one. */
  caseStudy?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
  metrics: Stat[];
}

export interface CaseStudy extends CaseStudyMeta {
  /** Rendered HTML of the markdown body. */
  contentHtml: string;
}

export interface NavItem {
  label: string;
  href: string;
}
