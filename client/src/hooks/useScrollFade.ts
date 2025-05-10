import { useEffect, useRef } from 'react';

/**
 * Hook to handle fade-in animation on scroll for sections
 */
export function useScrollFade() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Options for the Intersection Observer
    const options = {
      root: null, // viewport is used as root
      rootMargin: '0px',
      threshold: 0.1, // trigger when 10% of the target is visible
    };

    // Callback function when intersection is detected
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once the animation is triggered, no need to observe this element anymore
          observer.unobserve(entry.target);
        }
      });
    };

    // Create an observer with the callback and options
    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Get all elements with fade-section class and observe them
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Cleanup observer when component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null; // This hook doesn't return anything, it just sets up the observer
}