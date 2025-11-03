import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../api';
import { RoleBadge } from '../../components/RoleBadge/RoleBadge';
import { useRole } from '../../hooks/useRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './UserDetail.css';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { permissions } = useRole();

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="user-detail">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="user-detail">
        <div className="error-container">
          <h2>⚠️ ERROR</h2>
          <p>No se pudo cargar la información del usuario</p>
          <button 
            className="btn-cyber btn-secondary"
            onClick={() => navigate('/users')}
          >
            ← VOLVER A USUARIOS
          </button>
        </div>
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="user-detail">
      <div className="detail-header">
        <button 
          className="btn-cyber btn-ghost"
          onClick={() => navigate('/users')}
        >
          ← VOLVER
        </button>
        <div className="header-info">
          <h1 className="user-title">👤 PERFIL DE USUARIO</h1>
          <p className="user-subtitle">Información detallada del usuario</p>
        </div>
        {permissions.canEditUsers && (
          <button 
            className="btn-cyber btn-primary"
            onClick={() => navigate(`/users/${id}/edit`)}
          >
            ✏️ EDITAR
          </button>
        )}
      </div>

      <div className="detail-content">
        <div className="user-card">
          <div className="user-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <div className="user-info">
            <div className="info-grid">
              <div className="info-item">
                <label className="info-label">ID</label>
                <span className="info-value">{user.id}</span>
              </div>

              <div className="info-item">
                <label className="info-label">NOMBRE COMPLETO</label>
                <span className="info-value">{user.name} {user.lastname}</span>
              </div>

              <div className="info-item">
                <label className="info-label">EMAIL</label>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-item">
                <label className="info-label">ROL</label>
                <RoleBadge role={user.role} />
              </div>

              <div className="info-item">
                <label className="info-label">ESTADO</label>
                <span className={`status-badge ${user.email_verified_at ? 'verified' : 'unverified'}`}>
                  {user.email_verified_at ? '✅ Verificado' : '❌ Sin verificar'}
                </span>
              </div>

              <div className="info-item">
                <label className="info-label">FECHA DE REGISTRO</label>
                <span className="info-value">
                  {new Date(user.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {user.date_of_birth && (
                <div className="info-item">
                  <label className="info-label">FECHA DE NACIMIENTO</label>
                  <span className="info-value">
                    {new Date(user.date_of_birth).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}

              {user.discipline_id && (
                <div className="info-item">
                  <label className="info-label">DISCIPLINA FAVORITA</label>
                  <span className="info-value">ID: {user.discipline_id}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="actions-card">
          <h3 className="card-title">🛠️ ACCIONES</h3>
          <div className="actions-grid">
            <button 
              className="action-btn"
              onClick={() => navigate(`/users/${id}/activities`)}
            >
              📊 Ver Actividades
            </button>
            <button 
              className="action-btn"
              onClick={() => navigate(`/users/${id}/communities`)}
            >
              👥 Ver Comunidades
            </button>
            <button 
              className="action-btn"
              onClick={() => navigate(`/users/${id}/stats`)}
            >
              📈 Ver Estadísticas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;