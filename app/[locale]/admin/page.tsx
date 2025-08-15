'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Utensils, 
  Users, 
  Star, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import { clsx } from 'clsx';

export default function AdminDashboard() {
  const router = useRouter();
  
  // Datos de ejemplo - en el futuro vendrán de Firebase
  const stats = {
    totalRestaurants: 3,
    totalReviews: 24,
    averageRating: 4.2,
    monthlyVisits: 1250
  };

  const recentRestaurants = [
    {
      id: 1,
      name: 'La Bodeguita del Medio',
      category: 'restaurant',
      rating: 4.5,
      reviews: 12,
      status: 'active'
    },
    {
      id: 2,
      name: 'El Floridita',
      category: 'bar',
      rating: 4.3,
      reviews: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Tropicana Club',
      category: 'concert',
      rating: 4.7,
      reviews: 4,
      status: 'active'
    }
  ];

  const recentReviews = [
    {
      id: 1,
      restaurant: 'La Bodeguita del Medio',
      author: 'María G.',
      rating: 5,
      comment: 'Excelente comida cubana, ambiente muy auténtico.',
      date: '2024-01-15'
    },
    {
      id: 2,
      restaurant: 'El Floridita',
      author: 'Carlos R.',
      rating: 4,
      comment: 'Los cócteles están increíbles, muy recomendado.',
      date: '2024-01-14'
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bienvenido al panel de administración
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Restaurantes
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalRestaurants}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Reseñas
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalReviews}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
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
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Visitas Mensuales
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.monthlyVisits.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Restaurants */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Restaurantes Recientes
              </h2>
              <button 
                onClick={() => router.push('/es/admin/restaurants')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Ver todos
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      {getCategoryIcon(restaurant.category)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {restaurant.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          ({restaurant.reviews} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={clsx(
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusColor(restaurant.status)
                    )}>
                      {restaurant.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Reseñas Recientes
              </h2>
              <button 
                onClick={() => router.push('/es/admin/reviews')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Ver todas
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {review.restaurant}
                        </h3>
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
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        &quot;{review.comment}&quot;
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>Por {review.author}</span>
                        <span>•</span>
                        <span>{new Date(review.date).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => router.push('/es/admin/restaurants/create')}
            className="flex items-center gap-3 p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            <Plus className="w-5 h-5 text-primary-600" />
            <div className="text-left">
              <p className="font-medium text-primary-900 dark:text-primary-100">
                Crear Restaurante
              </p>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Añadir nuevo establecimiento
              </p>
            </div>
          </button>
          
          <button 
            onClick={() => router.push('/es/admin/restaurants')}
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <Edit className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900 dark:text-green-100">
                Editar Menús
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Actualizar cartas y platos
              </p>
            </div>
          </button>
          
          <button 
            onClick={() => router.push('/es/admin/reviews')}
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Gestionar Reseñas
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Ver y responder comentarios
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
