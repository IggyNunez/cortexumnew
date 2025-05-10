import React, { ReactNode } from 'react';
import { useParallax, useParallaxContainer } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
  sticky?: boolean;          // Enable sticky effect where section appears to stay in place
  stickyThreshold?: number;  // Control when the sticky effect begins/ends (0-1)
  minHeight?: string;        // Min height of the container
  perspective?: number;      // 3D perspective effect
  zIndex?: number;           // Z-index for layering
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.15,
  reverse = false,
  className = '',
  backgroundColor = 'transparent',
  disabled = false,
  sticky = false,
  stickyThreshold = 0.2,
  minHeight = '100vh',
  perspective = 1000,
  zIndex,
}) => {
  // Use parallax effect with sticky option
  const sectionRef = useParallax<HTMLDivElement>({ 
    speed, 
    reverse, 
    disabled,
    sticky,
    stickyThreshold,
  });
  
  // Container references with enhanced options
  const containerRef = useParallaxContainer({
    minHeight,
    perspective,
    sticky: false, // We handle stickiness in the section, not the container
  });
  
  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${className}`}
      style={{ 
        backgroundColor,
        zIndex: zIndex !== undefined ? zIndex : 'auto',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'visible'
      }}
    >
      <div 
        ref={sectionRef} 
        className="parallax-section w-full"
        style={{
          willChange: 'transform',
          transition: 'transform 0.05s linear',
          backfaceVisibility: 'hidden', // Reduces paint complexity
          transform: 'translateZ(0)' // Forces GPU acceleration
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;