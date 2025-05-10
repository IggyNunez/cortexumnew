import { motion } from "framer-motion";
import { LineChart, MousePointerClick, Layers, Brain } from "lucide-react";

const WhyHireUsSection = () => {
  return (
    <section className="py-16 bg-gray-50" id="why-hire-us">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-50 border-2 border-blue-400 rounded-lg px-4 py-1 mb-4">
            <p className="text-blue-700 font-medium text-sm">$200 MILLION+ IN MANAGED AD SPEND</p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Digital Growth Architects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Cortexuum, we're more than just a digital marketing agency; we're your partners in online success. Specializing in media buying, funnel building, and offer creation, we're dedicated to propelling businesses into digital excellence.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Founder Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl col-span-1 lg:col-span-2 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img 
                  src="/assets/christian-colgate.webp" 
                  alt="Christian Colgate" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Christian Colgate</h3>
                <p className="text-blue-600 text-sm font-medium uppercase mb-4">FOUNDER</p>
                <p className="text-gray-700">
                  As a digital growth architect, Christian combines extensive marketing expertise with data-driven strategies to help businesses achieve exceptional results. With a proven track record managing over $200 million in ad spend, he's dedicated to creating marketing solutions that deliver real impact.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Media Buying */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-blue-50 p-6">
              <MousePointerClick className="h-12 w-12 text-blue-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Media Buying</h3>
              <p className="text-gray-500 text-sm">Facebook, Google & YouTube</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                Our expert media buying services combine sophisticated targeting with creative strategies across major platforms to maximize engagement, conversions, and ROI for your campaigns.
              </p>
            </div>
          </motion.div>
          
          {/* Psychology Based */}
          <motion.div 
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-blue-50 p-6">
              <Brain className="h-12 w-12 text-blue-600 mb-2" />
              <h3 className="text-xl font-bold text-gray-900">Psychology Based</h3>
              <p className="text-gray-500 text-sm">Data-Driven Approach</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                We leverage psychological insights and consumer behavior data to craft marketing messages that resonate on a deeper level, driving higher engagement and conversion rates.
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">FOUNDATIONAL. DATA-DRIVEN. SURE.</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Expert media buying with advanced targeting strategies</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Custom funnel development for smooth customer journeys</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Psychology-based marketing that connects with your audience</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Data-driven decision making for optimal campaign performance</span>
              </li>
              <li className="flex items-start">
                <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                  <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">Strategic offer creation that resonates with your target market</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4 shadow-md">
              <div className="flex items-start">
                <div className="shrink-0 mr-4">
                  <div className="p-2 bg-blue-100 rounded-full border border-blue-300">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-blue-700 text-lg">Drive Revenue with Precision Ads & Funnels</h4>
                  <p className="text-gray-700 font-medium mb-2">
                    Cortexuum unlocks a powerful opportunity to elevate your product or service, instantly captivating your ideal audience.
                  </p>
                  <p className="text-blue-800 mb-3 font-semibold text-sm">
                    There will always be a guru or other agency telling you what the new method on the street is. The truth is, the game doesn't change, only the players. Trust in data-driven solutions that beat opinions, every time.
                  </p>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <span className="text-blue-700 font-bold">Ready to see results?</span>
                    <a 
                      href="https://calendly.com/cortexuummarketing/30min"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center"
                    >
                      BOOK A CALL
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireUsSection;