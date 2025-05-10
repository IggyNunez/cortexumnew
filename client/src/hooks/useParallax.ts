import { useEffect, useRef, MutableRefObject } from 'react';

interface ParallaxOptions {
  speed?: number;        // How fast the parallax effect moves (default 0.5)
  reverse?: boolean;     // Reverse the direction of movement
  disabled?: boolean;    // Disable the effect on mobile or as needed
  sticky?: boolean;      // Make the section appear to "stick" in place while scrolling
  stickyThreshold?: number; // Point at which the element starts sticking (0-1, default 0.2)
}

/**
 * Hook for adding parallax scrolling effect to elements
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({ 
  speed = 0.5, 
  reverse = false, 
  disabled = false,
  sticky = false,
  stickyThreshold = 0.2
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
      const scrollY = window.scrollY;
      const elementOffsetTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      if (sticky) {
        // For sticky effect - calculate progress through the section
        const sectionStart = elementOffsetTop - viewportHeight;
        const sectionLength = elementHeight + viewportHeight;
        const scrollProgress = (scrollY - sectionStart) / sectionLength;
        
        if (scrollProgress >= 0 && scrollProgress <= 1) {
          // Adjust this value to control when the sticky effect starts/ends
          const stickyStart = stickyThreshold;
          const stickyEnd = 1 - stickyThreshold;
          
          // Apply smooth easing at the beginning and end
          let translateY = 0;
          
          if (scrollProgress < stickyStart) {
            // Beginning transition - element moves up into view
            translateY = (scrollProgress / stickyStart - 1) * viewportHeight * 0.5;
          } else if (scrollProgress > stickyEnd) {
            // Ending transition - element moves away
            translateY = ((scrollProgress - stickyEnd) / (1 - stickyEnd)) * viewportHeight * 0.5;
          } else {
            // Middle section - element "sticks" in view
            translateY = 0;
          }
          
          element.style.transform = `${initialTransform} translateY(${translateY}px)`;
          return;
        }
      }
      
      // Traditional parallax effect - calculate how far the element is from the center 
      const distanceFromCenter = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      
      // Apply traditional parallax effect
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

interface ParallaxContainerOptions {
  minHeight?: string;  // Minimum height for the container (default: '100vh')
  perspective?: number; // 3D perspective value (default: 1000)
  sticky?: boolean;     // Whether container should have sticky behavior
}

/**
 * Hook for the parallax container to ensure proper setup
 */
export function useParallaxContainer({
  minHeight = '100vh',
  perspective = 1000,
  sticky = false
}: ParallaxContainerOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Ensure container has proper CSS for parallax to work
    container.style.overflowX = 'hidden';
    container.style.position = 'relative';
    container.style.minHeight = minHeight;
    
    // Add perspective for 3D effect if specified
    if (perspective > 0) {
      container.style.perspective = `${perspective}px`;
    }
    
    // Add sticky behavior if needed
    if (sticky) {
      container.style.position = 'sticky';
      container.style.top = '0';
    }
    
    return () => {
      if (container) {
        container.style.overflowX = '';
        container.style.position = '';
        container.style.minHeight = '';
        container.style.perspective = '';
        container.style.top = '';
      }
    };
  }, [minHeight, perspective, sticky]);
  
  return containerRef;
}