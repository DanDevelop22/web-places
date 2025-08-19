'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MapLayout from '@/components/templates/MapLayout';
import { loadPlacesFromFirestore } from '@/services/places';
import { Place } from '@/types';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('📂 Lugares cargados desde Firestore:', places.length);

  // Cargar lugares desde Firestore al montar el componente
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const firestorePlaces = await loadPlacesFromFirestore();
        setPlaces(firestorePlaces);
        console.log('✅ Lugares cargados exitosamente:', firestorePlaces.length);
      } catch (err) {
        console.error('❌ Error cargando lugares:', err);
        setError('Error al cargar los lugares desde Firestore');
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, []);

  useEffect(() => {
    console.log('🔄 Places actualizados:', places.length);
  }, [places]);

  useEffect(() => {
    // Manejar parámetros de URL para abrir un lugar específico
    const placeName = searchParams.get('place');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (placeName && places.length > 0) {
      const place = places.find(p => 
        p.name.toLowerCase().replace(/\s+/g, '') === placeName.toLowerCase()
      );
      if (place) {
        setSelectedPlace(place);
      }
    } else if (lat && lng && places.length > 0) {
      const place = places.find(p => 
        Math.abs(parseFloat(p.locationLat) - parseFloat(lat)) < 0.001 &&
        Math.abs(parseFloat(p.locationLng) - parseFloat(lng)) < 0.001
      );
      if (place) {
        setSelectedPlace(place);
      }
    }
  }, [searchParams, places]);

  if (loading) {
    return (
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando lugares desde Firestore...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <MapLayout
        places={places}
        initialPlace={selectedPlace}
      />
    </div>
  );
}
