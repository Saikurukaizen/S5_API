import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        // Don't retry on 401/403 errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

// Query Keys factory for consistency
export const queryKeys = {
  // Auth
  me: ['auth', 'me'] as const,
  
  // Users
  users: (params?: any) => ['users', params] as const,
  user: (id: number) => ['user', id] as const,
  
  // Disciplines
  disciplines: (params?: any) => ['disciplines', params] as const,
  discipline: (id: number) => ['discipline', id] as const,
  
  // Activities
  activities: (params?: any) => ['activities', params] as const,
  activity: (id: number) => ['activity', id] as const,
  
  // Stats
  stats: {
    overview: ['stats', 'overview'] as const,
    users: ['stats', 'users'] as const,
    disciplines: ['stats', 'disciplines'] as const,
    activities: ['stats', 'activities'] as const,
  },
  
  // Communities (future)
  communities: (params?: any) => ['communities', params] as const,
  community: (id: number) => ['community', id] as const,
  
  // XP System (future)
  userLevel: (userId: number) => ['userLevel', userId] as const,
  leaderboard: (params?: any) => ['leaderboard', params] as const,
};