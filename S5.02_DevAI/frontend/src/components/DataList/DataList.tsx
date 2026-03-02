import React, { useState, useEffect } from 'react';
import { PaginatedResponse, PaginationParams } from '../../api/types';
import './DataList.css';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataListProps<T> {
  title: string;
  columns: Column<T>[];
  fetchData: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  onItemClick?: (item: T) => void;
  onItemEdit?: (item: T) => void;
  onItemDelete?: (item: T) => void;
  showActions?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPageOptions?: number[];
  className?: string;
}

export function DataList<T extends { id: number }>({
  title,
  columns,
  fetchData,
  onItemClick,
  onItemEdit,
  onItemDelete,
  showActions = false,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  itemsPerPageOptions = [10, 25, 50, 100],
  className = '',
}: DataListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params: PaginationParams = {
        page: currentPage,
        per_page: itemsPerPage,
      };

      // Add search and sort params if supported by the API
      const response = await fetchData(params);
      
  setData(response?.data || []);
  setTotalPages(response?.meta?.last_page ?? 1);
  setTotalItems(response?.meta?.total ?? 0);
    } catch (err: any) {
      setError(err.message || 'Error loading data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPage, itemsPerPage, sortBy, sortOrder]);

  // Local search filter if API doesn't support server-side search
  const filteredData = searchable && searchTerm
    ? data.filter(item =>
        columns.some(column => {
          const value = item[column.key];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    if (sortBy === column.key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column.key);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      }
    }

    // Visible pages
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="pagination-btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
    );

    return pages;
  };

  if (loading) {
    return (
      <div className={`data-list ${className}`}>
        <div className="data-list-header">
          <h2>{title}</h2>
        </div>
        <div className="loading-container">
          <div className="loading-spinner">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`data-list ${className}`}>
        <div className="data-list-header">
          <h2>{title}</h2>
        </div>
        <div className="error-container">
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
          <button 
            className="retry-btn"
            onClick={loadData}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`data-list ${className}`}>
      <div className="data-list-header">
        <div className="header-left">
          <h2>{title}</h2>
          <span className="item-count">
            {totalItems} elemento{totalItems !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="header-right">
          {searchable && (
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}
          
          <div className="items-per-page">
            <label>Mostrar:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="items-select"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`table-header ${column.sortable ? 'sortable' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column)}
                >
                  <div className="header-content">
                    {column.label}
                    {column.sortable && (
                      <span className="sort-indicator">
                        {sortBy === column.key ? (
                          sortOrder === 'asc' ? '↑' : '↓'
                        ) : (
                          '↕️'
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {showActions && (
                <th className="table-header actions-header">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className={`table-row ${onItemClick ? 'clickable' : ''}`}
                onClick={() => onItemClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="table-cell">
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key] || '-')
                    }
                  </td>
                ))}
                {showActions && (
                  <td className="table-cell actions-cell">
                    <div className="action-buttons">
                      {onItemEdit && (
                        <button
                          className="action-btn edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemEdit(item);
                          }}
                          title="Editar"
                        >
                          ✏️
                        </button>
                      )}
                      {onItemDelete && (
                        <button
                          className="action-btn delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onItemDelete(item);
                          }}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Página {currentPage} de {totalPages} ({totalItems} elementos)
          </div>
          <div className="pagination">
            {renderPagination()}
          </div>
        </div>
      )}
    </div>
  );
}