import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { trackEvent, trackLeadConversion } from "@/lib/analytics";
import { trackFBLeadEvent } from "@/lib/fbPixel";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Bot,
  Brain,
  Target,
  TrendingUp,
  Zap,
  BarChart3,
  Users,
  Sparkles,
  Shield,
  Clock,
  ChevronDown,
  Check,
  Star,
  Menu,
  X,
  Megaphone,
  Lightbulb,
  Eye,
  MessageSquare,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import christianColgate from "../assets/christian-colgate.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const services = [
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Bespoke AI agents that handle customer interactions, qualify leads, and automate workflows — running 24/7 so you don't have to.",
    accent: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
  },
  {
    icon: Megaphone,
    title: "AI Content Creation",
    description: "Compelling copy, blog posts, social media content, and ad creative — produced at scale with psychological precision baked in.",
    accent: "from-purple-500 to-indigo-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
  },
  {
    icon: Target,
    title: "Intelligent Media Buying",
    description: "AI-optimized ad purchasing across Facebook, Google, and YouTube. Every dollar is placed where it drives the most conversions.",
    accent: "from-pink-500 to-rose-600",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
  },
  {
    icon: TrendingUp,
    title: "AI-Powered Funnels",
    description: "Dynamic sales funnels that adapt to user behavior in real time. Pages, offers, and follow-ups that evolve with every visitor.",
    accent: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    description: "Forecasting market trends and campaign performance before you spend a dollar. Data-driven decisions, not gut feelings.",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
  {
    icon: Brain,
    title: "Psychology-Based Strategy",
    description: "Marketing strategies built on cognitive psychology — understanding how people actually make decisions, then designing for it.",
    accent: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
  },
];

const stats = [
  { value: "$200M+", label: "Managed Ad Spend" },
  { value: "70+", label: "Years Combined Experience" },
  { value: "3x", label: "Average Lead Increase" },
  { value: "40%", label: "Avg. Cost Reduction" },
];

const benefits = [
  {
    icon: Brain,
    title: "Psychology-Based AI",
    stat: "30-50% Higher ROI",
    description: "Our AI models are trained on cognitive and behavioral psychology principles. They don't just target audiences — they understand why people buy.",
  },
  {
    icon: Zap,
    title: "24/7 Marketing Intelligence",
    stat: "Always On",
    description: "Your campaigns never sleep. AI agents monitor, adjust, and optimize around the clock — catching opportunities humans would miss.",
  },
  {
    icon: Target,
    title: "Hyper-Personalization",
    stat: "40-60% Lower Acquisition",
    description: "Every touchpoint is tailored. From ad creative to landing pages to follow-ups, each prospect gets a unique journey optimized for conversion.",
  },
  {
    icon: Eye,
    title: "Predictive Insights",
    stat: "See What's Coming",
    description: "Don't react to trends — anticipate them. Our predictive models identify market shifts and customer behavior patterns before they happen.",
  },
];

const testimonials = [
  {
    name: "Sarah J.",
    role: "CEO",
    quote: "Cortexuum increased our client retention by 40% and reduced operational costs by 25%. The AI-driven approach transformed how we think about customer engagement.",
    rating: 5,
  },
  {
    name: "Michael R.",
    role: "Marketing Director",
    quote: "We're capturing 3x more qualified leads with half the effort. The psychology-based targeting is unlike anything we've seen from other agencies.",
    rating: 5,
  },
  {
    name: "Jennifer P.",
    role: "Founder & CMO",
    quote: "Tasks that took hours now happen in minutes. The AI automation freed up our team to focus on strategy while the systems handle execution flawlessly.",
    rating: 5,
  },
];

const team = [
  { name: "Christian Colgate", role: "Founder — Digital Growth Architect", image: christianColgate },
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
    .refine(
      (value) => {
        if (!value) return true;
        return /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(value);
      },
      { message: "Please enter a valid domain (e.g., example.com)" }
    )
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
  { value: "ecommerce", label: "E-commerce Store" },
  { value: "local-business", label: "Local Business" },
  { value: "saas", label: "SaaS Company" },
  { value: "service-business", label: "Service Business" },
  { value: "coaching", label: "Coaching/Consulting" },
  { value: "b2b", label: "B2B Business" },
  { value: "info-products", label: "Information Products" },
  { value: "agency", label: "Marketing/Advertising Agency" },
  { value: "other", label: "Other" },
];

