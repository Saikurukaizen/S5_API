import React from 'react';
import StatsGrid from '../components/Stats/StatsGrid';
import CommunityGrid from '../components/Community/CommunityGrid';
import DisciplineGrid from '../components/Discipline/DisciplineGrid';
import { useMockData } from '../hooks/useMockData';
import { Stat, Community, Discipline } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { 
    stats, 
    communities, 
    disciplines, 
    updateCommunityStatus, 
    toggleDiscipline 
  } = useMockData();

  const handleStatClick = (stat: Stat) => {
    console.log('Stat clicked:', stat);
    // TODO: Navigate to detailed stat view
  };

  const handleCommunityClick = (community: Community) => {
    console.log('Community clicked:', community);
    // TODO: Navigate to community detail view
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    console.log('Discipline clicked:', discipline);
    toggleDiscipline(discipline.id);
  };

  const handleShowAllCommunities = () => {
    console.log('Show all communities');
    // TODO: Navigate to all communities view
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">
          <span className="title-icon">📊</span>
          <span>Dashboard</span>
        </h1>
        <p className="page-subtitle">
          Resumen de tu actividad física y comunidades
        </p>
      </div>

      <div className="dashboard-content">
        {/* Stats Section */}
        <section className="dashboard-section">
          <StatsGrid 
            stats={stats}
            onStatClick={handleStatClick}
          />
        </section>

        {/* Communities Section */}
        <section className="dashboard-section">
          <CommunityGrid
            communities={communities}
            onCommunityClick={handleCommunityClick}
            onShowAllClick={handleShowAllCommunities}
          />
        </section>

        {/* Disciplines Section */}
        <section className="dashboard-section">
          <DisciplineGrid
            disciplines={disciplines}
            onDisciplineClick={handleDisciplineClick}
            selectedDisciplines={disciplines.filter(d => d.isActive).map(d => d.id)}
            title="Disciplinas Deportivas"
            subtitle="Gestiona tus disciplinas favoritas"
          />
        </section>
      </div>

      {/* Floating Action Button */}
      <button 
        className="fab"
        title="Unirse a nueva comunidad"
        onClick={() => console.log('FAB clicked')}
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;