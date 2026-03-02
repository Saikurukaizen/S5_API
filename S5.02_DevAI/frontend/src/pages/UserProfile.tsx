import React from 'react';
import { 
  ProfileSidebar, 
  PersonalInfoCard, 
  SecurityCard, 
  ActivityTimeline, 
  DangerZone 
} from '../components/Profile';
import './UserProfile.css';

export const UserProfile: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">👤 MI PERFIL</h1>

        <div className="profile-grid">
          {/* Sidebar with Avatar, Stats and Communities */}
          <ProfileSidebar />

          {/* Main Content */}
          <div className="profile-content">
            {/* Personal Information */}
            <PersonalInfoCard />

            {/* Security Settings */}
            <SecurityCard />

            {/* Activity Timeline */}
            <ActivityTimeline />

            {/* Danger Zone */}
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;