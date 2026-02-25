import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
};

export function AnimatedBot({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.rect x="3" y="11" width="18" height="10" rx="2" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="12" cy="5" r="2" initial="hidden" animate="visible" variants={draw} />
      <motion.line x1="12" y1="7" x2="12" y2="11" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="8" cy="16" r="1" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.2, duration: 0.4 }} />
      <motion.circle cx="16" cy="16" r="1" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.4, duration: 0.4 }} />
      <motion.path d="M9 19h6" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 1.5, duration: 0.5, ease: "easeInOut" } } }} />
      <motion.line x1="1" y1="16" x2="3" y2="16" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.line x1="21" y1="16" x2="23" y2="16" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }} />
    </motion.svg>
  );
}

export function AnimatedMegaphone({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M3 11l18-5v12L3 13v-2z" initial="hidden" animate="visible" variants={draw} />
      <motion.path d="M11.6 16.8a3 3 0 11-5.8-1.6" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 1, duration: 0.8, ease: "easeInOut" } } }} />
      <motion.circle cx="20" cy="8" r="1" fill="currentColor" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
      <motion.circle cx="22" cy="6" r="0.7" fill="currentColor" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
      <motion.circle cx="22" cy="10" r="0.7" fill="currentColor" animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }} />
    </motion.svg>
  );
}

export function AnimatedTarget({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.circle cx="12" cy="12" r="10" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="12" cy="12" r="6" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 0.4, duration: 1, ease: "easeInOut" } } }} />
      <motion.circle cx="12" cy="12" r="2" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } } }} />
      <motion.circle cx="12" cy="12" r="1" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 1.4, duration: 0.5 }} />
      <motion.circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth={0.5} animate={{ r: [3, 14, 3], opacity: [0.6, 0, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} />
    </motion.svg>
  );
}

export function AnimatedTrendingUp({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.polyline points="22 7 13.5 15.5 8.5 10.5 2 17" initial="hidden" animate="visible" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } } }} />
      <motion.polyline points="16 7 22 7 22 13" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
      <motion.circle cx="22" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth={0.5} animate={{ r: [2, 5, 2], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.5 }} />
    </motion.svg>
  );
}

export function AnimatedBarChart({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.rect x="3" y="12" width="4" height="9" rx="1" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0, ease: "easeOut" }} style={{ originY: 1 }} />
      <motion.rect x="10" y="6" width="4" height="15" rx="1" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} style={{ originY: 1 }} />
      <motion.rect x="17" y="3" width="4" height="18" rx="1" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} style={{ originY: 1 }} />
      <motion.rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" fillOpacity={0.15} animate={{ fillOpacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
      <motion.rect x="10" y="6" width="4" height="15" rx="1" fill="currentColor" fillOpacity={0.15} animate={{ fillOpacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" fillOpacity={0.15} animate={{ fillOpacity: [0.15, 0.35, 0.15] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
    </motion.svg>
  );
}

export function AnimatedBrain({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M12 2a4 4 0 014 4c0 .6-.1 1.1-.4 1.6A4 4 0 0118 11c0 1-.4 2-1 2.7A4 4 0 0118 16a4 4 0 01-3 3.9V22h-6v-2.1A4 4 0 016 16a4 4 0 011-2.3A4 4 0 016 11a4 4 0 012.4-3.4A4 4 0 018 6a4 4 0 014-4z"
        initial="hidden" animate="visible" variants={draw} />
      <motion.line x1="12" y1="2" x2="12" y2="22" strokeWidth={0.8} strokeDasharray="2 2" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="9" cy="9" r="0.8" fill="currentColor" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
      <motion.circle cx="15" cy="9" r="0.8" fill="currentColor" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="9" cy="14" r="0.8" fill="currentColor" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
      <motion.circle cx="15" cy="14" r="0.8" fill="currentColor" animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} />
    </motion.svg>
  );
}

export function AnimatedZap({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" initial="hidden" animate="visible"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } } }} />
      <motion.polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fillOpacity={0}
        animate={{ fillOpacity: [0, 0.25, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
    </motion.svg>
  );
}

export function AnimatedEye({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="12" cy="12" r="3" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } } }} />
      <motion.circle cx="12" cy="12" r="1.2" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ delay: 1.4, duration: 0.4 }} />
      <motion.circle cx="12" cy="12" r="1.2" fill="currentColor" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
    </motion.svg>
  );
}

export function AnimatedLightbulb({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M9 18h6M10 22h4" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 1, duration: 0.5 } } }} />
      <motion.path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="12" cy="6" r="2" fill="currentColor" fillOpacity={0} animate={{ fillOpacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    </motion.svg>
  );
}

export function AnimatedMessageSquare({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="8" cy="10" r="0.8" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1.5 }} />
      <motion.circle cx="12" cy="10" r="0.8" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 1.8 }} />
      <motion.circle cx="16" cy="10" r="0.8" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 2.1 }} />
    </motion.svg>
  );
}

export function AnimatedSparkles({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" initial="hidden" animate="visible" variants={draw} />
      <motion.path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" fill="currentColor" fillOpacity={0}
        animate={{ fillOpacity: [0, 0.3, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="19" cy="5" r="1" fill="currentColor" animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <motion.circle cx="5" cy="19" r="1" fill="currentColor" animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
    </motion.svg>
  );
}

export function AnimatedUsers({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <motion.path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" initial="hidden" animate="visible" variants={draw} />
      <motion.circle cx="9" cy="7" r="4" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 0.3, duration: 1 } } }} />
      <motion.path d="M23 21v-2a4 4 0 00-3-3.87" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 0.8, duration: 0.8 } } }} />
      <motion.path d="M16 3.13a4 4 0 010 7.75" initial="hidden" animate="visible" variants={{ ...draw, visible: { ...draw.visible, transition: { delay: 1, duration: 0.8 } } }} />
    </motion.svg>
  );
}

export const animatedIconMap: Record<string, (props: { className?: string }) => JSX.Element> = {
  Bot: AnimatedBot,
  Megaphone: AnimatedMegaphone,
  Target: AnimatedTarget,
  TrendingUp: AnimatedTrendingUp,
  BarChart3: AnimatedBarChart,
  Brain: AnimatedBrain,
  Zap: AnimatedZap,
  Eye: AnimatedEye,
  Lightbulb: AnimatedLightbulb,
  MessageSquare: AnimatedMessageSquare,
  Sparkles: AnimatedSparkles,
  Users: AnimatedUsers,
};
