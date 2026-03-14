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
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          mobileMenuOpen ? "z-[60]" : "z-50"
        } ${
          scrolled && !mobileMenuOpen
            ? "bg-[var(--navy)]/95 backdrop-blur-md border-b border-[var(--gold)]/5 py-3"
            : mobileMenuOpen
              ? "bg-transparent py-5"
              : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <SacredLogo className="h-8 text-[var(--gold)]" showText animate={false} />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-[var(--gold)] transition-colors duration-200 font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-[var(--gold)]/20 hover:border-[var(--gold)]/50 text-[var(--gold)] text-sm font-medium px-5 py-2.5 rounded transition-all duration-300 hover:bg-[var(--gold)]/5"
              >
                Book a Strategy Call
              </a>
            </div>

            {/* Mobile hamburger / close */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 relative z-[60]"
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
                      <span className="text-2xl font-heading font-semibold text-white/70 group-hover:text-[var(--gold)] transition-colors duration-300">
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
