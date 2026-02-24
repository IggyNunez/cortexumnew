import { useState, useEffect } from "react";
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
  ShoppingCart,
  Code,
  Bot,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Wrench,
  Rocket,
  Send,
} from "lucide-react";
import cortexuumLogoWhite from "../assets/cortexuum-logo-white.png";
import portfolioKalyxi from "../assets/portfolio-kalyxi.png";
import portfolioJetts from "../assets/portfolio-jetts.png";
import portfolioPropvera from "../assets/portfolio-propvera.png";
import portfolioLakelucien from "../assets/portfolio-lakelucien.png";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  website_url: z.string().optional(),
  page_goal: z.string().min(10, "Please tell us about your project (at least 10 characters)"),
  monthly_traffic: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function buildPayload(data: FormData) {
  return {
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    website_url: data.website_url || "Not provided",
    page_goal: data.page_goal,
    target_audience: "Website outreach inquiry",
    offer_description: data.page_goal,
    why_right_choice: "Submitted via website outreach form",
    common_objections: "",
    monthly_traffic: data.monthly_traffic || "not_sure",
    source: "website_outreach",
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: ShoppingCart,
    title: "Online Stores",
    description: "E-commerce stores that actually sell. Product pages that load fast, checkouts that don't confuse people, and designs that make your brand shine online.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Code,
    title: "Custom Websites",
    description: "From company sites to full web apps, built from scratch. No bloated templates, no plugins held together with duct tape. Clean, custom, yours.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "We connect your tools so things just work. Automated workflows, AI voice agents, smart integrations, so you can focus on growth, not repetitive tasks.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Developer Training",
    description: "We train developers who don't just write code, they explain it. The best engineers are the ones who can tell a client what they built without sounding like a robot.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Tech",
    description: "Websites and systems for health practices that need reliability, accessibility, and compliance. Built with care for the people who care for others.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Lightbulb,
    title: "Honest Consulting",
    description: "Sometimes the answer is \"you don't need a new website, you need better SEO.\" We'll always give it to you straight, even if it means a smaller invoice.",
    color: "from-sky-500 to-cyan-600",
  },
];

