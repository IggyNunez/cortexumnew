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

  const res = await apiRequest('POST', '/api/chat', { message });
  const data = await res.json();

  return {
    id: Date.now(),
    sessionId,
    sender: 'user',
    message,
    timestamp: new Date()
  };
};

/**
 * Generates speech using Hume API
 */
export const generateSpeech = async (options: HumeSpeechOptions): Promise<HumeSpeechResponse> => {
  try {
    const response = await fetch('/api/hume/speech', {
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
 * Transcribes audio using Hume API
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('/api/hume/transcribe', {
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
