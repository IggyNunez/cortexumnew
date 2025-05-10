import { motion } from "framer-motion";
import { 
  Bot, 
  Cog, 
  MessageSquare, 
  Presentation, 
  LineChart, 
  Users 
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, iconBgColor, title, description, index }: ServiceCardProps) => (
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className={`w-14 h-14 ${iconBgColor} rounded-full flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href="#contact" className="text-primary font-semibold flex items-center">
      Learn more <span className="ml-2">→</span>
    </a>
  </motion.div>
);

const ServicesSection = () => {
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
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our AI Solutions for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Marketing Agencies</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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
            <ServiceCard 
              key={index}
              icon={service.icon}
              iconBgColor={service.iconBgColor}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
