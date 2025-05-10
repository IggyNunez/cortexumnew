import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Real <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Results</span> from Real Agencies
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore how marketing agencies have achieved measurable success with our AI solutions.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Case Study 1 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-64 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Marketing agency team celebrating successful campaign results" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6">
                  <span className="bg-primary text-white text-sm py-1 px-3 rounded-full">Digital Marketing Agency</span>
                  <h3 className="text-2xl font-bold text-white mt-2">300% ROI Increase for AdVenture</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                AdVenture Marketing implemented our AI-powered analytics solution and saw a 300% increase in client campaign ROI within just 90 days.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-primary">300%</span>
                  <span className="text-sm text-gray-500">ROI Increase</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-primary">45%</span>
                  <span className="text-sm text-gray-500">Cost Reduction</span>
                </div>
              </div>
              <a href="#contact" className="text-primary font-semibold flex items-center hover:underline">
                Read full case study <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
          
          {/* Case Study 2 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-64 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
                alt="Marketing consultants analyzing AI-generated data insights" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6">
                  <span className="bg-accent text-white text-sm py-1 px-3 rounded-full">Boutique Agency</span>
                  <h3 className="text-2xl font-bold text-white mt-2">5X Lead Generation for SmartMedia</h3>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                SmartMedia implemented our AI chatbot solution and saw their qualified lead generation increase by 500% while reducing acquisition costs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-accent">500%</span>
                  <span className="text-sm text-gray-500">More Leads</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-accent">62%</span>
                  <span className="text-sm text-gray-500">Lower CAC</span>
                </div>
              </div>
              <a href="#contact" className="text-primary font-semibold flex items-center hover:underline">
                Read full case study <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to transform your agency with AI?</h3>
              <p className="text-gray-600 mb-6">
                Join hundreds of forward-thinking agencies that are already leveraging our AI solutions to grow their business and deliver better results for their clients.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#contact">Schedule a Free Consultation</a>
              </Button>
            </div>
            <div className="lg:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400" 
                alt="Marketing team discussing AI implementation strategy" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
