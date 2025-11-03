import React from 'react';

const UserStats: React.FC = () => {
  return (
    <div className="user-stats">
      <div className="page-header">
        <h1>Estadísticas de Usuarios</h1>
        <p>Análisis y métricas de usuarios del sistema</p>
      </div>
      
      <div className="content">
        <p>Estadísticas de usuarios - Frontend RESTful</p>
        <p>Endpoints disponibles:</p>
        <ul>
          <li>GET /api/v1/stats/users</li>
          <li>GET /api/v1/stats/users/ranking</li>
          <li>GET /api/v1/stats/users/percentage</li>
          <li>GET /api/v1/stats/users/summary</li>
        </ul>
        <p>Permisos: can:viewStats</p>
      </div>
    </div>
  );
};

export default UserStats;