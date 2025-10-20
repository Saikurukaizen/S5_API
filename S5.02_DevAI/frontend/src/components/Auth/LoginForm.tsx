import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
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

    console.log('🔑 LoginForm: Starting login process with:', {
      email: formData.email,
      passwordLength: formData.password.length
    });

    try {
      console.log('🔑 LoginForm: Calling login function...');
      await login(formData);
      console.log('🔑 LoginForm: Login function completed successfully');
      // Redirigir manualmente al dashboard tras login exitoso
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('🔑 LoginForm: Login error:', err);
      console.log('🔑 LoginForm: Error details:', {
        status: err?.response?.status,
        message: err?.response?.data?.message,
        data: err?.response?.data
      });
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