import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackLeadConversion } from "@/lib/analytics";
import { trackFBLeadEvent } from "@/lib/fbPixel";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight, Bot, Brain, Target, TrendingUp, Zap, BarChart3, Users, Sparkles,
  Shield, Clock, ChevronDown, Check, Star, Menu, X, Megaphone, Lightbulb, Eye,
  MessageSquare,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import christianColgate from "../assets/christian-colgate.webp";

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
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-500 text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

function StickyRevealSection({ children, id, scrollTrackHeight = "300vh" }: { children: (progress: any) => React.ReactNode; id?: string; scrollTrackHeight?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  return (
    <div ref={trackRef} id={id} className="relative" style={{ height: scrollTrackHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

const services = [
  { icon: Bot, title: "Custom AI Agents", description: "Bespoke AI agents that handle customer interactions, qualify leads, and automate workflows — running 24/7 so you don't have to.", accent: "from-cyan-500 to-blue-600" },
  { icon: Megaphone, title: "AI Content Creation", description: "Compelling copy, blog posts, social media content, and ad creative — produced at scale with psychological precision baked in.", accent: "from-purple-500 to-indigo-600" },
  { icon: Target, title: "Intelligent Media Buying", description: "AI-optimized ad purchasing across Facebook, Google, and YouTube. Every dollar is placed where it drives the most conversions.", accent: "from-pink-500 to-rose-600" },
  { icon: TrendingUp, title: "AI-Powered Funnels", description: "Dynamic sales funnels that adapt to user behavior in real time. Pages, offers, and follow-ups that evolve with every visitor.", accent: "from-emerald-500 to-teal-600" },
  { icon: BarChart3, title: "Predictive Analytics", description: "Forecasting market trends and campaign performance before you spend a dollar. Data-driven decisions, not gut feelings.", accent: "from-amber-500 to-orange-600" },
  { icon: Brain, title: "Psychology-Based Strategy", description: "Marketing strategies built on cognitive psychology — understanding how people actually make decisions, then designing for it.", accent: "from-violet-500 to-purple-600" },
];

const benefits = [
  { icon: Brain, title: "Psychology-Based AI", stat: "30-50% Higher ROI", description: "Our AI models are trained on cognitive and behavioral psychology principles. They don't just target audiences — they understand why people buy." },
  { icon: Zap, title: "24/7 Marketing Intelligence", stat: "Always On", description: "Your campaigns never sleep. AI agents monitor, adjust, and optimize around the clock — catching opportunities humans would miss." },
  { icon: Target, title: "Hyper-Personalization", stat: "40-60% Lower Acquisition", description: "Every touchpoint is tailored. From ad creative to landing pages to follow-ups, each prospect gets a unique journey optimized for conversion." },
  { icon: Eye, title: "Predictive Insights", stat: "See What's Coming", description: "Don't react to trends — anticipate them. Our predictive models identify market shifts and customer behavior patterns before they happen." },
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
  { icon: Lightbulb, label: "Ideation", desc: "Strategy and concept development" },
  { icon: MessageSquare, label: "Writing", desc: "Psychology-driven copy" },
  { icon: Eye, label: "Filming", desc: "Authentic video content" },
  { icon: Sparkles, label: "Editing", desc: "Polished creative assets" },
  { icon: Megaphone, label: "Publishing", desc: "Multi-channel distribution" },
  { icon: Users, label: "Capture", desc: "Lead generation systems" },
  { icon: Target, label: "Nurture", desc: "Automated follow-up sequences" },
  { icon: TrendingUp, label: "Convert", desc: "Sales optimization" },
];

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  companyWebsite: z.string()
    .refine((value) => { if (!value) return true; return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(value); }, { message: "Please enter a valid domain (e.g., example.com)" })
    .optional(),
  businessType: z.string(),
  companySize: z.string(),
  annualRevenue: z.string(),
  avgClientValue: z.string(),
  marketingBudget: z.string(),
  primaryChallenges: z.string().min(10, { message: "Please provide more detail" }),
  serviceInterest: z.string(),
  implementationTimeline: z.string(),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const businessTypes = [
  { value: "ecommerce", label: "E-commerce Store" }, { value: "local-business", label: "Local Business" },
  { value: "saas", label: "SaaS Company" }, { value: "service-business", label: "Service Business" },
  { value: "coaching", label: "Coaching/Consulting" }, { value: "b2b", label: "B2B Business" },
  { value: "info-products", label: "Information Products" }, { value: "agency", label: "Marketing/Advertising Agency" },
  { value: "other", label: "Other" },
];

const companySizes = [
  { value: "1-5", label: "1-5 employees" }, { value: "6-10", label: "6-10 employees" },
  { value: "11-25", label: "11-25 employees" }, { value: "26-50", label: "26-50 employees" },
  { value: "51-100", label: "51-100 employees" }, { value: "101-250", label: "101-250 employees" },
  { value: "250+", label: "250+ employees" },
];

const revenueRanges = [
  { value: "less-than-250k", label: "Less than $250K" }, { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" }, { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m-10m", label: "$5M - $10M" }, { value: "10m-plus", label: "$10M+" },
];

const clientValues = [
  { value: "less-than-1k", label: "Less than $1K" }, { value: "1k-5k", label: "$1K - $5K" },
  { value: "5k-10k", label: "$5K - $10K" }, { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" }, { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k-plus", label: "$100K+" },
];

const marketingBudgets = [
  { value: "less-than-10k", label: "Less than $10K/month" }, { value: "10k-25k", label: "$10K - $25K/month" },
  { value: "25k-50k", label: "$25K - $50K/month" }, { value: "50k-100k", label: "$50K - $100K/month" },
  { value: "100k-plus", label: "$100K+/month" },
];

const serviceOptions = [
  { value: "paid-media", label: "Paid Media (Facebook, Google, YouTube)" },
  { value: "funnel-buildouts", label: "Funnel Buildouts & Optimization" },
  { value: "offer-creation", label: "Custom Offer Creation" },
  { value: "local-marketing", label: "Local Marketing Services" },
  { value: "social-media", label: "Social Media Marketing" },
  { value: "data-analytics", label: "Data-Driven Analytics & Insights" },
  { value: "psychology-based", label: "Psychology-Based Marketing Strategies" },
  { value: "linkedin-marketing", label: "LinkedIn Marketing" },
  { value: "multiple", label: "Multiple Services" },
];

const timelines = [
  { value: "immediate", label: "Immediate (0-2 weeks)" }, { value: "short-term", label: "Short-term (1-2 months)" },
  { value: "mid-term", label: "Mid-term (3-6 months)" }, { value: "long-term", label: "Long-term (6+ months)" },
  { value: "exploring", label: "Just exploring options" },
];

function ServiceCard({ service, index, progress }: { service: typeof services[0]; index: number; progress: any }) {
  const delay = index * 0.15;
  const cardOpacity = useTransform(progress, [delay, delay + 0.15], [0, 1]);
  const cardY = useTransform(progress, [delay, delay + 0.15], [60, 0]);
  const cardScale = useTransform(progress, [delay, delay + 0.15], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 hover:bg-white/[0.06] transition-colors group"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
        <service.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{service.description}</p>
    </motion.div>
  );
}

function BenefitCard({ benefit, index, progress }: { benefit: typeof benefits[0]; index: number; progress: any }) {
  const start = 0.1 + index * 0.2;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const x = useTransform(progress, [start, start + 0.15], [index % 2 === 0 ? -80 : 80, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.06] transition-colors group"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
          <benefit.icon className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{benefit.title}</h3>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
              {benefit.stat}
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed text-sm">{benefit.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ step, index, progress }: { step: typeof funnelSteps[0]; index: number; progress: any }) {
  const start = index * 0.1;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.1], [0.7, 1]);
  const y = useTransform(progress, [start, start + 0.1], [40, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5 text-center hover:bg-white/[0.06] transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/20 transition-colors">
        <step.icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="text-[10px] text-emerald-400/60 font-mono mb-1 tracking-widest">{String(index + 1).padStart(2, "0")}</div>
      <h4 className="text-sm font-bold text-white mb-1">{step.label}</h4>
      <p className="text-xs text-slate-600">{step.desc}</p>
    </motion.div>
  );
}

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: settingsData } = useQuery<{ success: boolean; data: any }>({
    queryKey: ['/api/marketing-settings'],
  });
  const marketingSettings = settingsData?.data;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", companyName: "", companyWebsite: "",
      businessType: "", companySize: "", annualRevenue: "", avgClientValue: "",
      marketingBudget: "", primaryChallenges: "", serviceInterest: "",
      implementationTimeline: "", additionalInfo: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormValues) => {
      const leadData = {
        name: data.fullName, email: data.email, company: data.companyName,
        phone: data.phone, message: data.additionalInfo,
        business_type: data.businessType, company_size: data.companySize,
        annual_revenue: data.annualRevenue, client_value: data.avgClientValue,
        marketing_needs: data.primaryChallenges, timeline: data.implementationTimeline,
        budget: data.marketingBudget, source: 'contact_form',
      };
      const response = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) throw new Error('Failed to submit form');
      return response.json();
    },
    onSuccess: (response) => {
      setFormSubmitted(true);
      toast({ title: "Application Received", description: "We'll review your details and contact you within 48 hours." });
      if (marketingSettings?.ga_enabled && marketingSettings?.ga_measurement_id) {
        trackEvent('lead_submission', 'conversion', 'contact_form');
        if (response.data) trackLeadConversion(response.data);
      }
      if (marketingSettings?.fb_capi_enabled && marketingSettings?.fb_pixel_id) {
        trackFBLeadEvent(response.data || {});
      }
      form.reset();
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    },
  });

  const cleanWebsiteFormat = (website: string): string => {
    if (!website) return "";
    let cleaned = website.trim();
    cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/i, '');
    cleaned = cleaned.replace(/\/+$/, '');
    return cleaned;
  };

  const onSubmit = (data: FormValues) => {
    mutate({ ...data, companyWebsite: cleanWebsiteFormat(data.companyWebsite || '') });
  };

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Benefits", href: "#benefits" },
    { name: "Results", href: "#results" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="bg-[#030014] text-white">

      {/* Navbar */}
      <motion.nav
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: scrolled ? "none" : "auto" }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/60 backdrop-blur-2xl border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={cortexuumLogoCircle} alt="Cortexuum" className="h-11 w-11 rounded-full ring-2 ring-white/10" />
            <span className="text-lg font-bold tracking-tight hidden sm:block">Cortexuum</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-slate-400 hover:text-white text-sm font-medium transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="#contact" className="bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">
              Get Started
            </a>
            <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
              className="bg-[#E63E8B] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#d1357d] transition-colors shadow-lg shadow-pink-500/25">
              BOOK A CALL
            </a>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a1a] border-t border-white/5 overflow-hidden">
              <div className="px-6 py-6 space-y-3">
                <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-[#E63E8B] text-white text-center font-bold py-3.5 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                  BOOK A CALL NOW
                </a>
                {navItems.map((item) => (
                  <a key={item.name} href={item.href}
                    className="block text-slate-300 py-3 px-4 text-base font-medium border-b border-white/5 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== HERO — Parallax fade out ===== */}
      <div ref={heroRef} className="relative h-[150vh]">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 h-screen flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[200px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 text-sm font-medium">Psychology-Based AI Marketing</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tight">
              Marketing that
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">thinks.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              AI agents trained on cognitive psychology.<br className="hidden md:block" />
              Campaigns that understand why people buy.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-full text-lg shadow-2xl shadow-white/10 hover:shadow-white/20 transition-shadow"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                Book a Strategy Call <ArrowRight className="w-5 h-5" />
              </motion.a>
              <a href="#services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium px-8 py-5 transition-colors">
                Explore Services <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ===== STATS — Animated counters ===== */}
      <section className="relative py-24 px-6 -mt-[50vh]" style={{ position: 'relative', zIndex: 2 }}>
        <div className="max-w-5xl mx-auto bg-white/[0.03] border border-white/[0.08] rounded-3xl p-10 md:p-14 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CounterCard value={200} suffix="M+" label="Managed Ad Spend" />
            <CounterCard value={70} suffix="+" label="Years Combined Exp." />
            <CounterCard value={3} suffix="x" label="Avg Lead Increase" />
            <CounterCard value={40} suffix="%" label="Avg Cost Reduction" />
          </div>
        </div>
      </section>

      {/* ===== SERVICES — Sticky with scroll-linked card reveals ===== */}
      <StickyRevealSection id="services" scrollTrackHeight="250vh">
        {(progress) => (
          <div className="w-full px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div style={{ opacity: useTransform(progress, [0, 0.08], [0, 1]), y: useTransform(progress, [0, 0.08], [40, 0]) }} className="text-center mb-12">
                <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">What We Do</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  Intelligent solutions{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">that beat generic marketing.</span>
                </h2>
                <p className="text-slate-500 text-base max-w-xl mx-auto">Every service powered by AI models trained on psychological principles.</p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, i) => (
                  <ServiceCard key={i} service={service} index={i} progress={progress} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== BENEFITS — Sticky with slide-in cards ===== */}
      <StickyRevealSection id="benefits" scrollTrackHeight="250vh">
        {(progress) => (
          <div className="w-full px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div style={{ opacity: useTransform(progress, [0, 0.08], [0, 1]), y: useTransform(progress, [0, 0.08], [40, 0]) }} className="text-center mb-12">
                <p className="text-purple-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Why It Works</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  Marketing that understands{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">how people think.</span>
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <BenefitCard key={i} benefit={benefit} index={i} progress={progress} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== TESTIMONIALS — Sticky with staggered pop-in ===== */}
      <StickyRevealSection id="results" scrollTrackHeight="200vh">
        {(progress) => {
          const headingOpacity = useTransform(progress, [0, 0.1], [0, 1]);
          const headingY = useTransform(progress, [0, 0.1], [40, 0]);
          return (
            <div className="w-full px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div style={{ opacity: headingOpacity, y: headingY }} className="text-center mb-12">
                  <p className="text-pink-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Client Results</p>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight">Don't take our word for it.</h2>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((t, i) => {
                    const start = 0.15 + i * 0.2;
                    const cardOpacity = useTransform(progress, [start, start + 0.15], [0, 1]);
                    const cardY = useTransform(progress, [start, start + 0.15], [80, 0]);
                    const cardScale = useTransform(progress, [start, start + 0.15], [0.85, 1]);
                    return (
                      <motion.div key={i} style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 flex flex-col">
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                        <div className="pt-4 border-t border-white/[0.06]">
                          <p className="text-white font-bold">{t.name}</p>
                          <p className="text-slate-500 text-sm">{t.role}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }}
      </StickyRevealSection>

      {/* ===== TEAM — Sticky split reveal ===== */}
      <StickyRevealSection scrollTrackHeight="200vh">
        {(progress) => {
          const leftOpacity = useTransform(progress, [0, 0.15], [0, 1]);
          const leftX = useTransform(progress, [0, 0.15], [-60, 0]);
          const rightOpacity = useTransform(progress, [0.1, 0.25], [0, 1]);
          const rightX = useTransform(progress, [0.1, 0.25], [60, 0]);
          return (
            <div className="w-full px-6">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div style={{ opacity: leftOpacity, x: leftX }}>
                    <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Why Cortexuum</p>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight leading-tight">
                      Data-driven solutions that beat opinions.{" "}
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Every time.</span>
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-10">
                      With over $200 million in managed ad spend and 70+ years of combined industry experience, we've seen what works and what doesn't.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {teamExpertise.map((exp, i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-5">
                          <div className="text-2xl font-black text-white mb-1">{exp.years} <span className="text-slate-600 text-base">yrs</span></div>
                          <div className="text-slate-500 text-sm">{exp.area}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div style={{ opacity: rightOpacity, x: rightX }} className="flex justify-center">
                    <div className="relative">
                      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center max-w-sm">
                        <div className="relative inline-block mb-6">
                          <img src={christianColgate} alt="Christian Colgate" className="w-32 h-32 rounded-full object-cover object-center border-4 border-cyan-500/20" />
                          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-3 border-[#030014] flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-black text-white mb-1">Christian Colgate</h3>
                        <p className="text-cyan-400 font-medium mb-4 text-sm">Founder — Digital Growth Architect</p>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                          Combining deep psychology expertise with cutting-edge AI to build marketing systems that understand how people actually make decisions.
                        </p>
                        <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3 rounded-full hover:bg-white/90 transition-colors text-sm">
                          Book a Call <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          );
        }}
      </StickyRevealSection>

      {/* ===== PROCESS — Sticky with step-by-step reveal ===== */}
      <StickyRevealSection id="process" scrollTrackHeight="250vh">
        {(progress) => (
          <div className="w-full px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div style={{ opacity: useTransform(progress, [0, 0.06], [0, 1]), y: useTransform(progress, [0, 0.06], [40, 0]) }} className="text-center mb-12">
                <p className="text-emerald-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">The 90-Day Approach</p>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  From strategy to{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">consistent conversions.</span>
                </h2>
                <p className="text-slate-500 text-base max-w-xl mx-auto">A systematic buildout engineered to create a predictable pipeline.</p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {funnelSteps.map((step, i) => (
                  <ProcessStep key={i} step={step} index={i} progress={progress} />
                ))}
              </div>
            </div>
          </div>
        )}
      </StickyRevealSection>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.05] via-purple-500/[0.08] to-pink-500/[0.05]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Ready to see what<br />AI-powered marketing can do?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Book a free 30-minute strategy call. No obligations, just real insights for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-full text-lg shadow-2xl shadow-white/10"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              BOOK A CALL NOW <ArrowRight className="w-5 h-5" />
            </motion.a>
            <a href="#contact" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors">
              Or fill out the form below <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section id="contact" className="relative py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Ready to see results?</h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto">Complete this form and we'll review your details within 48 hours.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
                {formSubmitted ? (
                  <div className="text-center py-14">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Application Received!</h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">Our team will review your details and get back to you within 48 hours.</p>
                    <Button onClick={() => setFormSubmitted(false)} className="bg-white text-black hover:bg-white/90 rounded-full px-8 font-bold">Submit Another</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="space-y-5">
                        <h3 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Full Name *</FormLabel>
                              <FormControl><Input {...field} placeholder="Your name" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl h-11" /></FormControl>
                              <FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Email *</FormLabel>
                              <FormControl><Input {...field} placeholder="Your email" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl h-11" /></FormControl>
                              <FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Phone *</FormLabel>
                              <FormControl><Input {...field} placeholder="Your phone" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl h-11" /></FormControl>
                              <FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="companyName" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Company Name *</FormLabel>
                              <FormControl><Input {...field} placeholder="Your company" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl h-11" /></FormControl>
                              <FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="companyWebsite" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-300 text-sm">Company Website</FormLabel>
                            <FormControl><Input {...field} placeholder="yourcompany.com" className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl h-11" /></FormControl>
                            <FormDescription className="text-xs text-slate-600">Just enter the domain name (e.g., example.com)</FormDescription>
                            <FormMessage /></FormItem>
                        )} />
                      </div>

                      <div className="space-y-5">
                        <h3 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">Business Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="businessType" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Type of Business *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select business type" /></SelectTrigger></FormControl>
                                <SelectContent>{businessTypes.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="companySize" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Company Size *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select company size" /></SelectTrigger></FormControl>
                                <SelectContent>{companySizes.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="annualRevenue" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Annual Revenue *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value || undefined}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select revenue range" /></SelectTrigger></FormControl>
                                <SelectContent>{revenueRanges.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="avgClientValue" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Average Client Value *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select average value" /></SelectTrigger></FormControl>
                                <SelectContent>{clientValues.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="marketingBudget" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-300 text-sm">Monthly Marketing Budget *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select budget range" /></SelectTrigger></FormControl>
                              <SelectContent>{marketingBudgets.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                            </Select><FormMessage /></FormItem>
                        )} />
                      </div>

                      <div className="space-y-5">
                        <h3 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">AI Implementation Details</h3>
                        <FormField control={form.control} name="primaryChallenges" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-300 text-sm">Primary Business Challenges *</FormLabel>
                            <FormDescription className="text-xs text-slate-600">What specific challenges are you hoping to solve?</FormDescription>
                            <FormControl><Textarea {...field} placeholder="Describe your current challenges and pain points" rows={4} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl resize-none" /></FormControl>
                            <FormMessage /></FormItem>
                        )} />
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField control={form.control} name="serviceInterest" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Primary Service Interest *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                                <SelectContent>{serviceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="implementationTimeline" render={({ field }) => (
                            <FormItem><FormLabel className="text-slate-300 text-sm">Implementation Timeline *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11"><SelectValue placeholder="Select timeline" /></SelectTrigger></FormControl>
                                <SelectContent>{timelines.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="additionalInfo" render={({ field }) => (
                          <FormItem><FormLabel className="text-slate-300 text-sm">Additional Information</FormLabel>
                            <FormControl><Textarea {...field} placeholder="Anything else you'd like us to know?" rows={3} className="bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-600 focus:border-cyan-500/50 rounded-xl resize-none" /></FormControl>
                            <FormMessage /></FormItem>
                        )} />
                      </div>

                      <Button type="submit" disabled={isPending} className="w-full bg-white text-black hover:bg-white/90 font-bold py-6 text-base rounded-xl">
                        {isPending ? (
                          <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Submitting...</span>
                        ) : (
                          <span className="flex items-center gap-2">Submit Application <ArrowRight className="w-5 h-5" /></span>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7">
                <h3 className="text-base font-bold text-white mb-5">What happens next?</h3>
                <div className="space-y-4">
                  {[
                    { step: "1", text: "We review your application within 48 hours" },
                    { step: "2", text: "Schedule a deep-dive strategy call" },
                    { step: "3", text: "Receive a custom AI marketing proposal" },
                    { step: "4", text: "Launch your first campaign in weeks" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{item.step}</div>
                      <p className="text-slate-400 text-sm pt-0.5">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] rounded-2xl p-7">
                <h3 className="text-base font-bold text-white mb-3">Prefer to talk?</h3>
                <p className="text-slate-500 text-sm mb-5">Skip the form and book a free 30-minute strategy call.</p>
                <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center bg-[#E63E8B] text-white font-bold px-6 py-3.5 rounded-full hover:bg-[#d1357d] transition-colors shadow-lg shadow-pink-500/20 text-sm">
                  BOOK A CALL <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7">
                <h3 className="text-base font-bold text-white mb-3">See our work</h3>
                <p className="text-slate-500 text-sm mb-4">Check out real projects we've shipped for real businesses.</p>
                <a href="/services/websites" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={cortexuumLogoCircle} alt="Cortexuum" className="h-10 w-10 rounded-full ring-2 ring-white/10" />
                <span className="font-bold text-lg">Cortexuum</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">AI-powered marketing, funnel building, and psychology-based strategies for businesses ready to scale.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-2.5">
                {["Paid Media", "Funnel Buildouts", "Offer Creation", "Social Media"].map(s => (
                  <li key={s}><a href="#services" className="text-slate-600 hover:text-white text-sm transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {[{ label: "About", href: "#" }, { label: "Testimonials", href: "#results" }, { label: "Portfolio", href: "/services/websites" }].map(l => (
                  <li key={l.label}><a href={l.href} className="text-slate-600 hover:text-white text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5">
                {[{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms & Conditions", href: "/terms" }, { label: "Cookie Policy", href: "/cookies" }].map(l => (
                  <li key={l.label}><a href={l.href} className="text-slate-600 hover:text-white text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} Cortexuum AI Marketing Agency. All rights reserved.</p>
                <p className="text-slate-700 text-xs mt-1">Data-driven solutions that beat opinions, every time.</p>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
                  className="bg-white text-black rounded-full px-6 py-2.5 text-sm font-bold hover:bg-white/90 transition-colors">BOOK A CALL</a>
                <a href="/login" className="text-slate-700 hover:text-slate-400 text-xs transition-colors">Admin</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] mt-6 pt-4 text-center">
            <p className="text-slate-700 text-xs">
              Designed by Ignacio Nunez · <a href="mailto:dev@ignacionunez.dev" className="hover:text-slate-400 transition-colors">dev@ignacionunez.dev</a> · <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">plaintalk.dev</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
