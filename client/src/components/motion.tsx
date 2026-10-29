// Scroll and pointer motion for the homepage, ported from the Plain Talk site's
// vanilla `motion` effects to framer-motion. Every effect checks reduced motion
// and falls back to the final, static state.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const EASE = [0.16, 1, 0.3, 1] as const;

// Fades and rises into view once. `delay` staggers siblings by hand.
export function Reveal({ children, className = "", delay = 0, y = 26 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Headline lines slide up out of a mask, one after another.
export function MaskLines({ lines, className = "", delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Counts up to a display value like "$250M+", "34.89x", "10,313" or "-16%".
const NUMBER = /^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/;

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(NUMBER);
  const [text, setText] = useState(match && !reduce ? format(0) : value);

  function format(n: number) {
    if (!match) return value;
    const [, prefix, raw, suffix] = match;
    const decimals = raw.split(".")[1]?.length ?? 0;
    const num = raw.includes(",")
      ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals);
    return `${prefix}${num}${suffix}`;
  }

  useEffect(() => {
    if (!match || reduce) return setText(value);
    if (!inView) return;
    const target = parseFloat(match[2].replace(/,/g, ""));
    const controls = animate(0, target, { duration: 1.6, ease: EASE, onUpdate: v => setText(format(v)) });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">{text}</span>
    </span>
  );
}

// Leans toward the pointer and springs back. Off on touch and reduced motion.
export function Magnetic({ children, className = "", strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover)");
  const x = useSpring(useMotionValue(0), { stiffness: 350, damping: 22 });
  const y = useSpring(useMotionValue(0), { stiffness: 350, damping: 22 });
  const on = canHover && !reduce;

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={on ? { x, y } : undefined}
      onPointerMove={e => {
        if (!on || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// Thin bar along the top of the viewport that fills with page scroll.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#357BD8]" />;
}

// A statement whose words light up one by one as it scrolls through.
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span aria-hidden style={{ opacity }} className="inline-block mr-[0.25em]">{children}</motion.span>;
}

// Pins the section and slides its row of cards sideways with vertical scroll.
// Below 1024px, or with reduced motion, the cards render as a plain stack.
export function HorizontalScroll({ children, header }: { children: ReactNode; header?: ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const pinned = wide && !reduce;
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    if (!pinned || !track.current) return;
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [pinned]);

  if (!pinned) {
    return (
      <div>
        {header}
        <div className="px-6 md:px-10 grid md:grid-cols-2 gap-4">{children}</div>
      </div>
    );
  }

  return (
    <div ref={section} style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center">
        {header}
        <motion.div ref={track} style={{ x }} className="flex gap-5 w-max px-10 will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Sticky cards that stack; the ones underneath shrink and dim as the next one lands.
export function StackCards({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = children.length;
  return (
    <div ref={ref} className="grid gap-[18vh]">
      {children.map((child, i) => (
        <StackCard key={i} index={i} count={n} progress={scrollYProgress}>{child}</StackCard>
      ))}
    </div>
  );
}

function StackCard({ children, index, count, progress }: { children: ReactNode; index: number; count: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const end = 1 - (count - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / count, 1], [1, end]);
  const filter = useTransform(progress, [index / count, 1], ["brightness(1)", `brightness(${1 - (count - 1 - index) * 0.12})`]);
  return (
    <motion.div
      style={{ top: `calc(110px + ${index * 18}px)`, ...(reduce ? {} : { scale, filter }) }}
      className="sticky origin-top"
    >
      {children}
    </motion.div>
  );
}

// Image that settles from 1.12 to 1 as it scrolls into view.
export function ZoomImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={reduce ? undefined : { scale }} className="w-full h-full object-cover object-top" />
    </div>
  );
}

// Card with a soft light and border glow that follow the pointer (after Linear).
export function Spotlight({ children, className = "", tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "dark" }) {
  const ref = useRef<HTMLDivElement>(null);
  const glow = tone === "dark" ? "rgba(127,211,230,0.16)" : "rgba(53,123,216,0.10)";
  return (
    <div
      ref={ref}
      onPointerMove={e => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      style={{ ["--glow" as string]: glow }}
      className={`spotlight relative isolate ${className}`}
    >
      {children}
    </div>
  );
}

// Horizontal bars that grow to scale when they scroll into view.
export function ScaleBars({ bars, tone = "light" }: { bars: { label: string; value: string; amount: number; color: string }[]; tone?: "light" | "dark" }) {
  const max = Math.max(...bars.map(b => b.amount));
  return (
    <div className="space-y-5">
      {bars.map((b, i) => (
        <div key={b.label}>
          <div className={`flex justify-between text-sm mb-2 ${tone === "dark" ? "text-white/70" : "text-slate-600"}`}>
            <span>{b.label}</span>
            <CountUp value={b.value} className={`font-semibold ${tone === "dark" ? "text-white" : "text-[#0E1B33]"}`} />
          </div>
          <div className={`h-3 rounded-full overflow-hidden ${tone === "dark" ? "bg-white/10" : "bg-slate-200/70"}`}>
            <motion.div
              className="h-full rounded-full origin-left"
              style={{ background: b.color, width: `${Math.max(1.5, (b.amount / max) * 100)}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
