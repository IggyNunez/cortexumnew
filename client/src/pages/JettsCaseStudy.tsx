import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ExternalLink,
  Phone,
  Globe,
  TrendingUp,
  Users,
  Search,
  Smartphone,
  Zap,
  Star,
  ChevronDown,
  MapPin,
  Clock,
  DollarSign,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react";
import cortexuumLogoWhite from "../assets/cortexuum-logo-white.png";
import jettsHero from "../assets/portfolio-jetts.png";
import jettsServices from "../assets/jetts-services.png";
import jettsPricing from "../assets/jetts-pricing.png";
import jettsAbout from "../assets/jetts-about.png";
import DesignerFooter from "@/components/DesignerFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const intakeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  business_name: z.string().min(2, "Business name is required"),
  services_offered: z.string().min(5, "Tell us what services you offer"),
  service_area: z.string().min(2, "Where do you serve?"),
  current_website: z.string().optional(),
  how_customers_find_you: z.string().optional(),
  biggest_challenge: z.string().optional(),
});

type IntakeFormData = z.infer<typeof intakeSchema>;

const results = [
  { value: "40+", label: "Leads Per Month", icon: Users },
  { value: "#1", label: "Local Rankings", icon: Search },
  { value: "12%", label: "Form Conversion", icon: TrendingUp },
  { value: "$0", label: "Ad Spend", icon: DollarSign },
  { value: "1.4s", label: "Load Time", icon: Zap },
  { value: "67%", label: "Mobile Traffic", icon: Smartphone },
];

const whatWeBuilt = [
  {
    title: "Mobile-First Design",
    description: "67% of visitors come from phones. Every pixel was designed for thumbs first, screens second. No pinching, no zooming, no frustration.",
    icon: Smartphone,
  },
  {
    title: "Local SEO From Day One",
    description: "Schema markup, Google Business Profile optimization, location-specific content, and targeted keywords that put Jetts in front of homeowners actively searching.",
    icon: MapPin,
  },
  {
    title: "30-Second Quote Flow",
    description: "A streamlined form that captures qualified leads in under 30 seconds. Every unnecessary field was removed. Every remaining field earns its place.",
    icon: Clock,
  },
  {
    title: "Conversion-First Copy",
    description: "Headlines that stop scrolling. Trust signals that remove doubt. CTAs that make the next step obvious. Every word on the site was written to convert.",
    icon: Target,
  },
  {
    title: "Protection Plans Page",
    description: "Recurring revenue engine. Tiered pricing presented clearly so customers self-select the right plan. Turns one-time jobs into long-term relationships.",
    icon: DollarSign,
  },
  {
    title: "Sub-2-Second Loading",
    description: "Fast sites rank higher and convert better. Optimized images, minimal JavaScript, edge caching. The site loads before the visitor can blink.",
    icon: Zap,
  },
];

const timeline = [
  { week: "Week 1", title: "Discovery & Strategy", description: "Brand audit, competitor analysis, keyword research, and conversion strategy. We map out every page before writing a single line of code." },
  { week: "Week 2", title: "Design & Content", description: "Mobile-first wireframes, copy that converts, and a visual identity that matches the professionalism of the service. Client reviews and approves before build." },
  { week: "Week 3", title: "Build & Optimize", description: "Full development, SEO implementation, speed optimization, and form integration. Every detail tested on real devices." },
  { week: "Week 4", title: "Launch & Track", description: "Go live, submit to Google, set up analytics, and start tracking leads. We don't disappear after launch, we measure what matters." },
];

