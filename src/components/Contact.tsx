import { Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { LinkedInIcon, GitHubIcon } from "./icons";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

export function Contact() {
  return (
    <Section id="contact" index="06" label="contact">
      <Reveal>
        <div className="panel relative overflow-hidden rounded-2xl p-8 sm:p-12">
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo/20 blur-3xl"
          />
          <div className="relative">
            <p className="eyebrow mb-5">open to work</p>
            <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-foam sm:text-5xl">
              Let's make your revenue data <span className="grad-text italic">worth trusting.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
              I'm looking for my next role in revenue & data operations — full-time
              from September 2026, or as a working student now. The fastest way to
              reach me is email.
            </p>

            {/* role range — the versatility, stated plainly (no gimmicks) */}
            <div className="mt-7 flex flex-wrap gap-2">
              {profile.openTo.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-line bg-abyss/50 px-3.5 py-1.5 font-mono text-xs text-mist"
                >
                  {r}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ocean to-indigo px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ocean/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ocean/40"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
              </Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line-bright bg-shoal/60 px-5 py-3 text-sm font-semibold text-foam transition-colors hover:border-ocean hover:text-current"
              >
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line-bright bg-shoal/60 px-5 py-3 text-sm font-semibold text-foam transition-colors hover:border-ocean hover:text-current"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* trust signals */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-7 font-mono text-xs text-mist">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-ocean" /> {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-signal" /> {profile.workAuth}
              </span>
              <span className="text-mist-dim">{profile.remote}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
