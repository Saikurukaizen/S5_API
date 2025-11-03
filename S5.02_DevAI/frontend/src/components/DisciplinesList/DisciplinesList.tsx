// DisciplinesList.tsx - Cyberpunk Style Fitbit
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisciplinesList.css';
import { DataList } from '../DataList/DataList';
import { disciplineService } from '../../api';
import { Discipline, PaginationParams, PaginatedResponse } from '../../api/types';
import { useRole } from '../../hooks/useRole';

export const DisciplinesList: React.FC = () => {
  const { permissions } = useRole();
  const navigate = useNavigate();
  const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null);
  const [deletingDiscipline, setDeletingDiscipline] = useState<Discipline | null>(null);
  const [creatingDiscipline, setCreatingDiscipline] = useState(false);
  const [editForm, setEditForm] = useState<{ name: string; description: string }>({ 
    name: '', 
    description: '' 
  });
  const [createForm, setCreateForm] = useState<{ name: string; description: string }>({ 
    name: '', 
    description: '' 
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchDisciplines = async (params: PaginationParams): Promise<PaginatedResponse<Discipline>> => {
    return await disciplineService.getDisciplines(params);
  };

  const handleEditDiscipline = (discipline: Discipline) => {
    setEditingDiscipline(discipline);
    setEditForm({ 
      name: discipline.name, 
      description: discipline.description || '' 
    });
    setError(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDiscipline) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await disciplineService.updateDiscipline(Number(editingDiscipline.id), {
        name: editForm.name,
        description: editForm.description,
      });
      
      setEditingDiscipline(null);
      setRefreshKey(prev => prev + 1); // Trigger refresh
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateClick = () => {
    setCreatingDiscipline(true);
    setCreateForm({ 
      name: '', 
      description: '' 
    });
    setError(null);
  };

  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value });
  };

  const handleCreateFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsCreating(true);
    setError(null);
    
    try {
      await disciplineService.createDiscipline({
        name: createForm.name,
        description: createForm.description,
      });
      
      setCreatingDiscipline(false);
      setRefreshKey(prev => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la disciplina');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteClick = (discipline: Discipline) => {
    setDeletingDiscipline(discipline);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingDiscipline) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await disciplineService.deleteDiscipline(Number(deletingDiscipline.id));
      setDeletingDiscipline(null);
      setRefreshKey(prev => prev + 1); // Trigger refresh
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar la disciplina');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    navigate(`/disciplines/${discipline.id}`);
  };

  const columns = [
    {
      key: 'id' as keyof Discipline,
      label: 'ID',
      width: '80px',
      sortable: true,
    },
    {
      key: 'name' as keyof Discipline,
      label: 'NOMBRE',
      sortable: true,
      render: (name: string) => (
        <span className="discipline-name">{name}</span>
      ),
    },
    {
      key: 'description' as keyof Discipline,
      label: 'DESCRIPCIÓN',
      render: (description: string | null) => (
        <div className="description-cell">
          {description || 'Sin descripción'}
        </div>
      ),
    },
    {
      key: 'created_at' as keyof Discipline,
      label: 'CREADA',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
    {
      key: 'updated_at' as keyof Discipline,
      label: 'ACTUALIZADA',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
  ];

  return (
    <>
      <div className="list-header">
        <h1 className="page-title">🏃 GESTIÓN DE DISCIPLINAS</h1>
        {permissions.canEditDisciplines && (
          <button 
            className="btn-cyber create-btn"
            onClick={handleCreateClick}
          >
            <span className="btn-icon">🏃</span>
            CREAR DISCIPLINA
          </button>
        )}
      </div>

      <DataList
        key={refreshKey}
        title=""
        columns={columns}
        fetchData={fetchDisciplines}
        onItemClick={handleDisciplineClick}
        onItemEdit={permissions.canEditDisciplines ? handleEditDiscipline : undefined}
        onItemDelete={permissions.canDeleteDisciplines ? handleDeleteClick : undefined}
        showActions={permissions.canEditDisciplines || permissions.canDeleteDisciplines}
        searchable={true}
        searchPlaceholder="BUSCAR DISCIPLINAS..."
        itemsPerPageOptions={[10, 20, 50]}
        className="disciplines-list cyberpunk-list"
      />

      {/* Modal de Edición */}
      {editingDiscipline && (
        <div className="modal-overlay" onClick={() => !isSaving && setEditingDiscipline(null)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ EDITAR DISCIPLINA</h2>
              <button 
                className="close-btn" 
                onClick={() => setEditingDiscipline(null)}
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
                  placeholder="Nombre de la disciplina"
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

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cyber btn-secondary"
                  onClick={() => setEditingDiscipline(null)} 
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
      {deletingDiscipline && (
        <div className="modal-overlay" onClick={() => !isDeleting && setDeletingDiscipline(null)}>
          <div className="modal cyberpunk-modal modal-danger" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⚠️ CONFIRMAR ELIMINACIÓN</h2>
              <button 
                className="close-btn" 
                onClick={() => setDeletingDiscipline(null)}
                disabled={isDeleting}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="warning-text">
                ¿Estás seguro de que deseas eliminar la disciplina <strong>"{deletingDiscipline.name}"</strong>?
              </p>
              <p className="warning-subtext">
                Esta acción no se puede deshacer. Todas las comunidades asociadas a esta disciplina pueden verse afectadas.
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
                onClick={() => setDeletingDiscipline(null)} 
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
      {creatingDiscipline && (
        <div className="modal-overlay" onClick={() => !isCreating && setCreatingDiscipline(false)}>
          <div className="modal cyberpunk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🏃 CREAR DISCIPLINA</h2>
              <button 
                className="close-btn" 
                onClick={() => setCreatingDiscipline(false)}
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
                  placeholder="Nombre de la disciplina"
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
                  placeholder="Descripción de la disciplina..."
                  rows={4}
                />
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
                  onClick={() => setCreatingDiscipline(false)} 
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
                    '🏃 CREAR DISCIPLINA'
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