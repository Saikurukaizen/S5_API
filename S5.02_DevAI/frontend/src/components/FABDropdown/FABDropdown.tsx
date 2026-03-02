import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FABDropdown.css';

interface FABDropdownProps {
  className?: string;
}

const FABDropdown: React.FC<FABDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  const options = [
    {
      id: 'users',
      label: 'Crear Usuario',
      icon: '👥',
      path: '/users',
      description: 'Añadir nuevo miembro'
    },
    {
      id: 'disciplines',
      label: 'Crear Disciplina',
      icon: '🏃',
      path: '/disciplines',
      description: 'Nueva actividad deportiva'
    },
    {
      id: 'communities',
      label: 'Crear Comunidad',
      icon: '🏛️',
      path: '/communities',
      description: 'Formar nuevo grupo'
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFABClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className={`fab-container ${className}`}>
      {/* Dropdown Menu */}
      {isOpen && (
        <div ref={dropdownRef} className="fab-dropdown">
          <div className="dropdown-header">
            <span className="dropdown-title">¿Qué quieres crear?</span>
            <div className="dropdown-scan-line"></div>
          </div>
          
          <div className="dropdown-options">
            {options.map((option) => (
              <button
                key={option.id}
                className="dropdown-option"
                onClick={() => handleOptionClick(option.path)}
                title={option.description}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-content">
                  <span className="option-label">{option.label}</span>
                  <span className="option-description">{option.description}</span>
                </div>
                <div className="option-arrow">→</div>
                <div className="option-glow"></div>
              </button>
            ))}
          </div>
          
          <div className="dropdown-footer">
            <div className="footer-grid"></div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button 
        ref={fabRef}
        className={`fab ${isOpen ? 'fab-open' : ''}`}
        title="Crear nuevo elemento"
        onClick={handleFABClick}
      >
        <span className="fab-icon">+</span>
        <div className="fab-pulse"></div>
      </button>
    </div>
  );
};

export default FABDropdown;