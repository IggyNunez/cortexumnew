import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design - allows checking media queries in React components
 * 
 * @param query Media query string to evaluate (e.g. '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state, or false for SSR
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is defined (not in SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Return early if not in browser
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
    // Older browsers use addListener (deprecated)
    else if ('addListener' in mediaQuery) {
      // @ts-ignore - for older browsers
      mediaQuery.addListener(handleChange);
      return () => {
        // @ts-ignore - for older browsers
        mediaQuery.removeListener(handleChange);
      };
    }
    
    // Fallback no-op cleanup
    return () => {};
  }, [query]);

  return matches;
}