const portfolio = [
  {
    label: "AI Platform",
    name: "Kalyxi AI",
    url: "kalyxi.ai",
    image: portfolioKalyxi,
    description: "Full-stack voice AI platform powering automated call handling, lead qualification, and CRM workflows for 12+ client accounts.",
    stats: [
      { value: "2,400+", label: "Calls / Month" },
      { value: "94%", label: "Contact Rate" },
      { value: "3.2x", label: "Client ROI" },
    ],
    tags: ["Next.js", "Voice AI", "n8n", "Twilio"],
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
  },
  {
    label: "Lead Generation",
    name: "Jetts Windows",
    url: "jettswindows.com",
    image: portfolioJetts,
    description: "Full website build for a local window services company. Mobile-first design and local SEO that turned zero digital presence into 40+ qualified leads per month.",
    stats: [
      { value: "40+", label: "Leads / Month" },
      { value: "#1", label: "Local Rankings" },
      { value: "$0", label: "Ad Spend" },
    ],
    tags: ["Next.js 16", "Sanity", "Vercel", "Local SEO"],
    color: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30",
  },
  {
    label: "Healthcare",
    name: "PropVera",
    url: "propvera.net",
    image: portfolioPropvera,
    description: "Healthcare platform built for trust at first click. WCAG-compliant, mobile-optimized, and designed so patients find what they need in under 3 seconds.",
    stats: [
      { value: "94", label: "Accessibility" },
      { value: "+52%", label: "Appointments" },
      { value: "100%", label: "WCAG 2.1 AA" },
    ],
    tags: ["Healthcare", "Accessible", "Custom", "WCAG"],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
  },
  {
    label: "Healthcare + HIPAA",
    name: "Lake Lucien ASC",
    url: "lucienasc.com",
    image: portfolioLakelucien,
    description: "Full digital platform for a premier ambulatory surgery center. HIPAA-compliant infrastructure, responsive site, and 99.95% uptime SLA, delivered in 3 weeks.",
    stats: [
      { value: "3 wk", label: "Delivery" },
      { value: "95+", label: "Mobile Score" },
      { value: "99.95%", label: "Uptime SLA" },
    ],
    tags: ["React 18", "Google Cloud", "Firebase", "HIPAA"],
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "We Talk",
    description: "Tell us what you need in your own words. No forms with 40 fields, just a real conversation about your business.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Wrench,
    title: "We Translate",
    description: "We turn your goals into a clear plan, written in plain English. You'll know what, how long, and how much.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Rocket,
    title: "We Build",
    description: "You see progress in real time. If anything changes, we tell you before it hits your invoice.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Send,
    title: "We Launch",
    description: "Your project goes live, and you know how everything works. No mystery buttons. You own it completely.",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function WebsiteOutreach() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website_url: "",
      page_goal: "",
      monthly_traffic: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", "/api/page-reviews", buildPayload(data));
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you with a plain-English plan.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (isSubmitted) {
      document.title = "Message Received | Cortexuum";
    } else {
      document.title = "Custom Web Development & AI Automation | Cortexuum";
    }

    const metaTags: Record<string, string> = {
      description: "Cortexuum builds custom websites, online stores, and AI automation for real businesses. 150+ projects shipped. Plain-English communication, honest pricing, and results that speak for themselves.",
      "og:title": "Custom Web Development & AI Automation | Cortexuum",
      "og:description": "Custom websites, e-commerce, AI automation, and healthcare tech. 150+ projects shipped with plain-English communication and honest pricing.",
      "og:url": "https://cortexuum.com/services/websites",
      "og:type": "website",
      "twitter:title": "Custom Web Development & AI Automation | Cortexuum",
      "twitter:description": "Custom websites, e-commerce, AI automation, and healthcare tech. 150+ projects shipped with honest pricing.",
    };

    Object.entries(metaTags).forEach(([key, content]) => {
      const isOg = key.startsWith("og:") || key.startsWith("twitter:");
      const attr = isOg ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.id = "outreach-jsonld";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Cortexuum",
      url: "https://cortexuum.com",
      description: "Custom web development, AI automation, and psychology-based marketing for real businesses.",
      areaServed: "Worldwide",
      serviceType: ["Web Development", "AI Automation", "E-Commerce", "Healthcare Technology", "Marketing"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Websites" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Online Stores" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI & Automation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Healthcare Tech" } },
        ],
      },
    });
    if (!document.getElementById("outreach-jsonld")) {
      document.head.appendChild(jsonLd);
    }

    return () => {
      ["og:title", "og:description", "og:url", "og:type", "twitter:title", "twitter:description"].forEach((key) => {
        const attr = key.startsWith("og:") || key.startsWith("twitter:") ? "property" : "name";
        const el = document.querySelector(`meta[${attr}="${key}"]`);
        if (el) el.remove();
      });
      document.getElementById("outreach-jsonld")?.remove();
    };
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            We got your message.
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            We'll respond with a plain-English plan, an honest timeline, and a real price.
          </p>
          <p className="text-slate-400 mb-8">No jargon. No mystery invoices. Just clarity.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Return to homepage <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={cortexuumLogoWhite} alt="Cortexuum" className="w-36 md:w-44" />
          </a>
          <a
            href="#contact"
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            Start a Conversation
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/15 via-transparent to-transparent" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-6">
            Web Development, Translated
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            We build{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              websites.
            </span>
            <br />
            We speak{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                English.
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-rose-500" />
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            No jargon. No mystery invoices. Just real developers who explain what we're building, why it matters, and how much it costs, in words you actually understand.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
            >
              Start a Conversation <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium"
            >
              See Our Work <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-14 flex items-center justify-center gap-10 md:gap-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">150+</div>
              <div className="text-sm text-slate-400 mt-1">Projects Shipped</div>
            </div>
            <div className="w-px h-12 bg-slate-700" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
              <div className="text-sm text-slate-400 mt-1">Plain English</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Scrolling Ticker */}
      <div className="overflow-hidden border-y border-slate-800/50 bg-slate-900/30 py-4">
        <div className="flex animate-scroll-x gap-8 whitespace-nowrap">
          {["Custom Web Apps", "AI Automation", "E-Commerce", "Healthcare Tech", "Developer Training", "Website Design", "Voice AI", "Workflow Automation", "Plain English Proposals",
            "Custom Web Apps", "AI Automation", "E-Commerce", "Healthcare Tech", "Developer Training", "Website Design", "Voice AI", "Workflow Automation", "Plain English Proposals"].map((item, i) => (
            <span key={i} className="text-slate-500 font-medium text-sm tracking-wide flex-shrink-0">
              {item}
              <span className="mx-4 text-slate-700">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
                Who We Are
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                We cut through
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  the tech talk.
                </span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Most agencies hide behind complexity. They throw around acronyms, pad invoices with mystery line items, and make you feel like you need a CS degree to understand what you're paying for.
                </p>
                <p className="text-white font-medium">
                  We believe if you can't explain it simply, you don't understand it well enough.
                </p>
                <p>
                  <strong className="text-cyan-400">Cortexuum</strong> was built on one principle: you deserve to know exactly what's being built, how it works, and what it costs. Every project starts with a real conversation, not a 40-page spec doc.
                </p>
                <p>
                  We build real-world web solutions for real businesses. We train developers who can actually communicate. And we deliver projects that work on day one.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 font-mono text-sm overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 ml-2 text-xs">translator.js</span>
              </div>
              <div className="space-y-1 text-slate-400">
                <p className="text-slate-500">{"// What other agencies say:"}</p>
                <p>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-cyan-400">proposal</span> ={" "}
                  <span className="text-yellow-400">buildStrategy</span>({"{"}
                </p>
                <p className="pl-4">
                  <span className="text-green-400">arch</span>:{" "}
                  <span className="text-orange-300">"headless microservices"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">deploy</span>:{" "}
                  <span className="text-orange-300">"containerized CI/CD"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">stack</span>:{" "}
                  <span className="text-orange-300">"serverless edge nodes"</span>,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">cost</span>:{" "}
                  <span className="text-orange-300">"TBD after discovery"</span>
                </p>
                <p>{"});"}</p>
                <div className="my-4 border-t border-slate-700 pt-4">
                  <p className="text-cyan-400 font-semibold">{"→ cortexuum translation"}</p>
                </div>
                <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50">
                  <p className="text-white leading-relaxed">
                    "We'll build you a <span className="text-cyan-400 font-bold">fast website</span> that's{" "}
                    <span className="text-cyan-400 font-bold">easy to update</span>, costs{" "}
                    <span className="text-cyan-400 font-bold">$X per month</span> to run, and{" "}
                    <span className="text-cyan-400 font-bold">won't break</span> when traffic spikes.
                    Here's the price. No surprises."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 px-4 bg-slate-900/40 border-y border-slate-800/50">
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
              Real services.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Real descriptions.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              No corporate fluff. Here's what we actually build, described so anyone can understand.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/50 rounded-2xl p-7 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-slate-500 font-mono text-xs mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="work" className="py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
              Our Work
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Projects we shipped.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                In plain sight.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every one of these started with a simple conversation, and ended with something we're all proud of.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {portfolio.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`bg-gradient-to-br ${project.color} border ${project.border} rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300`}
              >
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <img
                    src={project.image}
                    alt={`${project.name} website preview`}
                    className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-mono text-slate-200 bg-slate-900/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.label}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-slate-200 bg-slate-900/70 backdrop-blur-sm p-1.5 rounded-full inline-flex">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
                <div className="p-7 pt-5">
                  <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{project.url}</p>
                  <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    {project.stats.map((stat, j) => (
                      <div key={j}>
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs bg-slate-800/60 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-28 px-4 bg-slate-900/40 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
              How We Work
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Four steps.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Zero confusion.
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-7 text-center"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-5`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-slate-600 font-mono text-xs mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="text-5xl text-slate-700 mb-6">"</div>
            <blockquote className="text-xl md:text-2xl text-slate-200 italic leading-relaxed mb-8">
              For the first time, I actually understood what my developer was building, and why. That changed everything.
            </blockquote>
            <p className="text-slate-400 font-medium">— A Cortexuum Client</p>
          </motion.div>
        </div>
      </section>

      {/* CTA / Contact Form */}
      <section id="contact" className="py-20 md:py-28 px-4 bg-slate-900/40 border-y border-slate-800/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">
                Ready?
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Let's skip the jargon
                <br />
                and build{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  something great.
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-300 text-lg leading-relaxed mb-8">
                Tell us about your project. We'll respond with a plain-English plan, an honest timeline, and a real price.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">No commitment required</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Response within 24 hours</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Plain-English plan included</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Honest pricing, no hidden fees</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-sm">Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                                {...field}
                              />
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
                            <FormLabel className="text-white text-sm">Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@company.com"
                                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-sm">Phone</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="website_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white text-sm">Current Website</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yoursite.com"
                                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="page_goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Tell us about your project *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What do you need built? What problem are you trying to solve?"
                              className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthly_traffic"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-sm">Budget range</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900/60 border-slate-700 text-white">
                                <SelectValue placeholder="Select a range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under_5k">Under $5,000</SelectItem>
                              <SelectItem value="5k_15k">$5,000 - $15,000</SelectItem>
                              <SelectItem value="15k_50k">$15,000 - $50,000</SelectItem>
                              <SelectItem value="over_50k">$50,000+</SelectItem>
                              <SelectItem value="not_sure">Not sure yet</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white font-semibold py-6 text-lg rounded-xl"
                    >
                      {mutation.isPending ? "Sending..." : "Start the Conversation"}
                    </Button>
                    <p className="text-slate-500 text-xs text-center">
                      We'll respond within 24 hours with a plain-English plan.
                    </p>
                  </form>
                </Form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Cortexuum, AI-Powered Marketing & Web Development
          </p>
          <p className="text-slate-600 text-xs">
            Designed by Ignacio Nunez &middot;{" "}
            <a href="mailto:dev@ignacionunez.dev" className="hover:text-slate-400 transition-colors">
              dev@ignacionunez.dev
            </a>{" "}
            &middot;{" "}
            <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">
              plaintalk.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
