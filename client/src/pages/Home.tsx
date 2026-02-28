import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, motionValue } from "framer-motion";
import {
  ArrowRight, Brain, Target, TrendingUp, Zap, BarChart3, Users, Sparkles,
  Shield, Clock, Check, Star, Megaphone, Lightbulb, Eye,
  MessageSquare, Bot,
} from "lucide-react";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import christianColgate from "../assets/christian-colgate.webp";
import {
  AnimatedBot, AnimatedMegaphone, AnimatedTarget, AnimatedTrendingUp,
  AnimatedBarChart, AnimatedBrain, AnimatedZap, AnimatedEye,
  AnimatedLightbulb, AnimatedMessageSquare, AnimatedSparkles, AnimatedUsers,
} from "@/components/AnimatedIcons";

const thinkingWords = ["thinks.", "adapts.", "learns.", "converts.", "scales."];

function ThinkingText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = thinkingWords[wordIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % thinkingWords.length);
      return;
    }

    const speed = isDeleting ? 50 : 120;
    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, wordIndex]);

  const currentWord = thinkingWords[wordIndex];
  const displayText = currentWord.slice(0, charIndex);

  return (
    <span className="bg-gradient-to-r from-[#357BD8] via-[#E63E8B] to-[#F5841F] bg-clip-text text-transparent">
      {displayText}
      <span className="inline-block w-[3px] h-[0.85em] bg-gradient-to-b from-[#357BD8] to-[#E63E8B] ml-1 align-middle animate-[blink_0.8s_step-end_infinite] rounded-full" />
    </span>
  );
}

