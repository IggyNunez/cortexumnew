import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Bot, Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${scrolled ? 'shadow-lg py-2' : 'shadow-md py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-xl font-heading font-bold text-primary-dark">Vibe<span className="text-accent">AI</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-primary font-medium transition-colors">Services</a>
            <a href="#benefits" className="text-gray-700 hover:text-primary font-medium transition-colors">Benefits</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</a>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
              Start Now
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-gray-700 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#services" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary font-medium transition-colors">Services</a>
              <a href="#benefits" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary font-medium transition-colors">Benefits</a>
              <a href="#testimonials" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary font-medium transition-colors">Testimonials</a>
              <a href="#contact" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</a>
              <a href="#contact" onClick={closeMobileMenu} className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors text-center shadow-md">
                Start Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
