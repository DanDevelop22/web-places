'use client';

import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Utensils, Music, Coffee } from 'lucide-react';
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
    { key: 'all' as CategoryFilter, label: 'Todos', icon: MapPin, color: 'bg-gray-500' },
    { key: 'restaurant' as CategoryFilter, label: 'Restaurantes', icon: Utensils, color: 'bg-orange-500' },
    { key: 'concert' as CategoryFilter, label: 'Conciertos', icon: Music, color: 'bg-purple-500' },
    { key: 'bar' as CategoryFilter, label: 'Bares', icon: Coffee, color: 'bg-green-500' }
  ];

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className={clsx('absolute top-4 left-4 right-4 z-10', className)}>
      {/* Barra de búsqueda principal */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
        <div className="flex items-center p-3">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Buscar lugares..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx(
              'ml-2 p-2 rounded-lg transition-all duration-200',
              isExpanded 
                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
            )}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros expandibles */}
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Filtrar por categoría
              </h3>
              <button
                onClick={() => onCategoryChange('all')}
                className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
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
                      'flex items-center gap-2 p-3 rounded-lg border transition-all duration-200',
                      'transform hover:scale-105 active:scale-95',
                      isSelected
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <div className={clsx('w-3 h-3 rounded-full', category.color)} />
                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
