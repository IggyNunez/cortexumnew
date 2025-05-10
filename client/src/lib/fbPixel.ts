import ReactPixel from 'react-facebook-pixel';

// Initialize Facebook Pixel
export const initFBPixel = (pixelId?: string) => {
  if (!pixelId) {
    console.warn('Missing required Facebook Pixel ID');
    return;
  }

  const options = {
    autoConfig: true,
    debug: false
  };

  ReactPixel.init(pixelId, undefined, options);
};

// Track page view
export const trackFBPageView = () => {
  ReactPixel.pageView();
};

// Track standard event
export const trackFBEvent = (eventName: string, data?: any) => {
  ReactPixel.track(eventName, data);
};

// Track custom event
export const trackFBCustomEvent = (eventName: string, data?: any) => {
  ReactPixel.trackCustom(eventName, data);
};

// Track lead event
export const trackFBLeadEvent = (leadData: any) => {
  // Track lead generation event
  ReactPixel.track('Lead', {
    content_name: 'Lead Form Submission',
    content_category: leadData.business_type || 'General',
    value: 50.00, // Estimated lead value
    currency: 'USD',
    status: true,
    company: leadData.company,
    industry: leadData.business_type
  });
};

// Server-side tracking for Facebook Conversion API (CAPI)
export const trackServerSideEvent = async (
  event: string, 
  pixelId: string, 
  accessToken: string, 
  eventData: any
) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            event_name: event,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: {
              client_ip_address: null, // Server will capture this
              client_user_agent: navigator.userAgent,
              em: eventData.email ? eventData.email : null,
              fn: eventData.firstName ? eventData.firstName : null,
              ln: eventData.lastName ? eventData.lastName : null,
              ph: eventData.phone ? eventData.phone : null,
            },
            custom_data: {
              ...eventData.customData
            }
          }
        ],
        access_token: accessToken
      })
    });

    return await response.json();
  } catch (error) {
    console.error('Error sending Facebook CAPI event:', error);
    return null;
  }
};