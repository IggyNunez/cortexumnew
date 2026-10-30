import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, Home, Layers, TrendingUp, Workflow, Users, UserRound, MessageCircleQuestion } from "lucide-react";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import { LiquidNavbar, type NimbusFx } from "@/components/ui/liquid-glass-navbar";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Homepage sections in page order. The liquid nav highlights whichever one is
// on screen; sections without an entry (benefits, contact) keep the one above.
const SECTIONS: { label: string; id: string; icon: typeof Home; fx: NimbusFx }[] = [
  { label: "Home", id: "top", icon: Home, fx: "pop" },
  { label: "Services", id: "services", icon: Layers, fx: "drop" },
  { label: "Results", id: "proof", icon: TrendingUp, fx: "plane" },
  { label: "Process", id: "process", icon: Workflow, fx: "spin" },
  { label: "Clients", id: "clients", icon: Users, fx: "pop" },
  { label: "Founder", id: "founder", icon: UserRound, fx: "wave" },
  { label: "FAQ", id: "faq", icon: MessageCircleQuestion, fx: "drop" },
];

const NAV_LINKS = SECTIONS.slice(1).map(s => ({ label: s.label, href: `#${s.id}` }));
const RESULTS = SECTIONS.findIndex(s => s.id === "proof");

const CTA_URL = "https://calendly.com/cortexuummarketing/30min";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // These are all homepage section anchors. On any other route a bare "#id"
  // dead-ends, so send the visitor home first and let the hash do the rest.
  const navHref = (href: string) => (location === "/" ? href : `/${href}`);

  // Off the homepage the only page using this header is a case study, so Results stays lit.
  const [active, setActive] = useState(location === "/" ? 0 : RESULTS);
  const clickLock = useRef(0);
  const wide = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    if (location !== "/") return setActive(RESULTS);
    const spy = () => {
      if (Date.now() < clickLock.current) return;
      const line = window.innerHeight * 0.4;
      let i = 0;
      SECTIONS.forEach((s, j) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) i = j;
      });
      setActive(i);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Desktop + mobile top pill */}
      <header className="fixed top-3 md:top-5 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between gap-4 rounded-full transition-all duration-300 border ${
              scrolled
                ? "bg-white/85 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-200/50 py-2 md:py-1.5 pl-4 pr-2 md:pl-5 md:pr-2"
                : "bg-white/60 backdrop-blur-md border-white/60 shadow-md shadow-slate-200/30 py-2 md:py-1.5 pl-4 pr-2 md:pl-5 md:pr-2"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <img
                src={cortexuumLogoCircle}
                alt="Cortexuum"
                className="h-8 w-8 rounded-full ring-1 ring-slate-200"
              />
              <span className="text-sm md:text-[15px] font-bold tracking-[0.18em] uppercase text-slate-800">
                Cortexuum
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:block">
              <LiquidNavbar
                tone="light"
                compact={!wide}
                active={active}
                onChange={i => {
                  // Hold the drop on the clicked item while the page smooth-scrolls past others.
                  clickLock.current = Date.now() + 1200;
                  setActive(i);
                }}
                style={{ fontFamily: "inherit" }}
                items={SECTIONS.map(s => ({
                  label: s.label,
                  href: navHref(`#${s.id}`),
                  icon: <s.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />,
                  fx: s.fx,
                }))}
              />
            </div>

            {/* Right side: CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 bg-[#0E1B33] text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-[#357BD8] transition-colors"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0E1B33] text-white shadow-sm"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="pt-24 px-6 flex flex-col h-full">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={navHref(link.href)}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-5 border-b border-slate-200"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                    <span className="text-2xl font-bold text-slate-900 group-hover:text-[#357BD8] transition-colors">
                      {link.label}
                    </span>
                  </span>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#357BD8] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-10 inline-flex items-center justify-center gap-2 bg-[#0E1B33] text-white font-semibold py-4 rounded-full"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-8 text-center text-xs text-slate-400 tracking-wide">
              CORTEXUUM &middot; Engineering Growth &amp; Transformation
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
