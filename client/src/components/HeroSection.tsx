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
              <span className="inline-block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Don't Let Your Agency Fall Behind:</span> <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Act Now</span>
            </h1>
            <p className="text-xl text-blue-100 mt-4">
              Elite marketing agencies are already using AI to outperform competitors by <span className="font-bold text-amber-300">300%</span>. Our AI automation solutions deliver immediate productivity gains, increased revenue, and exceptional client results.
            </p>
            <p className="text-lg text-red-200 mt-2 font-medium">
              <span className="inline-block border-b-2 border-red-400">Time is running out</span> to secure your competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a 
                href="#contact" 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-center border border-amber-400 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Apply Now - Limited Spots</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <button 
                onClick={handleOpenChatbot}
                className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-center border border-white/30 text-white flex items-center justify-center"
              >
                <MessageCircle className="inline-block mr-2 h-5 w-5" /> 
                <span>Chat with AI Assistant</span>
              </button>
            </div>
            <div className="pt-6">
              <div className="bg-gradient-to-r from-red-500/30 to-amber-500/30 border-2 border-amber-400 rounded-lg p-4 mt-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <p className="text-white flex items-center font-bold text-lg">
                    <ShieldCheck className="mr-2 h-6 w-6 text-amber-300" /> 
                    <span className="bg-red-600/80 px-2 py-0.5 rounded">URGENT WARNING</span>
                  </p>
                  <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2 py-1 rounded-full uppercase">Time Sensitive</span>
                </div>
                <div className="mt-2 pl-8">
                  <p className="text-white font-semibold">The AI revolution is leaving agencies behind <span className="underline decoration-red-400 decoration-2">every single day</span></p>
                  <p className="text-amber-100 mt-2">
                    Early adopters are gaining <span className="font-bold text-white">200-300%</span> productivity advantages while others struggle. 
                    <span className="block mt-1">
                      <span className="bg-white text-red-600 px-2 py-0.5 rounded font-bold inline-block transform -rotate-1">Act within the next 30 days</span> 
                      <span className="ml-1">or risk being priced out of competition.</span>
                    </span>
                  </p>
                </div>
              </div>
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
