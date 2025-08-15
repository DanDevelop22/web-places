'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  Utensils,
  Calendar,
  Star,
  MapPin
} from 'lucide-react';
import { clsx } from 'clsx';

export default function RestaurantsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Datos de ejemplo - en el futuro vendrán de Firebase
  const restaurants = [
    {
      id: 1,
      name: 'La Bodeguita del Medio',
      category: 'restaurant',
      address: 'Calle Empedrado 207, La Habana',
      rating: 4.5,
      reviews: 12,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'El Floridita',
      category: 'bar',
      address: 'Obispo 557, La Habana',
      rating: 4.3,
      reviews: 8,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Tropicana Club',
      category: 'concert',
      address: 'Calle 72, Marianao',
      rating: 4.7,
      reviews: 4,
      status: 'active',
      lastUpdated: '2024-01-13'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'bar':
        return <Utensils className="w-4 h-4" />;
      case 'concert':
        return <Calendar className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'restaurant':
        return 'Restaurante';
      case 'bar':
        return 'Bar';
      case 'concert':
        return 'Concierto';
      default:
        return 'Otro';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      default:
        return 'Pendiente';
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || restaurant.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (id: number) => {
    router.push(`/es/admin/restaurants/${id}/edit`);
  };

  const handleView = (id: number) => {
    router.push(`/es/menu/${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este restaurante?')) {
      // Aquí se implementará la lógica de eliminación con Firebase
      console.log('Eliminando restaurante:', id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis Restaurantes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona todos tus establecimientos
          </p>
        </div>
        <button
          onClick={() => router.push('/es/admin/restaurants/create')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Crear Restaurante
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar restaurantes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="all">Todas las categorías</option>
              <option value="restaurant">Restaurantes</option>
              <option value="bar">Bares</option>
              <option value="concert">Conciertos</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredRestaurants.length} de {restaurants.length} restaurantes
            </span>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(restaurant.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getCategoryLabel(restaurant.category)}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {restaurant.address}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {restaurant.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({restaurant.reviews} reseñas)
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor(restaurant.status)
                  )}>
                    {getStatusLabel(restaurant.status)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Actualizado: {new Date(restaurant.lastUpdated).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleView(restaurant.id)}
                    className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                    title="Ver en el mapa"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(restaurant.id)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron restaurantes
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer restaurante'
            }
          </p>
          {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
            <button
              onClick={() => router.push('/es/admin/restaurants/create')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crear Primer Restaurante
            </button>
          )}
        </div>
      )}
    </div>
  );
}
