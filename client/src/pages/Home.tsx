import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, BarChart3, Megaphone, Palette, Trophy, Users, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import cortexuumLogoWhite from "../assets/cortexuum-logo-white.png";
import portfolioJetts from "../assets/portfolio-jetts.png";
import portfolioKalyxi from "../assets/portfolio-kalyxi.png";
import portfolioLakeLucien from "../assets/portfolio-lakelucien.png";
import jettsHero from "../assets/jetts-hero.png";
import christianColgate from "../assets/christian-colgate.webp";

const typingWords = ["thinks.", "adapts.", "learns.", "converts.", "scales."];

function TypingText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const word = typingWords[wordIdx];
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 2000);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === word.length) { setPaused(true); return; }
    if (deleting && charIdx === 0) { setDeleting(false); setWordIdx((p) => (p + 1) % typingWords.length); return; }
    const t = setTimeout(() => setCharIdx((p) => p + (deleting ? -1 : 1)), deleting ? 50 : 120);
    return () => clearTimeout(t);
  }, [charIdx, deleting, paused, wordIdx]);

  return (
    <span className="text-gradient-purple">
      {typingWords[wordIdx].substring(0, charIdx)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function SectionHeading({ label, title, accent }: { label: string; title: string; accent?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="text-sm uppercase tracking-widest text-[#6C3AFF] font-semibold">{label}</span>
      <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mt-3">
        {title} {accent && <span className="text-gradient-purple">{accent}</span>}
      </h2>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-5 text-left">
        <span className="text-lg font-medium text-white">{q}</span>
        <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-white/60 leading-relaxed">{a}</p>
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

function CounterCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-heading font-bold text-white">{count}{suffix}</div>
      <div className="text-white/50 text-sm mt-1">{label}</div>
    </div>
  );
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const partners = ["Meta Ads", "Google Ads", "TikTok Ads", "LinkedIn Ads", "Klaviyo", "HubSpot", "Shopify", "WordPress"];

const portfolioItems = [
  { title: "Jetts Window Cleaning", category: "Home Services + Lead Gen", image: portfolioJetts },
  { title: "Kalyxi AI", category: "AI Solutions + Brand Launch", image: portfolioKalyxi },
  { title: "Lake Lucien", category: "Commercial Property + Web Design", image: portfolioLakeLucien },
];

const results = [
  { stat: "312%", label: "ROAS Increase", desc: "Scaled Jetts Window Cleaning from break-even to 3x return through strategic Meta + Google campaigns, driving booked jobs across nine Utah cities.", image: jettsHero },
  { stat: "4.2x", label: "Revenue Growth", desc: "Launched Kalyxi AI with full brand identity, website, and paid media strategy — generating enterprise leads from day one.", image: portfolioKalyxi },
  { stat: "67%", label: "Cost Per Lead Drop", desc: "Reduced acquisition costs by 67% for Lake Lucien through landing page optimization, retargeting, and a complete funnel rebuild.", image: portfolioLakeLucien },
];

const highlights = [
  { icon: Trophy, title: "Professional Athletes", desc: "We have worked with professional athletes to build their personal brands and launch consumer products." },
  { icon: Users, title: "Trusted by 50+ Businesses", desc: "From local service companies to AI startups, brands trust Cortexuum to deliver real, measurable growth." },
  { icon: Zap, title: "Full-Stack Marketing", desc: "Strategy, creative, media buying, funnels, and analytics — all under one roof with full transparency." },
];

const services = [
  { icon: BarChart3, title: "Paid Media & Performance", desc: "Data-driven campaigns across Meta, Google, TikTok and LinkedIn that maximize every dollar of ad spend." },
  { icon: Megaphone, title: "Funnel & Offer Strategy", desc: "High-converting landing pages, lead magnets and sales funnels engineered to turn traffic into revenue." },
  { icon: Palette, title: "Brand & Creative", desc: "Scroll-stopping ad creative, brand identity and social content that builds trust and drives action." },
];

const faqs = [
  { q: "How quickly will I see results?", a: "Most clients see measurable improvements within the first 30 days. Full campaign optimization typically takes 60-90 days as we gather data and refine targeting." },
  { q: "What industries do you work with?", a: "We work with home service businesses, AI and tech startups, commercial real estate, professional athletes, and more. Our frameworks adapt to any B2C or B2B model." },
  { q: "Do you require long-term contracts?", a: "No. We work on month-to-month agreements because we believe results should earn your loyalty, not contracts." },
  { q: "What platforms do you advertise on?", a: "Primarily Meta (Facebook/Instagram), Google Ads, TikTok, and LinkedIn. We choose platforms based on where your audience spends time." },
  { q: "How much ad spend do I need?", a: "We recommend a minimum of $2,000/month in ad spend to generate meaningful data and results, though ideal budgets vary by industry." },
  { q: "What makes Cortexuum different?", a: "We combine behavioral psychology with data-driven marketing. Every campaign is built on real consumer insights, not guesswork. We have also worked with professional athletes, giving us a unique edge in high-profile brand building." },
];

export default function Home() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen font-body text-white">
      <Header />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 purple-glow opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 rounded-full border border-[#6C3AFF]/20 animate-spin" style={{ animationDuration: "20s" }} />
                <div className="absolute inset-2 rounded-full border border-[#6C3AFF]/10 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                <img src={cortexuumLogoCircle} alt="Cortexuum" className="absolute inset-4 w-20 h-20 object-contain" />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Marketing that <TypingText />
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 mt-6 max-w-2xl mx-auto leading-relaxed">
              We blend behavioral psychology with data-driven performance marketing to build campaigns that don&apos;t just reach people &mdash; they move them.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta">
                Book Your Call <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#results" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 rounded-full transition-all hover:bg-white/5">
                View Results
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {["Paid Media", "Funnels", "Offer Creation", "Social Media", "Analytics"].map((s) => (
                <span key={s} className="text-xs text-white/40 border border-white/10 rounded-full px-4 py-1.5">{s}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LOGO TICKER */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <div className="flex animate-scroll-x">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-white/20 text-sm font-medium whitespace-nowrap mx-8 uppercase tracking-widest">{p}</span>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#6C3AFF]/10 flex items-center justify-center mx-auto mb-5">
                    <h.icon className="w-7 h-7 text-[#6C3AFF]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">{h.title}</h3>
                  <p className="text-white/50 mt-3 leading-relaxed max-w-sm mx-auto">{h.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label="Our Work" title="Selected" accent="Projects" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="dark-card group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-[#6C3AFF] uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-xl font-heading font-bold text-white mt-2">{item.title}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label="Results" title="Real Numbers," accent="Real Growth" />
          <div className="space-y-20">
            {results.map((r, i) => (
              <FadeIn key={r.stat}>
                <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center`}>
                  <div className="w-full md:w-1/2">
                    <div className="dark-card aspect-video overflow-hidden">
                      <img src={r.image} alt={r.label} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="text-6xl md:text-7xl font-heading font-bold text-gradient-purple">{r.stat}</div>
                    <h3 className="text-2xl font-heading font-bold text-white mt-3">{r.label}</h3>
                    <p className="text-white/50 mt-4 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <CounterCard value={312} suffix="%" label="Avg. ROAS Increase" />
          <CounterCard value={50} suffix="+" label="Campaigns Launched" />
          <CounterCard value={7} suffix="+" label="Years Experience" />
          <CounterCard value={2} suffix="M+" label="Ad Spend Managed" />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading label="What We Do" title="Our" accent="Services" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="dark-card p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#6C3AFF]/10 flex items-center justify-center mb-6">
                    <s.icon className="w-6 h-6 text-[#6C3AFF]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">{s.title}</h3>
                  <p className="text-white/50 mt-3 leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faqs" className="py-24 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading label="FAQs" title="Common" accent="Questions" />
          <div>
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 purple-glow opacity-20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">
              Ready to <span className="text-gradient-purple">Grow?</span>
            </h2>
            <p className="text-white/50 text-lg mt-6 leading-relaxed">
              Book a free strategy call and discover how we can scale your business with data-driven marketing.
            </p>
            <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer" className="btn-cta mt-10 inline-flex">
              Book Your Free Consultation <ArrowRight className="w-5 h-5" />
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
