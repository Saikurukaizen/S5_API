import { useQuery } from '@tanstack/react-query';
import { apiCall } from '../api/client';
import { ApiResponse, User } from '../api/types';

export const useUsers = (enabled: boolean = true) => {
  return useQuery<ApiResponse<User[]>>({
    queryKey: ['users'],
    queryFn: () => apiCall<ApiResponse<User[]>>({
      method: 'GET',
      url: '/users'
    }),
    enabled, // Solo ejecutar si está habilitado (ej: si es admin)
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useUser = (userId: string) => {
  return useQuery<ApiResponse<User>>({
    queryKey: ['users', userId],
    queryFn: () => apiCall<ApiResponse<User>>({
      method: 'GET',
      url: `/users/${userId}`
    }),
    enabled: !!userId,
  });
};