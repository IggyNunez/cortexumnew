import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Milestone } from './LeadLifecycleTimeline';

interface MilestoneDetailsProps {
  milestone: Milestone;
  onCelebrate: () => void;
}

const MilestoneDetails = ({ milestone, onCelebrate }: MilestoneDetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-2xl mx-auto border border-gray-100"
    >
      <div className="flex items-start">
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            milestone.completed ? 'bg-primary' : 'bg-gray-200'
          }`}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="text-white">{milestone.icon}</div>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold flex items-center">
              {milestone.title}
              {milestone.completed && (
                <motion.span 
                  className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Completed
                </motion.span>
              )}
            </h3>
            
            {milestone.completed && milestone.date && (
              <p className="text-sm text-gray-500">
                Completed on {milestone.date}
              </p>
            )}
          </div>
          
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {milestone.description}
          </motion.p>
          
          {milestone.completed ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button 
                onClick={onCelebrate}
                variant="outline"
                className="bg-primary/5 hover:bg-primary/10 border-primary/20"
              >
                <Award className="mr-2 h-4 w-4 text-primary" /> Celebrate Achievement
              </Button>
              
              <Button 
                variant="ghost"
                className="text-gray-600"
              >
                View Details
              </Button>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-sm text-gray-500 italic">
                This milestone hasn't been completed yet. Continue working on earlier stages to progress.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MilestoneDetails;