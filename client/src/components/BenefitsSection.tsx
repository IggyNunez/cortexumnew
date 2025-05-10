import { motion } from "framer-motion";
import { Benefit } from "@/types";
import { 
  TrendingUp, 
  Zap, 
  Users, 
  Lightbulb, 
  Activity, 
  Settings 
} from "lucide-react";

const benefits: Benefit[] = [
  {
    id: "1",
    icon: "trend-up",
    title: "Increase Revenue Streams",
    description: "Create new service offerings and optimize existing ones with AI automation, increasing your agency's revenue potential."
  },
  {
    id: "2",
    icon: "zap",
    title: "Enhance Productivity",
    description: "Automate repetitive tasks and streamline workflows, allowing your team to focus on strategic, high-value activities."
  },
  {
    id: "3",
    icon: "users",
    title: "Improve Client Retention",
    description: "Deliver better results and more value to your clients, increasing satisfaction and extending client relationships."
  },
  {
    id: "4",
    icon: "lightbulb",
    title: "Gain Competitive Edge",
    description: "Stay ahead of competitors by leveraging cutting-edge AI technology that positions your agency as an industry leader."
  },
  {
    id: "5",
    icon: "activity",
    title: "Scale Operations Easily",
    description: "Handle more clients and projects without proportionally increasing overhead, thanks to intelligent automation."
  },
  {
    id: "6",
    icon: "settings",
    title: "Reduce Operational Costs",
    description: "Minimize resource waste and optimize processes, leading to significant cost savings for your agency over time."
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "trend-up": return <TrendingUp className="text-2xl" />;
    case "zap": return <Zap className="text-2xl" />;
    case "users": return <Users className="text-2xl" />;
    case "lightbulb": return <Lightbulb className="text-2xl" />;
    case "activity": return <Activity className="text-2xl" />;
    case "settings": return <Settings className="text-2xl" />;
    default: return <Lightbulb className="text-2xl" />;
  }
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-primary-dark to-primary text-white clip-diagonal-reverse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-blue-200 font-medium">KEY BENEFITS</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">Why Agencies Choose Vibe AI</h2>
          <p className="text-blue-100 text-lg">Transform your agency operations and drive exceptional results for your clients with our comprehensive AI solutions.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={benefit.id}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-14 w-14 bg-accent rounded-full flex items-center justify-center mb-6">
                {getIconComponent(benefit.icon)}
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">{benefit.title}</h3>
              <p className="text-blue-100">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