const companySizes = [
  { value: "1-5", label: "1-5 employees" },
  { value: "6-10", label: "6-10 employees" },
  { value: "11-25", label: "11-25 employees" },
  { value: "26-50", label: "26-50 employees" },
  { value: "51-100", label: "51-100 employees" },
  { value: "101-250", label: "101-250 employees" },
  { value: "250+", label: "250+ employees" },
];

const revenueRanges = [
  { value: "less-than-250k", label: "Less than $250K" },
  { value: "250k-500k", label: "$250K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m-10m", label: "$5M - $10M" },
  { value: "10m-plus", label: "$10M+" },
];

const clientValues = [
  { value: "less-than-1k", label: "Less than $1K" },
  { value: "1k-5k", label: "$1K - $5K" },
  { value: "5k-10k", label: "$5K - $10K" },
  { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" },
  { value: "50k-100k", label: "$50K - $100K" },
  { value: "100k-plus", label: "$100K+" },
];

const marketingBudgets = [
  { value: "less-than-10k", label: "Less than $10K/month" },
  { value: "10k-25k", label: "$10K - $25K/month" },
  { value: "25k-50k", label: "$25K - $50K/month" },
  { value: "50k-100k", label: "$50K - $100K/month" },
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
  { value: "immediate", label: "Immediate (0-2 weeks)" },
  { value: "short-term", label: "Short-term (1-2 months)" },
  { value: "mid-term", label: "Mid-term (3-6 months)" },
  { value: "long-term", label: "Long-term (6+ months)" },
  { value: "exploring", label: "Just exploring options" },
];

export default function Home() {
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar — fades out on scroll, floating menu takes over */}
      <motion.nav
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, pointerEvents: scrolled ? "none" as any : "auto" as any }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50"
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={cortexuumLogoCircle} alt="Cortexuum" className="h-10 w-10 rounded-full" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
                {item.name}
              </a>
            ))}
            <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              Contact Us
            </a>
            <a
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E63E8B] text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-pink-500/20"
            >
              BOOK A CALL
            </a>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                <a
                  href="https://calendly.com/cortexuummarketing/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#E63E8B] text-white text-center font-bold py-3 rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK A CALL NOW
                </a>
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-slate-300 py-2.5 px-3 text-base font-medium border-b border-slate-800 last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">Psychology-Based AI Marketing</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your Business with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI-Powered Marketing
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-xl text-slate-300 mb-4 leading-relaxed">
                Custom AI Agents & Psychology-Based Marketing Strategies That Outperform Traditional Approaches.
              </motion.p>

              <motion.p variants={fadeUp} className="text-slate-400 mb-8">
                Proprietary AI models trained on psychological principles. We're redefining what's possible in digital marketing.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://calendly.com/cortexuummarketing/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E63E8B] text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-pink-500/25 hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px rgba(230, 62, 139, 0.2)",
                      "0 15px 35px rgba(230, 62, 139, 0.35)",
                      "0 10px 25px rgba(230, 62, 139, 0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BOOK A CALL NOW <ArrowRight className="w-5 h-5" />
                </motion.a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-purple-500/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-purple-500/10 transition-colors"
                >
                  Our Services <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 text-sm text-slate-400">
                <span>Trusted by <strong className="text-white">top businesses</strong> worldwide</span>
              </motion.div>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <a
                href="https://calendly.com/cortexuummarketing/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative z-10 bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 border border-slate-700/50 p-6 lg:p-8 max-w-lg mx-auto hover:border-cyan-500/30 transition-colors group"
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={christianColgate}
                      alt="Christian Colgate"
                      className="w-16 h-16 rounded-full object-cover object-center border-2 border-cyan-500/50 mr-4"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-800 mr-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Christian Colgate</h3>
                    <p className="text-slate-400 text-sm">AI Marketing Specialist</p>
                    <span className="bg-purple-500/20 text-xs px-2.5 py-0.5 rounded-full text-purple-300 font-medium inline-flex items-center gap-1 mt-1">
                      <Bot className="h-3 w-3" /> AI-Powered
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-slate-700/40 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                    <p className="text-slate-300 text-sm">What AI marketing services do you offer?</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto border border-cyan-500/10">
                    <p className="text-slate-200 text-sm">We specialize in AI-powered solutions including custom AI agents, intelligent media buying, psychology-based funnels, and predictive analytics.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="w-full p-4 pr-12 rounded-full border border-slate-600/50 bg-slate-700/30 text-slate-400 text-sm font-medium">
                    Book a consultation to learn more
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#E63E8B] text-white h-8 w-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>

              <motion.div
                className="absolute top-8 -right-4 w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 z-0"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/20 z-0"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 bg-slate-900/60 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
              What We Do
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Intelligent AI solutions that{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                beat generic marketing.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every service is powered by AI models trained on psychological principles — because understanding why people buy is the only competitive advantage that lasts.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`${service.bg} border ${service.border} rounded-2xl p-7 hover:border-opacity-50 transition-all group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 md:py-28 px-4 bg-slate-900/40 border-y border-slate-800/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">
              Why It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Marketing that understands{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                how people think.
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                      <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="results" className="py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-pink-400 font-mono text-sm tracking-widest uppercase mb-4">
              Client Results
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Don't take our word for it.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 hover:border-pink-500/30 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Hire Us / Team */}
      <section className="py-20 md:py-28 px-4 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp}>
                <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Why Cortexuum</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Data-driven solutions that beat opinions.{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Every time.</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  With over $200 million in managed ad spend and 70+ years of combined industry experience, we've seen what works and what doesn't. Our team brings deep expertise across every aspect of digital marketing.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {teamExpertise.map((exp, i) => (
                    <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-white mb-1">{exp.years} yrs</div>
                      <div className="text-slate-400 text-sm">{exp.area}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex justify-center">
                <div className="relative">
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 text-center max-w-sm">
                    <img
                      src={christianColgate}
                      alt="Christian Colgate"
                      className="w-32 h-32 rounded-full object-cover object-center mx-auto mb-6 border-4 border-cyan-500/30"
                    />
                    <h3 className="text-2xl font-bold text-white mb-1">Christian Colgate</h3>
                    <p className="text-cyan-400 font-medium mb-4">Founder — Digital Growth Architect</p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Combining deep psychology expertise with cutting-edge AI to build marketing systems that understand how people actually make decisions.
                    </p>
                    <a
                      href="https://calendly.com/cortexuummarketing/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
                    >
                      Book a Call <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 90-Day Content Funnel */}
      <section id="process" className="py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4">
              The 90-Day Approach
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              From strategy to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                consistent conversions.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              A systematic buildout of cold, warm, and hot audience strategies — engineered to create a predictable pipeline.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {funnelSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-5 text-center hover:border-emerald-500/30 transition-all relative group"
              >
                {i < funnelSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-slate-700 z-10" />
                )}
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/25 transition-colors">
                  <step.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs text-emerald-400 font-mono mb-1">{String(i + 1).padStart(2, "0")}</div>
                <h4 className="text-sm font-bold text-white mb-1">{step.label}</h4>
                <p className="text-xs text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to see what AI-powered marketing can do?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Book a free 30-minute strategy call. No obligations, just real insights for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="https://calendly.com/cortexuummarketing/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E63E8B] text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-pink-500/25 hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                BOOK A CALL NOW <ArrowRight className="w-5 h-5" />
              </motion.a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 transition-colors"
              >
                Or fill out the form below <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Get Started</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to see results?
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Complete this form to help us understand your business needs. We'll review your details and contact you within 48 hours.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8">
                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
                      <p className="text-slate-400 mb-6">Our team will review your details and get back to you within 48 hours with next steps for your marketing strategy.</p>
                      <Button onClick={() => setFormSubmitted(false)} className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-full">
                        Submit Another
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-5">
                          <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">Contact Information</h3>
                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Full Name *</FormLabel>
                                <FormControl><Input {...field} placeholder="Your name" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Email *</FormLabel>
                                <FormControl><Input {...field} placeholder="Your email" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Phone *</FormLabel>
                                <FormControl><Input {...field} placeholder="Your phone" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="companyName" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Company Name *</FormLabel>
                                <FormControl><Input {...field} placeholder="Your company" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500" /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="companyWebsite" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Company Website</FormLabel>
                              <FormControl><Input {...field} placeholder="yourcompany.com" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500" /></FormControl>
                              <FormDescription className="text-xs text-slate-500">Just enter the domain name (e.g., example.com)</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <div className="space-y-5">
                          <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">Business Information</h3>
                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField control={form.control} name="businessType" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Type of Business *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || undefined}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select business type" /></SelectTrigger></FormControl>
                                  <SelectContent>{businessTypes.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="companySize" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Company Size *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select company size" /></SelectTrigger></FormControl>
                                  <SelectContent>{companySizes.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField control={form.control} name="annualRevenue" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Annual Revenue *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || undefined}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select revenue range" /></SelectTrigger></FormControl>
                                  <SelectContent>{revenueRanges.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="avgClientValue" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Average Client Value *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select average value" /></SelectTrigger></FormControl>
                                  <SelectContent>{clientValues.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="marketingBudget" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Monthly Marketing Budget *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select budget range" /></SelectTrigger></FormControl>
                                <SelectContent>{marketingBudgets.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <div className="space-y-5">
                          <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">AI Implementation Details</h3>
                          <FormField control={form.control} name="primaryChallenges" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Primary Business Challenges *</FormLabel>
                              <FormDescription className="text-xs text-slate-500">What specific challenges are you hoping to solve?</FormDescription>
                              <FormControl><Textarea {...field} placeholder="Describe your current challenges and pain points" rows={4} className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 resize-none" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <div className="grid md:grid-cols-2 gap-5">
                            <FormField control={form.control} name="serviceInterest" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Primary Service Interest *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                                  <SelectContent>{serviceOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="implementationTimeline" render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-200">Implementation Timeline *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger className="bg-slate-900/60 border-slate-700 text-white"><SelectValue placeholder="Select timeline" /></SelectTrigger></FormControl>
                                  <SelectContent>{timelines.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <FormField control={form.control} name="additionalInfo" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Additional Information</FormLabel>
                              <FormControl><Textarea {...field} placeholder="Anything else you'd like us to know?" rows={3} className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 resize-none" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <Button
                          type="submit"
                          disabled={isPending}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white font-semibold py-6 text-lg rounded-xl"
                        >
                          {isPending ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Submit Application <ArrowRight className="w-5 h-5" />
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", text: "We review your application within 48 hours" },
                      { step: "2", text: "Schedule a deep-dive strategy call" },
                      { step: "3", text: "Receive a custom AI marketing proposal" },
                      { step: "4", text: "Launch your first campaign in weeks, not months" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 text-xs font-bold">
                          {item.step}
                        </div>
                        <p className="text-slate-300 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-white mb-3">Prefer to talk?</h3>
                  <p className="text-slate-400 text-sm mb-5">
                    Skip the form and book a free 30-minute strategy call directly.
                  </p>
                  <a
                    href="https://calendly.com/cortexuummarketing/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center bg-[#E63E8B] text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-pink-500/20 text-sm"
                  >
                    BOOK A CALL <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-7">
                  <h3 className="text-lg font-bold text-white mb-3">See our work</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Check out real projects we've shipped for real businesses.
                  </p>
                  <a
                    href="/services/websites"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
                  >
                    View Portfolio <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900/60 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <img src={cortexuumLogoCircle} alt="Cortexuum" className="h-10 w-10 rounded-full mb-4 opacity-90" />
              <p className="text-slate-400 text-sm leading-relaxed">
                We're your partners in online success. Specializing in AI-powered marketing, funnel building, and psychology-based strategies.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2.5">
                {["Paid Media", "Funnel Buildouts", "Offer Creation", "Social Media"].map(s => (
                  <li key={s}><a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About", href: "#" },
                  { label: "Testimonials", href: "#results" },
                  { label: "Portfolio", href: "/services/websites" },
                ].map(l => (
                  <li key={l.label}><a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms & Conditions", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                ].map(l => (
                  <li key={l.label}><a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-slate-400 text-sm">
                  &copy; {new Date().getFullYear()} Cortexuum AI Marketing Agency. All rights reserved.
                </p>
                <p className="text-slate-600 text-xs mt-1 italic">
                  Data-driven solutions that beat opinions, every time.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://calendly.com/cortexuummarketing/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E63E8B] text-white rounded-full px-6 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity shadow-md shadow-pink-500/20"
                >
                  BOOK A CALL
                </a>
                <a href="/login" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
                  Admin
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-4 text-center">
            <p className="text-slate-600 text-xs">
              Designed by Ignacio Nunez · <a href="mailto:dev@ignacionunez.dev" className="hover:text-slate-400 transition-colors">dev@ignacionunez.dev</a> · <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">plaintalk.dev</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}