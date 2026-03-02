import React from 'react';
import './NotificationDot.css';

interface NotificationDotProps {
  count: number;
  max?: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const NotificationDot: React.FC<NotificationDotProps> = ({
  count,
  max = 99,
  className = '',
  size = 'medium',
}) => {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span className={`notification-dot ${size} ${className}`}>
      {displayCount}
    </span>
  );
};

export default NotificationDot;