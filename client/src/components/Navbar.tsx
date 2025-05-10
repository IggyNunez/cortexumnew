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
                  className={`${scrolled ? "text-primary" : "text-white"} fill-current`}
                  style={{ transform: 'translateY(2px)' }}
                >
                  {/* Robot face with friendly design */}
                  <g>
                    {/* Robot head - rounded shape for friendliness */}
                    <rect x="3" y="3" width="18" height="18" rx="9" fill={scrolled ? "#6366F1" : "#6366F1"} opacity={scrolled ? "0.95" : "0.9"} />
                    
                    {/* Friendly robot eyes - large and expressive */}
                    <circle cx="8.5" cy="9" r="3" fill="#ffffff">
                      <animate 
                        attributeName="r" 
                        values="3;3.2;2.8;3" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    <circle cx="15.5" cy="9" r="3" fill="#ffffff">
                      <animate 
                        attributeName="r" 
                        values="3;2.8;3.2;3" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    
                    {/* Robot pupils - cute animated eyes */}
                    <circle cx="8.5" cy="9" r="1.5" fill={scrolled ? "#4F46E5" : "#000000"}>
                      <animate 
                        attributeName="cy" 
                        values="9;8.5;9.5;9" 
                        dur="3s" 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="cx" 
                        values="8.5;8.8;8.2;8.5" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="r" 
                        values="1.5;1.3;1.6;1.5" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    <circle cx="15.5" cy="9" r="1.5" fill={scrolled ? "#4F46E5" : "#000000"}>
                      <animate 
                        attributeName="cy" 
                        values="9;9.5;8.5;9" 
                        dur="3s" 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="cx" 
                        values="15.5;15.2;15.8;15.5" 
                        dur="4s" 
                        repeatCount="indefinite" 
                      />
                      <animate 
                        attributeName="r" 
                        values="1.5;1.6;1.3;1.5" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </circle>
                    
                    {/* Eyebrows - friendly expression */}
                    <path d="M6.5,6 Q8.5,5 10.5,6" 
                      stroke="#ffffff" 
                      strokeWidth="0.8" 
                      strokeLinecap="round" 
                      fill="none">
                      <animate 
                        attributeName="d" 
                        values="M6.5,6 Q8.5,5 10.5,6;
                                M6.5,5.8 Q8.5,4.8 10.5,5.8;
                                M6.5,6 Q8.5,5 10.5,6" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    <path d="M13.5,6 Q15.5,5 17.5,6" 
                      stroke="#ffffff" 
                      strokeWidth="0.8" 
                      strokeLinecap="round" 
                      fill="none">
                      <animate 
                        attributeName="d" 
                        values="M13.5,6 Q15.5,5 17.5,6;
                                M13.5,5.8 Q15.5,4.8 17.5,5.8;
                                M13.5,6 Q15.5,5 17.5,6" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    
                    {/* Robot smile - curved upward for extra friendliness */}
                    <path d="M7,15 Q12,19 17,15" 
                      stroke="#ffffff" 
                      strokeWidth="1.8" 
                      strokeLinecap="round" 
                      fill="none">
                      <animate 
                        attributeName="d" 
                        values="M7,15 Q12,19 17,15;
                                M7.5,15 Q12,18.5 16.5,15;
                                M7,14.8 Q12,19.2 17,14.8;
                                M7,15 Q12,19 17,15" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    
                    {/* Dimples for extra cuteness */}
                    <circle cx="7" cy="15" r="0.5" fill="#ffffff" opacity="0.7" />
                    <circle cx="17" cy="15" r="0.5" fill="#ffffff" opacity="0.7" />
                    
                    {/* Robot antenna - playful bobbing */}
                    <path d="M12,3 L12,0.5 M10.5,0.5 L13.5,0.5" 
                      stroke="#ffffff" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      fill="none">
                      <animate 
                        attributeName="d" 
                        values="M12,3 L12,0.5 M10.5,0.5 L13.5,0.5;
                                M12,3 L11.5,0.5 M10,0.5 L13,0.5;
                                M12,3 L12.5,0.5 M11,0.5 L14,0.5;
                                M12,3 L12,0.5 M10.5,0.5 L13.5,0.5" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>
                    <circle cx="12" cy="0.5" r="1" fill="#ffffff" />
                    
                    {/* Rosy cheeks for extra friendliness */}
                    <circle cx="6" cy="12" r="1" fill="#ffffff" opacity="0.4" />
                    <circle cx="18" cy="12" r="1" fill="#ffffff" opacity="0.4" />
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