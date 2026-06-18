import { skillGroups } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="skills"
      title="The stack behind a single source of truth."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skillGroups.map((g, i) => (
          <Reveal key={g.key} delay={i * 0.07}>
            <div className="panel flex h-full flex-col rounded-xl p-6 sm:p-7">
              <h3 className="eyebrow mb-3 flex items-center gap-3 text-current">
                <span aria-hidden className="text-mist-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {g.label}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-mist">{g.proof}</p>

              {/* core tools — primary emphasis */}
              {g.core.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {g.core.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-ocean/40 bg-ocean/10 px-3 py-1.5 text-sm font-medium text-foam"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* supporting skills — quieter mono labels */}
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-1 font-mono text-xs text-mist">
                {g.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
