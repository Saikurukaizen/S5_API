import React from 'react';
import { DataList } from '../DataList/DataList';
import { disciplineService } from '../../api';
import { Discipline, PaginationParams, PaginatedResponse } from '../../api/types';
import { useRole } from '../../hooks/useRole';

export const DisciplinesList: React.FC = () => {
  const { permissions } = useRole();

  const fetchDisciplines = async (params: PaginationParams): Promise<PaginatedResponse<Discipline>> => {
    return await disciplineService.getDisciplines(params);
  };

  const handleEditDiscipline = (discipline: Discipline) => {
    console.log('Edit discipline:', discipline);
    // Implementar lógica de edición
  };

  const handleDeleteDiscipline = (discipline: Discipline) => {
    console.log('Delete discipline:', discipline);
    // Implementar lógica de eliminación
  };

  const handleDisciplineClick = (discipline: Discipline) => {
    console.log('Discipline clicked:', discipline);
    // Navegar a detalles de disciplina
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
      label: 'Nombre',
      sortable: true,
    },
    {
      key: 'description' as keyof Discipline,
      label: 'Descripción',
      render: (description: string | null) => (
        <div className="description-cell">
          {description || 'Sin descripción'}
        </div>
      ),
    },
    {
      key: 'created_at' as keyof Discipline,
      label: 'Fecha de Creación',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
    {
      key: 'updated_at' as keyof Discipline,
      label: 'Última Actualización',
      render: (date: string) => new Date(date).toLocaleDateString('es-ES'),
      sortable: true,
      width: '150px',
    },
  ];

  return (
    <DataList
      title="Gestión de Disciplinas"
      columns={columns}
      fetchData={fetchDisciplines}
      onItemClick={handleDisciplineClick}
      onItemEdit={permissions.canEditDisciplines ? handleEditDiscipline : undefined}
      onItemDelete={permissions.canDeleteDisciplines ? handleDeleteDiscipline : undefined}
      showActions={permissions.canEditDisciplines || permissions.canDeleteDisciplines}
      searchable={true}
      searchPlaceholder="Buscar disciplinas por nombre..."
      itemsPerPageOptions={[10, 20, 50]}
      className="disciplines-list"
    />
  );
};