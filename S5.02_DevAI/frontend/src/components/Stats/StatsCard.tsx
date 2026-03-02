import React from 'react';
import ProgressBar from '../UI/ProgressBar';
import './StatsCard.css';

interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  trend?: string;
  progress?: number;
  color?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  value,
  label,
  trend,
  progress,
  color = 'var(--accent-color)',
  onClick,
}) => {
  const isPositiveTrend = trend && trend.startsWith('+');

  return (
    <div 
      className={`stats-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="stats-header">
        <div className="stats-icon" style={{ background: color }}>
          {icon}
        </div>
        {trend && (
          <div className={`stats-trend ${isPositiveTrend ? 'positive' : 'negative'}`}>
            {trend}
          </div>
        )}
      </div>

      <div className="stats-content">
        <div className="stats-value">{value}</div>
        <div className="stats-label">{label}</div>
      </div>

      {progress !== undefined && (
        <div className="stats-progress">
          <ProgressBar 
            value={progress} 
            color={color}
            height={4}
            animated={true}
          />
        </div>
      )}
    </div>
  );
};

export default StatsCard;