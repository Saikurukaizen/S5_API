import React from 'react';
import { AuthForm } from '../components/Auth/AuthForm';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const handleAuthSuccess = () => {
    // Redirect to dashboard or previous page
    window.location.href = '/';
  };

  if (isAuthenticated) {
    // If already authenticated, redirect to dashboard
    window.location.href = '/';
    return null;
  }

  return (
    <div className={`login-page ${theme}`} data-theme={theme}>
      <AuthForm onSuccess={handleAuthSuccess} />
    </div>
  );
};

export default LoginPage;