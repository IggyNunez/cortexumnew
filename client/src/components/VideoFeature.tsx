import { motion } from "framer-motion";
import { Info } from "lucide-react";

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
            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ aspectRatio: '9/16' }}
          >
            {/* Simple HTML Video with poster and controls */}
            <video
              controls
              poster="/poster-image.jpg"
              preload="metadata"
              className="w-full h-full"
              style={{ aspectRatio: '9/16' }}
            >
              <source src="/AI Agents For Small Business - Mark Zuckerberg.publer.com.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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