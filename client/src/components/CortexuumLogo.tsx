import React from 'react';
import cortexuumLogo from '../assets/cortexuum-logo.png';

interface CortexuumLogoProps {
  variant?: 'default' | 'white' | 'gradient' | 'image' | 'svg';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const CortexuumLogo: React.FC<CortexuumLogoProps> = ({
  variant = 'default',
  size = 'md',
  showText = true,
  className = '',
}) => {
  // Size mapping for SVG
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  // Size mapping for image
  const imgSizeMap = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  // Text size mapping
  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  // Container class
  const containerClass = `flex items-center ${className}`;

  // Use actual image logo
  const renderImageLogo = () => {
    return (
      <img 
        src="/images/cortexuum-logo.png"
        alt="Cortexuum Logo" 
        className={`${imgSizeMap[size]}`}
      />
    );
  };
  
  // Use SVG logo
  const renderSvgLogo = () => {
    return (
      <img 
        src="/images/cortexuum-logo.png"
        alt="Cortexuum Logo" 
        className={`${imgSizeMap[size]}`}
      />
    );
  };
  
  // SVG brain logo with colored gradient (as a backup and for custom colors)
  const renderBrainLogo = () => {
    // Different color schemes based on variant
    let gradientColors = {
      left: '#E63E8B',
      center: '#B485FF', 
      right: '#357BD8',
    };

    if (variant === 'white') {
      gradientColors = {
        left: '#FFFFFF',
        center: '#F0F0F0',
        right: '#FFFFFF',
      };
    } else if (variant === 'gradient') {
      gradientColors = {
        left: '#FF7550',
        center: '#E63E8B',
        right: '#357BD8',
      };
    }

    return (
      <svg 
        className={sizeMap[size]} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Brain waves left side */}
        <path 
          d="M15,60 C5,50 5,70 15,60" 
          stroke={gradientColors.left} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        <path 
          d="M25,60 C15,45 15,75 25,60" 
          stroke={gradientColors.left} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        
        {/* Brain left hemisphere */}
        <path 
          d="M60,30 C45,30 35,45 35,60 C35,75 45,90 60,90"
          stroke={gradientColors.left}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M50,40 C45,40 40,42 40,45 C40,48 45,50 50,50 C55,50 60,48 60,45"
          stroke={gradientColors.left}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M50,55 C45,55 40,57 40,60 C40,63 45,65 50,65 C55,65 60,63 60,60"
          stroke={gradientColors.center}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M50,70 C45,70 40,72 40,75 C40,78 45,80 50,80 C55,80 60,78 60,75"
          stroke={gradientColors.right}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Brain right hemisphere */}
        <path 
          d="M60,30 C75,30 85,45 85,60 C85,75 75,90 60,90"
          stroke={gradientColors.right}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M70,40 C75,40 80,42 80,45 C80,48 75,50 70,50 C65,50 60,48 60,45"
          stroke={gradientColors.right}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M70,55 C75,55 80,57 80,60 C80,63 75,65 70,65 C65,65 60,63 60,60"
          stroke={gradientColors.center}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path 
          d="M70,70 C75,70 80,72 80,75 C80,78 75,80 70,80 C65,80 60,78 60,75"
          stroke={gradientColors.left}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Brain waves right side */}
        <path 
          d="M105,60 C115,50 115,70 105,60" 
          stroke={gradientColors.right} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        <path 
          d="M95,60 C105,45 105,75 95,60" 
          stroke={gradientColors.right} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </svg>
    );
  };

  // Determine which logo to render
  const renderLogo = () => {
    if (variant === 'image') {
      return renderImageLogo();
    } else if (variant === 'svg') {
      return renderSvgLogo();
    } else {
      return renderBrainLogo();
    }
  };

  return (
    <div className={containerClass}>
      {renderLogo()}
      
      {showText && (
        <div className="ml-3 flex flex-col">
          <span 
            className={`font-bold tracking-wider ${textSizeMap[size]} ${
              variant === 'white' 
                ? 'text-white' 
                : variant === 'gradient' 
                  ? 'cortexuum-gradient-text' 
                  : 'text-gray-900'
            }`}
          >
            CORTEXUUM
          </span>
          {size !== 'sm' && (
            <span 
              className={`text-xs tracking-wide uppercase ${
                variant === 'white' 
                  ? 'text-white/80' 
                  : 'text-gray-500'
              }`}
            >
              AI MARKETING AGENCY
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CortexuumLogo;