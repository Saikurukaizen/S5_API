import React from 'react';
import './StatusIndicator.css';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'medium',
  animated = true,
  className = '',
}) => {
  return (
    <div 
      className={`status-indicator ${status} ${size} ${animated ? 'animated' : ''} ${className}`}
      title={status === 'online' ? 'En línea' : status === 'busy' ? 'Ocupado' : 'Desconectado'}
    />
  );
};

export default StatusIndicator;