import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SacredLogo from "./SacredLogo";
import MysticOrb from "./MysticOrb";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Safety: ensure scroll is never stuck on mount (HMR recovery)
  useEffect(() => {
    if (!mobileMenuOpen) document.body.style.overflow = "";
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "How We Help", href: "#how-we-help" },
    { label: "Results", href: "#results" },
    { label: "FAQs", href: "#faqs" },
  ];

  // Stagger variants for menu items
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
    exit: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      x: 30,
      filter: "blur(4px)",
      transition: { duration: 0.25 },
    },
  };

  return (
    <>
      {/* Desktop: Centered floating pill navbar */}
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-700 ${
          mobileMenuOpen ? "z-[60]" : "z-50"
        }`}
      >
        {/* Mobile: full-width bar */}
        <div className="md:hidden px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center relative z-[60]">
            <SacredLogo className="h-8 text-[var(--gold)]" showText animate={false} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 relative z-[60]"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Desktop: Centered glassmorphic pill with rotating glow border */}
        <div className="hidden md:flex justify-center pt-5">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="header-glow-wrapper relative"
          >
            {/* Subtle outer glow aura */}
            <div className="absolute -inset-3 rounded-full opacity-40 blur-xl pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />

            <nav
              className={`relative z-10 inline-flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-700 ${
                scrolled
                  ? "bg-black/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_80px_rgba(201,168,76,0.06)]"
                  : "bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              }`}
            >
              <Link
                href="/"
                className="flex items-center px-4 py-2 rounded-full hover:bg-white/[0.04] transition-all duration-300"
              >
                <SacredLogo className="h-7 text-[var(--gold)]" showText animate={false} />
              </Link>

              <div className="w-px h-5 bg-white/[0.08] mx-1" />

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-white/80 hover:text-white hover:bg-white/[0.06] px-4 py-2 rounded-full transition-all duration-300 font-medium tracking-wide whitespace-nowrap uppercase"
                >
                  {link.label}
                </a>
              ))}

              <div className="w-px h-5 bg-white/[0.08] mx-1" />

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 border border-[var(--gold)]/20 hover:border-[var(--gold)]/40 text-[var(--gold)] text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
              >
                Book a Call
              </a>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* === FULL-SCREEN MOBILE DRAWER === */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[var(--navy)]/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mystic orb background — bottom right */}
            <div className="absolute -bottom-20 -right-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <MysticOrb className="w-[350px] h-[350px] opacity-30" />
              </motion.div>
            </div>

            {/* Decorative sacred geometry lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 375 812"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="40" y1="0" x2="40" y2="812"
                stroke="#C9A84C"
                strokeWidth="0.3"
                strokeOpacity="0.08"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.line
                x1="335" y1="0" x2="335" y2="812"
                stroke="#C9A84C"
                strokeWidth="0.3"
                strokeOpacity="0.08"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              />
            </svg>

            {/* Menu content */}
            <div className="relative z-10 flex flex-col h-full px-10 pt-28 pb-12">
              {/* Navigation links */}
              <motion.nav
                className="flex flex-col gap-1 flex-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((link, i) => (
                  <motion.div key={link.label} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center gap-4 py-5 border-b border-[var(--gold)]/5 transition-colors"
                    >
                      {/* Index number */}
                      <span className="text-[var(--gold)]/30 text-xs font-body tracking-widest w-6">
                        0{i + 1}
                      </span>
                      {/* Label */}
                      <span className="text-2xl font-heading font-semibold text-white/90 group-hover:text-[var(--gold)] transition-colors duration-300">
                        {link.label}
                      </span>
                      {/* Hover arrow */}
                      <ArrowRight className="w-4 h-4 text-[var(--gold)]/0 group-hover:text-[var(--gold)]/60 transition-all duration-300 ml-auto transform group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8"
                >
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-cta w-full text-center justify-center text-lg"
                  >
                    Book a Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </motion.div>
              </motion.nav>

              {/* Bottom section — logo + tagline */}
              <motion.div
                className="mt-auto pt-8 border-t border-[var(--gold)]/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <SacredLogo className="h-10 text-[var(--gold)] opacity-40" showText showTagline animate={false} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