export default function JettsCaseStudy() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<IntakeFormData>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      business_name: "",
      services_offered: "",
      service_area: "",
      current_website: "",
      how_customers_find_you: "",
      biggest_challenge: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: IntakeFormData) => {
      const payload = {
        website_url: data.current_website || "none",
        name: data.name,
        email: data.email,
        page_goal: `Cleaning Services Intake | Business: ${data.business_name} | Services: ${data.services_offered} | Area: ${data.service_area} | How found: ${data.how_customers_find_you || "N/A"} | Challenge: ${data.biggest_challenge || "N/A"}`,
        target_audience: "Cleaning services business owner",
        offer_description: data.services_offered,
        why_right_choice: `Service area: ${data.service_area}`,
        monthly_traffic: data.current_website ? "Has website" : "No website yet",
      };
      return apiRequest("POST", "/api/page-reviews", payload);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({ title: "We got your info!", description: "We'll reach out within 24 hours with a custom plan for your business." });
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again or email us directly.", variant: "destructive" });
    },
  });

  const onSubmit = (data: IntakeFormData) => mutation.mutate(data);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={cortexuumLogoWhite} alt="Cortexuum" className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <a href="/services/websites" className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block">
              All Projects
            </a>
            <a
              href="#intake"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Get Your Site Built
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">Case Study: Cleaning Services</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              We took a cleaning company from{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                zero online presence
              </span>{" "}
              to 40+ leads per month.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
              No ads. No gimmicks. Just a website that actually works for the business. Here's exactly how we did it, and how we can do it for yours.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#intake"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25"
              >
                Build My Site <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#results"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 transition-colors"
              >
                See the results <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/40">
              <img
                src={jettsHero}
                alt="Jetts Windows homepage - professional cleaning company website"
                className="w-full"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-full px-6 py-2.5 flex items-center gap-3">
              <Globe className="w-4 h-4 text-emerald-400" />
              <a
                href="https://jettswindows.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                jettswindows.com
              </a>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Grid */}
      <section id="results" className="py-16 md:py-24 px-4 bg-slate-900/40 border-y border-slate-800/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">The Numbers</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Results that speak for themselves.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {results.map((stat, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 text-center hover:border-emerald-500/30 transition-colors">
                  <stat.icon className="w-5 h-5 text-emerald-400 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp}>
                <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">The Challenge</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Great service. Zero online presence.
                </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Jett's Window Cleaning is a family-owned business in Utah delivering exceptional window cleaning, gutter cleaning, and pressure washing services. Their reputation was built on word-of-mouth and referrals.
                  </p>
                  <p>
                    But there was a problem: they had no website, no Google presence, and no way to capture the homeowners who were searching online. Meanwhile, competitors with mediocre service but decent websites were winning the business.
                  </p>
                  <p>
                    They didn't need a "pretty website." They needed a machine that turns Google searches into booked appointments.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm px-4 py-2 rounded-full">No website</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm px-4 py-2 rounded-full">Not on Google</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm px-4 py-2 rounded-full">Losing to competitors</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm px-4 py-2 rounded-full">Word-of-mouth only</span>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
                  <img src={jettsAbout} alt="Jetts Windows team - About page" className="w-full" />
                </div>
                <p className="text-slate-500 text-sm text-center mt-3">The Jett's team. Family-owned, licensed & insured.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Built */}
      <section className="py-16 md:py-24 px-4 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">What We Built</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Every detail designed to convert.
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Not just a website. A lead generation system disguised as a cleaning company site.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {whatWeBuilt.map((item, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-emerald-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Page Screenshot */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp} className="order-2 lg:order-1">
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
                  <img src={jettsServices} alt="Jetts Windows services page with protection plans" className="w-full" />
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="order-1 lg:order-2">
                <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">Services & Upsells</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  A services page that sells itself.
                </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    Most cleaning company websites just list services in bullet points. We built a page that educates the customer, builds trust, and presents upsells naturally.
                  </p>
                  <p>
                    Protection Plans are front and center, with clear pricing tiers ("The Crew," "The Boss," "The Mob") that make it easy for customers to self-select. The result? More recurring revenue, less sales friction.
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Tiered pricing that converts browsers to subscribers</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Clear service descriptions with trust signals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">Built-in upsell paths to increase average order value</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Page Screenshot */}
      <section className="py-16 md:py-24 px-4 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUp}>
                <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">Pricing Strategy</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pricing that does the selling for you.
                </h2>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    "Window Protection Plans" — not just clever branding. The pricing page uses the mob-family theme to make the tiers memorable and fun. "Join the Family — we'll give you an offer you can't refuse!"
                  </p>
                  <p>
                    The "Most Popular" badge on the middle tier uses anchoring psychology. Customers see three options and naturally gravitate toward the recommended one. The result: higher average plan value without any hard-sell tactics.
                  </p>
                </div>
                <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <p className="text-emerald-300 font-semibold mb-1">Why this matters for your business:</p>
                  <p className="text-slate-300 text-sm">Recurring revenue plans transform one-time cleaning jobs into predictable monthly income. Your website should be closing these deals for you 24/7.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
                  <img src={jettsPricing} alt="Jetts Windows pricing page with protection plan tiers" className="w-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">Our Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From first call to live site in 4 weeks.
              </h2>
              <p className="text-slate-400 text-lg">
                Here's exactly what the timeline looks like for your project.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px h-full bg-slate-700/50 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">{step.week}</span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Targeting */}
      <section className="py-16 md:py-24 px-4 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">Is This For You?</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We build sites for cleaning businesses like yours.
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { title: "Window Cleaning", desc: "Residential & commercial window washing, screen cleaning, hard water removal" },
                { title: "Pressure Washing", desc: "Driveways, decks, siding, fences, concrete cleaning and restoration" },
                { title: "Gutter Cleaning", desc: "Gutter cleanout, downspout flushing, gutter guard installation" },
                { title: "House Washing", desc: "Soft wash exterior cleaning, vinyl siding, brick, stucco" },
                { title: "Roof Cleaning", desc: "Moss removal, soft wash roof treatment, algae prevention" },
                { title: "Solar Panel Cleaning", desc: "Residential and commercial solar panel cleaning and maintenance" },
              ].map((service, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                  <Sparkles className="w-5 h-5 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-slate-400 text-sm">{service.desc}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <p className="text-slate-400 mb-4">Run a different type of cleaning service? We build for all of them.</p>
              <a
                href="#intake"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Tell us about your business <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intake Form */}
      <section id="intake" className="py-16 md:py-24 px-4 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3">Get Started</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tell us about your cleaning business.
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Quick intake — takes under 2 minutes. We'll review your info and reach out within 24 hours with a custom plan and quote.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">We're on it.</h3>
                  <p className="text-slate-300 text-lg mb-2">
                    Your info is in our hands. We'll put together a custom plan for your cleaning business and reach out within 24 hours.
                  </p>
                  <p className="text-slate-500 text-sm">
                    In the meantime, check out <a href="https://jettswindows.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">what we built for Jetts</a> for more inspiration.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 md:p-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Your Name *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="John Smith" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Email *</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" placeholder="john@mybusiness.com" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Phone</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="(555) 123-4567" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="business_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Business Name *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Smith's Window Cleaning" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="services_offered"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">What services do you offer? *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Window cleaning, pressure washing, gutter cleaning..." className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="service_area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Service Area *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Salt Lake City, UT area" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="current_website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-200">Current Website (if any)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="www.mysite.com or leave blank" className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="how_customers_find_you"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">How do customers currently find you?</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-900/60 border-slate-700 text-white">
                                  <SelectValue placeholder="Select one..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="word-of-mouth">Word of mouth / referrals</SelectItem>
                                <SelectItem value="google">Google search</SelectItem>
                                <SelectItem value="social-media">Social media</SelectItem>
                                <SelectItem value="door-to-door">Door-to-door / flyers</SelectItem>
                                <SelectItem value="nextdoor">Nextdoor / community apps</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="biggest_challenge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-200">What's your biggest challenge right now?</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Not enough leads, hard to compete with bigger companies, no online presence..."
                                rows={3}
                                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white font-semibold py-6 text-lg rounded-xl"
                      >
                        {mutation.isPending ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            Get My Custom Plan <ArrowRight className="w-5 h-5" />
                          </span>
                        )}
                      </Button>
                      <p className="text-slate-500 text-xs text-center">
                        No commitment. We'll review your info and send you a custom plan within 24 hours.
                      </p>
                    </form>
                  </Form>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-900/40 to-emerald-500/5 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your competitors already have a website.
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Every day without a website is another day your competitors are getting the leads that should be yours. Let's fix that.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#intake"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25"
              >
                Start My Project <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/services/websites"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-6 py-4 transition-colors"
              >
                See more projects <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={cortexuumLogoWhite} alt="Cortexuum" className="h-6 w-auto opacity-60" />
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="/services/websites" className="hover:text-slate-300 transition-colors">All Projects</a>
              <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-slate-300 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-6">
            <DesignerFooter />
          </div>
        </div>
      </footer>
    </div>
  );
}