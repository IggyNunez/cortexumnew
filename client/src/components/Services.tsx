import { motion } from "framer-motion";
import { 
  LineChart, 
  MousePointerClick, 
  Layers, 
  ShoppingBag, 
  Building, 
  Share2 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <MousePointerClick className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Paid Media Services",
      description: "Expert media buying across Meta, Google, and YouTube with sophisticated targeting and creative strategies to enhance engagement and conversions."
    },
    {
      icon: <Layers className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "Funnel Buildouts",
      description: "Custom sales funnels that guide potential customers from awareness to purchase with responsive, user-friendly designs that optimize the customer journey."
    },
    {
      icon: <ShoppingBag className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Offer Creation",
      description: "Crafting offers that align with your business needs, adaptable for DIY, DWY, or DFY strategies that effectively engage and convert your target market."
    },
    {
      icon: <Building className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "Local Marketing",
      description: "Targeted local marketing strategies that connect businesses with their community, driving foot traffic and building lasting customer relationships."
    },
    {
      icon: <LineChart className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Data-Driven Analytics",
      description: "Advanced analytics and measurement solutions that provide actionable insights to optimize your marketing campaigns and maximize ROI."
    },
    {
      icon: <Share2 className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "Social Media Marketing",
      description: "Strategic social media management across platforms to build brand awareness, engage audiences, and drive measurable business results."
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold">HOLISTIC AND FUNDAMENTAL</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            With our expertise, your brand is positioned for maximum impact and ROI across pivotal digital platforms.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-14 h-14 ${service.iconBgColor} rounded-full flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-700 mb-5 leading-relaxed">{service.description}</p>
              <a 
                href="https://calendly.com/cortexuummarketing/30min" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold flex items-center hover:underline focus:outline-none focus:underline"
                aria-label={`Book a call about ${service.title}`}
              >
                Book a call <span className="ml-2 text-lg">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;