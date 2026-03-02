import React from 'react';
import { useAllStats } from '../../hooks/useStats';
import './StatsOverview.css';

interface StatsOverviewProps {
  timeFilter: string;
}

interface StatBoxData {
  icon: string;
  value: string;
  label: string;
  change: string;
  changeType: 'positive' | 'negative';
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ timeFilter }) => {
  const { userStats, disciplineStats, activityStats, isLoading, isError } = useAllStats();

  if (isLoading) {
    return (
      <div className="stats-overview">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="stat-box loading">
            <div className="stat-icon">⏳</div>
            <div className="stat-value">...</div>
            <div className="stat-label">Cargando...</div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="stats-overview">
        <div className="stat-box error">
          <span className="stat-icon">❌</span>
          <div className="stat-value">Error</div>
          <div className="stat-label">No se pudieron cargar las estadísticas</div>
        </div>
      </div>
    );
  }

  const statsData: StatBoxData[] = [
    {
      icon: '👥',
      value: userStats?.total_users?.toString() || '0',
      label: 'Total Usuarios',
      change: `▲ +${userStats?.user_growth_percentage || 0}% vs mes anterior`,
      changeType: 'positive'
    },
    {
      icon: '�',
      value: disciplineStats?.total_disciplines?.toString() || '0',
      label: 'Disciplinas',
      change: `▲ ${disciplineStats?.disciplines_with_activities || 0} activas`,
      changeType: 'positive'
    },
    {
      icon: '📊',
      value: activityStats?.total_activities?.toString() || '0',
      label: 'Actividades',
      change: `▲ ${activityStats?.activities_this_month || 0} este mes`,
      changeType: 'positive'
    },
    {
      icon: '📈',
      value: activityStats?.average_duration_per_activity?.toFixed(1) || '0',
      label: 'Duración Promedio (min)',
      change: `⏱️ ${activityStats?.total_duration || 0} min total`,
      changeType: 'positive'
    }
  ];

  return (
    <div className="stats-overview">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-box">
          <span className="stat-icon">{stat.icon}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
          <div className={`stat-change ${stat.changeType}`}>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};