// ===== ANIMATED SVG: Neural network that draws itself =====
function NeuralNetworkSVG() {
  const nodes = [
    // Input layer
    { x: 60, y: 80, layer: 0 }, { x: 60, y: 160, layer: 0 }, { x: 60, y: 240, layer: 0 }, { x: 60, y: 320, layer: 0 },
    // Hidden layer 1
    { x: 200, y: 100, layer: 1 }, { x: 200, y: 180, layer: 1 }, { x: 200, y: 260, layer: 1 },
    // Hidden layer 2
    { x: 340, y: 120, layer: 2 }, { x: 340, y: 200, layer: 2 }, { x: 340, y: 280, layer: 2 },
    // Output layer
    { x: 480, y: 160, layer: 3 }, { x: 480, y: 240, layer: 3 },
  ];

  const connections: { from: number; to: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[j].layer === nodes[i].layer + 1) connections.push({ from: i, to: j });
    }
  }

  return (
    <svg viewBox="0 0 540 400" className="w-full h-full" fill="none">
      {/* Connection lines with staggered draw animation */}
      {connections.map((conn, i) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        return (
          <motion.line
            key={`conn-${i}`}
            x1={from.x} y1={from.y} x2={to.x} y2={to.y}
            stroke="url(#neuralGrad)"
            strokeWidth={1.5}
            strokeOpacity={0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.03, ease: "easeOut" }}
          />
        );
      })}

      {/* Traveling data pulses along connections */}
      {connections.filter((_, i) => i % 4 === 0).map((conn, i) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        return (
          <motion.circle
            key={`pulse-${i}`}
            r={3}
            fill="#00BCD4"
            filter="url(#glow)"
            initial={{ cx: from.x, cy: from.y, opacity: 0 }}
            animate={{
              cx: [from.x, to.x],
              cy: [from.y, to.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 2.5 + i * 0.6,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Nodes with staggered pop-in */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          {/* Outer ring */}
          <motion.circle
            cx={node.x} cy={node.y} r={16}
            stroke={node.layer === 0 ? "#357BD8" : node.layer === 3 ? "#E63E8B" : "#00BCD4"}
            strokeWidth={2}
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + node.layer * 0.3 + (i % 4) * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          />
          {/* Inner dot */}
          <motion.circle
            cx={node.x} cy={node.y} r={5}
            fill={node.layer === 0 ? "#357BD8" : node.layer === 3 ? "#E63E8B" : "#00BCD4"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay: 1.0 + node.layer * 0.3 + (i % 4) * 0.08 }}
          />
          {/* Pulse ring on output nodes */}
          {node.layer === 3 && (
            <motion.circle
              cx={node.x} cy={node.y} r={16}
              stroke="#E63E8B"
              strokeWidth={1}
              fill="none"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 2, delay: 3 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
            />
          )}
        </motion.g>
      ))}

      <defs>
        <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#357BD8" />
          <stop offset="50%" stopColor="#00BCD4" />
          <stop offset="100%" stopColor="#E63E8B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}

// ===== ANIMATED SVG: Orbiting rings around logo =====
function OrbitRings() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Ring 1 - inner */}
        <motion.circle cx={150} cy={150} r={90} fill="none" stroke="#357BD8" strokeWidth={0.8} strokeDasharray="10 14"
          initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }} />
        {/* Ring 2 - middle */}
        <motion.circle cx={150} cy={150} r={115} fill="none" stroke="#00BCD4" strokeWidth={0.6} strokeDasharray="6 18"
          initial={{ rotate: 0 }} animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }} />
        {/* Ring 3 - outer */}
        <motion.circle cx={150} cy={150} r={140} fill="none" stroke="#E63E8B" strokeWidth={0.5} strokeDasharray="4 22"
          initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "150px 150px" }} />
        {/* Orbiting dots */}
        <motion.circle r={4} fill="#357BD8" filter="url(#orbitGlow)"
          initial={{ cx: 240, cy: 150 }} animate={{ cx: [240, 150, 60, 150, 240], cy: [150, 60, 150, 240, 150] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.circle r={3.5} fill="#E63E8B" filter="url(#orbitGlow)"
          initial={{ cx: 60, cy: 150 }} animate={{ cx: [60, 150, 240, 150, 60], cy: [150, 240, 150, 60, 150] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
        <motion.circle r={3} fill="#00BCD4" filter="url(#orbitGlow)"
          initial={{ cx: 150, cy: 20 }} animate={{ cx: [150, 270, 150, 30, 150], cy: [20, 150, 280, 150, 20] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        <defs>
          <filter id="orbitGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
      </svg>
    </div>
  );
}

// ===== Scroll indicator =====
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-slate-400 text-xs font-medium tracking-widest uppercase">Scroll</span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2"
        animate={{ borderColor: ["rgba(148,163,184,0.5)", "rgba(53,123,216,0.6)", "rgba(148,163,184,0.5)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#357BD8]"
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ===== Animated hero stat pill =====
function HeroStat({ value, label, delay, color }: { value: string; label: string; delay: number; color: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-full px-5 py-2.5 shadow-sm"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={`text-lg font-black ${color}`}>{value}</span>
      <span className="text-slate-500 text-sm font-medium">{label}</span>
    </motion.div>
  );
}

// ===== ANIMATED SVG: Circuit board pattern for Services =====
function CircuitBoardSVG() {
  const paths = [
    "M 20,50 L 80,50 L 80,20 L 140,20",
    "M 20,100 L 60,100 L 60,150 L 120,150",
    "M 160,30 L 160,80 L 220,80 L 220,40 L 280,40",
    "M 100,120 L 180,120 L 180,170 L 240,170",
    "M 40,170 L 100,170 L 100,200 L 160,200",
    "M 200,100 L 260,100 L 260,140 L 300,140",
  ];
  const nodes = [
    { x: 20, y: 50 }, { x: 80, y: 50 }, { x: 140, y: 20 },
    { x: 20, y: 100 }, { x: 120, y: 150 }, { x: 160, y: 30 },
    { x: 280, y: 40 }, { x: 100, y: 120 }, { x: 240, y: 170 },
    { x: 40, y: 170 }, { x: 160, y: 200 }, { x: 300, y: 140 },
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" fill="none">
      {paths.map((d, i) => (
        <motion.path key={`p-${i}`} d={d} stroke="#357BD8" strokeWidth={1.5} strokeOpacity={0.2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={`n-${i}`} cx={n.x} cy={n.y} r={4} fill="#357BD8" fillOpacity={0.4}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }} />
      ))}
      {paths.filter((_, i) => i % 2 === 0).map((d, i) => (
        <motion.circle key={`dp-${i}`} r={2.5} fill="#00BCD4"
          initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }}
          transition={{ duration: 3, delay: 2 + i * 1.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
          style={{ offsetPath: `path('${d}')` } as any} />
      ))}
      <defs>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#357BD8" /><stop offset="100%" stopColor="#00BCD4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ===== ANIMATED SVG: Synapse/brain connections for Benefits =====
function SynapseSVG() {
  const synapses = [
    { x1: 30, y1: 40, x2: 120, y2: 80, cx: 75, cy: 30 },
    { x1: 100, y1: 20, x2: 200, y2: 60, cx: 150, cy: 10 },
    { x1: 60, y1: 120, x2: 170, y2: 140, cx: 115, cy: 100 },
    { x1: 150, y1: 100, x2: 250, y2: 120, cx: 200, cy: 80 },
    { x1: 20, y1: 160, x2: 130, y2: 180, cx: 75, cy: 150 },
    { x1: 180, y1: 150, x2: 270, y2: 170, cx: 225, cy: 130 },
  ];
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
      {synapses.map((s, i) => (
        <motion.g key={`syn-${i}`}>
          <motion.path
            d={`M ${s.x1},${s.y1} Q ${s.cx},${s.cy} ${s.x2},${s.y2}`}
            stroke={i % 2 === 0 ? "#E63E8B" : "#F5841F"} strokeWidth={1.5} strokeOpacity={0.25}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: i * 0.25, ease: "easeOut" }} />
          <motion.circle cx={s.x1} cy={s.y1} r={5} fill={i % 2 === 0 ? "#E63E8B" : "#F5841F"} fillOpacity={0.5}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }} />
          <motion.circle cx={s.x2} cy={s.y2} r={5} fill={i % 2 === 0 ? "#F5841F" : "#E63E8B"} fillOpacity={0.5}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }} />
          <motion.circle r={2} fill={i % 2 === 0 ? "#E63E8B" : "#F5841F"}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: 1.5 + i * 0.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            style={{ offsetPath: `path('M ${s.x1},${s.y1} Q ${s.cx},${s.cy} ${s.x2},${s.y2}')` } as any} />
        </motion.g>
      ))}
    </svg>
  );
}

// ===== ANIMATED SVG: Floating quote bubbles for Testimonials =====
function QuoteBubblesSVG() {
  const bubbles = [
    { x: 40, y: 50, size: 35, delay: 0 },
    { x: 140, y: 30, size: 28, delay: 0.3 },
    { x: 240, y: 60, size: 32, delay: 0.6 },
    { x: 90, y: 130, size: 25, delay: 0.9 },
    { x: 200, y: 140, size: 30, delay: 1.2 },
  ];
  return (
    <svg viewBox="0 0 300 180" className="w-full h-full" fill="none">
      {bubbles.map((b, i) => (
        <motion.g key={`bub-${i}`}
          initial={{ y: 20, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: b.delay, ease: [0.22, 1, 0.36, 1] }}>
          <rect x={b.x - b.size / 2} y={b.y - b.size / 2} width={b.size} height={b.size * 0.7}
            rx={8} fill="white" stroke="#F5841F" strokeWidth={1} strokeOpacity={0.3} />
          <motion.text x={b.x} y={b.y + 2} textAnchor="middle" fontSize={b.size * 0.4}
            fill="#F5841F" fillOpacity={0.4} fontWeight="bold"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, delay: b.delay + 1, repeat: Infinity }}>"</motion.text>
          <motion.circle cx={b.x - 3} cy={b.y + b.size * 0.35 + 4} r={2} fill="#F5841F" fillOpacity={0.2}
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, delay: b.delay + 0.5, repeat: Infinity }} />
          <motion.circle cx={b.x - 8} cy={b.y + b.size * 0.35 + 8} r={1.5} fill="#F5841F" fillOpacity={0.15} />
        </motion.g>
      ))}
      {bubbles.map((b, i) => (
        <motion.line key={`line-${i}`}
          x1={b.x + b.size / 2 + 5} y1={b.y}
          x2={bubbles[(i + 1) % bubbles.length].x - bubbles[(i + 1) % bubbles.length].size / 2 - 5}
          y2={bubbles[(i + 1) % bubbles.length].y}
          stroke="#F5841F" strokeWidth={0.5} strokeOpacity={0.15} strokeDasharray="4 6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1.5 + i * 0.2 }} />
      ))}
    </svg>
  );
}

