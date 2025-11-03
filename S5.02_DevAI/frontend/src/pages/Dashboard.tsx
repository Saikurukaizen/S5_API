import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsGrid from '../components/Stats/StatsGrid';
import { useRole } from '../hooks/useRole';
import CommunityGrid from '../components/Community/CommunityGrid';
import DisciplineGrid from '../components/Discipline/DisciplineGrid';
import { AuthenticatedOnly } from '../components/RoleGuard/RoleGuard';
import { useDisciplines } from '../hooks/useDisciplines';
import { useCommunities } from '../hooks/useCommunities';
import { adaptCommunitiesToFrontend, adaptDisciplinesToFrontend } from '../utils/adapters';
import { Discipline } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  console.log('📊 Dashboard: Component rendering...');
  
  const navigate = useNavigate();
  const { data: disciplinesResponse, isLoading: disciplinesLoading } = useDisciplines();
  const { data: communitiesResponse, isLoading: communitiesLoading } = useCommunities();
  
  console.log('📊 Dashboard: Hook states:', {
    disciplinesLoading,
    communitiesLoading,
    disciplinesData: !!disciplinesResponse?.data,
    communitiesData: !!communitiesResponse?.data
  });
  
  // Adapt API data to frontend types
  const disciplines = disciplinesResponse?.data ? adaptDisciplinesToFrontend(disciplinesResponse.data) : [];
  const communities = communitiesResponse?.data ? adaptCommunitiesToFrontend(communitiesResponse.data) : [];

  // Role logic for stats visibility
  const { isAdmin, isModerator } = useRole();

  console.log('📊 Dashboard: Adapted data:', {
    disciplinesCount: disciplines.length,
    communitiesCount: communities.length
  });

  // Debug: Track component lifecycle
  useEffect(() => {
    console.log('📊 Dashboard: Component mounted');
    return () => {
      console.log('📊 Dashboard: Component unmounted');
    };
  }, []);

  // Debug: Track loading states
  useEffect(() => {
    console.log('📊 Dashboard: Loading state changed:', {
      disciplinesLoading,
      communitiesLoading
    });
  }, [disciplinesLoading, communitiesLoading]);

  const handleStatClick = (statType: string) => {
    console.log('Stat type clicked:', statType);
    // TODO: Navigate to detailed stat view based on type
    // e.g., navigate to /users, /disciplines, /activities
  };

  const handleCommunityClick = (community: any) => {
    console.log('Community clicked:', community);
    navigate(`/communities/${community.id}`);
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    console.log('Discipline clicked:', discipline);
    navigate(`/disciplines/${discipline.id}`);
  };

  const handleShowAllCommunities = () => {
    console.log('Show all communities');
    navigate('/communities');
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
        {/* Stats Section: Only for Admin/Moderator */}
        {(isAdmin || isModerator) && (
          <section className="dashboard-section">
            <StatsGrid onStatClick={handleStatClick} />
          </section>
        )}

        {/* Communities Section */}
        <section className="dashboard-section">
          <CommunityGrid
            communities={communities}
            onCommunityClick={handleCommunityClick}
            onShowAllClick={handleShowAllCommunities}
            isLoading={communitiesLoading}
          />
        </section>

        {/* Disciplines Section */}
        <section className="dashboard-section">
          <DisciplineGrid
            disciplines={disciplines}
            onDisciplineClick={handleDisciplineClick}
            selectedDisciplines={[]} // TODO: Implement discipline selection state
            title="Disciplinas Deportivas"
            subtitle="Gestiona tus disciplinas favoritas"
            isLoading={disciplinesLoading}
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