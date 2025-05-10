import { motion } from 'framer-motion';
import { Milestone } from './LeadLifecycleTimeline';

interface MilestoneProgressTrackerProps {
  milestones: Milestone[];
}

const MilestoneProgressTracker = ({ milestones }: MilestoneProgressTrackerProps) => {
  // Calculate progress percentage
  const completedCount = milestones.filter(milestone => milestone.completed).length;
  const totalCount = milestones.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  
  // Define the status message based on progress
  const getStatusMessage = () => {
    if (progressPercentage === 0) return "Journey just beginning";
    if (progressPercentage < 30) return "Early stages";
    if (progressPercentage < 60) return "Making progress";
    if (progressPercentage < 100) return "Almost there";
    return "Journey complete!";
  };
  
  // Define color based on progress
  const getProgressColor = () => {
    if (progressPercentage < 25) return "bg-gradient-to-r from-blue-500 to-blue-600";
    if (progressPercentage < 50) return "bg-gradient-to-r from-blue-500 to-green-500";
    if (progressPercentage < 75) return "bg-gradient-to-r from-green-500 to-yellow-500";
    return "bg-gradient-to-r from-yellow-500 to-primary";
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">Lead Journey Progress</h3>
        <div className="text-lg font-bold text-primary">{progressPercentage}%</div>
      </div>
      
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
        <motion.div 
          className={`h-full ${getProgressColor()}`}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <div>Status: <span className="font-medium">{getStatusMessage()}</span></div>
        <div>{completedCount} of {totalCount} milestones</div>
      </div>
      
      <div className="mt-4 flex justify-between">
        {milestones.slice(0, 4).map((milestone, index) => (
          <div 
            key={milestone.id} 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              milestone.completed ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {milestone.icon}
          </div>
        ))}
        
        {totalCount > 4 && (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
            +{totalCount - 4}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneProgressTracker;