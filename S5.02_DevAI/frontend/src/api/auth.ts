import { apiCall } from './client';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  LogoutResponse,
  User,
} from './types';

export const authService = {
  // POST /api/v1/auth/login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data: credentials,
    });
  },

  // POST /api/v1/auth/register
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
    });
  },

  // POST /api/v1/auth/logout
  logout: async (): Promise<LogoutResponse> => {
    return apiCall<LogoutResponse>({
      method: 'POST',
      url: '/auth/logout',
    });
  },

  // GET /api/v1/auth/me
  me: async (): Promise<User> => {
    return apiCall<User>({
      method: 'GET',
      url: '/auth/me',
    });
  },

  // POST /api/v1/auth/refresh
  refresh: async (): Promise<AuthResponse> => {
    return apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/refresh',
    });
  },
};