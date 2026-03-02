import React from 'react';

const UserCreate: React.FC = () => {
  return (
    <div className="user-create">
      <div className="page-header">
        <h1>Crear Nuevo Usuario</h1>
        <p>Formulario para crear un nuevo usuario del sistema</p>
      </div>
      
      <div className="content">
        <p>Crear usuario - Frontend RESTful</p>
        <p>Endpoint: POST /api/v1/users</p>
        <p>Permisos: can:createUser</p>
      </div>
    </div>
  );
};

export default UserCreate;