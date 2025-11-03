import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { RegisterForm } from '../components/Auth';
import { DataStream } from '../components/Effects';
import './Login.css';

export const Register: React.FC = () => {
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

          {/* Register Card */}
          <div className="auth-card">
            {/* Navigation */}
            <div className="auth-tabs">
              <Link to="/login" className="auth-tab">
                LOGIN
              </Link>
              <span className="auth-tab active">
                REGISTER
              </span>
            </div>

            {/* Register Form */}
            <div className="auth-content">
              <div className="auth-tab-content active">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;