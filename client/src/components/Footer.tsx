import cortexuumPsychologyLogo from '../assets/cortexuum-logo-psychology.png';
import cortexuumLogoWhite from '../assets/cortexuum-logo-white.png';
import cortexuumLogoFooter from '../assets/cortexuum-logo-footer.png';
import { Bot } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Define interface for navigation items
  interface NavItem {
    name: string;
    href: string;
  }
  
  const navigation = {
    solutions: [
      { name: 'Paid Media', href: '/#services' },
      { name: 'Funnel Buildouts', href: '/#services' },
      { name: 'Offer Creation', href: '/#services' },
      { name: 'Social Media', href: '/#services' },
    ] as NavItem[],
    company: [
      { name: 'About', href: '/#about' },
      { name: 'Testimonials', href: '/#testimonials' },
      { name: 'Results', href: '/#results' },
    ] as NavItem[],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ] as NavItem[],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src={cortexuumLogoWhite} 
                alt="Cortexuum AI Marketing Agency" 
                className="w-44 mr-0"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              We're your partners in online success. Specializing in media buying, funnel building, and offer creation, Cortexuum is dedicated to propelling businesses into digital excellence.
            </p>
            <div className="text-gray-300 mt-4 text-sm">
              Ready to boost your online impact? Book a call today to discuss how our data-driven solutions can transform your business.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Solutions</h3>
            <ul className="space-y-4">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:text-white focus:underline transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Company</h3>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:text-white focus:underline transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Legal</h3>
            <ul className="space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white hover:underline focus:outline-none focus:text-white focus:underline transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-gray-300 text-sm font-medium">
                &copy; {currentYear} Cortexuum AI Marketing Agency. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-2 italic">
                Data-driven solutions that beat opinions, every time.
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-4">
              <a 
                href="https://calendly.com/cortexuummarketing/30min" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E63E8B] hover:bg-[#E63E8B]/90 text-white rounded-full px-6 py-3 text-sm font-bold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E63E8B] focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Book a call with Cortexuum"
              >
                BOOK A CALL
              </a>

            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Holistic and data-driven solutions intertwined into the very fabric of our framework.
            </p>
            <div className="mt-2">
              <a href="/login" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                Admin Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;