'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Star,
  MoreVertical,
  Eye
} from 'lucide-react';
import { clsx } from 'clsx';

export default function ReviewsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Datos de ejemplo - en el futuro vendrán de Firebase
  const reviews = [
    {
      id: 1,
      restaurant: 'La Bodeguita del Medio',
      author: 'María González',
      rating: 5,
      comment: 'Excelente comida cubana, el ambiente es muy auténtico y la atención es perfecta. Definitivamente volveré.',
      date: '2024-01-15',
      status: 'approved',
      helpful: 3
    },
    {
      id: 2,
      restaurant: 'El Floridita',
      author: 'Carlos Rodríguez',
      rating: 4,
      comment: 'Los cócteles están increíbles, especialmente el daiquiri. El servicio es rápido y amigable.',
      date: '2024-01-14',
      status: 'pending',
      helpful: 1
    },
    {
      id: 3,
      restaurant: 'Tropicana Club',
      author: 'Ana Martínez',
      rating: 5,
      comment: 'Espectáculo increíble, la música y el baile son de primera calidad. Una experiencia inolvidable.',
      date: '2024-01-13',
      status: 'approved',
      helpful: 5
    },
    {
      id: 4,
      restaurant: 'La Bodeguita del Medio',
      author: 'Luis Pérez',
      rating: 3,
      comment: 'La comida está bien, pero el servicio fue un poco lento. El lugar es bonito.',
      date: '2024-01-12',
      status: 'rejected',
      helpful: 0
    }
  ];

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === 'approved').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  };

  const restaurants = Array.from(new Set(reviews.map(r => r.restaurant)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'pending':
        return 'Pendiente';
      case 'rejected':
        return 'Rechazada';
      default:
        return 'Desconocido';
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRestaurant = selectedRestaurant === 'all' || review.restaurant === selectedRestaurant;
    const matchesRating = selectedRating === 'all' || review.rating.toString() === selectedRating;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    
    return matchesSearch && matchesRestaurant && matchesRating && matchesStatus;
  });

  const handleApprove = (id: number) => {
    if (confirm('¿Estás seguro de que quieres aprobar esta reseña?')) {
      // Aquí se implementará la lógica de aprobación con Firebase
      console.log('Aprobando reseña:', id);
    }
  };

  const handleReject = (id: number) => {
    if (confirm('¿Estás seguro de que quieres rechazar esta reseña?')) {
      // Aquí se implementará la lógica de rechazo con Firebase
      console.log('Rechazando reseña:', id);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      // Aquí se implementará la lógica de eliminación con Firebase
      console.log('Eliminando reseña:', id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gestión de Reseñas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Modera y gestiona las reseñas de tus restaurantes
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Reseñas
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Aprobadas
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.approved}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pendientes
              </p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Filter className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rechazadas
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.rejected}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rating Promedio
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.averageRating}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar reseñas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>

          {/* Restaurant Filter */}
          <div>
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="all">Todos los restaurantes</option>
              {restaurants.map(restaurant => (
                <option key={restaurant} value={restaurant}>{restaurant}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <option value="all">Todas las calificaciones</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
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
              <option value="approved">Aprobadas</option>
              <option value="pending">Pendientes</option>
              <option value="rejected">Rechazadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reseñas ({filteredReviews.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {review.restaurant}
                    </h3>
                    <span className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(review.status)
                    )}>
                      {getStatusLabel(review.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={clsx(
                            'w-4 h-4',
                            i < review.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Por {review.author}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    &quot;{review.comment}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>Útil: {review.helpful}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Aprobar"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Rechazar"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
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
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No se encontraron reseñas
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery || selectedRestaurant !== 'all' || selectedRating !== 'all' || selectedStatus !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Aún no hay reseñas para moderar'
            }
          </p>
        </div>
      )}
    </div>
  );
}
