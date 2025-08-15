'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MapLayout from '@/components/templates/MapLayout';
import placesData from '@/data/places.json';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [places, setPlaces] = useState<any[]>(placesData.places || []);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  console.log('📂 Lugares cargados directamente:', places.length);
  console.log('📂 Datos completos:', placesData);

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
        Math.abs(p.coordinates.lat - parseFloat(lat)) < 0.001 &&
        Math.abs(p.coordinates.lng - parseFloat(lng)) < 0.001
      );
      if (place) {
        setSelectedPlace(place);
      }
    }
  }, [searchParams, places]);

  return (
    <div className="relative h-screen">
      <MapLayout
        places={places}
        initialPlace={selectedPlace}
      />
    </div>
  );
}
