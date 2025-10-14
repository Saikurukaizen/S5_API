import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ProfileSidebar.css';

interface Community {
  id: string;
  name: string;
  icon: string;
  members: number;
}

// Mock communities data - TODO: Replace with API call
const mockCommunities: Community[] = [
  { id: '1', name: 'Running BCN', icon: '🏃', members: 156 },
  { id: '2', name: 'Cycling Masters', icon: '🚴', members: 89 },
  { id: '3', name: 'Swim Team Pro', icon: '🏊', members: 67 }
];

export const ProfileSidebar: React.FC = () => {
  const { user } = useAuth();

  const handleLeaveCommunity = (communityId: string) => {
    // TODO: Implement leave community logic with API
    console.log('Leaving community:', communityId);
  };

  const handleJoinCommunity = () => {
    // TODO: Implement join community modal/page
    console.log('Join community clicked');
  };

  return (
    <div className="profile-sidebar">
      <div className="card">
        {/* Avatar Section */}
        <div className="avatar-section">
          <div className="avatar-wrapper">
            <div className="avatar">👤</div>
            <div className="avatar-badge">⚡</div>
          </div>
          <h2 className="user-name">{user?.name || 'MARC SANCHEZ'}</h2>
          <p className="user-email">{user?.email || 'doom@user.com'}</p>
          <span className="user-role">🏅 {user?.role?.toUpperCase() || 'USER'}</span>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{mockCommunities.length}</div>
            <div className="stat-label">Comunidades</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">5</div>
            <div className="stat-label">Disciplinas</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">142</div>
            <div className="stat-label">Conexiones</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">89%</div>
            <div className="stat-label">Actividad</div>
          </div>
        </div>

        {/* Communities Section */}
        <h3 className="section-title">🏆 MIS COMUNIDADES</h3>
        <div className="communities-list">
          {mockCommunities.map((community) => (
            <div key={community.id} className="community-item">
              <div className="community-info">
                <div className="community-icon">{community.icon}</div>
                <div>
                  <div className="community-name">{community.name}</div>
                  <div className="community-members">{community.members} miembros</div>
                </div>
              </div>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleLeaveCommunity(community.id)}
              >
                SALIR
              </button>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-pink join-community-btn"
          onClick={handleJoinCommunity}
        >
          ➕ UNIRSE A COMUNIDAD
        </button>
      </div>
    </div>
  );
};