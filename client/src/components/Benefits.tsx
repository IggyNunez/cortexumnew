import { motion } from "framer-motion";
import { Check } from "lucide-react";

const benefits = [
  {
    icon: "fa-chart-line",
    title: "Increased Revenue",
    description: "Boost your agency's profit margins by automating routine tasks and delivering premium AI-powered services.",
    items: [
      "Up to 40% higher client retention rates",
      "Expand service offerings without adding staff"
    ]
  },
  {
    icon: "fa-bolt",
    title: "Enhanced Efficiency",
    description: "Reduce time spent on repetitive tasks by leveraging AI automation for content creation, reporting, and analysis.",
    items: [
      "Save 15-20 hours per week on routine tasks",
      "Focus on strategy and client relationships"
    ]
  },
  {
    icon: "fa-users",
    title: "Better Client Results",
    description: "Deliver data-driven campaigns and personalized marketing strategies powered by advanced AI analytics.",
    items: [
      "Improve conversion rates by 25-30%",
      "Create hyper-personalized customer journeys"
    ]
  },
  {
    icon: "fa-rocket",
    title: "Competitive Edge",
    description: "Stay ahead of competitors by offering innovative AI-powered solutions your clients can't find elsewhere.",
    items: [
      "Differentiate your agency in a crowded market",
      "Command premium pricing for advanced services"
    ]
  },
  {
    icon: "fa-brain",
    title: "AI-Powered Insights",
    description: "Uncover hidden opportunities and patterns in your data that human analysis might miss.",
    items: [
      "Predict market trends before they emerge",
      "Optimize ad spend with precision targeting"
    ]
  },
  {
    icon: "fa-expand-arrows-alt",
    title: "Scalable Operations",
    description: "Handle more clients and projects without proportionally increasing your team size or costs.",
    items: [
      "Grow revenue without expanding headcount",
      "Consistent quality across all client accounts"
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Upgrade Your Agency with AI?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Unlock powerful capabilities that drive growth, efficiency, and client satisfaction.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              variants={item}
            >
              <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center mb-6">
                <i className={`fas ${benefit.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 mb-4">{benefit.description}</p>
              <ul className="space-y-2">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-green-500 mt-1 mr-2">
                      <Check size={16} />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
