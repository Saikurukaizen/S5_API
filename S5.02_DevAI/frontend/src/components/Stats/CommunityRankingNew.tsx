import React from 'react';
import { useCommunitiesRanking } from '../../hooks/useCommunities';
import './CommunityRanking.css';

interface CommunityData {
  id: string;
  position: number;
  name: string;
  discipline: string;
  icon: string;
  users_count: number;
  progressPercentage: number;
  positionType?: 'gold' | 'silver' | 'bronze';
}

const getPositionIcon = (position: number, positionType?: string) => {
  if (positionType === 'gold') return '🥇';
  if (positionType === 'silver') return '🥈';
  if (positionType === 'bronze') return '🥉';
  return position.toString();
};

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

// Function to generate ranking from real communities data
const generateRankingFromCommunities = (communitiesRanking: any[]): CommunityData[] => {
  if (!communitiesRanking || communitiesRanking.length === 0) {
    return [];
  }

  const maxMembers = communitiesRanking.length > 0 ? communitiesRanking[0].members_count : 1;
  
  return communitiesRanking.slice(0, 5).map((community, index) => {
    const disciplineName = community.discipline?.name || 'Unknown';
    const membersCount = community.members_count || 0;
    
    return {
      id: community.id.toString(),
      position: community.rank || (index + 1),
      name: community.name,
      discipline: `${getDisciplineEmoji(disciplineName)} ${disciplineName}`,
      icon: getDisciplineEmoji(disciplineName),
      users_count: membersCount,
      progressPercentage: Math.round((membersCount / maxMembers) * 100),
      positionType: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : undefined
    };
  });
};

export const CommunityRanking: React.FC = () => {
  const { data: rankingResponse, isLoading, isError } = useCommunitiesRanking();
  
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
              <div className="ranking-discipline">Verifica la conexión con el servidor</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const communitiesRanking = rankingResponse?.data || [];
  const communityRanking = generateRankingFromCommunities(communitiesRanking);

  return (
    <div className="card community-ranking-card">
      <div className="card-header">
        <h2 className="card-title">🏆 RANKING TOP 5 COMUNIDADES</h2>
        <span className="card-subtitle">Por número de miembros</span>
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
            <div className="ranking-members">{community.users_count}</div>
          </div>
        ))}
        
        {communityRanking.length === 0 && (
          <div className="ranking-item">
            <div className="ranking-position">📭</div>
            <div className="ranking-info">
              <div className="ranking-name">No hay comunidades disponibles</div>
              <div className="ranking-discipline">Crea la primera comunidad para empezar</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};