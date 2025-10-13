import React from 'react';
import { useRole } from '../../hooks/useRole';
import './RoleBadge.css';

interface RoleBadgeProps {
  showIcon?: boolean;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  showIcon = true,
  showText = true,
  size = 'medium',
}) => {
  const { userRole, isAuthenticated } = useRole();

  if (!isAuthenticated || !userRole) {
    return null;
  }

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'Admin':
        return {
          icon: '👑',
          text: 'Admin',
          className: 'role-admin',
          color: '#ff6b6b',
        };
      case 'Moderator':
        return {
          icon: '🛡️',
          text: 'Moderator',
          className: 'role-moderator',
          color: '#4ecdc4',
        };
      case 'User':
        return {
          icon: '👤',
          text: 'User',
          className: 'role-user',
          color: '#45b7d1',
        };
      default:
        return {
          icon: '❓',
          text: 'Unknown',
          className: 'role-unknown',
          color: '#95a5a6',
        };
    }
  };

  const config = getRoleConfig(userRole);

  return (
    <div className={`role-badge role-badge-${size} ${config.className}`}>
      {showIcon && <span className="role-icon">{config.icon}</span>}
      {showText && <span className="role-text">{config.text}</span>}
    </div>
  );
};