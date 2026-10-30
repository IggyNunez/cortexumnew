import { useRef } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import christianColgate from "../assets/christian-colgate.webp";
import cortexuumBrain from "../assets/cortexuum-brain.png";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  CountUp, EASE, HorizontalScroll, Magnetic, MaskLines, Reveal, ScaleBars,
  ScrollProgress, ScrollWords, Spotlight, StackCards, ZoomImage,
} from "@/components/motion";

const CTA_URL = "https://calendly.com/cortexuummarketing/30min";

const services = [
  { title: "Paid media", description: "Meta, Google, and TikTok. Account builds, media buying, creative direction and testing, plus the tracking and attribution to prove what worked." },
  { title: "Funnel and website builds", description: "Opt-ins, VSL and webinar funnels, membership checkouts, automations, copywriting, integrations, and post-launch support." },
  { title: "Conversion rate optimization", description: "Landing page audits, heat mapping, and structured A/B testing programs driven by your own customer data, not hunches." },
  { title: "Offer and messaging", description: "Offer architecture, positioning, and VSL and webinar scripting. When the offer is the constraint, no amount of media spend fixes it." },
  { title: "Consulting and advisory", description: "Available standalone when you want strategy, auditing, and oversight rather than full execution. We tell you the truth either way." },
];

const benefits = [
  { title: "Psychology-based targeting", stat: "30-50% higher ROI", description: "Targeting models built on cognitive and behavioral psychology. They don't just find audiences. They account for why people buy." },
  { title: "Around-the-clock monitoring", stat: "Always on", description: "Automated monitoring adjusts and optimizes around the clock, catching opportunities a weekly check-in would miss." },
  { title: "Hyper-personalization", stat: "40-60% lower acquisition", description: "From ad creative to landing pages to follow-ups, each prospect gets a journey built for conversion." },
  { title: "Predictive insights", stat: "See what's coming", description: "Models that flag market shifts and customer behavior patterns early, so you act before the trend instead of after it." },
];

const teamExpertise = [
  { years: "20+", area: "eCommerce and development" },
  { years: "15+", area: "Project management" },
  { years: "15+", area: "Copywriting and content" },
  { years: "20+", area: "Sales and growth" },
];

const founderStats = [
  { value: "$250M+", label: "Personally managed in ad spend" },
  { value: "8 figures", label: "Marketing orgs scaled from six figures" },
  { value: "200+", label: "Team members, grown from 15" },
];

// Documented client results. Every figure is from a real account; the masked
// accounts are platform-reported and unaltered. Client names withheld where
// the engagement is under confidentiality.
const documentedResults = [
  {
    scope: "Content agency, Meta, cold traffic",
    client: "Splash Media",
    headline: "$150,000 in contracts on a $100/day budget",
    detail: "High-ticket retainers, phone-closed, and they had never run paid ads. We rebuilt creative, then found the real bottleneck was the landing page.",
    stats: [
      { value: "34.89x", label: "Return on ad spend" },
      { value: "$4,783", label: "Total ad spend" },
      { value: "$97.52", label: "Cost per lead at scale" },
    ],
    href: "/case-study/splash-media",
  },
  {
    scope: "Ecommerce, Meta, 10-week window",
    client: "Client account under NDA",
    headline: "4.77x blended return across 1,327 purchases",
    detail: "Prospecting held 3.59x on $24.9K while retargeting ran 9.31x on $6.5K, at $30.52 and $12.69 cost per purchase.",
    stats: [
      { value: "4.77x", label: "Blended purchase ROAS" },
      { value: "$149,733", label: "Purchase value" },
      { value: "$31,373", label: "Media spend" },
    ],
  },
  {
    scope: "Info product, Meta, single 30-day window",
    client: "Client account under NDA",
    headline: "10,313 leads in 30 days at $19.88 each",
    detail: "Cost per lead held between $19.36 and $21.12 across three scaled campaigns while volume ran past 10,000 leads.",
    stats: [
      { value: "$19.88", label: "Blended cost per lead" },
      { value: "$205,027", label: "Media spend, 30 days" },
      { value: "3.05M", label: "Impressions" },
    ],
  },
  {
    scope: "Supplement brand, Google Ads, full rebuild",
    client: "$1M+ brand, name confidential",
    headline: "6.0x account ROAS with cost per click down 16%",
    detail: "Rank-1 dominance held on branded search and shopping while top-of-funnel spend was pushed from 50% toward 90% of budget, growing net-new customers instead of harvesting brand demand.",
    stats: [
      { value: "6.0x", label: "Account ROAS" },
      { value: "-16%", label: "Cost per click, week over week" },
      { value: "90%", label: "Budget moved top-of-funnel" },
    ],
  },
];

