import { motion } from "framer-motion";
import { Rocket, PieChart, Users, Lightbulb, DollarSign } from "lucide-react";

interface BenefitProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
  delay: number;
}

const Benefit = ({ icon, iconBgColor, title, description, delay }: BenefitProps) => (
  <motion.div 
    className="flex"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex-shrink-0 mt-1">
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBgColor} text-white`}>
        {icon}
      </div>
    </div>
    <div className="ml-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Rocket size={18} />,
      iconBgColor: "bg-primary",
      title: "Increased Efficiency",
      description: "Automate repetitive tasks and workflows, allowing your team to focus on strategic initiatives that drive growth."
    },
    {
      icon: <PieChart size={18} />,
      iconBgColor: "bg-emerald-500",
      title: "Enhanced Client Results",
      description: "Deliver superior campaign performance and ROI for your clients through AI-optimized strategies."
    },
    {
      icon: <Users size={18} />,
      iconBgColor: "bg-violet-500",
      title: "Higher Lead Conversion",
      description: "Convert more prospects into clients with personalized AI chatbots that qualify leads 24/7."
    },
    {
      icon: <Lightbulb size={18} />,
      iconBgColor: "bg-primary",
      title: "Competitive Advantage",
      description: "Stand out in the crowded agency market by offering cutting-edge AI-powered services to your clients."
    },
    {
      icon: <DollarSign size={18} />,
      iconBgColor: "bg-emerald-500",
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
              alt="AI automation technology enhancing marketing agency workflows" 
              className="rounded-xl shadow-xl w-full"
            />
          </motion.div>
          
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <Benefit 
                  key={index}
                  icon={benefit.icon}
                  iconBgColor={benefit.iconBgColor}
                  title={benefit.title}
                  description={benefit.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
