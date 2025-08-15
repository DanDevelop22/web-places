'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MapLayout from '../../components/templates/MapLayout';
import placesData from '@/data/places.json';
import { findPlaceFromParams } from '@/utils/urlHelpers';

export default function HomePage() {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      setPlaces(placesData.places);
      setError(null);
    } catch (err) {
      console.error('❌ Error cargando lugares:', err);
      setError('Error al cargar los lugares');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para encontrar lugar por parámetros de URL
  const getInitialPlace = () => {
    if (places.length === 0) return null;
    
    const placeFromParams = findPlaceFromParams(places, searchParams);
    
    // Si encontramos un lugar por parámetros, abrir automáticamente el panel
    if (placeFromParams) {
      console.log('📍 Lugar encontrado en URL:', placeFromParams.name);
    }
    
    return placeFromParams;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return <MapLayout places={places} initialPlace={getInitialPlace()} />;
}
