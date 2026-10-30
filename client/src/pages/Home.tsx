import { useRef, type ReactNode } from "react";
import { motion, MotionConfig, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import christianColgate from "../assets/christian-colgate.webp";
import cortexuumBrain from "../assets/cortexuum-brain.png";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CountUp, EASE, HorizontalScroll, Magnetic, MaskLines, Reveal, ScaleBars, ScrollProgress } from "@/components/motion";

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


// ---------- Arcline-style building blocks ----------

// Big thin arcs fixed behind every panel.
function Arcs() {
  return (
    <svg aria-hidden className="pointer-events-none fixed inset-0 -z-10 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke="#fff" strokeWidth="1.2">
        <circle cx="1220" cy="1010" r="640" strokeOpacity=".8" />
        <circle cx="160" cy="-220" r="600" strokeOpacity=".8" />
        <circle cx="760" cy="560" r="980" strokeOpacity=".4" />
      </g>
    </svg>
  );
}

function Panel({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  const mark = dark ? "text-white/40" : "text-slate-400";
  return (
    <div className={`relative rounded-[22px] md:rounded-[28px] shadow-[0_30px_80px_-40px_rgba(14,27,51,0.35)] ${dark ? "bg-[#0E1B33] text-white" : "bg-white/90 backdrop-blur"} ${className}`}>
      <Plus aria-hidden className={`absolute top-4 right-4 w-3.5 h-3.5 ${mark}`} strokeWidth={1.5} />
      <Plus aria-hidden className={`absolute bottom-4 left-4 w-3.5 h-3.5 ${mark}`} strokeWidth={1.5} />
      {children}
    </div>
  );
}

// Pearl sphere holding the brain mark.
function Sphere({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`arc-sphere rounded-full flex items-center justify-center ${className}`}>
      <img src={cortexuumBrain} alt="" className="w-[64%] translate-y-[2%]" />
    </div>
  );
}

function Floating({ children, className = "", distance = 120 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>{children}</motion.div>;
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-3 md:px-6 mt-20 md:mt-32 ${className}`}>
      <div className="max-w-[1400px] mx-auto">{children}</div>
    </section>
  );
}

const H2 = "font-geist font-medium tracking-[-0.055em] leading-[0.95] text-[2.8rem] sm:text-6xl lg:text-[6.2rem]";

function CtaButton({ children, className = "", tone = "navy" }: { children: ReactNode; className?: string; tone?: "navy" | "white" }) {
  const colors = tone === "white" ? "bg-white text-[#0E1B33] hover:bg-[#7FD3E6]" : "bg-[#0E1B33] text-white hover:bg-[#357BD8]";
  return (
    <Magnetic className={className}>
      <a
        href={CTA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-full font-medium px-6 py-3.5 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#357BD8] focus-visible:ring-offset-2 ${colors}`}
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </Magnetic>
  );
}

function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <a href={href} className={`text-sm font-medium underline underline-offset-[6px] transition-colors ${light ? "text-white decoration-white/40 hover:decoration-white" : "text-[#0E1B33] decoration-[#0E1B33]/30 hover:decoration-[#0E1B33]"}`}>
      {children}
    </a>
  );
}

// Round marks set inline in a headline, the way Arcline sets round photos into its type.
function InlineMark({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex align-middle w-[0.95em] h-[0.95em] mx-[0.08em] rounded-full overflow-hidden -translate-y-[0.04em] shadow-[0_8px_20px_-8px_rgba(14,27,51,0.45)]">
      {children}
    </span>
  );
}