// Client logos extracted from the partner brief. Served from client/public/logos.
// doingwell is deliberately excluded: that engagement stays off the site.
// `dark` marks logos whose artwork is baked onto a #111111 background. The tile
// matches that color so the image blends into the card instead of sitting in it
// as a black rectangle. Every logo's edge pixels are a uniform #111111 or #ffffff.
type Brand = { name: string; file: string; dark?: boolean };

const infoBrands: Brand[] = [
  { name: "5MM", file: "5mm", dark: true },
  { name: "Data in Motion", file: "data-in-motion", dark: true },
  { name: "Gallaher Edge", file: "gallaher-edge" },
  { name: "Social Revelation", file: "social-revelation" },
  { name: "GNO Partners", file: "gno-partners" },
  { name: "Moneytize", file: "moneytize" },
  { name: "Propvera", file: "propvera" },
  { name: "Builders Business Funding", file: "builders-business-funding" },
  { name: "How to Host", file: "how-to-host" },
  { name: "YouthPlyo", file: "youthplyo" },
  { name: "Outbound Roundtables", file: "outbound-roundtables" },
  { name: "The Joy-Effect", file: "the-joy-effect" },
];

const commerceBrands: Brand[] = [
  { name: "Splash", file: "splash", dark: true },
  { name: "My Bag My Story", file: "my-bag-my-story" },
  { name: "AlkaVida", file: "alkavida" },
  { name: "Holistic Hustler", file: "holistic-hustler" },
  { name: "Jennifer Baron, M.D.", file: "jennifer-baron-md" },
  { name: "Fitness Covered", file: "fitness-covered", dark: true },
  { name: "Juice Crafters", file: "juice-crafters" },
  { name: "Jetts Window Cleaning", file: "jetts-window-cleaning", dark: true },
  { name: "Kalyxi", file: "kalyxi" },
];

const agencyBrands: Brand[] = [
  { name: "BAD Marketing", file: "bad-marketing", dark: true },
  { name: "GigaBrands", file: "gigabrands", dark: true },
  { name: "Social Revelation", file: "social-revelation" },
];

// White-background logos only: multiply drops their white onto the hero field.
const marqueeBrands = [...infoBrands, ...commerceBrands].filter(b => !b.dark);

const funnelSteps = [
  { label: "Ideation", desc: "Strategy and concept development" },
  { label: "Writing", desc: "Psychology-driven copy" },
  { label: "Filming", desc: "Authentic video content" },
  { label: "Editing", desc: "Polished creative assets" },
  { label: "Publishing", desc: "Multi-channel distribution" },
  { label: "Capture", desc: "Lead generation systems" },
  { label: "Nurture", desc: "Automated follow-up sequences" },
  { label: "Convert", desc: "Sales optimization" },
];

const nextSteps = [
  "Schedule a free 30-minute strategy call",
  "We deep-dive into your business goals",
  "Receive a custom marketing systems proposal",
  "Launch your first campaign in weeks",
];

// Headline numbers for the statement band. Each one is documented elsewhere on the page.
const proofStrip = [
  { value: "$250M+", label: "Ad spend personally managed" },
  { value: "34.89x", label: "Return on ad spend for Splash Media" },
  { value: "10,313", label: "Leads in 30 days for one info brand" },
  { value: "200+", label: "Team members, grown from 15" },
];

