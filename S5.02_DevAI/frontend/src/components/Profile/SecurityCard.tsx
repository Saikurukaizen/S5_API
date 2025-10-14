import React, { useState } from 'react';
import './SecurityCard.css';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const SecurityCard: React.FC = () => {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return false;
    }

    if (formData.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('La nueva contraseña debe ser diferente a la actual');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement API call to change password
      console.log('Changing password...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // TODO: Show success message
      console.log('Password changed successfully');
      
    } catch (err: any) {
      console.error('Error changing password:', err);
      setError(err?.response?.data?.message || 'Error al cambiar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card security-card">
      <h3 className="section-title">🔒 SEGURIDAD</h3>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">CONTRASEÑA ACTUAL</label>
          <input 
            type="password" 
            name="currentPassword"
            className="form-input" 
            placeholder="••••••••"
            value={formData.currentPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">NUEVA CONTRASEÑA</label>
          <input 
            type="password" 
            name="newPassword"
            className="form-input" 
            placeholder="••••••••"
            value={formData.newPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">CONFIRMAR CONTRASEÑA</label>
          <input 
            type="password" 
            name="confirmPassword"
            className="form-input" 
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            disabled={isLoading}
            required
          />
        </div>

        <button 
          type="submit" 
          className={`btn change-password-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '⚡ CAMBIANDO...' : '🔑 CAMBIAR CONTRASEÑA'}
        </button>
      </form>
    </div>
  );
};