// ===== ANIMATED SVG: Connection graph for Team =====
function ConnectionGraphSVG() {
  const people = [
    { x: 60, y: 50, color: "#357BD8" },
    { x: 160, y: 30, color: "#00BCD4" },
    { x: 260, y: 55, color: "#E63E8B" },
    { x: 110, y: 120, color: "#F5841F" },
    { x: 210, y: 130, color: "#357BD8" },
  ];
  const links = [[0,1],[1,2],[0,3],[1,4],[2,4],[3,4]];
  return (
    <svg viewBox="0 0 320 170" className="w-full h-full" fill="none">
      {links.map(([a, b], i) => (
        <motion.line key={`link-${i}`}
          x1={people[a].x} y1={people[a].y} x2={people[b].x} y2={people[b].y}
          stroke="#357BD8" strokeWidth={1} strokeOpacity={0.15}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }} />
      ))}
      {people.map((p, i) => (
        <motion.g key={`person-${i}`}>
          <motion.circle cx={p.x} cy={p.y} r={18} fill="white" stroke={p.color} strokeWidth={2} strokeOpacity={0.4}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }} />
          <motion.circle cx={p.x} cy={p.y - 4} r={5} fill={p.color} fillOpacity={0.4}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }} />
          <motion.path d={`M ${p.x - 8},${p.y + 10} Q ${p.x},${p.y + 2} ${p.x + 8},${p.y + 10}`}
            stroke={p.color} strokeWidth={1.5} strokeOpacity={0.4} fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }} />
          <motion.circle cx={p.x} cy={p.y} r={18} stroke={p.color} strokeWidth={1} fill="none"
            initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2.5, delay: 2 + i * 0.5, repeat: Infinity, repeatDelay: 3 }} />
        </motion.g>
      ))}
    </svg>
  );
}

// ===== ANIMATED SVG: Pipeline flow for Process =====
function PipelineSVG() {
  const stages = [
    { x: 30, label: "IN", color: "#10B981" },
    { x: 100, label: "", color: "#00BCD4" },
    { x: 170, label: "", color: "#357BD8" },
    { x: 240, label: "", color: "#E63E8B" },
    { x: 310, label: "OUT", color: "#F5841F" },
  ];
  return (
    <svg viewBox="0 0 340 80" className="w-full h-full" fill="none">
      <motion.path d="M 30,40 L 310,40" stroke="url(#pipelineGrad)" strokeWidth={2} strokeOpacity={0.2}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }} />
      {stages.map((s, i) => (
        <motion.g key={`stage-${i}`}>
          <motion.circle cx={s.x} cy={40} r={12} fill="white" stroke={s.color} strokeWidth={2}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.2, ease: [0.34, 1.56, 0.64, 1] }} />
          <motion.circle cx={s.x} cy={40} r={4} fill={s.color}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }} />
        </motion.g>
      ))}
      {[0, 1, 2].map(i => (
        <motion.circle key={`flow-${i}`} r={3} fill="#00BCD4"
          animate={{ cx: [30, 310], cy: [40, 40], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, delay: 2 + i * 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }} />
      ))}
      <defs>
        <linearGradient id="pipelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" /><stop offset="50%" stopColor="#357BD8" /><stop offset="100%" stopColor="#F5841F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ===== ANIMATED SVG: Signal burst for CTA =====
function SignalBurstSVG() {
  const rings = [50, 80, 110, 140];
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i * 30) * Math.PI / 180,
    distance: 60 + Math.random() * 60,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
      {rings.map((r, i) => (
        <motion.circle key={`ring-${i}`} cx={150} cy={150} r={r} stroke="#357BD8" strokeWidth={1} fill="none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "150px 150px" }} />
      ))}
      {particles.map((p, i) => (
        <motion.circle key={`part-${i}`} r={p.size}
          fill={i % 3 === 0 ? "#357BD8" : i % 3 === 1 ? "#00BCD4" : "#E63E8B"}
          initial={{
            cx: 150 + Math.cos(p.angle) * 20,
            cy: 150 + Math.sin(p.angle) * 20,
            opacity: 0,
          }}
          animate={{
            cx: [150 + Math.cos(p.angle) * 20, 150 + Math.cos(p.angle) * p.distance],
            cy: [150 + Math.sin(p.angle) * 20, 150 + Math.sin(p.angle) * p.distance],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 2.5, delay: 1 + p.delay, repeat: Infinity, repeatDelay: 2, ease: "easeOut" }} />
      ))}
      <motion.circle cx={150} cy={150} r={15} fill="#357BD8" fillOpacity={0.3}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "150px 150px" }} />
    </svg>
  );
}

