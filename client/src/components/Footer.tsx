import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    solutions: [
      { name: 'AI Strategy', href: '/#services' },
      { name: 'Workflow Automation', href: '/#services' },
      { name: 'AI Chatbots', href: '/#services' },
      { name: 'AI Training', href: '/#services' },
    ],
    company: [
      { name: 'About', href: '/#about' },
      { name: 'Case Studies', href: '/#case-studies' },
      { name: 'Testimonials', href: '/#testimonials' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    social: [
      {
        name: 'Facebook',
        href: '#',
        icon: Facebook,
      },
      {
        name: 'Instagram',
        href: '#',
        icon: Instagram,
      },
      {
        name: 'Twitter',
        href: '#',
        icon: Twitter,
      },
      {
        name: 'LinkedIn',
        href: '#',
        icon: Linkedin,
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and company info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4">
              Vibe<span className="text-primary">AI</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Custom AI solutions designed specifically for marketing agencies to increase efficiency, improve client results, and boost profitability.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a href="mailto:info@vibemarketing.ai" className="text-gray-300 hover:text-white">
                  info@vibemarketing.ai
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a href="tel:+18005551234" className="text-gray-300 hover:text-white">
                  +1 (800) 555-1234
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-6 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-primary"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} VibeAI Marketing Solutions. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;