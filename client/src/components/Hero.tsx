import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="pt-28 pb-20 bg-gradient-to-br from-primary to-accent overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Elevate Your Marketing Agency with <span className="text-accent-foreground">AI Automation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Custom AI solutions to help marketing agencies boost efficiency, scale operations, and deliver superior client results.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#contact">Schedule a Consultation</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full font-semibold"
              >
                <a href="#services">Explore Solutions</a>
              </Button>
            </div>
            <div className="mt-12 flex items-center text-sm">
              <div className="flex -space-x-2 mr-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-white/80">
                Trusted by <span className="font-bold">25+ marketing agencies</span> worldwide
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-lg mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <p className="text-gray-500 text-sm">Powered by Hume API</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[80%]">
                  <p className="text-gray-800">How can AI automation help my marketing agency?</p>
                </div>
                
                <div className="bg-primary/10 rounded-2xl p-4 rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-gray-800">
                    Our AI solutions automate repetitive tasks, improve campaign performance with data-driven insights, and help you scale your agency without increasing headcount. This leads to higher margins and better client results.
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[80%]">
                  <p className="text-gray-800">What's the typical ROI of your AI implementation?</p>
                </div>
                
                <div className="bg-primary/10 rounded-2xl p-4 rounded-tr-none max-w-[80%] ml-auto">
                  <p className="text-gray-800">
                    Our clients typically see a 30-40% increase in operational efficiency and a 25-35% improvement in campaign performance metrics within the first 3 months of implementation.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about our AI solutions..." 
                  className="w-full p-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-1/4 right-0 w-12 h-12 rounded-full bg-white/20 z-0"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-1/3 left-0 w-8 h-8 rounded-full bg-white/10 z-0"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;