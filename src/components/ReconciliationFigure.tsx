import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Check, AlertTriangle, RotateCcw } from "lucide-react";

/* ============================================================================
   THE SIGNATURE — record reconciliation.
   The same customer arrives as three messy, conflicting CRM records. They slide
   together, the conflicts resolve, and they collapse into one verified "golden
   record": a single source of truth. Mahdi's exact value proposition, enacted.
   ========================================================================== */

type Field = { k: string; v: string; bad?: boolean };
type MessyRecord = {
  offset: { x: number; y: number; r: number };
  flag: string;
  fields: Field[];
};

const messy: MessyRecord[] = [
  {
    offset: { x: -34, y: -40, r: -7 },
    flag: "DUPLICATE",
    fields: [
      { k: "name", v: "Jon Smith" },
      { k: "company", v: "Acme" },
      { k: "email", v: "— missing", bad: true },
    ],
  },
  {
    offset: { x: 36, y: -4, r: 6 },
    flag: "CONFLICT",
    fields: [
      { k: "name", v: "J. Smith" },
      { k: "company", v: "ACME Inc", bad: true },
      { k: "phone", v: "— missing", bad: true },
    ],
  },
  {
    offset: { x: -12, y: 40, r: -3 },
    flag: "UNVERIFIED",
    fields: [
      { k: "name", v: "John Smyth", bad: true },
      { k: "email", v: "john@acme", bad: true },
      { k: "phone", v: "+49 151 2…" },
    ],
  },
];

const golden: Field[] = [
  { k: "name", v: "John Smith" },
  { k: "company", v: "Acme Inc." },
  { k: "email", v: "john.smith@acme.io" },
  { k: "phone", v: "+49 151 234 5678" },
];

type Phase = "chaos" | "merge" | "resolved";

export function ReconciliationFigure() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.5 });
  const [phase, setPhase] = useState<Phase>(reduced ? "resolved" : "chaos");
  const timers = useRef<number[]>([]);
  const hasRun = useRef(false);

  function clearTimers() {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }

  function run() {
    if (reduced) {
      setPhase("resolved");
      return;
    }
    clearTimers();
    setPhase("chaos");
    timers.current.push(window.setTimeout(() => setPhase("merge"), 1900));
    timers.current.push(window.setTimeout(() => setPhase("resolved"), 2900));
  }

  // Run once when first scrolled into view.
  useEffect(() => {
    if (inView && !hasRun.current) {
      hasRun.current = true;
      run();
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const merged = phase !== "chaos";

  return (
    <div ref={wrapRef} className="absolute inset-0 grid place-items-center px-6">
      {/* faint backplate grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 42%, rgba(30,157,242,0.10), transparent 60%)",
        }}
      />

      <div className="relative h-[260px] w-full max-w-[320px]">
        {/* messy records */}
        <AnimatePresence>
          {phase !== "resolved" &&
            messy.map((rec, i) => (
              <motion.div
                key={i}
                initial={
                  reduced
                    ? false
                    : { opacity: 0, x: rec.offset.x, y: rec.offset.y, rotate: rec.offset.r, scale: 0.92 }
                }
                animate={
                  merged
                    ? { opacity: 1 - i * 0.18, x: 0, y: 0, rotate: 0, scale: 1 - i * 0.02 }
                    : { opacity: 1, x: rec.offset.x, y: rec.offset.y, rotate: rec.offset.r, scale: 1 }
                }
                exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: merged ? 0 : i * 0.12 }}
                style={{ zIndex: 10 - i }}
                className="absolute inset-x-0 top-2 mx-auto w-full rounded-xl border border-line-bright bg-shoal/90 p-4 shadow-xl backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest text-mist-dim">
                    crm.record
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 font-mono text-[0.58rem] tracking-wider text-rose-300">
                    <AlertTriangle className="h-2.5 w-2.5" /> {rec.flag}
                  </span>
                </div>
                <dl className="space-y-1.5">
                  {rec.fields.map((f) => (
                    <div key={f.k} className="flex items-baseline gap-3 font-mono text-xs">
                      <dt className="w-16 shrink-0 text-mist-dim">{f.k}</dt>
                      <dd className={f.bad ? "text-rose-300" : "text-foam/90"}>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
        </AnimatePresence>

        {/* golden record */}
        <AnimatePresence>
          {phase === "resolved" && (
            <motion.div
              key="golden"
              initial={reduced ? false : { opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-2 mx-auto w-full overflow-hidden rounded-xl border border-current/50 bg-gradient-to-b from-shoal to-deep p-4 shadow-2xl"
              style={{ boxShadow: "0 0 0 1px rgba(69,200,255,0.15), 0 24px 60px -20px rgba(30,157,242,0.45)" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-current">
                  golden.record
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 font-mono text-[0.58rem] tracking-wider text-signal">
                  <Check className="h-2.5 w-2.5" /> VERIFIED
                </span>
              </div>
              <dl className="space-y-1.5">
                {golden.map((f, i) => (
                  <motion.div
                    key={f.k}
                    initial={reduced ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-baseline gap-3 font-mono text-xs"
                  >
                    <dt className="w-16 shrink-0 text-mist-dim">{f.k}</dt>
                    <dd className="text-foam">{f.v}</dd>
                  </motion.div>
                ))}
              </dl>
              <div className="mt-3 border-t border-line pt-2.5 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-current">
                single source of truth
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* replay */}
      {!reduced && (
        <button
          onClick={run}
          aria-label="Replay reconciliation"
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-md border border-line bg-abyss/60 px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-wider text-mist-dim transition-colors hover:border-ocean hover:text-current"
        >
          <RotateCcw className="h-3 w-3" /> replay
        </button>
      )}
    </div>
  );
}
