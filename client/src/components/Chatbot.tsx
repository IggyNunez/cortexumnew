import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Maximize2, Minimize2, Mic, Send, Volume2, VolumeX } from "lucide-react";
import { nanoid } from "nanoid";
import { createSessionId, sendChatMessage, generateBotResponse, synthesizeSpeech } from "@/lib/humeApi";
import { useHumeSpeech } from "@/hooks/useHumeSpeech";

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
    // Initialize a new session ID if one doesn't exist
    if (!sessionId) {
      setSessionId(createSessionId());
    }
  }, [sessionId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  // Handle recognized text from voice input
  useEffect(() => {
    if (recognizedText && !isRecording) {
      setMessage(recognizedText);
      // Auto-send if we have recognized text
      setTimeout(() => {
        if (recognizedText.trim() !== "") {
          handleSendMessage(recognizedText);
        }
      }, 500);
    }
  }, [recognizedText, isRecording]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      const welcomeMessage: ChatMessage = {
        sender: 'bot',
        message: "Hi there! Welcome to Cortexuum Marketing. I'm Bella, and I'd love to help your business with our psychology-based marketing approach. What brings you to our site today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Speak the welcome message if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakMessage(welcomeMessage.message), 500);
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      stopAudio();
      setIsSpeaking(false);
    }
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
    const messageToSend = overrideMessage || message;
    if (messageToSend.trim() === "" || isLoading) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      message: messageToSend.trim(),
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
      
      const botMessage = {
        sender: 'bot' as const,
        message: botResponse.message,
        timestamp: new Date(botResponse.timestamp || new Date())
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);

      // Speak the response if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => speakMessage(botResponse.message), 300);
      }
      
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

  const handleVoiceRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      setMessage("Listening...");
      await startRecording();
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
            <div className="bg-gradient-to-r from-[#357BD8] via-[#B485FF] to-[#E63E8B] text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3" />
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
                        ? "bg-[#E63E8B] text-white rounded-tr-none"
                        : "bg-[#F3F4FF] text-gray-800 rounded-tl-none border border-[#B485FF]/20"
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
                  <div className="bg-[#B485FF]/20 text-[#B485FF] rounded-full px-4 py-1 text-sm font-medium flex items-center">
                    <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
                    Speaking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-[#B485FF]/10">
              <div className="flex items-center bg-[#F3F4FF] rounded-full overflow-hidden shadow-sm border border-[#B485FF]/20">
                <button 
                  onClick={handleVoiceRecording}
                  className={`p-3 ${isRecording ? 'text-[#E63E8B] animate-pulse' : 'text-gray-600'} hover:text-[#357BD8] transition-colors focus:outline-none`}
                  aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
                >
                  <Mic className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={isRecording ? "Listening..." : "Type your message..."}
                  className="flex-1 py-3 px-3 bg-transparent border-none focus:outline-none text-gray-800 text-base"
                  disabled={isLoading || isRecording}
                />
                <button
                  onClick={() => {
                    if (message.trim() !== "" && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                  disabled={message.trim() === "" || isLoading}
                  className={`p-3 ${
                    message.trim() === "" || isLoading
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
    </>
  );
};

export default Chatbot;