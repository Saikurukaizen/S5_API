import { useState, useEffect } from 'react';
import { Stat, Community, Discipline } from '../types';

// Mock data similar to the mockup
export const useMockData = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      id: '1',
      icon: '👥',
      value: 3,
      label: 'Comunidades',
      trend: '+12%',
      progress: 60,
    },
    {
      id: '2',
      icon: '🏃',
      value: 5,
      label: 'Disciplinas',
      trend: '+8%',
      progress: 80,
    },
    {
      id: '3',
      icon: '🎯',
      value: 142,
      label: 'Miembros Activos',
      trend: '+24%',
      progress: 95,
    },
    {
      id: '4',
      icon: '⚡',
      value: '89%',
      label: 'Objetivos',
      trend: '+5%',
      progress: 89,
    },
  ]);

  const [communities, setCommunities] = useState<Community[]>([
    {
      id: '1',
      name: 'Running Club Barcelona',
      discipline: 'Running',
      icon: '🏃',
      members: 156,
      activeToday: 23,
      averageDistance: 4.2,
      unit: 'km',
      isOnline: true,
      notifications: 5,
      activityLevel: 78,
    },
    {
      id: '2',
      name: 'Cycling Masters',
      discipline: 'Cycling',
      icon: '🚴',
      members: 89,
      activeToday: 15,
      averageDistance: 28,
      unit: 'km',
      isOnline: true,
      notifications: 12,
      activityLevel: 65,
    },
    {
      id: '3',
      name: 'Swimming Team Pro',
      discipline: 'Swimming',
      icon: '🏊',
      members: 67,
      activeToday: 8,
      averageDistance: 1.2,
      unit: 'km',
      isOnline: false,
      notifications: 0,
      activityLevel: 42,
    },
    {
      id: '4',
      name: 'Fitness Warriors',
      discipline: 'Gym',
      icon: '💪',
      members: 45,
      activeToday: 12,
      averageTime: 45,
      unit: 'min',
      isOnline: true,
      notifications: 3,
      activityLevel: 67,
    },
  ]);

  const [disciplines, setDisciplines] = useState<Discipline[]>([
    { id: '1', name: 'Running', icon: '🏃‍♂️', isActive: true },
    { id: '2', name: 'Cycling', icon: '🚴‍♀️', isActive: true },
    { id: '3', name: 'Swimming', icon: '🏊‍♂️', isActive: false },
    { id: '4', name: 'Gym', icon: '💪', isActive: true },
    { id: '5', name: 'Tennis', icon: '🎾', isActive: false },
    { id: '6', name: 'Football', icon: '⚽', isActive: false },
    { id: '7', name: 'Basketball', icon: '🏀', isActive: false },
    { id: '8', name: 'Yoga', icon: '🧘', isActive: true },
  ]);

  // Simulate real-time updates - DISABLED to fix stats
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Update community notifications
  //     setCommunities(prev => prev.map(community => ({
  //       ...community,
  //       notifications: community.isOnline && Math.random() > 0.7 
  //         ? community.notifications + Math.floor(Math.random() * 3)
  //         : community.notifications,
  //       activeToday: community.isOnline 
  //         ? community.activeToday + (Math.random() > 0.8 ? 1 : 0)
  //         : community.activeToday,
  //     })));

  //     // Update stats occasionally
  //     if (Math.random() > 0.9) {
  //       setStats(prev => prev.map(stat => ({
  //         ...stat,
  //         value: typeof stat.value === 'number' 
  //           ? stat.value + (Math.random() > 0.5 ? 1 : -1)
  //           : stat.value,
  //       })));
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const updateCommunityStatus = (communityId: string, isOnline: boolean) => {
    setCommunities(prev => prev.map(community => 
      community.id === communityId 
        ? { ...community, isOnline }
        : community
    ));
  };

  const toggleDiscipline = (disciplineId: string) => {
    setDisciplines(prev => prev.map(discipline =>
      discipline.id === disciplineId
        ? { ...discipline, isActive: !discipline.isActive }
        : discipline
    ));
  };

  return {
    stats,
    communities,
    disciplines,
    updateCommunityStatus,
    toggleDiscipline,
  };
};