import React, { useEffect, useState } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  animated?: boolean;
  showValue?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = 'var(--accent-color)',
  height = 4,
  animated = true,
  showValue = false,
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setCurrentValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentValue(percentage);
    }
  }, [percentage, animated]);

  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-track" 
        style={{ height: `${height}px` }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${currentValue}%`,
            background: color.includes('gradient') ? color : `linear-gradient(135deg, ${color}, ${color}dd)`,
            transition: animated ? 'width 0.8s ease' : 'none',
          }}
        />
      </div>
      {showValue && (
        <span className="progress-value">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;