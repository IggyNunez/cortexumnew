import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Mic, MicOff } from 'lucide-react';
import { 
  createSessionId, 
  sendChatMessage, 
  generateBotResponse, 
  setupSpeechRecognition,
  synthesizeSpeech 
} from '@/lib/humeApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Initialize speech recognition
  const speechRecognition = useRef(setupSpeechRecognition());

  // Initialize session ID and welcome message
  useEffect(() => {
    const newSessionId = createSessionId();
    setSessionId(newSessionId);
    
    // Add initial bot message
    setMessages([
      {
        sender: 'bot',
        message: '👋 Hi there! I\'m your AI assistant from Vibe Marketing. How can I help your agency today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup speech recognition
  useEffect(() => {
    speechRecognition.current.onResult((text) => {
      setMessage(text);
      setIsListening(false);
    });

    return () => {
      if (isListening) {
        speechRecognition.current.stop();
      }
    };
  }, [isListening]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      sender: 'user',
      message: message.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    try {
      // Send message to the server and get stored message
      await sendChatMessage(sessionId, userMessage.message);
      
      // Generate bot response
      const botMessage = await generateBotResponse(sessionId, userMessage.message);
      
      // Add bot response to chat
      setMessages(prev => [...prev, {
        sender: 'bot',
        message: botMessage.message,
        timestamp: new Date()
      }]);
      
      // If voice is active, synthesize speech for the bot response
      if (isVoiceActive) {
        try {
          await synthesizeSpeech(botMessage.message);
        } catch (error) {
          console.error('Failed to synthesize speech:', error);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true);
      toast({
        title: 'Voice Mode Activated',
        description: 'The chatbot will now respond with voice and can listen to your speech.'
      });
    } else {
      setIsVoiceActive(false);
      if (isListening) {
        speechRecognition.current.stop();
        setIsListening(false);
      }
      toast({
        title: 'Voice Mode Deactivated',
        description: 'The chatbot will now respond with text only.'
      });
    }
  };

  const toggleListening = () => {
    if (!isVoiceActive) {
      setIsVoiceActive(true);
    }
    
    if (isListening) {
      speechRecognition.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechRecognition.current.start();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all`}
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl w-80 md:w-96 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">AI Assistant</h3>
                    <p className="text-xs opacity-80">Powered by Vibe Marketing AI</p>
                  </div>
                </div>
                <Button
                  onClick={toggleChat}
                  variant="ghost"
                  className="text-white hover:text-gray-200 hover:bg-transparent"
                  size="icon"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 h-[300px] overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div className={`${
                    msg.sender === 'user' 
                      ? 'bg-primary/10 ml-auto' 
                      : 'bg-white'
                    } rounded-lg p-3 shadow-sm max-w-[80%]`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs ml-2 flex-shrink-0">
                      You
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  onClick={toggleVoice}
                  variant="ghost"
                  size="icon"
                  className={`${isVoiceActive ? 'text-primary' : 'text-gray-500'} hover:text-primary`}
                  aria-label="Toggle voice mode"
                >
                  <MicOff size={18} className={isVoiceActive ? 'hidden' : 'block'} />
                  <Mic size={18} className={isVoiceActive ? 'block' : 'hidden'} />
                </Button>
                <span className={`text-xs ${isVoiceActive ? 'text-primary' : 'text-gray-500'}`}>
                  {isListening ? 'Listening...' : isVoiceActive ? 'Voice mode active' : 'Click to enable voice'}
                </span>
              </div>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {isVoiceActive ? (
                  <Button
                    onClick={toggleListening}
                    className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} text-white p-3 rounded-none`}
                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                  >
                    <Mic size={18} />
                  </Button>
                ) : null}
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 text-white p-3 rounded-r-lg"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
