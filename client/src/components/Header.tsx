import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Benefits", href: "#benefits" },
  { label: "Results", href: "#proof" },
  { label: "Process", href: "#process" },
];

const CTA_URL = "https://calendly.com/cortexuummarketing/30min";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // These are all homepage section anchors. On any other route a bare "#id"
  // dead-ends, so send the visitor home first and let the hash do the rest.
  const navHref = (href: string) => (location === "/" ? href : `/${href}`);

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
                ? "bg-white/85 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-200/50 py-2 pl-4 pr-2 md:pl-6 md:pr-3"
                : "bg-white/60 backdrop-blur-md border-white/60 shadow-md shadow-slate-200/30 py-2 pl-4 pr-2 md:pl-6 md:pr-3"
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
            <nav className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={navHref(link.href)}
                  className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side: CTA (desktop) + hamburger (mobile) */}
            <div className="flex items-center gap-2">
              <a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white text-[13px] font-semibold px-4 py-2 rounded-full hover:shadow-md hover:shadow-[#357BD8]/25 transition-all"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white shadow-sm"
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
              className="mt-10 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#357BD8] to-[#00BCD4] text-white font-semibold py-4 rounded-full shadow-lg shadow-[#357BD8]/25"
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
