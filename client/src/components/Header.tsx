import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full bg-white/90 backdrop-blur-sm z-50 transition-shadow ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <span className="text-xl font-bold">
              Vibe <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Marketing AI</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
            <a href="#benefits" className="text-gray-700 hover:text-primary transition-colors">Benefits</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors">Testimonials</a>
            <a href="#case-studies" className="text-gray-700 hover:text-primary transition-colors">Case Studies</a>
          </nav>
          
          {/* CTA Button */}
          <a 
            href="#contact" 
            className="hidden md:block px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#benefits" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#case-studies" 
              className="text-gray-700 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Case Studies
            </a>
            <a 
              href="#contact" 
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-all shadow-md hover:shadow-lg text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
