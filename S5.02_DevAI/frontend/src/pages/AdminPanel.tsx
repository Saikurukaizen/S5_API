import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>👑 Panel de Administración</h1>
        <p>Control total del sistema</p>
      </header>
      
      <div className="page-content">
        <div className="admin-dashboard">
          
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>2,547</h3>
                <p>Usuarios totales</p>
                <span className="stat-change positive">+15% este mes</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🏃</div>
              <div className="stat-info">
                <h3>12</h3>
                <p>Disciplinas activas</p>
                <span className="stat-change neutral">Sin cambios</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>89</h3>
                <p>Comunidades</p>
                <span className="stat-change positive">+3 nuevas</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>98.5%</h3>
                <p>Uptime del sistema</p>
                <span className="stat-change positive">Excelente</span>
              </div>
            </div>
          </div>

          <div className="admin-actions">
            <section className="action-section">
              <h3>Gestión del Sistema</h3>
              <div className="action-grid">
                <button className="action-btn">
                  <span className="action-icon">🔧</span>
                  <span>Configuración Global</span>
                </button>
                
                <button className="action-btn">
                  <span className="action-icon">💾</span>
                  <span>Backup de Base de Datos</span>
                </button>
                
                <button className="action-btn">
                  <span className="action-icon">📧</span>
                  <span>Enviar Notificaciones</span>
                </button>
                
                <button className="action-btn">
                  <span className="action-icon">🔄</span>
                  <span>Sincronizar Datos</span>
                </button>
              </div>
            </section>

            <section className="action-section">
              <h3>Monitoreo</h3>
              <div className="monitoring-panel">
                <div className="metric">
                  <label>CPU Usage:</label>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '45%'}}></div>
                  </div>
                  <span>45%</span>
                </div>
                
                <div className="metric">
                  <label>Memory:</label>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '60%'}}></div>
                  </div>
                  <span>60%</span>
                </div>
                
                <div className="metric">
                  <label>Disk Space:</label>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: '25%'}}></div>
                  </div>
                  <span>25%</span>
                </div>
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;