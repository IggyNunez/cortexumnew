import { motion } from "framer-motion";
import { 
  Bot, 
  Cog, 
  MessageSquare, 
  Presentation, 
  LineChart, 
  Users 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Bot className="text-primary text-2xl" />,
      iconBgColor: "bg-primary/10",
      title: "AI Strategy Implementation",
      description: "Custom AI roadmaps designed specifically for marketing agencies to enhance performance and client satisfaction."
    },
    {
      icon: <Cog className="text-emerald-500 text-2xl" />,
      iconBgColor: "bg-emerald-500/10",
      title: "Workflow Automation",
      description: "Streamline your agency operations with intelligent automation tools that save time and reduce errors."
    },
    {
      icon: <MessageSquare className="text-violet-500 text-2xl" />,
      iconBgColor: "bg-violet-500/10",
      title: "AI Chatbot Solutions",
      description: "Voice-enabled AI chatbots using Hume API to engage visitors, qualify leads, and enhance client communication."
    },
    {
      icon: <Presentation className="text-primary text-2xl" />,
      iconBgColor: "bg-primary/10",
      title: "AI Training Programs",
      description: "Customized training for your team to master AI tools and solutions for marketing excellence."
    },
    {
      icon: <LineChart className="text-emerald-500 text-2xl" />,
      iconBgColor: "bg-emerald-500/10",
      title: "AI-Powered Analytics",
      description: "Advanced analytics solutions that provide actionable insights for better client campaigns."
    },
    {
      icon: <Users className="text-violet-500 text-2xl" />,
      iconBgColor: "bg-violet-500/10",
      title: "AI Integration Consulting",
      description: "Expert consultation on seamlessly integrating AI solutions into your existing agency processes."
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
            Our AI Solutions for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-extrabold">Marketing Agencies</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Comprehensive AI integration services tailored specifically for marketing agencies, firms, and consultants.
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
                href="#contact" 
                className="text-primary font-bold flex items-center hover:underline focus:outline-none focus:underline"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn more <span className="ml-2 text-lg">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;