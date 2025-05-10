// This file would normally contain the integration with the Hume API
// For now, we'll implement basic functionality

import { nanoid } from "nanoid";
import { apiRequest } from "./queryClient";

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Mock responses based on keywords
const getKeywordResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return "Our pricing starts at $1,500/month for our basic AI integration package. For a custom quote based on your agency's specific needs, we'd be happy to schedule a consultation.";
  } 
  
  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help')) {
    return "We offer AI integration services, AI strategy training, and ongoing AI consulting for marketing agencies. Our solutions help with content creation, customer segmentation, campaign optimization, and more.";
  } 
  
  if (lowerMessage.includes('demo') || lowerMessage.includes('show') || lowerMessage.includes('presentation')) {
    return "We'd be happy to provide a demo of our AI solutions! Please provide your name, company, and email address, and we'll arrange a personalized demonstration.";
  } 
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
    return "You can reach our team at hello@vibeai.com or call us at (800) 555-1234. Alternatively, fill out the contact form on this page for a personalized consultation.";
  }
  
  // Default response
  return "Thanks for your message! To best assist you, I'd love to know more about your agency and your specific needs. Could you tell me about your current operations and what you're looking to achieve with AI automation?";
};

// Store conversation in DB via API
export const saveConversation = async (visitorId: string, message: string, isBot: boolean): Promise<void> => {
  try {
    await apiRequest("POST", "/api/conversations", {
      visitor_id: visitorId,
      message_text: message,
      is_bot: isBot
    });
  } catch (error) {
    console.error("Failed to save conversation:", error);
  }
};

// Get response from Hume AI (mocked)
export const getAIResponse = async (message: string): Promise<ChatMessage> => {
  // In a real implementation, this would make a call to the Hume API
  // For the demo, we'll use the keyword-based responses
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responseText = getKeywordResponse(message);
  
  return {
    id: nanoid(),
    text: responseText,
    isBot: true,
    timestamp: new Date()
  };
};

// Text-to-speech using Hume API (mocked)
export const synthesizeSpeech = async (text: string): Promise<void> => {
  try {
    // In a real implementation, this would call the Hume API for voice synthesis
    // For now, we'll use the browser's built-in speech synthesis API
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
      
      // Also log the call to our backend
      await apiRequest("POST", "/api/synthesize", { text });
    }
  } catch (error) {
    console.error("Speech synthesis error:", error);
    throw new Error("Failed to synthesize speech");
  }
};

// Speech-to-text using browser API
export const startSpeechRecognition = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };
      
      recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };
      
      recognition.start();
      
    } else {
      reject(new Error("Speech recognition not supported in this browser"));
    }
  });
};
