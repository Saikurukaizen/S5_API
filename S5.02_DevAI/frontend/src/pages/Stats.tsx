import React, { useState } from 'react';
import { 
  StatsOverview, 
  CommunityRanking, 
  DisciplineDistribution, 
  ActivityChart, 
  GeneralSummary 
} from '../components/Stats/index';
import './Stats.css';

export const Stats: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [disciplineFilter, setDisciplineFilter] = useState('all');

  return (
    <div className="stats-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">📊 ESTADÍSTICAS</h1>
        <div className="filter-bar">
          <select 
            className="filter-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="7d">ÚLTIMOS 7 DÍAS</option>
            <option value="30d">ÚLTIMOS 30 DÍAS</option>
            <option value="3m">ÚLTIMOS 3 MESES</option>
            <option value="all">TODO EL TIEMPO</option>
          </select>
          <select 
            className="filter-select"
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
          >
            <option value="all">TODAS LAS DISCIPLINAS</option>
            <option value="running">🏃 RUNNING</option>
            <option value="cycling">🚴 CYCLING</option>
            <option value="swimming">🏊 SWIMMING</option>
          </select>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <StatsOverview timeFilter={timeFilter} />

      {/* Top 5 Communities Ranking */}
      <CommunityRanking />

      {/* Distribution by Discipline */}
      <DisciplineDistribution />

      {/* Monthly Activity Chart */}
      <ActivityChart />

      {/* General Summary */}
      <GeneralSummary />
    </div>
  );
};

export default Stats;