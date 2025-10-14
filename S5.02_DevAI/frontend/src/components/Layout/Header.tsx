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

  // ⚠️ TEMPORARY MOCK DATA - Replace with useUserLevel hook when API v2 is ready
  // TODO: Implement XP/Level system in backend API v2
  // See AUTHENTICATION_IMPLEMENTATION.md for full implementation details
  /*
  FUTURE IMPLEMENTATION:
  const { levelData, isLoading: levelLoading } = useUserLevel();
  const userLevel = levelData?.current_level || 1;
  const userXp = levelData?.current_xp || 0;
  const maxXp = levelData?.xp_for_next || 100;
  const progressPercentage = levelData?.progress_percentage || 0;
  */
  
  // Mock data for current version (will be replaced)
  const userLevel = 12;
  const userXp = 2450;
  const maxXp = 3000;
  const progressPercentage = (userXp / maxXp) * 100;

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
            {/* ⚠️ TEMPORARY XP/LEVEL DISPLAY - Will be replaced with UserLevelDisplay component */}
            {/* TODO: Replace with <UserLevelDisplay /> when API v2 XP system is implemented */}
            <div className="user-level">
              <span className="level-text">Nivel {userLevel}</span>
              <div className="xp-bar">
                <div 
                  className="xp-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="xp-text">{userXp}/{maxXp} XP</span>
            </div>
            {/* 
            FUTURE IMPLEMENTATION (when API v2 is ready):
            {levelLoading ? (
              <div className="level-skeleton">Cargando nivel...</div>
            ) : (
              <UserLevelDisplay />
            )}
            */}
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