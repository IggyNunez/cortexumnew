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
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and company info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold mb-4">
              VibeMarketing<span className="text-primary">Agency.ai</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Custom AI solutions designed specifically for marketing agencies to increase efficiency, improve client results, and boost profitability.
            </p>
            <div className="text-gray-300 mt-4 text-sm">
              Ready to transform your marketing agency with AI? Fill out our detailed application form below to get started.
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
                &copy; {currentYear} VibeMarketingAgency.ai. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-2 italic">
                This website was designed and developed entirely using AI automation and generative technology.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-bold transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Contact us to get started"
              >
                Get Started Today
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Powered by AI automation technologies including OpenAI, ElevenLabs, and custom AI agents.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;