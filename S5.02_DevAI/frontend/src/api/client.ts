import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './types';

// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Token management
export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return token;
};

export const removeAuthToken = () => {
  delete apiClient.defaults.headers.common['Authorization'];
  localStorage.removeItem('auth_token');
};

// Initialize token on app start
getAuthToken();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request interceptors here (logging, etc.)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common error responses
    if (error.response?.status === 401) {
      // Unauthorized - remove token and redirect to login
      removeAuthToken();
      // You might want to dispatch a logout action here
      window.location.href = '/login';
    }

    // Transform error to our ApiError format
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An error occurred',
      errors: error.response?.data?.errors,
      status: error.response?.status || 500,
    };

    return Promise.reject(apiError);
  }
);

// Generic API call helper
export const apiCall = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export default apiClient;