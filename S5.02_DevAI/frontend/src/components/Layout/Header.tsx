import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
    maxXp: number;
  };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const { theme, toggleTheme } = useTheme();

  const progressPercentage = (user.xp / user.maxXp) * 100;

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">FitBit</span>
          <span className="logo-subtitle">CYBER</span>
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

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <div className="user-level">
              <span className="level-text">Nivel {user.level}</span>
              <div className="xp-bar">
                <div 
                  className="xp-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="xp-text">{user.xp}/{user.maxXp} XP</span>
            </div>
          </div>
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;