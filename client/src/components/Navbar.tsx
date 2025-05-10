import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Benefits", href: "/#benefits" },
    { name: "Why Hire Us", href: "/#why-hire-us" },
    { name: "Insights", href: "/#insights" },
    { name: "Contact", href: "/#contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with animated icon */}
          <div className="flex-shrink-0 font-bold text-2xl">
            <a href="/" className="flex items-center group">
              <div className="mr-2 transform group-hover:rotate-12 transition-transform duration-300">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className={`${scrolled ? "text-primary" : "text-white"} fill-current`}
                >
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M15.707,16.293 c-0.391,0.391-1.023,0.391-1.414,0L12,14.414l-2.293,2.293c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,11.586 l3.707,3.707C16.098,15.684,16.098,15.902,15.707,16.293z M15.707,9.707c-0.391,0.391-1.023,0.391-1.414,0L12,7.414L9.707,9.707 c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,4.586l3.707,3.707C16.098,8.684,16.098,8.902,15.707,9.707z">
                    <animate 
                      attributeName="d" 
                      dur="5s" 
                      repeatCount="indefinite" 
                      values="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M15.707,16.293 c-0.391,0.391-1.023,0.391-1.414,0L12,14.414l-2.293,2.293c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,11.586 l3.707,3.707C16.098,15.684,16.098,15.902,15.707,16.293z M15.707,9.707c-0.391,0.391-1.023,0.391-1.414,0L12,7.414L9.707,9.707 c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,4.586l3.707,3.707C16.098,8.684,16.098,8.902,15.707,9.707z;
                      M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M12,16c-2.209,0-4-1.791-4-4 s1.791-4,4-4s4,1.791,4,4S14.209,16,12,16z M12,6c-1.104,0-2-0.896-2-2s0.896-2,2-2s2,0.896,2,2S13.104,6,12,6z;
                      M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M15.707,16.293 c-0.391,0.391-1.023,0.391-1.414,0L12,14.414l-2.293,2.293c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,11.586 l3.707,3.707C16.098,15.684,16.098,15.902,15.707,16.293z M15.707,9.707c-0.391,0.391-1.023,0.391-1.414,0L12,7.414L9.707,9.707 c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L12,4.586l3.707,3.707C16.098,8.684,16.098,8.902,15.707,9.707z"
                    />
                  </path>
                </svg>
              </div>
              <span className={`transition-colors ${scrolled ? "text-primary" : "text-white"}`}>
                <span className="inline-block group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300">Vibe</span>
                <span className="inline-block group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300" style={{ transitionDelay: '50ms' }}>Marketing</span>
                <span className={`${scrolled ? "text-primary" : "text-white bg-primary/80 px-1 rounded"} inline-block group-hover:transform group-hover:-translate-y-0.5 transition-all duration-300`} style={{ transitionDelay: '100ms' }}>Agency.ai</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold text-sm relative group ${
                  scrolled ? "text-gray-800" : "text-white text-with-shadow"
                } ${location === item.href ? "text-primary font-bold" : ""}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-80 transition-all duration-300 group-hover:w-full transform group-hover:-translate-y-0.5 group-hover:opacity-100"></span>
              </a>
            ))}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-bold shadow transition-all hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <a href="/#contact">Contact Us</a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`transition-colors p-2 ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`text-gray-800 block px-3 py-2 text-base font-semibold relative group ${
                      location === item.href ? "text-primary font-bold" : ""
                    }`}
                    onClick={handleNavClick}
                  >
                    <span className="relative inline-block">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-80 transition-all duration-300 group-hover:w-full transform group-hover:-translate-y-0.5 group-hover:opacity-100"></span>
                    </span>
                  </a>
                ))}
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 text-base font-bold shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <a href="/#contact" onClick={handleNavClick}>
                      Contact Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;