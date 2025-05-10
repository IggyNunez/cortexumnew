import { useEffect, useRef, MutableRefObject } from 'react';

interface ParallaxOptions {
  speed?: number;        // How fast the parallax effect moves (default 0.5)
  reverse?: boolean;     // Reverse the direction of movement
  disabled?: boolean;    // Disable the effect on mobile or as needed
}

/**
 * Hook for adding parallax scrolling effect to elements
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({ 
  speed = 0.5, 
  reverse = false, 
  disabled = false 
}: ParallaxOptions = {}): MutableRefObject<T | null> {
  const elementRef = useRef<T | null>(null);
  
  useEffect(() => {
    if (disabled) return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Direction of movement (positive or negative)
    const direction = reverse ? -1 : 1;
    
    // Initial transform
    let initialTransform = window.getComputedStyle(element).transform;
    if (initialTransform === 'none') initialTransform = '';
    
    const handleScroll = () => {
      // Get element position relative to viewport
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport (as a percentage)
      const distanceFromCenter = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      
      // Apply parallax effect - move element in the opposite direction of scroll
      const translateY = distanceFromCenter * speed * 100 * direction;
      element.style.transform = `${initialTransform} translateY(${translateY}px)`;
    };
    
    // Set initial position
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (element) element.style.transform = initialTransform;
    };
  }, [speed, reverse, disabled]);
  
  return elementRef;
}

/**
 * Hook for the parallax container to ensure proper setup
 */
export function useParallaxContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Ensure container has proper CSS for parallax to work
    container.style.overflowX = 'hidden';
    container.style.position = 'relative';
    
    return () => {
      if (container) {
        container.style.overflowX = '';
        container.style.position = '';
      }
    };
  }, []);
  
  return containerRef;
}