import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { disciplineService } from '../../api';
import { useRole } from '../../hooks/useRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './DisciplineDetail.css';

const DisciplineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { permissions } = useRole();

  const { data, isLoading, error } = useQuery({
    queryKey: ['discipline', id],
    queryFn: () => disciplineService.getDiscipline(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="discipline-detail">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="discipline-detail">
        <div className="error-container">
          <h2>⚠️ ERROR</h2>
          <p>No se pudo cargar la información de la disciplina</p>
          <button 
            className="btn-cyber btn-secondary"
            onClick={() => navigate('/disciplines')}
          >
            ← VOLVER A DISCIPLINAS
          </button>
        </div>
      </div>
    );
  }

  const discipline = data.data;

  return (
    <div className="discipline-detail">
      <div className="detail-header">
        <button 
          className="btn-cyber btn-ghost"
          onClick={() => navigate('/disciplines')}
        >
          ← VOLVER
        </button>
        <div className="header-info">
          <h1 className="discipline-title">🏃 DETALLE DE DISCIPLINA</h1>
          <p className="discipline-subtitle">Información detallada de la disciplina</p>
        </div>
        {permissions.canEditDisciplines && (
          <button 
            className="btn-cyber btn-primary"
            onClick={() => navigate(`/disciplines/${id}/edit`)}
          >
            ✏️ EDITAR
          </button>
        )}
      </div>

      <div className="detail-content">
        <div className="main-info">
          <div className="discipline-card">
            <div className="discipline-icon">
              🏃
            </div>
            
            <div className="discipline-info">
              <div className="info-grid">
                <div className="info-item">
                  <label className="info-label">ID</label>
                  <span className="info-value">{discipline.id}</span>
                </div>

                <div className="info-item">
                  <label className="info-label">NOMBRE</label>
                  <span className="info-value discipline-name">{discipline.name}</span>
                </div>

                <div className="info-item">
                  <label className="info-label">FECHA DE CREACIÓN</label>
                  <span className="info-value">
                    {new Date(discipline.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label">ÚLTIMA ACTUALIZACIÓN</label>
                  <span className="info-value">
                    {new Date(discipline.updated_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {discipline.description && (
                <div className="description-section">
                  <label className="info-label">DESCRIPCIÓN</label>
                  <p className="description-text">{discipline.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="stats-preview">
            <h3 className="card-title">📊 ESTADÍSTICAS</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">-</div>
                <div className="stat-label">Comunidades</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">-</div>
                <div className="stat-label">Usuarios</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">-</div>
                <div className="stat-label">Actividades</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="actions-card">
            <h3 className="card-title">🛠️ ACCIONES</h3>
            <div className="actions-grid">
              <button 
                className="action-btn"
                onClick={() => navigate(`/disciplines/${id}/communities`)}
              >
                👥 Ver Comunidades
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate(`/disciplines/${id}/activities`)}
              >
                📊 Ver Actividades
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate(`/disciplines/${id}/stats`)}
              >
                📈 Ver Estadísticas Detalladas
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate(`/disciplines/${id}/users`)}
              >
                👤 Ver Usuarios
              </button>
            </div>
          </div>

          <div className="related-content">
            <h3 className="card-title">🔗 CONTENIDO RELACIONADO</h3>
            <div className="related-items">
              <div className="related-item">
                <span className="related-icon">👥</span>
                <div className="related-info">
                  <div className="related-title">Comunidades</div>
                  <div className="related-subtitle">Ver todas las comunidades de esta disciplina</div>
                </div>
              </div>
              <div className="related-item">
                <span className="related-icon">📊</span>
                <div className="related-info">
                  <div className="related-title">Actividades</div>
                  <div className="related-subtitle">Historial de actividades registradas</div>
                </div>
              </div>
              <div className="related-item">
                <span className="related-icon">🏆</span>
                <div className="related-info">
                  <div className="related-title">Rankings</div>
                  <div className="related-subtitle">Mejores usuarios en esta disciplina</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisciplineDetail;