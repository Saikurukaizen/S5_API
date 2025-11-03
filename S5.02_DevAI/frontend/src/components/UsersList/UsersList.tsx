import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataList } from '../DataList/DataList';
import { RoleBadge } from '../RoleBadge/RoleBadge';
import { userService } from '../../api';
import { User, PaginationParams, PaginatedResponse } from '../../api/types';
import { useRole } from '../../hooks/useRole';
import './UsersList.css';

export const UsersList: React.FC = () => {
  const { permissions } = useRole();
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [editForm, setEditForm] = useState<{ 
    name: string; 
    lastname: string; 
    email: string; 
    role: 'user' | 'admin' | 'moderator';
  }>({ 
    name: '', 
    lastname: '', 
    email: '',
    role: 'user'
  });
  const [createForm, setCreateForm] = useState<{ 
    name: string; 
    lastname: string; 
    email: string; 
    password: string;
    role: 'user' | 'admin' | 'moderator';
  }>({ 
    name: '', 
    lastname: '', 
    email: '',
    password: '',
    role: 'user'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchUsers = async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
    return await userService.getUsers(params);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditForm({ 
      name: user.name, 
      lastname: user.lastname,
      email: user.email,
      role: (user.role.toLowerCase() as 'user' | 'admin' | 'moderator') || 'user'
    });
    setError(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await userService.updateUser(Number(editingUser.id), {
        name: editForm.name,
        lastname: editForm.lastname,
        email: editForm.email,
        role: editForm.role,
      });
      
      setEditingUser(null);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateClick = () => {
    setCreatingUser(true);
    setCreateForm({ 
      name: '', 
      lastname: '', 
      email: '',
      password: '',
      role: 'user'
    });
    setError(null);
  };

  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsCreating(true);
    setError(null);
    
    try {
      await userService.createUser({
        name: createForm.name,
        lastname: createForm.lastname,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
      });
      
      setCreatingUser(false);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el usuario');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingUser) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await userService.deleteUser(Number(deletingUser.id));
      setDeletingUser(null);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar el usuario');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.id}`);
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
      label: 'NOMBRE',
      sortable: true,
      render: (name: string, user: User) => (
        <span className="user-name">{name} {user.lastname}</span>
      ),
    },
    {
      key: 'email' as keyof User,
      label: 'EMAIL',
      sortable: true,
    },
    {
      key: 'role' as keyof User,
      label: 'ROL',
      render: (role: string) => (
        <RoleBadge role={role} size="small" />
      ),
      width: '120px',
    },
    {
      key: 'created_at' as keyof User,
      label: 'CREADO',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
    {
      key: 'email_verified_at' as keyof User,
      label: 'VERIFICADO',
      render: (verified: string | null) => (
        <span className={`status-badge ${verified ? 'verified' : 'unverified'}`}>
          {verified ? '✅ Verificado' : '❌ Sin verificar'}
        </span>
      ),
      width: '140px',
    },
  ];

  return (
    <>
      <div className="list-header">
        <h1 className="page-title">👥 GESTIÓN DE USUARIOS</h1>
        {permissions.canEditUsers && (
          <button 
            className="btn-cyber create-btn"
            onClick={handleCreateClick}
          >
            <span className="btn-icon">👥</span>
            CREAR USUARIO
          </button>
        )}
      </div>

      <DataList
        key={refreshKey}
        title=""
        columns={columns}
        fetchData={fetchUsers}
        onItemClick={handleUserClick}
        onItemEdit={permissions.canEditUsers ? handleEditUser : undefined}
        onItemDelete={permissions.canDeleteUsers ? handleDeleteClick : undefined}
        showActions={permissions.canEditUsers || permissions.canDeleteUsers}
        searchable={true}
        searchPlaceholder="BUSCAR USUARIOS..."
        itemsPerPageOptions={[10, 20, 50]}
        className="cyberpunk-list"
      />

      {/* Modal de Edición */}
      {editingUser && (
        <div className="modal-overlay" onClick={() => !isSaving && setEditingUser(null)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ EDITAR USUARIO</h2>
              <button 
                className="close-btn" 
                onClick={() => setEditingUser(null)}
                disabled={isSaving}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEditFormSubmit}>
              <div className="form-group">
                <label className="cyber-label">NOMBRE</label>
                <input
                  type="text"
                  name="name"
                  className="cyber-input"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  required
                  disabled={isSaving}
                  placeholder="Nombre del usuario"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">APELLIDO</label>
                <input
                  type="text"
                  name="lastname"
                  className="cyber-input"
                  value={editForm.lastname}
                  onChange={handleEditFormChange}
                  required
                  disabled={isSaving}
                  placeholder="Apellido del usuario"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  className="cyber-input"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  required
                  disabled={isSaving}
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">ROL</label>
                <select
                  name="role"
                  className="cyber-select"
                  value={editForm.role}
                  onChange={handleEditFormChange}
                  disabled={isSaving}
                >
                  <option value="user">👤 Usuario</option>
                  <option value="moderator">🛡️ Moderador</option>
                  <option value="admin">👑 Administrador</option>
                </select>
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cyber btn-secondary"
                  onClick={() => setEditingUser(null)} 
                  disabled={isSaving}
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="btn-cyber btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner"></span>
                      GUARDANDO...
                    </>
                  ) : (
                    '💾 GUARDAR'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deletingUser && (
        <div className="modal-overlay" onClick={() => !isDeleting && setDeletingUser(null)}>
          <div className="modal cyberpunk-modal modal-danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ CONFIRMAR ELIMINACIÓN</h2>
              <button 
                className="close-btn" 
                onClick={() => setDeletingUser(null)}
                disabled={isDeleting}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="warning-text">
                ¿Estás seguro de que deseas eliminar el usuario <strong>"{deletingUser.name} {deletingUser.lastname}"</strong>?
              </p>
              <p className="warning-subtext">
                Esta acción no se puede deshacer. Todos los datos asociados a este usuario se perderán permanentemente.
              </p>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-cyber btn-secondary"
                onClick={() => setDeletingUser(null)} 
                disabled={isDeleting}
              >
                CANCELAR
              </button>
              <button 
                type="button" 
                className="btn-cyber btn-danger"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner"></span>
                    ELIMINANDO...
                  </>
                ) : (
                  '🗑️ ELIMINAR'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Creación */}
      {creatingUser && (
        <div className="modal-overlay" onClick={() => !isCreating && setCreatingUser(false)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👤 CREAR USUARIO</h2>
              <button 
                className="close-btn" 
                onClick={() => setCreatingUser(false)}
                disabled={isCreating}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateFormSubmit}>
              <div className="form-group">
                <label className="cyber-label">NOMBRE</label>
                <input
                  type="text"
                  name="name"
                  className="cyber-input"
                  value={createForm.name}
                  onChange={handleCreateFormChange}
                  required
                  disabled={isCreating}
                  placeholder="Nombre del usuario"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">APELLIDO</label>
                <input
                  type="text"
                  name="lastname"
                  className="cyber-input"
                  value={createForm.lastname}
                  onChange={handleCreateFormChange}
                  required
                  disabled={isCreating}
                  placeholder="Apellido del usuario"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  className="cyber-input"
                  value={createForm.email}
                  onChange={handleCreateFormChange}
                  required
                  disabled={isCreating}
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">CONTRASEÑA</label>
                <input
                  type="password"
                  name="password"
                  className="cyber-input"
                  value={createForm.password}
                  onChange={handleCreateFormChange}
                  required
                  disabled={isCreating}
                  placeholder="Contraseña segura"
                  minLength={8}
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">ROL</label>
                <select
                  name="role"
                  className="cyber-select"
                  value={createForm.role}
                  onChange={handleCreateFormChange}
                  disabled={isCreating}
                >
                  <option value="user">👤 Usuario</option>
                  <option value="moderator">🛡️ Moderador</option>
                  <option value="admin">👑 Administrador</option>
                </select>
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cyber btn-secondary"
                  onClick={() => setCreatingUser(false)} 
                  disabled={isCreating}
                >
                  CANCELAR
                </button>
                <button 
                  type="submit" 
                  className="btn-cyber btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <span className="spinner"></span>
                      CREANDO...
                    </>
                  ) : (
                    '👤 CREAR USUARIO'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};