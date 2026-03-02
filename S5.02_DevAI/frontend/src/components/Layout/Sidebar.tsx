import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RoleGuard, AdminOnly, ModeratorPlus } from '../RoleGuard/RoleGuard';
import './Sidebar.css';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard', notifications: 0 },
    { path: '/communities', icon: '👥', label: 'Comunidades', notifications: 5 },
    { path: '/disciplines', icon: '🏃', label: 'Disciplinas', notifications: 0 },
    { path: '/achievements', icon: '🏆', label: 'Logros', notifications: 2 },
    { path: '/profile', icon: '👤', label: 'Perfil', notifications: 0 },
    { path: '/settings', icon: '⚙️', label: 'Configuración', notifications: 0 },
  ];

  const moderatorItems = [
    { path: '/moderation', icon: '🛡️', label: 'Moderación', notifications: 0 },
    { path: '/reports', icon: '📋', label: 'Reportes', notifications: 3 },
  ];

  const adminItems = [
    { path: '/admin', icon: '👑', label: 'Panel Admin', notifications: 0 },
    { path: '/users', icon: '👥', label: 'Usuarios', notifications: 0 },
    { path: '/stats', icon: '📈', label: 'Analytics', notifications: 0 },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Principal</h3>
          <ul className="nav-menu">
            {menuItems.slice(0, 3).map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.notifications > 0 && (
                    <span className="nav-badge">{item.notifications}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">Usuario</h3>
          <ul className="nav-menu">
            {menuItems.slice(3).map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.notifications > 0 && (
                    <span className="nav-badge">{item.notifications}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <ModeratorPlus>
          <div className="nav-section">
            <h3 className="nav-title">Moderación</h3>
            <ul className="nav-menu">
              {moderatorItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.notifications > 0 && (
                      <span className="nav-badge">{item.notifications}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </ModeratorPlus>

        <AdminOnly>
          <div className="nav-section">
            <h3 className="nav-title">Administración</h3>
            <ul className="nav-menu">
              {adminItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.notifications > 0 && (
                      <span className="nav-badge">{item.notifications}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </AdminOnly>
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