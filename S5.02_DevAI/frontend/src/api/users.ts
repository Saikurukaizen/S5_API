import { apiCall } from './client';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  PaginatedResponse,
  UserQueryParams,
  ApiResponse,
} from './types';

export const userService = {
  // GET /api/v1/users
  getUsers: async (params?: UserQueryParams): Promise<PaginatedResponse<User>> => {
    return apiCall<PaginatedResponse<User>>({
      method: 'GET',
      url: '/users',
      params,
    });
  },

  // GET /api/v1/users/{id}
  getUser: async (id: number): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>({
      method: 'GET',
      url: `/users/${id}`,
    });
  },

  // POST /api/v1/users
  createUser: async (userData: CreateUserRequest): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>({
      method: 'POST',
      url: '/users',
      data: userData,
    });
  },

  // PUT /api/v1/users/{id}
  updateUser: async (id: number, userData: UpdateUserRequest): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>({
      method: 'PUT',
      url: `/users/${id}`,
      data: userData,
    });
  },

  // DELETE /api/v1/users/{id}
  deleteUser: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<ApiResponse<null>>({
      method: 'DELETE',
      url: `/users/${id}`,
    });
  },
};