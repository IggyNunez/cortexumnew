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
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  className={`${scrolled ? "text-primary" : "text-white"}`}
                  style={{ transform: 'translateY(2px)' }}
                >
                  {/* Minimal robot face design */}
                  <g>
                    {/* Simple circular outline */}
                    <circle cx="12" cy="12" r="9" 
                      fill="none" 
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1.2"
                    >
                      <animate 
                        attributeName="r" 
                        values="9;9.2;8.8;9" 
                        dur="6s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    
                    {/* Minimal eyes - just simple circles */}
                    <circle cx="8" cy="10" r="1.5" 
                      fill="none" 
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1.2">
                      <animate 
                        attributeName="cy" 
                        values="10;9.8;10.2;10" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    <circle cx="16" cy="10" r="1.5" 
                      fill="none" 
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1.2">
                      <animate 
                        attributeName="cy" 
                        values="10;10.2;9.8;10" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    
                    {/* Minimal smile - just a curved line */}
                    <path d="M8,14 Q12,16.5 16,14" 
                      fill="none"
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1.2" 
                      strokeLinecap="round">
                      <animate 
                        attributeName="d" 
                        values="M8,14 Q12,16.5 16,14;
                                M8,14 Q12,16 16,14;
                                M8,14 Q12,16.5 16,14" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    
                    {/* Simple antenna */}
                    <path d="M12,3 L12,1" 
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1.2" 
                      strokeLinecap="round">
                      <animate 
                        attributeName="d" 
                        values="M12,3 L12,1;
                                M12,3 L11.8,1;
                                M12,3 L12.2,1;
                                M12,3 L12,1" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    <circle cx="12" cy="1" r="0.8" 
                      fill="none" 
                      stroke={scrolled ? "#6366F1" : "#ffffff"} 
                      strokeWidth="1">
                      <animate 
                        attributeName="r" 
                        values="0.8;0.7;0.9;0.8" 
                        dur="3s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                  </g>
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