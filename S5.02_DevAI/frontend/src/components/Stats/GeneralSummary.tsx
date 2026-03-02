import React from 'react';
import { useStats } from '../../hooks/useStats';
import { useDisciplines } from '../../hooks/useDisciplines';
import './GeneralSummary.css';

interface SummaryItem {
  label: string;
  value: string;
  color?: string;
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
  };
  
  const key = disciplineName.toLowerCase();
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (key.includes(keyword)) {
      return emoji;
    }
  }
  
  return '🏃'; // Default emoji
};

export const GeneralSummary: React.FC = () => {
  const { userStats, disciplineStats, activityStats, isLoading: statsLoading, isError: statsError } = useStats();
  const { data: disciplinesResponse, isLoading: disciplinesLoading, isError: disciplinesError } = useDisciplines();
  
  if (statsLoading || disciplinesLoading) {
    return (
      <div className="card general-summary-card">
        <div className="card-header">
          <h2 className="card-title">📋 RESUMEN GENERAL</h2>
        </div>

        <div className="summary-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="summary-item loading">
              <span className="summary-label">Cargando...</span>
              <span className="summary-value">⏳</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (statsError || disciplinesError) {
    return (
      <div className="card general-summary-card">
        <div className="card-header">
          <h2 className="card-title">📋 RESUMEN GENERAL</h2>
        </div>

        <div className="summary-grid">
          <div className="summary-item error">
            <span className="summary-label">Error al cargar</span>
            <span className="summary-value">❌</span>
          </div>
        </div>
      </div>
    );
  }

  const disciplines = Array.isArray(disciplinesResponse) ? disciplinesResponse : [];
  
  // Calculate summary data from real API responses
  const totalUsers = userStats?.total_users || 0;
  const totalDisciplines = disciplines.length;
  const totalCommunities = Math.ceil(totalDisciplines * 1.8); // Mock: ~1.8 communities per discipline
  const averageMembers = totalUsers > 0 && totalCommunities > 0 ? 
    Math.round(totalUsers / totalCommunities * 10) / 10 : 0;
  
  // Get most popular discipline (first one for now)
  const popularDiscipline = disciplines.length > 0 ? disciplines[0] : null;
  const popularDisciplineText = popularDiscipline ? 
    `${getDisciplineEmoji(popularDiscipline.name)} ${popularDiscipline.name}` : 
    'N/A';
  
  // Mock some additional data based on real data
  const growthRate = totalUsers > 100 ? '+15%' : totalUsers > 50 ? '+8%' : '+3%';
  const activeUsersPercentage = totalUsers > 0 ? '89%' : '0%';
  const largestCommunity = popularDiscipline ? 
    `${popularDiscipline.name} Club` : 
    'N/A';

  const summaryData: SummaryItem[] = [
    { label: 'Total Usuarios', value: totalUsers.toLocaleString() },
    { label: 'Total Comunidades', value: totalCommunities.toString() },
    { label: 'Total Disciplinas', value: totalDisciplines.toString() },
    { label: 'Promedio Miembros', value: averageMembers.toString() },
    { label: 'Comunidad Más Grande', value: largestCommunity },
    { label: 'Disciplina Popular', value: popularDisciplineText },
    { label: 'Tasa de Crecimiento', value: growthRate, color: 'var(--neon-green)' },
    { label: 'Usuarios Activos', value: activeUsersPercentage }
  ];

  return (
    <div className="card general-summary-card">
      <div className="card-header">
        <h2 className="card-title">📋 RESUMEN GENERAL</h2>
      </div>

      <div className="summary-grid">
        {summaryData.map((item, index) => (
          <div key={index} className="summary-item">
            <span className="summary-label">{item.label}</span>
            <span 
              className="summary-value" 
              style={item.color ? { color: item.color } : {}}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};