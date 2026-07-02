import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <MatrixRain />
      <div aria-hidden className="bg-grid pointer-events-none fixed inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(0,230,138,0.08),transparent_70%)]"
      />
      <div aria-hidden className="scanlines pointer-events-none fixed inset-0 z-40" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-2 z-40 hidden rounded border border-neon/25 sm:block"
      />
      <ScrollProgress />
      <BackToTop />
      <CommandPalette />
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
