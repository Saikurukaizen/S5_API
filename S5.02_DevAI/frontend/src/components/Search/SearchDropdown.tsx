import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../../hooks/useSearch';
import './SearchDropdown.css';

interface SearchDropdownProps {
  results: SearchResult[];
  isLoading: boolean;
  isEmpty: boolean;
  query: string;
  onClose: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  results,
  isLoading,
  isEmpty,
  query,
  onClose
}) => {
  const navigate = useNavigate();

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
  };

  if (query.length < 2) return null;

  return (
    <div className="search-dropdown">
      <div className="search-results">
        {isLoading && (
          <div className="search-loading">
            <span className="loading-icon">⚡</span>
            <span>Buscando...</span>
          </div>
        )}

        {isEmpty && !isLoading && (
          <div className="search-empty">
            <span className="empty-icon">🔍</span>
            <span>No se encontraron resultados para "{query}"</span>
          </div>
        )}

        {results.length > 0 && (
          <>
            <div className="search-header">
              <span>Resultados para "{query}"</span>
            </div>
            {results.map((result) => (
              <div
                key={result.id}
                className="search-result-item"
                onClick={() => handleResultClick(result.url)}
              >
                <div className="result-icon">{result.icon}</div>
                <div className="result-content">
                  <div className="result-title">{result.title}</div>
                  <div className="result-subtitle">{result.subtitle}</div>
                </div>
                <div className="result-arrow">→</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};