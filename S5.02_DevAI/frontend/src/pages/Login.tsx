import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AuthCard } from '../components/Auth';
import { DataStream } from '../components/Effects';
import './Login.css';

export const Login: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="login-page">
      {/* Data Stream Background Effects */}
      <DataStream />
      
      {/* Theme Toggle */}
      <div className="login-theme-toggle">
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
      
      <div className="login-container">
        <div className="login-wrapper">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">FitBit</span>
            </div>
          </div>

          {/* Auth Card with Login/Register Forms */}
          <AuthCard />
        </div>
      </div>
    </div>
  );
};

export default Login;