import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Dashboard from '../../pages/Dashboard';

/**
 * DashboardWrapper: Ensures dashboard only renders when auth is fully stable
 * This prevents the dashboard from appearing and disappearing due to auth state changes
 */
const DashboardWrapper: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('🎯 DashboardWrapper: Auth state changed:', {
      isAuthenticated,
      isLoading,
      userExists: !!user,
      timestamp: new Date().toISOString()
    });

    // Only mark as ready when auth is stable (not loading) and user is authenticated
    if (!isLoading && isAuthenticated && user) {
      console.log('🎯 DashboardWrapper: All conditions met, marking as ready');
      setIsReady(true);
    } else {
      console.log('🎯 DashboardWrapper: Conditions not met, staying in loading state');
      setIsReady(false);
    }
  }, [isAuthenticated, isLoading, user]);

  // Show loading until everything is stable
  if (isLoading || !isReady) {
    console.log('🎯 DashboardWrapper: Showing loading spinner');
    return <LoadingSpinner message="Preparando dashboard..." fullScreen />;
  }

  // User not authenticated
  if (!isAuthenticated) {
    console.log('🎯 DashboardWrapper: User not authenticated');
    return null; // This should not happen in protected route, but just in case
  }

  console.log('🎯 DashboardWrapper: Rendering dashboard');
  return <Dashboard />;
};

export default DashboardWrapper;