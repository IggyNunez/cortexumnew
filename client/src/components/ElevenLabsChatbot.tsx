import { useEffect, useState, useRef } from 'react';
import { Bot, X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  audio?: string; // Base64 encoded audio data
}

const ElevenLabsChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Add welcome message on initial render
  useEffect(() => {
    setMessages([
      {
        id: nanoid(),
        content: "Hello! I'm your AI marketing assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleToggleChat = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  // Audio player reference
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Function to play audio for a message
  const playMessageAudio = (audioData: string) => {
    console.log("Attempting to play audio");
    
    // Function to convert base64 to a Blob
    const base64ToBlob = (base64: string) => {
      try {
        // Extract the MIME type and the base64 data itself
        const parts = base64.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        
        return new Blob([uInt8Array], { type: contentType });
      } catch (error) {
        console.error('Failed to convert base64 to blob:', error);
        return null;
      }
    };
    
    try {
      // Handle both data URI and direct base64 formats
      let blob;
      if (audioData.startsWith('data:')) {
        // It's a data URI
        blob = base64ToBlob(audioData);
      } else {
        // If it's just a base64 string, add the data URI prefix
        blob = base64ToBlob(`data:audio/mpeg;base64,${audioData}`);
      }
      
      if (!blob) {
        console.error('Could not create blob from audio data');
        return;
      }
      
      // Create an object URL from the blob
      const audioUrl = URL.createObjectURL(blob);
      
      // Create a new audio element programmatically
      const audio = new Audio(audioUrl);
      
      // Add event listeners
      audio.addEventListener('loadeddata', () => {
        console.log("Audio data loaded successfully");
      });
      
      audio.addEventListener('play', () => {
        console.log("Audio playback started");
        setIsPlaying(true);
      });
      
      audio.addEventListener('ended', () => {
        console.log("Audio playback ended");
        setIsPlaying(false);
        // Clean up the URL object
        URL.revokeObjectURL(audioUrl);
      });
      
      audio.addEventListener('error', (e) => {
        console.error("Audio error:", e);
        setIsPlaying(false);
        // Clean up the URL object
        URL.revokeObjectURL(audioUrl);
      });
      
      // Play the audio
      audio.play().then(() => {
        console.log("Audio playback promise resolved");
      }).catch(error => {
        console.error("Could not play audio:", error);
        setIsPlaying(false);
        // Clean up the URL object on error
        URL.revokeObjectURL(audioUrl);
      });
      
    } catch (err) {
      console.error('Error setting up audio playback:', err);
      setIsPlaying(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: nanoid(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Make request to ElevenLabs API through our backend proxy with voice
      const response = await fetch('/api/elevenlabs/chat-with-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages.map(msg => ({
            content: msg.content,
            role: msg.isUser ? 'user' : 'assistant'
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      
      // Add bot response with audio URL if available
      const botMessage: Message = {
        id: nanoid(),
        content: data.response || "I'm sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
        audio: data.audioUrl || undefined  // Now using audioUrl instead of base64 audio
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Play audio with a slight delay to ensure UI has updated
      if (botMessage.audio) {
        // Short delay to ensure the UI has updated
        setTimeout(() => {
          console.log("Playing audio from direct URL");
          // Just create an audio element with the URL
          const audio = new Audio(botMessage.audio);
          
          // Set up event listeners
          audio.addEventListener('play', () => {
            console.log("Audio playback started");
            setIsPlaying(true);
          });
          
          audio.addEventListener('ended', () => {
            console.log("Audio playback ended");
            setIsPlaying(false);
          });
          
          audio.addEventListener('error', (e) => {
            console.error("Audio error:", e);
            setIsPlaying(false);
          });
          
          // Play the audio
          audio.play()
            .then(() => console.log("Audio playback started successfully"))
            .catch(error => console.error("Could not play audio:", error));
        }, 500);
      }
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: nanoid(),
        content: "I'm sorry, there was an error processing your request. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hidden audio element for playing speech */}
      <audio ref={audioRef} className="hidden" preload="auto" />
      
      {/* Chat toggle button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggleChat}
          className="w-14 h-14 rounded-full bg-[#357BD8] hover:bg-[#357BD8]/90 text-white shadow-lg flex items-center justify-center p-0 relative"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 bg-[#E63E8B] w-4 h-4 rounded-full animate-pulse"></span>
          )}
        </Button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 0.95, height: 'auto' }
              : { opacity: 1, y: 0, scale: 1, height: 'auto' }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            {/* Chat header */}
            <div className="bg-[#357BD8] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-semibold">AI Marketing Assistant</h3>
              </div>
              <div className="flex items-center space-x-2">
                {isMinimized ? (
                  <button onClick={handleMaximize} className="p-1 hover:bg-white/20 rounded-full">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={handleMinimize} className="p-1 hover:bg-white/20 rounded-full">
                    <Minimize2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Chat messages */}
            {!isMinimized && (
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.isUser
                          ? 'bg-[#357BD8] text-white rounded-tr-none'
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <div className="flex items-start">
                        <p className="text-sm">{message.content}</p>
                        
                        {!message.isUser && message.audio && (
                          <button 
                            onClick={() => {
                              const audio = new Audio(message.audio);
                              
                              audio.addEventListener('play', () => {
                                console.log("Audio playback started");
                                setIsPlaying(true);
                              });
                              
                              audio.addEventListener('ended', () => {
                                console.log("Audio playback ended");
                                setIsPlaying(false);
                              });
                              
                              audio.addEventListener('error', (e) => {
                                console.error("Audio error:", e);
                                setIsPlaying(false);
                              });
                              
                              audio.play()
                                .then(() => console.log("Audio playback started successfully"))
                                .catch(error => console.error("Could not play audio:", error));
                            }}
                            className="ml-2 mt-0.5 inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors flex-shrink-0"
                            aria-label="Play message audio"
                            title="Play audio"
                          >
                            {isPlaying ? (
                              <VolumeX className="h-3 w-3 text-gray-700" />
                            ) : (
                              <Volume2 className="h-3 w-3 text-gray-700" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none max-w-[80%] px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat input */}
            {!isMinimized && (
              <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
                <div className="flex">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#357BD8] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-[#357BD8] hover:bg-[#357BD8]/90 text-white rounded-r-full px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ElevenLabsChatbot;