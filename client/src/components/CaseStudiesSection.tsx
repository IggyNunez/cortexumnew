import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CaseStudiesSection = () => {
  return (
    <section id="ai-automation" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Transform Your Agency with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-extrabold">AI Automation</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to scale your marketing agency with intelligent AI solutions? Let's talk about your specific needs.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-700">Content AI</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Content Creation</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Automate content creation across all channels while maintaining your brand voice and increasing engagement.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-primary font-bold text-xl">70%</div>
                  <div className="text-gray-700 text-sm font-medium">Time Saved on Content Creation</div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="text-primary font-bold flex items-center hover:underline focus:outline-none focus:text-primary-dark"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-700">Lead AI</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Lead Generation</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Implement intelligent chatbots and voice assistants that engage visitors 24/7 and convert them into qualified leads.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-primary font-bold text-xl">35%</div>
                  <div className="text-gray-700 text-sm font-medium">Increase in Lead Conversion</div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="text-primary font-bold flex items-center hover:underline focus:outline-none focus:text-primary-dark"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-700">Client AI</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-800">AI-Powered Client Management</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Automate reporting, client communication, and campaign optimization to deliver better results with less effort.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-primary font-bold text-xl">85%</div>
                  <div className="text-gray-700 text-sm font-medium">Reduction in Reporting Time</div>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="text-primary font-bold flex items-center hover:underline focus:outline-none focus:text-primary-dark"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Contact us to get started with AI automation"
          >
            Get Started with AI Automation <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;