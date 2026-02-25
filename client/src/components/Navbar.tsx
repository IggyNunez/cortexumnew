// Minimal navbar for sub-pages (Home uses scroll-based sections instead)
import cortexuumLogoCircle from "@assets/cortexumlogo-circle_1772028571475.png";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src={cortexuumLogoCircle} alt="CORTEXUUM" className="h-9 w-9 rounded-full ring-2 ring-slate-100" />
          <span className="text-base font-bold tracking-wide uppercase text-slate-800">CORTEXUUM</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors">Home</a>
          <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#357BD8] text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-[#2d6bc0] transition-colors shadow-sm">
            Book a Call <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
