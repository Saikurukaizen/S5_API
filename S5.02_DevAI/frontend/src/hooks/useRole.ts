import { useAuth } from '../contexts/AuthContext';
import { User } from '../api/types';

type UserRole = 'User' | 'Admin' | 'Moderator';

interface RolePermissions {
  canCreateDisciplines: boolean;
  canEditDisciplines: boolean;
  canDeleteDisciplines: boolean;
  canManageUsers: boolean;
  canViewUserStats: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canModerateActivities: boolean;
  canViewAdminPanel: boolean;
  canExportData: boolean;
}

export const useRole = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Normalize role to handle case variations from backend
  const rawRole = user?.role;
  const normalizedRole = rawRole ? (rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase()) as UserRole : null;
  const userRole: UserRole | null = normalizedRole;

  const isUser = userRole === 'User';
  const isModerator = userRole === 'Moderator';
  const isAdmin = userRole === 'Admin';

  // Role hierarchy: Admin > Moderator > User
  const hasMinimumRole = (requiredRole: UserRole): boolean => {
    if (!isAuthenticated || !userRole) return false;

    const roleHierarchy: Record<UserRole, number> = {
      'User': 1,
      'Moderator': 2,
      'Admin': 3,
    };

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };

  const permissions: RolePermissions = {
    // User permissions (base level)
    canCreateDisciplines: hasMinimumRole('User'),
    canEditDisciplines: false, // Only own disciplines
    canDeleteDisciplines: false, // Only own disciplines
    
    // Moderator permissions
    canManageUsers: hasMinimumRole('Moderator'),
    canViewUserStats: hasMinimumRole('Moderator'),
    canModerateActivities: hasMinimumRole('Moderator'),
    
    // Admin permissions
    canEditUsers: hasMinimumRole('Admin'),
    canDeleteUsers: hasMinimumRole('Admin'),
    canViewAdminPanel: hasMinimumRole('Admin'),
    canExportData: hasMinimumRole('Admin'),
  };

  // Override permissions for specific roles
  if (isAdmin) {
    permissions.canEditDisciplines = true;
    permissions.canDeleteDisciplines = true;
  } else if (isModerator) {
    permissions.canEditDisciplines = true; // Can edit any discipline
  }

  return {
    user,
    userRole,
    isUser,
    isModerator,
    isAdmin,
    isAuthenticated,
    isLoading,
    hasMinimumRole,
    permissions,
  };
};

// Helper function to check if user owns a resource
export const canModifyResource = (
  user: User | null, 
  resourceUserId: number, 
  requiredRole?: UserRole
): boolean => {
  if (!user) return false;
  
  // Admin can modify anything
  if (user.role === 'Admin') return true;
  
  // Moderator can modify if specified
  if (requiredRole === 'Moderator' && user.role === 'Moderator') return true;
  
  // User can only modify their own resources
  return user.id === resourceUserId;
};