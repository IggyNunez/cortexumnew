import { Link } from "wouter";

const Footer = () => {
  const services = [
    { name: "AI Implementation", href: "#" },
    { name: "AI Strategy & Training", href: "#" },
    { name: "Chatbot Development", href: "#" },
    { name: "AI Analytics", href: "#" },
    { name: "Content Automation", href: "#" }
  ];
  
  const resources = [
    { name: "Blog", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "AI Marketing Guide", href: "#" },
    { name: "Free Webinars", href: "#" },
    { name: "ROI Calculator", href: "#" }
  ];
  
  const contactInfo = [
    { icon: "fa-envelope", text: "info@vibemarketing.ai" },
    { icon: "fa-phone", text: "(800) 123-4567" },
    { icon: "fa-map-marker-alt", text: "123 Innovation Way\nSan Francisco, CA 94103" }
  ];
  
  const socialMedia = [
    { icon: "fab fa-linkedin", href: "#" },
    { icon: "fab fa-twitter", href: "#" },
    { icon: "fab fa-facebook", href: "#" },
    { icon: "fab fa-instagram", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 gradient-text">Vibe Marketing AI</h3>
            <p className="text-gray-400 mb-6">
              Revolutionizing marketing agencies with cutting-edge AI automation solutions.
            </p>
            <div className="flex space-x-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition duration-150"
                  aria-label={`Follow us on ${social.icon.replace('fab fa-', '')}`}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href} 
                    className="text-gray-400 hover:text-white transition duration-150"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start">
                  <i className={`fas ${info.icon} text-primary mt-1.5 mr-3`}></i>
                  <span className="text-gray-400 whitespace-pre-line">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Vibe Marketing AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
