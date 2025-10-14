import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      // Navigation will be handled by ProtectedRoute in App.tsx
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.response?.data?.message || 'Error de autenticación. Verifica tus credenciales.');
    }
  };

  return (
    <div className="auth-form">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">EMAIL ADDRESS</label>
          <input 
            type="email" 
            name="email"
            className="form-input" 
            placeholder="user@cybernet.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="form-label">PASSWORD</label>
          <input 
            type="password" 
            name="password"
            className="form-input" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className={`form-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '⚡ CONECTANDO...' : '🚀 INICIAR SESIÓN'}
        </button>
      </form>

      <div className="demo-credentials">
        <h4>💡 CREDENCIALES DEMO</h4>
        <p><strong>User:</strong> doom@user.com / 666</p>
        <p><strong>Admin:</strong> lux@admin.com / 8000</p>
      </div>
    </div>
  );
};

export default LoginForm;