import React from 'react';

interface ChipIconProps {
  size?: number;
  color?: string;
  animated?: boolean;
}

export const ChipIcon: React.FC<ChipIconProps> = ({ 
  size = 24, 
  color = '#00ffff', 
  animated = true 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `drop-shadow(0 0 6px ${color})`,
        animation: animated ? 'chipPulse 2s infinite ease-in-out' : 'none'
      }}
    >
      {/* Chip base */}
      <rect 
        x="4" 
        y="6" 
        width="16" 
        height="12" 
        rx="2" 
        stroke={color} 
        strokeWidth="1.5" 
        fill="none"
      />
      
      {/* Circuit lines */}
      <path 
        d="M7 9h10M7 12h10M7 15h6" 
        stroke={color} 
        strokeWidth="1" 
        opacity="0.7"
      />
      
      {/* Connection pins */}
      <rect x="2" y="8" width="2" height="2" fill={color} />
      <rect x="2" y="14" width="2" height="2" fill={color} />
      <rect x="20" y="8" width="2" height="2" fill={color} />
      <rect x="20" y="14" width="2" height="2" fill={color} />
      
      {/* Top pins */}
      <rect x="8" y="3" width="2" height="3" fill={color} />
      <rect x="14" y="3" width="2" height="3" fill={color} />
      
      {/* Bottom pins */}
      <rect x="8" y="18" width="2" height="3" fill={color} />
      <rect x="14" y="18" width="2" height="3" fill={color} />
      
      {/* Central processing unit indicator */}
      <circle 
        cx="12" 
        cy="12" 
        r="2" 
        stroke={color} 
        strokeWidth="1" 
        fill="none"
        opacity="0.8"
      />
      <circle 
        cx="12" 
        cy="12" 
        r="1" 
        fill={color} 
        opacity="0.6"
      />
      
      {/* Power indicator */}
      <circle 
        cx="17" 
        cy="9" 
        r="1" 
        fill={color}
        style={{
          animation: animated ? 'powerBlink 1.5s infinite' : 'none'
        }}
      />
      
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes chipPulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.05);
          }
        }
        
        @keyframes powerBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        `
      }} />
    </svg>
  );
};

export default ChipIcon;