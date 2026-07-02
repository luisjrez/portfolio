export interface SocialLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  availability: string;
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
}

export interface NavItem {
  label: string;
  href: string;
}
