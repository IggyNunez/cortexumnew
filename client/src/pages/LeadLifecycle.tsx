import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadLifecycleTimeline from "@/components/LeadLifecycleTimeline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

const LeadLifecycle = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Meta information */}
      <title>Lead Lifecycle Timeline | Vibe Marketing AI</title>
      <meta name="description" content="Track your leads through their journey with interactive milestone celebrations using Vibe Marketing AI." />
      
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/leads">
              <Button variant="ghost" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" /> Back to Lead Management
              </Button>
            </Link>
            
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Lead Data
              </Button>
            ) : null}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 border-r border-gray-100 pr-6">
                  <h3 className="text-lg font-medium text-gray-700">Lead Details</h3>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">Acme Marketing</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">Jane Smith</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest</p>
                    <p className="font-medium">AI Chatbot Implementation</p>
                  </div>
                </div>
                
                <div className="space-y-3 md:border-r md:border-gray-100 md:pr-6">
                  <h3 className="text-lg font-medium text-gray-700">Qualification Summary</h3>
                  <div>
                    <p className="text-sm text-gray-500">Company Size</p>
                    <p className="font-medium">25-50 employees</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">$5,000 - $10,000</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Timeline</p>
                    <p className="font-medium">Q3 2025</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-700">Next Steps</h3>
                  <div>
                    <p className="text-sm text-gray-500">Current Stage</p>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      Discovery Call
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="font-medium">AI Sales Team</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Next Action</p>
                    <p className="font-medium">Send Proposal (Due: 05/15/2025)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <LeadLifecycleTimeline />
          
          <div className="mb-10 mt-10">
            <h3 className="text-xl font-bold mb-4">Lead Activity</h3>
            
            <div className="space-y-4">
              {[
                { 
                  date: "May 8, 2025", 
                  action: "Lead capture form submitted", 
                  details: "Lead expressed interest in AI chatbot for their agency website."
                },
                { 
                  date: "May 9, 2025", 
                  action: "Initial email sent", 
                  details: "Welcome email with AI agency resources delivered."
                },
                { 
                  date: "May 10, 2025", 
                  action: "Qualification call scheduled", 
                  details: "30-minute discovery call set for May 12."
                }
              ].map((activity, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                  <p className="text-gray-600 mt-1">{activity.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeadLifecycle;