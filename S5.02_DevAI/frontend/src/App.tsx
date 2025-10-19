import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './providers/ApiProvider';
import { queryClient } from './lib/queryClient';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import DashboardWrapper from './components/Dashboard/DashboardWrapper';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Stats from './pages/Stats';
import { useAuth } from './contexts/AuthContext';
import './styles/globals.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('🛡️ ProtectedRoute: State check:', {
    isAuthenticated,
    isLoading,
    timestamp: new Date().toISOString()
  });
  
  if (isLoading) {
    console.log('🛡️ ProtectedRoute: Showing loading spinner');
    return <LoadingSpinner message="Verificando autenticación..." fullScreen />;
  }
  
  if (!isAuthenticated) {
    console.log('🛡️ ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('🛡️ ProtectedRoute: User authenticated, rendering children');
  return <>{children}</>;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('🌐 PublicRoute: State check:', {
    isAuthenticated,
    isLoading,
    timestamp: new Date().toISOString()
  });
  
  if (isLoading) {
    console.log('🌐 PublicRoute: Showing loading spinner');
    return <LoadingSpinner message="Verificando autenticación..." fullScreen />;
  }
  
  if (isAuthenticated) {
    console.log('🌐 PublicRoute: User authenticated, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log('🌐 PublicRoute: User not authenticated, rendering children');
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <Routes>
                {/* Public Route - Login */}
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DashboardWrapper />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserProfile />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/stats" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Stats />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Catch all - redirect to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ApiProvider>
      {/* React Query DevTools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;