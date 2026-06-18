import { ArrowUpRight } from "lucide-react";
import { experiences } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="experience"
      title="Five years keeping revenue data honest — across Germany, Tunisia and the UK."
    >
      <div className="relative">
        {/* the spine — a single "current" line down the timeline */}
        <div
          aria-hidden
          className="absolute left-0 top-2 hidden h-full w-px bg-gradient-to-b from-ocean via-indigo to-transparent sm:block"
        />
        <ol className="space-y-4">
          {experiences.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.06}>
              <li className="group relative sm:pl-10">
                {/* node */}
                <span
                  aria-hidden
                  className={`absolute left-[-4.5px] top-7 hidden h-2.5 w-2.5 rounded-full ring-4 ring-abyss sm:block ${
                    e.current ? "bg-current" : "bg-line-bright group-hover:bg-ocean"
                  }`}
                />
                <article className="panel rounded-xl p-6 transition-colors hover:border-line-bright sm:p-7">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-foam">{e.org}</h3>
                      {e.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
                          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> current
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-mist-dim">
                      {e.start} → {e.end}
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-current">{e.title}</p>
                  <p className="font-mono text-xs text-mist-dim">{e.location}</p>

                  <p className="mt-4 text-sm leading-relaxed text-mist">{e.blurb}</p>

                  <ul className="mt-4 space-y-2.5">
                    {e.bullets.map((b) => (
                      <li key={b.slice(0, 20)} className="flex gap-3 text-sm leading-relaxed text-foam/90">
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-line bg-abyss/60 px-2.5 py-1 font-mono text-[0.7rem] text-mist"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
