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
      text: "What marketing services do you offer?" 
    },
    { 
      type: "assistant", 
      text: "We specialize in data-driven marketing solutions including media buying (Facebook, Google, YouTube), funnel building, and custom offer creation. Our psychology-based approach ensures your campaigns connect with your audience for maximum impact and ROI." 
    },
    { 
      type: "user", 
      text: "What makes Cortexuum different from other agencies?" 
    },
    { 
      type: "assistant", 
      text: "With over $200 million in ad spend experience, we focus on data-driven strategies rather than opinions. We combine psychological insights with proven marketing techniques to craft campaigns that truly resonate with your target audience, delivering measurable results and growth." 
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
        response = "We offer custom pricing tailored to your specific marketing needs and business goals. Our packages are designed to deliver maximum ROI, and we're happy to discuss details during a consultation call.";
      } 
      else if (lowerQuestion.includes("setup") || lowerQuestion.includes("process") || lowerQuestion.includes("start")) {
        response = "Our process begins with a thorough analysis of your business and goals. We then develop a customized strategy leveraging our data-driven approach and psychology-based marketing techniques. Implementation typically begins within a week of our initial consultation.";
      }
      else if (lowerQuestion.includes("services") || lowerQuestion.includes("offer") || lowerQuestion.includes("solution")) {
        response = "We specialize in media buying across Facebook, Google, and YouTube, funnel building for optimized customer journeys, and custom offer creation that resonates with your audience. All our services integrate psychology-based marketing principles for maximum impact.";
      }
      else if (lowerQuestion.includes("funnel") || lowerQuestion.includes("website") || lowerQuestion.includes("landing page")) {
        response = "Our funnel buildouts are designed to guide potential customers from awareness to purchase seamlessly. We combine aesthetic design with powerful functionality to create responsive, high-converting funnels tailored to your specific business needs.";
      }
      else if (lowerQuestion.includes("results") || lowerQuestion.includes("roi") || lowerQuestion.includes("performance")) {
        response = "Our clients typically see significant improvements in conversion rates, customer acquisition costs, and overall ROI. With over $200 million in managed ad spend, we've consistently delivered results across diverse industries and markets.";
      }
      else {
        response = "That's a great question! Our team would be happy to provide more details during a personalized consultation. Would you like to book a call to discuss how we can help your business grow?";
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
    <section id="hero" className="pt-28 pb-20 bg-gradient-to-br from-blue-800 to-blue-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white text-on-gradient">
              Boost Your Online Impact with <span className="text-white font-extrabold">Expert Media & Funnels</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 font-medium text-with-shadow">
              Skyrocket Your Business with Custom Digital Solutions. Psychology-Based Marketing Strategies That Convert.
            </p>
            <div className="mt-2 mb-6">
              <p className="text-lg text-blue-100">
                <span className="font-bold text-white">DATA DRIVEN SOLUTIONS BEAT OPINIONS. EVERY TIME.</span>
              </p>
              <p className="text-md text-blue-100 mt-1">
                With over $200 million in ad spend, we aren't guessing - we're achieving.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-800 hover:bg-white/90 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <a href="https://calendly.com/cortexuummarketing/30min" target="_blank" rel="noopener noreferrer">BOOK A CALL</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 rounded-full font-bold text-base focus:ring-2 focus:ring-white focus:ring-offset-2 bg-white/10"
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
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 lg:p-8 max-w-lg mx-auto">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mr-4">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Marketing Intelligence Assistant</h3>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="text-gray-500 text-sm">Powered by Cortexuum</p>
                      <span className="ml-2 bg-blue-100 text-xs px-1.5 py-0.5 rounded text-blue-800 font-medium">Psychology Based</span>
                    </div>
                    <a 
                      href="https://calendly.com/cortexuummarketing/30min" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-xs font-medium hover:underline mt-1"
                    >
                      Book a call to discuss your marketing needs →
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
                        : "bg-blue-600/10 rounded-2xl p-4 rounded-tr-none max-w-[80%] ml-auto relative"
                    }`}
                  >
                    <p className="text-gray-800">
                      {message.text}
                    </p>
                    {message.type === "assistant" && (
                      <button 
                        className={`absolute -right-2 -bottom-2 bg-white text-blue-600 rounded-full p-1.5 border border-gray-200 shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoadingVoice ? 'animate-pulse' : ''}`}
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
                  placeholder="Ask about our marketing services..." 
                  className="w-full p-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={question}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </button>
              </form>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
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