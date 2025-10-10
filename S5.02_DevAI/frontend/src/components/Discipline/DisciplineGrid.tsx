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
}

const DisciplineGrid: React.FC<DisciplineGridProps> = ({
  disciplines,
  onDisciplineClick,
  selectedDisciplines = [],
  title = 'Disciplinas Deportivas',
  subtitle = 'Selecciona las disciplinas que más te interesan',
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
        {disciplines.map((discipline) => (
          <DisciplineCard
            key={discipline.id}
            discipline={discipline}
            onClick={onDisciplineClick}
            selected={selectedDisciplines.includes(discipline.id)}
          />
        ))}
      </div>
      
      {disciplines.length === 0 && (
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