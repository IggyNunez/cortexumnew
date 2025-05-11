import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    // Create a single Intersection Observer instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When header is not intersecting with the top (i.e., scrolled down)
        // We flip the scrolled state to true
        setScrolled(!entry.isIntersecting);
      },
      {
        // Root is null which means it uses the viewport
        root: null,
        // When the header is 0% visible at the top, trigger the callback
        threshold: 0,
        // Start observing when header is 5px from top of viewport
        rootMargin: "-5px 0px 0px 0px"
      }
    );
    
    // We observe a placeholder element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    sentinel.style.opacity = '0';
    document.body.prepend(sentinel);
    
    // Start observing
    observer.observe(sentinel);
    
    // Initial check on mount
    setScrolled(window.scrollY > 5);
    
    // Cleanup
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-5"
      style={{ 
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* Background overlay - separated from content to avoid layout shifts */}
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-200"
        style={{
          opacity: scrolled ? 1 : 0,
          backgroundColor: 'white',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
        }}
      ></div>
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
                className={`font-semibold text-sm relative group transition-colors duration-200 ${
                  location === item.href ? "font-bold" : ""}`}
                style={{
                  color: scrolled ? "#1f2937" : "#ffffff", // text-gray-800 or text-white
                  textShadow: scrolled ? "none" : "0 1px 2px rgba(0,0,0,0.1)"
                }}
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
              className="transition-colors duration-200 p-2"
              style={{
                color: scrolled ? "#374151" : "#ffffff" // text-gray-700 or text-white
              }}
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
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ 
              duration: 0.25,
              ease: [0.04, 0.62, 0.23, 0.98] // Custom easing for smoother animation
            }}
            className="md:hidden bg-white border-t overflow-hidden"
            style={{
              transform: 'translate3d(0,0,0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="px-4 pt-2 pb-3">
              <div className="grid gap-2 my-2">
                {/* Primary buttons first, full-width */}
                <Button
                  asChild
                  className="w-full bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full px-6 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-[#E63E8B] focus:ring-offset-2"
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
                  className="w-full bg-[#1A1347] hover:bg-[#1A1347]/90 text-white rounded-full px-6 py-5 text-base font-bold shadow-md"
                >
                  <a 
                    href="/#services" 
                    onClick={handleNavClick}
                  >
                    Our Services
                  </a>
                </Button>
                
                {/* Navigation links */}              
                <div className="grid gap-0 border-t border-gray-100 mt-2 pt-2">
                  {navItems.map((item) => (
                    item.name !== "Services" && (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-800 block px-3 py-2.5 text-base font-medium border-b border-gray-100 last:border-0"
                        onClick={handleNavClick}
                      >
                        {item.name}
                      </a>
                    )
                  ))}
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