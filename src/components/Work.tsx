import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <Section
      id="work"
      index="03"
      label="work"
      title="Two times messy data became something a team could trust."
    >
      <div className="space-y-4">
        {caseStudies.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <article className="panel grid grid-cols-1 gap-8 rounded-2xl p-7 sm:p-9 lg:grid-cols-[0.9fr_1.4fr]">
              {/* left: framing */}
              <div className="flex flex-col">
                <p className="eyebrow mb-4">{c.tag}</p>
                <h3 className="font-display text-2xl font-semibold leading-tight text-foam sm:text-[1.7rem]">
                  {c.title}
                </h3>
                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-line bg-abyss/50 px-2.5 py-1 font-mono text-[0.7rem] text-mist"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* right: context / approach / outcome */}
              <div className="space-y-6">
                <div>
                  <p className="eyebrow mb-2 text-mist-dim">context</p>
                  <p className="text-sm leading-relaxed text-mist">{c.context}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2 text-mist-dim">approach</p>
                  <ul className="space-y-2.5">
                    {c.approach.map((a) => (
                      <li key={a.slice(0, 16)} className="flex gap-3 text-sm leading-relaxed text-foam/90">
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-signal/25 bg-signal/5 p-4">
                  <p className="eyebrow mb-2 text-signal">outcome</p>
                  <p className="text-sm leading-relaxed text-foam">{c.outcome}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
