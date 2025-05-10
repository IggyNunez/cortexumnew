import { motion } from "framer-motion";
import { Rocket, PieChart, Users, Lightbulb, DollarSign, Brain, Clock, Zap } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Brain size={22} />,
      title: "Psychology-Based AI",
      description: "Our AI systems are trained on cognitive psychology principles to create marketing that genuinely resonates with human decision-making processes."
    },
    {
      icon: <PieChart size={22} />,
      title: "30-50% Higher ROI",
      description: "Our clients typically see 30-50% improvements in ROI compared to traditional marketing approaches through continuously optimizing AI algorithms."
    },
    {
      icon: <Clock size={22} />,
      title: "24/7 Marketing Intelligence",
      description: "AI agents work around the clock, analyzing data, optimizing campaigns, and engaging with potential customers without human limitations."
    },
    {
      icon: <Zap size={22} />,
      title: "Hyper-Personalization",
      description: "Create individualized marketing experiences for each prospect through AI that adapts messaging based on behavior, preferences, and psychology."
    },
    {
      icon: <Lightbulb size={22} />,
      title: "Predictive Insights",
      description: "Anticipate market trends and customer needs before they emerge with AI models that identify patterns invisible to human analysis."
    },
    {
      icon: <DollarSign size={22} />,
      title: "Reduced Acquisition Costs",
      description: "AI optimization typically reduces customer acquisition costs by 40-60% while simultaneously improving conversion quality and customer lifetime value."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Business with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Cognitive AI Marketing</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience the revolutionary power of AI marketing that combines psychological principles with cutting-edge machine learning technology.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transition-all hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;