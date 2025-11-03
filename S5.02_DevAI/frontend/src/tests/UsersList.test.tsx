import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';
import UsersList from '../pages/Users/UsersList';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the hooks
vi.mock('../hooks/useUsers', () => ({
  useUsers: () => ({
    data: {
      data: [
        { id: 1, name: 'Test User', email: 'test@example.com', created_at: '2024-01-01' }
      ]
    },
    isLoading: false,
    isError: false
  })
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('UsersList Component', () => {
  test('renders users list without crashing', () => {
    render(
      <TestWrapper>
        <UsersList />
      </TestWrapper>
    );
    
    expect(screen.getByText('Gestión de Usuarios')).toBeInTheDocument();
  });

  test('displays search input', () => {
    render(
      <TestWrapper>
        <UsersList />
      </TestWrapper>
    );
    
    const searchInput = screen.getByPlaceholderText(/buscar usuarios/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('shows users data when loaded', () => {
    render(
      <TestWrapper>
        <UsersList />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});