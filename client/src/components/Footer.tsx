import { ArrowRight } from "lucide-react";
import SacredLogo from "./SacredLogo";
import MysticOrb from "./MysticOrb";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-[var(--gold)]/5 relative overflow-hidden">
      {/* Mystic Orb background — centered behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <MysticOrb className="w-[600px] h-[600px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        {/* === MOBILE: Logo centered top + 2-col grid === */}
        {/* === DESKTOP: 3-col as before === */}

        {/* Mobile logo — centered at top, hidden on desktop */}
        <div className="md:hidden flex flex-col items-center text-center mb-10">
          <SacredLogo className="h-24 text-[var(--gold)] mb-3" stacked animate={false} />
          <p className="text-white/90 text-sm leading-relaxed max-w-xs">
            Growth architecture for personal development brands, coaches, and transformational educators.
          </p>
          <a
            href="https://calendly.com/cortexuummarketing/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta mt-6 text-sm px-6 py-2.5"
          >
            Book a Strategy Call <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile 2-column grid for nav + legal */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {/* Nav */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.2em] mb-4">Navigate</h3>
            <ul className="space-y-3">
              {[
                { name: "How We Help", href: "/#how-we-help" },
                { name: "Case Studies", href: "/#results" },
                { name: "FAQs", href: "/#faqs" },
                { name: "Book a Call", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/90 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.2em] mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms", href: "/terms" },
                { name: "Cookies", href: "/cookies" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/90 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop 3-column layout — hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <SacredLogo className="h-14 text-[var(--gold)] mb-6" showText showTagline animate={false} />
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              Growth architecture for personal development brands, coaches, and transformational educators.
            </p>
            <a
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
            >
              Book a Strategy Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.2em] mb-4">Navigate</h3>
            <ul className="space-y-3">
              {[
                { name: "How We Help", href: "/#how-we-help" },
                { name: "Case Studies", href: "/#results" },
                { name: "FAQs", href: "/#faqs" },
                { name: "Book a Call", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/90 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--gold)] uppercase tracking-[0.2em] mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/90 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-10 md:mt-12" />
        <div className="mt-6 md:mt-8 text-center space-y-2">
          <p className="text-white/60 text-xs">
            &copy; {currentYear} Cortexuum. Engineering Growth &amp;&nbsp;Transformation. All rights&nbsp;reserved.
          </p>
          <p className="text-white/30 text-[10px] tracking-wide">
            Designed by Ignacio Nunez&nbsp;&nbsp;|&nbsp;&nbsp;plaintalk.dev&nbsp;&nbsp;|&nbsp;&nbsp;cortexuum.com&nbsp;&nbsp;|&nbsp;&nbsp;dev@ignacionunez.dev&nbsp;&nbsp;|&nbsp;&nbsp;ignacio@cortexuum.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
