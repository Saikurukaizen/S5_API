// API Types based on Laravel Backend Swagger Documentation

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role: 'User' | 'Admin' | 'Moderator';
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: 'User' | 'Admin' | 'Moderator';
}

// Discipline Types
export interface Discipline {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDisciplineRequest {
  name: string;
  description?: string;
}

export interface UpdateDisciplineRequest {
  name?: string;
  description?: string;
}

// Activity Types
export interface Activity {
  id: number;
  user_id: number;
  discipline_id: number;
  name: string;
  description?: string;
  duration: number; // in minutes
  calories_burned?: number;
  date: string; // ISO date string
  created_at: string;
  updated_at: string;
  user?: User;
  discipline?: Discipline;
}

export interface CreateActivityRequest {
  discipline_id: number;
  name: string;
  description?: string;
  duration: number;
  calories_burned?: number;
  date: string;
}

export interface UpdateActivityRequest {
  discipline_id?: number;
  name?: string;
  description?: string;
  duration?: number;
  calories_burned?: number;
  date?: string;
}

// Statistics Types
export interface UserStats {
  total_users: number;
  active_users: number;
  new_users_this_month: number;
  user_growth_percentage: number;
}

export interface DisciplineStats {
  total_disciplines: number;
  most_popular_discipline: {
    id: number;
    name: string;
    activity_count: number;
  };
  disciplines_with_activities: number;
  average_activities_per_discipline: number;
}

export interface ActivityStats {
  total_activities: number;
  total_duration: number; // in minutes
  total_calories_burned: number;
  activities_this_month: number;
  average_duration_per_activity: number;
  most_active_user: {
    id: number;
    name: string;
    activity_count: number;
  };
}

// Pagination Types
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

// Query Parameters
export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export interface UserQueryParams extends PaginationParams {
  role?: 'User' | 'Admin' | 'Moderator';
  search?: string;
}

export interface ActivityQueryParams extends PaginationParams {
  user_id?: number;
  discipline_id?: number;
  date_from?: string;
  date_to?: string;
  sort_by?: 'date' | 'duration' | 'calories_burned';
  sort_order?: 'asc' | 'desc';
}