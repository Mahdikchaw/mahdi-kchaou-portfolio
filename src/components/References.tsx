import { useState } from "react";
import { Quote, FileText } from "lucide-react";
import { references, type Reference } from "@/data/profile";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { LetterDialog } from "./LetterDialog";

export function References() {
  const [active, setActive] = useState<Reference | null>(null);

  return (
    <Section
      id="references"
      index="05"
      label="references"
      title="Two signed letters. Read them — don't take my word for it."
    >
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
        {references.map((r, i) => (
          <Reveal key={r.author} delay={i * 0.1}>
            <figure className="panel flex flex-col rounded-xl p-7">
              <Quote className="h-7 w-7 text-ocean/70" aria-hidden />
              <blockquote className="mb-6 mt-4 font-display text-lg font-medium leading-relaxed text-foam">
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <p className="font-semibold text-foam">{r.author}</p>
                <p className="text-sm text-mist">{r.authorRole}</p>
                <p className="font-mono text-xs text-mist-dim">
                  {r.org} · {r.date}
                </p>
                <button
                  onClick={() => setActive(r)}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line-bright bg-abyss/50 px-4 py-2.5 text-sm font-semibold text-foam transition-colors hover:border-ocean hover:text-current"
                >
                  <FileText className="h-4 w-4" />
                  View full letter
                </button>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <LetterDialog reference={active} onClose={() => setActive(null)} />
    </Section>
  );
}
