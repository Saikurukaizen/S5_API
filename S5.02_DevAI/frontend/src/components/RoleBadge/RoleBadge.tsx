import React from 'react';
import { useRole } from '../../hooks/useRole';
import './RoleBadge.css';

interface RoleBadgeProps {
  role?: string; // Rol específico a mostrar (opcional)
  showIcon?: boolean;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role, // Rol específico a mostrar
  showIcon = true,
  showText = true,
  size = 'medium',
}) => {
  const { userRole, isAuthenticated } = useRole();

  // Usar el rol específico pasado como prop, o el rol del usuario autenticado como fallback
  const displayRole = role || userRole;

  if (!isAuthenticated || !displayRole) {
    return null;
  }

  const getRoleConfig = (role: string) => {
    // Normalize role to handle case variations from backend
    const normalizedRole = role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();
    
    switch (normalizedRole) {
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

  const config = getRoleConfig(displayRole);

  return (
    <div className={`role-badge role-badge-${size} ${config.className}`}>
      {showIcon && <span className="role-icon">{config.icon}</span>}
      {showText && <span className="role-text">{config.text}</span>}
    </div>
  );
};