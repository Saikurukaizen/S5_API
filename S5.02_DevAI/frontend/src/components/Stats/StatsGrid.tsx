import React from 'react';
import StatsCard from './StatsCard';
import { useAllStats } from '../../hooks/useStats';
import { useRole } from '../../hooks/useRole';
import './StatsGrid.css';

interface StatsGridProps {
  onStatClick?: (statType: string) => void;
}

const StatsGrid: React.FC<StatsGridProps> = ({ onStatClick }) => {
  const { permissions } = useRole();
  const { userStats, disciplineStats, activityStats, isLoading, isError, error, refetch } = useAllStats();

  const getColorForIndex = (index: number) => {
    const colors = [
      'var(--gradient-primary)',
      'var(--gradient-success)', 
      'var(--gradient-warning)',
      'var(--gradient-error)',
      'var(--gradient-accent)',
      'var(--gradient-secondary)',
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="stats-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="stats-card-skeleton">
            <div className="skeleton-content">
              <div className="skeleton-icon"></div>
              <div className="skeleton-text skeleton-value"></div>
              <div className="skeleton-text skeleton-label"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="stats-error">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <h3>Error al cargar estadísticas</h3>
          <p>{error?.message || 'No se pudieron cargar las estadísticas'}</p>
          <button onClick={refetch} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Build stats array from API data
  const stats = [];

  // User statistics (visible to Moderators and Admins)
  if (permissions.canViewUserStats && userStats) {
    stats.push(
      {
        id: 'total-users',
        icon: '👥',
        value: userStats.total_users.toLocaleString(),
        label: 'Usuarios Totales',
        trend: typeof userStats.user_growth_percentage === 'number'
          ? (userStats.user_growth_percentage > 0
              ? `+${userStats.user_growth_percentage.toFixed(1)}%`
              : `${userStats.user_growth_percentage.toFixed(1)}%`)
          : '-',
        type: 'users',
      },
      {
        id: 'active-users',
        icon: '🟢',
        value: userStats.active_users.toLocaleString(),
        label: 'Usuarios Activos',
        progress: userStats.total_users > 0 ? (userStats.active_users / userStats.total_users) * 100 : 0,
        type: 'users',
      },
      {
        id: 'new-users',
        icon: '🆕',
        value: userStats.new_users_this_month.toLocaleString(),
        label: 'Nuevos Este Mes',
        trend: typeof userStats.user_growth_percentage === 'number'
          ? (userStats.user_growth_percentage > 0
              ? `+${userStats.user_growth_percentage.toFixed(1)}%`
              : `${userStats.user_growth_percentage.toFixed(1)}%`)
          : '-',
        type: 'users',
      }
    );
  }

  // Discipline statistics (visible to all authenticated users)
  if (disciplineStats) {
    stats.push(
      {
        id: 'total-disciplines',
        icon: '🏃',
        value: disciplineStats.total_disciplines.toLocaleString(),
        label: 'Disciplinas',
        type: 'disciplines',
      },
      {
        id: 'disciplines-with-activities',
        icon: '📊',
        value: disciplineStats.disciplines_with_activities.toLocaleString(),
        label: 'Con Actividades',
        progress: disciplineStats.total_disciplines > 0 
          ? (disciplineStats.disciplines_with_activities / disciplineStats.total_disciplines) * 100 
          : 0,
        type: 'disciplines',
      }
    );

    if (disciplineStats.most_popular_discipline) {
      stats.push({
        id: 'popular-discipline',
        icon: '🏆',
        value: disciplineStats.most_popular_discipline.activity_count.toLocaleString(),
        label: `Top: ${disciplineStats.most_popular_discipline.name}`,
        type: 'disciplines',
      });
    }
  }

  // Activity statistics (visible to all authenticated users)
  if (activityStats) {
    stats.push(
      {
        id: 'total-activities',
        icon: '⚡',
        value: activityStats.total_activities.toLocaleString(),
        label: 'Actividades Totales',
        type: 'activities',
      },
      {
        id: 'total-duration',
        icon: '⏱️',
        value: `${Math.round(activityStats.total_duration / 60)}h`,
        label: 'Tiempo Total',
        type: 'activities',
      },
      {
        id: 'total-calories',
        icon: '🔥',
        value: activityStats.total_calories_burned.toLocaleString(),
        label: 'Calorías Quemadas',
        type: 'activities',
      },
      {
        id: 'activities-this-month',
        icon: '📈',
        value: activityStats.activities_this_month.toLocaleString(),
        label: 'Este Mes',
        type: 'activities',
      }
    );

    if (activityStats.most_active_user) {
      stats.push({
        id: 'most-active-user',
        icon: '🌟',
        value: activityStats.most_active_user.activity_count.toLocaleString(),
        label: `Top: ${activityStats.most_active_user.name}`,
        type: 'activities',
      });
    }
  }

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.id}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          trend={stat.trend}
          progress={stat.progress}
          color={getColorForIndex(index)}
          onClick={onStatClick ? () => onStatClick(stat.type) : undefined}
        />
      ))}
    </div>
  );
};

export default StatsGrid;