import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import cortexuumBrain from "@/assets/cortexuum-brain.png";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";

// Homepage sections in page order. The water drop sits under whichever one is
// on screen; sections without a link (benefits, contact) keep the one above,
// and the hero has none lit.
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "Clients", href: "#clients" },
  { label: "Founder", href: "#founder" },
  { label: "FAQ", href: "#faq" },
];
const RESULTS = NAV_LINKS.findIndex(l => l.href === "#proof");

const CTA_URL = "https://calendly.com/cortexuummarketing/30min";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // These are all homepage section anchors. On any other route a bare "#id"
  // dead-ends, so send the visitor home first and let the hash do the rest.
  const navHref = (href: string) => (location === "/" ? href : `/${href}`);

  // Off the homepage the only page using this header is a case study, so Results stays lit.
  const [active, setActive] = useState(location === "/" ? -1 : RESULTS);
  const clickLock = useRef(0);

  useEffect(() => {
    if (location !== "/") return setActive(RESULTS);
    const spy = () => {
      if (Date.now() < clickLock.current) return;
      const line = window.innerHeight * 0.4;
      let i = -1;
      NAV_LINKS.forEach((l, j) => {
        const el = document.getElementById(l.href.slice(1));
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
        <div className={`mx-auto pointer-events-auto transition-[max-width] duration-500 ease-in-out ${scrolled ? "max-w-5xl" : "max-w-6xl"}`}>
          <div
            className={`flex items-center justify-between gap-4 rounded-full transition-all duration-300 border ${
              scrolled
                ? "bg-white/85 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-200/50 py-2 pl-4 pr-2 md:pl-6 md:pr-3"
                : "bg-white/60 backdrop-blur-md border-white/60 shadow-md shadow-slate-200/30 py-2 pl-4 pr-2 md:pl-6 md:pr-3"
            }`}
          >
            {/* Logo, sitting in its own water drop */}
            <LiquidNavbar
              bare
              active={0}
              compact={false}
              ariaLabel="Cortexuum home"
              className="cx-liquid cx-logo shrink-0 -ml-2"
              items={[{
                label: "Cortexuum",
                href: "/",
                fx: "none",
                icon: <img src={cortexuumBrain} alt="" className="h-7 w-7 object-contain" />,
              }]}
            />

            <div className="hidden lg:block">
              <LiquidNavbar
                bare
                tone="light"
                compact={false}
                active={active}
                onChange={i => {
                  // Hold the drop on the clicked link while the page smooth-scrolls past others.
                  clickLock.current = Date.now() + 1200;
                  setActive(i);
                }}
                className="cx-liquid"
                items={NAV_LINKS.map(l => ({ label: l.label, href: navHref(l.href) }))}
              />
            </div>

            {/* Right side: CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1.5 bg-[#0E1B33] text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:bg-[#357BD8] transition-colors"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0E1B33] text-white shadow-sm"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl animate-in fade-in duration-200">
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
