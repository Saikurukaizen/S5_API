// src/pages/CommunitiesPage.tsx
import React from 'react';
import { CommunitiesList } from '../components/CommunitiesList/CommunitiesList';

export const CommunitiesPage: React.FC = () => {
  return (
    <div className="page-container">
      <CommunitiesList />
    </div>
  );
};
