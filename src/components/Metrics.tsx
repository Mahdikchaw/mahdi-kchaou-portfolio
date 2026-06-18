import { metrics } from "@/data/profile";
import { Reveal } from "./Reveal";

export function Metrics() {
  return (
    <div className="relative border-y border-line bg-deep/40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-line px-6 lg:grid-cols-4 lg:divide-x lg:px-10">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.08}>
            <div className="px-2 py-10 lg:px-8">
              <div className="font-display text-4xl font-bold tracking-tight text-foam sm:text-5xl">
                {m.value}
                {m.unit && <span className="text-current">{m.unit}</span>}
              </div>
              <p className="mt-3 font-mono text-xs leading-relaxed text-mist">{m.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
