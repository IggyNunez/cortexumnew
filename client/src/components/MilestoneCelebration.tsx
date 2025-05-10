import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Sparkles, PartyPopper } from 'lucide-react';
import { Milestone } from './LeadLifecycleTimeline';

interface MilestoneCelebrationProps {
  milestone: Milestone;
  onClose: () => void;
}

// Celebration effects to use randomly
const CONFETTI_COLORS = ['#ff3e00', '#ffbe0b', '#4361ee', '#3a86ff', '#7209b7'];
const CELEBRATION_MESSAGES = [
  "Congratulations! 🎉",
  "Great achievement! 🔥",
  "Moving forward! 🚀",
  "Milestone reached! 💪",
  "Progress made! 🌟"
];

const MilestoneCelebration = ({ milestone, onClose }: MilestoneCelebrationProps) => {
  const [celebrationMessage, setCelebrationMessage] = useState("");

  // Trigger celebrations when the component mounts
  useEffect(() => {
    // Select a random celebration message
    const randomMessage = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    setCelebrationMessage(randomMessage);
    
    // Trigger confetti multiple times with different settings for a bigger celebration
    launchConfetti();
    
    // Close the celebration after a set time
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  // Enhanced confetti effects
  const launchConfetti = () => {
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: CONFETTI_COLORS,
    });
    
    // Second burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { y: 0.6, x: 0.3 },
        colors: CONFETTI_COLORS,
      });
    }, 200);
    
    // Third burst with delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { y: 0.6, x: 0.7 },
        colors: CONFETTI_COLORS,
      });
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full m-4 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-4 left-4 text-yellow-500"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles size={28} />
          </motion.div>
          
          <motion.div 
            className="absolute top-4 right-4 text-primary"
            animate={{ 
              rotate: [0, -15, 15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <Party size={28} />
          </motion.div>
          
          {/* Main content */}
          <div className="py-6">
            <motion.div
              className="mb-6 mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                borderRadius: ["100%", "100%", "100%"]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="bg-primary rounded-full p-4 text-white">
                {milestone.icon}
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold text-gray-900 mb-2"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {celebrationMessage}
            </motion.h2>
            
            <h3 className="text-xl font-semibold text-primary mb-4">
              {milestone.title}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {milestone.description}
            </p>
            
            <div className="flex justify-center mb-2">
              <Award className="text-yellow-500 h-8 w-8 mr-2" />
              <Award className="text-yellow-500 h-8 w-8" />
              <Award className="text-yellow-500 h-8 w-8 ml-2" />
            </div>
            
            <motion.button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MilestoneCelebration;