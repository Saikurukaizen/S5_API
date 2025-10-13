import { apiCall } from './client';
import {
  UserStats,
  DisciplineStats,
  ActivityStats,
  ApiResponse,
} from './types';

export const statsService = {
  // GET /api/v1/stats/users
  getUserStats: async (): Promise<ApiResponse<UserStats>> => {
    return apiCall<ApiResponse<UserStats>>({
      method: 'GET',
      url: '/stats/users',
    });
  },

  // GET /api/v1/stats/disciplines
  getDisciplineStats: async (): Promise<ApiResponse<DisciplineStats>> => {
    return apiCall<ApiResponse<DisciplineStats>>({
      method: 'GET',
      url: '/stats/disciplines',
    });
  },

  // GET /api/v1/stats/activities
  getActivityStats: async (): Promise<ApiResponse<ActivityStats>> => {
    return apiCall<ApiResponse<ActivityStats>>({
      method: 'GET',
      url: '/stats/activities',
    });
  },

  // GET /api/v1/stats/overview - Combined stats for dashboard
  getOverviewStats: async (): Promise<ApiResponse<{
    users: UserStats;
    disciplines: DisciplineStats;
    activities: ActivityStats;
  }>> => {
    return apiCall<ApiResponse<{
      users: UserStats;
      disciplines: DisciplineStats;
      activities: ActivityStats;
    }>>({
      method: 'GET',
      url: '/stats/overview',
    });
  },
};