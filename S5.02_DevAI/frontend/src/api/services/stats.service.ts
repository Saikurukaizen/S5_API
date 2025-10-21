// src/api/services/stats.service.ts
import apiClient from '../client';

export interface CommunityStatsResponse {
  total_communities: number;
  total_members: number;
  average_members_per_community: number;
  most_popular_discipline: string;
  total_disciplines: number;
  total_users: number;
  growth_rate: number;
  active_users_percentage: number;
}

export interface RankingItem {
  id: number;
  name: string;
  description: string;
  members_count: number;
  discipline: {
    id: number;
    name: string;
  };
}

export interface PercentageItem {
  discipline_name: string;
  communities_count: number;
  percentage: number;
}

export interface DisciplineDistribution {
  discipline_id: number;
  discipline_name: string;
  communities_count: number;
  members_count: number;
  percentage: number;
}

export const statsService = {
  /**
   * Obtiene estadísticas generales de comunidades
   * GET /api/v1/stats/communities
   */
  getGeneral: async (): Promise<CommunityStatsResponse> => {
    const { data } = await apiClient.get<CommunityStatsResponse>('/stats/communities');
    return data;
  },

  /**
   * Obtiene el ranking de comunidades por número de miembros
   * GET /api/v1/stats/communities/ranking
   */
  getRanking: async (): Promise<RankingItem[]> => {
    const { data } = await apiClient.get<RankingItem[]>('/stats/communities/ranking');
    return data;
  },

  /**
   * Obtiene el porcentaje de comunidades por disciplina
   * GET /api/v1/stats/communities/percentage
   */
  getPercentage: async (): Promise<PercentageItem[]> => {
    const { data } = await apiClient.get<PercentageItem[]>('/stats/communities/percentage');
    return data;
  },

  /**
   * Obtiene un resumen completo de estadísticas
   * GET /api/v1/stats/communities/summary
   */
  getSummary: async (): Promise<CommunityStatsResponse> => {
    const { data } = await apiClient.get<CommunityStatsResponse>('/stats/communities/summary');
    return data;
  },

  /**
   * Obtiene estadísticas agrupadas por disciplina
   * GET /api/v1/stats/communities/by-discipline
   */
  getByDiscipline: async (): Promise<DisciplineDistribution[]> => {
    const { data } = await apiClient.get<DisciplineDistribution[]>('/stats/communities/by-discipline');
    return data;
  },
};