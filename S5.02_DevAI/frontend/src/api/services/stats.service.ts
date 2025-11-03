// src/api/services/stats.service.ts
import { apiClient } from '../client';

// ============================================
// COMMUNITY STATS TYPES
// ============================================

export interface CommunityStatsResponse {
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

export interface CommunityRankingItem {
  id: number;
  name: string;
  users_count: number;
}

export interface CommunityPercentageItem {
  discipline_name: string;
  communities_count: number;
  percentage: number;
}

// ============================================
// DISCIPLINE STATS TYPES
// ============================================

export interface DisciplineStatsResponse {
  total_disciplines: number;
  total_users: number;
  most_popular_discipline: string | null;
  average_users_per_discipline: number;
}

export interface DisciplineRankingItem {
  id: number;
  name: string;
  users_count: number;
}

export interface DisciplinePercentageItem {
  discipline_name: string;
  percentage: number;
}

export interface MonthlyActivityItem {
  month: number;
  count: number;
}

// ============================================
// USER STATS TYPES
// ============================================

export interface UserStatsResponse {
  total_users: number;
  total_disciplines: number;
  most_active_user: string | null;
  users: any[];
}

export interface UserRankingByDiscipline {
  discipline_id: number;
  discipline_name: string;
  user_count: number;
  users: Array<{
    id: number;
    name: string;
    lastname: string;
  }>;
}

// ============================================
// SERVICES
// ============================================

export const disciplineStatsService = {
  getStats: async (): Promise<DisciplineStatsResponse> => {
    console.log('📊 Fetching discipline stats...');
    try {
      const { data } = await apiClient.get<DisciplineStatsResponse>('/stats/disciplines');
      console.log('✅ Discipline stats received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching discipline stats:', error);
      throw error;
    }
  },

  getRanking: async (): Promise<{ ranking: DisciplineRankingItem[] }> => {
    console.log('📊 Fetching discipline ranking...');
    try {
      const { data } = await apiClient.get<{ ranking: DisciplineRankingItem[] }>('/stats/disciplines/ranking');
      console.log('✅ Discipline ranking received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching discipline ranking:', error);
      throw error;
    }
  },

  getPercentages: async (): Promise<{ percentages: DisciplinePercentageItem[] }> => {
    console.log('📊 Fetching discipline percentages...');
    try {
      const { data } = await apiClient.get<{ percentages: DisciplinePercentageItem[] }>('/stats/disciplines/percentage');
      console.log('✅ Discipline percentages received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching discipline percentages:', error);
      throw error;
    }
  },

  getSummary: async (): Promise<{ monthly_activity: MonthlyActivityItem[] }> => {
    console.log('📊 Fetching discipline summary...');
    try {
      const { data } = await apiClient.get<{ monthly_activity: MonthlyActivityItem[] }>('/stats/disciplines/summary');
      console.log('✅ Discipline summary received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching discipline summary:', error);
      throw error;
    }
  },
};

export const userStatsService = {
  getStats: async (): Promise<{ data: UserStatsResponse }> => {
    console.log('👥 Fetching user stats...');
    try {
      const { data } = await apiClient.get<{ data: UserStatsResponse }>('/stats/users');
      console.log('✅ User stats received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching user stats:', error);
      throw error;
    }
  },

  getRanking: async (): Promise<{ data: { ranking: UserRankingByDiscipline[] } }> => {
    console.log('👥 Fetching user ranking...');
    try {
      const { data } = await apiClient.get<{ data: { ranking: UserRankingByDiscipline[] } }>('/stats/users/ranking');
      console.log('✅ User ranking received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching user ranking:', error);
      throw error;
    }
  },

  getPercentages: async (): Promise<{ data: { percentages: DisciplinePercentageItem[] } }> => {
    console.log('👥 Fetching user percentages...');
    try {
      const { data } = await apiClient.get<{ data: { percentages: DisciplinePercentageItem[] } }>('/stats/users/percentage');
      console.log('✅ User percentages received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching user percentages:', error);
      throw error;
    }
  },

  getSummary: async (): Promise<{ data: { monthly_summary: MonthlyActivityItem[] } }> => {
    console.log('👥 Fetching user summary...');
    try {
      const { data } = await apiClient.get<{ data: { monthly_summary: MonthlyActivityItem[] } }>('/stats/users/summary');
      console.log('✅ User summary received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching user summary:', error);
      throw error;
    }
  },
};

export const communityStatsService = {
  getStats: async (): Promise<{ data: CommunityStatsResponse }> => {
    console.log('🏆 Fetching community stats...');
    try {
      const { data } = await apiClient.get<{ data: CommunityStatsResponse }>('/stats/communities');
      console.log('✅ Community stats received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching community stats:', error);
      throw error;
    }
  },

  getRanking: async (): Promise<{ data: CommunityRankingItem[] }> => {
    console.log('🏆 Fetching community ranking...');
    try {
      const { data } = await apiClient.get<{ data: CommunityRankingItem[] }>('/stats/communities/ranking');
      console.log('✅ Community ranking received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching community ranking:', error);
      throw error;
    }
  },

  getPercentages: async (): Promise<{ data: { percentages: CommunityPercentageItem[] } }> => {
    console.log('🏆 Fetching community percentages...');
    try {
      const { data } = await apiClient.get<{ data: { percentages: CommunityPercentageItem[] } }>('/stats/communities/percentage');
      console.log('✅ Community percentages received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching community percentages:', error);
      throw error;
    }
  },

  getSummary: async (): Promise<{ data: { monthly_summary: MonthlyActivityItem[] } }> => {
    console.log('🏆 Fetching community summary...');
    try {
      const { data } = await apiClient.get<{ data: { monthly_summary: MonthlyActivityItem[] } }>('/stats/communities/summary');
      console.log('✅ Community summary received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching community summary:', error);
      throw error;
    }
  },

  getByDiscipline: async (): Promise<{ data: any }> => {
    console.log('🏆 Fetching communities by discipline...');
    try {
      const { data } = await apiClient.get<{ data: any }>('/stats/communities/by-discipline');
      console.log('✅ Communities by discipline received:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching communities by discipline:', error);
      throw error;
    }
  },
};

// Legacy service for backward compatibility
export const statsService = communityStatsService;