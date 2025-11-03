import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { RoleBadge } from '../RoleBadge/RoleBadge';
import LoginButton from '../LoginButton/LoginButton';
import { useSearch } from '../../hooks/useSearch';
import { SearchDropdown } from '../Search/SearchDropdown';
import './Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Hook de búsqueda
  const { results, isLoading, isEmpty } = useSearch(searchQuery);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuClick = (path: string) => {
    setShowUserMenu(false);
    navigate(path);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length >= 2);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setShowSearchResults(true);
    }
  };

  const closeSearchResults = () => {
    setShowSearchResults(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          {/* Search bar only available for authenticated users */}
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
        <div className="search-bar" ref={searchRef}>
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar comunidades, disciplinas..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={clearSearch}
              type="button"
            >
              ✕
            </button>
          )}
          
          {showSearchResults && (
            <SearchDropdown
              results={results}
              isLoading={isLoading}
              isEmpty={isEmpty}
              query={searchQuery}
              onClose={closeSearchResults}
            />
          )}
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

        <div className="user-profile" ref={userMenuRef}>
          <div 
            className="user-info"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-name-container">
              <span className="user-name">{user.name}</span>
              <RoleBadge size="small" />
            </div>
            {/* Level/XP system removed - to be implemented in future version */}
          </div>
          <div 
            className="user-avatar"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {showUserMenu && (
            <div className="user-menu">
              <div 
                className="user-menu-item"
                onClick={() => handleMenuClick('/profile')}
              >
                <span>👤</span>
                Profile
              </div>
              <div 
                className="user-menu-item"
                onClick={() => handleMenuClick('/settings')}
              >
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