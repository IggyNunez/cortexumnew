import { motion, MotionConfig } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import christianColgate from "../assets/christian-colgate.webp";
import portfolioKalyxi from "../assets/portfolio-kalyxi.webp";
import portfolioJetts from "../assets/portfolio-jetts.webp";
import portfolioLakelucien from "../assets/portfolio-lakelucien.webp";
import Header from "@/components/Header";

const CTA_URL = "https://calendly.com/cortexuummarketing/30min";
const EASE = [0.22, 1, 0.36, 1] as const;

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

const websites = [
  { name: "Kalyxi AI", url: "kalyxi.ai", image: portfolioKalyxi, headline: "From 4-hour response times to 47 seconds." },
  { name: "Jetts Windows", url: "jettswindows.com", image: portfolioJetts, headline: "Zero online presence to 40+ leads per month. $0 ad spend." },
  { name: "Lake Lucien ASC", url: "lucienasc.com", image: portfolioLakelucien, headline: "Full surgery center website. HIPAA compliant. 3 weeks." },
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

function SilkField() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="silk-field" />
      <div className="silk-grain" />
    </div>
  );
}

function CtaButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full bg-[#0E1B33] text-white font-semibold px-7 py-4 text-[15px] hover:bg-[#357BD8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#357BD8] focus-visible:ring-offset-2 ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionHead({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-3xl mb-12 md:mb-16">
      <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] text-[#0E1B33]">{title}</h2>
      {intro && <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-2xl">{intro}</p>}
    </div>
  );
}

