import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './providers/ApiProvider';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import './styles/globals.css';

function App() {
  return (
    <ApiProvider>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Dashboard />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </ApiProvider>
  );
}

export default App;