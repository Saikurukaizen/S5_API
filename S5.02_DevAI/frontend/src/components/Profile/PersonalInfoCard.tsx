import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './PersonalInfoCard.css';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  location: string;
}

export const PersonalInfoCard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>({
    name: user?.name || 'Marc Sanchez',
    email: user?.email || 'doom@user.com',
    phone: '+34 612 345 678',
    birthDate: '1995-06-15',
    location: 'Barcelona, España'
  });
  const [originalData, setOriginalData] = useState<PersonalInfo>({ ...formData });

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
      // TODO: Implement API call to update user profile
      console.log('Updating profile:', formData);
      
      // Update user context if name or email changed
      if (user && (formData.name !== user.name || formData.email !== user.email)) {
        updateUser({
          ...user,
          name: formData.name,
          email: formData.email
        });
      }
      
      // Update original data and exit edit mode
      setOriginalData({ ...formData });
      setIsEditing(false);
      
      // TODO: Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
      // TODO: Show error message
    }
  };

  return (
    <div className="card personal-info-card">
      <div className="card-header">
        <h3 className="section-title">📝 INFORMACIÓN PERSONAL</h3>
        <button className="btn btn-sm edit-btn" onClick={toggleEdit}>
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="btn-group save-buttons">
            <button 
              type="button" 
              className="btn cancel-btn" 
              onClick={toggleEdit}
            >
              CANCELAR
            </button>
            <button 
              type="submit" 
              className="btn btn-pink save-btn"
            >
              💾 GUARDAR CAMBIOS
            </button>
          </div>
        )}
      </form>
    </div>
  );
};