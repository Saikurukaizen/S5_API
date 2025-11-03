import React from 'react';

const StatsOverview: React.FC = () => {
  return (
    <div className="stats-overview">
      <div className="page-header">
        <h1>Estadísticas Generales</h1>
        <p>Panel general de estadísticas del sistema</p>
      </div>
      
      <div className="content">
        <p>Resumen de estadísticas - Frontend RESTful</p>
        <p>Permisos: can:viewStats</p>
        
        <div className="stats-links">
          <ul>
            <li>Estadísticas de Disciplinas</li>
            <li>Estadísticas de Usuarios</li>
            <li>Estadísticas de Comunidades</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;