// src/components/Analytics/Analytics.tsx
import React, { useState, useEffect } from 'react';
import './Analytics.css';
import { statsService } from '../../api/services/stats.service';

interface CommunityStats {
  total_communities: number;
  total_members: number;
  average_members_per_community: number;
  most_popular_discipline: string;
  total_disciplines: number;
  total_users: number;
  growth_rate: number;
  active_users_percentage: number;
}

interface RankingItem {
  id: number;
  name: string;
  members_count: number;
  discipline: {
    id: number;
    name: string;
  };
}

interface DisciplineDistribution {
  discipline_name: string;
  communities_count: number;
  members_count: number;
  percentage: number;
}

export const Analytics: React.FC = () => {
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [distribution, setDistribution] = useState<DisciplineDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'ranking' | 'distribution'>('overview');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsData, rankingData, distributionData] = await Promise.all([
        statsService.getSummary(),
        statsService.getRanking(),
        statsService.getByDiscipline(),
      ]);

      setStats(statsData);
      setRanking(rankingData.slice(0, 5)); // Top 5
      setDistribution(distributionData);
    } catch (err: any) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getGrowthIcon = (rate: number) => {
    if (rate > 0) return { icon: '📈', class: 'positive' };
    if (rate < 0) return { icon: '📉', class: 'negative' };
    return { icon: '➡️', class: 'neutral' };
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${position}º`;
    }
  };

  if (loading) {
    return (
      <div className="analytics-container">
        <div className="analytics-loading">
          <div className="cyber-spinner"></div>
          <p>CARGANDO ANALYTICS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-container">
        <div className="analytics-error">
          <span>⚠️</span>
          <p>{error}</p>
          <button className="btn-cyber btn-sm" onClick={loadAnalytics}>
            REINTENTAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <h2 className="analytics-title">📊 ANALYTICS</h2>
        <button className="btn-refresh" onClick={loadAnalytics} title="Actualizar">
          🔄
        </button>
      </div>

      {/* Tabs */}
      <div className="analytics-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          GENERAL
        </button>
        <button
          className={`tab-btn ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          TOP 5
        </button>
        <button
          className={`tab-btn ${activeTab === 'distribution' ? 'active' : ''}`}
          onClick={() => setActiveTab('distribution')}
        >
          DISCIPLINAS
        </button>
      </div>

      {/* Content */}
      <div className="analytics-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="analytics-overview">
            <div className="stat-mini-card">
              <div className="stat-mini-icon">👥</div>
              <div className="stat-mini-info">
                <div className="stat-mini-value">{stats.total_users}</div>
                <div className="stat-mini-label">Usuarios</div>
              </div>
            </div>

            <div className="stat-mini-card">
              <div className="stat-mini-icon">🏘️</div>
              <div className="stat-mini-info">
                <div className="stat-mini-value">{stats.total_communities}</div>
                <div className="stat-mini-label">Comunidades</div>
              </div>
            </div>

            <div className="stat-mini-card">
              <div className="stat-mini-icon">🏃</div>
              <div className="stat-mini-info">
                <div className="stat-mini-value">{stats.total_disciplines}</div>
                <div className="stat-mini-label">Disciplinas</div>
              </div>
            </div>

            <div className="stat-mini-card">
              <div className="stat-mini-icon">📊</div>
              <div className="stat-mini-info">
                <div className="stat-mini-value">{stats.average_members_per_community.toFixed(1)}</div>
                <div className="stat-mini-label">Promedio</div>
              </div>
            </div>

            <div className="stat-highlight">
              <div className="stat-highlight-label">MÁS POPULAR</div>
              <div className="stat-highlight-value">🏆 {stats.most_popular_discipline}</div>
            </div>

            <div className="stat-highlight">
              <div className="stat-highlight-label">CRECIMIENTO</div>
              <div className={`stat-highlight-value ${getGrowthIcon(stats.growth_rate).class}`}>
                {getGrowthIcon(stats.growth_rate).icon} {stats.growth_rate}%
              </div>
            </div>

            <div className="stat-highlight">
              <div className="stat-highlight-label">USUARIOS ACTIVOS</div>
              <div className="stat-highlight-value positive">
                ⚡ {stats.active_users_percentage}%
              </div>
            </div>
          </div>
        )}

        {/* Ranking Tab */}
        {activeTab === 'ranking' && (
          <div className="analytics-ranking">
            {ranking.map((item, index) => (
              <div key={item.id} className="ranking-mini-item">
                <div className="ranking-position">{getMedalEmoji(index + 1)}</div>
                <div className="ranking-info">
                  <div className="ranking-name">{item.name}</div>
                  <div className="ranking-discipline">{item.discipline.name}</div>
                </div>
                <div className="ranking-count">{item.members_count}</div>
              </div>
            ))}
          </div>
        )}

        {/* Distribution Tab */}
        {activeTab === 'distribution' && (
          <div className="analytics-distribution">
            {distribution.map((item, index) => (
              <div key={index} className="distribution-item">
                <div className="distribution-header">
                  <span className="distribution-name">{item.discipline_name}</span>
                  <span className="distribution-percentage">{item.percentage.toFixed(1)}%</span>
                </div>
                <div className="distribution-bar">
                  <div 
                    className="distribution-fill"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="distribution-stats">
                  <span>{item.communities_count} comunidades</span>
                  <span>{item.members_count} miembros</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};