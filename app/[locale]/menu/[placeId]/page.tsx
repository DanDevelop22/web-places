'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Utensils, Coffee, Star, Clock, MapPin, Phone } from 'lucide-react';
import { clsx } from 'clsx';
import placesData from '@/data/places.json';
import { Place, MenuItem } from '@/types';
import CategoryIcon from '@/components/atoms/CategoryIcon';
import Rating from '@/components/atoms/Rating';

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const placeId = params.placeId as string;
    const foundPlace = placesData.places.find(p => p.id === placeId);
    
    if (foundPlace) {
      setPlace(foundPlace);
    } else {
      // Si no encuentra el lugar, redirigir al mapa
      router.push('/es');
    }
    setLoading(false);
  }, [params.placeId, router]);

  const handleBack = () => {
    // Volver al mapa con el lugar seleccionado
    router.push(`/es?place=${place?.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  };

  const getMenuCategories = () => {
    if (!place?.menu) return [];
    
    const categories = new Set<string>();
    place.menu.forEach(item => {
      // Extraer categoría del nombre o usar una por defecto
      const category = item.name.includes('Bebida') || item.name.includes('Cóctel') || item.name.includes('Ron') 
        ? 'Bebidas' 
        : item.name.includes('Postre') || item.name.includes('Dulce')
        ? 'Postres'
        : 'Platos Principales';
      categories.add(category);
    });
    
    return Array.from(categories);
  };

  const getFilteredMenu = () => {
    if (!place?.menu) return [];
    
    if (selectedCategory === 'all') return place.menu;
    
    return place.menu.filter(item => {
      const category = item.name.includes('Bebida') || item.name.includes('Cóctel') || item.name.includes('Ron') 
        ? 'Bebidas' 
        : item.name.includes('Postre') || item.name.includes('Dulce')
        ? 'Postres'
        : 'Platos Principales';
      return category === selectedCategory;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando menú...</p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Lugar no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            El lugar que buscas no existe o ha sido eliminado.
          </p>
          <button
            onClick={() => router.push('/es')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Volver al mapa
          </button>
        </div>
      </div>
    );
  }

  const categories = getMenuCategories();
  const filteredMenu = getFilteredMenu();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            
            <div className="flex items-center gap-3">
              <CategoryIcon category={place.category} className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {place.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{place.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Rating rating={place.rating} showValue={false} />
                    <span>({place.reviews.length})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Información del lugar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sobre {place.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {place.description}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Horario: {place.hours?.monday || 'Consultar'}
                </span>
              </div>
              
              {place.socialMedia?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {place.socialMedia.phone}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {place.rating} ({place.reviews.length} reseñas)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros de categorías */}
        {categories.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                )}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={clsx(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menú */}
        <div className="space-y-4">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay elementos en esta categoría
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intenta seleccionar otra categoría o consulta directamente con el establecimiento.
              </p>
            </div>
          ) : (
            filteredMenu.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      €{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Botón de reserva */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              // Aquí se integraría con el sistema de reservas
              alert('Sistema de reservas en desarrollo');
            }}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Reservar Mesa
          </button>
        </div>
      </div>
    </div>
  );
}
