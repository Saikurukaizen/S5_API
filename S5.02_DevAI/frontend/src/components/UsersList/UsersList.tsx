import React from 'react';
import { DataList } from '../DataList/DataList';
import { RoleBadge } from '../RoleBadge/RoleBadge';
import { userService } from '../../api';
import { User, PaginationParams, PaginatedResponse } from '../../api/types';
import { useRole } from '../../hooks/useRole';

export const UsersList: React.FC = () => {
  const { permissions } = useRole();

  const fetchUsers = async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
    return await userService.getUsers(params);
  };

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    // Implementar lógica de edición
  };

  const handleDeleteUser = (user: User) => {
    console.log('Delete user:', user);
    // Implementar lógica de eliminación
  };

  const handleUserClick = (user: User) => {
    console.log('User clicked:', user);
    // Navegar a perfil de usuario
  };

  const columns = [
    {
      key: 'id' as keyof User,
      label: 'ID',
      width: '80px',
      sortable: true,
    },
    {
      key: 'name' as keyof User,
      label: 'Nombre',
      sortable: true,
    },
    {
      key: 'email' as keyof User,
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role' as keyof User,
      label: 'Rol',
      render: (role: string) => (
        <RoleBadge size="small" />
      ),
      width: '120px',
    },
    {
      key: 'created_at' as keyof User,
      label: 'Fecha de Registro',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
    {
      key: 'email_verified_at' as keyof User,
      label: 'Verificado',
      render: (verified: string | null) => (
        <span className={`status-badge ${verified ? 'verified' : 'unverified'}`}>
          {verified ? '✅ Verificado' : '❌ Sin verificar'}
        </span>
      ),
      width: '120px',
    },
  ];

  return (
    <DataList
      title="Gestión de Usuarios"
      columns={columns}
      fetchData={fetchUsers}
      onItemClick={handleUserClick}
      onItemEdit={permissions.canEditUsers ? handleEditUser : undefined}
      onItemDelete={permissions.canDeleteUsers ? handleDeleteUser : undefined}
      showActions={permissions.canEditUsers || permissions.canDeleteUsers}
      searchable={true}
      searchPlaceholder="Buscar usuarios por nombre o email..."
      itemsPerPageOptions={[10, 25, 50]}
      className="users-list"
    />
  );
};