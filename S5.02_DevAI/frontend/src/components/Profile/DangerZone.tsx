import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './DangerZone.css';

export const DangerZone: React.FC = () => {
  const { logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmMessage = '⚠️ ¿Estás seguro de que quieres eliminar tu cuenta?\n\nEsta acción no se puede deshacer y perderás:\n• Todos tus datos personales\n• Historial de actividades\n• Conexiones con comunidades\n• Progreso y estadísticas\n\n¿Continuar?';
    
    if (window.confirm(confirmMessage)) {
      // Second confirmation for critical action
      const finalConfirm = 'ÚLTIMA ADVERTENCIA: Tu cuenta será eliminada permanentemente.\n\n¿Estás ABSOLUTAMENTE seguro?';
      
      if (window.confirm(finalConfirm)) {
        setIsDeleting(true);
        
        try {
          // TODO: Implement API call to delete account
          console.log('Deleting account...');
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Logout and redirect
          await logout();
          
          // TODO: Redirect to deletion confirmation page or login
          console.log('Account deleted successfully');
          
        } catch (error) {
          console.error('Error deleting account:', error);
          setIsDeleting(false);
          
          // TODO: Show error message
          alert('Error al eliminar la cuenta. Inténtalo de nuevo.');
        }
      }
    }
  };

  return (
    <div className="card danger-zone-card">
      <h3 className="section-title danger-title">⚠️ ZONA DE PELIGRO</h3>
      
      <div className="danger-warning">
        <p className="warning-text">
          Una vez elimines tu cuenta, no hay vuelta atrás. Por favor, está seguro.
        </p>
        
        <div className="warning-details">
          <h4>Se eliminará permanentemente:</h4>
          <ul>
            <li>• Todos tus datos personales</li>
            <li>• Historial de actividades y eventos</li>
            <li>• Conexiones con comunidades</li>
            <li>• Progreso y estadísticas</li>
            <li>• Configuraciones y preferencias</li>
          </ul>
        </div>
      </div>
      
      <button 
        className={`btn btn-danger delete-account-btn ${isDeleting ? 'deleting' : ''}`}
        onClick={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? '⚡ ELIMINANDO...' : '🗑️ ELIMINAR CUENTA'}
      </button>
    </div>
  );
};