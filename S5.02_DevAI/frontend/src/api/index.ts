// API Client exports
export { apiClient, setAuthToken, getAuthToken, removeAuthToken } from './client';

// Service exports
export { authService } from './auth';
export { userService } from './users';
export { disciplineService } from './disciplines';
export { activityService } from './activities';
export { statsService } from './stats';

// Type exports
export * from './types';

// Import services for combined API object
import { authService } from './auth';
import { userService } from './users';
import { disciplineService } from './disciplines';
import { activityService } from './activities';
import { statsService } from './stats';


// Combined API object for convenience
export const api = {
  auth: authService,
  users: userService,
  disciplines: disciplineService,
  activities: activityService,
  stats: statsService,
};

export default api;