function LogoTile({ brand }: { brand: Brand }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl p-4 h-24 overflow-hidden border ${
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
      <div>
        <h3 className="font-display text-xl font-semibold text-[#0E1B33]">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">{note}</p>
      </div>
      <div className={`grid gap-3 ${gridClass}`}>
        {brands.map(b => <LogoTile key={b.file} brand={b} />)}
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, ...moreResults] = documentedResults;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-white text-[#0E1B33] font-sans antialiased overflow-x-hidden">
        <Header />

        {/* ===== HERO ===== */}
        <section className="relative p-2 md:p-3">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] min-h-[100svh] md:min-h-[calc(100svh-24px)] flex flex-col">
            <SilkField />

            <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-10 grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-10 items-center">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="font-display text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[6.2rem] font-bold tracking-[-0.045em]"
                >
                  Marketing systems proven on $250M+ of ad spend.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                  className="mt-7 text-lg md:text-xl text-slate-700 leading-relaxed max-w-xl"
                >
                  We study how your customers actually make decisions, then engineer every ad, funnel, and follow-up around what the data proves converts.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                  className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
                >
                  <CtaButton>Book a strategy call</CtaButton>
                  <a href="#proof" className="text-[15px] font-semibold text-[#0E1B33] underline decoration-[#357BD8]/40 underline-offset-[6px] hover:decoration-[#357BD8] transition-colors">
                    See the results
                  </a>
                </motion.div>
              </div>

              {/* Receipt: the Splash Media account, straight from the platform */}
              <motion.a
                href={featured.href}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
                whileHover={{ rotate: 0, y: -4 }}
                className="block justify-self-center lg:justify-self-end w-full max-w-[400px] rounded-[28px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_30px_80px_-20px_rgba(14,27,51,0.35)] p-7"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{featured.client}</span>
                  <span className="text-slate-500">{featured.scope}</span>
                </div>
                <p className="mt-8 font-display text-[4.2rem] leading-none font-bold tracking-[-0.04em] text-[#357BD8]">{featured.stats[0].value}</p>
                <p className="mt-2 text-slate-600">{featured.stats[0].label}</p>
                <div className="mt-8 border-t border-dashed border-slate-300 pt-5 space-y-3 text-[15px]">
                  {featured.stats.slice(1).map(s => (
                    <div key={s.label} className="flex justify-between gap-4">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="font-semibold tabular-nums">{s.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Contracts closed</span>
                    <span className="font-semibold tabular-nums">$150,000</span>
                  </div>
                </div>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#357BD8]">
                  Read the case study <ArrowUpRight className="w-4 h-4" />
                </p>
              </motion.a>
            </div>

            {/* Logo marquee */}
            {/* Multiply sits on this layer root: the logos' white drops into the field.
                Set on the imgs it would only blend inside the transformed marquee layer. */}
            <div className="relative z-10 pb-8 md:pb-10 mix-blend-multiply">
              <p className="max-w-7xl mx-auto px-6 md:px-10 mb-4 text-sm text-slate-600">Brands we've built the machine for</p>
              <div className="overflow-hidden">
                <div className="flex w-max animate-scroll-x [animation-duration:45s]">
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
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section id="services" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 self-start">
              <SectionHead
                title="What we run for you"
                intro="Every service built on psychological principles and proven performance data."
              />
            </div>
            <div>
              {services.map(s => (
                <div key={s.title} className="grid md:grid-cols-[220px_1fr] gap-3 md:gap-10 py-8 border-t border-slate-200 first:border-t-0 first:pt-0">
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{s.description}</p>
                </div>
              ))}

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                <div className="rounded-3xl bg-[#EAF6F1] p-7">
                  <h3 className="flex items-center gap-2 font-semibold"><Check className="w-4 h-4 text-emerald-700" /> Where we're the right call</h3>
                  <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                    Info products of every shape: courses, coaching, communities, events, and paid newsletters, plus DTC ecommerce. Offers already closing on phone or checkout that need more qualified volume at the&nbsp;top.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#F3F6FB] p-7">
                  <h3 className="flex items-center gap-2 font-semibold"><Minus className="w-4 h-4 text-slate-500" /> Where we're not</h3>
                  <p className="mt-3 text-[15px] text-slate-700 leading-relaxed">
                    Amazon advertising and standalone email marketing. We would rather hand those back than run them badly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== RESULTS ===== */}
        <section id="proof" className="scroll-mt-24 px-6 md:px-10 pb-24 md:pb-36">
          <div className="max-w-7xl mx-auto">
            <SectionHead
              title="The receipts, not the promises"
              intro="Real accounts, real spend, real return. Platform-reported figures, unaltered. Client names withheld where the engagement is under confidentiality."
            />

            <a href={featured.href} className="group block rounded-[32px] bg-[#0E1B33] text-white p-8 md:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
              <div>
                <p className="text-sm text-white/60">{featured.client}, {featured.scope.toLowerCase()}</p>
                <h3 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.02]">{featured.headline}</h3>
                <p className="mt-5 text-white/70 leading-relaxed max-w-xl">{featured.detail}</p>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#7FD3E6] group-hover:gap-2.5 transition-all">
                  Read the full case study <ArrowUpRight className="w-4 h-4" />
                </p>
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
                {featured.stats.map(s => (
                  <div key={s.label} className="lg:flex lg:items-baseline lg:justify-between lg:border-b lg:border-white/15 lg:pb-4">
                    <p className="font-display text-2xl md:text-4xl font-bold tabular-nums">{s.value}</p>
                    <p className="mt-1 text-xs md:text-sm text-white/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </a>

            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {moreResults.map(r => (
                <article key={r.headline} className="rounded-[32px] bg-[#F3F6FB] p-8 flex flex-col">
                  <p className="text-sm text-slate-500">{r.scope}</p>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] leading-[1.1]">{r.headline}</h3>
                  <p className="mt-4 text-[15px] text-slate-600 leading-relaxed flex-1">{r.detail}</p>
                  <dl className="mt-8 space-y-2.5 border-t border-dashed border-slate-300 pt-5 text-[15px]">
                    {r.stats.map(s => (
                      <div key={s.label} className="flex justify-between gap-4">
                        <dt className="text-slate-500">{s.label}</dt>
                        <dd className="font-semibold tabular-nums">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-xs text-slate-400">{r.client}</p>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-500 max-w-2xl">
              A large share of the work sits under confidentiality with agency partners and their clients. Those accounts, screenshots, and numbers can be walked through live, one to one.
            </p>
          </div>
        </section>

        {/* ===== WHY IT WORKS ===== */}
        <section id="benefits" className="scroll-mt-24 px-6 md:px-10 pb-24 md:pb-36">
          <div className="max-w-7xl mx-auto">
            <SectionHead title="Marketing that understands how people think" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {benefits.map(b => (
                <div key={b.title} className="border-t-2 border-[#0E1B33] pt-6">
                  <p className="font-display text-2xl font-bold tracking-[-0.02em] text-[#357BD8]">{b.stat}</p>
                  <h3 className="mt-3 font-semibold">{b.title}</h3>
                  <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLIENT ROSTER ===== */}
        <section id="clients" className="scroll-mt-24 bg-[#F3F6FB] px-6 md:px-10 py-24 md:py-32">
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
        <section id="founder" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-md bg-[#F3F6FB]">
              <img src={christianColgate} alt="Christian Colgate, CEO and founder of Cortexuum" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">Christian Colgate</h2>
              <p className="mt-3 text-lg text-slate-500">CEO and founder</p>
              <div className="mt-8 space-y-5 text-lg text-slate-700 leading-relaxed max-w-2xl">
                <p>Christian leads the paid media division at Cortexuum, scaling brands across Meta, Google, and TikTok.</p>
                <p>He founded and scaled multiple six-figure organizations and played a central role in building the eCommerce department of a leading performance marketing agency from the ground&nbsp;up.</p>
                <p>He has managed the systems and marketing behind Alex Hormozi's portfolio, Gary Brecka's brands, and a roster of household names across MMA, music, real estate, and entertainment held under NDA. Those engagements are reviewed live rather than printed&nbsp;here.</p>
              </div>
              <dl className="mt-12 grid sm:grid-cols-3 gap-8">
                {founderStats.map(s => (
                  <div key={s.label}>
                    <dt className="font-display text-4xl font-bold tracking-[-0.03em]">{s.value}</dt>
                    <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-4">The team behind the work, in years</p>
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {teamExpertise.map(t => (
                    <div key={t.area}>
                      <dt className="font-display text-2xl font-bold">{t.years}</dt>
                      <dd className="text-sm text-slate-600">{t.area}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section id="process" className="scroll-mt-24 bg-[#0E1B33] text-white px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-14">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1]">From strategy to consistent conversions in 90 days</h2>
              <p className="mt-5 text-lg text-white/65">A systematic buildout engineered to create a predictable pipeline.</p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-[28px] overflow-hidden">
              {funnelSteps.map((s, i) => (
                <li key={s.label} className="bg-[#0E1B33] p-7 md:p-8">
                  <span className="font-display text-sm text-[#7FD3E6] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{s.label}</h3>
                  <p className="mt-2 text-[15px] text-white/60">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== WEBSITES ===== */}
        <section id="work" className="scroll-mt-24 px-6 md:px-10 py-24 md:py-36">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] max-w-2xl">Websites we've shipped</h2>
              <a href="/services/websites" className="inline-flex items-center gap-1.5 font-semibold text-[#357BD8] hover:text-[#0E1B33] transition-colors">
                View the portfolio <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {websites.map(w => (
                <a key={w.name} href="/services/websites" className="group block">
                  <div className="rounded-[28px] overflow-hidden bg-[#F3F6FB] aspect-[16/10]">
                    <img src={w.image} alt={`${w.name} website`} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{w.name}</h3>
                  <p className="mt-1 text-slate-600">{w.headline}</p>
                  <p className="mt-2 text-sm text-slate-400">{w.url}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BOOK A CALL ===== */}
        <section id="contact" className="scroll-mt-24 p-2 md:p-3">
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px]">
            <SilkField />
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
              <div>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.95]">
                  Ready to see what proven marketing systems can do?
                </h2>
                <p className="mt-6 text-lg text-slate-700 max-w-xl">Book a free 30-minute strategy call. No obligations, just real insights for your business.</p>
                <CtaButton className="mt-9">Book a strategy call</CtaButton>
              </div>
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
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="px-6 md:px-10 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-3">
              <img src={cortexuumLogoCircle} alt="" className="w-8 h-8 rounded-full ring-1 ring-slate-200" />
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
        </footer>
      </div>
    </MotionConfig>
  );
}
