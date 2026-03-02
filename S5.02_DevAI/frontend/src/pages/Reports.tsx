// src/pages/Reports.tsx
import React, { useState, useEffect } from 'react';
import './Reports.css';

interface Report {
  id: number;
  type: 'user' | 'community' | 'activity' | 'security';
  title: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reported_by: string;
  reported_at: string;
  assigned_to?: string;
}

interface ReportStats {
  total_reports: number;
  pending_reports: number;
  resolved_today: number;
  avg_resolution_time: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    
    try {
      // Datos mockeados para Reports
      const mockReports: Report[] = [
        {
          id: 1,
          type: 'user',
          title: 'Usuario con comportamiento inapropiado',
          description: 'Reportado por uso de lenguaje ofensivo en comunidad de Karate',
          status: 'investigating',
          priority: 'high',
          reported_by: 'user_123',
          reported_at: '2024-11-01T10:30:00Z',
          assigned_to: 'moderator_01'
        },
        {
          id: 2,
          type: 'community',
          title: 'Contenido spam en comunidad',
          description: 'Múltiples posts promocionales no relacionados con fitness',
          status: 'pending',
          priority: 'medium',
          reported_by: 'user_456',
          reported_at: '2024-11-02T08:15:00Z'
        },
        {
          id: 3,
          type: 'security',
          title: 'Intento de acceso no autorizado',
          description: 'Múltiples intentos de login fallidos desde IP sospechosa',
          status: 'resolved',
          priority: 'critical',
          reported_by: 'system',
          reported_at: '2024-10-31T23:45:00Z',
          assigned_to: 'admin_security'
        },
        {
          id: 4,
          type: 'activity',
          title: 'Actividad sospechosa en estadísticas',
          description: 'Incremento anormal en métricas de usuario específico',
          status: 'dismissed',
          priority: 'low',
          reported_by: 'analytics_system',
          reported_at: '2024-10-30T16:20:00Z'
        }
      ];

      const mockStats: ReportStats = {
        total_reports: 47,
        pending_reports: 12,
        resolved_today: 5,
        avg_resolution_time: '2.3 días'
      };

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setReports(mockReports);
      setStats(mockStats);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'var(--warning-color)';
      case 'investigating': return 'var(--neon-cyan)';
      case 'resolved': return 'var(--success-color)';
      case 'dismissed': return 'var(--text-muted)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'var(--error-color)';
      case 'high': return 'var(--warning-color)';
      case 'medium': return 'var(--neon-cyan)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'community': return '🏘️';
      case 'activity': return '📊';
      case 'security': return '🔒';
      default: return '📋';
    }
  };

  const filteredReports = reports.filter(report => 
    activeFilter === 'all' || report.status === activeFilter || report.type === activeFilter
  );

  if (loading) {
    return (
      <div className="reports-page">
        <div className="reports-loading">
          <div className="cyber-spinner"></div>
          <p>CARGANDO REPORTES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="reports-header">
        <h1 className="page-title">
          🚨 CENTRO DE REPORTES
        </h1>
        <p className="page-subtitle">Gestión y monitoreo de incidencias del sistema</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="reports-stats">
          <div className="stat-card">
            <div className="stat-icon">�</div>
            <div className="stat-info">
              <div className="stat-value">{stats.total_reports}</div>
              <div className="stat-label">Total Reportes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-value">{stats.pending_reports}</div>
              <div className="stat-label">Pendientes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{stats.resolved_today}</div>
              <div className="stat-label">Resueltos Hoy</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <div className="stat-value">{stats.avg_resolution_time}</div>
              <div className="stat-label">Tiempo Promedio</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="reports-filters">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          TODOS
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          PENDIENTES
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'investigating' ? 'active' : ''}`}
          onClick={() => setActiveFilter('investigating')}
        >
          EN INVESTIGACIÓN
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveFilter('resolved')}
        >
          RESUELTOS
        </button>
      </div>

      {/* Reports List */}
      <div className="reports-content">
        <div className="reports-list">
          {filteredReports.map((report) => (
            <div 
              key={report.id} 
              className={`report-card ${selectedReport?.id === report.id ? 'selected' : ''}`}
              onClick={() => setSelectedReport(report)}
            >
              <div className="report-header">
                <div className="report-type">
                  <span className="type-icon">{getTypeIcon(report.type)}</span>
                  <span className="type-label">{report.type.toUpperCase()}</span>
                </div>
                <div className="report-priority" style={{ color: getPriorityColor(report.priority) }}>
                  {report.priority.toUpperCase()}
                </div>
              </div>
              
              <div className="report-content">
                <h3 className="report-title">{report.title}</h3>
                <p className="report-description">{report.description}</p>
              </div>
              
              <div className="report-footer">
                <div className="report-meta">
                  <span>Por: {report.reported_by}</span>
                  <span>{new Date(report.reported_at).toLocaleDateString()}</span>
                </div>
                <div 
                  className="report-status"
                  style={{ color: getStatusColor(report.status) }}
                >
                  {report.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Detail Panel */}
        {selectedReport && (
          <div className="report-detail">
            <div className="detail-header">
              <h2>Detalle del Reporte #{selectedReport.id}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedReport(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h3>Información General</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Tipo:</label>
                    <span>{getTypeIcon(selectedReport.type)} {selectedReport.type}</span>
                  </div>
                  <div className="detail-item">
                    <label>Prioridad:</label>
                    <span style={{ color: getPriorityColor(selectedReport.priority) }}>
                      {selectedReport.priority}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Estado:</label>
                    <span style={{ color: getStatusColor(selectedReport.status) }}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Reportado por:</label>
                    <span>{selectedReport.reported_by}</span>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>Descripción</h3>
                <p>{selectedReport.description}</p>
              </div>
              
              <div className="detail-actions">
                <button className="action-btn primary">Asignar</button>
                <button className="action-btn secondary">Investigar</button>
                <button className="action-btn success">Resolver</button>
                <button className="action-btn danger">Descartar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;