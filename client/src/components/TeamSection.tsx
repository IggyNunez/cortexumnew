import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain, Gauge, BarChart4, LineChart, LightbulbIcon, Users } from 'lucide-react';

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet the Expert Behind Cortexuum
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Driven by data and expertise, we bring cutting-edge psychology-based marketing solutions to businesses looking to maximize their impact.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="/christian-small.png" 
              alt="Christian Colgate - Founder" 
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900">Christian Colgate</h3>
            <p className="text-blue-600 font-medium text-lg">Founder & Media Buying Expert</p>
            
            <p className="text-gray-700">
              Christian Colgate is an accomplished entrepreneur and media buying expert with extensive experience in psychology-based marketing strategies. His unique approach combines cutting-edge AI technology with deep psychological insights to create marketing campaigns that drive exceptional results.
            </p>
            
            <p className="text-gray-700">
              With a background in cognitive psychology and digital marketing, Christian founded Cortexuum to help businesses leverage the power of psychology in their marketing efforts. His data-driven methodology has helped clients across various industries significantly improve their conversion rates and ROI.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Button asChild variant="outline" className="bg-white hover:bg-blue-50 border-blue-200">
                <a href="https://www.linkedin.com/in/christiancolgate" target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn
                </a>
              </Button>
                            
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="#contact">
                  Work with Christian
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Psychology Expert</h3>
            <p className="text-gray-600">
              Specializes in applying psychological principles to marketing strategies that drive conversions and engagement.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Gauge className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Media Optimization</h3>
            <p className="text-gray-600">
              Expert in optimizing media buying across all major platforms to maximize ROI and campaign effectiveness.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="p-3 bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <BarChart4 className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
            <p className="text-gray-600">
              Uses advanced data analysis to turn complex metrics into actionable marketing strategies with proven results.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;