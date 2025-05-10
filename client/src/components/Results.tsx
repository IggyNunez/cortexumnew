import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Results = () => {
  const stats = [
    { value: "147%", label: "Average ROI", description: "Agencies see significant return on their AI investment within the first 6 months." },
    { value: "68%", label: "Time Saved", description: "Reduction in time spent on repetitive tasks through AI automation." },
    { value: "41%", label: "Revenue Growth", description: "Average increase in agency revenue after implementing our AI solutions." }
  ];

  const benefits = [
    "Automate repetitive marketing tasks",
    "Create high-quality content in seconds",
    "Generate leads 24/7 with AI chatbots",
    "Optimize campaigns with data-driven insights",
    "Scale your operations without adding staff"
  ];

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Results for Agencies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">See the impact our AI solutions can deliver for agencies like yours</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <p className="text-xl font-semibold mb-4">{stat.label}</p>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* AI Benefits */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">AI TRANSFORMATION</div>
              <h3 className="text-2xl font-bold mb-4">How Your Agency Can Benefit From AI Automation</h3>
              <p className="text-gray-700 mb-6">
                Marketing agencies of all sizes are leveraging AI to streamline operations, enhance client deliverables, and boost revenue. Our AI solutions can help you:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 text-primary">
                    <span className="font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="#contact" 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
              >
                Learn How We Can Help Your Agency <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Results;
