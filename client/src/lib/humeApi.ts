import { nanoid } from 'nanoid';
import { apiRequest } from './queryClient';

export interface HumeSpeechOptions {
  text: string;
  voice?: string;
  speed?: number;
  stability?: number;
  similarity_boost?: number;
}

export interface HumeSpeechResponse {
  audio: string; // base64 encoded audio
  metadata: {
    text: string;
    voice: string;
    finished_reason: string;
  };
}

// Interface for chatbot message
export interface ChatMessage {
  id?: number;
  sessionId: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp?: Date;
}

// Create a new chat session ID
export const createSessionId = () => nanoid();

// Send a message to the chatbot
export const sendChatMessage = async (sessionId: string, message: string): Promise<ChatMessage> => {
  const payload = {
    sessionId,
    sender: 'user',
    message
  };

  try {
    const res = await fetch('/api/chat/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error('Failed to send message');
    }

    return {
      id: Date.now(),
      sessionId,
      sender: 'user',
      message,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Generate a bot response
export const generateBotResponse = async (sessionId: string, userMessage: string): Promise<ChatMessage> => {
  // In a real implementation, this would make a request to the backend
  // For now, we'll simulate a response
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  // Generate a contextual response based on the user message with empathy and vibe focus
  let botResponseText = "I appreciate your message! I'm your AI assistant from VibeAgency.ai. I'd love to understand more about your specific marketing challenges. How can I help elevate your brand's presence today?";
  
  const lowercaseMessage = userMessage.toLowerCase();
  
  if (lowercaseMessage.includes('pricing') || lowercaseMessage.includes('cost')) {
    botResponseText = "I completely understand that investment is an important consideration for your agency. 💯 Our flexible pricing is designed to grow with you, with plans starting at $299/month. Many of our partners see ROI within the first 60-90 days! Would you like to explore a customized solution that aligns with your specific goals and budget?";
  } else if (lowercaseMessage.includes('chatbot') || lowercaseMessage.includes('chat')) {
    botResponseText = "Great question about our chatbots! ✨ Our AI conversational agents are designed to capture your brand's unique voice and vibe, connecting emotionally with your audience. They qualify leads 24/7, provide personalized responses, and gather valuable insights about your visitors. The best part? They continuously learn and improve! Would you like to hear how they've transformed lead generation for agencies similar to yours?";
  } else if (lowercaseMessage.includes('ai') || lowercaseMessage.includes('artificial intelligence')) {
    botResponseText = "You've touched on my favorite topic! 🚀 Our AI solutions are revolutionizing how marketing agencies create authentic connections. We offer vibe-driven content creation, cultural trend analysis, workflow automation, predictive analytics, and personalized client experiences. I'm curious - which of these capabilities would have the biggest impact on your agency's growth right now?";
  } else if (lowercaseMessage.includes('workflow') || lowercaseMessage.includes('automate')) {
    botResponseText = "Automation is a game-changer for marketing agencies! Our AI agents can free up 15-20 hours per week of your team's time by handling repetitive tasks like reporting, content scheduling, and client communications. Imagine what your team could accomplish with that extra creative bandwidth! Would you like to see a personalized demo showing how this could work specifically for your agency's workflow?";
  } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('talk') || lowercaseMessage.includes('human')) {
    botResponseText = "I'd be thrilled to connect you with one of our vibe marketing specialists! 👋 They're passionate about helping agencies like yours leverage AI for authentic growth. To make the conversation as valuable as possible, could you share a bit about your agency's focus and what you're hoping to achieve with AI automation? This will help us prepare some relevant insights for your discussion.";
  } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    botResponseText = "Hey there! 👋 Welcome to VibeAgency.ai! I'm your AI assistant, passionate about helping marketing agencies create authentic connections through AI-powered vibe marketing. Our team is dedicated to transforming how you engage with your audience and scale your operations. What brings you to our site today?";
  } else if (lowercaseMessage.includes('vibe') || lowercaseMessage.includes('culture')) {
    botResponseText = "You've touched on something we're passionate about! 💫 Vibe marketing is all about creating emotional resonance and cultural relevance that truly connects with your audience. Our AI agents analyze trending topics, audience sentiment, and cultural movements to help your brand stay authentically engaged. How are you currently approaching the 'vibe' aspect of your marketing strategy?";
  } else if (lowercaseMessage.includes('case') || lowercaseMessage.includes('success') || lowercaseMessage.includes('results')) {
    botResponseText = "I love sharing our success stories! One of our clients, SoftRx, increased social engagement by 217% using our AI content optimization tools. Another client, RX Surgical, automated their lead qualification process and saw closing rates jump by 45%! These results came from implementing our AI agents to create authentic, emotionally resonant campaigns. Would you like to hear how we might achieve similar results for your specific industry?";
  }
  
  const botResponse: ChatMessage = {
    id: Date.now(),
    sessionId,
    sender: 'bot',
    message: botResponseText,
    timestamp: new Date()
  };

  // Save the bot response to the server
  try {
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        sender: 'bot',
        message: botResponseText
      }),
    });
  } catch (error) {
    console.error('Error saving bot response:', error);
  }
  
  return botResponse;
};

/**
 * Generates speech using Hume API
 */
export const generateSpeech = async (options: HumeSpeechOptions): Promise<HumeSpeechResponse> => {
  try {
    const response = await fetch('/api/hume/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Speech generation failed: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
};

/**
 * Synthesizes speech for the given text using ElevenLabs API
 */
export const synthesizeSpeech = async (text: string): Promise<void> => {
  try {
    // Use ElevenLabs API for more natural, empathetic sounding voice
    // Using Antoni voice which has a warm, friendly tone ideal for customer service
    const voiceId = 'ErXwobaYiN019PkySvjV'; // ElevenLabs "Antoni" voice ID for more empathetic tone
    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': import.meta.env.ELEVENLABS_API_KEY || '',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_turbo_v2', // Using the more advanced Turbo model for better quality
        voice_settings: {
          stability: 0.65, // Higher stability for more consistent tone
          similarity_boost: 0.85, // Higher similarity for more distinctive voice character
          style: 0.3, // Adding some style for more emotional speaking
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error('ElevenLabs API request failed');
    }

    // Get audio blob from response
    const audioBlob = await response.blob();
    
    // Create URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Play the audio
    const audio = new Audio(audioUrl);
    audio.play();
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating speech with ElevenLabs:', error);
    
    // Fallback to browser's built-in speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
      return Promise.resolve();
    } else {
      console.error('Speech synthesis not supported in this browser');
      return Promise.reject(new Error('Speech synthesis not supported'));
    }
  }
};

/**
 * Transcribes audio using Hume API
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('/api/hume/speech-to-text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Transcription failed: ${errorText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

// Setup speech recognition (using browser's Web Speech API)
export const setupSpeechRecognition = (): { start: () => void, stop: () => void, onResult: (callback: (text: string) => void) => void } => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return {
      start: () => console.error('Speech recognition not supported in this browser'),
      stop: () => {},
      onResult: () => {},
    };
  }

  // @ts-ignore - SpeechRecognition is not in the TypeScript types
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  let resultCallback: ((text: string) => void) | null = null;
  
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    if (resultCallback) {
      resultCallback(transcript);
    }
  };
  
  return {
    start: () => recognition.start(),
    stop: () => recognition.stop(),
    onResult: (callback: (text: string) => void) => {
      resultCallback = callback;
    }
  };
};
