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
            <div className="panel h-full rounded-xl p-6 sm:p-7">
              <h3 className="eyebrow mb-5 flex items-center gap-3 text-current">
                <span className="text-mist-dim">{String(i + 1).padStart(2, "0")}</span>
                {g.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-abyss/50 px-3 py-1.5 text-sm text-foam/90 transition-colors hover:border-ocean hover:text-current"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
