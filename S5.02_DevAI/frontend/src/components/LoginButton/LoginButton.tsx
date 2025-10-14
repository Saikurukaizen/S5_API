import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthForm } from '../Auth/AuthForm';
import './LoginButton.css';

const LoginButton: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null; // No mostrar si ya está autenticado
  }

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <button 
        className="login-button"
        onClick={handleLoginClick}
        aria-label="Iniciar sesión"
      >
        <span className="login-icon">👤</span>
        <span className="login-text">Iniciar sesión</span>
      </button>

      {showLoginModal && (
        <div className="login-modal-overlay" onClick={handleCloseModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Bienvenido a FitBit</h2>
              <button 
                className="close-button"
                onClick={handleCloseModal}
                aria-label="Cerrar"
              >
                ×
              </button>
            </div>
            <div className="login-modal-content">
              <AuthForm onSuccess={handleCloseModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;