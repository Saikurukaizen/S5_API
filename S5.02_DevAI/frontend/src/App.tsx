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
import LoadingAnimation from './components/LoadingAnimation';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Main Pages
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Moderation from './pages/Moderation';
import Reports from './pages/Reports';
import AdminPanel from './pages/AdminPanel';

// Resource Pages
import DisciplinesList from './pages/Disciplines/DisciplinesList';
import DisciplineDetail from './pages/Disciplines/DisciplineDetail';
import DisciplineCreate from './pages/Disciplines/DisciplineCreate';

import CommunitiesList from './pages/Communities/CommunitiesList';
import CommunityDetail from './pages/Communities/CommunityDetail';
import CommunityCreate from './pages/Communities/CommunityCreate';

import UsersList from './pages/Users/UsersList';
import UserDetail from './pages/Users/UserDetail';
import UserCreate from './pages/Users/UserCreate';

// Analytics & Stats Pages
import Analytics from './pages/Analytics';
import DisciplineStats from './pages/Stats/DisciplineStats';
import UserStats from './pages/Stats/UserStats';
import CommunityStats from './pages/Stats/CommunityStats';

import { useAuth } from './contexts/AuthContext';
import './styles/globals.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, showLoadingAnimation, isAppInitialized, hideLoadingAnimation } = useAuth();
  
  console.log('🛡️ ProtectedRoute: State check:', {
    isAuthenticated,
    isLoading,
    showLoadingAnimation,
    isAppInitialized,
    timestamp: new Date().toISOString()
  });
  
  // Show loading animation after successful authentication
  if (showLoadingAnimation) {
    console.log('🛡️ ProtectedRoute: Showing cyberpunk loading animation');
    return (
      <LoadingAnimation 
        onComplete={hideLoadingAnimation} 
        duration={3000}
        minDuration={2500}
        isReady={isAuthenticated && isAppInitialized && !isLoading}
      />
    );
  }
  
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
                {/* Public Routes */}
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  } 
                />
                
                <Route 
                  path="/register" 
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  } 
                />
                
                {/* Protected Routes - Main Pages */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
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
                  path="/achievements" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Achievements />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/moderation" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Moderation />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/reports" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Reports />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <AdminPanel />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes - Disciplines */}
                <Route 
                  path="/disciplines" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DisciplinesList />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/disciplines/create" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DisciplineCreate />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/disciplines/:id" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DisciplineDetail />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes - Communities */}
                <Route 
                  path="/communities" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CommunitiesList />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/communities/create" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CommunityCreate />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/communities/:id" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CommunityDetail />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes - Users */}
                <Route 
                  path="/users" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UsersList />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/users/create" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserCreate />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/users/:id" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserDetail />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />

                {/* Protected Routes - Stats & Analytics */}
                <Route 
                  path="/stats" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Analytics />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/stats/disciplines" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <DisciplineStats />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/stats/users" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <UserStats />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/stats/communities" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CommunityStats />
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