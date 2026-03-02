import React from 'react';

const DisciplineCreate: React.FC = () => {
  return (
    <div className="discipline-create">
      <div className="page-header">
        <h1>Crear Nueva Disciplina</h1>
        <p>Formulario para crear una nueva disciplina deportiva</p>
      </div>
      
      <div className="content">
        <p>Crear disciplina - Frontend RESTful</p>
        <p>Endpoint: POST /api/v1/disciplines</p>
        <p>Permisos: can:manage-disciplines</p>
      </div>
    </div>
  );
};

export default DisciplineCreate;