import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types";
import { 
  Bot, 
  X, 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send 
} from "lucide-react";

const initialMessage: Message = {
  id: nanoid(),
  text: "Hi there! I'm the Vibe AI Assistant. I can help answer questions about our services and how we can help your marketing agency leverage AI automation. What would you like to know?",
  isBot: true,
  timestamp: new Date()
};

const ChatbotWidget = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // For speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // For speech synthesis
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Get visitor ID from localStorage or create one
  const getVisitorId = () => {
    return localStorage.getItem('visitorId') || nanoid();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Event listener for external open requests
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsChatbotOpen(true);
    };

    window.addEventListener("openChatbot", handleOpenChatbot);
    return () => window.removeEventListener("openChatbot", handleOpenChatbot);
  }, []);
  
  // Initialize Web Speech API
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "There was an error with voice recognition. Please try again or type your message.",
          variant: "destructive"
        });
      };
    }
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = new SpeechSynthesisUtterance();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [toast]);

  // Save conversation to the server
  const saveConversation = async (message: string, isBot: boolean) => {
    try {
      await apiRequest("POST", "/api/conversations", {
        visitor_id: getVisitorId(),
        message_text: message,
        is_bot: isBot
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  // Generate AI response (mock implementation)
  const generateResponse = async (userMessage: string): Promise<string> => {
    // In a real implementation, this would call the Hume API for natural language understanding
    // For now, we'll use a simple keyword-based response system
    
    const messageLower = userMessage.toLowerCase();
    
    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('pricing')) {
      return "Our pricing starts at $1,500/month for our basic AI integration package. For a custom quote based on your agency's specific needs, we'd be happy to schedule a consultation.";
    } else if (messageLower.includes('service') || messageLower.includes('offer') || messageLower.includes('help')) {
      return "We offer AI integration services, AI strategy training, and ongoing AI consulting for marketing agencies. Our solutions help with content creation, customer segmentation, campaign optimization, and more.";
    } else if (messageLower.includes('demo') || messageLower.includes('show') || messageLower.includes('presentation')) {
      return "We'd be happy to provide a demo of our AI solutions! Please provide your name, company, and email address, and we'll arrange a personalized demonstration.";
    } else if (messageLower.includes('contact') || messageLower.includes('email') || messageLower.includes('phone') || messageLower.includes('call')) {
      return "You can reach our team at hello@vibeai.com or call us at (800) 555-1234. Alternatively, fill out the contact form on this page for a personalized consultation.";
    } else {
      return "Thanks for your message! To best assist you, I'd love to know more about your agency and your specific needs. Could you tell me about your current operations and what you're looking to achieve with AI automation?";
    }
  };
  
  // Synthesize speech using Hume API (mock implementation)
  const synthesizeSpeech = useMutation({
    mutationFn: async (text: string) => {
      // In a real implementation, call the Hume API for advanced voice synthesis
      // For now, we'll use the browser's built-in speech synthesis
      if (window.speechSynthesis && synthesisRef.current) {
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        
        synthesisRef.current.text = text;
        synthesisRef.current.lang = 'en-US';
        synthesisRef.current.rate = 1.0;
        synthesisRef.current.pitch = 1.0;
        
        window.speechSynthesis.speak(synthesisRef.current);
        
        // Log API call for demonstration
        await apiRequest("POST", "/api/synthesize", { text });
      }
    },
    onError: (error) => {
      console.error("Speech synthesis error:", error);
      toast({
        title: "Speech Synthesis Error",
        description: "There was an error generating the voice response.",
        variant: "destructive",
      });
    }
  });

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!currentMessage.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: nanoid(),
      text: currentMessage,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    saveConversation(currentMessage, false);
    setCurrentMessage("");
    setIsProcessing(true);
    
    try {
      // Add a slight delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 700));
      
      const responseText = await generateResponse(userMessage.text);
      
      const botMessage: Message = {
        id: nanoid(),
        text: responseText,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      saveConversation(responseText, true);
      
      // Synthesize the response after a small delay
      setTimeout(() => {
        synthesizeSpeech.mutate(responseText);
      }, 300);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Available",
        description: "Voice recognition is not available in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Container */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div 
            className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col w-80 sm:w-96 max-h-[32rem] absolute bottom-20 right-0"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chatbot Header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white">Vibe AI Assistant</h3>
                  <p className="text-blue-200 text-sm">How can I help you?</p>
                </div>
              </div>
              <button 
                onClick={handleCloseChatbot} 
                className="text-white hover:text-blue-200 transition-colors"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chatbot Messages */}
            <div className="flex-1 p-4 overflow-y-auto scroll-hidden">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex items-start ${!message.isBot ? 'justify-end' : ''}`}
                  >
                    {message.isBot && (
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={`p-3 max-w-[80%] ${
                        message.isBot 
                          ? 'bg-gray-100 rounded-lg rounded-tl-none' 
                          : 'bg-primary rounded-lg rounded-tr-none text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Chatbot Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    ref={chatInputRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your message..." 
                    className="w-full pr-10 py-3 px-4 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    disabled={isProcessing}
                  />
                  <button 
                    type="button" 
                    onClick={handleVoiceInput}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                    aria-label={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? (
                      <MicOff className="h-5 w-5 text-red-500 animate-pulse" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-r-lg transition-colors"
                  disabled={isProcessing || !currentMessage.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Powered by Hume AI for natural conversations
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chatbot Button */}
      <motion.button 
        onClick={handleOpenChatbot}
        className="bg-primary hover:bg-primary-dark text-white h-16 w-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chatbot"
      >
        <MessageSquare className="h-7 w-7" />
      </motion.button>
    </div>
  );
};

export default ChatbotWidget;
