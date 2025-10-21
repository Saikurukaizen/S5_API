
// src/components/CommunitiesList/CommunitiesList.tsx
import React, { useState, useEffect } from 'react';
import './CommunitiesList.css';
import { DataList } from '../DataList/DataList';
import { communitiesApi } from '../../api/communities';
import { disciplineService } from '../../api/disciplines';
import { useRole } from '../../hooks/useRole';
import type { Community } from '../../types/Community';
import type { Column } from '../DataList/DataList';

export const CommunitiesList: React.FC = () => {
  const { permissions } = useRole();
  const [refreshKey, setRefreshKey] = useState(0);
  const [disciplines, setDisciplines] = useState<Array<{ id: number; name: string }>>([]);
  const [editingCommunity, setEditingCommunity] = useState<null | { id: number; name: string; description?: string; discipline_id: number }>(null);
  const [deletingCommunity, setDeletingCommunity] = useState<null | { id: number; name: string }>(null);
  const [editForm, setEditForm] = useState<{ name: string; description: string; discipline_id: number | undefined }>({ name: '', description: '', discipline_id: undefined });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    disciplineService.getAllDisciplines().then((res) => {
      setDisciplines(res.data);
    });
  }, []);

  const fetchCommunities = async (params?: any) => {
    const response = await communitiesApi.getAll(params);
    // Si tu API devuelve meta y links, inclúyelos aquí
    return {
      data: response.data,
      meta: (response as any).meta || {},
      links: (response as any).links || {},
    };
  };

  const handleEditCommunity = (community: { id: number; name: string; description?: string; discipline_id: number }) => {
    setEditingCommunity(community);
    setEditForm({
      name: community.name,
      description: community.description || '',
      discipline_id: community.discipline_id ?? undefined,
    });
    setError(null);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: name === 'discipline_id' ? Number(value) : value });
  };

  const handleEditFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommunity) return;
    setIsSaving(true);
    setError(null);
    try {
      await communitiesApi.update(editingCommunity.id, {
        name: editForm.name,
        description: editForm.description,
        discipline_id: editForm.discipline_id,
      });
      setEditingCommunity(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = (community: { id: number; name: string }) => {
    setDeletingCommunity(community);
    setError(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingCommunity) return;
    setIsDeleting(true);
    setError(null);
    try {
      await communitiesApi.delete(deletingCommunity.id);
      setDeletingCommunity(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar la comunidad');
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: Column<Community>[] = [
    { key: 'id', label: 'ID', width: '80px', sortable: true },
    { key: 'name', label: 'NOMBRE', sortable: true },
    { key: 'description', label: 'DESCRIPCIÓN' },
    { key: 'discipline_id', label: 'DISCIPLINA', render: (community: Community) => {
      const discipline = disciplines.find((d) => d.id === community.discipline_id);
      return <span className="community-badge">{discipline ? discipline.name : 'Sin disciplina'}</span>;
    } },
    { key: 'created_at', label: 'CREADA', render: (community: Community) => new Date(community.created_at).toLocaleDateString('es-ES'), sortable: true, width: '150px' },
    { key: 'updated_at', label: 'ACTUALIZADA', render: (community: Community) => new Date(community.updated_at).toLocaleDateString('es-ES'), sortable: true, width: '150px' },
  ];

  return (
    <>
      <DataList
        key={refreshKey}
        title="👥 GESTIÓN DE COMUNIDADES"
        columns={columns}
        fetchData={fetchCommunities}
  onItemEdit={permissions.canEditCommunities ? handleEditCommunity : undefined}
  onItemDelete={permissions.canDeleteCommunities ? handleDeleteClick : undefined}
  showActions={permissions.canEditCommunities || permissions.canDeleteCommunities}
        searchable={true}
        searchPlaceholder="BUSCAR COMUNIDADES..."
        itemsPerPageOptions={[10, 20, 50]}
        className="communities-list cyberpunk-list"
      />

      {/* Modal de Edición */}
      {editingCommunity && (
        <div className="modal-overlay" onClick={() => !isSaving && setEditingCommunity(null)}>
          <div className="modal-cyberpunk" onClick={(e) => e.stopPropagation()}>
            <h2>✏️ EDITAR COMUNIDAD</h2>
            <form onSubmit={handleEditFormSubmit}>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditFormChange}
                required
                placeholder="Nombre de la comunidad"
                disabled={isSaving}
                className="cyber-input"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditFormChange}
                disabled={isSaving}
                placeholder="Descripción..."
                rows={3}
                className="cyber-textarea"
              />
              <select
                name="discipline_id"
                value={editForm.discipline_id}
                onChange={handleEditFormChange}
                disabled={isSaving}
                required
                className="cyber-select"
              >
                <option value="">Selecciona disciplina</option>
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {error && <div className="error-message">⚠️ {error}</div>}
              <div className="modal-actions">
                <button type="button" className="btn-cyber btn-secondary" onClick={() => setEditingCommunity(null)} disabled={isSaving}>CANCELAR</button>
                <button type="submit" className="btn-cyber btn-primary" disabled={isSaving}>{isSaving ? 'GUARDANDO...' : '💾 GUARDAR'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deletingCommunity && (
        <div className="modal-overlay" onClick={() => !isDeleting && setDeletingCommunity(null)}>
          <div className="modal-cyberpunk modal-danger" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ CONFIRMAR ELIMINACIÓN</h2>
            <p>¿Seguro que deseas eliminar la comunidad <strong>{deletingCommunity.name}</strong>?</p>
            {error && <div className="error-message">⚠️ {error}</div>}
            <div className="modal-actions">
              <button type="button" className="btn-cyber btn-secondary" onClick={() => setDeletingCommunity(null)} disabled={isDeleting}>CANCELAR</button>
              <button type="button" className="btn-cyber btn-danger" onClick={handleConfirmDelete} disabled={isDeleting}>{isDeleting ? 'ELIMINANDO...' : '🗑️ ELIMINAR'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
