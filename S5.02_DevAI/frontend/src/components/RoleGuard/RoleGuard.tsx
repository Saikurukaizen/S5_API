import React from 'react';
import { useRole } from '../../hooks/useRole';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type UserRole = 'User' | 'Admin' | 'Moderator';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  minimumRole?: UserRole;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  minimumRole,
  requireAuth = true,
  fallback = null,
}) => {
  const { userRole, isAuthenticated, hasMinimumRole, isLoading } = useRole();

  // Show loading while checking authentication and role
  if (isLoading) {
    return <LoadingSpinner message="Verificando permisos..." size="small" />;
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback as React.ReactElement;
  }

  // Check specific allowed roles
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return fallback as React.ReactElement;
  }

  // Check minimum role requirement
  if (minimumRole && !hasMinimumRole(minimumRole)) {
    return fallback as React.ReactElement;
  }

  return children as React.ReactElement;
};

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: keyof ReturnType<typeof useRole>['permissions'];
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  fallback = null,
}) => {
  const { permissions, isLoading } = useRole();

  // Show loading while checking permissions
  if (isLoading) {
    return <LoadingSpinner message="Verificando permisos..." size="small" />;
  }

  if (!permissions[permission]) {
    return fallback as React.ReactElement;
  }

  return children as React.ReactElement;
};

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AdminOnly: React.FC<AdminOnlyProps> = ({ children, fallback = null }) => (
  <RoleGuard allowedRoles={['Admin']} fallback={fallback}>
    {children}
  </RoleGuard>
);

interface ModeratorPlusProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ModeratorPlus: React.FC<ModeratorPlusProps> = ({ children, fallback = null }) => (
  <RoleGuard minimumRole="Moderator" fallback={fallback}>
    {children}
  </RoleGuard>
);

interface AuthenticatedOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthenticatedOnly: React.FC<AuthenticatedOnlyProps> = ({ 
  children, 
  fallback = <div>Please log in to access this content.</div> 
}) => (
  <RoleGuard requireAuth={true} fallback={fallback}>
    {children}
  </RoleGuard>
);