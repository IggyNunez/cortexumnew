// Homepage laid out after Hirael's NexaCore template (MIT, Mohammad Shehadeh,
// https://hirael.com/templates/nexacore), rebuilt with Cortexuum's content and colors.
import type { ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus, X } from "lucide-react";
import christianColgate from "../assets/christian-colgate.webp";
import cortexuumBrain from "../assets/cortexuum-brain.png";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CountUp, EASE, HorizontalScroll, Magnetic, Reveal, ScaleBars, ScrollProgress, ScrollWords, Spotlight, ZoomImage } from "@/components/motion";
import { cn } from "@/lib/utils";

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


// Who it's for, split the way NexaCore splits chaos from control.
const fitYes = [
  "Courses and coaching",
  "Communities and events",
  "Paid newsletters",
  "DTC ecommerce brands",
  "Offers already closing on the phone or at checkout",
  "Brands that need more qualified volume at the top",
];
const fitNo = [
  "Amazon advertising",
  "Standalone email marketing",
  "Anything we'd rather hand back than run badly",
];

// The 90-day buildout as a staircase: each phase with its two steps.
// start/bottom are vw offsets from the template's desktop staircase.
const stairs = phases.map((p, i) => ({ ...p, start: [2.8, 22.4, 41.2, 61.1][i], bottom: [7, 9.08, 11.16, 13.24][i] }));

// ---------- NexaCore-style pieces ----------

function GradText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={cn("cx-grad-text", className)}>{children}</span>;
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-[#F4F6FA] px-4 py-2 text-[15px] font-medium text-[#0E1B33]", className)}>
      <img src={cortexuumBrain} alt="" className="w-4 h-4 object-contain" />
      {children}
    </span>
  );
}

