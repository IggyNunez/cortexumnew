import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Volume2, Mic } from "lucide-react";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { synthesizeSpeech } from "@/lib/humeApi";

// Define message types
type MessageType = 'user' | 'assistant';

interface AssistantMessage {
  type: MessageType;
  text: string;
}

const Hero = () => {
  const [isLoadingVoice, setIsLoadingVoice] = useState(false);
  const [question, setQuestion] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([
    { 
      type: "user", 
      text: "How can AI automation help my marketing agency?" 
    },
    { 
      type: "assistant", 
      text: "Our AI solutions automate repetitive tasks, improve campaign performance with data-driven insights, and help you scale your agency without increasing headcount. This leads to higher margins and better client results." 
    },
    { 
      type: "user", 
      text: "What's the typical ROI of your AI implementation?" 
    },
    { 
      type: "assistant", 
      text: "Our clients typically see a 30-40% increase in operational efficiency and a 25-35% improvement in campaign performance metrics within the first 3 months of implementation." 
    }
  ]);

  const handleSendQuestion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Save current question before clearing input
    const currentQuestion = question;
    
    // Add user question to messages
    const newUserMessage: AssistantMessage = { type: "user", text: currentQuestion };
    setAssistantMessages(prev => [...prev, newUserMessage]);
    
    // Clear input
    setQuestion("");
    
    // Simulate AI assistant thinking
    setTimeout(() => {
      // Generate a response based on the question
      let response = "";
      const lowerQuestion = currentQuestion.toLowerCase();
      
      if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("payment")) {
        response = "Our AI solutions start at $2,500/month for basic implementations, with custom pricing based on your agency's specific needs and scale. We offer flexible pricing packages with ROI guarantees.";
      } 
      else if (lowerQuestion.includes("integration") || lowerQuestion.includes("setup") || lowerQuestion.includes("implement")) {
        response = "Implementation typically takes 2-4 weeks. Our team handles the full integration process, including setup, training, and optimization - ensuring minimal disruption to your current workflows.";
      }
      else if (lowerQuestion.includes("services") || lowerQuestion.includes("offer") || lowerQuestion.includes("solution")) {
        response = "We offer AI-powered automation for content creation, client reporting, data analysis, lead generation, and campaign optimization - all tailored to marketing agencies.";
      }
      else if (lowerQuestion.includes("voice") || lowerQuestion.includes("elevenlabs") || lowerQuestion.includes("assistant")) {
        response = "Our voice-enabled AI assistants use advanced technology for natural-sounding text-to-speech. We can implement this technology for your agency and customize it for your clients' specific needs and branding.";
      }
      else if (lowerQuestion.includes("create") || lowerQuestion.includes("how") || lowerQuestion.includes("get")) {
        response = "To create your own AI assistant like this one, simply fill out our application form below. We'll customize the voice, responses, and branding to match your agency's needs and help you implement it for your clients.";
      }
      else {
        response = "That's a great question! Our team would be happy to provide more details during a personalized consultation. Would you like to schedule a call with our AI specialists?";
      }
      
      // Add AI response to messages
      const newAssistantMessage: AssistantMessage = { type: "assistant", text: response };
      setAssistantMessages(prev => [...prev, newAssistantMessage]);
      
      // Auto-play the voice response
      handleSpeakMessage(response);
    }, 1000);
  };

  const handleSpeakMessage = async (text: string) => {
    try {
      setIsLoadingVoice(true);
      await synthesizeSpeech(text);
    } catch (error) {
      console.error("Error speaking message:", error);
    } finally {
      setIsLoadingVoice(false);
    }
  };
  
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white text-on-gradient">
              Elevate Your Marketing Agency with <span className="text-white font-extrabold">AI Automation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-medium text-with-shadow">
              Custom AI solutions to help marketing agencies boost efficiency, scale operations, and deliver superior client results.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <a href="#contact">Schedule a Consultation</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 rounded-full font-bold text-base focus:ring-2 focus:ring-white focus:ring-offset-2 bg-white/10"
              >
                <a href="#services">Explore Solutions</a>
              </Button>
            </div>
            <div className="mt-12 flex items-center text-sm">
              <p className="text-white/80">
                Trusted by <span className="font-bold">25+ marketing agencies</span> worldwide
              </p>
            </div>
            <div className="mt-4 text-xs text-white/70 italic">
              <span className="font-medium">This website was created using AI automation and generative technology.</span>
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
                  <h3 className="font-bold text-lg">Voice-enabled AI Assistant</h3>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="text-gray-500 text-sm">Powered by VibeAgency.ai</p>
                      <span className="ml-2 bg-gray-100 text-xs px-1.5 py-0.5 rounded text-gray-600 font-medium">ElevenLabs Voice</span>
                    </div>
                    <a 
                      href="#contact" 
                      className="text-primary text-xs font-medium hover:underline mt-1"
                    >
                      Learn how to create one for you and your clients →
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {assistantMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`${
                      message.type === "user" 
                        ? "bg-gray-100 rounded-2xl p-4 rounded-tl-none max-w-[80%]" 
                        : "bg-primary/10 rounded-2xl p-4 rounded-tr-none max-w-[80%] ml-auto relative"
                    }`}
                  >
                    <p className="text-gray-800">
                      {message.text}
                    </p>
                    {message.type === "assistant" && (
                      <button 
                        className={`absolute -right-2 -bottom-2 bg-white text-primary rounded-full p-1.5 border border-gray-200 shadow-sm hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary ${isLoadingVoice ? 'animate-pulse' : ''}`}
                        onClick={() => handleSpeakMessage(message.text)}
                        disabled={isLoadingVoice}
                        aria-label="Play voice"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendQuestion} className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about our AI solutions..." 
                  className="w-full p-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={question}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </form>
              
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