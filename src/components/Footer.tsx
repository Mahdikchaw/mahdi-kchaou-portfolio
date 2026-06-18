import { profile, sections } from "@/data/profile";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-md border border-line-bright bg-shoal font-display text-sm font-bold text-foam">
              {profile.initials}
            </span>
            <span className="font-display text-sm font-semibold text-foam">{profile.name}</span>
          </a>
          <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-mist-dim">
            {profile.location} · {profile.email}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-mist" aria-label="Footer">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-current">
              {s.label.toLowerCase()}
            </a>
          ))}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-current"
          >
            linkedin
          </a>
        </nav>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-5 font-mono text-[0.7rem] text-mist-dim sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>
            © {year} {profile.name}. Built with React, Tailwind & a single source of truth.
          </span>
          <span>Designed & engineered in Nuremberg.</span>
        </div>
      </div>
    </footer>
  );
}
