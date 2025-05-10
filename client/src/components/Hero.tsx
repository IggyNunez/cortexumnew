import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="animate-slide-up"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Transform Your Agency with <span className="gradient-text">AI-Powered Marketing</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Elevate your marketing agency with cutting-edge AI automation. Increase revenue, improve client satisfaction, and stay ahead of competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="text-center gradient-bg text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
              Elevate Your Agency Now
            </a>
            <a href="#contact" className="text-center bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold text-lg hover:bg-primary/5 transition duration-300">
              Chat with AI Assistant
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
            alt="Marketing professionals using AI technology" 
            className="rounded-xl shadow-2xl w-full h-auto object-cover" 
          />
          <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse-slow mr-2"></div>
              <p className="text-sm font-medium">AI-powered growth: <span className="font-bold text-green-500">+147% ROI</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
