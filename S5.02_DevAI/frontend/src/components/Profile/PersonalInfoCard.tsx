import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useProfile, useUpdateProfile, UpdateProfileData } from '../../hooks/useProfile';
import './PersonalInfoCard.css';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  location: string;
}

export const PersonalInfoCard: React.FC = () => {
  const { user } = useAuth();
  const { data: profileResponse, isLoading, isError } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    location: ''
  });
  const [originalData, setOriginalData] = useState<PersonalInfo>({ ...formData });

  // Update form data when profile data is loaded
  useEffect(() => {
    if (profileResponse?.data) {
      const profile = profileResponse.data;
      const newData: PersonalInfo = {
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        birthDate: profile.birth_date || '',
        location: profile.location || ''
      };
      setFormData(newData);
      setOriginalData(newData);
    } else if (user) {
      // Fallback to user context data
      const fallbackData: PersonalInfo = {
        name: user.name || '',
        email: user.email || '',
        phone: '',
        birthDate: '',
        location: ''
      };
      setFormData(fallbackData);
      setOriginalData(fallbackData);
    }
  }, [profileResponse, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Cancel editing - restore original data
      setFormData({ ...originalData });
    } else {
      // Start editing - save current data as original
      setOriginalData({ ...formData });
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const updateData: UpdateProfileData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        birth_date: formData.birthDate || undefined,
        location: formData.location || undefined,
      };

      await updateProfileMutation.mutateAsync(updateData);
      
      // Update original data and exit edit mode
      setOriginalData({ ...formData });
      setIsEditing(false);
      
      // TODO: Show success message
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      // TODO: Show error message
    }
  };

  if (isLoading) {
    return (
      <div className="card personal-info-card">
        <div className="card-header">
          <h3 className="section-title">📝 INFORMACIÓN PERSONAL</h3>
        </div>
        <div className="loading-state">
          <div className="loading-spinner">⏳</div>
          <p>Cargando información del perfil...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card personal-info-card">
        <div className="card-header">
          <h3 className="section-title">📝 INFORMACIÓN PERSONAL</h3>
        </div>
        <div className="error-state">
          <div className="error-icon">❌</div>
          <p>Error al cargar la información del perfil</p>
          <button className="btn btn-sm" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card personal-info-card">
      <div className="card-header">
        <h3 className="section-title">📝 INFORMACIÓN PERSONAL</h3>
        <button className="btn btn-sm edit-btn" onClick={toggleEdit} disabled={updateProfileMutation.isPending}>
          <span>{isEditing ? '❌ CANCELAR' : '✏️ EDITAR'}</span>
        </button>
      </div>

      <form className={`profile-form ${isEditing ? 'edit-mode' : ''}`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">NOMBRE COMPLETO</label>
          <input 
            type="text" 
            name="name"
            className="form-input" 
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing || updateProfileMutation.isPending}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">EMAIL</label>
          <input 
            type="email" 
            name="email"
            className="form-input" 
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing || updateProfileMutation.isPending}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">TELÉFONO</label>
          <input 
            type="tel" 
            name="phone"
            className="form-input" 
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing || updateProfileMutation.isPending}
            placeholder="Opcional"
          />
        </div>

        <div className="form-group">
          <label className="form-label">FECHA DE NACIMIENTO</label>
          <input 
            type="date" 
            name="birthDate"
            className="form-input" 
            value={formData.birthDate}
            onChange={handleInputChange}
            disabled={!isEditing || updateProfileMutation.isPending}
          />
        </div>

        <div className="form-group">
          <label className="form-label">UBICACIÓN</label>
          <input 
            type="text" 
            name="location"
            className="form-input" 
            value={formData.location}
            onChange={handleInputChange}
            disabled={!isEditing || updateProfileMutation.isPending}
            placeholder="Ciudad, País"
          />
        </div>

        {isEditing && (
          <div className="btn-group save-buttons">
            <button 
              type="button" 
              className="btn cancel-btn" 
              onClick={toggleEdit}
              disabled={updateProfileMutation.isPending}
            >
              CANCELAR
            </button>
            <button 
              type="submit" 
              className="btn btn-pink save-btn"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? '⏳ GUARDANDO...' : '💾 GUARDAR CAMBIOS'}
            </button>
          </div>
        )}
      </form>

      {updateProfileMutation.isError && (
        <div className="error-message">
          <span className="error-icon">❌</span>
          <span>Error al actualizar el perfil. Inténtalo de nuevo.</span>
        </div>
      )}
    </div>
  );
};