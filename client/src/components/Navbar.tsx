import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import CortexuumLogo from "./CortexuumLogo";
import cortexuumLogo from '../assets/cortexuum-logo.png';
import cortexuumLogoWhite from '../assets/cortexuum-logo-white.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Benefits", href: "/#benefits" },
    { name: "Why Hire Us", href: "/#why-hire-us" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Content Funnel", href: "/#content-funnel" },
    { name: "Contact", href: "/#contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Use a more efficient scroll handler with debounce mechanism
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Skip processing if the scroll change is very minor (reduces jitter)
      if (Math.abs(currentScrollY - lastScrollY) < 5) {
        return;
      }
      
      lastScrollY = currentScrollY;
      
      // Use requestAnimationFrame to optimize performance
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = currentScrollY > 15; // Slightly increased threshold
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Add passive: true for better scroll performance
    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 will-change-transform ${
        scrolled ? "bg-white shadow-md py-4" : "bg-transparent py-6"
      }`}
      style={{ 
        transform: 'translateZ(0)', // Force GPU acceleration for smoother animations
        backfaceVisibility: 'hidden' // Prevent flickering in some browsers
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              {scrolled ? (
                <img 
                  src={cortexuumLogo} 
                  alt="Cortexuum AI Marketing Agency"
                  className="w-44 transition-transform group-hover:scale-105 duration-300"
                />
              ) : (
                <img 
                  src={cortexuumLogoWhite} 
                  alt="Cortexuum AI Marketing Agency"
                  className="w-44 transition-transform group-hover:scale-105 duration-300"
                />
              )}
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
            
            <Button
              asChild
              className="bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full px-6 py-2 text-sm font-bold shadow-md transition-all hover:shadow-lg"
            >
              <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer">
                BOOK A CALL NOW
              </a>
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
            <div className="px-4 pt-2 pb-3">
              <div className="flex flex-col space-y-0">
                
                <Button
                  asChild
                  className="w-full bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full py-3 text-base font-bold shadow-md mb-3"
                >
                  <a 
                    href="https://calendly.com/cortexuummarketing/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleNavClick}
                  >
                    BOOK A CALL NOW
                  </a>
                </Button>
                
                <Button
                  asChild
                  className="w-full bg-[#1A1347] hover:bg-[#1A1347]/90 text-white rounded-full py-3 text-base font-bold shadow-md mb-3"
                >
                  <a href="/#services" onClick={handleNavClick}>
                    Our Services
                  </a>
                </Button>
                                
                {navItems.map((item) => (
                  item.name !== "Services" && (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-800 block px-3 py-2 text-base font-medium border-b border-gray-100 last:border-0"
                      onClick={handleNavClick}
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;