'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Utensils, 
  Users, 
  Star, 
  TrendingUp, 
  MapPin, 
  Music,
  Plus,
  Edit,
  Eye,
  Wine
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
        return 'bg-brand-success/10 dark:bg-brand-success/20 text-brand-success border border-brand-success/20';
      case 'inactive':
        return 'bg-brand-dark-100 dark:bg-brand-dark-700 text-brand-dark-600 dark:text-brand-dark-300 border border-brand-dark-200 dark:border-brand-dark-600';
      default:
        return 'bg-brand-warning/10 dark:bg-brand-warning/20 text-brand-warning border border-brand-warning/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'bar':
        return <Wine className="w-4 h-4" />;
      case 'concert':
        return <Music className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
            Dashboard
          </h1>
          <p className="text-brand-dark-600 dark:text-brand-dark-400 mt-1">
            Bienvenido al panel de administración de DóndeTú
          </p>
        </div>
        <button 
          onClick={() => router.push('/es/admin/restaurants/create')}
          className="btn-brand flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Crear Restaurante
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                Total Restaurantes
              </p>
              <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                {stats.totalRestaurants}
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-brand flex items-center justify-center">
              <Utensils className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </div>

        <div className="card-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                Total Reseñas
              </p>
              <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                {stats.totalReviews}
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-success/10 dark:bg-brand-success/20 rounded-brand flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-success" />
            </div>
          </div>
        </div>

        <div className="card-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                Rating Promedio
              </p>
              <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                {stats.averageRating}
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-warning/10 dark:bg-brand-warning/20 rounded-brand flex items-center justify-center">
              <Star className="w-6 h-6 text-brand-warning" />
            </div>
          </div>
        </div>

        <div className="card-brand p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-dark-600 dark:text-brand-dark-400">
                Visitas Mensuales
              </p>
              <p className="text-3xl font-bold text-brand-dark-900 dark:text-brand-dark-100">
                {stats.monthlyVisits.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-info/10 dark:bg-brand-info/20 rounded-brand flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-brand-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Restaurants */}
        <div className="card-brand">
          <div className="p-6 border-b border-brand-dark-200 dark:border-brand-dark-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100">
                Restaurantes Recientes
              </h2>
              <button 
                onClick={() => router.push('/es/admin/restaurants')}
                className="text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light text-sm font-medium transition-colors"
              >
                Ver todos
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-4 bg-brand-dark-50 dark:bg-brand-dark-800 rounded-brand">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-brand flex items-center justify-center">
                      {getCategoryIcon(restaurant.category)}
                    </div>
                    <div>
                      <h3 className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-brand-warning fill-current" />
                          <span className="text-sm text-brand-dark-600 dark:text-brand-dark-400">
                            {restaurant.rating}
                          </span>
                        </div>
                        <span className="text-sm text-brand-dark-500 dark:text-brand-dark-500">
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
                      <button className="p-1 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 rounded-brand transition-colors">
                        <Eye className="w-4 h-4 text-brand-dark-500 dark:text-brand-dark-400" />
                      </button>
                      <button className="p-1 hover:bg-brand-dark-100 dark:hover:bg-brand-dark-700 rounded-brand transition-colors">
                        <Edit className="w-4 h-4 text-brand-dark-500 dark:text-brand-dark-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="card-brand">
          <div className="p-6 border-b border-brand-dark-200 dark:border-brand-dark-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100">
                Reseñas Recientes
              </h2>
              <button 
                onClick={() => router.push('/es/admin/reviews')}
                className="text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light text-sm font-medium transition-colors"
              >
                Ver todas
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4 bg-brand-dark-50 dark:bg-brand-dark-800 rounded-brand">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-brand-dark-900 dark:text-brand-dark-100">
                          {review.restaurant}
                        </h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={clsx(
                                'w-4 h-4',
                                i < review.rating
                                  ? 'text-brand-warning fill-current'
                                  : 'text-brand-dark-300 dark:text-brand-dark-600'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-brand-dark-600 dark:text-brand-dark-400 mb-2">
                        &quot;{review.comment}&quot;
                      </p>
                      <div className="flex items-center gap-2 text-xs text-brand-dark-500 dark:text-brand-dark-500">
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
      <div className="card-brand p-6">
        <h2 className="text-lg font-semibold text-brand-dark-900 dark:text-brand-dark-100 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => router.push('/es/admin/restaurants/create')}
            className="flex items-center gap-3 p-4 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 rounded-brand hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-all duration-200"
          >
            <Plus className="w-5 h-5 text-brand-primary" />
            <div className="text-left">
              <p className="font-medium text-brand-primary dark:text-brand-primary-light">
                Crear Restaurante
              </p>
              <p className="text-sm text-brand-primary/70 dark:text-brand-primary/80">
                Añadir nuevo establecimiento
              </p>
            </div>
          </button>
          
          <button 
            onClick={() => router.push('/es/admin/restaurants')}
            className="flex items-center gap-3 p-4 bg-brand-success/5 dark:bg-brand-success/10 border border-brand-success/20 dark:border-brand-success/30 rounded-brand hover:bg-brand-success/10 dark:hover:bg-brand-success/20 transition-all duration-200"
          >
            <Edit className="w-5 h-5 text-brand-success" />
            <div className="text-left">
              <p className="font-medium text-brand-success dark:text-brand-success">
                Editar Menús
              </p>
              <p className="text-sm text-brand-success/70 dark:text-brand-success/80">
                Actualizar cartas y platos
              </p>
            </div>
          </button>
          
          <button 
            onClick={() => router.push('/es/admin/reviews')}
            className="flex items-center gap-3 p-4 bg-brand-info/5 dark:bg-brand-info/10 border border-brand-info/20 dark:border-brand-info/30 rounded-brand hover:bg-brand-info/10 dark:hover:bg-brand-info/20 transition-all duration-200"
          >
            <Users className="w-5 h-5 text-brand-info" />
            <div className="text-left">
              <p className="font-medium text-brand-info dark:text-brand-info">
                Gestionar Reseñas
              </p>
              <p className="text-sm text-brand-info/70 dark:text-brand-info/80">
                Ver y responder comentarios
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
