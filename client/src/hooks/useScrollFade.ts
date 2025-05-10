import { useEffect, useRef } from 'react';

/**
 * Hook to handle fade-in animation on scroll for sections
 */
export function useScrollFade() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Options for the Intersection Observer - more lenient threshold for smoother appearance
    const options = {
      root: null, // viewport is used as root
      rootMargin: '50px', // Start a bit before elements come into view
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for smoother transitions
    };

    // Callback function when intersection is detected
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        // Get the element
        const element = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          // Instead of just adding a class, apply a smooth transition based on intersection ratio
          const ratio = Math.min(1, entry.intersectionRatio * 2); // Double the ratio for faster fade-in
          
          // Set transform and opacity with requestAnimationFrame for smoother rendering
          requestAnimationFrame(() => {
            element.style.opacity = `${ratio}`;
            element.style.transform = `translateY(${(1 - ratio) * 20}px)`;
            
            // If fully visible, add the class and stop observing
            if (ratio >= 0.9) {
              element.classList.add('is-visible');
              observer.unobserve(entry.target);
              
              // Clean up inline styles after transition completes
              setTimeout(() => {
                if (element) {
                  element.style.transition = '';
                  element.style.opacity = '';
                  element.style.transform = '';
                }
              }, 500);
            }
          });
        }
      });
    };

    // Create an observer with the callback and options
    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Get all elements with fade-section class and prepare them
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => {
      const element = section as HTMLElement;
      
      // Set initial styles for fade effect
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.willChange = 'opacity, transform';
      element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      
      // Start observing
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup observer when component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Reset all elements
      sections.forEach((section) => {
        const element = section as HTMLElement;
        element.style.opacity = '';
        element.style.transform = '';
        element.style.willChange = '';
        element.style.transition = '';
      });
    };
  }, []);

  return null; // This hook doesn't return anything, it just sets up the observer
}