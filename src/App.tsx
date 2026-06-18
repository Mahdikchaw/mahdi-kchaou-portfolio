import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { Hero } from "./components/Hero";
import { Metrics } from "./components/Metrics";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Work } from "./components/Work";
import { Skills } from "./components/Skills";
import { References } from "./components/References";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-lg bg-foam px-4 py-2 font-semibold text-abyss focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <About />
        <Experience />
        <Work />
        <Skills />
        <References />
        <Contact />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
