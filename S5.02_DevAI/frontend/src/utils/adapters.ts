import { Community as ApiCommunity } from '../api/communities';
import { Discipline as ApiDiscipline } from '../api/types';
import { Community, Discipline } from '../types';

// Helper function to get emoji for discipline
const getDisciplineEmoji = (disciplineName: string): string => {
  const emojiMap: Record<string, string> = {
    'running': '🏃',
    'cycling': '🚴',
    'swimming': '🏊',
    'football': '⚽',
    'basketball': '🏀',
    'tennis': '🎾',
    'gym': '🏋️',
    'yoga': '🧘',
    'boxing': '🥊',
    'martial arts': '🥋',
    'baseball': '⚾',
    'volleyball': '🏐',
    'badminton': '🏸',
    'table tennis': '🏓',
    'golf': '⛳',
    'hockey': '🏒',
    'soccer': '⚽',
    'american football': '🏈',
    'rugby': '🏉',
    'climbing': '🧗',
    'skiing': '⛷️',
    'snowboarding': '🏂',
    'surfing': '🏄',
    'skateboarding': '🛹',
    'weightlifting': '🏋️',
    'crossfit': '🏋️',
    'pilates': '🧘',
    'dance': '💃',
    'athletics': '🏃',
    'track': '🏃',
    'field': '🏃',
  };
  
  const key = disciplineName.toLowerCase();
  for (const [keyword, emoji] of Object.entries(emojiMap)) {
    if (key.includes(keyword)) {
      return emoji;
    }
  }
  
  return '🏃'; // Default emoji
};

// Community adapter: API -> Frontend types
export const adaptCommunityToFrontend = (apiCommunity: ApiCommunity): Community => {
  const disciplineName = apiCommunity.discipline?.name || 'Unknown';
  const members = apiCommunity.users_count || 0;
  
  return {
    id: apiCommunity.id.toString(),
    name: apiCommunity.name,
    discipline: disciplineName,
    icon: getDisciplineEmoji(disciplineName),
    users_count: members,
    activeToday: Math.floor(members * 0.3), // Mock: 30% active today
    averageDistance: Math.floor(Math.random() * 50) + 10, // Mock data
    averageTime: Math.floor(Math.random() * 120) + 30, // Mock data
    unit: 'km', // Default unit
    isOnline: Math.random() > 0.5, // Mock online status
    notifications: Math.floor(Math.random() * 5), // Mock notifications
    activityLevel: Math.floor(Math.random() * 100) + 1, // Mock activity level
  };
};

// Discipline adapter: API -> Frontend types
export const adaptDisciplineToFrontend = (apiDiscipline: ApiDiscipline): Discipline => {
  return {
    id: apiDiscipline.id.toString(),
    name: apiDiscipline.name,
    icon: getDisciplineEmoji(apiDiscipline.name),
    isActive: false, // Default to false, can be managed by parent component
  };
};

// Batch adapters
export const adaptCommunitiesToFrontend = (apiCommunities: ApiCommunity[]): Community[] => {
  return apiCommunities.map(adaptCommunityToFrontend);
};

export const adaptDisciplinesToFrontend = (apiDisciplines: ApiDiscipline[]): Discipline[] => {
  return apiDisciplines.map(adaptDisciplineToFrontend);
};

// Reverse adapters: Frontend -> API types (for mutations)
export const adaptCommunityToApi = (frontendCommunity: Partial<Community>) => {
  return {
    name: frontendCommunity.name,
    description: '', // TODO: Add description field to frontend type
    discipline_id: parseInt(frontendCommunity.id || '0'), // This would need to be mapped properly
  };
};

export const adaptDisciplineToApi = (frontendDiscipline: Partial<Discipline>) => {
  return {
    name: frontendDiscipline.name,
    description: '', // TODO: Add description field to frontend type
  };
};