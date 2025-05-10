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
              VibeMarketing<span className="text-primary">Agency.ai</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Custom AI solutions designed specifically for marketing agencies to increase efficiency, improve client results, and boost profitability.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a 
                  href="mailto:info@vibemarketing.ai" 
                  className="text-gray-200 hover:text-white hover:underline focus:outline-none focus:text-white focus:underline"
                  aria-label="Email us"
                >
                  info@vibemarketing.ai
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a 
                  href="tel:+18005551234" 
                  className="text-gray-200 hover:text-white hover:underline focus:outline-none focus:text-white focus:underline"
                  aria-label="Call us"
                >
                  +1 (800) 555-1234
                </a>
              </div>
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
            <h3 className="text-lg font-bold mt-8 mb-5 text-white">Follow Us</h3>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-primary focus:outline-none focus:text-primary transition-colors"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm font-medium">
            &copy; {currentYear} VibeAI Marketing Solutions. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-bold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Contact us to get started"
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