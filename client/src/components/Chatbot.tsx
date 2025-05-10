import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Mic, Send } from "lucide-react";
import { nanoid } from "nanoid";
import { createSessionId, sendChatMessage, generateBotResponse, generateSpeech, synthesizeSpeech } from "@/lib/humeApi";
import { useHumeSpeech } from "@/hooks/useHumeSpeech";

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isPlaying, playAudio, stopAudio } = useHumeSpeech();

  useEffect(() => {
    // Initialize a new session ID if one doesn't exist
    if (!sessionId) {
      setSessionId(createSessionId());
    }
  }, [sessionId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      const welcomeMessage: ChatMessage = {
        sender: 'bot',
        message: "👋 Hi there! I'm your AI assistant. I can help answer questions about our AI solutions for marketing agencies. How can I help you today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      message: message.trim(),
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Send the message to the API
      await sendChatMessage(sessionId, userMessage.message);
      
      // Generate bot response
      const botResponse = await generateBotResponse(sessionId, userMessage.message);
      
      setMessages(prevMessages => [...prevMessages, {
        sender: 'bot',
        message: botResponse.message,
        timestamp: new Date(botResponse.timestamp || new Date())
      }]);

      // Speak the response if needed
      synthesizeSpeech(botResponse.message);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => [...prevMessages, {
        sender: 'bot',
        message: "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Here you would process the audio recording and send it to Hume API
      // For now, we'll just pretend
      setMessage("I'd like to learn more about AI chatbots for lead generation.");
    } else {
      // Start recording
      setIsRecording(true);
      setMessage("Recording... (speak now)");
    }
  };

  return (
    <>
      {/* Chatbot button */}
      {!isOpen && (
        <motion.button
          className="hidden md:flex fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg p-4 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChatbot}
          aria-label="Open AI assistant chat"
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      )}

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`hidden md:block fixed z-50 overflow-hidden rounded-xl shadow-2xl bg-white ${
              isExpanded 
                ? "bottom-4 right-4 left-4 top-20" 
                : "bottom-4 right-4 w-96 h-[550px]"
            }`}
          >
            {/* Chatbot header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3" />
                <h3 className="font-bold text-white text-with-shadow">AI Assistant</h3>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleExpand}
                  className="hover:bg-white/20 rounded p-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                  aria-label={isExpanded ? "Minimize chatbot window" : "Maximize chatbot window"}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleChatbot}
                  className="hover:bg-white/20 rounded p-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                  aria-label="Close chatbot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-128px)]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="text-base leading-relaxed font-medium">{msg.message}</p>
                    <div
                      className={`text-xs mt-2 ${
                        msg.sender === "user" ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                <button 
                  onClick={handleVoiceRecording}
                  className={`p-2 ${isRecording ? 'text-red-500' : 'text-gray-500'} hover:text-primary transition-colors`}
                  aria-label="Voice Input"
                >
                  <Mic className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-3 bg-transparent border-none focus:outline-none"
                  disabled={isLoading || isRecording}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={message.trim() === "" || isLoading}
                  className={`p-2 ${
                    message.trim() === "" || isLoading
                      ? "text-gray-400"
                      : "text-primary hover:text-primary/80"
                  } transition-colors`}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="text-center mt-2 text-xs text-gray-500">
                {isPlaying ? (
                  <button 
                    onClick={stopAudio}
                    className="text-primary hover:underline"
                  >
                    Stop Audio
                  </button>
                ) : (
                  "Voice-enabled AI powered by Hume API"
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;