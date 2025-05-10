import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Download, Loader2, GitBranch, BarChart, ExternalLink, Settings, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import LegalHeader from "@/components/LegalHeader";
import { queryClient } from "@/lib/queryClient";
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

interface MarketingSettings {
  id: number;
  ga_enabled: boolean;
  ga_measurement_id: string | null;
  ga_settings: Record<string, any>;
  fb_capi_enabled: boolean;
  fb_pixel_id: string | null;
  fb_access_token: string | null;
  fb_settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

const LeadManagement = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Query for leads data
  const { data, isLoading, error } = useQuery<{ success: boolean; data: Lead[] }>({
    queryKey: ["/api/leads"],
  });
  
  // Query for marketing settings
  const { 
    data: settingsData, 
    isLoading: isSettingsLoading, 
    error: settingsError 
  } = useQuery<{ success: boolean; data: MarketingSettings }>({
    queryKey: ["/api/marketing-settings"],
  });
  
  // Mutation for updating marketing settings
  const updateSettings = useMutation({
    mutationFn: async ({ id, updates }: { id: number, updates: Partial<MarketingSettings> }) => {
      const response = await fetch(`/api/marketing-settings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update settings');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch the settings query
      queryClient.invalidateQueries({ queryKey: ['/api/marketing-settings'] });
      toast({
        title: "Settings updated",
        description: "Your marketing integration settings have been saved.",
      });
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      toast({
        title: "Error updating settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle settings form changes
  const handleSettingChange = (field: string, value: any) => {
    if (!settingsData?.data?.id) return;
    
    const updates = {
      [field]: value
    };
    
    updateSettings.mutate({ 
      id: settingsData.data.id, 
      updates 
    });
  };
  
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
            {activeTab === "leads" && (
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
            )}
          </div>
          <p className="text-gray-600 mt-2">Manage leads and marketing integrations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="leads" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="leads">
                <BarChart className="mr-2 h-4 w-4" />
                Lead Data
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Marketing Settings
              </TabsTrigger>
            </TabsList>
            
            {/* Leads Tab Content */}
            <TabsContent value="leads" className="bg-white rounded-xl shadow-md overflow-hidden">
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
            </TabsContent>
            
            {/* Marketing Settings Tab Content */}
            <TabsContent value="settings">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Google Analytics Card */}
                <Card className="shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Google Analytics</CardTitle>
                      <Switch 
                        id="ga-enabled"
                        checked={settingsData?.data?.ga_enabled || false}
                        onCheckedChange={(checked) => handleSettingChange('ga_enabled', checked)}
                        disabled={isSettingsLoading || updateSettings.isPending}
                      />
                    </div>
                    <CardDescription>
                      Track user interactions with Google Analytics 4
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ga-id">Measurement ID</Label>
                        <div className="flex space-x-2">
                          <Input 
                            id="ga-id" 
                            placeholder="G-XXXXXXXXXX" 
                            value={settingsData?.data?.ga_measurement_id || ''}
                            onChange={(e) => handleSettingChange('ga_measurement_id', e.target.value)}
                            disabled={isSettingsLoading || updateSettings.isPending || !settingsData?.data?.ga_enabled}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Enter your Google Analytics 4 Measurement ID starting with "G-"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 bg-gray-50">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="flex space-x-1 items-center mr-2">
                        {settingsData?.data?.ga_enabled && settingsData?.data?.ga_measurement_id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      {settingsData?.data?.ga_enabled && settingsData?.data?.ga_measurement_id
                        ? "Google Analytics is active"
                        : "Google Analytics is not fully configured"}
                    </div>
                  </CardFooter>
                </Card>
                
                {/* Facebook CAPI Card */}
                <Card className="shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">Facebook Pixel</CardTitle>
                      <Switch 
                        id="fb-enabled"
                        checked={settingsData?.data?.fb_capi_enabled || false}
                        onCheckedChange={(checked) => handleSettingChange('fb_capi_enabled', checked)}
                        disabled={isSettingsLoading || updateSettings.isPending}
                      />
                    </div>
                    <CardDescription>
                      Track conversions with Facebook Pixel & Conversion API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                        <Input 
                          id="fb-pixel-id" 
                          placeholder="XXXXXXXXXX" 
                          value={settingsData?.data?.fb_pixel_id || ''}
                          onChange={(e) => handleSettingChange('fb_pixel_id', e.target.value)}
                          disabled={isSettingsLoading || updateSettings.isPending || !settingsData?.data?.fb_capi_enabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fb-access-token">Access Token (for CAPI)</Label>
                        <Input 
                          id="fb-access-token" 
                          type="password"
                          placeholder="Facebook Access Token" 
                          value={settingsData?.data?.fb_access_token || ''}
                          onChange={(e) => handleSettingChange('fb_access_token', e.target.value)}
                          disabled={isSettingsLoading || updateSettings.isPending || !settingsData?.data?.fb_capi_enabled}
                        />
                        <p className="text-xs text-muted-foreground">
                          Server-side events require a Facebook access token
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4 bg-gray-50">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <div className="flex space-x-1 items-center mr-2">
                        {settingsData?.data?.fb_capi_enabled && settingsData?.data?.fb_pixel_id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      {settingsData?.data?.fb_capi_enabled && settingsData?.data?.fb_pixel_id
                        ? "Facebook Pixel is active" + (settingsData?.data?.fb_access_token ? " with CAPI" : "")
                        : "Facebook Pixel is not fully configured"}
                    </div>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>
                  <AlertCircle className="h-4 w-4 inline-block mr-1" />
                  <span>Changes to these settings take effect immediately and will apply to all visitors.</span>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadManagement;