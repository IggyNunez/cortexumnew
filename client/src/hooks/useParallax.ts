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
    
    // Use requestAnimationFrame for smoother animations
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition(lastScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    const updatePosition = (scrollY: number) => {
      // Get element position relative to viewport
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
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
          
          // Apply smooth easing at the beginning and end with cubic bezier easing
          let translateY = 0;
          
          if (scrollProgress < stickyStart) {
            // Beginning transition - apply cubic easing
            const progressRatio = scrollProgress / stickyStart;
            const easedProgress = easeInOutCubic(progressRatio);
            translateY = (easedProgress - 1) * viewportHeight * 0.5;
          } else if (scrollProgress > stickyEnd) {
            // Ending transition - apply cubic easing
            const progressRatio = (scrollProgress - stickyEnd) / (1 - stickyEnd);
            const easedProgress = easeInOutCubic(progressRatio);
            translateY = easedProgress * viewportHeight * 0.5;
          } else {
            // Middle section - element "sticks" in view
            translateY = 0;
          }
          
          element.style.transform = `${initialTransform} translateY(${translateY}px)`;
          element.style.willChange = 'transform';
          return;
        }
      }
      
      // Traditional parallax effect with smoother motion
      const distanceFromCenter = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      
      // Apply parallax with slight damping for smoother feel
      const translateY = distanceFromCenter * speed * 100 * direction;
      element.style.transform = `${initialTransform} translateY(${translateY}px)`;
      element.style.willChange = 'transform';
    };
    
    // Easing function for smoother transitions
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    
    // Set initial position
    updatePosition(lastScrollY);
    
    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (element) {
        // Reset all style properties we've modified
        element.style.transform = initialTransform;
        element.style.willChange = '';
        element.style.transition = '';
        element.style.backfaceVisibility = '';
      }
    };
  }, [speed, reverse, disabled, sticky, stickyThreshold]);
  
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
    container.style.overflowY = 'visible';
    container.style.position = 'relative';
    container.style.minHeight = minHeight;
    container.style.transform = 'translateZ(0)'; // Force GPU acceleration
    container.style.willChange = 'transform'; // Hint for browser optimization
    
    // Add perspective for 3D effect if specified
    if (perspective > 0) {
      container.style.perspective = `${perspective}px`;
      container.style.perspectiveOrigin = 'center center';
    }
    
    // Add sticky behavior if needed
    if (sticky) {
      container.style.position = 'sticky';
      container.style.top = '0';
    }
    
    // Handle resize events to recalculate positions
    const handleResize = () => {
      // Force a reflow by accessing offsetHeight
      container.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      if (container) {
        container.style.overflowX = '';
        container.style.overflowY = '';
        container.style.position = '';
        container.style.minHeight = '';
        container.style.perspective = '';
        container.style.perspectiveOrigin = '';
        container.style.top = '';
        container.style.transform = '';
        container.style.willChange = '';
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [minHeight, perspective, sticky]);
  
  return containerRef;
}