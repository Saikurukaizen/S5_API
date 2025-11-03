import React, { useState } from 'react';
import './Analytics.css';
import { useAllStats } from '../hooks/useStats';
import { useAuth } from '../contexts/AuthContext';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Enhanced Cyberpunk Bar Chart Component
const BarChart: React.FC<{ data: ChartData[]; title: string }> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="chart-container cyber-chart">
      <h3 className="chart-title">{title}</h3>
      <div className="cyber-grid-bg">
        <div className="bar-chart futuristic-bars">
          {data.map((item, index) => (
            <div key={index} className="bar-item cyberpunk-bar">
              <div className="bar-label cyber-text">{item.name}</div>
              <div className="bar-wrapper neon-container">
                <div className="bar-background"></div>
                <div 
                  className="bar-fill neon-bar"
                  style={{ 
                    '--bar-width': `${(item.value / maxValue) * 100}%`,
                    '--bar-color': item.color || '#00ff9d',
                    '--bar-delay': `${index * 0.2}s`
                  } as React.CSSProperties}
                >
                  <div className="bar-glow"></div>
                  <div className="bar-pulse"></div>
                  <span className="bar-value cyber-value">{item.value}</span>
                  <div className="bar-particles">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="particle" style={{'--delay': `${i * 0.5}s`} as React.CSSProperties}></div>
                    ))}
                  </div>
                </div>
                <div className="bar-scan-line"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="chart-grid-overlay"></div>
      </div>
    </div>
  );
};

