import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './AuthCard.css';

type AuthMode = 'login' | 'register';

export const AuthCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AuthMode>('login');

  const switchTab = (tab: AuthMode) => {
    setActiveTab(tab);
  };

  return (
    <div className="auth-card">
      {/* Tabs */}
      <div className="auth-tabs">
        <button 
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => switchTab('login')}
        >
          LOGIN
        </button>
        <button 
          className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => switchTab('register')}
        >
          REGISTER
        </button>
      </div>

      {/* Tab Content */}
      <div className="auth-content">
        <div className={`auth-tab-content ${activeTab === 'login' ? 'active' : ''}`}>
          <LoginForm />
        </div>
        
        <div className={`auth-tab-content ${activeTab === 'register' ? 'active' : ''}`}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};