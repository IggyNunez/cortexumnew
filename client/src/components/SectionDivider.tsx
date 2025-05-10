import React from 'react';
import { useParallax } from '@/hooks/useParallax';

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
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  gradient = 'brain-blue',  // Default to a brain-inspired gradient
  height = '120px',
  parallaxSpeed = 0.2,
  className = '',
  reverse = true,
  sticky = false,
  zIndex,
}) => {
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

  // Use enhanced parallax effect on the divider
  const dividerRef = useParallax<HTMLDivElement>({ 
    speed: parallaxSpeed, 
    reverse, 
    sticky,
    stickyThreshold: 0.3,  // Smoother transitions
  });

  return (
    <div 
      ref={dividerRef}
      className={`section-divider ${gradientMap[gradient]} ${className}`} 
      style={{
        height,
        zIndex: zIndex !== undefined ? zIndex : 'auto',
        position: 'relative'
      }}
    />
  );
};

export default SectionDivider;