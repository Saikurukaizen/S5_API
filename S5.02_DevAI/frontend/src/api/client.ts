import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiError } from './types';
import { AUTH_CONFIG } from '../config/auth.config';

// Create axios instance with configuration from auth.config
export const apiClient: AxiosInstance = axios.create({
  baseURL: AUTH_CONFIG.API_BASE_URL,
  timeout: AUTH_CONFIG.SECURITY.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Token management with centralized configuration
export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_CONFIG.TOKEN.STORAGE_KEY, token);
  apiClient.defaults.headers.common['Authorization'] = 
    `${AUTH_CONFIG.TOKEN.HEADER_PREFIX} ${token}`;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_CONFIG.TOKEN.STORAGE_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_CONFIG.TOKEN.STORAGE_KEY);
  delete apiClient.defaults.headers.common['Authorization'];
};

// Initialize token from storage on app start
const savedToken = getAuthToken();
if (savedToken) {
  apiClient.defaults.headers.common['Authorization'] = 
    `${AUTH_CONFIG.TOKEN.HEADER_PREFIX} ${savedToken}`;
}

// Request interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    console.log('🔑 API Request interceptor:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      token: token ? `${token.substring(0, 20)}...` : 'none',
      currentAuth: config.headers.Authorization
    });
    
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `${AUTH_CONFIG.TOKEN.HEADER_PREFIX} ${token}`;
      console.log('✅ Token added to request headers');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response success:', {
      url: response.config.url,
      status: response.status,
      dataSize: JSON.stringify(response.data).length
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ API Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      console.warn('🚫 Unauthorized request - removing token');
      // Unauthorized - remove token and redirect to login
      removeAuthToken();
      // Dispatch event for Auth Context to handle
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    
    return Promise.reject(transformError(error));
  }
);

// Error transformer following documentation patterns
const transformError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    const data = error.response.data as any;
    return {
      message: data.message || 'Error del servidor',
      status: error.response.status,
      errors: data.errors,
    };
  }
  
  if (error.request) {
    return {
      message: 'Error de conexión con el servidor',
      status: 0,
    };
  }
  
  return {
    message: error.message || 'Error desconocido',
    status: 500,
  };
};

// Generic API call helper with proper typing
interface ApiCallConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: any;
  params?: any;
}

export const apiCall = async <T>(config: ApiCallConfig): Promise<T> => {
  const response = await apiClient.request<T>({
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params,
  });
  
  return response.data;
};

export default apiClient;