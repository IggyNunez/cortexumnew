import { motion } from "framer-motion";
import { 
  LineChart, 
  MousePointerClick, 
  Layers, 
  Bot, 
  Brain, 
  Zap,
  GitBranch
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Bot className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Custom AI Agents",
      description: "Bespoke AI agents tailored to your business needs that can handle customer interactions, generate content, and analyze data with unprecedented accuracy and personalization."
    },
    {
      icon: <Brain className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "AI Content Creation",
      description: "Advanced AI-powered content generation that creates compelling copy, blog posts, social media content, and ad creative that resonates with your target audience."
    },
    {
      icon: <MousePointerClick className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Intelligent Media Buying",
      description: "AI-optimized media purchasing across platforms that continuously learns and adjusts your campaigns for maximum performance and reduced acquisition costs."
    },
    {
      icon: <Layers className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "AI-Powered Funnels",
      description: "Dynamic sales funnels that adapt to individual user behavior in real-time, creating personalized journeys that dramatically increase conversion rates."
    },
    {
      icon: <LineChart className="text-blue-600 text-2xl" />,
      iconBgColor: "bg-blue-600/10",
      title: "Predictive Analytics",
      description: "Machine learning models that forecast market trends, customer behavior, and campaign performance to give you a competitive edge in your marketing strategy."
    },
    {
      icon: <GitBranch className="text-blue-500 text-2xl" />,
      iconBgColor: "bg-blue-500/10",
      title: "AI Marketing Strategy",
      description: "Comprehensive AI-driven marketing plans that integrate psychological principles with cutting-edge technology to create cohesive, high-performing campaigns."
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
            AI-Powered Services <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold">INTELLIGENT AND ADAPTIVE</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our AI-powered solutions merge cognitive psychology with cutting-edge technology to transform your marketing from static to dynamically intelligent.
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