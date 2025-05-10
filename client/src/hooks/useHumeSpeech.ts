import { useState, useEffect, useCallback } from 'react';
import { generateSpeech, transcribeAudio } from '@/lib/humeApi';

export function useHumeSpeech() {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Initialize audio context
  useEffect(() => {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  // Toggle voice response
  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  // Play audio from base64 string
  const playAudio = useCallback(
    async (base64Audio: string) => {
      if (!audioContext) return;

      try {
        // Convert base64 to ArrayBuffer
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Decode audio data
        const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);
        
        // Create and play source
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    },
    [audioContext]
  );

  // Generate and play speech
  const speak = useCallback(
    async (text: string) => {
      if (!isVoiceEnabled || !text) return;

      try {
        const response = await generateSpeech({
          text,
          voice: 'natural', // Use appropriate voice option from Hume API
          speed: 1.0,
        });

        await playAudio(response.audio);
      } catch (error) {
        console.error('Error speaking:', error);
      }
    },
    [isVoiceEnabled, playAudio]
  );

  // Setup speech recognition
  const startRecording = useCallback(async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setRecordedChunks([]);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        
        try {
          const text = await transcribeAudio(audioBlob);
          setRecognizedText(text);
        } catch (error) {
          console.error('Transcription error:', error);
        }
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [isRecording, recordedChunks]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder, isRecording]);

  return {
    isVoiceEnabled,
    toggleVoice,
    speak,
    isRecording,
    startRecording,
    stopRecording,
    recognizedText
  };
}
