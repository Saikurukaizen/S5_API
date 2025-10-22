import React, { useState } from 'react';
import { useDisciplines } from '../../hooks/useDisciplines';
import { useAuth } from '../../contexts/AuthContext';
import './AuthForms.css';

interface RegisterFormData {
  bank_acc?: string;
  name: string;
  lastname: string;
  date_of_birth: string;
  email: string;
  password: string;
  confirmPassword: string;
  discipline_id?: number;
}

export const RegisterForm: React.FC = () => {
  const { data: disciplinesData } = useDisciplines();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
  bank_acc: '',
    name: '',
    lastname: '',
    date_of_birth: '',
    email: '',
    password: '',
    confirmPassword: '',
    discipline_id: undefined
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'discipline_id' ? (value ? Number(value) : undefined) : value
    }));
    // Clear error cuando el usuario escribe o selecciona
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');

    try {
      const registerData = {
        name: formData.name,
        lastname: formData.lastname,
        date_of_birth: formData.date_of_birth,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        discipline_id: formData.discipline_id
      };
      await register(registerData);
      // Navigation will be handled by ProtectedRoute in App.tsx
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err?.response?.data?.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
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
          <label className="form-label">NOMBRE</label>
          <input 
            type="text" 
            name="name"
            className="form-input" 
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">APELLIDO</label>
          <input 
            type="text" 
            name="lastname"
            className="form-input" 
            placeholder="Apellido"
            value={formData.lastname}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">FECHA DE NACIMIENTO</label>
          <input 
            type="date" 
            name="date_of_birth"
            className="form-input" 
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">EMAIL</label>
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
          <label className="form-label">CUENTA BANCARIA (opcional)</label>
          <input 
            type="text" 
            name="bank_acc"
            className="form-input" 
            placeholder="Cuenta bancaria"
            value={formData.bank_acc}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label className="form-label">DISCIPLINA (opcional)</label>
          <select
            name="discipline_id"
            className="form-input"
            value={formData.discipline_id || ''}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Selecciona una disciplina</option>
            {disciplinesData?.data?.map((discipline: any) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">CONTRASEÑA</label>
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
        <div className="form-group">
          <label className="form-label">CONFIRMAR CONTRASEÑA</label>
          <input 
            type="password" 
            name="confirmPassword"
            className="form-input" 
            placeholder="••••••••"
            value={formData.confirmPassword}
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
          {isLoading ? '⚡ CREANDO...' : '✨ CREAR CUENTA'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;