// Enhanced Cyberpunk Pie Chart Component
const PieChart: React.FC<{ data: ChartData[]; title: string }> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  if (total === 0) {
    return (
      <div className="chart-container cyber-chart">
        <h3 className="chart-title">{title}</h3>
        <div className="no-data cyber-no-data">
          <div className="hologram-effect">
            <span>No hay datos disponibles</span>
            <div className="glitch-lines"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container cyber-chart">
      <h3 className="chart-title">{title}</h3>
      <div className="pie-chart-wrapper futuristic-pie">
        <div className="pie-container">
          <div className="pie-hologram-ring"></div>
          <svg className="pie-chart cyber-pie" viewBox="0 0 100 100">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="pieGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,255,157,0.8)" />
                <stop offset="100%" stopColor="rgba(0,212,255,0.8)" />
              </linearGradient>
            </defs>
            
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="42" 
              fill="none" 
              stroke="rgba(0,255,157,0.1)" 
              strokeWidth="0.5"
              className="pie-bg-circle"
            />
            
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const x1 = 50 + 40 * Math.cos((currentAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((currentAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
              const largeArc = angle > 180 ? 1 : 0;
              const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
              
              currentAngle += angle;
              
              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={item.color || `hsl(${index * 60}, 70%, 50%)`}
                    stroke="rgba(0,0,0,0.8)"
                    strokeWidth="0.5"
                    filter="url(#glow)"
                    className="pie-slice"
                    style={{'--slice-delay': `${index * 0.3}s`} as React.CSSProperties}
                  />
                  {/* Data points */}
                  <circle
                    cx={50 + 35 * Math.cos(((currentAngle - angle/2) * Math.PI) / 180)}
                    cy={50 + 35 * Math.sin(((currentAngle - angle/2) * Math.PI) / 180)}
                    r="1"
                    fill="#00ff9d"
                    className="data-point"
                  >
                    <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
            
            {/* Center hologram */}
            <circle cx="50" cy="50" r="8" fill="none" stroke="url(#pieGlow)" strokeWidth="1" className="center-ring">
              <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
          
          <div className="pie-center-data">
            <div className="total-value">{total}</div>
            <div className="total-label">Total</div>
          </div>
        </div>
        
        <div className="pie-legend cyber-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item neon-legend" style={{'--item-delay': `${index * 0.2}s`} as React.CSSProperties}>
              <div className="legend-indicator">
                <div 
                  className="legend-color neon-dot"
                  style={{ 
                    backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)`,
                    boxShadow: `0 0 10px ${item.color || `hsl(${index * 60}, 70%, 50%)`}`
                  }}
                ></div>
                <div className="legend-pulse"></div>
              </div>
              <span className="legend-label cyber-text">
                {item.name}
                <span className="legend-value">{item.value}</span>
              </span>
              <div className="legend-scan"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  console.log('🚀 Analytics: Component mounting/rendering');

  const [activeTab, setActiveTab] = useState<'overview' | 'disciplines' | 'users' | 'communities'>('overview');
  
  // Get auth context for user info
  const { user, isAuthenticated } = useAuth();
  
  console.log('👤 Analytics: Auth status', {
    isAuthenticated,
    user: user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    } : null
  });

  // Fetch real data from backend
  const {
    disciplineStats,
    userStats,
    communityStats,
    disciplineRanking,
    userRanking,
    communityRanking,
    disciplinePercentages,
    userPercentages,
    communityPercentages,
    isLoading,
    hasError,
    refetchAll
  } = useAllStats();

  console.log('📊 Analytics: Data status', {
    disciplineStats: {
      status: disciplineStats.status,
      isLoading: disciplineStats.isLoading,
      isError: disciplineStats.isError,
      error: disciplineStats.error,
      data: disciplineStats.data
    },
    userStats: {
      status: userStats.status,
      isLoading: userStats.isLoading,
      isError: userStats.isError,
      error: userStats.error,
      data: userStats.data
    },
    communityStats: {
      status: communityStats.status,
      isLoading: communityStats.isLoading,
      isError: communityStats.isError,
      error: communityStats.error,
      data: communityStats.data
    },
    combinedStates: {
      isLoading,
      hasError
    }
  });

  // Log specific errors
  if (disciplineStats.error) {
    console.error('❌ Analytics: Discipline stats error:', disciplineStats.error);
  }
  if (userStats.error) {
    console.error('❌ Analytics: User stats error:', userStats.error);
  }
  if (communityStats.error) {
    console.error('❌ Analytics: Community stats error:', communityStats.error);
  }

  if (isLoading) {
    return (
      <div className="analytics-page">
        <div className="loading-container">
          <div className="cyber-spinner"></div>
          <p>Cargando estadísticas del sistema...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="analytics-page">
        <div className="error-container">
          <h2>❌ Error al cargar estadísticas</h2>
          <p>No se pudieron cargar los datos. Verifica tu conexión y permisos.</p>
          <button onClick={refetchAll} className="retry-button">
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Transform discipline ranking data for charts
  const getDisciplineChartData = (): ChartData[] => {
    if (!disciplineRanking.data?.ranking) return [];
    return disciplineRanking.data.ranking.map((item: any, index: number) => ({
      name: item.name,
      value: item.users_count,
      color: `hsl(${120 + index * 40}, 70%, 50%)`
    }));
  };

  // Transform user percentages data for charts
  const getUserAgeChartData = (): ChartData[] => {
    if (!userPercentages.data?.data?.percentages) return [];
    return userPercentages.data.data.percentages.map((item: any, index: number) => ({
      name: item.discipline_name,
      value: Math.round(item.percentage),
      color: `hsl(${180 + index * 50}, 70%, 50%)`
    }));
  };

  // Transform community ranking data for charts
  const getCommunityChartData = (): ChartData[] => {
    if (!communityRanking.data?.data) return [];
    return communityRanking.data.data.map((item: any, index: number) => ({
      name: item.name,
      value: item.users_count,
      color: `hsl(${60 + index * 45}, 70%, 50%)`
    }));
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1 className="page-title">
          <span className="title-icon">📊</span>
          Analytics Dashboard
        </h1>
        <p className="page-subtitle">Estadísticas detalladas del sistema en tiempo real</p>
      </div>

      <nav className="analytics-nav">
        <button
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="tab-icon">📊</span>
          <span className="tab-label">Resumen</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'disciplines' ? 'active' : ''}`}
          onClick={() => setActiveTab('disciplines')}
        >
          <span className="tab-icon">🏃</span>
          <span className="tab-label">Disciplinas</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <span className="tab-icon">👥</span>
          <span className="tab-label">Usuarios</span>
        </button>
        <button
          className={`nav-tab ${activeTab === 'communities' ? 'active' : ''}`}
          onClick={() => setActiveTab('communities')}
        >
          <span className="tab-icon">🏆</span>
          <span className="tab-label">Comunidades</span>
        </button>
      </nav>

      <main className="analytics-content">
        {activeTab === 'overview' && (
          <div className="analytics-grid">
            <div className="stats-summary">
              <div className="summary-card">
                <div className="summary-icon">🏃</div>
                <div className="summary-content">
                  <div className="summary-value">{disciplineStats.data?.total_disciplines || 0}</div>
                  <div className="summary-label">Disciplinas Activas</div>
                  <div className="summary-trend">
                    {disciplineStats.data?.total_users 
                      ? `${disciplineStats.data.total_users} usuarios total`
                      : 'Sin datos'
                    }
                  </div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">👥</div>
                <div className="summary-content">
                  <div className="summary-value">{userStats.data?.data?.total_users || 0}</div>
                  <div className="summary-label">Usuarios Registrados</div>
                  <div className="summary-trend">
                    {userStats.data?.data?.most_active_user 
                      ? `Más activo: ${userStats.data.data.most_active_user}`
                      : 'Sin datos de actividad'
                    }
                  </div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">🏆</div>
                <div className="summary-content">
                  <div className="summary-value">{communityStats.data?.data?.total_communities || 0}</div>
                  <div className="summary-label">Comunidades</div>
                  <div className="summary-trend">
                    {communityStats.data?.data?.total_users 
                      ? `${communityStats.data.data.total_users} miembros total`
                      : 'Sin datos'
                    }
                  </div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-content">
                  <div className="summary-value">
                    {disciplineStats.data?.average_users_per_discipline?.toFixed(1) || '0.0'}
                  </div>
                  <div className="summary-label">Promedio usuarios/disciplina</div>
                  <div className="summary-trend">
                    {disciplineStats.data?.most_popular_discipline 
                      ? `Top: ${disciplineStats.data.most_popular_discipline}`
                      : 'Sin datos'
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="charts-overview">
              <BarChart 
                data={getDisciplineChartData()} 
                title="🏃 Top Disciplinas por Popularidad" 
              />
              <PieChart 
                data={getCommunityChartData()} 
                title="🏆 Distribución de Miembros por Comunidad" 
              />
            </div>
          </div>
        )}

        {activeTab === 'disciplines' && (
          <div className="analytics-grid">
            <BarChart 
              data={getDisciplineChartData()} 
              title="📊 Usuarios por Disciplina" 
            />
            <PieChart 
              data={getDisciplineChartData()} 
              title="🥧 Distribución de Disciplinas" 
            />
            
            <div className="stats-summary">
              <div className="summary-card">
                <div className="summary-icon">🥇</div>
                <div className="summary-content">
                  <div className="summary-value">
                    {disciplineStats.data?.most_popular_discipline || 'N/A'}
                  </div>
                  <div className="summary-label">Disciplina Más Popular</div>
                  <div className="summary-trend">
                    {disciplineRanking.data?.ranking?.[0]?.users_count 
                      ? `${disciplineRanking.data.ranking[0].users_count} usuarios activos`
                      : 'Sin datos'
                    }
                  </div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">📊</div>
                <div className="summary-content">
                  <div className="summary-value">{disciplineStats.data?.total_disciplines || 0}</div>
                  <div className="summary-label">Total Disciplinas</div>
                  <div className="summary-trend">
                    Promedio: {disciplineStats.data?.average_users_per_discipline?.toFixed(1) || '0.0'} usuarios
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="analytics-grid">
            <BarChart 
              data={getUserAgeChartData()} 
              title="👥 Usuarios por Disciplina (%)" 
            />
            <PieChart 
              data={getUserAgeChartData()} 
              title="� Distribución de Intereses" 
            />
            
            <div className="stats-summary">
              <div className="summary-card">
                <div className="summary-icon">👑</div>
                <div className="summary-content">
                  <div className="summary-value">
                    {userStats.data?.data?.most_active_user || 'N/A'}
                  </div>
                  <div className="summary-label">Usuario Más Activo</div>
                  <div className="summary-trend">Líder en participación</div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">👥</div>
                <div className="summary-content">
                  <div className="summary-value">{userStats.data?.data?.total_users || 0}</div>
                  <div className="summary-label">Total de Usuarios</div>
                  <div className="summary-trend">Registrados en el sistema</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communities' && (
          <div className="analytics-grid">
            <BarChart 
              data={getCommunityChartData()} 
              title="🏆 Miembros por Comunidad" 
            />
            <PieChart 
              data={getCommunityChartData()} 
              title="👥 Distribución de Comunidades" 
            />
            
            <div className="stats-summary">
              <div className="summary-card">
                <div className="summary-icon">🏆</div>
                <div className="summary-content">
                  <div className="summary-value">
                    {communityStats.data?.data?.most_popular_community?.name || 'N/A'}
                  </div>
                  <div className="summary-label">Comunidad Más Grande</div>
                  <div className="summary-trend">
                    {communityStats.data?.data?.most_popular_community?.users_count 
                      ? `${communityStats.data.data.most_popular_community.users_count} miembros`
                      : 'Sin datos'
                    }
                  </div>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">🏘️</div>
                <div className="summary-content">
                  <div className="summary-value">{communityStats.data?.data?.total_communities || 0}</div>
                  <div className="summary-label">Total Comunidades</div>
                  <div className="summary-trend">
                    {communityStats.data?.data?.total_users 
                      ? `${communityStats.data.data.total_users} miembros total`
                      : 'Sin miembros'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;