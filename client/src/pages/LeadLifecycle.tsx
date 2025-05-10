import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadLifecycleTimeline from "@/components/LeadLifecycleTimeline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";

// Define our Lead interface
interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  business_type: string | null;
  company_size: string | null;
  annual_revenue: string | null;
  client_value: string | null;
  marketing_needs: string | null;
  timeline: string | null;
  budget: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

const LeadLifecycle = () => {
  // Extract id from URL params
  const params = useParams();
  const leadId = params?.id;
  
  // Fetch the lead data if we have an ID
  const { data: leadData, isLoading } = useQuery<{ success: boolean; data: Lead }>({
    queryKey: ["/api/leads", leadId],
    enabled: !!leadId,
  });

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
            
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Lead Data
              </Button>
            ) : null}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading lead data...</span>
            </div>
          ) : leadData?.data ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3 md:border-r md:border-gray-100 md:pr-6">
                    <h3 className="text-lg font-medium text-gray-700">Lead Details</h3>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{leadData.data.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{leadData.data.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{leadData.data.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{leadData.data.company}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:border-r md:border-gray-100 md:pr-6">
                    <h3 className="text-lg font-medium text-gray-700">Qualification Summary</h3>
                    <div>
                      <p className="text-sm text-gray-500">Business Type</p>
                      <p className="font-medium">{leadData.data.business_type || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company Size</p>
                      <p className="font-medium">{leadData.data.company_size || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Annual Revenue</p>
                      <p className="font-medium">{leadData.data.annual_revenue || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Client Value</p>
                      <p className="font-medium">{leadData.data.client_value || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-700">Project Details</h3>
                    <div>
                      <p className="text-sm text-gray-500">Marketing Needs</p>
                      <p className="font-medium">{leadData.data.marketing_needs || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">{leadData.data.timeline || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium">{leadData.data.budget || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Source</p>
                      <p className="font-medium">{leadData.data.source || "Website"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-medium mb-2">Lead not found</h3>
              <p className="text-gray-500">The lead you are looking for doesn't exist or you may not have access to it.</p>
            </div>
          )}
          
          <LeadLifecycleTimeline leadId={leadId ? parseInt(leadId) : undefined} />
          
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