// Navy button that flips to white on hover.
function GradButton({ children, href = CTA_URL, className = "" }: { children: ReactNode; href?: string; className?: string }) {
  const external = href.startsWith("http");
  return (
    <Magnetic className={className}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center gap-2 rounded-xl border border-[#0E1B33] bg-[#0E1B33] px-7 py-3 text-base font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)] transition-colors duration-300 hover:bg-white hover:text-[#0E1B33] outline-none focus-visible:ring-[3px] focus-visible:ring-[#357BD8]/50"
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </a>
    </Magnetic>
  );
}

function SectionHead({ chip, title, grad, intro, light = false }: { chip?: string; title: string; grad: string; intro?: string; light?: boolean }) {
  return (
    <Reveal className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
      {chip && <Chip className={light ? "bg-white/10 text-white" : ""}>{chip}</Chip>}
      <h2 className={cn("text-[length:clamp(32px,4vw,56px)] leading-[1.15] font-semibold tracking-[-0.02em]", light ? "text-white" : "text-[#0E1B33]")}>
        {title}
        <br />
        <GradText className="inline-block pb-1">{grad}</GradText>
      </h2>
      {intro && <p className={cn("text-[length:clamp(15px,1.2vw,19px)] leading-relaxed", light ? "text-[#B9C6DD]" : "text-slate-500")}>{intro}</p>}
    </Reveal>
  );
}

// Dark card from the template: fixed size, a soft glow drops in on hover and the
// button rises into the empty space. Touch screens show the button and grow to fit.
function BenefitCard({ b }: { b: (typeof benefits)[number] }) {
  const reveal = "max-h-0 translate-y-5 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:max-h-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100";
  return (
    <div className="group relative flex h-[440px] [@media(hover:none)]:h-auto [@media(hover:none)]:min-h-[340px] flex-col overflow-hidden rounded-[32px] bg-[rgba(9,16,32,0.88)] backdrop-blur-2xl">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[55%] -translate-y-[30%] opacity-50 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-70 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(230,62,139,0.22),transparent_70%),linear-gradient(160deg,rgba(53,123,216,0.22),transparent_60%)]" />
      <div className="relative flex h-full flex-col p-[clamp(20px,2vw,28px)]">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13px] text-white">
          <span className="w-2 h-2 rounded-full bg-[#00BCD4]" />
          {b.title}
        </span>
        <p className="mt-8 text-[length:clamp(28px,2.4vw,38px)] font-semibold tracking-[-0.03em] leading-[1.05]"><GradText>{b.stat}</GradText></p>
        <div className="flex-grow" />
        <p className="text-[15px] leading-relaxed text-[#DCE4F2] transition-transform duration-500 group-hover:-translate-y-1">{b.description}</p>
        <div className={reveal}>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-medium text-[#0E1B33] hover:bg-[#7FD3E6] transition-colors">
            Book a strategy call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function FitRow({ children, yes = false }: { children: ReactNode; yes?: boolean }) {
  return (
    <div className="cx-soft-shadow flex items-center gap-3 rounded-[18px] bg-white px-5 py-4">
      {yes ? <Check className="w-5 h-5 shrink-0 text-[#357BD8]" strokeWidth={2.5} /> : <X className="w-5 h-5 shrink-0 text-slate-400" strokeWidth={2.5} />}
      <span className={cn("text-[15px]", yes ? "text-[#0E1B33]" : "text-slate-400")}>{children}</span>
    </div>
  );
}

function Stair({ s, i, small = false }: { s: (typeof stairs)[number]; i: number; small?: boolean }) {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-[20px] bg-[linear-gradient(135deg,#fff,rgba(255,255,255,0.65))] cx-soft-shadow font-semibold text-[#0E1B33] px-[clamp(14px,1.6vw,26px)] py-[clamp(8px,0.9vw,14px)] text-[clamp(14px,1.2vw,18px)] whitespace-nowrap">
        <span className="text-slate-400 font-medium tabular-nums">{String(i + 1).padStart(2, "0")}</span>
        {s.title}
      </span>
      <div className={cn("relative mt-2", small && "flex gap-4")}>
        <motion.div
          className={cn("cx-grad-line w-px origin-top", small ? "min-h-[110px]" : "h-[14vw]")}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: EASE }}
        />
        <div className={cn("flex flex-col gap-3 text-left", !small && "absolute left-[1.9vw] top-[0.6vw] w-max")}>
          {s.steps.map(st => (
            <div key={st.label} className="whitespace-nowrap">
              <p className="text-[15px] font-medium text-[#0E1B33]">{st.label}</p>
              <p className="text-[13px] text-slate-500">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ---------- Live-site pieces, used by the lower half ----------

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

function LiveHead({ title, intro, light = false }: { title: string; intro?: string; light?: boolean }) {
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


// ---------- Page ----------

export default function Home() {
  const [featured, ...moreResults] = documentedResults;
  const fade = (delay: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } });

  return (
    <MotionConfig reducedMotion="user">
      <div className="font-jakarta bg-white text-[#0E1B33] antialiased overflow-x-clip">
        <ScrollProgress />
        <Header />

        {/* ===== HERO: the template's looping video, self-hosted; reduced motion gets its still frame ===== */}
        <section id="top" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#000201] bg-[url('/media/nexacore-hero.jpg')] bg-cover bg-center px-4">
          <video className="absolute inset-0 size-full object-cover motion-reduce:hidden" src="/media/nexacore-hero.mp4" poster="/media/nexacore-hero.jpg" autoPlay muted loop playsInline aria-hidden />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,transparent,#000201)]" />

          <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center pt-16">
            <motion.img {...fade(0)} src={cortexuumBrain} alt="" className="w-10 h-10 md:w-12 md:h-12 object-contain -mb-2" />
            <motion.div {...fade(0.1)}><GradText className="text-lg font-medium">Psychology-based marketing</GradText></motion.div>
            <motion.h1 {...fade(0.2)} className="text-[length:clamp(40px,6vw,88px)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
              Marketing systems proven on <GradText>$250M+</GradText> of ad spend.
            </motion.h1>
            <motion.p {...fade(0.35)} className="max-w-2xl text-[length:clamp(16px,1.3vw,20px)] leading-relaxed text-white [text-shadow:0_1px_12px_rgba(0,2,1,0.7)]">
              We study how your customers actually make decisions, then engineer every ad, funnel, and follow-up around what the data proves converts.
            </motion.p>
            <motion.div {...fade(0.5)} className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <GradButton>Book a strategy call</GradButton>
              <a href="#proof" className="text-[15px] font-medium text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white transition-colors">See the results</a>
            </motion.div>
          </div>
        </section>

        {/* ===== HOW PEOPLE THINK: the template's dark cards that unfold on hover ===== */}
        <section id="benefits" className="relative scroll-mt-24 flex flex-col items-center gap-16 md:gap-24 overflow-hidden bg-[#000201] bg-[url('/media/nexacore-glow.webp')] bg-cover bg-center px-[clamp(16px,4vw,40px)] pt-[clamp(80px,10vw,140px)] pb-[clamp(100px,12vw,160px)]">
          <div className="relative w-full max-w-[1200px]">
            <SectionHead light title="Marketing that understands" grad="how people think." intro="With over $250 million in managed ad spend and 7+ years of combined industry experience, we've seen what works and what doesn't." />
          </div>
          <div className="relative grid w-full max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="h-full"><BenefitCard b={b} /></Reveal>
            ))}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(to_bottom,transparent,#fff)]" />
        </section>

        {/* ===== FIT: no versus yes around the template's ring video ===== */}
        <section id="fit" className="flex flex-col items-center gap-10 bg-white px-[clamp(16px,3vw,40px)] py-[clamp(48px,6vw,96px)]">
          <SectionHead chip="Fit" title="Built for offers that already sell." grad="Honest about what we don't run." />
          <div className="flex w-full max-w-[1300px] flex-col items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
            <div className="order-2 flex w-full flex-col gap-3 lg:order-none">
              {fitNo.map((t, i) => <Reveal key={t} delay={i * 0.06}><FitRow>{t}</FitRow></Reveal>)}
            </div>
            <div className="order-first lg:order-none relative size-[clamp(220px,22vw,400px)] rounded-full overflow-hidden bg-[url('/media/nexacore-ring.jpg')] bg-[length:160%] bg-center">
              <video className="absolute top-1/2 left-1/2 size-[160%] -translate-x-1/2 -translate-y-1/2 object-cover motion-reduce:hidden" src="/media/nexacore-ring.mp4" autoPlay muted loop playsInline aria-hidden />
            </div>
            <div className="order-3 flex w-full flex-col gap-3 lg:order-none">
              {fitYes.map((t, i) => <Reveal key={t} delay={i * 0.06}><FitRow yes>{t}</FitRow></Reveal>)}
            </div>
          </div>
        </section>

        {/* ===== PROCESS: the delivery staircase ===== */}
        <section id="process" className="bg-white bg-[url('/media/nexacore-ribbon.webp')] bg-cover bg-center bg-no-repeat scroll-mt-24 flex flex-col items-center gap-[clamp(32px,4vw,56px)] px-[clamp(16px,4vw,60px)] pt-[clamp(48px,8vw,120px)] pb-[clamp(48px,5.5vw,80px)]">
          <SectionHead chip="90-day buildout" title="From strategy to consistent conversions" grad="in 90 days." intro="A systematic buildout engineered to create a predictable pipeline." />
          <div className="w-full max-w-[82vw]">
            <div className="relative hidden h-[32vw] w-[82vw] sm:block">
              {stairs.map((s, i) => (
                <div key={s.title} className="absolute flex flex-col items-start" style={{ left: `${s.start}vw`, bottom: `${s.bottom}vw` }}>
                  <Stair s={s} i={i} />
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-10 sm:hidden">
              {stairs.map((s, i) => (
                <div key={s.title} className="flex flex-col items-start"><Stair s={s} i={i} small /></div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== From here down: the live site's sections, in its own type ===== */}
        <div className="font-sans">
        {/* ===== STATEMENT ===== */}
        <section className="px-6 md:px-10 pt-28 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-6xl mx-auto">
            <ScrollWords
              className="font-display text-[2.1rem] sm:text-5xl lg:text-[4.3rem] font-semibold tracking-[-0.035em] leading-[1.06]"
              text="Most marketing gets judged on activity. Ours gets judged on the receipt: every ad, funnel, and follow-up built around what the data proves converts."
            />
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <LiveHead
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
                      { label: "Ad spend", value: "$4,783", amount: 4783, color: "linear-gradient(90deg, #8ED8E8, #6FB6E2)" },
                      { label: "Contracts closed", value: "$150,000", amount: 150000, color: "linear-gradient(90deg, #5BB8D9, #4C86D3 55%, #8E7CC9)" },
                    ]}
                  />
                </div>
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                  {featured.stats.map(st => (
                    <div key={st.label}>
                      <dt className="sr-only">{st.label}</dt>
                      <dd className="font-display text-2xl md:text-3xl font-bold"><CountUp value={st.value} /></dd>
                      <dd className="mt-1 text-xs md:text-sm text-white/60">{st.label}</dd>
                    </div>
                  ))}
                </dl>
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


        {/* ===== CLIENT ROSTER ===== */}
        <section id="clients" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <LiveHead title="Brands we've built the machine for" />
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
              <LiveHead title="Questions before the call" intro="The short answers. The long ones happen on the call." />
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
              <span className="text-slate-400">
                Made by{" "}
                <a href="https://plaintalk.dev" target="_blank" rel="noopener" className="text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-[#0E1B33] transition-colors">plaintalk.dev</a>
              </span>
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
      </div>
    </MotionConfig>
  );
}