// The eight funnel steps, paired into the four phases of the 90-day buildout.
const phases = [
  { title: "Build the message", steps: funnelSteps.slice(0, 2) },
  { title: "Make the creative", steps: funnelSteps.slice(2, 4) },
  { title: "Put it in market", steps: funnelSteps.slice(4, 6) },
  { title: "Turn leads into revenue", steps: funnelSteps.slice(6, 8) },
];

const faqs = [
  { q: "What kinds of businesses do you work with?", a: "Info products of every shape: courses, coaching, communities, events, and paid newsletters, plus DTC ecommerce. The best fit is an offer already closing on the phone or at checkout that needs more qualified volume at the top." },
  { q: "Which ad platforms do you run?", a: "Meta, Google, and TikTok, along with the tracking and attribution that show which spend actually produced revenue." },
  { q: "Is there anything you don't take on?", a: "Amazon advertising and standalone email marketing. We would rather hand those back than run them badly." },
  { q: "Can I see results from the accounts under NDA?", a: "Yes, one to one. A large share of the work sits under confidentiality with agency partners and their clients, so those accounts, screenshots, and numbers are walked through live on a call rather than printed here." },
  { q: "Can we hire you for strategy only?", a: "Yes. Consulting and advisory is available on its own when you want strategy, auditing, and oversight rather than full execution." },
  { q: "What happens on the strategy call?", a: "It's a free 30 minutes. We dig into your business goals, and if there's a fit you get a custom marketing systems proposal. From there, the first campaign launches in weeks." },
];

function SilkField() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="silk-field" />
      <div className="silk-grain" />
    </div>
  );
}

function CtaButton({ children, className = "", tone = "navy" }: { children: React.ReactNode; className?: string; tone?: "navy" | "white" }) {
  const colors = tone === "white" ? "bg-white text-[#0E1B33] hover:bg-[#7FD3E6]" : "bg-[#0E1B33] text-white hover:bg-[#357BD8]";
  return (
    <Magnetic className={className}>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-full font-semibold px-7 py-4 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#357BD8] focus-visible:ring-offset-2 ${colors}`}
      >
        {children}
        <span className="relative w-4 h-4 overflow-hidden">
          <ArrowRight className="absolute inset-0 w-4 h-4 transition-transform duration-300 group-hover:translate-x-5" />
          <ArrowRight className="absolute inset-0 w-4 h-4 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      </a>
    </Magnetic>
  );
}

function SectionHead({ title, intro, light = false }: { title: string; intro?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-3xl mb-12 md:mb-16">
      <h2 className={`font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] ${light ? "text-white" : "text-[#0E1B33]"}`}>{title}</h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed max-w-2xl ${light ? "text-white/65" : "text-slate-600"}`}>{intro}</p>}
    </Reveal>
  );
}

function LogoTile({ brand }: { brand: Brand }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl p-4 h-24 overflow-hidden border transition-transform duration-500 hover:-translate-y-1 ${
        brand.dark ? "bg-[#111111] border-[#111111]" : "bg-white border-slate-200"
      }`}
    >
      <img src={`/logos/${brand.file}.png`} alt={brand.name} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
}

function RosterGroup({ title, note, brands, gridClass }: { title: string; note: string; brands: Brand[]; gridClass: string }) {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-12 py-10 border-t border-slate-300/70">
      <Reveal>
        <h3 className="font-display text-xl font-semibold text-[#0E1B33]">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">{note}</p>
      </Reveal>
      <motion.div
        className={`grid gap-3 ${gridClass}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {brands.map(b => (
          <motion.div key={b.file} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
            <LogoTile brand={b} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Hero stat pills: each figure is documented further down the page.
const heroStats = [
  { value: "$250M+", label: "ad spend managed" },
  { value: "34.89x", label: "ROAS for Splash Media" },
  { value: "10,313", label: "leads in 30 days" },
];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const after = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section ref={ref} id="top" className="relative p-2 md:p-3">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] min-h-[100svh] md:min-h-[calc(100svh-24px)] flex flex-col">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: fieldScale }}>
          <SilkField />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-8 flex flex-col items-center justify-center text-center"
        >
          {/* The logo brain with slow orbit rings, carried over from the previous hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative w-16 h-16 md:w-20 md:h-20 mb-8 md:mb-10"
          >
            <span aria-hidden className="absolute -inset-3 rounded-full bg-white/70 blur-xl" />
            <span aria-hidden className="absolute -inset-4 rounded-full border border-dashed border-[#357BD8]/30 animate-[spin_40s_linear_infinite] motion-reduce:animate-none" />
            <span aria-hidden className="absolute -inset-9 rounded-full border border-[#00BCD4]/20 animate-[spin_60s_linear_infinite_reverse] motion-reduce:animate-none">
              <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#E63E8B]/70" />
            </span>
            <img src={cortexuumBrain} alt="Cortexuum" className="relative w-full h-full object-contain drop-shadow-[0_10px_18px_rgba(14,27,51,0.25)]" />
          </motion.div>

          <h1 className="font-display text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[6.2rem] xl:text-[6.8rem] font-bold tracking-[-0.045em] lg:whitespace-nowrap">
            <MaskLines lines={["Marketing systems", "proven on $250M+", "of ad spend."]} delay={0.2} />
          </h1>
          <motion.p {...after(0.6)} className="mt-7 text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
            We study how your customers actually make decisions, then engineer every ad, funnel, and follow-up around what the data proves converts.
          </motion.p>

          <motion.div {...after(0.7)} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <CtaButton>Book a strategy call</CtaButton>
            <a href="#proof" className="text-[15px] font-semibold text-[#0E1B33] underline decoration-[#357BD8]/40 underline-offset-[6px] hover:decoration-[#357BD8] transition-colors">
              See the results
            </a>
          </motion.div>

          {/* Proof as one quiet line under the CTA, not badges above it */}
          <motion.ul {...after(0.85)} className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm text-slate-600">
            {heroStats.map((s, i) => (
              <li key={s.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden className="hidden sm:inline mr-3.5 text-slate-400">·</span>}
                <CountUp value={s.value} className="font-semibold text-[#0E1B33]" />
                {s.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Logo marquee */}
        {/* Multiply sits on this layer root: the logos' white drops into the field.
            Set on the imgs it would only blend inside the transformed marquee layer. */}
        <motion.div {...after(0.9)} className="relative z-10 pb-8 md:pb-10 mix-blend-multiply">
          <p className="max-w-7xl mx-auto px-6 md:px-10 mb-4 text-sm text-slate-600">Brands we've built the machine for</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max animate-scroll-x [animation-duration:45s] hover:[animation-play-state:paused]">
              {[...marqueeBrands, ...marqueeBrands].map((b, i) => (
                <img
                  key={i}
                  src={`/logos/${b.file}.png`}
                  alt={i < marqueeBrands.length ? b.name : ""}
                  aria-hidden={i >= marqueeBrands.length}
                  className="h-14 md:h-16 w-auto mx-5 md:mx-8 grayscale opacity-80"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [featured, ...moreResults] = documentedResults;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-[#0E1B33] font-sans antialiased overflow-x-clip">
        <ScrollProgress />
        <Header />
        <Hero />

        {/* ===== STATEMENT ===== */}
        <section className="px-6 md:px-10 pt-28 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <ScrollWords
              className="font-display text-[2.1rem] sm:text-5xl lg:text-[4.3rem] font-semibold tracking-[-0.035em] leading-[1.06]"
              text="Most marketing gets judged on activity. Ours gets judged on the receipt: every ad, funnel, and follow-up built around what the data proves converts."
            />
            <dl className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {proofStrip.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} className="border-t border-slate-200 pt-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl md:text-6xl font-bold tracking-[-0.04em]"><CountUp value={s.value} /></dd>
                  <dd className="mt-2 text-sm md:text-[15px] text-slate-500">{s.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHead
                title="What we run for you"
                intro="Every service built on psychological principles and proven performance data."
              />
            </div>
            <div>
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05}>
                  <div className="group relative grid md:grid-cols-[220px_1fr] gap-3 md:gap-10 py-8 border-t border-slate-200">
                    <span aria-hidden className="absolute left-0 top-[-1px] h-px w-0 bg-[#357BD8] transition-all duration-700 ease-out group-hover:w-full" />
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#357BD8]">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </Reveal>
              ))}

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <Reveal>
                  <Spotlight className="h-full rounded-3xl bg-[#EAF6F1] p-7">
                    <h3 className="flex items-center gap-2 font-semibold"><Check className="w-4 h-4 text-emerald-700" /> Where we're the right call</h3>
                    <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                      Info products of every shape: courses, coaching, communities, events, and paid newsletters, plus DTC ecommerce. Offers already closing on phone or checkout that need more qualified volume at the&nbsp;top.
                    </p>
                  </Spotlight>
                </Reveal>
                <Reveal delay={0.08}>
                  <Spotlight className="h-full rounded-3xl bg-[#F3F6FB] p-7">
                    <h3 className="flex items-center gap-2 font-semibold"><Minus className="w-4 h-4 text-slate-500" /> Where we're not</h3>
                    <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                      Amazon advertising and standalone email marketing. We would rather hand those back than run them badly.
                    </p>
                  </Spotlight>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ===== RESULTS: pinned, scrolls sideways on desktop ===== */}
        <section id="proof" className="scroll-mt-24 bg-[#F3F6FB] py-24 lg:py-0">
          <HorizontalScroll
            header={
              <div className="w-full max-w-7xl mx-auto px-6 md:px-10 mb-10 lg:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-2xl">
                  <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">The receipts, not the promises</h2>
                  <p className="mt-5 text-lg text-slate-600 leading-relaxed">Real accounts, real spend, real return. Platform-reported figures, unaltered.</p>
                </div>
                <p className="hidden lg:block text-sm text-slate-500">Keep scrolling</p>
              </div>
            }
          >
            <Spotlight tone="dark" className="md:col-span-2 lg:w-[720px] lg:flex-none rounded-[32px] bg-[#0E1B33] text-white p-8 md:p-10 flex flex-col">
              <a href={featured.href} className="group flex flex-col h-full">
                <p className="text-sm text-white/60">{featured.client} · {featured.scope}</p>
                <h3 className="mt-4 font-display text-3xl md:text-[2.6rem] font-bold tracking-[-0.03em] leading-[1.04]">{featured.headline}</h3>
                <p className="mt-4 text-white/70 leading-relaxed max-w-xl">{featured.detail}</p>
                <div className="mt-8">
                  <ScaleBars
                    tone="dark"
                    bars={[
                      { label: "Ad spend", value: "$4,783", amount: 4783, color: "#7FD3E6" },
                      { label: "Contracts closed", value: "$150,000", amount: 150000, color: "#357BD8" },
                    ]}
                  />
                </div>
                <p className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7FD3E6] group-hover:gap-2.5 transition-all">
                  Read the full case study <ArrowUpRight className="w-4 h-4" />
                </p>
              </a>
            </Spotlight>

            {moreResults.map(r => (
              <Spotlight key={r.headline} className="lg:w-[420px] lg:flex-none rounded-[32px] bg-white p-8 flex flex-col">
                <p className="text-sm text-slate-500">{r.scope}</p>
                <p className="mt-6 font-display text-6xl font-bold tracking-[-0.04em] text-[#357BD8]"><CountUp value={r.stats[0].value} /></p>
                <p className="mt-1 text-sm text-slate-500">{r.stats[0].label}</p>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-[-0.02em] leading-[1.15]">{r.headline}</h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed flex-1">{r.detail}</p>
                <dl className="mt-6 space-y-2.5 border-t border-dashed border-slate-300 pt-5 text-[15px]">
                  {r.stats.slice(1).map(s => (
                    <div key={s.label} className="flex justify-between gap-4">
                      <dt className="text-slate-500">{s.label}</dt>
                      <dd className="font-semibold"><CountUp value={s.value} /></dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-xs text-slate-400">{r.client}</p>
              </Spotlight>
            ))}

            <div className="md:col-span-2 lg:w-[380px] lg:flex-none rounded-[32px] border-2 border-dashed border-slate-300 p-8 flex flex-col justify-between gap-8">
              <p className="font-display text-3xl font-bold tracking-[-0.03em] leading-[1.1]">More accounts sit under NDA.</p>
              <div>
                <p className="text-slate-600 leading-relaxed">Those screenshots and numbers get walked through live, one to one.</p>
                <CtaButton className="mt-6">See them on a call</CtaButton>
              </div>
            </div>
          </HorizontalScroll>
        </section>

        {/* ===== WHY IT WORKS ===== */}
        <section id="benefits" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto">
            <SectionHead
              title="Marketing that understands how people think"
              intro="With over $250 million in managed ad spend and 7+ years of combined industry experience, we've seen what works and what doesn't."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08} className="h-full">
                  <Spotlight className="h-full rounded-[28px] border border-slate-200 bg-white p-7">
                    <p className="font-display text-2xl font-bold tracking-[-0.02em] text-[#357BD8]">{b.stat}</p>
                    <h3 className="mt-8 font-semibold">{b.title}</h3>
                    <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{b.description}</p>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS: stacking cards ===== */}
        <section id="process" className="scroll-mt-24 p-2 md:p-3">
          <div className="rounded-[28px] md:rounded-[40px] bg-[#0E1B33] text-white px-6 md:px-10 py-24 md:py-32">
            <div className="max-w-5xl mx-auto">
              <SectionHead light title="From strategy to consistent conversions in 90 days" intro="A systematic buildout engineered to create a predictable pipeline." />
              <StackCards>
                {phases.map((p, i) => (
                  <div key={p.title} className="rounded-[28px] bg-[#16284A] border border-white/10 p-8 md:p-12 grid md:grid-cols-[1fr_1.3fr] gap-8 md:gap-12 min-h-[340px] shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.6)]">
                    <div className="flex flex-col justify-between gap-8">
                      <span className="font-display text-7xl md:text-8xl font-bold tracking-[-0.05em] text-[#7FD3E6]/90 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-display text-3xl md:text-4xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                    </div>
                    <ul className="self-end divide-y divide-white/10">
                      {p.steps.map(s => (
                        <li key={s.label} className="py-5 flex items-baseline justify-between gap-6">
                          <span className="font-display text-xl font-semibold">{s.label}</span>
                          <span className="text-right text-white/60">{s.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </StackCards>
            </div>
          </div>
        </section>

        {/* ===== CLIENT ROSTER ===== */}
        <section id="clients" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <SectionHead title="Brands we've built the machine for" />
            <RosterGroup
              title="Information and education brands"
              note="Courses, coaching, communities, events, and paid newsletters. This is the core of the book."
              brands={infoBrands}
              gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            />
            <RosterGroup
              title="Ecommerce, DTC and service brands"
              note="The same engine applied outside info products. Additional named brands are held under NDA, disclosable on request."
              brands={commerceBrands}
              gridClass="grid-cols-2 sm:grid-cols-3 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1"
            />
            <RosterGroup
              title="Inside the industry's leading agencies"
              note="Contracted in to build out infrastructure and lead the teams behind their largest accounts."
              brands={agencyBrands}
              gridClass="grid-cols-2 sm:grid-cols-3 [&>*:last-child]:col-span-2 sm:[&>*:last-child]:col-span-1"
            />
          </div>
        </section>

        {/* ===== FOUNDER ===== */}
        <section id="founder" className="scroll-mt-24 bg-[#F3F6FB] px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <Reveal className="lg:sticky lg:top-28">
              <ZoomImage src={christianColgate} alt="Christian Colgate, CEO and founder of Cortexuum" className="rounded-[32px] aspect-[4/5] max-w-md bg-white" />
            </Reveal>
            <div>
              <Reveal>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">Christian Colgate</h2>
                <p className="mt-3 text-lg text-slate-500">CEO and founder</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-8 space-y-5 text-lg text-slate-700 leading-relaxed max-w-2xl">
                <p>Christian leads the paid media division at Cortexuum, scaling brands across Meta, Google, and TikTok.</p>
                <p>He founded and scaled multiple six-figure organizations and played a central role in building the eCommerce department of a leading performance marketing agency from the ground&nbsp;up.</p>
                <p>He has managed the systems and marketing behind Alex Hormozi's portfolio, Gary Brecka's brands, and a roster of household names across MMA, music, real estate, and entertainment held under NDA. Those engagements are reviewed live rather than printed&nbsp;here.</p>
              </Reveal>
              <dl className="mt-12 grid sm:grid-cols-3 gap-8">
                {founderStats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.08}>
                    <dt className="font-display text-4xl font-bold tracking-[-0.03em]"><CountUp value={s.value} /></dt>
                    <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
                  </Reveal>
                ))}
              </dl>
              <Reveal className="mt-12 pt-8 border-t border-slate-300/70">
                <p className="text-sm text-slate-500 mb-4">The team behind the work, in years</p>
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {teamExpertise.map(t => (
                    <div key={t.area}>
                      <dt className="font-display text-2xl font-bold"><CountUp value={t.years} /></dt>
                      <dd className="text-sm text-slate-600">{t.area}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="faq" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHead title="Questions before the call" intro="The short answers. The long ones happen on the call." />
            </div>
            <Reveal>
              <Accordion type="single" collapsible className="border-t border-slate-200">
                {faqs.map(f => (
                  <AccordionItem key={f.q} value={f.q} className="border-slate-200">
                    <AccordionTrigger className="py-6 text-left font-display text-xl md:text-2xl font-semibold tracking-[-0.02em] hover:no-underline hover:text-[#357BD8] transition-colors">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* ===== BOOK A CALL ===== */}
        <section id="contact" className="scroll-mt-24 p-2 md:p-3">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px]">
            <SilkField />
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
              <div>
                <Reveal>
                  <h2 className="font-display text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
                    Ready to see what proven marketing systems can do?
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-lg text-slate-700 max-w-xl">Book a free 30-minute strategy call. No obligations, just real insights for your business.</p>
                  <CtaButton className="mt-9">Book a strategy call</CtaButton>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <div className="rounded-[28px] bg-white/75 backdrop-blur-xl border border-white p-7 md:p-8">
                  <h3 className="font-semibold">What happens next</h3>
                  <ol className="mt-5 space-y-4">
                    {nextSteps.map((t, i) => (
                      <li key={t} className="flex gap-4">
                        <span className="flex-none w-7 h-7 rounded-full bg-[#0E1B33] text-white text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                        <span className="pt-0.5 text-slate-700">{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="px-6 md:px-10 pt-16 pb-10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <img src={cortexuumBrain} alt="" className="w-7 h-7 object-contain" />
              <span className="font-semibold text-[#0E1B33]">Cortexuum</span>
              <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Cookies", href: "/cookies" }].map(l => (
                <a key={l.label} href={l.href} className="hover:text-[#0E1B33] transition-colors">{l.label}</a>
              ))}
              <a href="/login" className="text-slate-400 hover:text-slate-600 transition-colors">Admin</a>
            </nav>
          </div>
          <motion.p
            aria-hidden
            initial={{ y: "40%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="mt-14 font-display font-bold text-[#0E1B33] text-[19vw] leading-[0.8] tracking-[-0.06em] text-center select-none"
          >
            Cortexuum
          </motion.p>
        </footer>
      </div>
    </MotionConfig>
  );
}
