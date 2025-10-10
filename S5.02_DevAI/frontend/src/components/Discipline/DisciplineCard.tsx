import React from 'react';
import { Discipline } from '../../types';
import './DisciplineCard.css';

interface DisciplineCardProps {
  discipline: Discipline;
  onClick?: (discipline: Discipline) => void;
  selected?: boolean;
}

const DisciplineCard: React.FC<DisciplineCardProps> = ({
  discipline,
  onClick,
  selected = false,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(discipline);
    }
  };

  return (
    <div 
      className={`discipline-card ${selected ? 'selected' : ''} ${onClick ? 'clickable' : ''} ${discipline.isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="discipline-icon">
        {discipline.icon}
      </div>
      <div className="discipline-name">
        {discipline.name}
      </div>
      {discipline.isActive && (
        <div className="active-indicator">
          <span className="active-dot"></span>
        </div>
      )}
    </div>
  );
};

export default DisciplineCard;