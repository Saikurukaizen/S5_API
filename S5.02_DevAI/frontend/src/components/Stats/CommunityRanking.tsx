import React from 'react';
import { useCommunitiesRanking } from '../../hooks/useCommunities';
import { useDisciplines } from '../../hooks/useDisciplines';
import './CommunityRanking.css';

interface CommunityData {
  id: string;
  position: number;
  name: string;
  discipline: string;
  icon: string;
  members: number;
  progressPercentage: number;
  positionType?: 'gold' | 'silver' | 'bronze';
}

const getPositionIcon = (position: number, positionType?: string) => {
  if (positionType === 'gold') return '🥇';
  if (positionType === 'silver') return '🥈';
  if (positionType === 'bronze') return '🥉';
  return position.toString();
};

// Function to generate mock ranking from real disciplines data
const generateRankingFromDisciplines = (disciplines: any[]): CommunityData[] => {
  if (!disciplines || disciplines.length === 0) {
    return [];
  }

  // Create mock communities based on real disciplines
  return disciplines.slice(0, 5).map((discipline, index) => {
    const mockMembers = [156, 89, 67, 45, 34][index] || 20; // Mock member counts
    const maxMembers = 156; // Reference for percentage calculation
    
    return {
      id: discipline.id.toString(),
      position: index + 1,
      name: `${discipline.name} Club Barcelona`,
      discipline: `${getFirstEmoji(discipline.name)} ${discipline.name}`,
      icon: getFirstEmoji(discipline.name),
      members: mockMembers,
      progressPercentage: Math.round((mockMembers / maxMembers) * 100),
      positionType: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
    };
  });
};

// Helper function to get emoji for discipline
const getFirstEmoji = (disciplineName: string): string => {
  const emojiMap: Record<string, string> = {
    'running': '🏃',
    'cycling': '🚴',
    'swimming': '🏊',
    'football': '⚽',
    'basketball': '�',
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

export const CommunityRanking: React.FC = () => {
  const { data: disciplinesResponse, isLoading, isError } = useDisciplines();
  
  if (isLoading) {
    return (
      <div className="card community-ranking-card">
        <div className="card-header">
          <h2 className="card-title">🏆 RANKING TOP 5 COMUNIDADES</h2>
          <span className="card-subtitle">Cargando datos...</span>
        </div>
        <div className="ranking-list">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="ranking-item loading">
              <div className="ranking-position">⏳</div>
              <div className="ranking-icon">...</div>
              <div className="ranking-info">
                <div className="ranking-name">Cargando...</div>
                <div className="ranking-discipline">...</div>
              </div>
              <div className="progress-bar-wrapper">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <div className="progress-label">...</div>
              </div>
              <div className="ranking-members">...</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card community-ranking-card">
        <div className="card-header">
          <h2 className="card-title">🏆 RANKING TOP 5 COMUNIDADES</h2>
          <span className="card-subtitle">Error al cargar datos</span>
        </div>
        <div className="ranking-list">
          <div className="ranking-item error">
            <div className="ranking-position">❌</div>
            <div className="ranking-info">
              <div className="ranking-name">No se pudieron cargar las comunidades</div>
              <div className="ranking-discipline">Datos basados en disciplinas disponibles</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const disciplines = Array.isArray(disciplinesResponse) ? disciplinesResponse : [];
  const communityRanking = generateRankingFromDisciplines(disciplines);

  return (
    <div className="card community-ranking-card">
      <div className="card-header">
        <h2 className="card-title">🏆 RANKING TOP 5 COMUNIDADES</h2>
        <span className="card-subtitle">Basado en disciplinas disponibles</span>
      </div>

      <div className="ranking-list">
        {communityRanking.map((community) => (
          <div key={community.id} className="ranking-item">
            <div className={`ranking-position ${community.positionType || ''}`}>
              {getPositionIcon(community.position, community.positionType)}
            </div>
            <div className="ranking-icon">{community.icon}</div>
            <div className="ranking-info">
              <div className="ranking-name">{community.name}</div>
              <div className="ranking-discipline">{community.discipline}</div>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${community.progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-label">{community.progressPercentage}%</div>
            </div>
            <div className="ranking-members">{community.members}</div>
          </div>
        ))}
        
        {communityRanking.length === 0 && (
          <div className="ranking-item">
            <div className="ranking-position">📭</div>
            <div className="ranking-info">
              <div className="ranking-name">No hay comunidades disponibles</div>
              <div className="ranking-discipline">Crea la primera disciplina para empezar</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};