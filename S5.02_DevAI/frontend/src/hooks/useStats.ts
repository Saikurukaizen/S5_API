import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { statsService } from '../api';
import { UserStats, DisciplineStats, ActivityStats, ApiResponse } from '../api/types';

// Query keys for caching
export const statsKeys = {
  all: ['stats'] as const,
  users: () => [...statsKeys.all, 'users'] as const,
  disciplines: () => [...statsKeys.all, 'disciplines'] as const,
  activities: () => [...statsKeys.all, 'activities'] as const,
  overview: () => [...statsKeys.all, 'overview'] as const,
};

// User statistics hook
export const useUserStats = (): UseQueryResult<ApiResponse<UserStats>, Error> => {
  return useQuery({
    queryKey: statsKeys.users(),
    queryFn: () => statsService.getUserStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Discipline statistics hook
export const useDisciplineStats = (): UseQueryResult<ApiResponse<DisciplineStats>, Error> => {
  return useQuery({
    queryKey: statsKeys.disciplines(),
    queryFn: () => statsService.getDisciplineStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Activity statistics hook
export const useActivityStats = (): UseQueryResult<ApiResponse<ActivityStats>, Error> => {
  return useQuery({
    queryKey: statsKeys.activities(),
    queryFn: () => statsService.getActivityStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Overview statistics hook (all stats combined)
export const useOverviewStats = (): UseQueryResult<ApiResponse<{
  users: UserStats;
  disciplines: DisciplineStats;
  activities: ActivityStats;
}>, Error> => {
  return useQuery({
    queryKey: statsKeys.overview(),
    queryFn: () => statsService.getOverviewStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

// Utility hook for all individual stats (if overview endpoint doesn't exist)
export const useAllStats = () => {
  const userStats = useUserStats();
  const disciplineStats = useDisciplineStats();
  const activityStats = useActivityStats();

  return {
    userStats: userStats.data?.data,
    disciplineStats: disciplineStats.data?.data,
    activityStats: activityStats.data?.data,
    isLoading: userStats.isLoading || disciplineStats.isLoading || activityStats.isLoading,
    isError: userStats.isError || disciplineStats.isError || activityStats.isError,
    error: userStats.error || disciplineStats.error || activityStats.error,
    refetch: () => {
      userStats.refetch();
      disciplineStats.refetch();
      activityStats.refetch();
    },
  };
};