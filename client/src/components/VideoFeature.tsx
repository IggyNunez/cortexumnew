import { motion } from "framer-motion";
import { Info, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

// Import the Zuckerberg image
import markImage from "@assets/image_1746855805008.png";

const VideoFeature = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI for Business</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            See what Mark Zuckerberg has to say about AI agents revolutionizing small businesses
          </motion.p>
        </div>
        
        <div className="flex justify-center">
          <motion.div 
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Static Image with Quote */}
            <div className="bg-gradient-to-b from-blue-900 to-primary p-6 text-white">
              <div className="flex flex-col items-center">
                <img 
                  src={markImage} 
                  alt="Mark Zuckerberg discussing AI" 
                  className="w-full max-w-xs rounded-xl mb-6"
                />
                
                <blockquote className="text-lg italic mb-4 text-center">
                  "AI agents will become essential for small businesses to automate customer service, content creation, and marketing tasks."
                </blockquote>
                
                <p className="font-semibold text-center">- Mark Zuckerberg, Meta</p>
                
                <div className="mt-6">
                  <Button 
                    className="flex items-center gap-2 bg-white text-primary hover:bg-gray-100"
                    onClick={() => window.open("/AI Agents For Small Business - Mark Zuckerberg.publer.com.mp4", "_blank")}
                  >
                    Watch Full Video <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm flex items-center justify-center">
            <Info className="h-4 w-4 mr-1" /> Source: Meta's AI Agents for Small Business
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoFeature;