import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

const VideoFeature = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI for Business</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            See what Mark Zuckerberg has to say about AI agents revolutionizing small businesses
          </motion.p>
        </div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <video 
            ref={videoRef}
            className="w-full h-auto"
            loop
            muted={isMuted}
            playsInline
            onClick={handlePlayPause}
            poster=""
          >
            <source src="/AI Agents For Small Business - Mark Zuckerberg.publer.com.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play overlay */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/60"
              onClick={handlePlayPause}
            >
              <div className="bg-white/90 rounded-full p-5 shadow-lg transform transition-transform group-hover:scale-110">
                <Play className="h-14 w-14 text-primary" />
              </div>
              <div className="absolute bottom-6 left-6 text-white font-medium text-lg">
                Click to play
              </div>
            </div>
          )}

          {/* Controls */}
          {isPlaying && (
            <div className="absolute bottom-4 right-4 flex space-x-3">
              <button 
                onClick={handleMuteToggle}
                className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              >
                {isMuted ? <VolumeX className="h-5 w-5 text-gray-700" /> : <Volume2 className="h-5 w-5 text-gray-700" />}
              </button>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm">
            Source: Meta's AI Agents for Small Business
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoFeature;