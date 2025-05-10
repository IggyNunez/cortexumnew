import React from 'react';
import BrainWaveAnimation from './BrainWaveAnimation';

type GradientType = 'light' | 'dark' | 'blue' | 'purple';

interface SectionDividerProps {
  gradient?: GradientType;
  showWave?: boolean;
  waveColor?: string;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  gradient = 'light',
  showWave = false,
  waveColor,
  className = '',
}) => {
  // Map gradient types to classes
  const gradientMap: Record<GradientType, string> = {
    light: 'divider-gradient-light',
    dark: 'divider-gradient-dark',
    blue: 'divider-gradient-blue',
    purple: 'from-transparent to-[#4A1D6F]/10',
  };

  // Set wave color based on gradient type if not specified
  const defaultWaveColors: Record<GradientType, string> = {
    light: 'rgba(180, 133, 255, 0.3)',
    dark: 'rgba(80, 60, 120, 0.3)',
    blue: 'rgba(53, 123, 216, 0.3)',
    purple: 'rgba(180, 133, 255, 0.3)',
  };

  const waveColorToUse = waveColor || defaultWaveColors[gradient];

  return (
    <div className={`section-divider ${gradientMap[gradient]} ${className}`}>
      {showWave && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <BrainWaveAnimation 
            width={window.innerWidth} 
            height={50} 
            color={waveColorToUse}
          />
        </div>
      )}
    </div>
  );
};

export default SectionDivider;