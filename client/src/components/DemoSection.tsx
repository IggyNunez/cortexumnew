import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const DemoSection = () => {
  const capabilities = [
    "Engage visitors with natural conversation",
    "Qualify leads by asking relevant questions",
    "Answer questions about your services",
    "Schedule consultations without human intervention",
    "Provide personalized voice responses"
  ];

  const sampleQuestions = [
    "How can AI improve my agency's workflow?",
    "What services do you offer for marketing agencies?",
    "How much can AI increase my revenue?",
    "Can you help with client retention?"
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            See Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI in Action</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Experience how our AI solutions can transform your marketing agency with this interactive demo.
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Meet Our AI Assistant</h3>
            <p className="text-gray-600 mb-6">
              This demo showcases our Hume API-powered conversational AI that can:
            </p>
            <ul className="space-y-3 mb-8">
              {capabilities.map((capability, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <CheckCircle className="text-emerald-500 mt-1 mr-3 h-5 w-5" />
                  <span>{capability}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-bold mb-2">Try asking:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sampleQuestions.map((question, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded text-sm">"{question}"</div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Marketing team reviewing AI analytics dashboard" 
              className="rounded-xl shadow-xl w-full"
            />
            
            <motion.div 
              className="mt-6 bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold">AI Assistant Preview</h4>
                <div className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">Online</div>
              </div>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg h-32 overflow-y-auto">
                <div className="flex mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2">AI</div>
                  <div className="bg-primary/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hi there! I'm your AI assistant. How can I help your marketing agency today?</p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type your question here..." 
                  className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white p-3 rounded-r-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
