import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Dashboard from '../../pages/Dashboard';

/**
 * DashboardWrapper: Simplified version to troubleshoot redirect issues
 */
const DashboardWrapper: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  console.log('🎯 DashboardWrapper: Current state:', {
    isAuthenticated,
    isLoading,
    userExists: !!user,
    userName: user?.name,
    userRole: user?.role,
    timestamp: new Date().toISOString()
  });

  // Show loading during auth check
  if (isLoading) {
    console.log('🎯 DashboardWrapper: Still loading auth state...');
    return <LoadingSpinner message="Verificando autenticación..." fullScreen />;
  }

  // User not authenticated - this shouldn't happen in ProtectedRoute
  if (!isAuthenticated || !user) {
    console.log('🎯 DashboardWrapper: User not authenticated or no user data');
    return <LoadingSpinner message="Redirigiendo..." fullScreen />;
  }

  console.log('🎯 DashboardWrapper: Auth confirmed, rendering dashboard');
  return <Dashboard />;
}

export default DashboardWrapper;