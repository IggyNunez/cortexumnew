import React from 'react';
import { useParallax } from '@/hooks/useParallax';

type GradientType = 'light' | 'dark' | 'blue' | 'purple' | 'none';

interface SectionDividerProps {
  gradient?: GradientType;
  height?: string;
  parallaxSpeed?: number;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  gradient = 'light',
  height = '120px',
  parallaxSpeed = 0.2,
  className = '',
}) => {
  // Map gradient types to classes
  const gradientMap: Record<GradientType, string> = {
    light: 'divider-gradient-light',
    dark: 'divider-gradient-dark',
    blue: 'divider-gradient-blue',
    purple: 'divider-gradient-purple',
    none: '',
  };

  // Use parallax effect on the divider
  const dividerRef = useParallax<HTMLDivElement>({ speed: parallaxSpeed, reverse: true });

  const style = {
    height,
  };

  return (
    <div 
      ref={dividerRef}
      className={`section-divider ${gradientMap[gradient]} ${className}`} 
      style={style}
    />
  );
};

export default SectionDivider;