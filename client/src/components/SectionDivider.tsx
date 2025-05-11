import React from 'react';
import { useParallax } from '@/hooks/useParallax';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Updated gradient options to include colors from the brain logo
type GradientType = 'light' | 'dark' | 'blue' | 'purple' | 'magenta' | 'brain-blue' | 'brain-purple' | 'brain-magenta' | 'none';

interface SectionDividerProps {
  gradient?: GradientType;
  height?: string;
  parallaxSpeed?: number;
  className?: string;
  reverse?: boolean;  // Whether to reverse the parallax direction
  sticky?: boolean;   // Enable sticky-like transition effect
  zIndex?: number;    // Control z-index for overlapping
  mobileHeight?: string; // Optional mobile height override
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  gradient = 'brain-blue',  // Default to a brain-inspired gradient
  height = '60px', // Default height for desktop
  mobileHeight = '30px', // Default height for mobile
  parallaxSpeed = 0.05, // Much reduced parallax speed
  className = '',
  reverse = false,
  sticky = false, // Disable sticky by default
  zIndex,
}) => {
  // Check if we're on mobile
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  // Choose appropriate height based on screen size
  const dividerHeight = isMobile ? mobileHeight : height;
  
  // Map gradient types to classes - updated with brain logo colors
  const gradientMap: Record<GradientType, string> = {
    light: 'divider-gradient-light',
    dark: 'divider-gradient-dark',
    blue: 'divider-gradient-blue',
    purple: 'divider-gradient-purple',
    magenta: 'divider-gradient-magenta',
    'brain-blue': 'divider-gradient-brain-blue',
    'brain-purple': 'divider-gradient-brain-purple',
    'brain-magenta': 'divider-gradient-brain-magenta',
    none: '',
  };

  // Use a very subtle parallax effect on the divider
  const dividerRef = useParallax<HTMLDivElement>({ 
    speed: parallaxSpeed, 
    reverse, 
    sticky: false, // Never use sticky on dividers
    disabled: sticky, // If sticky is true, disable parallax completely
  });

  return (
    <div 
      ref={dividerRef}
      className={`section-divider ${gradientMap[gradient]} ${className}`} 
      style={{
        height: dividerHeight,
        zIndex: zIndex !== undefined ? zIndex : 'auto',
        position: 'relative'
      }}
    />
  );
};

export default SectionDivider;