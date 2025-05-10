import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '../lib/analytics';
import { trackFBPageView } from '../lib/fbPixel';
import { useQuery } from '@tanstack/react-query';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  // Fetch marketing settings for tracking IDs
  const { data: settingsData } = useQuery<{ success: boolean; data: any }>({
    queryKey: ['/api/marketing-settings'],
  });
  
  const settings = settingsData?.data;
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      // Track in Google Analytics if enabled
      if (settings?.ga_enabled && settings?.ga_measurement_id) {
        trackPageView(location, settings.ga_measurement_id);
      }
      
      // Track in Facebook Pixel if enabled
      if (settings?.fb_capi_enabled && settings?.fb_pixel_id) {
        trackFBPageView();
      }
      
      prevLocationRef.current = location;
    }
  }, [location, settings]);
};