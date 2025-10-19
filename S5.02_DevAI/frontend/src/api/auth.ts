import { apiCall } from './client';
import { setAuthToken, removeAuthToken } from './client';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  LogoutResponse,
  User,
} from './types';
import { AUTH_CONFIG } from '../config/auth.config';

export const authService = {
  // POST /api/v1/login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>({
      method: 'POST',
      url: AUTH_CONFIG.ENDPOINTS.login,
      data: credentials,
    });
    
    // Automatically set token after successful login
    if (response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  // POST /api/v1/register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>({
      method: 'POST',
      url: AUTH_CONFIG.ENDPOINTS.register,
      data: userData,
    });
    
    // Automatically set token after successful registration
    if (response.access_token) {
      setAuthToken(response.access_token);
    }
    
    return response;
  },

  // POST /api/v1/logout
  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await apiCall<LogoutResponse>({
        method: 'POST',
        url: AUTH_CONFIG.ENDPOINTS.logout,
      });
      return response;
    } finally {
      // Always remove token locally, even if server call fails
      // This follows the documentation pattern
      removeAuthToken();
    }
  },

  // GET /api/v1/me
  me: async (): Promise<User> => {
    return apiCall<User>({
      method: 'GET',
      url: AUTH_CONFIG.ENDPOINTS.me,
    });
  },

  // Refresh method - placeholder implementation
  // JWT tokens are long-lived (15 days) without refresh mechanism
  refresh: async (): Promise<AuthResponse> => {
    // For now, return current token info since no refresh endpoint exists
    const currentUser = await authService.me();
    // This is a placeholder - in real implementation this would hit a refresh endpoint
    throw new Error('Token refresh not implemented - tokens are long-lived (15 days)');
  },
};