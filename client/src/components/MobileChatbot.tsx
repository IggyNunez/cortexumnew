import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Send, Volume2, VolumeX } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    isPlaying, 
    stopAudio, 
    isRecording, 
    startRecording, 
    stopRecording, 
    recognizedText 
  } = useHumeSpeech();

  useEffect(() => {
    // Initialize a session if needed
    if (!sessionId) {
      setSessionId(createSessionId());
    }

    // Add welcome message if this is a new chat
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: nanoid(),
        content: "Hi there! Welcome to Cortexuum Marketing. I'm Dorothy, and I'd love to help your business leverage our psychology-based marketing strategies. What brings you to our site today?",
        isUser: false,
      };
      
      setMessages([welcomeMessage]);
      
      // Speak the welcome message if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakMessage(welcomeMessage.content), 500);
      }
    }
  }, [isOpen, messages.length, sessionId, voiceEnabled]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Handle recognized text from voice input
  useEffect(() => {
    if (recognizedText && !isRecording) {
      setInputValue(recognizedText);
      // Auto-send if we have recognized text
      setTimeout(() => {
        if (recognizedText.trim() !== "") {
          handleSendMessage(recognizedText);
        }
      }, 500);
    }
  }, [recognizedText, isRecording]);

  const speakMessage = async (text: string) => {
    if (!voiceEnabled) return;
    
    try {
      setIsSpeaking(true);
      await synthesizeSpeech(text);
    } catch (error) {
      console.error("Error speaking message:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (overrideMessage?: string) => {
    const messageToSend = overrideMessage || inputValue;
    if (messageToSend.trim() === "" || isLoading) return;

    const userMessage: Message = {
      id: nanoid(),
      content: messageToSend.trim(),
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
      
      // Speak the response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakMessage(botResponse.content), 300);
      }
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

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      stopAudio();
      setIsSpeaking(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      setInputValue("Listening...");
      await startRecording();
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
          <div className="bg-gradient-to-r from-primary to-accent text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mr-3 shadow-sm">
                <Volume2 className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-white text-with-shadow">AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-3">
              {/* Voice toggle button */}
              <button
                onClick={toggleVoice}
                className="hover:bg-white/20 rounded p-1.5 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
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
                      ? "bg-[#E63E8B] text-white rounded-tr-none shadow"
                      : "bg-[#F3F4FF] text-gray-800 rounded-tl-none shadow-sm border border-[#B485FF]/20"
                  }`}
                >
                  <p className="text-base leading-relaxed font-medium">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-[#F3F4FF] text-gray-800 rounded-lg rounded-tl-none px-4 py-3 shadow-sm border border-[#B485FF]/20">
                  <div className="flex space-x-2">
                    <div className="h-2.5 w-2.5 bg-[#357BD8]/70 rounded-full animate-bounce"></div>
                    <div className="h-2.5 w-2.5 bg-[#B485FF]/70 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2.5 w-2.5 bg-[#E63E8B]/70 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            {isSpeaking && (
              <div className="flex justify-center mb-4">
                <div className="bg-[#B485FF]/10 text-[#B485FF] rounded-full px-4 py-1 text-sm font-medium flex items-center">
                  <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
                  Speaking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={handleVoiceInput}
                className={`p-3 ${isRecording ? "text-[#E63E8B] animate-pulse" : "text-gray-600"} hover:text-[#B485FF] transition-colors focus:outline-none`}
                aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
              >
                <Mic className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "Listening..." : "Type your message..."}
                className="flex-1 py-3 px-3 bg-transparent border-none focus:outline-none text-gray-800 text-base"
                disabled={isLoading || isRecording}
              />
              <button
                onClick={() => {
                  if (inputValue.trim() !== "" && !isLoading) {
                    handleSendMessage();
                  }
                }}
                disabled={inputValue.trim() === "" || isLoading}
                className={`p-3 ${
                  inputValue.trim() === "" || isLoading
                    ? "text-gray-400"
                    : "text-[#E63E8B] hover:text-[#E63E8B]/80"
                } transition-colors focus:outline-none`}
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center mt-3 text-xs text-gray-600 font-medium flex justify-center items-center">
              {isRecording ? (
                <span className="text-[#E63E8B] flex items-center">
                  <span className="inline-block h-2 w-2 bg-[#E63E8B] rounded-full mr-1 animate-pulse"></span>
                  Recording... Speak now
                </span>
              ) : isPlaying ? (
                <button 
                  onClick={stopAudio}
                  className="text-[#B485FF] hover:underline focus:outline-none font-bold"
                  aria-label="Stop audio playback"
                >
                  Stop Audio
                </button>
              ) : (
                <span>
                  {voiceEnabled ? "Voice-enabled AI assistant" : "Voice is disabled (click the speaker icon to enable)"}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileChatbot;