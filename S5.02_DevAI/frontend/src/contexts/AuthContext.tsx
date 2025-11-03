import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../api/types';
import { authService, setAuthToken, getAuthToken, removeAuthToken } from '../api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  showLoadingAnimation: boolean;
  isAppInitialized: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: User) => void;
  hideLoadingAnimation: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 AuthContext: Starting auth initialization...');
      const savedToken = getAuthToken();
      
      if (savedToken) {
        console.log('🔐 AuthContext: Found saved token, length:', savedToken.length);
        try {
          console.log('🔐 AuthContext: Calling /me endpoint to validate token...');
          // Verify token is still valid by fetching user
          const userData = await authService.me();
          console.log('🔐 AuthContext: Token valid, user data received:', {
            userName: userData.name,
            userRole: userData.role,
            userId: userData.id
          });
          setUser(userData);
          setToken(savedToken);
          console.log('🔐 AuthContext: User state set successfully');
        } catch (error) {
          // Token is invalid or expired - clean up all state
          console.error('🔐 AuthContext: Token validation failed:', error);
          console.log('🔐 AuthContext: Cleaning up invalid token...');
          removeAuthToken();
          setUser(null);
          setToken(null);
        }
      } else {
        console.log('🔐 AuthContext: No saved token found in localStorage');
      }
      
      console.log('🔐 AuthContext: Auth initialization completed, setting loading to false');
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    console.log('🔐 AuthContext: Starting login process...');
    const loginStartTime = Date.now();
    
    try {
      setIsLoading(true);
      console.log('🔐 AuthContext: Set loading to true');
      
      const response: AuthResponse = await authService.login(credentials);
      console.log('🔐 AuthContext: Login API response received:', {
        userExists: !!response.user,
        tokenExists: !!response.access_token,
        userName: response.user?.name,
        userRole: response.user?.role
      });
      
      // Set token in API client and localStorage
      setAuthToken(response.access_token);
      console.log('🔐 AuthContext: Token set in localStorage and API client');
      
      // Show the loading animation immediately
      setShowLoadingAnimation(true);
      console.log('🔐 AuthContext: Loading animation started');
      
      // Calculate minimum animation time
      const loginDuration = Date.now() - loginStartTime;
      const minAnimationTime = 2500; // Minimum 2.5 seconds for good UX
      const remainingTime = Math.max(0, minAnimationTime - loginDuration);
      
      // Ensure the animation runs for at least the minimum time
      setTimeout(() => {
        // Update state after minimum animation time
        setUser(response.user);
        setToken(response.access_token);
        setIsAppInitialized(true);
        console.log('🔐 AuthContext: User and token state updated');
        
        console.log('Login successful:', {
          user: response.user.name,
          role: response.user.role,
          expiresIn: response.expires_in,
          totalTime: Date.now() - loginStartTime
        });
        
        // Set loading to false after state is set
        setIsLoading(false);
        console.log('🔐 AuthContext: Set loading to false - Login completed');
      }, remainingTime);
      
    } catch (error) {
      console.error('🔐 AuthContext: Login failed:', error);
      setIsLoading(false);
      setShowLoadingAnimation(false);
      console.log('🔐 AuthContext: Set loading to false - Login error');
      throw error;
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
      
      console.log('✅ Registration successful:', {
        user: response.user.name,
        role: response.user.role,
        token: response.access_token.substring(0, 20) + '...',
        expiresIn: response.expires_in
      });
    } catch (error) {
      console.error('❌ Registration failed:', error);
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

  const hideLoadingAnimation = (): void => {
    setShowLoadingAnimation(false);
    console.log('🔐 AuthContext: Loading animation hidden');
  };

  // Enhanced initialization check
  useEffect(() => {
    if (isAuthenticated && !isLoading && isAppInitialized) {
      // Small delay to ensure UI is ready
      setTimeout(() => {
        console.log('🔐 AuthContext: App fully initialized, can hide animation');
      }, 100);
    }
  }, [isAuthenticated, isLoading, isAppInitialized]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    showLoadingAnimation,
    isAppInitialized,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    hideLoadingAnimation,
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