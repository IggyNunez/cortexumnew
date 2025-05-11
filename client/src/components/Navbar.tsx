import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import cortexuumLogoWhite from '../assets/cortexuum-logo-white.png';

const Navbar = () => {
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

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <img 
                src={cortexuumLogoWhite} 
                alt="Cortexuum AI Marketing Agency"
                className="w-44 transition-transform group-hover:scale-105 duration-300"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold text-sm relative group text-white ${
                  location === item.href ? "font-bold" : ""}`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary opacity-80 transition-all duration-300 group-hover:w-full transform group-hover:-translate-y-0.5 group-hover:opacity-100"></span>
              </a>
            ))}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-bold shadow hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <a href="/#contact">Contact Us</a>
            </Button>
            
            <Button
              asChild
              className="bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full px-6 py-2 text-sm font-bold shadow-md hover:shadow-lg"
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
              className="p-2 text-white"
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
              ease: [0.04, 0.62, 0.23, 0.98]
            }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 pt-2 pb-3">
              <div className="grid gap-2 my-2">
                {/* Primary buttons first, full-width */}
                <Button
                  asChild
                  className="w-full bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full px-6 py-6 text-lg font-bold shadow-lg hover:shadow-xl focus:ring-2 focus:ring-[#E63E8B] focus:ring-offset-2"
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