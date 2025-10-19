import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { RoleBadge } from '../RoleBadge/RoleBadge';
import LoginButton from '../LoginButton/LoginButton';
import './Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Level/XP system removed - to be implemented in future version

  if (!isAuthenticated || !user) {
    return (
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">FitBit</span>
          </div>
        </div>
        <div className="header-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Buscar comunidades, disciplinas..."
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right">
          <LoginButton />
          <div className="theme-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className="toggle-slider">
                <span className="toggle-icon">
                  {theme === 'light' ? '☀️' : '🌙'}
                </span>
              </span>
            </label>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">FitBit</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar comunidades, disciplinas..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="theme-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="toggle-slider">
              <span className="toggle-icon">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </span>
          </label>
        </div>

        <div className="notifications-btn">
          <span className="notification-icon">🔔</span>
          <span className="notification-badge">3</span>
        </div>

        <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="user-info">
            <div className="user-name-container">
              <span className="user-name">{user.name}</span>
              <RoleBadge size="small" />
            </div>
            {/* Level/XP system removed - to be implemented in future version */}
          </div>
          <div className="user-avatar">
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {showUserMenu && (
            <div className="user-menu">
              <div className="user-menu-item">
                <span>👤</span>
                Profile
              </div>
              <div className="user-menu-item">
                <span>⚙️</span>
                Settings
              </div>
              <div className="user-menu-item" onClick={handleLogout}>
                <span>🚪</span>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;