function useCountUp(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

function CounterCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-b from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-500 text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

function useMobileDetect() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

function StickyRevealSection({ children, id, scrollTrackHeight = "300vh" }: { children: (progress: any, isMobile: boolean) => React.ReactNode; id?: string; scrollTrackHeight?: string }) {
  const mobile = useMobileDetect();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  return (
    <div
      ref={trackRef}
      id={id}
      className="relative scroll-mt-20"
      style={mobile ? undefined : { height: scrollTrackHeight }}
    >
      <div className={mobile ? "py-16 px-6" : "sticky top-0 h-screen overflow-hidden flex items-center"}>
        {children(mobile ? null : scrollYProgress, mobile)}
      </div>
    </div>
  );
}

const services = [
  { icon: AnimatedBot, title: "Custom AI Agents", description: "Bespoke AI agents that handle customer interactions, qualify leads, and automate workflows. Running 24/7 so you don't have to.", accent: "from-[#357BD8] to-[#00BCD4]" },
  { icon: AnimatedMegaphone, title: "AI Content Creation", description: "Compelling copy, blog posts, social media content, and ad creative, produced at scale with psychological precision baked in.", accent: "from-[#E63E8B] to-[#F5841F]" },
  { icon: AnimatedTarget, title: "Intelligent Media Buying", description: "AI-optimized ad purchasing across Facebook, Google, and YouTube. Every dollar is placed where it drives the most conversions.", accent: "from-[#00BCD4] to-[#E63E8B]" },
  { icon: AnimatedTrendingUp, title: "AI-Powered Funnels", description: "Dynamic sales funnels that adapt to user behavior in real time. Pages, offers, and follow-ups that evolve with every visitor.", accent: "from-[#00BCD4] to-[#357BD8]" },
  { icon: AnimatedBarChart, title: "Predictive Analytics", description: "Forecasting market trends and campaign performance before you spend a dollar. Data-driven decisions, not gut feelings.", accent: "from-[#357BD8] to-[#00BCD4]" },
  { icon: AnimatedBrain, title: "Psychology-Based Strategy", description: "Marketing strategies built on cognitive psychology, understanding how people actually make decisions, then designing for it.", accent: "from-[#F5841F] to-[#E63E8B]" },
];

const benefits = [
  { icon: AnimatedBrain, title: "Psychology-Based AI", stat: "30-50% Higher ROI", description: "Our AI models are trained on cognitive and behavioral psychology principles. They don't just target audiences. They understand why people buy." },
  { icon: AnimatedZap, title: "24/7 Marketing Intelligence", stat: "Always On", description: "Your campaigns never sleep. AI agents monitor, adjust, and optimize around the clock, catching opportunities humans would miss." },
  { icon: AnimatedTarget, title: "Hyper-Personalization", stat: "40-60% Lower Acquisition", description: "Every touchpoint is tailored. From ad creative to landing pages to follow-ups, each prospect gets a unique journey optimized for conversion." },
  { icon: AnimatedEye, title: "Predictive Insights", stat: "See What's Coming", description: "Don't react to trends. Anticipate them. Our predictive models identify market shifts and customer behavior patterns before they happen." },
];

const testimonials = [
  { name: "Sarah J.", role: "CEO", quote: "Cortexuum increased our client retention by 40% and reduced operational costs by 25%. The AI-driven approach transformed how we think about customer engagement.", rating: 5 },
  { name: "Michael R.", role: "Marketing Director", quote: "We're capturing 3x more qualified leads with half the effort. The psychology-based targeting is unlike anything we've seen from other agencies.", rating: 5 },
  { name: "Jennifer P.", role: "Founder & CMO", quote: "Tasks that took hours now happen in minutes. The AI automation freed up our team to focus on strategy while the systems handle execution flawlessly.", rating: 5 },
];

const teamExpertise = [
  { years: "20+", area: "eCommerce & Development" },
  { years: "15+", area: "Project Management" },
  { years: "15+", area: "Copywriting & Content" },
  { years: "20+", area: "Sales & Growth" },
];

const funnelSteps = [
  { icon: AnimatedLightbulb, label: "Ideation", desc: "Strategy and concept development" },
  { icon: AnimatedMessageSquare, label: "Writing", desc: "Psychology-driven copy" },
  { icon: AnimatedEye, label: "Filming", desc: "Authentic video content" },
  { icon: AnimatedSparkles, label: "Editing", desc: "Polished creative assets" },
  { icon: AnimatedMegaphone, label: "Publishing", desc: "Multi-channel distribution" },
  { icon: AnimatedUsers, label: "Capture", desc: "Lead generation systems" },
  { icon: AnimatedTarget, label: "Nurture", desc: "Automated follow-up sequences" },
  { icon: AnimatedTrendingUp, label: "Convert", desc: "Sales optimization" },
];

function ServiceCard({ service, index, progress, isMobile }: { service: typeof services[0]; index: number; progress: any; isMobile: boolean }) {
  const delay = index * 0.15;
  const cardOpacity = useTransform(progress ?? motionValue(0), [delay, delay + 0.15], [0, 1]);
  const cardY = useTransform(progress ?? motionValue(0), [delay, delay + 0.15], [60, 0]);
  const cardScale = useTransform(progress ?? motionValue(0), [delay, delay + 0.15], [0.9, 1]);

  return (
    <motion.div
      {...(isMobile
        ? { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.5, delay: index * 0.1 } }
        : { style: { opacity: cardOpacity, y: cardY, scale: cardScale } }
      )}
      className="relative bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-xl hover:shadow-[#357BD8]/8 hover:border-[#357BD8]/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-transparent to-[#357BD8]/[0.03] rounded-bl-full group-hover:to-[#357BD8]/[0.08] transition-all duration-300" />
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.accent} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
        <service.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
    </motion.div>
  );
}

