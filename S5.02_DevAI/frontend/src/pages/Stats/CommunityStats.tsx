import React from 'react';

const CommunityStats: React.FC = () => {
  return (
    <div className="community-stats">
      <div className="page-header">
        <h1>Estadísticas de Comunidades</h1>
        <p>Análisis y métricas de comunidades deportivas</p>
      </div>
      
      <div className="content">
        <p>Estadísticas de comunidades - Frontend RESTful</p>
        <p>Endpoints disponibles:</p>
        <ul>
          <li>GET /api/v1/stats/communities</li>
          <li>GET /api/v1/stats/communities/ranking</li>
          <li>GET /api/v1/stats/communities/percentage</li>
          <li>GET /api/v1/stats/communities/summary</li>
          <li>GET /api/v1/stats/communities/by-discipline</li>
        </ul>
        <p>Permisos: can:viewStats</p>
      </div>
    </div>
  );
};

export default CommunityStats;