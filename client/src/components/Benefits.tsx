import { motion } from "framer-motion";
import { Rocket, PieChart, Users, Lightbulb, DollarSign } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Rocket size={22} />,
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and workflows, allowing your team to focus on strategic initiatives that drive growth."
    },
    {
      icon: <PieChart size={22} />,
      title: "Enhanced Client Results",
      description: "Deliver superior campaign performance and ROI for your clients through AI-optimized strategies."
    },
    {
      icon: <Users size={22} />,
      title: "Higher Lead Conversion",
      description: "Convert more prospects into clients with personalized AI chatbots that qualify leads 24/7."
    },
    {
      icon: <Lightbulb size={22} />,
      title: "Competitive Advantage",
      description: "Stand out in the crowded agency market by offering cutting-edge AI-powered services to your clients."
    },
    {
      icon: <DollarSign size={22} />,
      title: "Increased Revenue",
      description: "Boost your agency's profitability by scaling operations without proportionally increasing costs."
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
            Transform Your Agency with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Automation</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover how our AI solutions can revolutionize your marketing agency's performance and client outcomes.
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