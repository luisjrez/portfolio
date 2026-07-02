import type { Profile } from "@/types/portfolio";

export const profile: Profile = {
  name: "Luis Juárez",
  role: "Senior Software Engineer",
  headline:
    "I build and ship reliable mobile and web products — from white-label apps at scale to full-stack features end to end.",
  bio: "Senior software engineer with 10+ years building products with React and React Native, backed by full-stack experience across Python (Django/DRF), NestJS, PostgreSQL, Redis and Docker. I've shipped white-label mobile apps to 100+ clients from a single codebase, delivered features end to end across mobile, web and backend, and integrated AI-powered experiences into production apps. I care about clean architecture, performance and pragmatic delivery.",
  location: "Villahermosa, Mexico",
  email: "luismanueljf@gmail.com",
  availability: "Open to new opportunities",
  resumeUrl: "/luis-juarez-cv.pdf",
  stats: [
    { value: "10+", label: "years shipping" },
    { value: "100+", label: "white-label clients" },
    { value: "15+", label: "apps delivered" },
    { value: "4", label: "countries reached" },
  ],
  taglines: [
    "Senior Software Engineer",
    "React Native specialist",
    "Full-stack: React, NestJS, Python",
    "AI-powered product builder",
  ],
  socialLinks: [{ label: "GitHub", href: "https://github.com/luisjrez" }],
};
