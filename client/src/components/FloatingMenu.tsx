import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface MenuItem {
  name: string;
  href: string;
}

const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.floating-menu-container')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close menu when navigating
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navItems: MenuItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Benefits', href: '/#benefits' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Why Hire Us', href: '/#why-hire-us' },
    { name: 'Content Funnel', href: '/#content-funnel' },
    { name: 'Future Insights', href: '/#future-insights' },
    { name: 'Contact', href: '/#contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: isMobile ? 300 : 0,
      y: isMobile ? 0 : 300,
      scale: 0.9,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: isMobile ? 20 : 0,
      y: isMobile ? 0 : 20,
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  const buttonPosition = isMobile
    ? 'fixed top-4 right-4 z-50'
    : 'fixed top-1/2 right-0 -translate-y-1/2 z-50';

  const menuPosition = isMobile
    ? 'fixed top-0 right-0 h-screen w-[300px] z-40'
    : 'fixed top-1/2 right-12 -translate-y-1/2 z-40 w-[300px]';

  return (
    <div className="floating-menu-container">
      {/* Toggle Button */}
      <motion.button
        className={`${buttonPosition} bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-3 rounded-full shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 90 : 0 }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${menuPosition} bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 rounded-lg shadow-xl p-6 overflow-hidden`}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
              Menu
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <Link href={item.href} onClick={handleLinkClick}>
                    <a className="group flex items-center py-2 text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <a 
                href="https://calendly.com/cortexuummarketing/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop overlay on mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingMenu;