import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  disciplineStatsService, 
  userStatsService, 
  communityStatsService,
  type DisciplineStatsResponse,
  type UserStatsResponse,
  type CommunityStatsResponse,
  type DisciplineRankingItem,
  type DisciplinePercentageItem,
  type MonthlyActivityItem,
  type UserRankingByDiscipline,
  type CommunityRankingItem
} from '../api/services/stats.service';

// Query keys for caching
export const statsKeys = {
  all: ['stats'] as const,
  disciplines: () => [...statsKeys.all, 'disciplines'] as const,
  disciplineRanking: () => [...statsKeys.all, 'disciplines', 'ranking'] as const,
  disciplinePercentages: () => [...statsKeys.all, 'disciplines', 'percentages'] as const,
  disciplineSummary: () => [...statsKeys.all, 'disciplines', 'summary'] as const,
  users: () => [...statsKeys.all, 'users'] as const,
  userRanking: () => [...statsKeys.all, 'users', 'ranking'] as const,
  userPercentages: () => [...statsKeys.all, 'users', 'percentages'] as const,
  userSummary: () => [...statsKeys.all, 'users', 'summary'] as const,
  communities: () => [...statsKeys.all, 'communities'] as const,
  communityRanking: () => [...statsKeys.all, 'communities', 'ranking'] as const,
  communityPercentages: () => [...statsKeys.all, 'communities', 'percentages'] as const,
  communitySummary: () => [...statsKeys.all, 'communities', 'summary'] as const,
  communitiesByDiscipline: () => [...statsKeys.all, 'communities', 'by-discipline'] as const,
};

// ============================================
// DISCIPLINE STATS HOOKS
// ============================================

export const useDisciplineStats = () => {
  return useQuery({
    queryKey: statsKeys.disciplines(),
    queryFn: disciplineStatsService.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDisciplineRanking = () => {
  return useQuery({
    queryKey: statsKeys.disciplineRanking(),
    queryFn: disciplineStatsService.getRanking,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDisciplinePercentages = () => {
  return useQuery({
    queryKey: statsKeys.disciplinePercentages(),
    queryFn: disciplineStatsService.getPercentages,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDisciplineSummary = () => {
  return useQuery({
    queryKey: statsKeys.disciplineSummary(),
    queryFn: disciplineStatsService.getSummary,
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================
// USER STATS HOOKS
// ============================================

export const useUserStats = () => {
  return useQuery({
    queryKey: statsKeys.users(),
    queryFn: userStatsService.getStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserRanking = () => {
  return useQuery({
    queryKey: statsKeys.userRanking(),
    queryFn: userStatsService.getRanking,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserPercentages = () => {
  return useQuery({
    queryKey: statsKeys.userPercentages(),
    queryFn: userStatsService.getPercentages,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserSummary = () => {
  return useQuery({
    queryKey: statsKeys.userSummary(),
    queryFn: userStatsService.getSummary,
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================
// COMMUNITY STATS HOOKS
// ============================================

export const useCommunityStats = () => {
  return useQuery({
    queryKey: statsKeys.communities(),
    queryFn: communityStatsService.getStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunityRanking = () => {
  return useQuery({
    queryKey: statsKeys.communityRanking(),
    queryFn: communityStatsService.getRanking,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunityPercentages = () => {
  return useQuery({
    queryKey: statsKeys.communityPercentages(),
    queryFn: communityStatsService.getPercentages,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunitySummary = () => {
  return useQuery({
    queryKey: statsKeys.communitySummary(),
    queryFn: communityStatsService.getSummary,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunitiesByDiscipline = () => {
  return useQuery({
    queryKey: statsKeys.communitiesByDiscipline(),
    queryFn: communityStatsService.getByDiscipline,
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================
// COMBINED HOOKS
// ============================================

export const useAllStats = () => {
  const disciplineStats = useDisciplineStats();
  const userStats = useUserStats();
  const communityStats = useCommunityStats();
  
  const disciplineRanking = useDisciplineRanking();
  const userRanking = useUserRanking();
  const communityRanking = useCommunityRanking();
  
  const disciplinePercentages = useDisciplinePercentages();
  const userPercentages = useUserPercentages();
  const communityPercentages = useCommunityPercentages();
  
  return {
    // Individual queries
    disciplineStats,
    userStats,
    communityStats,
    disciplineRanking,
    userRanking,
    communityRanking,
    disciplinePercentages,
    userPercentages,
    communityPercentages,
    
    // Combined loading state
    isLoading: disciplineStats.isLoading || userStats.isLoading || communityStats.isLoading,
    
    // Combined error state
    hasError: disciplineStats.isError || userStats.isError || communityStats.isError,
    
    // Refresh all stats
    refetchAll: () => {
      disciplineStats.refetch();
      userStats.refetch();
      communityStats.refetch();
      disciplineRanking.refetch();
      userRanking.refetch();
      communityRanking.refetch();
      disciplinePercentages.refetch();
      userPercentages.refetch();
      communityPercentages.refetch();
    }
  };
};

// Main hook that components expect to import (backward compatibility)
export const useStats = useAllStats;