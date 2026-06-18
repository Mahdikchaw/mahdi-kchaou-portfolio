import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { HeroPipeline } from "./HeroPipeline";
import { Magnetic } from "./Magnetic";

export function Hero() {
  const reduced = useReducedMotion();
  const item = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient depth: ocean glow + faint lattice */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-ocean absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full blur-[120px]" />
        <div className="glow-indigo absolute bottom-[-20%] right-[-10%] h-[50vh] w-[50vw] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.6]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-6 pb-20 pt-28 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:pt-28">
        {/* ---- copy ---- */}
        <div className="relative z-10">
          <motion.p {...item(0)} className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            available — graduating sep 2026
          </motion.p>

          <h1 className="font-display tracking-tight">
            <motion.span
              {...item(0.05)}
              className="mb-5 block font-mono text-sm font-normal uppercase tracking-[0.25em] text-mist"
            >
              Mahdi Kchaou
            </motion.span>
            <motion.span
              {...item(0.12)}
              className="block text-[2rem] font-bold leading-[1.08] text-foam [text-wrap:balance] sm:text-5xl lg:text-[4.2rem] lg:leading-[1.03]"
            >
              {profile.thesisLead}{" "}
              <span className="grad-text italic">{profile.thesisHighlight}</span>
            </motion.span>
          </h1>

          <motion.p {...item(0.2)} className="mt-7 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
            {profile.thesisSub}
          </motion.p>

          {/* CTAs */}
          <motion.div {...item(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={profile.cv}
                download
                className="btn-primary group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-lg shadow-ocean/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ocean/40"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Download CV
              </a>
            </Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-line-bright bg-shoal/60 px-5 py-3 text-sm font-semibold text-foam transition-all duration-200 hover:-translate-y-0.5 hover:border-ocean hover:text-current"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </motion.div>

          {/* meta row */}
          <motion.div {...item(0.4)} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-mist-dim">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-ocean" />
              {profile.location}
            </span>
            <span className="text-line-bright">·</span>
            <span>{profile.workAuth}</span>
            <span className="text-line-bright">·</span>
            <span>remote across EU</span>
          </motion.div>
        </div>

        {/* ---- the signature figure ---- */}
        <motion.figure
          {...(reduced ? {} : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] } })}
          className="relative z-10 lg:mt-[5.5rem]"
        >
          <div className="panel relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <HeroPipeline />
          </div>
        </motion.figure>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        {...(reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.1 } })}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-mist-dim transition-colors hover:text-current lg:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
