import { apiCall } from './client';
import {
  Discipline,
  CreateDisciplineRequest,
  UpdateDisciplineRequest,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from './types';

export const disciplineService = {
  // GET /api/v1/disciplines
  getDisciplines: async (params?: PaginationParams): Promise<PaginatedResponse<Discipline>> => {
    return apiCall<PaginatedResponse<Discipline>>({
      method: 'GET',
      url: '/disciplines',
      params,
    });
  },

  // GET /api/v1/disciplines/all (without pagination)
  getAllDisciplines: async (): Promise<ApiResponse<Discipline[]>> => {
    return apiCall<ApiResponse<Discipline[]>>({
      method: 'GET',
      url: '/disciplines/all',
    });
  },

  // GET /api/v1/disciplines/{id}
  getDiscipline: async (id: number): Promise<ApiResponse<Discipline>> => {
    return apiCall<ApiResponse<Discipline>>({
      method: 'GET',
      url: `/disciplines/${id}`,
    });
  },

  // POST /api/v1/disciplines
  createDiscipline: async (disciplineData: CreateDisciplineRequest): Promise<ApiResponse<Discipline>> => {
    return apiCall<ApiResponse<Discipline>>({
      method: 'POST',
      url: '/disciplines',
      data: disciplineData,
    });
  },

  // PUT /api/v1/disciplines/{id}
  updateDiscipline: async (id: number, disciplineData: UpdateDisciplineRequest): Promise<ApiResponse<Discipline>> => {
    return apiCall<ApiResponse<Discipline>>({
      method: 'PUT',
      url: `/disciplines/${id}`,
      data: disciplineData,
    });
  },

  // DELETE /api/v1/disciplines/{id}
  deleteDiscipline: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<ApiResponse<null>>({
      method: 'DELETE',
      url: `/disciplines/${id}`,
    });
  },
};