import React, { useEffect, useRef } from 'react';

interface BrainWaveAnimationProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  speed?: number;
}

const BrainWaveAnimation: React.FC<BrainWaveAnimationProps> = ({ 
  className = '',
  width = 400,
  height = 100,
  color = 'rgba(180, 133, 255, 0.6)', // Light purple by default
  speed = 1.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Store the increasing value used in the sine function
    let counter = 0;
    
    // Animation settings
    const amplitude = height / 4; // How tall the waves are
    const frequency = 0.02; // How frequent the waves are
    const phaseShift = 0.5; // Offset for second wave
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw first wave 
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + amplitude * Math.sin(frequency * x + counter);
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw second wave (slightly offset)
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + (amplitude * 0.7) * Math.sin(frequency * x + counter + phaseShift);
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Increment counter for animation
      counter += 0.02 * speed;
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    // Start animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [width, height, color, speed]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`brain-wave-canvas ${className}`}
      style={{ width, height }}
    />
  );
};

export default BrainWaveAnimation;