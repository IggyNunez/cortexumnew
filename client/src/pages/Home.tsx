import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Flame, Target, Triangle, Activity } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-[var(--gold)]" />
      <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] font-medium">{children}</span>
      <div className="w-8 h-px bg-[var(--gold)]" />
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
        <ChevronDown className={`w-5 h-5 text-[var(--gold)]/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-white/50 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return { count, ref };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">{count}{suffix}</div>
      <div className="text-white/40 text-sm mt-2 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }}
        />
      ))}
    </div>
  );
}

// DATA
const services = [
  {
    icon: Flame,
    title: "Paid Media",
    subtitle: "Predictable client acquisition across the platforms that matter most.",
    desc: "We manage paid acquisition across Meta, Google & YouTube, TikTok, and LinkedIn. Our approach focuses on bringing qualified prospects into your ecosystem and converting them into booked calls, program enrollments, or course buyers.",
  },
  {
    icon: Target,
    title: "Offer & Scale Architecture",
    subtitle: "Turning your expertise into a scalable flagship offer.",
    desc: "Before scaling traffic, we ensure your business is structurally ready to grow. Flagship offer positioning, ascension path strategy, offer consolidation, and internal systems to support higher client volume.",
  },
  {
    icon: Triangle,
    title: "Conversion Funnels",
    subtitle: "High-converting landing pages and funnel infrastructure.",
    desc: "Landing pages, webinar funnels, application funnels, course sales pages, and full website optimization. Every page is built around clear messaging, conversion psychology, and measurable performance.",
  },
  {
    icon: Activity,
    title: "Email & SMS Marketing",
    subtitle: "Maximizing revenue from the audience you already have.",
    desc: "Automated nurture sequences, launch campaigns, evergreen sales flows, and SMS remarketing. This turns your audience into a long-term revenue engine, not just a one-time opportunity.",
  },
];

const caseStudies = [
  {
    type: "7-Figure Coaching Brand",
    strategy: "New Funnel Build + Paid Ads",
    result: "3.5x More Qualified Leads",
  },
  {
    type: "Online Education Brand",
    strategy: "Offer Redesign & Funnel Optimization",
    result: "Doubled Monthly Revenue",
  },
  {
    type: "Conscious Leadership Coach",
    strategy: "Comprehensive Email & SMS Campaigns",
    result: "550% Increase in Program Sales",
  },
];

const testimonials = [
  {
    quote: "Cortexuum helped us scale faster than we imagined. True experts in the personal development space.",
    author: "Sarah M.",
    role: "Transformational Coach",
  },
  {
    quote: "They understand our world. Not just the marketing, but the mission behind it. That makes all the difference.",
    author: "David R.",
    role: "Leadership Educator",
  },
  {
    quote: "Our revenue doubled in 90 days. But more importantly, the systems they built let us sustain it.",
    author: "Jessica L.",
    role: "Mindset Coach & Author",
  },
];

const faqs = [
  { q: "Who do you work with?", a: "We specialize in founder-led personal transformation brands — coaches, educators, and human potential companies doing $30k–$250k/month who are ready to scale sustainably." },
  { q: "How is Cortexuum different from a typical agency?", a: "We integrate paid acquisition with backend architecture. Most agencies just run ads. We design the entire growth ecosystem — offers, funnels, retention, and operations — so traffic actually converts into predictable revenue." },
  { q: "How quickly will I see results?", a: "Most clients see measurable improvements within the first 30 days. Full campaign optimization typically takes 60-90 days as we gather data and refine targeting across your entire funnel." },
  { q: "Do you require long-term contracts?", a: "No. We work on month-to-month agreements because we believe results should earn your loyalty, not contracts." },
  { q: "What platforms do you advertise on?", a: "Primarily Meta (Facebook & Instagram), Google & YouTube, TikTok, and LinkedIn. We choose platforms based on where your ideal clients spend their time." },
  { q: "What does a typical engagement look like?", a: "It starts with a strategy call where we diagnose your current growth bottlenecks. From there, we build a custom roadmap covering offer architecture, funnel infrastructure, paid acquisition, and retention systems." },
];

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
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-10">
              <img src={cortexuumLogoCircle} alt="Cortexuum" className="w-20 h-20 object-contain opacity-80" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              We Scale <span className="text-gradient-gold">Personal Development</span> Brands
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/40 mt-8 max-w-2xl mx-auto leading-relaxed font-body">
              We help founder-led transformation companies grow through paid acquisition, high-converting funnels, and scalable marketing systems.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="text-sm text-white/30 mt-4 max-w-xl mx-auto italic">
              Built for coaches, educators, and human potential brands ready to turn proven programs into predictable revenue engines.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta">
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-we-help" className="btn-outline">
                See How We Work
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider-gold" />

      {/* POSITIONING / MISSION */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <SectionLabel>Our Mission</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Help the people transforming the world build businesses strong enough to <span className="text-gradient-gold">carry their impact.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/40 mt-8 leading-relaxed max-w-2xl mx-auto">
              Many personal development brands grow quickly through great work, referrals, and audience trust. But eventually growth becomes harder to sustain.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col md:flex-row gap-6 justify-center mt-10 text-white/30 text-sm">
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Traffic becomes inconsistent</span>
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Funnels stop converting</span>
              <span className="border border-[var(--gold)]/10 rounded-lg px-6 py-3">Operations get stretched thin</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-white/50 mt-10 leading-relaxed">
              We help solve that by installing the <span className="text-[var(--gold)]">marketing systems and growth infrastructure</span> required to scale sustainably.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* AUTHORITY / EXPERIENCE */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <StarField />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>Built by Operators</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">
                Who Have <span className="text-gradient-gold">Done This Before</span>
              </h2>
              <p className="text-white/40 mt-6 max-w-2xl mx-auto leading-relaxed">
                Our team has helped scale some of the most successful information brands in the industry.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FadeIn delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">$200M+</div>
                <div className="text-white/40 text-sm mt-3 uppercase tracking-wider">Managed Ad Spend</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">100s</div>
                <div className="text-white/40 text-sm mt-3 uppercase tracking-wider">Brands Supported</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-gold">8-Figure</div>
                <div className="text-white/40 text-sm mt-3 uppercase tracking-wider">Systems Built</div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-center text-white/30 mt-12 max-w-lg mx-auto italic text-sm">
              We don't just run ads. We understand the entire ecosystem required for a transformation brand to scale.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="divider-gold" />

      {/* HOW WE HELP - SERVICES */}
      <section id="how-we-help" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>The Systems That Drive Growth</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">
                Scaling requires more than <span className="text-gradient-gold">just traffic.</span>
              </h2>
              <p className="text-white/40 mt-6 max-w-2xl mx-auto leading-relaxed">
                It requires the right offers, funnels, and marketing infrastructure working together. We focus on the four areas that actually move revenue.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="dark-card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 flex items-center justify-center mb-6">
                    <s.icon className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">{s.title}</h3>
                  <p className="text-[var(--gold)]/70 text-sm mt-2 italic">{s.subtitle}</p>
                  <p className="text-white/40 mt-4 leading-relaxed text-sm">{s.desc}</p>
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
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">
                Proven Growth for <span className="text-gradient-gold">Transformation Brands</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {caseStudies.map((cs, i) => (
              <FadeIn key={cs.type} delay={i * 0.1}>
                <div className="dark-card p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">{cs.type}</h3>
                    <p className="text-white/30 text-sm mt-3">
                      <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs">Strategy:</span><br />
                      {cs.strategy}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[var(--gold)]/10">
                    <span className="text-[var(--gold)]/60 uppercase tracking-wider text-xs">Result:</span>
                    <div className="text-2xl font-heading font-bold text-gradient-gold mt-1">{cs.result}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <SectionLabel>What Clients Say</SectionLabel>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <FadeIn key={t.author} delay={i * 0.1}>
                <div className="dark-card p-8 h-full flex flex-col justify-between">
                  <p className="text-white/60 leading-relaxed font-heading text-lg italic">"{t.quote}"</p>
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
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4">
                Common <span className="text-gradient-gold">Questions</span>
              </h2>
            </div>
          </FadeIn>
          <div className="mt-12">
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-gold" />

      {/* FINAL CTA */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <StarField />
        <div className="absolute inset-0 gold-glow" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">
              Ready to Scale <span className="text-gradient-gold">Your Brand?</span>
            </h2>
            <p className="text-white/40 text-lg mt-8 leading-relaxed max-w-xl mx-auto">
              If your transformation business has proven demand and you're ready to install the systems required for real growth, we should talk.
            </p>
            <div className="text-white/30 text-sm mt-6 space-y-1">
              <p>Where your current growth opportunities are</p>
              <p>What's limiting scale in your current marketing</p>
              <p>What the next stage of your company could look like</p>
            </div>
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
