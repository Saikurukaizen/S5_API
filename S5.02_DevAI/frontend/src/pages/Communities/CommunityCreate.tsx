import React from 'react';

const CommunityCreate: React.FC = () => {
  return (
    <div className="community-create">
      <div className="page-header">
        <h1>Crear Nueva Comunidad</h1>
        <p>Formulario para crear una nueva comunidad deportiva</p>
      </div>
      
      <div className="content">
        <p>Crear comunidad - Frontend RESTful</p>
        <p>Endpoint: POST /api/v1/communities</p>
        <p>Permisos: can:manage-communities</p>
      </div>
    </div>
  );
};

export default CommunityCreate;