function LogoTile({ brand }: { brand: Brand }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl p-4 h-24 overflow-hidden border transition-transform duration-500 hover:-translate-y-1 ${brand.dark ? "bg-[#111111] border-[#111111]" : "bg-white border-slate-200"}`}>
      <img src={`/logos/${brand.file}.png`} alt={brand.name} loading="lazy" className="max-h-full max-w-full object-contain" />
    </div>
  );
}

function RosterGroup({ title, note, brands, gridClass }: { title: string; note: string; brands: Brand[]; gridClass: string }) {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-12 py-10 border-t border-slate-200">
      <Reveal>
        <h3 className="font-geist text-xl font-medium tracking-[-0.02em]">{title}</h3>
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

// ---------- Sections ----------

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const after = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } });

  return (
    <section ref={ref} id="top" className="relative px-3 md:px-6 pt-24 md:pt-28">
      <div className="relative max-w-[1400px] mx-auto overflow-hidden rounded-[22px] md:rounded-[28px] bg-[#0E1B33] text-white min-h-[calc(100svh-7.5rem)] flex flex-col justify-between shadow-[0_40px_100px_-40px_rgba(14,27,51,0.6)]">
        {/* Left half: the brand colors as light on navy, where Arcline uses a photo */}
        <motion.div aria-hidden className="arc-glow absolute inset-0 lg:right-1/2" style={reduce ? undefined : { scale: glow }} />
        <div aria-hidden className="hidden lg:block absolute inset-y-0 left-1/2 w-px bg-white/10" />
        <svg aria-hidden className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="none">
          <circle cx="700" cy="420" r="430" fill="none" stroke="#fff" strokeOpacity=".14" />
        </svg>
        <Plus aria-hidden className="absolute top-4 right-4 w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />
        <Plus aria-hidden className="absolute bottom-4 left-4 w-3.5 h-3.5 text-white/40" strokeWidth={1.5} />

        <motion.div
          className="absolute right-[6%] top-[10%] md:right-[8%] md:top-auto md:bottom-[38%]"
          style={reduce ? undefined : { y: sphereY }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          <Sphere className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40" />
        </motion.div>

        <h1 className="relative z-10 px-6 md:px-12 pt-24 md:pt-24 font-geist font-medium tracking-[-0.06em] leading-[0.92] text-[3.2rem] sm:text-7xl lg:text-[6.2rem] xl:text-[7.2rem] lg:whitespace-nowrap">
          <MaskLines
            lines={["Marketing systems", "proven on $250M+", "of ad spend."]}
            className="block lg:[&>span:nth-child(2)]:pl-[18%] lg:[&>span:nth-child(3)]:pl-[8%]"
          />
        </h1>

        <div className="relative z-10 px-6 md:px-12 pb-10 md:pb-12 pt-12 lg:ml-[50%] max-w-xl">
          <motion.p {...after(0.6)} className="text-lg md:text-xl leading-snug text-white/90">
            We study how your customers actually make decisions, then engineer every ad, funnel, and follow-up around what the data proves converts.
          </motion.p>
          <motion.div {...after(0.75)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaButton tone="white">Book a strategy call</CtaButton>
            <TextLink href="#proof" light>See the results</TextLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GiantWords({ words }: { words: string[] }) {
  return (
    <Panel className="overflow-hidden px-6 md:px-10 py-10 md:py-14">
      <p aria-label={words.join(" ")} className="flex flex-col lg:flex-row lg:justify-between font-geist font-medium tracking-[-0.06em] leading-[0.95] text-[19vw] sm:text-[15vw] lg:text-[7.8vw] 2xl:text-[7rem]">
        {words.map((w, i) => (
          <span key={w} aria-hidden className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, delay: i * 0.15, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </p>
    </Panel>
  );
}

// ---------- Page ----------

export default function Home() {
  const [featured, ...moreResults] = documentedResults;
  const orbit = ["lg:left-0 lg:top-[6%]", "lg:right-0 lg:top-[12%]", "lg:left-[2%] lg:bottom-[8%]", "lg:right-0 lg:bottom-[4%]"];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen bg-[#eaf1fb] text-[#0E1B33] font-sans antialiased overflow-x-clip pb-6">
        <div aria-hidden className="fixed inset-0 -z-20 overflow-hidden"><div className="silk-field" /></div>
        <Arcs />
        <ScrollProgress />
        <Header />
        <Hero />

        {/* ===== RECEIPTS STATEMENT (Arcline's "Only forward") ===== */}
        <Section>
          <div className="relative">
            <div aria-hidden className="hidden lg:block absolute right-0 top-20 bottom-24 w-[24%] rounded-[28px] bg-[#0E1B33]" />
            <Floating className="hidden lg:block absolute right-[14%] top-[34%] z-10" distance={90}>
              <Sphere className="w-64 h-64 xl:w-80 xl:h-80" />
            </Floating>
            <Panel className="lg:mr-[20%] p-6 md:p-12 min-h-[560px] flex flex-col">
              <Reveal>
                <h2 className={H2}>Receipts, not promises</h2>
              </Reveal>
              <Reveal delay={0.1} className="my-10 md:my-12 self-center">
                <img src={christianColgate} alt="Christian Colgate" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover object-top" />
              </Reveal>
              <div className="mt-auto grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl text-[15px] leading-relaxed text-slate-700">
                <Reveal>
                  <p>Most marketing gets judged on activity. Ours gets judged on the receipt: every ad, funnel, and follow-up built around what the data proves converts.</p>
                  <div className="mt-5"><TextLink href="#proof">See the results</TextLink></div>
                </Reveal>
                <Reveal delay={0.08}>
                  <p>Real accounts, real spend, real return. Platform-reported figures, unaltered. Client names withheld where the engagement is under confidentiality.</p>
                </Reveal>
              </div>
              <dl className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                {proofStrip.map((s, i) => (
                  <Reveal key={s.label} delay={i * 0.06}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-geist font-medium text-4xl md:text-5xl tracking-[-0.05em]"><CountUp value={s.value} /></dd>
                    <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
                  </Reveal>
                ))}
              </dl>
            </Panel>
          </div>
        </Section>

        {/* ===== METHOD / PROCESS ===== */}
        <Section id="process">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-3">
            <Panel className="silk-tile p-6 md:p-10">
              <Floating distance={40} className="mb-10">
                <Sphere className="w-24 h-24 md:w-32 md:h-32" />
              </Floating>
              <ol className="space-y-7">
                {phases.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <li className="grid grid-cols-[2.5rem_1fr] gap-2">
                      <span className="text-sm text-slate-400 tabular-nums pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-geist font-medium text-2xl tracking-[-0.03em]">{p.title}</h3>
                        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                          {p.steps.map(s => `${s.label}: ${s.desc.toLowerCase()}.`).join(" ")}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </Panel>
            <Panel className="p-6 md:p-12 flex flex-col justify-between gap-12">
              <Reveal>
                <h2 className="font-geist font-medium tracking-[-0.055em] leading-[1] text-[2.6rem] sm:text-6xl lg:text-[5.2rem]">
                  Strategy <InlineMark><Sphere className="w-full h-full" /></InlineMark> to steady conversions <InlineMark><img src={christianColgate} alt="" className="w-full h-full object-cover object-top" /></InlineMark> in 90 days
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <p className="max-w-md text-[15px] leading-relaxed text-slate-700">A systematic buildout engineered to create a predictable pipeline. Eight steps, from the first idea to the closed sale, each one measured.</p>
                <CtaButton>Book a strategy call</CtaButton>
              </Reveal>
            </Panel>
          </div>
        </Section>

        <Section>
          <GiantWords words={["Capture.", "Nurture.", "Convert."]} />
        </Section>

        {/* ===== SERVICES BENTO ===== */}
        <Section id="services">
          <Panel className="p-4 md:p-6">
            <div className="grid lg:grid-cols-2 gap-6 p-2 md:p-6 pb-10 md:pb-14">
              <Reveal><h2 className={H2}>What we run for you</h2></Reveal>
              <Reveal delay={0.1} className="lg:self-end lg:justify-self-end max-w-md text-[15px] leading-relaxed text-slate-700">
                <p>Every service built on psychological principles and proven performance data. Take one, or let us run the whole system.</p>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-4 md:auto-rows-[230px] gap-3">
              {services.map((s, i) => {
                const look = [
                  "md:col-span-2 md:row-span-2 bg-[#0E1B33] text-white arc-glow-tile",
                  "silk-tile",
                  "silk-tile-2",
                  "md:col-span-2 silk-tile",
                  "bg-white border border-slate-200",
                ][i];
                const big = i === 0;
                return (
                  <Reveal key={s.title} delay={i * 0.05} className={`relative overflow-hidden rounded-[20px] p-6 flex flex-col justify-between ${look}`}>
                    <h3 className={`relative font-geist font-medium tracking-[-0.04em] ${big ? "text-4xl md:text-6xl" : "text-2xl"}`}>{s.title}</h3>
                    <p className={`relative text-sm leading-relaxed ${big ? "text-white/75 max-w-sm md:text-base" : "text-slate-600"}`}>{s.description}</p>
                  </Reveal>
                );
              })}
              <Reveal delay={0.25} className="md:col-span-2 rounded-[20px] bg-[#EAF6F1] p-6 flex flex-col justify-between">
                <h3 className="flex items-center gap-2 font-geist font-medium text-xl tracking-[-0.02em]"><Check className="w-4 h-4 text-emerald-700" /> Where we're the right call</h3>
                <p className="text-sm text-slate-700 leading-relaxed">Info products of every shape: courses, coaching, communities, events, and paid newsletters, plus DTC ecommerce. Offers already closing on phone or checkout that need more qualified volume at the&nbsp;top.</p>
              </Reveal>
              <Reveal delay={0.3} className="rounded-[20px] silk-tile-2 p-6 flex flex-col justify-between">
                <h3 className="flex items-center gap-2 font-geist font-medium text-xl tracking-[-0.02em]"><Minus className="w-4 h-4 text-slate-500" /> Where we're not</h3>
                <p className="text-sm text-slate-700 leading-relaxed">Amazon advertising and standalone email marketing. We would rather hand those back than run them badly.</p>
              </Reveal>
            </div>
          </Panel>
        </Section>

        {/* ===== FOUNDER (Arcline's coaches) ===== */}
        <Section id="founder">
          <Panel className="p-6 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <Reveal>
                <h2 className={H2}>Christian Colgate</h2>
                <p className="mt-4 text-lg text-slate-500">CEO and founder</p>
              </Reveal>
              <Reveal delay={0.1} className="space-y-4 text-[15px] leading-relaxed text-slate-700 max-w-xl lg:pt-4">
                <p>Christian leads the paid media division at Cortexuum, scaling brands across Meta, Google, and TikTok.</p>
                <p>He founded and scaled multiple six-figure organizations and played a central role in building the eCommerce department of a leading performance marketing agency from the ground&nbsp;up.</p>
                <p>He has managed the systems and marketing behind Alex Hormozi's portfolio, Gary Brecka's brands, and a roster of household names across MMA, music, real estate, and entertainment held under NDA. Those engagements are reviewed live rather than printed&nbsp;here.</p>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
              <Reveal className="col-span-2 lg:col-span-1">
                <div className="aspect-[4/5] rounded-[18px] overflow-hidden silk-tile">
                  <img src={christianColgate} alt="Christian Colgate, CEO and founder of Cortexuum" className="w-full h-full object-cover object-top" />
                </div>
                <p className="mt-3 font-geist font-medium text-lg tracking-[-0.02em]">Christian Colgate</p>
                <p className="text-xs text-slate-500">CEO and founder · paid media</p>
              </Reveal>
              {founderStats.map((s, i) => (
                <Reveal key={s.label} delay={0.08 * (i + 1)} className={["lg:mt-24", "lg:mt-8", "lg:mt-36"][i]}>
                  <div className="aspect-[4/5] rounded-[18px] bg-[#0E1B33] text-white p-5 flex flex-col justify-end arc-glow-tile relative overflow-hidden">
                    <p className="relative font-geist font-medium text-4xl md:text-5xl tracking-[-0.05em]"><CountUp value={s.value} /></p>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{s.label}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">The team behind the work, in years</p>
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {teamExpertise.map(t => (
                  <div key={t.area}>
                    <dt className="font-geist font-medium text-3xl tracking-[-0.04em]"><CountUp value={t.years} /></dt>
                    <dd className="text-sm text-slate-600">{t.area}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Panel>
        </Section>

        {/* ===== HOW PEOPLE THINK (Arcline's "What the lab sees") ===== */}
        <Section id="benefits">
          <Panel dark className="overflow-hidden p-6 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Reveal>
                  <h2 className="font-geist font-medium tracking-[-0.055em] leading-[0.95] text-[2.6rem] sm:text-6xl lg:text-[5rem]">Marketing that understands how people think</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-6 text-lg text-white/80 max-w-lg">With over $250 million in managed ad spend and 7+ years of combined industry experience, we've seen what works and what doesn't.</p>
                </Reveal>
                <dl className="mt-10 space-y-5 max-w-lg">
                  {benefits.map((b, i) => (
                    <Reveal key={b.title} delay={0.05 * i}>
                      <dt className="font-medium">{b.title}</dt>
                      <dd className="mt-1 text-sm text-white/60 leading-relaxed">{b.description}</dd>
                    </Reveal>
                  ))}
                </dl>
                <div className="mt-8"><TextLink href={CTA_URL} light>Book a strategy call</TextLink></div>
              </div>

              <div className="relative mx-auto w-full max-w-[540px] lg:aspect-square">
                <div aria-hidden className="hidden lg:block absolute inset-[14%] rounded-full border border-white/15" />
                <Floating distance={30} className="relative mx-auto w-[46%] min-w-[160px] lg:absolute lg:inset-0 lg:m-auto lg:h-[46%] aspect-square">
                  <Sphere className="w-full h-full" />
                </Floating>
                <ul className="mt-10 lg:mt-0 grid grid-cols-2 gap-6 lg:block">
                  {benefits.map((b, i) => (
                    <li key={b.title} className={`lg:absolute lg:w-[34%] ${orbit[i]}`}>
                      <p className="font-geist font-medium text-xl text-[#7FD3E6] tracking-[-0.02em]">{b.stat}</p>
                      <p className="text-xs text-white/60">{b.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </Section>

        {/* ===== RESULTS: sideways row (Arcline's week cards) ===== */}
        <section id="proof" className="relative scroll-mt-24 mt-20 md:mt-32">
          <HorizontalScroll
            header={
              <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 mb-10 grid lg:grid-cols-2 gap-6 lg:items-end">
                <h2 className={H2}>The receipts</h2>
                <p className="lg:justify-self-end max-w-md text-[15px] leading-relaxed text-slate-700">Real accounts, real spend, real return. A large share of the work sits under confidentiality, and those accounts are walked through live, one to one.</p>
              </div>
            }
          >
            <Panel dark className="md:col-span-2 lg:w-[680px] lg:flex-none p-8 md:p-10">
              <a href={featured.href} className="group flex flex-col h-full">
                <p className="text-sm text-white/60">{featured.client} · {featured.scope}</p>
                <h3 className="mt-4 font-geist font-medium text-3xl md:text-[2.5rem] tracking-[-0.04em] leading-[1.05]">{featured.headline}</h3>
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
                <p className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[#7FD3E6] group-hover:gap-2.5 transition-all">
                  Read the full case study <ArrowUpRight className="w-4 h-4" />
                </p>
              </a>
            </Panel>
            {moreResults.map(r => (
              <Panel key={r.headline} className="lg:w-[400px] lg:flex-none p-8 flex flex-col">
                <p className="text-sm text-slate-500 pr-6">{r.scope}</p>
                <p className="mt-6 font-geist font-medium text-6xl tracking-[-0.05em] text-[#357BD8]"><CountUp value={r.stats[0].value} /></p>
                <p className="mt-1 text-sm text-slate-500">{r.stats[0].label}</p>
                <h3 className="mt-6 font-geist font-medium text-2xl tracking-[-0.03em] leading-[1.15]">{r.headline}</h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed flex-1">{r.detail}</p>
                <dl className="mt-6 space-y-2.5 border-t border-dashed border-slate-300 pt-5 text-[15px]">
                  {r.stats.slice(1).map(s => (
                    <div key={s.label} className="flex justify-between gap-4">
                      <dt className="text-slate-500">{s.label}</dt>
                      <dd className="font-medium"><CountUp value={s.value} /></dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 pl-6 text-xs text-slate-400">{r.client}</p>
              </Panel>
            ))}
            <Panel className="md:col-span-2 lg:w-[360px] lg:flex-none p-8 flex flex-col justify-between gap-8 bg-white/60">
              <p className="font-geist font-medium text-3xl tracking-[-0.04em] leading-[1.1]">More accounts sit under NDA.</p>
              <div>
                <p className="text-slate-600 leading-relaxed">Those screenshots and numbers get walked through live, one to one.</p>
                <CtaButton className="mt-6">See them on a call</CtaButton>
              </div>
            </Panel>
          </HorizontalScroll>
        </section>

        {/* ===== CLIENT ROSTER ===== */}
        <Section id="clients">
          <Panel className="p-6 md:p-12">
            <Reveal className="pb-10"><h2 className={H2}>Brands we've built the machine for</h2></Reveal>
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
          </Panel>
        </Section>

        {/* ===== FAQ ===== */}
        <Section id="faq">
          <Panel className="p-6 md:p-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 overflow-hidden">
            <div className="flex flex-col justify-between gap-10">
              <Reveal>
                <h2 className="font-geist font-medium tracking-[-0.055em] leading-[0.95] text-[2.6rem] sm:text-6xl">Questions before the call</h2>
                <p className="mt-5 text-[15px] text-slate-600 max-w-sm">The short answers. The long ones happen on the call.</p>
              </Reveal>
              <Floating distance={40} className="hidden lg:block">
                <Sphere className="w-28 h-28" />
              </Floating>
            </div>
            <Reveal>
              <Accordion type="single" collapsible className="border-t border-slate-200">
                {faqs.map(f => (
                  <AccordionItem key={f.q} value={f.q} className="border-slate-200">
                    <AccordionTrigger className="py-5 text-left font-geist text-lg md:text-xl font-medium tracking-[-0.02em] hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="pb-5 text-[15px] text-slate-600 leading-relaxed max-w-2xl">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Panel>
        </Section>

        {/* ===== BOOK A CALL ===== */}
        <Section id="contact">
          <Panel className="p-6 md:p-12">
            <Reveal>
              <h2 className={`${H2} text-right pb-6 border-b border-slate-200`}>Book a strategy call</h2>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-[1fr_1.2fr_1fr] gap-10 items-start">
              <div>
                <p className="text-xs text-slate-500">The call</p>
                <p className="mt-2 font-geist font-medium text-2xl tracking-[-0.03em] leading-tight">Free, 30 minutes, booked straight on Calendly</p>
                <p className="mt-3 text-[15px] text-slate-600">No obligations, just real insights for your business.</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">What happens next</p>
                <ol className="mt-3 space-y-3">
                  {nextSteps.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[15px] text-slate-700">
                      <span className="text-slate-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="md:justify-self-end">
                <CtaButton>Book a strategy call</CtaButton>
              </div>
            </div>
          </Panel>
        </Section>

        {/* ===== FOOTER ===== */}
        <footer className="relative px-3 md:px-6 mt-20 md:mt-28">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-slate-600 px-3">
              <div className="flex items-center gap-3">
                <img src={cortexuumBrain} alt="" className="w-7 h-7 object-contain" />
                <span className="font-medium text-[#0E1B33]">Cortexuum</span>
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
              className="mt-10 font-geist font-medium text-[#0E1B33] text-[19vw] leading-[0.8] tracking-[-0.07em] text-center select-none"
            >
              Cortexuum
            </motion.p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
