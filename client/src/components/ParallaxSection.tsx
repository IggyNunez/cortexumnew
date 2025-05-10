import React, { ReactNode } from 'react';
import { useParallax, useParallaxContainer } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.15,
  reverse = false,
  className = '',
  backgroundColor = 'transparent',
  disabled = false,
}) => {
  // Use parallax effect
  const sectionRef = useParallax<HTMLDivElement>({ 
    speed, 
    reverse, 
    disabled,
  });
  
  // Container references
  const containerRef = useParallaxContainer();
  
  return (
    <div 
      ref={containerRef}
      className={`parallax-container ${className}`}
      style={{ backgroundColor }}
    >
      <div 
        ref={sectionRef} 
        className="parallax-section w-full"
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;