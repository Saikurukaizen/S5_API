import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { disciplineService } from '../api/disciplines';
import { queryKeys } from '../lib/queryClient';
import { 
  Discipline, 
  CreateDisciplineRequest, 
  UpdateDisciplineRequest,
  PaginationParams 
} from '../api/types';

// Hook for getting all disciplines
export const useDisciplines = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.disciplines(params),
    queryFn: async () => {
      const result = await disciplineService.getDisciplines(params);
      console.log('🏋️ useDisciplines: Fetch result:', result);
      return result;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - disciplines don't change often
  });
};

// Hook for getting a single discipline
export const useDiscipline = (id: number) => {
  return useQuery({
    queryKey: queryKeys.discipline(id),
    queryFn: () => disciplineService.getDiscipline(id),
    staleTime: 10 * 60 * 1000,
  });
};

// Hook for creating a discipline
export const useCreateDiscipline = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateDisciplineRequest) => disciplineService.createDiscipline(data),
    onSuccess: () => {
      // Invalidate disciplines list
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
    },
  });
};

// Hook for updating a discipline
export const useUpdateDiscipline = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDisciplineRequest }) => 
      disciplineService.updateDiscipline(id, data),
    onSuccess: (data, variables) => {
      // Invalidate disciplines list and specific discipline
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.discipline(variables.id) });
    },
  });
};

// Hook for deleting a discipline
export const useDeleteDiscipline = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => disciplineService.deleteDiscipline(id),
    onSuccess: (data, variables) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: queryKeys.discipline(variables) });
      queryClient.invalidateQueries({ queryKey: ['disciplines'] });
    },
  });
};