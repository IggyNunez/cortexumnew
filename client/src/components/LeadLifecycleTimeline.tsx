import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Clock, ArrowRight, Award, Star, Zap, BarChart, Loader2, Party } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from 'canvas-confetti';
import MilestoneBadge from "./MilestoneBadge";
import MilestoneDetails from "./MilestoneDetails";
import MilestoneCelebration from "./MilestoneCelebration";
import MilestoneProgressTracker from "./MilestoneProgressTracker";

// Define our milestone stages
export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  completed: boolean;
  date?: string; // Optional date when milestone was completed
}

// Define props for our component
interface LeadLifecycleTimelineProps {
  leadId?: number;
  initialMilestones?: Milestone[];
}

const LeadLifecycleTimeline = ({ 
  leadId, 
  initialMilestones 
}: LeadLifecycleTimelineProps) => {
  // Default stages in the lead lifecycle
  const defaultMilestones: Milestone[] = [
    {
      id: "lead_capture",
      title: "Lead Captured",
      description: "A new potential client has entered your sales funnel through a website form or AI chatbot interaction.",
      icon: <CheckCircle className="text-green-500" />,
      completed: true,
      date: new Date().toLocaleDateString()
    },
    {
      id: "qualification",
      title: "Lead Qualification",
      description: "The lead's needs, budget, and timeline have been assessed to determine fit.",
      icon: <Clock className="text-orange-500" />,
      completed: false
    },
    {
      id: "discovery_call",
      title: "Discovery Call",
      description: "Initial consultation to understand client needs and present AI solutions.",
      icon: <Zap className="text-blue-500" />,
      completed: false
    },
    {
      id: "proposal",
      title: "Proposal Sent",
      description: "A customized AI integration proposal has been created and delivered.",
      icon: <BarChart className="text-purple-500" />,
      completed: false
    },
    {
      id: "negotiation",
      title: "Negotiation",
      description: "Discussing terms, scope, and pricing for the AI implementation project.",
      icon: <ArrowRight className="text-gray-500" />,
      completed: false
    },
    {
      id: "closed_won",
      title: "Closed Won",
      description: "The lead has converted into a paying client! Time to celebrate and begin onboarding.",
      icon: <Award className="text-yellow-500" />,
      completed: false
    },
    {
      id: "onboarding",
      title: "Client Onboarding",
      description: "Setting up the client for success with your agency's AI tools and services.",
      icon: <Star className="text-primary" />,
      completed: false
    }
  ];

  // State to track milestones
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones || defaultMilestones);
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [celebratingMilestoneId, setCelebratingMilestoneId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!leadId);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch milestone data from API when leadId is provided
  useEffect(() => {
    if (!leadId) return;
    
    const fetchMilestones = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/leads/${leadId}/milestones`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch milestones');
        }
        
        // Map API data to our milestone objects
        const milestonesFromDb = data.data;
        
        // Start with our default milestones
        const updatedMilestones = [...defaultMilestones];
        
        // Update each milestone with completion status from DB
        milestonesFromDb.forEach((dbMilestone: any) => {
          const index = updatedMilestones.findIndex(m => m.id === dbMilestone.milestone_id);
          if (index !== -1) {
            updatedMilestones[index] = {
              ...updatedMilestones[index],
              completed: dbMilestone.completed,
              date: dbMilestone.completed_at 
                ? new Date(dbMilestone.completed_at).toLocaleDateString() 
                : undefined
            };
          }
        });
        
        setMilestones(updatedMilestones);
      } catch (err) {
        console.error('Error fetching milestone data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMilestones();
  }, [leadId]);

  // Function to trigger confetti celebration
  const celebrateMilestone = (milestone: Milestone) => {
    if (!milestone.completed) return;
    
    setCelebratingMilestoneId(milestone.id);
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Clear celebration after a short delay
    setTimeout(() => {
      setCelebratingMilestoneId(null);
    }, 3000);
  };

  // Function to complete the next milestone with API integration
  const completeNextMilestone = async () => {
    if (!leadId) {
      // If no leadId is provided, just use the local state like a demo
      const updatedMilestones = [...milestones];
      const nextIncompleteIndex = updatedMilestones.findIndex(m => !m.completed);
      
      if (nextIncompleteIndex !== -1) {
        updatedMilestones[nextIncompleteIndex] = {
          ...updatedMilestones[nextIncompleteIndex],
          completed: true,
          date: new Date().toLocaleDateString()
        };
        
        setMilestones(updatedMilestones);
        
        // Celebrate the milestone
        celebrateMilestone(updatedMilestones[nextIncompleteIndex]);
      }
      return;
    }
    
    // With a leadId, we want to use the API for persistence
    try {
      const nextIncompleteIndex = milestones.findIndex(m => !m.completed);
      
      if (nextIncompleteIndex === -1) return;
      
      const milestoneToComplete = milestones[nextIncompleteIndex];
      
      // Check if this milestone already exists in the database
      const response = await fetch(`/api/leads/${leadId}/milestones`);
      const milestoneData = await response.json();
      
      if (!response.ok) {
        console.error("Error fetching milestones:", milestoneData.error);
        return;
      }
      
      let milestoneId;
      const existingMilestone = milestoneData.data.find(
        (m: any) => m.milestone_id === milestoneToComplete.id
      );
      
      if (existingMilestone) {
        // Update existing milestone
        const updateResponse = await fetch(`/api/leads/milestones/${existingMilestone.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: true,
          }),
        });
        
        if (!updateResponse.ok) {
          console.error("Error updating milestone:", await updateResponse.json());
          return;
        }
        
        milestoneId = existingMilestone.id;
      } else {
        // Create new milestone
        const createResponse = await fetch(`/api/leads/${leadId}/milestones`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            milestone_id: milestoneToComplete.id,
            title: milestoneToComplete.title,
            description: milestoneToComplete.description,
            completed: true,
          }),
        });
        
        if (!createResponse.ok) {
          console.error("Error creating milestone:", await createResponse.json());
          return;
        }
        
        const createdMilestone = await createResponse.json();
        milestoneId = createdMilestone.data.id;
      }
      
      // Update local state
      const updatedMilestones = [...milestones];
      updatedMilestones[nextIncompleteIndex] = {
        ...updatedMilestones[nextIncompleteIndex],
        completed: true,
        date: new Date().toLocaleDateString()
      };
      
      setMilestones(updatedMilestones);
      
      // Celebrate the milestone
      celebrateMilestone(updatedMilestones[nextIncompleteIndex]);
      
    } catch (error) {
      console.error("Error completing milestone:", error);
    }
  };

  // Function to reset all milestones (for demo purposes)
  const resetMilestones = async () => {
    if (!leadId) {
      // Without a leadId, just use local state (demo mode)
      const resetMilestones = milestones.map((milestone, index) => ({
        ...milestone,
        completed: index === 0, // Only the first one remains completed
        date: index === 0 ? new Date().toLocaleDateString() : undefined
      }));
      
      setMilestones(resetMilestones);
      setActiveMilestone(null);
      return;
    }
    
    // With a leadId, use the API for persistence
    try {
      // Get all milestones for this lead
      const response = await fetch(`/api/leads/${leadId}/milestones`);
      const milestoneData = await response.json();
      
      if (!response.ok) {
        console.error("Error fetching milestones:", milestoneData.error);
        return;
      }
      
      // Update each milestone's completion status in the database
      const updatePromises = milestoneData.data.map(async (milestone: any) => {
        // Only the lead capture milestone should be completed
        const shouldBeCompleted = milestone.milestone_id === 'lead_capture';
        
        // If the milestone's completed status matches what it should be, no need to update
        if (milestone.completed === shouldBeCompleted) return;
        
        return fetch(`/api/leads/milestones/${milestone.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: shouldBeCompleted,
            completed_at: shouldBeCompleted ? new Date().toISOString() : null,
          }),
        });
      });
      
      await Promise.all(updatePromises);
      
      // Update local state
      const resetMilestones = milestones.map((milestone, index) => ({
        ...milestone,
        completed: index === 0, // Only the first one remains completed
        date: index === 0 ? new Date().toLocaleDateString() : undefined
      }));
      
      setMilestones(resetMilestones);
      setActiveMilestone(null);
      
    } catch (error) {
      console.error("Error resetting milestones:", error);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Lead Lifecycle <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Timeline</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Track and celebrate each milestone in your lead's journey toward becoming a client
          </motion.p>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-gray-600">Loading timeline data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center my-8">
            <p className="text-red-600 mb-2">There was an error loading the timeline</p>
            <p className="text-gray-600 text-sm">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="relative mt-10 mb-12">
              {/* Horizontal line connecting timeline items */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0 mx-8 md:mx-24"></div>
              
              {/* Timeline items */}
              <div className="relative z-10 flex justify-between px-4 sm:px-0">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex flex-col items-center">
                    <motion.button
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.completed ? 'bg-primary' : 'bg-gray-200'
                      } ${celebratingMilestoneId === milestone.id ? 'ring-4 ring-primary/50 animate-pulse' : ''}`}
                      onClick={() => setActiveMilestone(activeMilestone?.id === milestone.id ? null : milestone)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="text-white">{milestone.icon}</div>
                    </motion.button>
                    <p className={`mt-2 text-xs font-medium hidden md:block ${milestone.completed ? 'text-primary' : 'text-gray-500'}`}>
                      {milestone.title}
                    </p>
                    {milestone.date && (
                      <p className="text-xs text-gray-500 hidden md:block">{milestone.date}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* Active milestone details */}
        <AnimatePresence mode="wait">
          {activeMilestone ? (
            <motion.div 
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-2xl mx-auto"
            >
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  activeMilestone.completed ? 'bg-primary' : 'bg-gray-200'
                }`}>
                  <div className="text-white">{activeMilestone.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    {activeMilestone.title}
                    {activeMilestone.completed && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600">{activeMilestone.description}</p>
                  {activeMilestone.completed && activeMilestone.date && (
                    <p className="text-sm text-gray-500 mt-2">Completed on {activeMilestone.date}</p>
                  )}
                  {activeMilestone.completed && (
                    <Button 
                      className="mt-4" 
                      size="sm" 
                      onClick={() => celebrateMilestone(activeMilestone)}
                      variant="outline"
                    >
                      <Award className="mr-2 h-4 w-4" /> Celebrate Again
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 mb-8"
            >
              Select a milestone to see details
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Controls - only show when timeline is loaded and no errors */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              variant="default" 
              onClick={completeNextMilestone}
              className="bg-primary hover:bg-primary/90"
            >
              <CheckCircle className="mr-2 h-4 w-4" /> Complete Next Milestone
            </Button>
            <Button 
              variant="outline" 
              onClick={resetMilestones}
            >
              <Clock className="mr-2 h-4 w-4" /> Reset Timeline
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadLifecycleTimeline;