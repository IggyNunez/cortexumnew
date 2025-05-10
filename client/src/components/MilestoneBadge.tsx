import { motion } from 'framer-motion';
import { Milestone } from './LeadLifecycleTimeline';

interface MilestoneBadgeProps {
  milestone: Milestone;
  isActive: boolean;
  isCelebrating: boolean;
  onClick: () => void;
}

const MilestoneBadge = ({ milestone, isActive, isCelebrating, onClick }: MilestoneBadgeProps) => {
  // Get the appropriate badge color based on milestone status
  const getBadgeColors = () => {
    if (milestone.completed) {
      return {
        bg: 'bg-primary',
        ring: 'ring-primary/30',
        text: 'text-primary'
      };
    }
    
    return {
      bg: 'bg-gray-200',
      ring: 'ring-gray-300',
      text: 'text-gray-500'
    };
  };
  
  const { bg, ring, text } = getBadgeColors();
  
  return (
    <div className="flex flex-col items-center">
      <motion.button
        className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${
          isActive ? 'ring-4 ring-primary/20' : ''
        } ${isCelebrating ? 'ring-4 ring-primary/50' : ''}`}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {isCelebrating ? (
          <motion.div 
            className="text-white"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5 
            }}
          >
            {milestone.icon}
          </motion.div>
        ) : (
          <div className="text-white">
            {milestone.icon}
          </div>
        )}
      </motion.button>
      
      <motion.p 
        className={`mt-2 text-xs font-medium hidden md:block ${milestone.completed ? text : 'text-gray-500'}`}
        animate={isActive ? { scale: 1.1, fontWeight: 'bold' } : { scale: 1 }}
      >
        {milestone.title}
      </motion.p>
      
      {milestone.date && (
        <motion.p 
          className="text-xs text-gray-500 hidden md:block"
          animate={isActive ? { opacity: 1 } : { opacity: 0.8 }}
        >
          {milestone.date}
        </motion.p>
      )}
    </div>
  );
};

export default MilestoneBadge;