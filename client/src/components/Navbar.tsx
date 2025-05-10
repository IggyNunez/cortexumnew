import { useState } from "react";
import { Link } from "wouter";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold gradient-text cursor-pointer">
                  Vibe Marketing AI
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-dark hover:text-primary font-medium transition duration-150">Services</a>
            <a href="#benefits" className="text-dark hover:text-primary font-medium transition duration-150">Benefits</a>
            <a href="#testimonials" className="text-dark hover:text-primary font-medium transition duration-150">Testimonials</a>
            <a href="#results" className="text-dark hover:text-primary font-medium transition duration-150">Results</a>
            <a href="#contact" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition duration-150">Contact Us</a>
          </div>
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white shadow-md animate-fade-in ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            href="#services" 
            className="block px-3 py-2 text-dark hover:bg-gray-100 font-medium rounded-md"
            onClick={closeMobileMenu}
          >
            Services
          </a>
          <a 
            href="#benefits" 
            className="block px-3 py-2 text-dark hover:bg-gray-100 font-medium rounded-md"
            onClick={closeMobileMenu}
          >
            Benefits
          </a>
          <a 
            href="#testimonials" 
            className="block px-3 py-2 text-dark hover:bg-gray-100 font-medium rounded-md"
            onClick={closeMobileMenu}
          >
            Testimonials
          </a>
          <a 
            href="#results" 
            className="block px-3 py-2 text-dark hover:bg-gray-100 font-medium rounded-md"
            onClick={closeMobileMenu}
          >
            Results
          </a>
          <a 
            href="#contact" 
            className="block px-3 py-2 bg-primary text-white font-medium rounded-md"
            onClick={closeMobileMenu}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
