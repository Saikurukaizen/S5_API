import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataList } from '../DataList/DataList';
import { communitiesApi } from '../../api/communities';
import { disciplineService } from '../../api';
import { Community } from '../../api/communities';
import { Discipline, PaginationParams, PaginatedResponse } from '../../api/types';
import { useRole } from '../../hooks/useRole';
import './CommunitiesList.css';

export const CommunitiesList: React.FC = () => {
  const { permissions } = useRole();
  const navigate = useNavigate();
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [deletingCommunity, setDeletingCommunity] = useState<Community | null>(null);
  const [creatingCommunity, setCreatingCommunity] = useState(false);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [editForm, setEditForm] = useState<{ 
    name: string; 
    description: string; 
    discipline_id: number | null;
  }>({ 
    name: '', 
    description: '', 
    discipline_id: null
  });
  const [createForm, setCreateForm] = useState<{ 
    name: string; 
    description: string; 
    discipline_id: number | null;
  }>({ 
    name: '', 
    description: '', 
    discipline_id: null
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load disciplines for the edit form
  useEffect(() => {
    const loadDisciplines = async () => {
      try {
        const response = await disciplineService.getDisciplines({ page: 1, per_page: 100 });
        setDisciplines(response.data);
      } catch (err) {
        console.error('Error loading disciplines:', err);
      }
    };
    loadDisciplines();
  }, []);

  const fetchCommunities = async (params: PaginationParams): Promise<PaginatedResponse<Community>> => {
    const response = await communitiesApi.getAll(params);
    return {
      data: response.data,
      meta: { 
        total: response.data.length, 
        per_page: params.per_page || 10, 
        current_page: params.page || 1, 
        last_page: 1,
        from: 1,
        to: response.data.length,
        path: '/communities'
      },
      links: {
        first: '/communities?page=1',
        last: '/communities?page=1'
      }
    };
  };

  const handleEditCommunity = (community: Community) => {
    setEditingCommunity(community);
    setEditForm({ 
      name: community.name, 
      description: community.description || '',
      discipline_id: community.discipline_id || null
    });
    setError(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm({ 
      ...editForm, 
      [name]: name === 'discipline_id' ? (value ? Number(value) : null) : value 
    });
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunity) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await communitiesApi.update(Number(editingCommunity.id), {
        name: editForm.name,
        description: editForm.description,
        discipline_id: editForm.discipline_id || undefined,
      });
      
      setEditingCommunity(null);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateClick = () => {
    setCreatingCommunity(true);
    setCreateForm({ 
      name: '', 
      description: '', 
      discipline_id: null
    });
    setError(null);
  };

  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateForm({ 
      ...createForm, 
      [name]: name === 'discipline_id' ? (value ? Number(value) : null) : value 
    });
  };

  const handleCreateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.discipline_id) {
      setError('Debe seleccionar una disciplina');
      return;
    }
    
    setIsCreating(true);
    setError(null);
    
    try {
      await communitiesApi.create({
        name: createForm.name,
        description: createForm.description,
        discipline_id: createForm.discipline_id,
      });
      
      setCreatingCommunity(false);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la comunidad');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteClick = (community: Community) => {
    setDeletingCommunity(community);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCommunity) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await communitiesApi.delete(Number(deletingCommunity.id));
      setDeletingCommunity(null);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar la comunidad');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCommunityClick = (community: Community) => {
    navigate(`/communities/${community.id}`);
  };

  const getDisciplineName = (disciplineId: number | null): string => {
    if (!disciplineId) return 'Sin disciplina';
    const discipline = disciplines.find(d => d.id === disciplineId);
    return discipline ? discipline.name : `Disciplina ${disciplineId}`;
  };

  const columns = [
    {
      key: 'id' as keyof Community,
      label: 'ID',
      width: '80px',
      sortable: true,
    },
    {
      key: 'name' as keyof Community,
      label: 'NOMBRE',
      sortable: true,
      render: (name: string) => (
        <span className="community-name">{name}</span>
      ),
    },
    {
      key: 'description' as keyof Community,
      label: 'DESCRIPCIÓN',
      render: (description: string | null) => (
        <div className="description-cell">
          {description || 'Sin descripción'}
        </div>
      ),
    },
    {
      key: 'discipline_id' as keyof Community,
      label: 'DISCIPLINA',
      render: (disciplineId: number | null) => (
        <span className="discipline-name">{getDisciplineName(disciplineId)}</span>
      ),
      sortable: true,
      width: '150px',
    },
    {
      key: 'users_count' as keyof Community,
      label: 'MIEMBROS',
      render: (count: number | undefined) => (
        <span className="members-count">{count || 0}</span>
      ),
      sortable: true,
      width: '100px',
    },
    {
      key: 'created_at' as keyof Community,
      label: 'CREADA',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
  ];

  return (
    <>
      <div className="list-header">
        <div className="list-title">
          <h1>🏛️ GESTIÓN DE COMUNIDADES</h1>
          <p>Administra las comunidades de la plataforma</p>
        </div>
        {permissions.canCreateCommunities && (
          <button 
            className="btn-cyber btn-primary create-btn"
            onClick={handleCreateClick}
          >
            ✨ CREAR COMUNIDAD
          </button>
        )}
      </div>

      <DataList
        key={refreshKey}
        title=""
        columns={columns}
        fetchData={fetchCommunities}
        onItemClick={handleCommunityClick}
        onItemEdit={permissions.canEditCommunities ? handleEditCommunity : undefined}
        onItemDelete={permissions.canDeleteCommunities ? handleDeleteClick : undefined}
        showActions={permissions.canEditCommunities || permissions.canDeleteCommunities}
        searchable={true}
        searchPlaceholder="BUSCAR COMUNIDADES..."
        itemsPerPageOptions={[10, 20, 50]}
        className="cyberpunk-list"
      />

      {/* Modal de Edición */}
      {editingCommunity && (
        <div className="modal-overlay" onClick={() => !isSaving && setEditingCommunity(null)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ EDITAR COMUNIDAD</h2>
              <button 
                className="close-btn" 
                onClick={() => setEditingCommunity(null)}
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
                  placeholder="Nombre de la comunidad"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">DESCRIPCIÓN</label>
                <textarea
                  name="description"
                  className="cyber-textarea"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  disabled={isSaving}
                  placeholder="Descripción detallada..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">DISCIPLINA</label>
                <select
                  name="discipline_id"
                  className="cyber-select"
                  value={editForm.discipline_id || ''}
                  onChange={handleEditFormChange}
                  disabled={isSaving}
                >
                  <option value="">Sin disciplina específica</option>
                  {disciplines.map(discipline => (
                    <option key={discipline.id} value={discipline.id}>
                      {discipline.name}
                    </option>
                  ))}
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
                  onClick={() => setEditingCommunity(null)} 
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

      {/* Modal de Creación */}
      {creatingCommunity && (
        <div className="modal-overlay" onClick={() => !isCreating && setCreatingCommunity(false)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✨ CREAR COMUNIDAD</h2>
              <button 
                className="close-btn" 
                onClick={() => setCreatingCommunity(false)}
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
                  placeholder="Nombre de la comunidad"
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">DESCRIPCIÓN</label>
                <textarea
                  name="description"
                  className="cyber-textarea"
                  value={createForm.description}
                  onChange={handleCreateFormChange}
                  disabled={isCreating}
                  placeholder="Descripción detallada..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label className="cyber-label">DISCIPLINA</label>
                <select
                  name="discipline_id"
                  className="cyber-select"
                  value={createForm.discipline_id || ''}
                  onChange={handleCreateFormChange}
                  disabled={isCreating}
                >
                  <option value="">Sin disciplina específica</option>
                  {disciplines.map(discipline => (
                    <option key={discipline.id} value={discipline.id}>
                      {discipline.name}
                    </option>
                  ))}
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
                  onClick={() => setCreatingCommunity(false)} 
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
                    '✨ CREAR'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deletingCommunity && (
        <div className="modal-overlay" onClick={() => !isDeleting && setDeletingCommunity(null)}>
          <div className="modal cyberpunk-modal modal-danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ CONFIRMAR ELIMINACIÓN</h2>
              <button 
                className="close-btn" 
                onClick={() => setDeletingCommunity(null)}
                disabled={isDeleting}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="warning-text">
                ¿Estás seguro de que deseas eliminar la comunidad <strong>"{deletingCommunity.name}"</strong>?
              </p>
              <p className="warning-subtext">
                Esta acción no se puede deshacer. Todos los miembros y datos asociados a esta comunidad se verán afectados.
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
                onClick={() => setDeletingCommunity(null)} 
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
    </>
  );
};