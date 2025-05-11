import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import christianColgate from '../assets/christian-colgate.webp';

const Hero = () => {
  return (
    <section id="hero" className="pt-28 pb-20 bg-gradient-to-br from-[#0d1117] to-[#16213e] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white text-on-gradient">
              Transform Your Business with <span className="text-white font-extrabold">AI-Powered Marketing</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-medium text-with-shadow">
              Custom AI Agents & Psychology-Based Marketing Strategies That Outperform Traditional Approaches.
            </p>
            <div className="mt-2 mb-6">
              <p className="text-lg text-blue-100">
                <span className="font-bold text-white">INTELLIGENT AI SOLUTIONS BEAT GENERIC MARKETING. EVERY TIME.</span>
              </p>
              <p className="text-md text-blue-100 mt-1">
                With proprietary AI models trained on psychological principles, we're redefining what's possible.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.03, 1],
                  boxShadow: ["0 4px 6px rgba(230, 62, 139, 0.2)", "0 10px 15px rgba(230, 62, 139, 0.3)", "0 4px 6px rgba(230, 62, 139, 0.2)"] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#E63E8B] text-white hover:bg-[#E63E8B]/90 rounded-full font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-[#E63E8B] focus:ring-offset-2"
                >
                  <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer">BOOK A CALL NOW</a>
                </Button>
              </motion.div>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#B485FF] text-white hover:bg-[#B485FF]/20 rounded-full font-bold text-base focus:ring-2 focus:ring-[#B485FF] focus:ring-offset-2 bg-[#B485FF]/10"
              >
                <a href="#services">Our Services</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center text-sm">
              <p className="text-white/80">
                Trusted by <span className="font-bold">top businesses</span> worldwide
              </p>
            </div>
            <div className="mt-4 text-xs text-white/70">
              <span className="font-medium">At Cortexuum, we're your partners in online success.</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <a 
              href="https://calendly.com/cortexuummarketing/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-lg mx-auto cursor-pointer hover:shadow-xl transition-all block"
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img 
                    src={christianColgate} 
                    alt="Christian Colgate" 
                    className="w-16 h-16 rounded-full object-cover object-center border-2 border-[#E63E8B] mr-4"
                  />
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-[#E63E8B] flex items-center justify-center text-white shadow-md">
                    <Bot className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Marketing Specialist</h3>
                  <div className="mt-3 mb-2 flex items-center">
                    <span className="bg-[#B485FF]/20 text-xs px-2 py-0.5 rounded-full text-[#B485FF] font-medium inline-flex items-center">
                      <Bot className="h-3 w-3 mr-1" />
                      AI-Powered
                    </span>
                  </div>
                  <span className="text-[#E63E8B] text-sm font-medium block mt-3">
                    Book a consultation →
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[80%]">
                  <p className="text-gray-800">
                    What AI marketing services do you offer?
                  </p>
                </div>
                <div className="bg-blue-600/10 rounded-2xl p-4 rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-gray-800">
                    We specialize in AI-powered marketing solutions including AI content generation, intelligent media buying, custom AI agents for business, and predictive analytics.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full p-4 pr-12 rounded-full border border-gray-200 bg-gray-50 text-gray-600 font-medium">
                  Schedule a consultation to learn more
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#E63E8B] text-white h-8 w-8 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </a>
            
            <motion.div 
              className="absolute top-1/4 right-0 w-12 h-12 rounded-full bg-white/20 z-0"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-0 w-8 h-8 rounded-full bg-white/10 z-0"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;