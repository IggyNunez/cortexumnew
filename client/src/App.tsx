import { Switch, Route } from "wouter";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import CookiePolicy from "@/pages/CookiePolicy";
import LeadManagement from "@/pages/LeadManagement";
import LeadLifecycle from "@/pages/LeadLifecycle";
import { nanoid } from 'nanoid';
import { useEffect } from "react";
import { useAnalytics } from "./hooks/useAnalytics";
import { initGA } from "./lib/analytics";
import { initFBPixel } from "./lib/fbPixel";

function Router() {
  // Initialize analytics for route changes
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/leads" component={LeadManagement} />
      <Route path="/leads/lifecycle" component={LeadLifecycle} />
      <Route path="/leads/lifecycle/:id" component={LeadLifecycle} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Generate a visitor ID for the user if they don't have one
  useEffect(() => {
    if (!localStorage.getItem('visitorId')) {
      localStorage.setItem('visitorId', nanoid());
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AnalyticsInitializer />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Separate component to initialize analytics
function AnalyticsInitializer() {
  // Initialize analytics services when settings are available
  const { data: settingsData } = useQuery<{ success: boolean; data: any }>({
    queryKey: ['/api/marketing-settings'],
  });
  
  useEffect(() => {
    if (settingsData?.success && settingsData?.data) {
      const settings = settingsData.data;
      
      // Initialize Google Analytics if enabled
      if (settings.ga_enabled && settings.ga_measurement_id) {
        initGA(settings.ga_measurement_id);
      }
      
      // Initialize Facebook Pixel if enabled
      if (settings.fb_capi_enabled && settings.fb_pixel_id) {
        initFBPixel(settings.fb_pixel_id);
      }
    }
  }, [settingsData]);
  
  return null;
}

export default App;
