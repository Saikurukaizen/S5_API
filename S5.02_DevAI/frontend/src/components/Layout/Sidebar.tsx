import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', notifications: 0 },
    { id: 'communities', icon: '👥', label: 'Comunidades', notifications: 5 },
    { id: 'disciplines', icon: '🏃', label: 'Disciplinas', notifications: 0 },
    { id: 'achievements', icon: '🏆', label: 'Logros', notifications: 2 },
    { id: 'profile', icon: '👤', label: 'Perfil', notifications: 0 },
    { id: 'settings', icon: '⚙️', label: 'Configuración', notifications: 0 },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Principal</h3>
          <ul className="nav-menu">
            {menuItems.slice(0, 3).map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.notifications > 0 && (
                    <span className="nav-badge">{item.notifications}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">Usuario</h3>
          <ul className="nav-menu">
            {menuItems.slice(3).map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.notifications > 0 && (
                    <span className="nav-badge">{item.notifications}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="stat-icon">⚡</span>
            <div className="stat-info">
              <span className="stat-value">1,247</span>
              <span className="stat-label">XP Total</span>
            </div>
          </div>
          
          <div className="quick-stat">
            <span className="stat-icon">🔥</span>
            <div className="stat-info">
              <span className="stat-value">15</span>
              <span className="stat-label">Racha</span>
            </div>
          </div>
        </div>

        <button className="upgrade-btn">
          <span className="upgrade-icon">⭐</span>
          <div className="upgrade-text">
            <span className="upgrade-title">Upgrade Pro</span>
            <span className="upgrade-subtitle">Funciones avanzadas</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;