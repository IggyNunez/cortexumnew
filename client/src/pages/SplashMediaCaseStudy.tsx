import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Search,
  FileText,
  Check,
  Shield,
} from "lucide-react";
import { Link } from "wouter";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import DesignerFooter from "@/components/DesignerFooter";

// The shared Header's nav is homepage hash anchors, which dead-end on a
// sub-route, so case study pages carry their own minimal header instead.
function CaseStudyHeader() {
  return (
    <header className="fixed top-3 md:top-5 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200 shadow-lg shadow-slate-200/50 py-2 pl-4 pr-2 md:pl-6 md:pr-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src={cortexuumLogoCircle} alt="Cortexuum" className="w-9 h-9 rounded-full ring-1 ring-[#357BD8]/20" />
            <span className="font-extrabold tracking-[0.2em] text-sm uppercase text-slate-800 hidden sm:block">
              Cortexuum
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/#proof" className="text-slate-600 hover:text-[#357BD8] text-sm font-medium transition-colors hidden sm:block">
              All results
            </Link>
            <a
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#357BD8] text-white font-bold px-5 py-2.5 rounded-full text-sm hover:bg-[#2d6bc0] transition-colors"
            >
              Book a Call <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const headlineStats = [
  { value: "$4,783", label: "Total ad spend", icon: DollarSign },
  { value: "~$150K", label: "Contract value closed", icon: TrendingUp },
  { value: "34.89x", label: "Return on ad spend", icon: Target },
  { value: "$97.52", label: "Cost per lead at scale", icon: Users },
];

// Week-by-week figures as reported in the account. Revenue is cash collected in
// month one; the ~$150K total is contract value signed on 12-month minimums.
const weekByWeek = [
  { period: "Week 1", spend: "$473.53", leads: "0", cpl: "—", revenue: "$0", note: "Warm-up, creative rebuilt" },
  { period: "Week 2", spend: "$681.23", leads: "2", cpl: "$340.62", revenue: "$0", note: "Page identified as bottleneck" },
  { period: "Week 3", spend: "$1,315.66", leads: "7", cpl: "$187.95", revenue: "$4,000", note: "3.04x" },
  { period: "Weeks 4-5", spend: "$1,950.45", leads: "20", cpl: "$97.52", revenue: "$9,500 collected", note: "4.87x" },
];

const whatWeDid = [
  {
    title: "Customer & Competitor Research",
    description: "Lifetime demographic, analytics, and social data pulled apart to find who actually buys and what they respond to, before a dollar moved.",
    icon: Search,
  },
  {
    title: "Direct-Response Copy",
    description: "Ad copy written to qualify, not just to attract. The goal was booked calls with buyers, not cheap clicks from tire-kickers.",
    icon: FileText,
  },
  {
    title: "Creative Iteration & Hook Testing",
    description: "Week 1 produced zero sales. We rebuilt the creative around new hooks rather than pushing more budget at a losing angle.",
    icon: Target,
  },
  {
    title: "Landing Page Rebuild & VSL",
    description: "Ad metrics were healthy while conversion was dead, which pointed at the page, not the traffic. We scripted and shipped a new VSL page.",
    icon: TrendingUp,
  },
  {
    title: "Placement Pruning",
    description: "Systematically cut the placements burning budget without producing qualified conversations, concentrating spend on what converted.",
    icon: Shield,
  },
  {
    title: "Email Remarketing",
    description: "Leads that did not close on the first call were worked through follow-up sequences instead of being left to go cold.",
    icon: Users,
  },
];

export default function SplashMediaCaseStudy() {
  useEffect(() => {
    document.title = "Splash Media Case Study: 34.89x ROAS | Cortexuum";

    const metaTags: Record<string, string> = {
      description:
        "How Cortexuum turned $4,783 in Meta ad spend into roughly $150,000 in signed contracts for a content agency that had never run paid ads. 34.89x ROAS at $97.52 cost per lead.",
      "og:title": "Splash Media Case Study: 34.89x ROAS | Cortexuum",
      "og:description":
        "$4,783 in ad spend into ~$150K in contracts on a $100/day budget. The full week-by-week breakdown.",
      "og:url": "https://cortexuum.com/case-study/splash-media",
      "og:type": "article",
      "twitter:title": "Splash Media Case Study: 34.89x ROAS | Cortexuum",
      "twitter:description":
        "$4,783 in ad spend into ~$150K in contracts on a $100/day budget.",
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
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 min-h-screen">
      <CaseStudyHeader />

      {/* ===== HERO ===== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#357BD8]/[0.07] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E63E8B]/[0.05] rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center">
            <motion.div variants={fadeUp}>
              <a
                href="/#proof"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-[#357BD8] text-sm font-medium mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> All documented results
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#357BD8]/20 rounded-full px-5 py-2 mb-6"
            >
              <Target className="w-3.5 h-3.5 text-[#357BD8]" />
              <span className="text-sm font-semibold text-[#357BD8]">Case Study: Content Agency, Meta</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight text-slate-800"
            >
              $150,000 in contracts
              <br />
              on a{" "}
              <span className="bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B] bg-clip-text text-transparent">
                $100/day budget.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed">
              Splash Media sells $4,000 to $5,000 per month retainers on 12-month minimum contracts. High-ticket,
              phone-closed, and they had never run paid ads. Booked calls were the only metric that mattered.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {headlineStats.map((stat, i) => (
                <div
                  key={i}
                  className="relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm overflow-hidden group hover:shadow-lg hover:border-[#357BD8]/20 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] to-[#00BCD4]" />
                  <stat.icon className="w-5 h-5 text-[#357BD8] mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black bg-gradient-to-b from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs leading-snug">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WENT ===== */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-transparent" />
              <h2 className="text-xl font-black text-slate-800 mb-4">How it went</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Week 1 warm-up produced zero sales on $473 in spend. We rebuilt creative around new hooks, then
                diagnosed the real bottleneck as the landing page: healthy ad metrics, dead conversion.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We shipped a new VSL page. Week 3 returned the first close at 3.04x. By weeks 4 and 5 the account ran
                4.87x average ROAS at $97.52 cost per lead with consistent lead flow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E63E8B] via-[#F5841F] to-transparent" />
              <h2 className="text-xl font-black text-slate-800 mb-4">The constraint was never the traffic</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most accounts that stall get more budget thrown at them. This one had healthy click-through and cost
                per click from week 2, which meant the ads were doing their job and the page was not.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Finding that early is the difference between a $4,783 test that returns $150,000 and a $50,000 spend
                that returns nothing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== WEEK BY WEEK TABLE ===== */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[320px] h-[320px] bg-[#00BCD4]/[0.05] rounded-full blur-[110px]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-[#357BD8] font-mono text-xs tracking-[0.3em] uppercase mb-4">The Numbers</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800">Week by week.</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B]" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    {["Period", "Ad spend", "Leads", "Cost per lead", "Revenue", "ROAS"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weekByWeek.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800 whitespace-nowrap">{row.period}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{row.spend}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{row.leads}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{row.cpl}</td>
                      <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{row.revenue}</td>
                      <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">{row.note}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50">
                    <td className="px-5 py-4 text-sm font-black text-slate-800 whitespace-nowrap">Total</td>
                    <td className="px-5 py-4 text-sm font-black text-slate-800 whitespace-nowrap">$4,783</td>
                    <td className="px-5 py-4 text-sm font-black text-slate-800 whitespace-nowrap">29</td>
                    <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">—</td>
                    <td className="px-5 py-4 text-sm font-black text-slate-800 whitespace-nowrap">~$150K contracted</td>
                    <td className="px-5 py-4 text-sm font-black bg-gradient-to-r from-[#357BD8] to-[#E63E8B] bg-clip-text text-transparent whitespace-nowrap">
                      34.89x
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          <p className="text-slate-400 text-xs text-center mt-5 max-w-2xl mx-auto">
            Revenue reflects cash collected in month one. The ~$150K figure is total contract value signed on 12-month
            minimums.
          </p>
        </div>
      </section>

      {/* ===== WHAT WE ACTUALLY DID ===== */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-[#E63E8B] font-mono text-xs tracking-[0.3em] uppercase mb-4">The Work</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-800">
              What we actually did.
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              No mystery line items. Here is every lever we pulled, in the order we pulled it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatWeDid.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-xl hover:shadow-[#357BD8]/8 hover:border-[#357BD8]/20 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#357BD8]/[0.04] to-transparent rounded-bl-full group-hover:from-[#357BD8]/[0.10] transition-all duration-300" />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#357BD8]/10 to-[#00BCD4]/5 border border-[#357BD8]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-[#357BD8]" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="https://canva.link/7zf0zqr8wjnbcgr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-[#357BD8] hover:border-[#357BD8]/30 font-semibold px-7 py-3.5 rounded-full text-sm shadow-sm hover:shadow-md transition-all"
            >
              <FileText className="w-4 h-4" />
              Read the full 22-page breakdown
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== TAKEAWAYS ===== */}
      <section className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#357BD8] via-[#00BCD4] to-[#E63E8B]" />
            <div className="p-8 md:p-12">
              <p className="text-[#357BD8] font-mono text-xs tracking-[0.3em] uppercase mb-4">What This Proves</p>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-8">
                Why this account is worth reading.
              </h2>
              <div className="space-y-5">
                {[
                  "A first paid-media account can work without a large budget, if the diagnosis is right. Total spend here was under $5,000.",
                  "Zero sales in week 1 is not a signal to quit. It is a signal to rebuild the creative and look harder at the page.",
                  "Healthy ad metrics with dead conversion almost always means the page, not the traffic. Reading that correctly saved the account.",
                  "High-ticket, phone-closed offers can be fed by cold traffic when the qualification happens in the copy rather than on the call.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <p className="text-slate-600 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#357BD8]/8 via-[#E63E8B]/5 to-[#00BCD4]/8" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#357BD8]/[0.08] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(53,123,216,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(53,123,216,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-slate-800">
              Want this run on{" "}
              <span className="bg-gradient-to-r from-[#357BD8] via-[#E63E8B] to-[#F5841F] bg-clip-text text-transparent">
                your account?
              </span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Every client account is reviewed free before scope or pricing is discussed, so you hear the truth about
              your setup either way.
            </p>
            <motion.a
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-bold px-12 py-5 rounded-full text-lg shadow-2xl shadow-[#357BD8]/25 hover:shadow-[#357BD8]/40 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a 30-Minute Call <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <DesignerFooter />
    </div>
  );
}
