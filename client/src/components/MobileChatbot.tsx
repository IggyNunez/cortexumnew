import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, X } from "lucide-react";
import { useHumeSpeech } from "@/hooks/useHumeSpeech";
import { createSessionId, sendChatMessage, generateBotResponse } from "@/lib/humeApi";

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
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "👋 Hi there! I'm your AI assistant from Vibe Marketing. How can I help your agency today?",
      isUser: false,
      id: "welcome"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRecording, startRecording, stopRecording, recognizedText, speak } = useHumeSpeech();

  // Initialize session ID
  useEffect(() => {
    setSessionId(createSessionId());
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle recognized text from speech recognition
  useEffect(() => {
    if (recognizedText) {
      setInputValue(recognizedText);
    }
  }, [recognizedText]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return;

    const userMessage: Message = {
      content: inputValue,
      isUser: true,
      id: `user-${Date.now()}`
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    try {
      // Send user message to the server
      await sendChatMessage(sessionId, userMessage.content);
      
      // Get bot response
      const botResponseData = await generateBotResponse(sessionId, userMessage.content);
      
      const botResponse: Message = {
        content: botResponseData.message,
        isUser: false,
        id: `bot-${Date.now()}`
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      // If voice is enabled, speak the response
      if (botResponse.content) {
        speak(botResponse.content);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      // Add error message
      setMessages(prev => [...prev, {
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        id: `error-${Date.now()}`
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="gradient-bg p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-robot mr-3"></i>
            AI Assistant
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-primary/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start ${message.isUser ? 'justify-end' : ''}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3 flex-shrink-0">
                  <i className="fas fa-robot text-sm"></i>
                </div>
              )}
              <div className={`${message.isUser 
                ? 'bg-primary/10 rounded-2xl rounded-tr-none' 
                : 'bg-gray-100 rounded-2xl rounded-tl-none'} p-4 max-w-xs`}>
                <p className="text-gray-800">{message.content}</p>
              </div>
              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ml-3 flex-shrink-0">
                  <i className="fas fa-user text-sm"></i>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className={`mr-3 ${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <Mic className="h-4 w-4" />
            </Button>
            
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1"
            />
            
            <Button 
              variant="default" 
              size="icon" 
              className="ml-3 bg-primary text-white"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileChatbot;
