import React from 'react';
import { useDisciplines } from '../../hooks/useDisciplines';
import './DisciplineDistribution.css';

interface DisciplineData {
  id: string;
  icon: string;
  percentage: number;
  label: string;
  participants?: number;
}

// Helper function to get emoji for discipline
const getDisciplineEmoji = (disciplineName: string): string => {
  const emojiMap: Record<string, string> = {
    'running': '🏃',
    'cycling': '🚴',
    'swimming': '🏊',
    'football': '⚽',
    'basketball': '🏀',
    'tennis': '🎾',
    'gym': '🏋️',
    'yoga': '🧘',
    'boxing': '🥊',
    'martial arts': '🥋',
    'baseball': '⚾',
    'volleyball': '🏐',
    'badminton': '🏸',
    'table tennis': '🏓',
    'golf': '⛳',
    'hockey': '🏒',
    'soccer': '⚽',
    'american football': '🏈',
    'rugby': '🏉',
    'climbing': '🧗',
    'skiing': '⛷️',
    'snowboarding': '🏂',
    'surfing': '🏄',
    'skateboarding': '🛹',
    'weightlifting': '🏋️',
    'crossfit': '🏋️',
    'pilates': '🧘',
    'dance': '💃',
    'athletics': '🏃',
    'track': '🏃',
    'field': '🏃',
  };
  
  const key = disciplineName.toLowerCase();
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (key.includes(keyword)) {
      return emoji;
    }
  }
  
  return '🏃'; // Default emoji
};

// Function to generate mock distribution from real disciplines data
const generateDistributionFromDisciplines = (disciplines: any[]): DisciplineData[] => {
  if (!disciplines || disciplines.length === 0) {
    return [];
  }

  // Generate mock participant numbers for each discipline
  const participantCounts = [450, 380, 295, 220, 180, 150, 120, 95]; // Mock participant counts
  const totalParticipants = participantCounts.slice(0, disciplines.length).reduce((sum, count) => sum + count, 0);
  
  const distributionData = disciplines.slice(0, 5).map((discipline, index) => {
    const participants = participantCounts[index] || Math.floor(Math.random() * 100) + 50;
    const percentage = Math.round((participants / totalParticipants) * 100);
    
    return {
      id: discipline.id.toString(),
      icon: getDisciplineEmoji(discipline.name),
      percentage,
      label: discipline.name,
      participants
    };
  });

  // Add "Others" category if there are more than 5 disciplines
  if (disciplines.length > 5) {
    const remainingParticipants = participantCounts.slice(5, disciplines.length).reduce((sum, count) => sum + count, 0);
    const remainingPercentage = Math.round((remainingParticipants / totalParticipants) * 100);
    
    distributionData.push({
      id: 'others',
      icon: '�️',
      percentage: remainingPercentage,
      label: 'Otros',
      participants: remainingParticipants
    });
  }

  return distributionData;
};

export const DisciplineDistribution: React.FC = () => {
  const { data: disciplinesResponse, isLoading, isError } = useDisciplines();
  
  if (isLoading) {
    return (
      <div className="card discipline-distribution-card">
        <div className="card-header">
          <h2 className="card-title">🎯 DISTRIBUCIÓN POR DISCIPLINA</h2>
        </div>

        <div className="distribution-grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="distribution-item loading">
              <div className="distribution-icon">⏳</div>
              <div className="distribution-percentage">...%</div>
              <div className="distribution-label">Cargando...</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card discipline-distribution-card">
        <div className="card-header">
          <h2 className="card-title">🎯 DISTRIBUCIÓN POR DISCIPLINA</h2>
        </div>

        <div className="distribution-grid">
          <div className="distribution-item error">
            <div className="distribution-icon">❌</div>
            <div className="distribution-percentage">0%</div>
            <div className="distribution-label">Error al cargar</div>
          </div>
        </div>
      </div>
    );
  }

  const disciplines = Array.isArray(disciplinesResponse) ? disciplinesResponse : [];
  const disciplineData = generateDistributionFromDisciplines(disciplines);
  
  if (disciplineData.length === 0) {
    return (
      <div className="card discipline-distribution-card">
        <div className="card-header">
          <h2 className="card-title">🎯 DISTRIBUCIÓN POR DISCIPLINA</h2>
        </div>

        <div className="distribution-grid">
          <div className="distribution-item">
            <div className="distribution-icon">📭</div>
            <div className="distribution-percentage">0%</div>
            <div className="distribution-label">Sin disciplinas</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card discipline-distribution-card">
      <div className="card-header">
        <h2 className="card-title">🎯 DISTRIBUCIÓN POR DISCIPLINA</h2>
      </div>

      <div className="distribution-grid">
        {disciplineData.map((discipline) => (
          <div key={discipline.id} className="distribution-item">
            <div className="distribution-icon">{discipline.icon}</div>
            <div className="distribution-percentage">{discipline.percentage}%</div>
            <div className="distribution-label">{discipline.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};