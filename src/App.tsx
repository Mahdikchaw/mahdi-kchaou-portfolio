import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Metrics } from "./components/Metrics";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
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
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <About />
        <Experience />
        <Skills />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
