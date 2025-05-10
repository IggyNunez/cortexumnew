import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, MessageCircle } from "lucide-react";

const HeroSection = () => {
  const { toast } = useToast();

  const handleOpenChatbot = () => {
    // Find and open the chatbot by dispatching a custom event
    window.dispatchEvent(new CustomEvent("openChatbot"));
    
    toast({
      title: "AI Assistant",
      description: "Our AI assistant is ready to help you!",
    });
  };

  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white pt-32 pb-16 clip-diagonal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Transform Your Agency with AI Automation
            </h1>
            <p className="text-xl text-blue-100">
              Upgrade your marketing agency with powerful AI solutions that boost productivity, increase revenue, and deliver exceptional results for your clients.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a 
                href="#contact" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-center"
              >
                Get Started
              </a>
              <button 
                onClick={handleOpenChatbot}
                className="bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl text-center"
              >
                <MessageCircle className="inline-block mr-2 h-5 w-5" /> Chat with AI
              </button>
            </div>
            <div className="pt-6">
              <p className="text-blue-100 flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" /> No credit card required
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Marketing team working with AI tools" 
              className="rounded-xl shadow-2xl relative z-10" 
            />
            <div className="absolute -bottom-4 -right-4 bg-accent p-4 rounded-lg shadow-lg z-20">
              <div className="text-lg font-semibold">Revenue Increase</div>
              <div className="text-3xl font-bold">+35%</div>
              <div className="text-sm">on average</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
