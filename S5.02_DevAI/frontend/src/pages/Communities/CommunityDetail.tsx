import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { communitiesApi } from '../../api/communities';
import { useRole } from '../../hooks/useRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './CommunityDetail.css';

const CommunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { permissions } = useRole();

  const { data, isLoading, error } = useQuery({
    queryKey: ['community', id],
    queryFn: () => communitiesApi.getById(Number(id)),
    enabled: !!id,
  });

  const { data: membersData, isLoading: membersLoading } = useQuery({
    queryKey: ['community-members', id],
    queryFn: () => communitiesApi.getMembers(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="community-detail">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="community-detail">
        <div className="error-container">
          <h2>⚠️ ERROR</h2>
          <p>No se pudo cargar la información de la comunidad</p>
          <button 
            className="btn-cyber btn-secondary"
            onClick={() => navigate('/communities')}
          >
            ← VOLVER A COMUNIDADES
          </button>
        </div>
      </div>
    );
  }

  const community = data.data;
  const members = membersData?.data || [];

  return (
    <div className="community-detail">
      <div className="detail-header">
        <button 
          className="btn-cyber btn-ghost"
          onClick={() => navigate('/communities')}
        >
          ← VOLVER
        </button>
        <div className="header-info">
          <h1 className="community-title">👥 DETALLE DE COMUNIDAD</h1>
          <p className="community-subtitle">Información detallada de la comunidad</p>
        </div>
        {permissions.canEditCommunities && (
          <button 
            className="btn-cyber btn-primary"
            onClick={() => navigate(`/communities/${id}/edit`)}
          >
            ✏️ EDITAR
          </button>
        )}
      </div>

      <div className="detail-content">
        <div className="main-info">
          <div className="community-card">
            <div className="community-icon">
              👥
            </div>
            
            <div className="community-info">
              <div className="info-grid">
                <div className="info-item">
                  <label className="info-label">ID</label>
                  <span className="info-value">{community.id}</span>
                </div>

                <div className="info-item">
                  <label className="info-label">NOMBRE</label>
                  <span className="info-value">{community.name}</span>
                </div>

                <div className="info-item">
                  <label className="info-label">DISCIPLINA</label>
                  <span className="info-value discipline-name">
                    {community.discipline?.name || `ID: ${community.discipline_id}`}
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label">MODERADOR</label>
                  <span className="info-value">
                    {community.moderator?.name || `ID: ${community.user_id}`}
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label">MIEMBROS</label>
                  <span className="info-value members-count">
                    {community.users_count || members.length} miembros
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label">FECHA DE CREACIÓN</label>
                  <span className="info-value">
                    {new Date(community.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {community.description && (
                <div className="description-section">
                  <label className="info-label">DESCRIPCIÓN</label>
                  <p className="description-text">{community.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="members-card">
            <h3 className="card-title">👥 MIEMBROS ({members.length})</h3>
            {membersLoading ? (
              <div className="loading-small">Cargando miembros...</div>
            ) : members.length > 0 ? (
              <div className="members-list">
                {members.slice(0, 10).map((member) => (
                  <div key={member.id} className="member-item">
                    <div className="member-avatar">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="member-info">
                      <span className="member-name">{member.name}</span>
                      <span className="member-email">{member.email}</span>
                    </div>
                  </div>
                ))}
                {members.length > 10 && (
                  <div className="more-members">
                    +{members.length - 10} miembros más
                  </div>
                )}
              </div>
            ) : (
              <p className="no-members">No hay miembros en esta comunidad</p>
            )}
          </div>

          <div className="actions-card">
            <h3 className="card-title">🛠️ ACCIONES</h3>
            <div className="actions-grid">
              <button 
                className="action-btn"
                onClick={() => navigate(`/communities/${id}/members`)}
              >
                👥 Gestionar Miembros
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate(`/communities/${id}/activities`)}
              >
                📊 Ver Actividades
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate(`/communities/${id}/stats`)}
              >
                📈 Ver Estadísticas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;