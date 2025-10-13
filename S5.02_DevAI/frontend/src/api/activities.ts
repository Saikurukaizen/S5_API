import { apiCall } from './client';
import {
  Activity,
  CreateActivityRequest,
  UpdateActivityRequest,
  PaginatedResponse,
  ActivityQueryParams,
  ApiResponse,
} from './types';

export const activityService = {
  // GET /api/v1/activities
  getActivities: async (params?: ActivityQueryParams): Promise<PaginatedResponse<Activity>> => {
    return apiCall<PaginatedResponse<Activity>>({
      method: 'GET',
      url: '/activities',
      params,
    });
  },

  // GET /api/v1/activities/{id}
  getActivity: async (id: number): Promise<ApiResponse<Activity>> => {
    return apiCall<ApiResponse<Activity>>({
      method: 'GET',
      url: `/activities/${id}`,
    });
  },

  // POST /api/v1/activities
  createActivity: async (activityData: CreateActivityRequest): Promise<ApiResponse<Activity>> => {
    return apiCall<ApiResponse<Activity>>({
      method: 'POST',
      url: '/activities',
      data: activityData,
    });
  },

  // PUT /api/v1/activities/{id}
  updateActivity: async (id: number, activityData: UpdateActivityRequest): Promise<ApiResponse<Activity>> => {
    return apiCall<ApiResponse<Activity>>({
      method: 'PUT',
      url: `/activities/${id}`,
      data: activityData,
    });
  },

  // DELETE /api/v1/activities/{id}
  deleteActivity: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<ApiResponse<null>>({
      method: 'DELETE',
      url: `/activities/${id}`,
    });
  },

  // GET /api/v1/activities/user/{userId}
  getUserActivities: async (userId: number, params?: ActivityQueryParams): Promise<PaginatedResponse<Activity>> => {
    return apiCall<PaginatedResponse<Activity>>({
      method: 'GET',
      url: `/activities/user/${userId}`,
      params,
    });
  },
};