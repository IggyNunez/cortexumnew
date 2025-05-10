import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden bg-dot-pattern">
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-accent/10 to-transparent rounded-bl-full opacity-50"
        style={{ backgroundImage: 'radial-gradient(#2563eb22 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Agency</span> with AI-Powered Marketing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your marketing agency with cutting-edge AI solutions that drive revenue, automate workflows, and deliver exceptional results for your clients.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                <a href="#services">Explore Solutions</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white text-primary border-2 border-primary font-semibold py-6 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                <a href="#demo">See Demo</a>
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Marketing agency team using AI tools" 
              className="rounded-xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
