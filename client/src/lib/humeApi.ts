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
  
  // Generate a contextual response based on the user message
  let botResponseText = "I'm sorry, I didn't understand that. How can I help your marketing agency today?";
  
  if (userMessage.toLowerCase().includes('pricing') || userMessage.toLowerCase().includes('cost')) {
    botResponseText = "Our pricing depends on your agency's specific needs and scale. We offer flexible plans starting at $299/month. Would you like to schedule a consultation to discuss a custom package?";
  } else if (userMessage.toLowerCase().includes('chatbot') || userMessage.toLowerCase().includes('chat')) {
    botResponseText = "Our AI chatbots can be customized for your agency's needs, helping you qualify leads 24/7 and improving client engagement. Would you like to learn more about our chatbot implementation services?";
  } else if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('artificial intelligence')) {
    botResponseText = "We offer comprehensive AI solutions for marketing agencies including workflow automation, content generation, predictive analytics, and personalized client communication. Which aspect of AI are you most interested in exploring?";
  } else if (userMessage.toLowerCase().includes('workflow') || userMessage.toLowerCase().includes('automate')) {
    botResponseText = "Our workflow automation solutions can save your agency up to 15-20 hours per week by automating repetitive tasks such as reporting, social media scheduling, and client communications. Would you like to see a demo?";
  } else if (userMessage.toLowerCase().includes('contact') || userMessage.toLowerCase().includes('talk') || userMessage.toLowerCase().includes('human')) {
    botResponseText = "I'd be happy to connect you with one of our AI marketing specialists. Could you provide your name, email, and a brief description of what you're looking for so we can prepare for the conversation?";
  } else if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
    botResponseText = "Hello! Welcome to Vibe Marketing AI. We specialize in helping marketing agencies leverage AI to grow their business. How can I assist you today?";
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
    // Use ElevenLabs API for more natural sounding voice
    const voiceId = 'pNInz6obpgDQGcFmaJgB'; // ElevenLabs "Adam" voice ID
    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': import.meta.env.ELEVENLABS_API_KEY || '',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
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
