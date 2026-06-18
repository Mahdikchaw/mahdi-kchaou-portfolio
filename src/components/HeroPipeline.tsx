import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

/* ============================================================================
   THE SIGNATURE — a living data pipeline.
   Messy records stream in from three sources, flow down labeled rails, get
   cleaned at the transform stage (red → ocean), and converge into one pulsing
   "single source of truth". It never stops — a system that's always running.
   Honors prefers-reduced-motion by rendering a calm static frame.
   ========================================================================== */

const LANES_X = [0.2, 0.5, 0.8];
const TOP_Y = 0.12;
const MERGE_Y = 0.55;
const GOLD_Y = 0.84;
const GOLD_X = 0.5;
const FLIP = 0.52; // t at which a packet is "cleaned"

const RED = [255, 116, 132];
const OCEAN = [69, 200, 255];
const INDIGO = [142, 147, 248];

function lerp(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
// cubic bezier point
function cubic(p0: number[], p1: number[], p2: number[], p3: number[], t: number) {
  const u = 1 - t;
  const a = u * u * u,
    b = 3 * u * u * t,
    c = 3 * u * t * t,
    d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ];
}

type Packet = { lane: number; t: number; speed: number; size: number };

export function HeroPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef(0); // golden-node glow energy

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, running = true;

    // bezier control points per lane (normalized)
    const lanes = LANES_X.map((sx) => ({
      p0: [sx, TOP_Y],
      p1: [sx, 0.4],
      p2: [GOLD_X, MERGE_Y + 0.02],
      p3: [GOLD_X, GOLD_Y],
    }));
    const pointAt = (lane: number, t: number) => {
      const L = lanes[lane];
      return cubic(L.p0, L.p1, L.p2, L.p3, t);
    };

    // packets
    const packets: Packet[] = [];
    const PER_LANE = 7;
    for (let l = 0; l < 3; l++) {
      for (let k = 0; k < PER_LANE; k++) {
        packets.push({
          lane: l,
          t: k / PER_LANE + (l * 0.13),
          speed: 0.0019 + Math.random() * 0.0011,
          size: 2.4 + Math.random() * 1.1,
        });
      }
    }

    function resize() {
      const r = parent.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const X = (n: number) => n * w;
    const Y = (n: number) => n * h;

    function drawRail(lane: number) {
      ctx!.beginPath();
      for (let i = 0; i <= 40; i++) {
        const p = pointAt(lane, i / 40);
        const x = X(p[0]), y = Y(p[1]);
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      const grad = ctx!.createLinearGradient(0, Y(TOP_Y), 0, Y(GOLD_Y));
      grad.addColorStop(0, "rgba(255,116,132,0.10)");
      grad.addColorStop(FLIP, "rgba(69,200,255,0.10)");
      grad.addColorStop(1, "rgba(142,147,248,0.14)");
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    function frame(now: number) {
      if (!running) return;
      ctx!.clearRect(0, 0, w, h);

      // soft backplate
      const bg = ctx!.createRadialGradient(X(GOLD_X), Y(GOLD_Y), 0, X(GOLD_X), Y(GOLD_Y), h * 0.55);
      bg.addColorStop(0, "rgba(30,157,242,0.08)");
      bg.addColorStop(1, "rgba(7,11,22,0)");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      // rails
      for (let l = 0; l < 3; l++) drawRail(l);

      // transform zone — a soft, edgeless glow at the convergence point
      const tz = ctx!.createRadialGradient(X(GOLD_X), Y(MERGE_Y), 0, X(GOLD_X), Y(MERGE_Y), w * 0.34);
      tz.addColorStop(0, "rgba(69,200,255,0.06)");
      tz.addColorStop(1, "rgba(7,11,22,0)");
      ctx!.fillStyle = tz;
      ctx!.beginPath();
      ctx!.arc(X(GOLD_X), Y(MERGE_Y), w * 0.34, 0, Math.PI * 2);
      ctx!.fill();

      // packets
      for (const pk of packets) {
        if (!reduced) {
          pk.t += pk.speed;
          if (pk.t >= 1) {
            pk.t -= 1;
            pulseRef.current = Math.min(pulseRef.current + 0.6, 1.6);
          }
        }
        const p = pointAt(pk.lane, pk.t);
        const x = X(p[0]), y = Y(p[1]);
        const cleaned = pk.t > FLIP;
        const col = cleaned ? lerp(OCEAN, INDIGO, (pk.t - FLIP) / (1 - FLIP)) : RED;
        const a = pk.t < 0.04 ? pk.t / 0.04 : pk.t > 0.97 ? (1 - pk.t) / 0.03 : 1;

        // trail
        const pPrev = pointAt(pk.lane, Math.max(0, pk.t - 0.03));
        ctx!.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.25 * a})`;
        ctx!.lineWidth = pk.size * 0.9;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(X(pPrev[0]), Y(pPrev[1]));
        ctx!.lineTo(x, y);
        ctx!.stroke();

        // head
        ctx!.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${a})`;
        ctx!.beginPath();
        ctx!.arc(x, y, pk.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // golden node pulse
      if (!reduced) pulseRef.current *= 0.94;
      const breathe = reduced ? 0.4 : 0.4 + 0.18 * Math.sin(now / 700);
      const energy = Math.min(pulseRef.current + breathe, 1.4);
      const gx = X(GOLD_X), gy = Y(GOLD_Y);
      const glow = ctx!.createRadialGradient(gx, gy, 0, gx, gy, h * 0.22);
      glow.addColorStop(0, `rgba(69,200,255,${0.22 * energy})`);
      glow.addColorStop(0.5, `rgba(99,102,241,${0.12 * energy})`);
      glow.addColorStop(1, "rgba(7,11,22,0)");
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(gx, gy, h * 0.22, 0, Math.PI * 2);
      ctx!.fill();

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; raf = requestAnimationFrame(frame); }
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {/* source labels (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-[7%] flex items-start justify-between px-[12%] font-mono text-[0.6rem] uppercase tracking-wider text-mist-dim">
        {["salesforce", "forms", "exports"].map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ff7484" }} />
            {s}
          </span>
        ))}
      </div>

      {/* transform stage (mid) */}
      <div className="pointer-events-none absolute inset-x-0 top-[50%] flex -translate-y-1/2 justify-center">
        <span className="rounded-full border border-line-bright bg-abyss/70 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-current backdrop-blur-sm">
          dedupe · validate · enrich
        </span>
      </div>

      {/* golden record (bottom) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center px-6">
        <div className="w-full max-w-[260px] rounded-xl border border-current/40 bg-gradient-to-b from-shoal/95 to-deep/95 p-3.5 shadow-2xl backdrop-blur-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[0.58rem] uppercase tracking-widest text-current">golden.record</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-signal/40 bg-signal/10 px-1.5 py-0.5 font-mono text-[0.52rem] tracking-wider text-signal">
              <Check className="h-2.5 w-2.5" /> live
            </span>
          </div>
          <div className="space-y-0.5 font-mono text-[0.66rem]">
            <div className="flex gap-2"><span className="w-12 text-mist-dim">name</span><span className="text-foam">John Smith</span></div>
            <div className="flex gap-2"><span className="w-12 text-mist-dim">company</span><span className="text-foam">Acme Inc.</span></div>
            <div className="flex gap-2"><span className="w-12 text-mist-dim">email</span><span className="text-foam">john.smith@acme.io</span></div>
          </div>
          <div className="mt-2 border-t border-line pt-1.5 text-center font-mono text-[0.55rem] uppercase tracking-[0.18em] text-current">
            single source of truth
          </div>
        </div>
      </div>
    </>
  );
}
