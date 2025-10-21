// src/components/Layout/Aside.tsx - Complete Example
// src/components/Layout/Aside.tsx - Integration Guide Version
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Analytics } from '../Analytics/Analytics';
import { useAuth } from '../../contexts/AuthContext';
import './Aside.css';

export const Aside: React.FC = () => {
  const { user } = useAuth();

  return (
    <aside className="app-aside">
      {/* Logo */}
      <div className="aside-logo">
        <span className="logo-icon">🏃</span>
        <span className="logo-text">FITBIT</span>
        <span className="logo-version">v2.0</span>
      </div>

      {/* User Info */}
      <div className="aside-user">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name}</div>
          <div className="user-role">{user?.role}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="aside-nav">
        <div className="nav-section">
          <div className="nav-section-title">GENERAL</div>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Dashboard</span>
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">Mi Perfil</span>
          </NavLink>
        </div>
        <div className="nav-section">
          <div className="nav-section-title">GESTIÓN</div>
          <NavLink 
            to="/disciplines" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🏃</span>
            <span className="nav-label">Disciplinas</span>
            {user?.role === 'Admin' && (
              <span className="nav-badge">Admin</span>
            )}
          </NavLink>
          <NavLink 
            to="/communities" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🏘️</span>
            <span className="nav-label">Comunidades</span>
          </NavLink>
          {['Admin', 'Moderator'].includes(user?.role || '') && (
            <NavLink 
              to="/users" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">Usuarios</span>
              <span className="nav-badge">{user?.role}</span>
            </NavLink>
          )}
        </div>
      </nav>
      {/* Analytics Component */}
      <div className="aside-analytics">
        <Analytics />
      </div>
      {/* Footer */}
      <div className="aside-footer">
        <div className="footer-version">Fitbit API v1.0</div>
        <div className="footer-copyright">© 2025 IT Academy</div>
      </div>
    </aside>
  );
};
