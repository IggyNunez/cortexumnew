// Google Analytics Integration

// Initialize Google Analytics
export const initGA = (measurementId?: string) => {
  if (!measurementId) {
    console.warn('Missing required Google Analytics key: GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string, measurementId?: string) => {
  if (typeof window === 'undefined' || !window.gtag || !measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track lead conversion events
export const trackLeadConversion = (leadData: any) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Track lead submission as a conversion
  window.gtag('event', 'generate_lead', {
    currency: 'USD',
    value: 50, // Estimated value of a lead
    event_category: 'leads',
    event_label: leadData.company || 'Unknown',
    lead_name: leadData.name,
    lead_email: leadData.email && leadData.email.split('@')[1], // Only track domain for privacy
    lead_company: leadData.company,
    lead_source: leadData.source || 'website',
  });
};