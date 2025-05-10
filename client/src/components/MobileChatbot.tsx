import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Send, Volume2 } from "lucide-react";
import { nanoid } from "nanoid";
import { createSessionId, sendChatMessage, generateBotResponse, synthesizeSpeech } from "@/lib/humeApi";
import { useHumeSpeech } from "@/hooks/useHumeSpeech";

type Message = {
  content: string;
  isUser: boolean;
  id: string;
};

type MobileChatbotProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileChatbot = ({ isOpen, onClose }: MobileChatbotProps) => {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isPlaying, playAudio, stopAudio } = useHumeSpeech();

  useEffect(() => {
    // Initialize a session if needed
    if (!sessionId) {
      setSessionId(createSessionId());
    }

    // Add welcome message if this is a new chat
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: nanoid(),
          content: "👋 Hi there! I'm your AI assistant. I can help answer questions about our AI solutions for marketing agencies. How can I help you today?",
          isUser: false,
        },
      ]);
    }
  }, [isOpen, messages.length, sessionId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage: Message = {
      id: nanoid(),
      content: inputValue.trim(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Send message to API and get response
      await sendChatMessage(sessionId, userMessage.content);
      const response = await generateBotResponse(sessionId, userMessage.content);
      
      const botResponse: Message = {
        id: nanoid(),
        content: response.message,
        isUser: false,
      };
      
      setMessages((prev) => [...prev, botResponse]);
      
      // Speak the response using Hume API
      synthesizeSpeech(botResponse.content);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          content: "Sorry, I encountered an error processing your request. Please try again later.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Process voice input (simulate for now)
      setInputValue("Tell me more about AI chatbots for marketing.");
    } else {
      // Start recording
      setIsRecording(true);
      setInputValue("Recording... (speak now)");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Volume2 className="h-4 w-4" />
              </div>
              <h3 className="font-medium">AI Assistant (Voice-Enabled)</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-3 ${
                    message.isUser
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
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

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <button
                onClick={handleVoiceInput}
                className={`p-3 ${isRecording ? "text-red-500" : "text-gray-500"}`}
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 py-3 px-3 bg-transparent border-none focus:outline-none"
                disabled={isLoading || isRecording}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || isLoading}
                className={`p-3 ${
                  inputValue.trim() === "" || isLoading
                    ? "text-gray-400"
                    : "text-primary"
                }`}
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
  );
};

export default MobileChatbot;