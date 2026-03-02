import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { queryKeys } from '../lib/queryClient';
import { LoginRequest, RegisterRequest, User } from '../api/types';

// Hook for getting current user data
export const useMe = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { login: authLogin } = useAuth();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authLogin(credentials),
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

// Hook for register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();
  const { register: authRegister } = useAuth();
  
  return useMutation({
    mutationFn: (userData: RegisterRequest) => authRegister(userData),
    onSuccess: () => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
};

// Hook for logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { logout: authLogout } = useAuth();
  
  return useMutation({
    mutationFn: authLogout,
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
};