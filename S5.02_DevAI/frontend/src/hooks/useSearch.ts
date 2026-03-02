import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCommunities } from './useCommunities';
import { useDisciplines } from './useDisciplines';
import { useUsers } from './useUsers';
import { useAuth } from '../contexts/AuthContext';

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'community' | 'discipline' | 'user';
  url: string;
  icon: string;
}

export const useSearch = (query: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Obtener datos de todas las fuentes
  const { data: communitiesData } = useCommunities();
  const { data: disciplinesData } = useDisciplines();
  const { data: usersData } = useUsers(isAdmin);

  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return [];

    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Buscar en comunidades
    if (communitiesData?.data) {
      communitiesData.data
        .filter(community => 
          community.name.toLowerCase().includes(searchTerm) ||
          community.description?.toLowerCase().includes(searchTerm)
        )
        .slice(0, 3) // Limitar a 3 resultados por tipo
        .forEach(community => {
          results.push({
            id: `community-${community.id}`,
            title: community.name,
            subtitle: `Comunidad • ${(community as any).users_count || 0} miembros`,
            type: 'community',
            url: `/communities/${community.id}`,
            icon: '👥'
          });
        });
    }

    // Buscar en disciplinas
    if (disciplinesData?.data) {
      disciplinesData.data
        .filter(discipline => 
          discipline.name.toLowerCase().includes(searchTerm) ||
          discipline.description?.toLowerCase().includes(searchTerm)
        )
        .slice(0, 3)
        .forEach(discipline => {
          results.push({
            id: `discipline-${discipline.id}`,
            title: discipline.name,
            subtitle: `Disciplina • ${discipline.description || 'Sin descripción'}`,
            type: 'discipline',
            url: `/disciplines/${discipline.id}`,
            icon: '🏃'
          });
        });
    }

    // Buscar en usuarios (solo si es admin)
    if (isAdmin && usersData?.data) {
      usersData.data
        .filter((user: any) => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        )
        .slice(0, 3)
        .forEach((user: any) => {
          results.push({
            id: `user-${user.id}`,
            title: user.name,
            subtitle: `Usuario • ${user.email}`,
            type: 'user',
            url: `/users/${user.id}`,
            icon: '👤'
          });
        });
    }

    return results.slice(0, 10); // Máximo 10 resultados totales
  }, [query, communitiesData, disciplinesData, usersData, isAdmin]);

  return {
    results: searchResults,
    isLoading: false, // Los datos ya están cargados por los otros hooks
    isEmpty: query.length >= 2 && searchResults.length === 0
  };
};