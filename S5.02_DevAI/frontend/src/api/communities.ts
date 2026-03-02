import { apiClient } from './client';

// Types for Community API
export interface Community {
  id: number;
  name: string;
  description?: string;
  discipline_id: number;
  user_id: number;
  discipline?: {
    id: number;
    name: string;
  };
  moderator?: {
    id: number;
    name: string;
    email: string;
  };
  users_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCommunityData {
  name: string;
  description?: string;
  discipline_id: number;
}

export interface UpdateCommunityData {
  name?: string;
  description?: string;
  discipline_id?: number;
}

export interface CommunityMember {
  id: number;
  name: string;
  email: string;
  pivot?: {
    joined_at: string;
  };
}

export interface CommunityStats {
  total_communities: number;
  total_users: number;
  most_popular_community: {
    id: number;
    name: string;
    users_count: number;
  } | null;
  communities_per_discipline: Array<{
    discipline: string;
    communities_count: number;
  }>;
}

// Community API functions
export const communitiesApi = {
  // Get all communities
  getAll: async (params?: any): Promise<{ data: Community[] }> => {
    const response = await apiClient.get('/communities', { params });
    return response.data;
  },

  // Get community by ID
  getById: async (id: number): Promise<{ data: Community }> => {
    const response = await apiClient.get(`/communities/${id}`);
    return response.data;
  },

  // Create new community (admin only)
  create: async (data: CreateCommunityData): Promise<{ message: string; data: Community }> => {
    const response = await apiClient.post('/communities', data);
    return response.data;
  },

  // Update community (admin/moderator only)
  update: async (id: number, data: UpdateCommunityData): Promise<{ message: string; data: Community }> => {
    const response = await apiClient.put(`/communities/${id}`, data);
    return response.data;
  },

  // Delete community (admin only)
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/communities/${id}`);
    return response.data;
  },

  // Get community members
  getMembers: async (id: number): Promise<{ data: CommunityMember[] }> => {
    const response = await apiClient.get(`/communities/${id}/members`);
    return response.data;
  },

  // Add member to community
  addMember: async (communityId: number, userId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/communities/${communityId}/members/${userId}`);
    return response.data;
  },

  // Remove member from community
  removeMember: async (communityId: number, userId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/communities/${communityId}/members/${userId}`);
    return response.data;
  },

  // Join community
  join: async (communityId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/users/me/communities/${communityId}`);
    return response.data;
  },

  // Leave community
  leave: async (communityId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/users/me/communities/${communityId}`);
    return response.data;
  },

  // Get community stats
  getStats: async (): Promise<{ data: CommunityStats }> => {
    const response = await apiClient.get('/stats/communities');
    return response.data;
  },

  // Get community ranking
  getRanking: async (): Promise<{ data: Array<Community & { members_count: number; rank: number }> }> => {
    const response = await apiClient.get('/stats/communities/ranking');
    return response.data;
  },

  // Get communities by discipline
  getByDiscipline: async (): Promise<{ data: Array<{ discipline_id: number; discipline_name: string; communities: Community[] }> }> => {
    const response = await apiClient.get('/stats/communities/by-discipline');
    return response.data;
  },
};