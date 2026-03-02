import React from 'react';
import StatusIndicator from '../UI/StatusIndicator';
import NotificationDot from '../UI/NotificationDot';
import ProgressBar from '../UI/ProgressBar';
import { Community } from '../../types';
import './CommunityCard.css';

interface CommunityCardProps {
  community: Community;
  onClick?: (community: Community) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(community);
    }
  };

  const getUnitLabel = () => {
    switch (community.unit) {
      case 'km':
        return `${community.averageDistance} km promedio`;
      case 'min':
        return `${community.averageTime} min promedio`;
      default:
        return '';
    }
  };

  return (
    <div 
      className={`community-card ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="community-header">
        <StatusIndicator 
          status={community.isOnline ? 'online' : 'offline'} 
          size="medium"
          animated={true}
          className="community-status"
        />
        <NotificationDot 
          count={community.notifications}
          size="medium"
          className="community-notifications"
        />
        
        <div className="community-info">
          <h4 className="community-name">{community.name}</h4>
          <div className="community-discipline">
            <span className="discipline-icon">{community.icon}</span>
            <span className="discipline-name">{community.discipline}</span>
          </div>
        </div>
        
        <div className="community-members">
          {community.users_count} miembros
        </div>
      </div>

      <div className="community-stats">
        <div className="community-stat">
          <span className="stat-value">{community.activeToday}</span>
          <span className="stat-label">activos hoy</span>
        </div>
        
        {(community.averageDistance || community.averageTime) && (
          <div className="community-stat">
            <span className="stat-value">
              {community.averageDistance || community.averageTime}
            </span>
            <span className="stat-label">
              {community.unit} promedio
            </span>
          </div>
        )}
      </div>

      <div className="community-activity">
        <div className="activity-label">
          <span>Actividad</span>
          <span className="activity-percentage">{community.activityLevel}%</span>
        </div>
        <ProgressBar 
          value={community.activityLevel}
          color="var(--gradient-success)"
          height={3}
          animated={true}
          className="activity-progress"
        />
      </div>
    </div>
  );
};

export default CommunityCard;