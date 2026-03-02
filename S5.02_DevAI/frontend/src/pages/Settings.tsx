// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import './Settings.css';

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    community_updates: boolean;
    activity_reminders: boolean;
  };
  privacy: {
    profile_visibility: 'public' | 'friends' | 'private';
    activity_visibility: 'public' | 'friends' | 'private';
    allow_friend_requests: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    date_format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  };
  security: {
    two_factor_enabled: boolean;
    login_alerts: boolean;
    session_timeout: number;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'notifications' | 'privacy' | 'preferences' | 'security'>('notifications');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    
    try {
      // Datos mockeados para Settings
      const mockSettings: UserSettings = {
        notifications: {
          email: true,
          push: true,
          community_updates: true,
          activity_reminders: false
        },
        privacy: {
          profile_visibility: 'public',
          activity_visibility: 'friends',
          allow_friend_requests: true
        },
        preferences: {
          theme: 'dark',
          language: 'es',
          timezone: 'Europe/Madrid',
          date_format: 'DD/MM/YYYY'
        },
        security: {
          two_factor_enabled: false,
          login_alerts: true,
          session_timeout: 30
        }
      };

      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setSettings(mockSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      // Aquí iría la llamada real a la API
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (section: keyof UserSettings, key: string, value: any) => {
    if (!settings) return;
    
    setSettings(prev => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-loading">
          <div className="cyber-spinner"></div>
          <p>CARGANDO CONFIGURACIÓN...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="settings-page">
        <div className="settings-error">
          <p>Error al cargar la configuración</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <h1 className="page-title">
          ⚙️ CONFIGURACIÓN
        </h1>
        <p className="page-subtitle">Personaliza tu experiencia en la plataforma</p>
      </div>

      <div className="settings-content">
        {/* Navigation */}
        <div className="settings-nav">
          <button
            className={`nav-btn ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <span className="nav-icon">🔔</span>
            <span>Notificaciones</span>
          </button>
          <button
            className={`nav-btn ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveSection('privacy')}
          >
            <span className="nav-icon">🔒</span>
            <span>Privacidad</span>
          </button>
          <button
            className={`nav-btn ${activeSection === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveSection('preferences')}
          >
            <span className="nav-icon">🎨</span>
            <span>Preferencias</span>
          </button>
          <button
            className={`nav-btn ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <span className="nav-icon">🛡️</span>
            <span>Seguridad</span>
          </button>
        </div>

        {/* Settings Panel */}
        <div className="settings-panel">
          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>🔔 Notificaciones</h2>
                <p>Controla cómo y cuándo recibir notificaciones</p>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Notificaciones por Email</h3>
                    <p>Recibir notificaciones importantes por correo electrónico</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={(e) => updateSettings('notifications', 'email', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Notificaciones Push</h3>
                    <p>Recibir notificaciones en tiempo real en el navegador</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={(e) => updateSettings('notifications', 'push', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Actualizaciones de Comunidad</h3>
                    <p>Notificaciones sobre nuevos posts y actividades en tus comunidades</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.community_updates}
                        onChange={(e) => updateSettings('notifications', 'community_updates', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Recordatorios de Actividad</h3>
                    <p>Recordatorios para mantener tu actividad y objetivos</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.activity_reminders}
                        onChange={(e) => updateSettings('notifications', 'activity_reminders', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Section */}
          {activeSection === 'privacy' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>🔒 Privacidad</h2>
                <p>Controla quién puede ver tu información y actividad</p>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Visibilidad del Perfil</h3>
                    <p>Controla quién puede ver tu perfil completo</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.privacy.profile_visibility}
                      onChange={(e) => updateSettings('privacy', 'profile_visibility', e.target.value)}
                      className="select-control"
                    >
                      <option value="public">Público</option>
                      <option value="friends">Solo Amigos</option>
                      <option value="private">Privado</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Visibilidad de Actividad</h3>
                    <p>Controla quién puede ver tu actividad y estadísticas</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.privacy.activity_visibility}
                      onChange={(e) => updateSettings('privacy', 'activity_visibility', e.target.value)}
                      className="select-control"
                    >
                      <option value="public">Público</option>
                      <option value="friends">Solo Amigos</option>
                      <option value="private">Privado</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Permitir Solicitudes de Amistad</h3>
                    <p>Permite que otros usuarios te envíen solicitudes de amistad</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.privacy.allow_friend_requests}
                        onChange={(e) => updateSettings('privacy', 'allow_friend_requests', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>🎨 Preferencias</h2>
                <p>Personaliza la apariencia y comportamiento de la aplicación</p>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Tema</h3>
                    <p>Elige entre tema claro, oscuro o automático</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.preferences.theme}
                      onChange={(e) => updateSettings('preferences', 'theme', e.target.value)}
                      className="select-control"
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Oscuro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Idioma</h3>
                    <p>Selecciona tu idioma preferido</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.preferences.language}
                      onChange={(e) => updateSettings('preferences', 'language', e.target.value)}
                      className="select-control"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Zona Horaria</h3>
                    <p>Tu zona horaria para mostrar fechas y horas correctamente</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.preferences.timezone}
                      onChange={(e) => updateSettings('preferences', 'timezone', e.target.value)}
                      className="select-control"
                    >
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Formato de Fecha</h3>
                    <p>Cómo prefieres que se muestren las fechas</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.preferences.date_format}
                      onChange={(e) => updateSettings('preferences', 'date_format', e.target.value)}
                      className="select-control"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="settings-section">
              <div className="section-header">
                <h2>🛡️ Seguridad</h2>
                <p>Configura las opciones de seguridad de tu cuenta</p>
              </div>

              <div className="settings-grid">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Autenticación de Dos Factores</h3>
                    <p>Añade una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.two_factor_enabled}
                        onChange={(e) => updateSettings('security', 'two_factor_enabled', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Alertas de Inicio de Sesión</h3>
                    <p>Recibir notificaciones cuando alguien acceda a tu cuenta</p>
                  </div>
                  <div className="setting-control">
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.login_alerts}
                        onChange={(e) => updateSettings('security', 'login_alerts', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Tiempo de Sesión</h3>
                    <p>Minutos de inactividad antes de cerrar sesión automáticamente</p>
                  </div>
                  <div className="setting-control">
                    <select
                      value={settings.security.session_timeout}
                      onChange={(e) => updateSettings('security', 'session_timeout', parseInt(e.target.value))}
                      className="select-control"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item danger">
                  <div className="setting-info">
                    <h3>Cambiar Contraseña</h3>
                    <p>Actualiza tu contraseña regularmente por seguridad</p>
                  </div>
                  <div className="setting-control">
                    <button className="action-btn danger">
                      Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          {hasChanges && (
            <div className="save-section">
              <button
                className={`save-btn ${saving ? 'saving' : ''}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <div className="mini-spinner"></div>
                    GUARDANDO...
                  </>
                ) : (
                  'GUARDAR CAMBIOS'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

