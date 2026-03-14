import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SacredLogo from "@/components/SacredLogo";
import MysticOrb from "@/components/MysticOrb";
import SandStorm from "@/components/SandStorm";

gsap.registerPlugin(ScrollTrigger);

// Sacred Geometry SVG Icons

function SacredFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M32 6C32 6 18 22 18 36C18 44 24 52 32 52C40 52 46 44 46 36C46 22 32 6 32 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M32 20C32 20 24 30 24 38C24 42 27.5 46 32 46C36.5 46 40 42 40 38C40 30 32 20 32 20Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M32 30C32 30 28 35 28 39C28 41.5 29.8 44 32 44C34.2 44 36 41.5 36 39C36 35 32 30 32 30Z" fill="currentColor" opacity="0.3" />
      <line x1="32" y1="2" x2="32" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="6" x2="26" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="40" y1="6" x2="38" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="12" x2="23" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="44" y1="12" x2="41" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="32" cy="56" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="54" r="0.8" fill="currentColor" opacity="0.3" />
      <circle cx="38" cy="54" r="0.8" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function SacredEye({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="28" ry="28" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="4" r="2" fill="currentColor" opacity="0.6" />
      <ellipse cx="32" cy="32" rx="28" ry="8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" transform="rotate(-20 32 32)" />
      <line x1="32" y1="10" x2="32" y2="22" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <line x1="32" y1="42" x2="32" y2="54" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

function SacredTriangle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,8 8,56 56,56" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <polygon points="32,20 18,48 46,48" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <polygon points="32,30 24,44 40,44" fill="currentColor" opacity="0.15" />
      <line x1="14" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <line x1="32" y1="4" x2="32" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="26" y1="4" x2="28" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="38" y1="4" x2="36" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="6" x2="25" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      <line x1="42" y1="6" x2="39" y2="10" stroke="currentColor" strokeWidth="0.6" opacity="0.2" />
      <circle cx="32" cy="8" r="2" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}

function SacredPulse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polyline points="2,32 14,32 18,18 24,46 30,12 36,52 42,18 46,32 52,32 56,26 60,32 62,32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="2" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
      <circle cx="30" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="36" cy="52" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function CaseStudyPyramid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,6 4,58 60,58" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <polygon points="32,22 16,50 48,50" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="32" cy="38" r="5" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="32" cy="38" r="2" fill="currentColor" opacity="0.4" />
      <line x1="32" y1="2" x2="32" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="26" y1="3" x2="28.5" y2="7" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <line x1="38" y1="3" x2="35.5" y2="7" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

function CaseStudyHexagram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,8 8,50 56,50" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon points="32,56 8,14 56,14" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon points="20,22 44,22 50,32 44,42 20,42 14,32" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
      <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function CaseStudyWave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polyline points="4,40 10,40 14,28 20,44 26,16 32,48 38,20 44,36 50,30 56,34 60,32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="4" y1="52" x2="60" y2="20" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="4 3" />
      <polygon points="60,20 54,22 58,26" fill="currentColor" opacity="0.3" />
      <circle cx="26" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}


// Components

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 justify-center">
      <svg viewBox="0 0 12 12" className="w-3 h-3 text-[var(--gold)]" fill="currentColor" opacity="0.6">
        <polygon points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5" />
      </svg>
      <div className="w-12 h-px bg-[var(--gold)]/30" />
      <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)] font-medium">{children}</span>
      <div className="w-12 h-px bg-[var(--gold)]/30" />
      <svg viewBox="0 0 12 12" className="w-3 h-3 text-[var(--gold)]" fill="currentColor" opacity="0.6">
        <polygon points="6,0 7.5,4.5 12,6 7.5,7.5 6,12 4.5,7.5 0,6 4.5,4.5" />
      </svg>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--gold)]/10">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-6 md:py-8 text-left group">
        <span className="text-lg md:text-xl font-heading font-semibold text-white/90 group-hover:text-[var(--gold)] transition-colors">{q}</span>
        <ChevronDown className={"w-5 h-5 text-[var(--gold)]/50 transition-transform flex-shrink-0 ml-4 " + (open ? "rotate-180" : "")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 md:pb-8 text-white/90 leading-relaxed text-base md:text-lg">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StarField() {
  const stars = useRef(
    Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      delay: Math.random() * 5 + "s",
      duration: (2 + Math.random() * 4) + "s",
      size: (1 + Math.random() * 2) + "px",
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div key={i} className="star" style={{ left: s.left, top: s.top, animationDelay: s.delay, animationDuration: s.duration, width: s.size, height: s.size }} />
      ))}
    </div>
  );
}

function HeroSmoke() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const ctx = gsap.context(() => {
      // Animate rising smoke particles
      const particles = container.querySelectorAll('.smoke-particle');
      particles.forEach((p) => {
        const el = p as HTMLElement;
        const startX = parseFloat(el.dataset.x || '50');
        const dur = parseFloat(el.dataset.dur || '8');
        const delay = parseFloat(el.dataset.delay || '0');

        gsap.set(el, { x: 0, y: 0, opacity: 0, scale: 0.3 });
        gsap.to(el, {
          y: -window.innerHeight * 1.2,
          x: `random(-60, 60)`,
          opacity: 0,
          scale: `random(0.8, 2)`,
          duration: dur,
          delay: delay,
          repeat: -1,
          ease: "none",
          keyframes: [
            { opacity: 0, scale: 0.3, duration: 0 },
            { opacity: parseFloat(el.dataset.maxop || '0.15'), scale: 0.7, duration: dur * 0.15 },
            { opacity: parseFloat(el.dataset.maxop || '0.15'), duration: dur * 0.3 },
            { opacity: 0, scale: `random(1.2, 2.5)`, duration: dur * 0.55 },
          ],
        });
      });

      // Animate smoke wisps (SVG paths)
      const wisps = container.querySelectorAll('.smoke-wisp');
      wisps.forEach((w, i) => {
        gsap.set(w, { opacity: 0, y: 0 });
        gsap.to(w, {
          y: -300 - Math.random() * 200,
          opacity: 0,
          duration: 6 + Math.random() * 4,
          delay: i * 1.5 + Math.random() * 2,
          repeat: -1,
          ease: "power1.out",
          keyframes: [
            { opacity: 0, duration: 0 },
            { opacity: 0.06 + Math.random() * 0.06, duration: 1.5 },
            { opacity: 0, duration: 4 + Math.random() * 3 },
          ],
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Generate particle data
  const smokeParticles = useRef(
    Array.from({ length: 30 }).map(() => ({
      x: 10 + Math.random() * 80,
      size: 4 + Math.random() * 12,
      dur: 6 + Math.random() * 6,
      delay: Math.random() * 8,
      maxop: 0.06 + Math.random() * 0.15,
      color: Math.random() > 0.5 ? 'rgba(201,168,76,' : 'rgba(226,201,126,',
    }))
  ).current;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rising gold smoke particles */}
      {smokeParticles.map((p, i) => (
        <div
          key={i}
          className="smoke-particle absolute rounded-full"
          data-x={p.x}
          data-dur={p.dur}
          data-delay={p.delay}
          data-maxop={p.maxop}
          style={{
            left: p.x + '%',
            bottom: '-5%',
            width: p.size + 'px',
            height: p.size + 'px',
            background: `radial-gradient(circle, ${p.color}${p.maxop}) 0%, ${p.color}0) 70%)`,
            filter: `blur(${1 + Math.random() * 3}px)`,
          }}
        />
      ))}

      {/* SVG smoke wisps — larger organic shapes */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <filter id="smoke-blur">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <radialGradient id="smoke-grad-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(201,168,76,0.12)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </radialGradient>
          <radialGradient id="smoke-grad-2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(226,201,126,0.08)" />
            <stop offset="100%" stopColor="rgba(226,201,126,0)" />
          </radialGradient>
        </defs>
        {/* Smoke wisps */}
        <ellipse className="smoke-wisp" cx="25%" cy="95%" rx="80" ry="30" fill="url(#smoke-grad-1)" filter="url(#smoke-blur)" />
        <ellipse className="smoke-wisp" cx="50%" cy="90%" rx="120" ry="40" fill="url(#smoke-grad-2)" filter="url(#smoke-blur)" />
        <ellipse className="smoke-wisp" cx="70%" cy="92%" rx="90" ry="35" fill="url(#smoke-grad-1)" filter="url(#smoke-blur)" />
        <ellipse className="smoke-wisp" cx="15%" cy="88%" rx="60" ry="25" fill="url(#smoke-grad-2)" filter="url(#smoke-blur)" />
        <ellipse className="smoke-wisp" cx="85%" cy="93%" rx="70" ry="28" fill="url(#smoke-grad-1)" filter="url(#smoke-blur)" />
        <ellipse className="smoke-wisp" cx="40%" cy="96%" rx="100" ry="45" fill="url(#smoke-grad-2)" filter="url(#smoke-blur)" />
      </svg>

      {/* Bottom smoke bed — static ambient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{
        background: 'linear-gradient(to top, rgba(201,168,76,0.04) 0%, rgba(201,168,76,0.02) 30%, transparent 100%)',
        filter: 'blur(20px)',
      }} />
      <div className="absolute bottom-0 left-[20%] right-[20%] h-[20%]" style={{
        background: 'radial-gradient(ellipse at center bottom, rgba(226,201,126,0.06) 0%, transparent 70%)',
        filter: 'blur(15px)',
      }} />
    </div>
  );
}

// Animated counter for authority stats
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const finalText = value + suffix;

  useEffect(() => {
    if (!wrapperRef.current || !counterRef.current) return;

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current || !counterRef.current) return;
        hasAnimated.current = true;
        const numMatch = value.match(/\d+/);
        if (numMatch) {
          const target = parseInt(numMatch[0], 10);
          const prefix = value.slice(0, value.indexOf(numMatch[0]));
          const rest = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);
          const obj = { val: 0 };
          const el = counterRef.current;
          gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + Math.round(obj.val) + rest + suffix;
            },
          });
        }
      },
    });
  }, [value, suffix]);

  return (
    <div ref={wrapperRef} className="text-3xl md:text-5xl font-body font-bold relative">
      {/* Invisible placeholder to reserve full width */}
      <span className="invisible" aria-hidden="true">{finalText}</span>
      {/* Visible animated counter overlaid */}
      <span ref={counterRef} className="absolute inset-0 flex items-center justify-center text-gradient-gold">
        {finalText}
      </span>
    </div>
  );
}

// GSAP ScrollTrigger section wrapper
function GsapSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

// Staggered cards with GSAP
function GsapStaggerCards({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const cards = el.children;

    gsap.fromTo(cards,
      { opacity: 0, y: 80, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

// Parallax floating element
function ParallaxFloat({ children, className = "", speed = 0.3 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.to(el, {
      y: () => -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [speed]);

  return <div ref={ref} className={className}>{children}</div>;
}

// Data

const services = [
  { Icon: SacredFlame, title: "Paid Media", desc: "Targeted Advertising on Google, Meta, YouTube & More" },
  { Icon: SacredEye, title: "Offer & Scale Architecture", desc: "Build & Optimize Your Core Programs" },
  { Icon: SacredTriangle, title: "Conversion Funnels", desc: "High-Converting Landing Pages & Funnels" },
  { Icon: SacredPulse, title: "Email & SMS Marketing", desc: "Engage & Retain Your Audience" },
];

const caseStudies = [
  { Icon: CaseStudyPyramid, type: "7-Figure Coaching Brand", strategy: "New Funnel Build + Paid Ads", result: "3.4x More Applications" },
  { Icon: CaseStudyHexagram, type: "Online Course Business", strategy: "Offer Redesign & Funnel Optimization", result: "5X ROAS on Ad Spend" },
  { Icon: CaseStudyWave, type: "Conscious Leadership Coach", strategy: "Comprehensive Email & SMS Campaigns", result: "$1.2M in New Revenue" },
];

const testimonials = [
  { quote: "Cortexuum helped us scale faster than we imagined. True experts in the personal development space.", author: "Sarah M.", role: "Transformational Coach" },
  { quote: "They understand our world. Not just the marketing, but the mission behind it. That makes all the difference.", author: "David R.", role: "Leadership Educator" },
  { quote: "Our revenue doubled in 90 days. But more importantly, the systems they built let us sustain it.", author: "Jessica L.", role: "Mindset Coach & Author" },
];

const faqs = [
  { q: "Who do you work with?", a: "We specialize in founder-led personal transformation brands \u2014 coaches, educators, and human potential companies doing $30k\u2013$250k/month who are ready to scale sustainably." },
  { q: "How is Cortexuum different from a typical agency?", a: "We integrate paid acquisition with backend architecture. Most agencies just run ads. We design the entire growth ecosystem \u2014 offers, funnels, retention, and operations \u2014 so traffic actually converts into predictable revenue." },
  { q: "How quickly will I see results?", a: "Most clients see measurable improvements within the first 30 days. Full campaign optimization typically takes 60-90 days as we gather data and refine targeting across your entire funnel." },
  { q: "Do you require long-term contracts?", a: "No. We work on month-to-month agreements because we believe results should earn your loyalty, not contracts." },
  { q: "What platforms do you advertise on?", a: "Primarily Meta (Facebook & Instagram), Google & YouTube, TikTok, and LinkedIn. We choose platforms based on where your ideal clients spend their time." },
  { q: "What does a typical engagement look like?", a: "It starts with a strategy call where we diagnose your current growth bottlenecks. From there, we build a custom roadmap covering offer architecture, funnel infrastructure, paid acquisition, and retention systems." },
];

// Page

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Hero parallax - background elements move slower than scroll
  useEffect(() => {
    if (!heroRef.current) return;

    const bg = heroRef.current.querySelectorAll(".hero-parallax-bg");
    bg.forEach((el, i) => {
      gsap.to(el, {
        y: 150 + i * 50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Hero content fades out on scroll
    if (heroContentRef.current) {
      gsap.to(heroContentRef.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen font-body text-[#E8E0D0]">
      <SandStorm />
      <Header />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20">
        <StarField />
        <HeroSmoke />
        <div className="absolute inset-0 celestial-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <MysticOrb className="w-[700px] h-[700px] opacity-20" />
        </div>

        <div ref={heroContentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex justify-center mb-8 md:mb-12">
              <img
                src="/assets/cortexuum-hero-logo.png"
                alt="Cortexuum"
                className="h-48 md:h-80 w-auto object-contain mix-blend-screen"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-8xl font-heading font-bold md:leading-[0.95]">
              We Scale <span className="text-gradient-gold">Personal Development</span> Brands
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            <p className="text-base md:text-2xl text-white/90 mt-6 md:mt-10 max-w-3xl mx-auto leading-relaxed font-body">
              Driving Growth Through Paid Media, Optimized Offers, and Conversion&nbsp;Systems
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12 px-4 md:px-0">
              <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4">
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-we-help" className="btn-outline text-base md:text-lg px-8 md:px-10 py-3.5 md:py-4">See How We Work</a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* MISSION */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <ParallaxFloat className="absolute -top-20 -left-40 opacity-[0.03] pointer-events-none" speed={0.2}>
          <MysticOrb className="w-[500px] h-[500px]" />
        </ParallaxFloat>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <GsapSection>
            <SectionLabel>Our Mission</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mt-4">
              Help the people transforming the world build businesses strong enough to <span className="text-gradient-gold">carry their&nbsp;impact.</span>
            </h2>
          </GsapSection>
          <GsapSection className="mt-10">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Many personal development brands grow quickly through great work, referrals, and audience trust. But eventually growth becomes harder to&nbsp;sustain.
            </p>
          </GsapSection>
          <GsapStaggerCards className="flex flex-col md:flex-row gap-6 justify-center mt-14">
            <div className="dark-card px-8 py-6 text-white/90 text-base md:text-lg font-medium flex-1">Traffic becomes inconsistent</div>
            <div className="dark-card px-8 py-6 text-white/90 text-base md:text-lg font-medium flex-1">Funnels stop converting</div>
            <div className="dark-card px-8 py-6 text-white/90 text-base md:text-lg font-medium flex-1">Operations get stretched thin</div>
          </GsapStaggerCards>
          <GsapSection className="mt-12">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              We help solve that by installing the <span className="text-[var(--gold)] font-semibold">marketing systems and growth&nbsp;infrastructure</span> required to scale&nbsp;sustainably.
            </p>
          </GsapSection>
        </div>
      </section>

      <div className="divider-gold" />

      {/* AUTHORITY */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <StarField />
        <ParallaxFloat className="absolute -bottom-32 -right-40 opacity-[0.04] pointer-events-none" speed={0.15}>
          <MysticOrb className="w-[600px] h-[600px]" />
        </ParallaxFloat>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <GsapSection>
            <div className="text-center">
              <SectionLabel>Built by Operators</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">Who Have <span className="text-gradient-gold">Done This&nbsp;Before</span></h2>
              <p className="text-white/90 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">Our team has helped scale some of the most successful information brands in the&nbsp;industry.</p>
            </div>
          </GsapSection>
          <GsapStaggerCards className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            <div className="dark-card p-10 md:p-12 text-center">
              <AnimatedCounter value="$200M+" />
              <div className="text-white/90 text-sm md:text-base mt-4 uppercase tracking-wider">Managed Ad Spend</div>
            </div>
            <div className="dark-card p-10 md:p-12 text-center">
              <AnimatedCounter value="100s" />
              <div className="text-white/90 text-sm md:text-base mt-4 uppercase tracking-wider">Brands Supported</div>
            </div>
            <div className="dark-card p-10 md:p-12 text-center">
              <AnimatedCounter value="8" suffix="-Figure" />
              <div className="text-white/90 text-sm md:text-base mt-4 uppercase tracking-wider">Systems Built</div>
            </div>
          </GsapStaggerCards>
          <GsapSection className="mt-14">
            <p className="text-center text-white/75 max-w-lg mx-auto italic text-base md:text-lg font-heading">We don&rsquo;t just run ads. We understand the entire ecosystem required for a transformation brand to&nbsp;scale.</p>
          </GsapSection>
        </div>
      </section>

      <div className="divider-gold" />

      {/* SERVICES - 4 COLUMN */}
      <section id="how-we-help" className="py-32 md:py-44 relative overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <GsapSection>
            <div className="text-center">
              <SectionLabel>The Systems That Drive Growth</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">How We <span className="text-gradient-gold">Help You Scale</span></h2>
            </div>
          </GsapSection>
          <GsapStaggerCards className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {services.map((s) => (
              <div key={s.title} className="dark-card p-8 md:p-10 text-center group hover:border-[var(--gold)]/30 transition-all duration-500">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-[var(--gold)]/10 flex items-center justify-center group-hover:border-[var(--gold)]/30 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(201,168,76,0.1)]">
                    <s.Icon className="w-14 h-14 md:w-16 md:h-16 text-[var(--gold)] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white">{s.title}</h3>
                <p className="text-white/90 text-sm md:text-base mt-4 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </GsapStaggerCards>
        </div>
      </section>

      <div className="divider-gold" />

      {/* CASE STUDIES */}
      <section id="results" className="py-32 md:py-44 relative overflow-hidden">
        <StarField />
        <ParallaxFloat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" speed={0.1}>
          <MysticOrb className="w-[700px] h-[700px]" />
        </ParallaxFloat>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <GsapSection>
            <div className="text-center">
              <SectionLabel>Case Studies</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">Proven Growth for <span className="text-gradient-gold">Transformation&nbsp;Brands</span></h2>
            </div>
          </GsapSection>
          <GsapStaggerCards className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {caseStudies.map((cs) => (
              <div key={cs.type} className="dark-card p-10 md:p-12 text-center h-full flex flex-col justify-between group hover:border-[var(--gold)]/25 transition-all duration-500">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">{cs.type}</h3>
                  <p className="text-white/90 text-base mt-4">
                    <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs block mb-2">Strategy</span>
                    {cs.strategy}
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full border border-[var(--gold)]/10 flex items-center justify-center group-hover:border-[var(--gold)]/25 transition-all duration-500">
                      <cs.Icon className="w-12 h-12 text-[var(--gold)] opacity-60" />
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[var(--gold)]/10">
                    <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs">Result</span>
                    <div className="text-3xl font-heading font-bold text-gradient-gold mt-2">{cs.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </GsapStaggerCards>
          <GsapSection className="mt-16">
            <div className="dark-card p-10 md:p-14 text-center max-w-3xl mx-auto">
              <p className="text-white/90 font-heading text-xl md:text-2xl italic leading-relaxed">&ldquo;Cortexuum helped us scale faster than we imagined. True experts in the personal development&nbsp;space.&rdquo;</p>
              <p className="text-[var(--gold)]/50 text-sm md:text-base mt-6">&mdash; Sarah M., Transformational Coach</p>
            </div>
          </GsapSection>
        </div>
      </section>

      <div className="divider-gold" />

      {/* TESTIMONIALS */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <ParallaxFloat className="absolute -top-40 -right-40 opacity-[0.03] pointer-events-none" speed={0.25}>
          <MysticOrb className="w-[500px] h-[500px]" />
        </ParallaxFloat>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <GsapSection>
            <div className="text-center">
              <SectionLabel>What Clients Say</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">Voices of <span className="text-gradient-gold">Transformation</span></h2>
            </div>
          </GsapSection>
          <GsapStaggerCards className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {testimonials.map((t) => (
              <div key={t.author} className="dark-card p-10 md:p-12 h-full flex flex-col justify-between group hover:border-[var(--gold)]/25 transition-all duration-500">
                <p className="text-white/90 leading-relaxed font-heading text-xl md:text-2xl italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 pt-6 border-t border-[var(--gold)]/10">
                  <div className="text-white font-medium text-base">{t.author}</div>
                  <div className="text-[var(--gold)]/50 text-sm mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </GsapStaggerCards>
        </div>
      </section>

      <div className="divider-gold" />

      {/* FAQ */}
      <section id="faqs" className="py-32 md:py-44 relative">
        <div className="max-w-4xl mx-auto px-6">
          <GsapSection>
            <div className="text-center">
              <SectionLabel>Frequently Asked</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">Common&nbsp;<span className="text-gradient-gold">Questions</span></h2>
            </div>
          </GsapSection>
          <GsapSection className="mt-16">
            <div className="dark-card p-8 md:p-12">
              {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
            </div>
          </GsapSection>
        </div>
      </section>

      <div className="divider-gold" />

      {/* FINAL CTA */}
      <section id="contact" className="py-40 md:py-56 relative overflow-hidden">
        <StarField />
        <div className="absolute inset-0 gold-glow" />
        <ParallaxFloat className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none" speed={0.1}>
          <MysticOrb className="w-[800px] h-[800px]" />
        </ParallaxFloat>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <GsapSection>
            <div className="flex justify-center mb-12">
              <SacredLogo className="h-44 md:h-64 text-[var(--gold)]" stacked large />
            </div>
          </GsapSection>
          <GsapSection>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mt-4">
              Architects of Growth <span className="text-gradient-gold">&amp;&nbsp;Transformation</span>
            </h2>
            <p className="text-white/90 text-xl md:text-2xl mt-10 leading-relaxed max-w-xl mx-auto italic font-heading">Engineer the systems behind your&nbsp;vision.</p>
            <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta mt-12 inline-flex text-lg px-12 py-5">
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
            </a>
          </GsapSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
