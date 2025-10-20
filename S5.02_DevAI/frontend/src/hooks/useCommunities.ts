import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { communitiesApi, Community, CreateCommunityData, UpdateCommunityData } from '../api/communities';
import { queryKeys } from '../lib/queryClient';

// Extend queryKeys for communities
const communityQueryKeys = {
  all: (params?: any) => ['communities', params] as const,
  byId: (id: number) => ['community', id] as const,
  members: (id: number) => ['community', id, 'members'] as const,
  stats: ['communities', 'stats'] as const,
  ranking: ['communities', 'ranking'] as const,
  byDiscipline: ['communities', 'by-discipline'] as const,
};

// Custom hooks for communities
export const useCommunities = (params?: any) => {
  return useQuery({
    queryKey: communityQueryKeys.all(params),
    queryFn: async () => {
      const result = await communitiesApi.getAll(params);
      console.log('🏘️ useCommunities: Fetch result:', result);
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCommunity = (id: number) => {
  return useQuery({
    queryKey: communityQueryKeys.byId(id),
    queryFn: () => communitiesApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunityMembers = (id: number) => {
  return useQuery({
    queryKey: communityQueryKeys.members(id),
    queryFn: () => communitiesApi.getMembers(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCommunityStats = () => {
  return useQuery({
    queryKey: communityQueryKeys.stats,
    queryFn: communitiesApi.getStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCommunitiesRanking = () => {
  return useQuery({
    queryKey: communityQueryKeys.ranking,
    queryFn: communitiesApi.getRanking,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommunitiesByDiscipline = () => {
  return useQuery({
    queryKey: communityQueryKeys.byDiscipline,
    queryFn: communitiesApi.getByDiscipline,
    staleTime: 10 * 60 * 1000,
  });
};

// Mutation hooks
export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.create,
    onSuccess: () => {
      // Invalidate communities list
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all() });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byDiscipline });
    },
    onError: (error) => {
      console.error('Failed to create community:', error);
    },
  });
};

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCommunityData }) => 
      communitiesApi.update(id, data),
    onSuccess: (data, variables) => {
      // Update specific community cache
      queryClient.setQueryData(communityQueryKeys.byId(variables.id), data);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all() });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
    },
    onError: (error) => {
      console.error('Failed to update community:', error);
    },
  });
};

export const useDeleteCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.delete,
    onSuccess: (data, variables) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: communityQueryKeys.byId(variables) });
      
      // Invalidate communities list
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all() });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byDiscipline });
    },
    onError: (error) => {
      console.error('Failed to delete community:', error);
    },
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.join,
    onSuccess: (data, variables) => {
      // Invalidate community members and details
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.members(variables) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byId(variables) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all() });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
    },
    onError: (error) => {
      console.error('Failed to join community:', error);
    },
  });
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communitiesApi.leave,
    onSuccess: (data, variables) => {
      // Invalidate community members and details
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.members(variables) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byId(variables) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all() });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
    },
    onError: (error) => {
      console.error('Failed to leave community:', error);
    },
  });
};

export const useAddCommunityMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, userId }: { communityId: number; userId: number }) => 
      communitiesApi.addMember(communityId, userId),
    onSuccess: (data, variables) => {
      // Invalidate community members
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.members(variables.communityId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byId(variables.communityId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
    },
    onError: (error) => {
      console.error('Failed to add community member:', error);
    },
  });
};

export const useRemoveCommunityMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ communityId, userId }: { communityId: number; userId: number }) => 
      communitiesApi.removeMember(communityId, userId),
    onSuccess: (data, variables) => {
      // Invalidate community members
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.members(variables.communityId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.byId(variables.communityId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.stats });
    },
    onError: (error) => {
      console.error('Failed to remove community member:', error);
    },
  });
};