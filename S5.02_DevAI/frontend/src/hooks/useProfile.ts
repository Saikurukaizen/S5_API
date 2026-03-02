import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { queryKeys } from '../lib/queryClient';

// Types for profile management
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  location?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  birth_date?: string;
  location?: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

// Profile API functions
const profileApi = {
  // Get current user profile
  getProfile: async (): Promise<{ data: UserProfile }> => {
    const response = await apiClient.get('/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateProfileData): Promise<{ data: UserProfile }> => {
    const response = await apiClient.put('/profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordData): Promise<{ message: string }> => {
    const response = await apiClient.put('/profile/password', data);
    return response.data;
  },

  // Delete account
  deleteAccount: async (password: string): Promise<{ message: string }> => {
    const response = await apiClient.delete('/profile', {
      data: { password }
    });
    return response.data;
  },
};

// Extend queryKeys for profile operations
const profileQueryKeys = {
  profile: ['profile'] as const,
  activities: (userId: number) => ['profile', 'activities', userId] as const,
};

// Custom hooks
export const useProfile = () => {
  return useQuery({
    queryKey: profileQueryKeys.profile,
    queryFn: profileApi.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (data) => {
      // Update the profile cache
      queryClient.setQueryData(profileQueryKeys.profile, data);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.profile });
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: profileApi.changePassword,
    onError: (error) => {
      console.error('Failed to change password:', error);
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.deleteAccount,
    onSuccess: () => {
      // Clear all queries on account deletion
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Failed to delete account:', error);
    },
  });
};