import React, { useState, Suspense } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import { DisciplinesList } from '../DisciplinesList/DisciplinesList';
const UserProfile = React.lazy(() => import('../../pages/UserProfile'));
import { useCommunities } from '../../hooks/useCommunities';
import CommunityGrid from '../Community/CommunityGrid';
import { adaptCommunitiesToFrontend } from '../../utils/adapters';
import './Layout.css';

const Layout: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { data: communitiesResponse, isLoading: communitiesLoading } = useCommunities();
  const communities = communitiesResponse?.data ? adaptCommunitiesToFrontend(communitiesResponse.data) : [];

  console.log('🏗️ Layout: Rendering with activeSection:', activeSection);

  let content;
  if (activeSection === 'dashboard') {
    content = <Dashboard />;
  } else if (activeSection === 'disciplines') {
    content = <DisciplinesList />;
  } else if (activeSection === 'communities') {
    content = <CommunityGrid communities={communities} isLoading={communitiesLoading} />;
  } else if (activeSection === 'profile') {
    content = (
      <Suspense fallback={<div>Cargando perfil...</div>}>
        <UserProfile />
      </Suspense>
    );
  } else if (activeSection === 'analytics' || activeSection === 'stats') {
    const Stats = React.lazy(() => import('../../pages/Stats'));
    content = (
      <Suspense fallback={<div>Cargando estadísticas...</div>}>
        <Stats />
      </Suspense>
    );
  } else {
    content = <Dashboard />;
  }

  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="main-content">
          <div className="content-wrapper">
            {content}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;