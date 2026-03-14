import { ArrowRight } from "lucide-react";
import cortexuumLogoWhite from "../assets/cortexuum-logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] border-t border-[var(--gold)]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={cortexuumLogoWhite} alt="Cortexuum" className="h-8 w-auto mb-6" />
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
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
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-3">
              {[
                { name: "How We Help", href: "/#how-we-help" },
                { name: "Case Studies", href: "/#results" },
                { name: "FAQs", href: "/#faqs" },
                { name: "Book a Call", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/30 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/30 hover:text-[var(--gold)] transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-12" />
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            &copy; {currentYear} Cortexuum. Engineering Growth & Transformation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/login" className="text-white/15 hover:text-white/30 text-xs transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
