export const AUTH_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  
  AUTH_TYPE: 'jwt-bearer' as const,
  
  ENDPOINTS: {
    login: 'login',
    register: 'register',
    logout: 'logout',
    me: 'me',
  },
  
  TOKEN: {
    STORAGE_KEY: import.meta.env.VITE_TOKEN_STORAGE_KEY || 'fitbit_auth_token',
    HEADER_PREFIX: 'Bearer',
  },
  
  FEATURES: {
    hasRefreshToken: false,
    hasRoleSystem: true,
    hasXpSystem: false, // For future implementation
  },
  
  SECURITY: {
    INACTIVITY_TIMEOUT: parseInt(
      import.meta.env.VITE_INACTIVITY_TIMEOUT || '1800000'
    ), // 30 minutes
    API_TIMEOUT: parseInt(
      import.meta.env.VITE_API_TIMEOUT || '10000'
    ), // 10 seconds
    MAX_LOGIN_ATTEMPTS: 3,
  },
} as const;

  console.log('DEBUG VITE_API_BASE_URL:', AUTH_CONFIG.API_BASE_URL);

export const validateAuthConfig = (): boolean => {
  if (!AUTH_CONFIG.API_BASE_URL) {
    console.error('❌ REACT_APP_API_BASE_URL not configured');
    return false;
  }
  console.log('✅ Auth configuration valid');
  return true;
};