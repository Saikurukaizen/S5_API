import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../api/types';
import { authService, setAuthToken, getAuthToken, removeAuthToken } from '../api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Simulated logged in user for testing
  const [user, setUser] = useState<User | null>({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  const [token, setToken] = useState<string | null>('mock-jwt-token-for-testing');
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state on app start
  useEffect(() => {
    // Commented out for testing - user is already simulated as logged in
    /*
    const initializeAuth = async () => {
      const savedToken = getAuthToken();
      
      if (savedToken) {
        try {
          // Verify token is still valid by fetching user
          const userData = await authService.me();
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          // Token is invalid or expired
          console.error('Token validation failed:', error);
          removeAuthToken();
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();
    */
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.login(credentials);
      
      // Set token in API client and localStorage
      setAuthToken(response.access_token);
      
      // Update state
      setUser(response.user);
      setToken(response.access_token);
      
      console.log('Login successful:', {
        user: response.user.name,
        role: response.user.role,
        expiresIn: response.expires_in
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await authService.register(userData);
      
      // Set token in API client and localStorage
      setAuthToken(response.access_token);
      
      // Update state
      setUser(response.user);
      setToken(response.access_token);
      
      console.log('Registration successful:', {
        user: response.user.name,
        role: response.user.role,
        expiresIn: response.expires_in
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Call logout endpoint if user is authenticated
      if (isAuthenticated) {
        await authService.logout();
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local state and token
      removeAuthToken();
      setUser(null);
      setToken(null);
      setIsLoading(false);
      
      console.log('Logout completed');
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const response: AuthResponse = await authService.refresh();
      
      // Update token
      setAuthToken(response.access_token);
      setToken(response.access_token);
      
      // Update user data if provided
      if (response.user) {
        setUser(response.user);
      }
      
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  const updateUser = (updatedUser: User): void => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show login component
      window.location.href = '/login';
      return null;
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
};