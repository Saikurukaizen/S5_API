// src/pages/Moderation.tsx
import React, { useState, useEffect } from 'react';
import './Moderation.css';

interface ModerationAction {
  id: number;
  type: 'warning' | 'suspension' | 'ban' | 'content_removal';
  target_type: 'user' | 'post' | 'comment' | 'community';
  target_id: string;
  target_name: string;
  reason: string;
  moderator: string;
  action_date: string;
  duration?: string;
  status: 'active' | 'expired' | 'appealed' | 'revoked';
}

interface ModerationStats {
  total_actions: number;
  actions_today: number;
  active_suspensions: number;
  pending_appeals: number;
}

interface PendingReview {
  id: number;
  type: 'user_report' | 'auto_flag' | 'appeal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  description: string;
  submitted_at: string;
  auto_score?: number;
}

const Moderation: React.FC = () => {
  const [actions, setActions] = useState<ModerationAction[]>([]);
  const [stats, setStats] = useState<ModerationStats | null>(null);
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'actions' | 'pending'>('dashboard');

  useEffect(() => {
    loadModerationData();
  }, []);

  const loadModerationData = async () => {
    setLoading(true);
    
    try {
      // Datos mockeados para Moderation
      const mockActions: ModerationAction[] = [
        {
          id: 1,
          type: 'warning',
          target_type: 'user',
          target_id: 'user_123',
          target_name: '@usuario_problematico',
          reason: 'Lenguaje inapropiado en comunidad',
          moderator: 'moderator_01',
          action_date: '2024-11-02T14:30:00Z',
          status: 'active'
        },
        {
          id: 2,
          type: 'content_removal',
          target_type: 'post',
          target_id: 'post_456',
          target_name: 'Post ofensivo sobre técnicas',
          reason: 'Contenido que viola las normas comunitarias',
          moderator: 'moderator_02',
          action_date: '2024-11-02T12:15:00Z',
          status: 'active'
        },
        {
          id: 3,
          type: 'suspension',
          target_type: 'user',
          target_id: 'user_789',
          target_name: '@spammer_usuario',
          reason: 'Spam repetitivo en múltiples comunidades',
          moderator: 'moderator_01',
          action_date: '2024-11-01T16:45:00Z',
          duration: '7 días',
          status: 'active'
        }
      ];

      const mockStats: ModerationStats = {
        total_actions: 156,
        actions_today: 8,
        active_suspensions: 12,
        pending_appeals: 3
      };

      const mockPendingReviews: PendingReview[] = [
        {
          id: 1,
          type: 'auto_flag',
          priority: 'high',
          title: 'Contenido detectado automáticamente',
          description: 'Sistema detectó posible contenido inapropiado',
          submitted_at: '2024-11-02T15:00:00Z',
          auto_score: 0.87
        },
        {
          id: 2,
          type: 'appeal',
          priority: 'medium',
          title: 'Apelación de suspensión',
          description: 'Usuario solicita revisión de suspensión por spam',
          submitted_at: '2024-11-02T13:30:00Z'
        },
        {
          id: 3,
          type: 'user_report',
          priority: 'urgent',
          title: 'Reporte de acoso',
          description: 'Múltiples usuarios reportan acoso persistente',
          submitted_at: '2024-11-02T11:20:00Z'
        }
      ];

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setActions(mockActions);
      setStats(mockStats);
      setPendingReviews(mockPendingReviews);
    } catch (error) {
      console.error('Error loading moderation data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'warning': return 'var(--warning-color)';
      case 'suspension': return 'var(--neon-cyan)';
      case 'ban': return 'var(--error-color)';
      case 'content_removal': return 'var(--neon-purple)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'var(--error-color)';
      case 'high': return 'var(--warning-color)';
      case 'medium': return 'var(--neon-cyan)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'suspension': return '🚫';
      case 'ban': return '🔨';
      case 'content_removal': return '🗑️';
      default: return '⚡';
    }
  };

  if (loading) {
    return (
      <div className="moderation-page">
        <div className="moderation-loading">
          <div className="cyber-spinner"></div>
          <p>CARGANDO PANEL DE MODERACIÓN...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="moderation-page">
      {/* Header */}
      <div className="moderation-header">
        <h1 className="page-title">
          🛡️ CENTRO DE MODERACIÓN
        </h1>
        <p className="page-subtitle">Panel de control para moderadores y administradores</p>
      </div>

      {/* Tabs */}
      <div className="moderation-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          DASHBOARD
        </button>
        <button
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          PENDIENTES ({pendingReviews.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          HISTORIAL
        </button>
      </div>

      {/* Content */}
      <div className="moderation-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="dashboard-section">
            {/* Stats */}
            <div className="moderation-stats">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.total_actions}</div>
                  <div className="stat-label">Acciones Totales</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.actions_today}</div>
                  <div className="stat-label">Acciones Hoy</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🚫</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.active_suspensions}</div>
                  <div className="stat-label">Suspensiones Activas</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.pending_appeals}</div>
                  <div className="stat-label">Apelaciones Pendientes</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Acciones Rápidas</h3>
              <div className="action-grid">
                <button className="quick-action-btn warning">
                  <span className="action-icon">⚠️</span>
                  <span>Enviar Advertencia</span>
                </button>
                <button className="quick-action-btn danger">
                  <span className="action-icon">🚫</span>
                  <span>Suspender Usuario</span>
                </button>
                <button className="quick-action-btn primary">
                  <span className="action-icon">🗑️</span>
                  <span>Eliminar Contenido</span>
                </button>
                <button className="quick-action-btn secondary">
                  <span className="action-icon">📋</span>
                  <span>Generar Reporte</span>
                </button>
              </div>
            </div>

            {/* Recent Actions Preview */}
            <div className="recent-actions">
              <h3>Acciones Recientes</h3>
              <div className="actions-preview">
                {actions.slice(0, 3).map((action) => (
                  <div key={action.id} className="action-preview">
                    <div className="preview-icon" style={{ color: getActionColor(action.type) }}>
                      {getTypeIcon(action.type)}
                    </div>
                    <div className="preview-info">
                      <div className="preview-title">{action.target_name}</div>
                      <div className="preview-meta">
                        {action.moderator} • {new Date(action.action_date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="preview-type" style={{ color: getActionColor(action.type) }}>
                      {action.type.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending Reviews Tab */}
        {activeTab === 'pending' && (
          <div className="pending-section">
            <div className="pending-grid">
              {pendingReviews.map((review) => (
                <div key={review.id} className="pending-card">
                  <div className="pending-header">
                    <div className="pending-priority" style={{ color: getPriorityColor(review.priority) }}>
                      {review.priority.toUpperCase()}
                    </div>
                    <div className="pending-type">
                      {review.type.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="pending-content">
                    <h3>{review.title}</h3>
                    <p>{review.description}</p>
                    {review.auto_score && (
                      <div className="auto-score">
                        Score de confianza: {(review.auto_score * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="pending-footer">
                    <div className="pending-date">
                      {new Date(review.submitted_at).toLocaleDateString()}
                    </div>
                    <div className="pending-actions">
                      <button className="action-btn success">Aprobar</button>
                      <button className="action-btn danger">Rechazar</button>
                      <button className="action-btn secondary">Investigar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions History Tab */}
        {activeTab === 'actions' && (
          <div className="actions-section">
            <div className="actions-list">
              {actions.map((action) => (
                <div key={action.id} className="action-card">
                  <div className="action-header">
                    <div className="action-type" style={{ color: getActionColor(action.type) }}>
                      <span className="action-icon">{getTypeIcon(action.type)}</span>
                      <span>{action.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                    <div className="action-status">
                      {action.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="action-details">
                    <div className="detail-row">
                      <label>Objetivo:</label>
                      <span>{action.target_name} ({action.target_type})</span>
                    </div>
                    <div className="detail-row">
                      <label>Razón:</label>
                      <span>{action.reason}</span>
                    </div>
                    <div className="detail-row">
                      <label>Moderador:</label>
                      <span>{action.moderator}</span>
                    </div>
                    {action.duration && (
                      <div className="detail-row">
                        <label>Duración:</label>
                        <span>{action.duration}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="action-footer">
                    <div className="action-date">
                      {new Date(action.action_date).toLocaleDateString()}
                    </div>
                    <div className="action-controls">
                      <button className="control-btn">Ver Detalles</button>
                      {action.status === 'active' && (
                        <button className="control-btn danger">Revocar</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Moderation;

