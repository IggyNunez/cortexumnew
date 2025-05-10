import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, Loader2, GitBranch, BarChart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LegalHeader from "@/components/LegalHeader";
import { formatDistanceToNow } from "date-fns";
import { Link } from "wouter";

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

const LeadManagement = () => {
  const [isExporting, setIsExporting] = useState(false);

  const { data, isLoading, error } = useQuery<{ success: boolean; data: Lead[] }>({
    queryKey: ["/api/leads"],
  });

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Use window.open to directly download the CSV file
      window.open('/api/leads/export', '_blank');
    } catch (error) {
      console.error("Error exporting leads:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Get business type label
  const getBusinessTypeLabel = (value: string | null) => {
    if (!value) return "N/A";
    
    const businessTypes: Record<string, string> = {
      "marketing-agency": "Marketing Agency",
      "digital-agency": "Digital Agency",
      "pr-agency": "PR Agency",
      "seo-agency": "SEO Agency",
      "content-agency": "Content Agency",
      "social-media-agency": "Social Media Agency",
      "advertising-agency": "Advertising Agency",
      "branding-agency": "Branding Agency",
      "other": "Other",
    };
    
    return businessTypes[value] || value;
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} (${formatDistanceToNow(date, { addSuffix: true })})`;
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <LegalHeader />
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <Button 
              onClick={handleExport} 
              disabled={isExporting || isLoading || !data?.data?.length}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export as CSV
                </>
              )}
            </Button>
          </div>
          <p className="text-gray-600 mt-2">View and manage all leads captured from your website</p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-gray-600">Loading leads...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              Error loading leads. Please try again.
            </div>
          ) : !data?.data?.length ? (
            <div className="p-12 text-center text-gray-500">
              No leads found. Start marketing your agency to collect leads.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Business Type</TableHead>
                    <TableHead>Company Size</TableHead>
                    <TableHead>Timeline</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.data.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div>{lead.email}</div>
                        <div className="text-sm text-gray-500">{lead.phone}</div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{getBusinessTypeLabel(lead.business_type)}</TableCell>
                      <TableCell>{lead.company_size || "N/A"}</TableCell>
                      <TableCell>{lead.timeline || "N/A"}</TableCell>
                      <TableCell>{formatDate(lead.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/leads/lifecycle/${lead.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Lead Lifecycle">
                            <GitBranch className="h-4 w-4" />
                            <span className="sr-only">View Lifecycle</span>
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LeadManagement;