import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SacredLogo from "@/components/SacredLogo";
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

function HeroSacredGeometry({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.3" opacity="0.1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.4" opacity="0.15" strokeDasharray="2 6" />
      <polygon points="100,20 30,170 170,170" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      <polygon points="100,50 50,150 150,150" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" />
      <ellipse cx="100" cy="110" rx="25" ry="12" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="100" cy="110" r="6" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.25" />
      <circle cx="100" cy="110" r="2.5" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="20" r="8" stroke="currentColor" strokeWidth="0.6" fill="currentColor" opacity="0.08" />
      <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.12" />
      <line x1="100" y1="8" x2="100" y2="2" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="108" y1="12" x2="114" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="92" y1="12" x2="86" y2="8" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <circle cx="30" cy="170" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="170" cy="170" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.4" opacity="0.1" strokeDasharray="1 8" />
    </svg>
  );
}

function SacredMandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.4" opacity="0.1" strokeDasharray="3 5" />
      <polygon points="100,20 30,160 170,160" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.2" />
      <polygon points="100,180 30,40 170,40" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.2" />
      <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.15" />
      <polygon points="100,55 145,100 100,145 55,100" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.12" />
      <ellipse cx="100" cy="100" rx="20" ry="10" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.2" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="100" cy="20" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="180" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="20" cy="100" r="3" fill="currentColor" opacity="0.08" />
      <circle cx="180" cy="100" r="3" fill="currentColor" opacity="0.08" />
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

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--gold)]/10">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-6 text-left group">
        <span className="text-lg font-heading font-semibold text-white/90 group-hover:text-[var(--gold)] transition-colors">{q}</span>
        <ChevronDown className={"w-5 h-5 text-[var(--gold)]/50 transition-transform flex-shrink-0 ml-4 " + (open ? "rotate-180" : "")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-white/70 leading-relaxed">{a}</p>
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
  return (
    <div className="bg-[var(--navy)] min-h-screen font-body text-[#E8E0D0]">
      <Header />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <StarField />
        <div className="absolute inset-0 celestial-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
          <div className="absolute inset-0 rounded-full border border-[var(--gold)]/20" style={{ animation: "orbit 40s linear infinite" }} />
          <div className="absolute inset-12 rounded-full border border-[var(--gold)]/10" style={{ animation: "orbit 30s linear infinite reverse" }} />
          <div className="absolute inset-24 rounded-full border border-[var(--gold)]/5" style={{ animation: "orbit 20s linear infinite" }} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <HeroSacredGeometry className="w-[500px] h-[500px] text-[var(--gold)] opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-10">
              <SacredLogo className="h-20 text-[var(--gold)]" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              We Scale <span className="text-gradient-gold">Personal Development</span> Brands
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/65 mt-8 max-w-2xl mx-auto leading-relaxed font-body">
              Driving Growth Through Paid Media, Optimized Offers, and Conversion Systems
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta">
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-we-help" className="btn-outline">See How We Work</a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* MISSION */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn><SectionLabel>Our Mission</SectionLabel></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Help the people transforming the world build businesses strong enough to <span className="text-gradient-gold">carry their impact.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/65 mt-8 leading-relaxed max-w-2xl mx-auto">
              Many personal development brands grow quickly through great work, referrals, and audience trust. But eventually growth becomes harder to sustain.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-10 text-white/60 text-sm">
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Traffic becomes inconsistent</span>
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Funnels stop converting</span>
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Operations get stretched thin</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-white/70 mt-10 leading-relaxed">
              We help solve that by installing the <span className="text-[var(--gold)]">marketing systems and growth infrastructure</span> required to scale sustainably.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* AUTHORITY */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>Built by Operators</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">Who Have <span className="text-gradient-gold">Done This Before</span></h2>
              <p className="text-white/65 mt-6 max-w-2xl mx-auto leading-relaxed">Our team has helped scale some of the most successful information brands in the industry.</p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FadeIn delay={0.1}><div className="text-center"><div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">$200M+</div><div className="text-white/60 text-sm mt-3 uppercase tracking-wider">Managed Ad Spend</div></div></FadeIn>
            <FadeIn delay={0.2}><div className="text-center"><div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">100s</div><div className="text-white/60 text-sm mt-3 uppercase tracking-wider">Brands Supported</div></div></FadeIn>
            <FadeIn delay={0.3}><div className="text-center"><div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">8-Figure</div><div className="text-white/60 text-sm mt-3 uppercase tracking-wider">Systems Built</div></div></FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-center text-white/55 mt-12 max-w-lg mx-auto italic text-sm">We don't just run ads. We understand the entire ecosystem required for a transformation brand to scale.</p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* SERVICES - 4 COLUMN */}
      <section id="how-we-help" className="py-24 md:py-32 relative overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>The Systems That Drive Growth</SectionLabel>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mt-16">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="flex justify-center mb-6">
                    <s.Icon className="w-16 h-16 md:w-20 md:h-20 text-[var(--gold)] transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg md:text-xl font-heading font-bold text-white">{s.title}</h3>
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* CASE STUDIES */}
      <section id="results" className="py-24 md:py-32 relative overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>Case Studies</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">Proven Growth for <span className="text-gradient-gold">Transformation Brands</span></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {caseStudies.map((cs, i) => (
              <FadeIn key={cs.type} delay={i * 0.1}>
                <div className="dark-card p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">{cs.type}</h3>
                    <p className="text-white/60 text-sm mt-3">
                      <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs">Strategy:</span><br />
                      {cs.strategy}
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-center mb-4">
                      <cs.Icon className="w-16 h-16 text-[var(--gold)] opacity-60" />
                    </div>
                    <div className="pt-4 border-t border-[var(--gold)]/10">
                      <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs">Result:</span>
                      <div className="text-2xl font-heading font-bold text-gradient-gold mt-1">{cs.result}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <p className="text-white/70 font-heading text-lg italic leading-relaxed">"Cortexuum helped us scale faster than we imagined. True experts in the personal development space."</p>
              <p className="text-[var(--gold)]/50 text-sm mt-4">&mdash; Sarah M., Transformational Coach</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn><div className="text-center"><SectionLabel>What Clients Say</SectionLabel></div></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <div className="dark-card p-8 h-full flex flex-col justify-between">
                  <p className="text-white/80 leading-relaxed font-heading text-lg italic">"{t.quote}"</p>
                  <div className="mt-6 pt-4 border-t border-[var(--gold)]/10">
                    <div className="text-white font-medium text-sm">{t.author}</div>
                    <div className="text-[var(--gold)]/50 text-xs">{t.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* FAQ */}
      <section id="faqs" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>Frequently Asked</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">Common <span className="text-gradient-gold">Questions</span></h2>
            </div>
          </FadeIn>
          <div className="mt-12">
            {faqs.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* FINAL CTA */}
      <section id="contact" className="py-32 md:py-44 relative overflow-hidden">
        <StarField />
        <div className="absolute inset-0 gold-glow" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-10">
              <SacredLogo className="h-40 md:h-56 text-[var(--gold)]" stacked showText showTagline large />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">
              Architects of Growth <span className="text-gradient-gold">& Transformation</span>
            </h2>
            <p className="text-white/65 text-lg mt-8 leading-relaxed max-w-xl mx-auto italic font-heading">Engineer the systems behind your vision.</p>
            <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta mt-10 inline-flex">
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