function BenefitCard({ benefit, index, progress, isMobile }: { benefit: typeof benefits[0]; index: number; progress: any; isMobile: boolean }) {
  const start = 0.1 + index * 0.2;
  const opacity = useTransform(progress ?? motionValue(0), [start, start + 0.15], [0, 1]);
  const x = useTransform(progress ?? motionValue(0), [start, start + 0.15], [index % 2 === 0 ? -80 : 80, 0]);

  return (
    <motion.div
      {...(isMobile
        ? { initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.5, delay: index * 0.1 } }
        : { style: { opacity, x } }
      )}
      className="relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#E63E8B]/8 hover:border-[#E63E8B]/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#E63E8B]/[0.04] via-transparent to-transparent rounded-tr-full group-hover:from-[#E63E8B]/[0.10] transition-all duration-300" />
      <div className="absolute top-0 right-0 h-[2px] w-0 group-hover:w-1/3 bg-gradient-to-r from-[#E63E8B]/40 to-transparent transition-all duration-500" />
      <div className="flex items-start gap-5 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E63E8B]/10 to-[#F5841F]/5 border border-[#E63E8B]/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#E63E8B]/10 transition-all duration-300">
          <benefit.icon className="w-6 h-6 text-[#E63E8B]" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{benefit.title}</h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold group-hover:bg-emerald-100 transition-colors">
              {benefit.stat}
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed text-sm">{benefit.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index, progress, isMobile }: { testimonial: typeof testimonials[0]; index: number; progress: any; isMobile: boolean }) {
  const start = 0.15 + index * 0.2;
  const cardOpacity = useTransform(progress ?? motionValue(0), [start, start + 0.15], [0, 1]);
  const cardY = useTransform(progress ?? motionValue(0), [start, start + 0.15], [80, 0]);
  const cardScale = useTransform(progress ?? motionValue(0), [start, start + 0.15], [0.85, 1]);

  return (
    <motion.div
      {...(isMobile
        ? { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-50px" }, transition: { duration: 0.5, delay: index * 0.1 } }
        : { style: { opacity: cardOpacity, y: cardY, scale: cardScale } }
      )}
      className="relative bg-white border border-slate-200 rounded-2xl p-8 flex flex-col hover:shadow-xl hover:shadow-amber-500/6 hover:border-amber-400/20 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute top-4 right-5 text-5xl font-serif text-amber-400/10 group-hover:text-amber-400/20 transition-colors duration-300 leading-none select-none">"</div>
      <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-amber-500/[0.04] via-transparent to-transparent rounded-tl-full group-hover:from-amber-500/[0.10] transition-all duration-300" />
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${j * 30}ms` }} />)}
      </div>
      <p className="text-slate-600 leading-relaxed mb-6 flex-1 relative z-10">"{testimonial.quote}"</p>
      <div className="pt-4 border-t border-slate-100 group-hover:border-amber-200/50 transition-colors duration-300 relative z-10">
        <p className="text-slate-800 font-bold">{testimonial.name}</p>
        <p className="text-slate-500 text-sm">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}

function SectionHeading({ progress, isMobile, children, start = 0, end = 0.08, startY = 40 }: { progress: any; isMobile: boolean; children: React.ReactNode; start?: number; end?: number; startY?: number }) {
  const opacity = useTransform(progress ?? motionValue(0), [start, end], [0, 1]);
  const y = useTransform(progress ?? motionValue(0), [start, end], [startY, 0]);

  return (
    <motion.div
      {...(isMobile
        ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }
        : { style: { opacity, y } }
      )}
      className="text-center mb-12"
    >
      {children}
    </motion.div>
  );
}

function TeamSection({ progress, isMobile }: { progress: any; isMobile: boolean }) {
  const leftOpacity = useTransform(progress ?? motionValue(0), [0, 0.15], [0, 1]);
  const leftX = useTransform(progress ?? motionValue(0), [0, 0.15], [-60, 0]);
  const rightOpacity = useTransform(progress ?? motionValue(0), [0.1, 0.25], [0, 1]);
  const rightX = useTransform(progress ?? motionValue(0), [0.1, 0.25], [60, 0]);

  return (
    <div className="w-full px-6 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#357BD8]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#E63E8B]/[0.03] rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_20%_50%,rgba(53,123,216,0.02),transparent)]" />
        <div className="hidden lg:block absolute top-0 left-0 w-[320px] h-[170px] opacity-40">
          <ConnectionGraphSVG />
        </div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-[320px] h-[170px] opacity-30 scale-x-[-1]">
          <ConnectionGraphSVG />
        </div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            {...(isMobile
              ? { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }
              : { style: { opacity: leftOpacity, x: leftX } }
            )}
          >
            <p className="text-[#357BD8] font-mono text-xs tracking-[0.3em] uppercase mb-4">Why CORTEXUUM</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 tracking-tight leading-tight">
              Data-driven solutions that beat opinions.{" "}
              <span className="bg-gradient-to-r from-[#357BD8] to-[#E63E8B] bg-clip-text text-transparent">Every time.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-10">
              With over $200 million in managed ad spend and 7+ years of combined industry experience, we've seen what works and what doesn't.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {teamExpertise.map((exp, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:shadow-[#357BD8]/6 hover:border-[#357BD8]/20 transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#357BD8]/[0.05] to-transparent rounded-bl-full group-hover:from-[#357BD8]/[0.12] transition-all duration-300" />
                  <div className="text-2xl font-black bg-gradient-to-r from-slate-800 to-[#357BD8] bg-clip-text text-transparent mb-1">{exp.years} <span className="text-slate-400 text-base bg-none [-webkit-text-fill-color:unset]">yrs</span></div>
                  <div className="text-slate-500 text-sm">{exp.area}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...(isMobile
              ? { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.2 } }
              : { style: { opacity: rightOpacity, x: rightX } }
            )}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="relative bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-sm shadow-xl shadow-slate-200/60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#357BD8]/[0.03] via-transparent to-[#E63E8B]/[0.03]" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B]" />
                <div className="relative inline-block mb-6 z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#357BD8] to-[#E63E8B] blur-md opacity-20 scale-110" />
                  <img src={christianColgate} alt="Christian Colgate" className="relative w-32 h-32 rounded-full object-cover object-center border-4 border-white shadow-lg" />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-1">Christian Colgate</h3>
                <p className="text-[#357BD8] font-medium mb-4 text-sm">Founder, Digital Growth Architect</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Combining deep psychology expertise with cutting-edge AI to build marketing systems that understand how people actually make decisions.
                </p>
                <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#357BD8] text-white font-bold px-7 py-3 rounded-full hover:bg-[#2d6bc0] transition-colors text-sm shadow-lg shadow-[#357BD8]/20">
                  Book a Call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ step, index, progress, isMobile }: { step: typeof funnelSteps[0]; index: number; progress: any; isMobile: boolean }) {
  const start = index * 0.1;
  const opacity = useTransform(progress ?? motionValue(0), [start, start + 0.1], [0, 1]);
  const scale = useTransform(progress ?? motionValue(0), [start, start + 0.1], [0.7, 1]);
  const y = useTransform(progress ?? motionValue(0), [start, start + 0.1], [40, 0]);

  return (
    <motion.div
      {...(isMobile
        ? { initial: { opacity: 0, y: 20, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, margin: "-30px" }, transition: { duration: 0.4, delay: index * 0.08 } }
        : { style: { opacity, scale, y } }
      )}
      className="relative bg-white border border-slate-200 rounded-xl p-5 text-center hover:shadow-xl hover:shadow-emerald-500/8 hover:border-emerald-400/25 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-2/3 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent transition-all duration-500" />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-emerald-500/10 transition-all duration-300">
          <step.icon className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="text-[10px] text-emerald-600/60 font-mono mb-1 tracking-widest">{String(index + 1).padStart(2, "0")}</div>
        <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">{step.label}</h4>
        <p className="text-xs text-slate-500">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 relative">

      {/* ===== FLOATING AMBIENT DECORATIONS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
        {/* Floating nodes that drift across the viewport */}
        <motion.div className="absolute w-3 h-3 rounded-full bg-[#357BD8]/15"
          animate={{ x: [0, 200, -100, 150, 0], y: [0, 300, 600, 200, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          style={{ top: "10%", left: "5%" }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#E63E8B]/12"
          animate={{ x: [0, -150, 100, -200, 0], y: [0, 400, 200, 500, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          style={{ top: "20%", right: "8%" }} />
        <motion.div className="absolute w-4 h-4 rounded-full bg-[#00BCD4]/10"
          animate={{ x: [0, 120, -80, 60, 0], y: [0, 250, 500, 150, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ top: "35%", left: "3%" }} />
        <motion.div className="absolute w-2.5 h-2.5 rounded-full bg-[#F5841F]/12"
          animate={{ x: [0, -100, 200, -50, 0], y: [0, 350, 100, 450, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ top: "50%", right: "4%" }} />
        <motion.div className="absolute w-2 h-2 rounded-full bg-[#357BD8]/10"
          animate={{ x: [0, 80, -120, 180, 0], y: [0, 200, 400, 100, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ top: "65%", left: "7%" }} />
        <motion.div className="absolute w-3 h-3 rounded-full bg-[#E63E8B]/10"
          animate={{ x: [0, -180, 60, -120, 0], y: [0, 150, 350, 500, 0] }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{ top: "80%", right: "6%" }} />

        {/* Floating thin connecting lines - use div-based approach to avoid SVG percentage issues */}
        {[
          { top: "15%", left: "2%", height: "30%", rotate: 15, color: "#357BD8", dur: 20 },
          { top: "25%", right: "4%", height: "30%", rotate: -12, color: "#E63E8B", dur: 25 },
          { top: "60%", left: "4%", height: "25%", rotate: 10, color: "#00BCD4", dur: 22 },
          { top: "50%", right: "3%", height: "25%", rotate: -8, color: "#F5841F", dur: 28 },
        ].map((line, i) => (
          <motion.div key={`line-${i}`}
            className="absolute w-[1px]"
            style={{ top: line.top, left: line.left, right: (line as any).right, height: line.height, backgroundColor: line.color, opacity: 0.06 }}
            animate={{ rotate: [line.rotate, -line.rotate, line.rotate], scaleY: [1, 1.2, 1] }}
            transition={{ duration: line.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Small orbiting ring clusters in the margins */}
        <motion.div className="absolute top-[30%] left-[2%] w-16 h-16"
          animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          <div className="w-full h-full rounded-full border border-[#357BD8]/8 border-dashed" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#357BD8]/20" />
        </motion.div>
        <motion.div className="absolute top-[55%] right-[2%] w-14 h-14"
          animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
          <div className="w-full h-full rounded-full border border-[#E63E8B]/8 border-dashed" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E63E8B]/20" />
        </motion.div>
        <motion.div className="absolute top-[75%] left-[3%] w-12 h-12"
          animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
          <div className="w-full h-full rounded-full border border-[#00BCD4]/8 border-dashed" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00BCD4]/20" />
        </motion.div>
      </div>

      {/* ===== HERO -Parallax fade out ===== */}
      <div ref={heroRef} className="relative h-[150vh]">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          {/* Background layers */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#357BD8]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#E63E8B]/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00BCD4]/6 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(248,250,252,0.7)_70%)]" />
          </div>

          {/* Neural network -left side on desktop, hidden on mobile */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[420px] h-[340px] opacity-60">
            <NeuralNetworkSVG />
          </div>

          {/* Neural network -right side mirrored on desktop */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[340px] opacity-40 scale-x-[-1]">
            <NeuralNetworkSVG />
          </div>

          {/* Main content */}
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Logo with orbit rings */}
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <div className="relative inline-flex items-center justify-center w-48 h-48 mb-6">
                <OrbitRings />
                <img src={cortexuumLogoCircle} alt="CORTEXUUM" className="rounded-full ring-2 ring-[#357BD8]/20 shadow-lg relative z-10" />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <span className="text-sm font-extrabold tracking-[0.3em] uppercase text-[#357BD8] block mb-6">CORTEXUUM</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-6 tracking-tight text-slate-800">
              Marketing that
              <br />
              <ThinkingText />
            </motion.h1>

            {/* Subcopy -punchy, not generic */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              We build AI systems that study how your customers make decisions, then engineer every ad, funnel, and follow-up to convert.
              <span className="block mt-2 text-slate-400 text-base">Not another agency. A growth engine trained on psychology.</span>
            </motion.p>

            {/* Stat pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <HeroStat value="$200M+" label="Ad spend managed" delay={1.0} color="text-[#357BD8]" />
              <HeroStat value="3x" label="Avg lead increase" delay={1.15} color="text-[#00BCD4]" />
              <HeroStat value="40%" label="Lower acquisition cost" delay={1.3} color="text-[#E63E8B]" />
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-bold px-10 py-5 rounded-full text-lg shadow-xl shadow-[#357BD8]/25 hover:shadow-[#357BD8]/40 transition-all"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(53,123,216,0.35)" }} whileTap={{ scale: 0.98 }}>
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </motion.div>
      </div>

      {/* ===== STATS -Animated counters ===== */}
      <section className="relative py-24 px-6 -mt-[50vh]" style={{ position: 'relative', zIndex: 2 }}>
        <div className="max-w-5xl mx-auto relative bg-white border border-slate-200 rounded-3xl p-10 md:p-14 shadow-2xl shadow-slate-200/60 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B]" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#357BD8]/[0.04] to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#E63E8B]/[0.04] to-transparent rounded-tr-full" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CounterCard value={200} suffix="M+" label="Managed Ad Spend" />
            <CounterCard value={7} suffix="" label="Years Experience" />
            <CounterCard value={3} suffix="x" label="Avg Lead Increase" />
            <CounterCard value={40} suffix="%" label="Avg Cost Reduction" />
          </div>
        </div>
      </section>

      {/* ===== SERVICES -Sticky with scroll-linked card reveals ===== */}
      <StickyRevealSection id="services" scrollTrackHeight="250vh">
        {(progress, isMobile) => (
          <div className="w-full px-6 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-[#357BD8]/[0.04] rounded-full blur-[100px]" />
              <div className="absolute -bottom-32 -left-32 w-[350px] h-[350px] bg-[#00BCD4]/[0.04] rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
              <div className="hidden lg:block absolute -top-10 -right-10 w-[320px] h-[220px] opacity-50">
                <CircuitBoardSVG />
              </div>
              <div className="hidden lg:block absolute -bottom-10 -left-10 w-[320px] h-[220px] opacity-30 scale-x-[-1]">
                <CircuitBoardSVG />
              </div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <SectionHeading progress={progress} isMobile={isMobile}>
                <p className="text-[#357BD8] font-mono text-xs tracking-[0.3em] uppercase mb-4">What We Do</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-800">
                  Intelligent solutions{" "}
                  <span className="bg-gradient-to-r from-[#357BD8] to-[#E63E8B] bg-clip-text text-transparent">that beat generic marketing.</span>
                </h2>
                <p className="text-slate-500 text-base max-w-xl mx-auto">Every service powered by AI models trained on psychological principles.</p>
              </SectionHeading>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, i) => (
                  <ServiceCard key={i} service={service} index={i} progress={progress} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== BENEFITS -Sticky with slide-in cards ===== */}
      <StickyRevealSection id="benefits" scrollTrackHeight="250vh">
        {(progress, isMobile) => (
          <div className="w-full px-6 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-20 w-[300px] h-[300px] bg-[#E63E8B]/[0.04] rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] bg-[#E63E8B]/[0.04] rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_70%_30%,rgba(230,62,139,0.03),transparent)]" />
              <div className="hidden lg:block absolute top-0 right-0 w-[300px] h-[200px] opacity-50">
                <SynapseSVG />
              </div>
              <div className="hidden lg:block absolute bottom-0 left-0 w-[300px] h-[200px] opacity-30 scale-y-[-1]">
                <SynapseSVG />
              </div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <SectionHeading progress={progress} isMobile={isMobile}>
                <p className="text-[#E63E8B] font-mono text-xs tracking-[0.3em] uppercase mb-4">Why It Works</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800">
                  Marketing that understands{" "}
                  <span className="bg-gradient-to-r from-[#E63E8B] to-[#F5841F] bg-clip-text text-transparent">how people think.</span>
                </h2>
              </SectionHeading>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <BenefitCard key={i} benefit={benefit} index={i} progress={progress} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== TESTIMONIALS -Sticky with staggered pop-in ===== */}
      <StickyRevealSection id="results" scrollTrackHeight="200vh">
        {(progress, isMobile) => (
          <div className="w-full px-6 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 left-1/3 w-[400px] h-[400px] bg-[#F5841F]/[0.03] rounded-full blur-[120px]" />
              <div className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] bg-[#357BD8]/[0.03] rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_30%_60%,rgba(245,132,31,0.02),transparent)]" />
              <div className="hidden lg:block absolute top-5 -left-5 w-[300px] h-[180px] opacity-50">
                <QuoteBubblesSVG />
              </div>
              <div className="hidden lg:block absolute bottom-5 -right-5 w-[300px] h-[180px] opacity-30 scale-x-[-1]">
                <QuoteBubblesSVG />
              </div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <SectionHeading progress={progress} isMobile={isMobile} end={0.1}>
                <p className="text-amber-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">Client Results</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800">Don't take our word for it.</h2>
              </SectionHeading>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <TestimonialCard key={i} testimonial={t} index={i} progress={progress} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== TEAM -Sticky split reveal ===== */}
      <StickyRevealSection scrollTrackHeight="200vh">
        {(progress, isMobile) => (
          <TeamSection progress={progress} isMobile={isMobile} />
        )}
      </StickyRevealSection>

      {/* ===== PROCESS -Sticky with step-by-step reveal ===== */}
      <StickyRevealSection id="process" scrollTrackHeight="250vh">
        {(progress, isMobile) => (
          <div className="w-full px-6 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-24 right-1/4 w-[350px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 left-1/3 w-[300px] h-[300px] bg-[#00BCD4]/[0.04] rounded-full blur-[100px]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
              <div className="hidden lg:block absolute bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-[80px] opacity-30">
                <PipelineSVG />
              </div>
              <div className="hidden lg:block absolute top-10 -right-10 w-[300px] h-[200px] opacity-40">
                <CircuitBoardSVG />
              </div>
            </div>
            <div className="max-w-6xl mx-auto relative z-10">
              <SectionHeading progress={progress} isMobile={isMobile} end={0.06}>
                <p className="text-emerald-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">The 90-Day Approach</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-800">
                  From strategy to{" "}
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">consistent conversions.</span>
                </h2>
                <p className="text-slate-500 text-base max-w-xl mx-auto">A systematic buildout engineered to create a predictable pipeline.</p>
              </SectionHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {funnelSteps.map((step, i) => (
                  <ProcessStep key={i} step={step} index={i} progress={progress} isMobile={isMobile} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#357BD8]/8 via-[#E63E8B]/5 to-[#00BCD4]/8" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#357BD8]/[0.08] rounded-full blur-[150px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E63E8B]/[0.05] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#00BCD4]/[0.05] rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-25">
            <SignalBurstSVG />
          </div>
          <div className="hidden lg:block absolute top-10 -left-10 w-[250px] h-[180px] opacity-15">
            <NeuralNetworkSVG />
          </div>
          <div className="hidden lg:block absolute bottom-10 -right-10 w-[250px] h-[180px] opacity-15 scale-x-[-1]">
            <NeuralNetworkSVG />
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#357BD8]/15 rounded-full px-5 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-[#357BD8]" />
              <span className="text-sm font-semibold text-[#357BD8]">Free Strategy Session</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-800">
              Ready to see what<br />
              <span className="bg-gradient-to-r from-[#357BD8] via-[#E63E8B] to-[#F5841F] bg-clip-text text-transparent">AI-powered marketing</span> can do?
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. No obligations, just real insights for your business.
            </p>
            <div className="flex items-center justify-center">
              <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-bold px-12 py-5 rounded-full text-lg shadow-2xl shadow-[#357BD8]/25 hover:shadow-[#357BD8]/40 transition-all"
                whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(53,123,216,0.35)" }} whileTap={{ scale: 0.98 }}>
                BOOK A CALL NOW <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT / BOOK A CALL ===== */}
      <section id="contact" className="relative py-24 px-6 scroll-mt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-[#357BD8]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 left-0 w-[350px] h-[350px] bg-[#E63E8B]/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#357BD8] font-mono text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-800">Ready to see results?</h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto">Book a free 30-minute strategy call. No obligations, just real insights for your business.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="relative bg-white border border-slate-200 rounded-2xl p-7 shadow-sm overflow-hidden group hover:shadow-lg hover:border-[#357BD8]/15 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-transparent" />
              <h3 className="text-base font-bold text-slate-800 mb-5">What happens next?</h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Schedule a free 30-minute strategy call" },
                  { step: "2", text: "We deep-dive into your business goals" },
                  { step: "3", text: "Receive a custom AI marketing proposal" },
                  { step: "4", text: "Launch your first campaign in weeks" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#357BD8]/10 to-[#00BCD4]/10 border border-[#357BD8]/20 flex items-center justify-center flex-shrink-0 text-[#357BD8] text-xs font-bold">{item.step}</div>
                    <p className="text-slate-500 text-sm pt-0.5">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative bg-white border border-slate-200 rounded-2xl p-7 shadow-sm overflow-hidden group hover:shadow-lg hover:border-[#E63E8B]/15 transition-all duration-300">
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#E63E8B]/[0.04] to-transparent rounded-tl-full group-hover:from-[#E63E8B]/[0.10] transition-all duration-300" />
              <h3 className="text-base font-bold text-slate-800 mb-3">See our work</h3>
              <p className="text-slate-500 text-sm mb-4">Check out real projects we've shipped for real businesses.</p>
              <a href="/services/websites" className="inline-flex items-center gap-2 text-[#357BD8] hover:text-[#E63E8B] font-medium text-sm transition-colors group-hover:gap-3">
                View Portfolio <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center">
            <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-bold px-12 py-5 rounded-full text-lg shadow-2xl shadow-[#357BD8]/25 hover:shadow-[#357BD8]/40 transition-all"
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(53,123,216,0.35)" }} whileTap={{ scale: 0.98 }}>
              BOOK A CALL <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative overflow-hidden bg-slate-900 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#357BD8]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E63E8B]/8 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="hidden lg:block absolute top-10 right-10 w-[250px] h-[180px] opacity-20">
            <NeuralNetworkSVG />
          </div>
        </div>

        {/* Main footer CTA area */}
        <div className="relative z-10 pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 relative">
                <img src={cortexuumLogoCircle} alt="CORTEXUUM" className="w-16 h-16 rounded-full ring-2 ring-white/10" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Let's build something{" "}
                <span className="bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B] bg-clip-text text-transparent">intelligent.</span>
              </h3>
              <p className="text-slate-400 text-base max-w-lg mx-auto mb-8">
                Your competitors are still guessing. You don't have to.
              </p>
              <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-bold px-10 py-4 rounded-full text-base shadow-xl shadow-[#357BD8]/30 hover:shadow-[#357BD8]/50 transition-all"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                Book a Strategy Call <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* Stats strip */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "$200M+", label: "Ad Spend Managed" },
                { value: "7", label: "Years Experience" },
                { value: "3x", label: "Avg Lead Increase" },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="max-w-6xl mx-auto border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm tracking-[0.2em] uppercase text-white/60">CORTEXUUM</span>
                <span className="text-white/20">|</span>
                <span className="text-slate-500 text-xs">&copy; {new Date().getFullYear()}</span>
              </div>

              <div className="flex items-center gap-6">
                {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Cookies", href: "/cookies" }].map(l => (
                  <a key={l.label} href={l.href} className="text-slate-500 hover:text-white/80 text-xs transition-colors">{l.label}</a>
                ))}
                <a href="/login" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">Admin</a>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-slate-600 text-xs">
                Designed by Ignacio Nunez · <a href="mailto:dev@ignacionunez.dev" className="hover:text-[#357BD8] transition-colors">dev@ignacionunez.dev</a> · <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#357BD8] transition-colors">plaintalk.dev</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
