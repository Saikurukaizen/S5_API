import React from 'react';
import CommunityCard from './CommunityCard';
import { Community } from '../../types';
import './CommunityGrid.css';

interface CommunityGridProps {
  communities: Community[];
  onCommunityClick?: (community: Community) => void;
  title?: string;
  showAll?: boolean;
  onShowAllClick?: () => void;
  isLoading?: boolean;
}

const CommunityGrid: React.FC<CommunityGridProps> = ({
  communities,
  onCommunityClick,
  title = 'Mis Comunidades Activas',
  showAll = false,
  onShowAllClick,
  isLoading = false,
}) => {
  const displayedCommunities = showAll ? communities : communities.slice(0, 6);

  return (
    <div className="community-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-icon">🏆</span>
          <span>{title}</span>
        </h2>
        {!showAll && communities.length > 6 && (
          <button className="section-action" onClick={onShowAllClick}>
            Ver Todas
          </button>
        )}
      </div>
      
      <div className="community-grid">
        {isLoading ? (
          // Loading skeleton
          [...Array(6)].map((_, index) => (
            <div key={index} className="community-card-skeleton">
              <div className="skeleton-content">
                <div className="skeleton-image"></div>
                <div className="skeleton-text skeleton-name"></div>
                <div className="skeleton-text skeleton-description"></div>
                <div className="skeleton-text skeleton-members"></div>
              </div>
            </div>
          ))
        ) : (
          displayedCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onClick={onCommunityClick}
            />
          ))
        )}
      </div>
      
      {!isLoading && communities.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏃‍♂️</div>
          <h3>No hay comunidades</h3>
          <p>Únete a tu primera comunidad para empezar a entrenar</p>
          <button className="btn btn-primary">
            Explorar Comunidades
          </button>
        </div>
      )}
    </div>
  );
};

export default CommunityGrid;