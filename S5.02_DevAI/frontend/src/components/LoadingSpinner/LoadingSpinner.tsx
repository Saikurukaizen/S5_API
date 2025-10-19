import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'medium',
  fullScreen = false,
}) => {
  const containerClass = fullScreen 
    ? 'loading-container loading-fullscreen' 
    : 'loading-container';

  return (
    <div className={containerClass}>
      <div className={`loading-spinner loading-spinner-${size}`}>
        <div className="spinner-circle"></div>
      </div>
      <div className="loading-message">{message}</div>
    </div>
  );
};

export default LoadingSpinner;