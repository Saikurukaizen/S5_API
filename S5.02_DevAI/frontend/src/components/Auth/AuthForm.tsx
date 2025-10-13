import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginRequest, RegisterRequest } from '../api/types';
import './Auth.css';

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { login, register, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLoginMode) {
        const loginData: LoginRequest = {
          email: formData.email,
          password: formData.password,
        };
        await login(loginData);
      } else {
        if (formData.password !== formData.password_confirmation) {
          setError('Passwords do not match');
          return;
        }
        
        const registerData: RegisterRequest = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        };
        await register(registerData);
      }
      
      // Success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed');
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLoginMode ? 'Sign In' : 'Sign Up'}</h2>
          <p>
            {isLoginMode 
              ? 'Welcome back to your fitness dashboard' 
              : 'Create your fitness tracking account'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
              minLength={8}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                minLength={8}
              />
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={toggleMode}
              className="toggle-mode-btn"
            >
              {isLoginMode ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Demo credentials for testing */}
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@fitbit.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};