import React from 'react';
import StatsCard from './StatsCard';
import { Stat } from '../../types';
import './StatsGrid.css';

interface StatsGridProps {
  stats: Stat[];
  onStatClick?: (stat: Stat) => void;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, onStatClick }) => {
  const getColorForIndex = (index: number) => {
    const colors = [
      'var(--gradient-primary)',
      'var(--gradient-success)', 
      'var(--gradient-warning)',
      'var(--gradient-error)',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          trend={stat.trend}
          progress={stat.progress}
          color={getColorForIndex(index)}
          onClick={onStatClick ? () => onStatClick(stat) : undefined}
        />
      ))}
    </div>
  );
};

export default StatsGrid;