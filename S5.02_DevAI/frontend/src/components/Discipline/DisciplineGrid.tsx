import React from 'react';
import DisciplineCard from './DisciplineCard';
import { Discipline } from '../../types';
import './DisciplineGrid.css';

interface DisciplineGridProps {
  disciplines: Discipline[];
  onDisciplineClick?: (discipline: Discipline) => void;
  selectedDisciplines?: string[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
}

const DisciplineGrid: React.FC<DisciplineGridProps> = ({
  disciplines,
  onDisciplineClick,
  selectedDisciplines = [],
  title = 'Disciplinas Deportivas',
  subtitle = 'Selecciona las disciplinas que más te interesan',
  isLoading = false,
}) => {
  return (
    <div className="discipline-section">
      <div className="discipline-header">
        <h2 className="discipline-title">
          <span className="title-icon">🏃‍♂️</span>
          <span>{title}</span>
        </h2>
        {subtitle && (
          <p className="discipline-subtitle">{subtitle}</p>
        )}
      </div>
      
      <div className="discipline-grid">
        {isLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="discipline-card-skeleton">
              <div className="skeleton-content">
                <div className="skeleton-icon"></div>
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-description"></div>
              </div>
            </div>
          ))
        ) : (
          disciplines.map((discipline) => (
            <DisciplineCard
              key={discipline.id}
              discipline={discipline}
              onClick={onDisciplineClick}
              selected={selectedDisciplines.includes(discipline.id)}
            />
          ))
        )}
      </div>
      
      {!isLoading && disciplines.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏃‍♂️</div>
          <h3>No hay disciplinas disponibles</h3>
          <p>Pronto habrá más disciplinas deportivas disponibles</p>
        </div>
      )}
    </div>
  );
};

export default DisciplineGrid;