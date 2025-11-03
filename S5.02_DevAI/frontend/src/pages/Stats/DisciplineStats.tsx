import React from 'react';

const DisciplineStats: React.FC = () => {
  return (
    <div className="discipline-stats">
      <div className="page-header">
        <h1>Estadísticas de Disciplinas</h1>
        <p>Análisis y métricas de disciplinas deportivas</p>
      </div>
      
      <div className="content">
        <p>Estadísticas de disciplinas - Frontend RESTful</p>
        <p>Endpoints disponibles:</p>
        <ul>
          <li>GET /api/v1/stats/disciplines</li>
          <li>GET /api/v1/stats/disciplines/ranking</li>
          <li>GET /api/v1/stats/disciplines/percentage</li>
          <li>GET /api/v1/stats/disciplines/summary</li>
        </ul>
        <p>Permisos: can:viewStats</p>
      </div>
    </div>
  );
};

export default DisciplineStats;