import { GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { about, education, languages, profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" index="01" label="about">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* narrative */}
        <Reveal>
          <div className="max-w-[60ch] space-y-6">
            <p className="font-display text-2xl font-medium leading-snug text-foam sm:text-[1.7rem]">
              When records are clean and the reporting is honest, teams stop
              arguing about the numbers and start{" "}
              <span className="grad-text italic">using them.</span>
            </p>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-mist">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* facts column */}
        <Reveal delay={0.1}>
          <div className="space-y-5">
            {/* education */}
            <div className="panel rounded-xl p-6">
              <h3 className="eyebrow mb-5 flex items-center gap-2 text-mist-dim">
                <GraduationCap className="h-4 w-4 text-ocean" /> education
              </h3>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="font-display text-sm font-semibold text-foam">{e.degree}</p>
                    <p className="mt-0.5 text-sm text-mist">{e.school}</p>
                    <p className="mt-1 font-mono text-xs text-mist-dim">{e.dates}</p>
                    {e.note && <p className="mt-1 font-mono text-xs text-signal">{e.note}</p>}
                  </li>
                ))}
              </ul>
            </div>

            {/* languages */}
            <div className="panel rounded-xl p-6">
              <h3 className="eyebrow mb-5 text-mist-dim">languages</h3>
              <ul className="space-y-3">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium text-foam">{l.name}</span>
                    <span className="flex items-baseline gap-2">
                      <span className="text-right text-xs text-mist">{l.level}</span>
                      <span className="w-8 text-right font-mono text-xs font-medium text-current">
                        {l.cefr}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* right now */}
            <div className="panel rounded-xl p-6">
              <h3 className="eyebrow mb-4 text-mist-dim">right now</h3>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2.5 text-foam">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-signal" />
                  {profile.workAuth}
                </li>
                <li className="flex items-center gap-2.5 text-foam">
                  <MapPin className="h-4 w-4 shrink-0 text-ocean" />
                  {profile.location} · remote across EU
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
