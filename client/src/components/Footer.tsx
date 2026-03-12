import { ArrowRight } from "lucide-react";
import cortexuumLogoWhite from "../assets/cortexuum-logo-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    solutions: [
      { name: "Paid Media", href: "/#services" },
      { name: "Funnel Buildouts", href: "/#services" },
      { name: "Offer Creation", href: "/#services" },
      { name: "Social Media", href: "/#services" },
    ],
    company: [
      { name: "About", href: "/#about" },
      { name: "Results", href: "/#results" },
      { name: "Portfolio", href: "/#portfolio" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={cortexuumLogoWhite} alt="Cortexuum" className="h-8 w-auto mb-6" />
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Data-driven performance marketing that blends behavioral psychology with proven frameworks to scale your business.
            </p>
            <a
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[#6C3AFF] hover:text-[#9B6FFF] transition-colors"
            >
              Book a Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/40 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/40 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-white/40 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {currentYear} Cortexuum AI Marketing Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/login" className="text-white/20 hover:text-white/40 text-xs transition-colors">Admin</a>
            <span className="text-white/10 text-xs">|</span>
            <span className="text-white/20 text-xs">
              Built by <a href="https://plaintalk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors">plaintalk.dev</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
