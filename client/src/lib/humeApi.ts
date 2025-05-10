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
  
  // Generate a more conversational, human-sounding response
  let botResponseText = "Thanks for reaching out! I'm with Cortexuum Marketing. I'd love to hear more about what marketing challenges you're facing. How can we help boost your brand today?";
  
  const lowercaseMessage = userMessage.toLowerCase();
  
  if (lowercaseMessage.includes('pricing') || lowercaseMessage.includes('cost')) {
    botResponseText = "I totally get it - cost is always important to consider. We've designed our pricing to be flexible, starting at $299/month. Most of our clients start seeing returns within 60-90 days. Would you like me to put together a custom package based on what you're looking to achieve?";
  } else if (lowercaseMessage.includes('chatbot') || lowercaseMessage.includes('chat')) {
    botResponseText = "Our chatbots are pretty special! They're designed to sound exactly like your brand and create real connections with your audience. They can qualify leads around the clock, give personalized responses, and gather insights about who's visiting your site. The best part is they keep learning and getting better. Want to hear how they've helped other agencies like yours?";
  } else if (lowercaseMessage.includes('ai') || lowercaseMessage.includes('artificial intelligence')) {
    botResponseText = "AI is transforming how marketing agencies connect with audiences. We use it for everything from content creation to trend analysis, workflow automation, analytics, and personalized client experiences. I'm curious - which of these would make the biggest difference for your business right now?";
  } else if (lowercaseMessage.includes('workflow') || lowercaseMessage.includes('automate')) {
    botResponseText = "Automation can be such a time-saver! Our AI tools typically free up 15-20 hours every week by handling the repetitive stuff - reports, scheduling, client messages. Just imagine what your team could do with all that extra creative time. Would you like to see a quick demo of how this might work for your specific workflow?";
  } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('talk') || lowercaseMessage.includes('human')) {
    botResponseText = "I'd be happy to connect you with one of our marketing specialists. They love helping businesses use AI for authentic growth. To make the conversation as helpful as possible, could you tell me a bit about your business and what you're hoping to achieve? That way they can come prepared with some relevant ideas.";
  } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    botResponseText = "Hey there! Welcome to Cortexuum! I'm here to help businesses like yours use the psychology of marketing along with AI technology. What brings you to our website today?";
  } else if (lowercaseMessage.includes('vibe') || lowercaseMessage.includes('culture')) {
    botResponseText = "Vibe marketing is all about creating that emotional connection that really resonates with your audience. Our tools analyze trending topics, audience feelings, and cultural movements to keep your brand authentically engaged. How are you currently handling the 'vibe' aspect of your marketing?";
  } else if (lowercaseMessage.includes('case') || lowercaseMessage.includes('success') || lowercaseMessage.includes('results')) {
    botResponseText = "We've had some great success stories! Bommorito Performance transformed their training center with our AI-rebuilt website that automatically identifies athlete prospects, boosting qualified leads by 185%. Another client, SoftRx, saw a 217% increase in social engagement using our content optimization tools. Would you like to hear how we might get similar results in your industry?";
  } else if (lowercaseMessage.includes('athlete') || lowercaseMessage.includes('sport') || lowercaseMessage.includes('recruit')) {
    botResponseText = "Our sports marketing is pretty innovative. For Bommorito Performance, we built a system that finds potential athletes through social media, analyzes their performance stats, and creates personalized outreach. Their lead pipeline jumped 185% and conversions improved by 67%. Would you like to see how similar approaches might work for your sports business?";
  } else if (lowercaseMessage.includes('lead') || lowercaseMessage.includes('prospect') || lowercaseMessage.includes('generation')) {
    botResponseText = "Lead generation is one of our specialties. For example, we helped Bommorito Performance with a social media tool that identifies potential athletes based on specific metrics and behaviors. The system then nurtures these prospects with personalized content, resulting in 3.4x more digital engagement. How are you currently handling your lead generation?";
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
 * Synthesizes speech for the given text using AI voice technology
 */
export const synthesizeSpeech = async (text: string): Promise<void> => {
  try {
    // Use our server endpoint to generate speech with AI voice synthesis
    const response = await fetch('/api/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Speech synthesis request failed');
    }

    // Get audio blob from response
    const audioBlob = await response.blob();
    
    // Create URL for the audio blob
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Play the audio
    const audio = new Audio(audioUrl);
    await audio.play();
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating speech with AI voice technology:', error);
    
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
