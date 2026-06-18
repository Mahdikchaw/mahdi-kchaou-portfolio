import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { profile, sections } from "@/data/profile";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-line bg-abyss/80 backdrop-blur-md" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="Mahdi Kchaou — home">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-line-bright bg-shoal font-display text-sm font-bold text-foam transition-colors group-hover:border-ocean">
            {profile.initials}
          </span>
          <span className="hidden font-mono text-xs tracking-wider text-mist sm:block">
            mahdi&nbsp;kchaou<span className="text-mist-dim">/revops</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "rounded-md px-3 py-2 font-mono text-xs tracking-wide transition-colors",
                active === s.id ? "text-current" : "text-mist hover:text-foam"
              )}
            >
              {s.label.toLowerCase()}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* social logos */}
          <div className="hidden items-center gap-1.5 sm:flex">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mist transition-colors hover:border-ocean hover:text-current"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-mist transition-colors hover:border-ocean hover:text-current"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>

          <ThemeToggle />

          <span className="mx-1 hidden h-5 w-px bg-line sm:block" />

          <a
            href={profile.cv}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-foam px-3.5 py-2 text-sm font-semibold text-abyss transition-transform hover:-translate-y-0.5 sm:px-4"
          >
            <Download className="h-4 w-4" />
            <span>CV</span>
            <span className="hidden sm:inline">&nbsp;(PDF)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
