import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock user data (este vendrá del contexto de autenticación más tarde)
  const user = {
    name: 'Carlos Ruiz',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    level: 12,
    xp: 847,
    maxXp: 1000,
  };

  return (
    <div className="layout">
      <Header user={user} />
      <div className="layout-body">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;