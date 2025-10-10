export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  maxXp: number;
}

export interface Stat {
  id: string;
  icon: string;
  value: number | string;
  label: string;
  trend: string;
  progress: number;
}

export interface Community {
  id: string;
  name: string;
  discipline: string;
  icon: string;
  members: number;
  activeToday: number;
  averageDistance?: number;
  averageTime?: number;
  unit: string;
  isOnline: boolean;
  notifications: number;
  activityLevel: number;
}

export interface Discipline {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

export interface NotificationData {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  animated?: boolean;
}

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}