import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** A section with a monospace "field"-style header: // 01 — about */
export function Section({
  id,
  index,
  label,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  label: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="eyebrow whitespace-nowrap">
              {"//"} {index} — {label}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          {title && (
            <h2 className="mb-10 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foam sm:text-4xl">
              {title}
            </h2>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
