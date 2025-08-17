'use client';

import React, { useState, useEffect } from 'react';
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
  MapPin,
  Loader2,
  Wine
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthContext } from '@/contexts/AuthContext';
import { loadPlacesByUser, deletePlace } from '@/services/places';
import { Place } from '@/types';
import { loadSocialNetworksByIds, getSocialNetworkIcon, getSocialNetworkLabel } from '@/services/socialNetworks';

export default function RestaurantsPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [restaurantSocialNetworks, setRestaurantSocialNetworks] = useState<{ [key: string]: any[] }>({});

  // Función para cargar restaurantes
  const loadUserRestaurants = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('🔥 Cargando restaurantes del usuario:', user.uid);

      const userPlaces = await loadPlacesByUser(user.uid);
      setRestaurants(userPlaces);

      // Cargar redes sociales para cada restaurante
      const socialNetworksData: { [key: string]: any[] } = {};
      for (const place of userPlaces) {
        if (place.socialNetworks && place.socialNetworks.length > 0) {
          try {
            const networks = await loadSocialNetworksByIds(place.socialNetworks);
            socialNetworksData[place.id] = networks;
          } catch (error) {
            console.error(`❌ Error cargando redes sociales para ${place.name}:`, error);
            socialNetworksData[place.id] = [];
          }
        } else {
          socialNetworksData[place.id] = [];
        }
      }
      setRestaurantSocialNetworks(socialNetworksData);

      console.log('✅ Restaurantes cargados:', userPlaces.length);
    } catch (err) {
      console.error('❌ Error cargando restaurantes:', err);
      setError('Error al cargar los restaurantes desde Firestore');
    } finally {
      setLoading(false);
    }
  };

  // Cargar restaurantes del usuario desde Firestore
  useEffect(() => {
    loadUserRestaurants();
  }, [user?.uid]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      case 'bar':
        return <Wine className="w-4 h-4" />;
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
    // Por ahora todos los lugares se consideran activos
    const matchesStatus = selectedStatus === 'all' || selectedStatus === 'active';

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (id: string) => {
    router.push(`/es/admin/restaurants/${id}/edit`);
  };

  const handleView = (id: string) => {
    router.push(`/es/menu/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este restaurante?')) {
      try {
        setDeletingId(id);
        await deletePlace(id);

        // Actualizar la lista local
        setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));

        console.log('✅ Restaurante eliminado:', id);
      } catch (err) {
        console.error('❌ Error eliminando restaurante:', err);
        alert('Error al eliminar el restaurante. Inténtalo de nuevo.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mis Restaurantes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona todos tus establecimientos
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Cargando restaurantes desde Firestore...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar estado de error
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mis Restaurantes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestiona todos tus establecimientos
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={loadUserRestaurants}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis Restaurantes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gestiona todos tus establecimientos ({restaurants.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadUserRestaurants}
            disabled={loading}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Recargar datos"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <div className="w-4 h-4">🔄</div>
            )}
            Recargar
          </button>
          <button
            onClick={() => router.push('/es/admin/restaurants/create')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Crear Restaurante
          </button>
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
                    ({restaurant.reviews?.length || 0} reseñas)
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={clsx(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    getStatusColor('active')
                  )}>
                    Activo
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {restaurant.id}
                  </span>
                </div>

                {/* Redes Sociales */}
                {restaurantSocialNetworks[restaurant.id] && restaurantSocialNetworks[restaurant.id].length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Redes:</span>
                    <div className="flex gap-1">
                      {restaurantSocialNetworks[restaurant.id].slice(0, 3).map((network, index) => (
                        <span key={index} className="text-xs" title={getSocialNetworkLabel(network.type)}>
                          {getSocialNetworkIcon(network.type)}
                        </span>
                      ))}
                      {restaurantSocialNetworks[restaurant.id].length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{restaurantSocialNetworks[restaurant.id].length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
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
                  disabled={deletingId === restaurant.id}
                  className={clsx(
                    "p-2 rounded-lg transition-colors",
                    deletingId === restaurant.id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  )}
                  title="Eliminar"
                >
                  {deletingId === restaurant.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
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
            {restaurants.length === 0
              ? 'No tienes restaurantes registrados'
              : 'No se encontraron restaurantes'
            }
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {restaurants.length === 0
              ? 'Comienza creando tu primer restaurante en Firestore'
              : searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'No hay restaurantes que coincidan con los criterios'
            }
          </p>
          {restaurants.length === 0 && (
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
