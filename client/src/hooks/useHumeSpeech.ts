import { useState, useRef, useCallback } from "react";
import { generateSpeech } from "@/lib/humeApi";

export function useHumeSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element on client side only
  if (typeof window !== "undefined" && !audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.onended = () => setIsPlaying(false);
  }

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const playAudio = useCallback((audioUrl: string) => {
    if (!isVoiceEnabled || !audioRef.current) return;
    
    stopAudio();
    audioRef.current.src = audioUrl;
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
  }, [isVoiceEnabled, stopAudio]);

  const speak = useCallback(
    async (text: string) => {
      if (!isVoiceEnabled) return;
      
      try {
        // In a real implementation, this would call the Hume API
        // For now, we'll use a simple text-to-speech
        const response = await generateSpeech({
          text,
          voice: "alloy", // Default voice
        });
        
        // Convert base64 to audio URL
        if (response && response.audio) {
          const audioUrl = `data:audio/mp3;base64,${response.audio}`;
          playAudio(audioUrl);
        }
      } catch (error) {
        console.error("Error generating speech:", error);
      }
    },
    [isVoiceEnabled, playAudio]
  );

  // Speech recognition
  const startRecording = useCallback(async () => {
    if (navigator.mediaDevices && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setIsRecording(true);
      setRecognizedText("");
      
      // Most browsers support webkitSpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
      };
      
      recognition.onspeechend = () => {
        recognition.stop();
        setIsRecording(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognition.start();
    } else {
      console.error('Speech recognition not supported in this browser');
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  return {
    isPlaying,
    playAudio,
    stopAudio,
    isVoiceEnabled,
    toggleVoice,
    speak,
    isRecording,
    startRecording,
    stopRecording,
    recognizedText
  };
}