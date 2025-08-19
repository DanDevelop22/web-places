'use client';

import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Utensils, Music, Wine } from 'lucide-react';
import { clsx } from 'clsx';

export type CategoryFilter = 'all' | 'restaurant' | 'concert' | 'bar';

interface MapFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  className?: string;
}

const MapFilters: React.FC<MapFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { key: 'all' as CategoryFilter, label: 'Todos', icon: MapPin, color: 'bg-brand-dark-500' },
    { key: 'restaurant' as CategoryFilter, label: 'Restaurantes', icon: Utensils, color: 'bg-brand-primary' },
    { key: 'concert' as CategoryFilter, label: 'Conciertos', icon: Music, color: 'bg-brand-secondary' },
    { key: 'bar' as CategoryFilter, label: 'Bares', icon: Wine, color: 'bg-brand-accent' }
  ];

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className={clsx('absolute top-4 left-4 right-4 z-10', className)}>
      {/* Barra de búsqueda principal */}
      <div className="card-brand max-w-md">
        <div className="flex items-center p-3">
          <Search className="w-5 h-5 text-brand-dark-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar lugares..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-brand-dark-900 dark:text-brand-dark-100 placeholder-brand-dark-500 dark:placeholder-brand-dark-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-brand-dark-400" />
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx(
              'ml-2 p-2 rounded-brand transition-all duration-200',
              isExpanded 
                ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary' 
                : 'hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 text-brand-dark-500'
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros expandibles */}
        {isExpanded && (
          <div className="border-t border-brand-dark-200 dark:border-brand-dark-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-brand-dark-900 dark:text-brand-dark-100">
                Filtrar por categoría
              </h3>
              <button
                onClick={() => onCategoryChange('all')}
                className="text-xs text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light"
              >
                Limpiar filtros
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.key;
                
                return (
                  <button
                    key={category.key}
                    onClick={() => onCategoryChange(category.key)}
                    className={clsx(
                      'flex items-center gap-2 p-3 rounded-brand border transition-all duration-200',
                      'transform hover:scale-105 active:scale-95',
                      isSelected
                        ? 'bg-brand-primary/10 dark:bg-brand-primary/20 border-brand-primary/20 dark:border-brand-primary/30'
                        : 'bg-brand-dark-50 dark:bg-brand-dark-900/20 border-brand-dark-200 dark:border-brand-dark-700 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-800'
                    )}
                  >
                    <div className={clsx('w-3 h-3 rounded-full', category.color)} />
                    <Icon className="w-4 h-4 text-brand-dark-600 dark:text-brand-dark-400" />
                    <span className="text-sm font-medium text-brand-dark-700 dark:text-brand-dark-300">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapFilters;
