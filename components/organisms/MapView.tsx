'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Place } from '@/types';
import MapFilters, { CategoryFilter } from '@/components/molecules/MapFilters';
import { MAPBOX_CONFIG, isMapboxTokenValid } from '@/config/mapbox';

// Importar estilos de Mapbox
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  places: Place[];
  onPlaceSelect: (place: Place) => void;
  selectedPlace: Place | null;
  userLocation: [number, number] | null;
  showRoute?: boolean;
  routeData?: any;
  isCalculatingRoute?: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  places,
  onPlaceSelect,
  selectedPlace,
  userLocation,
  showRoute,
  routeData,
  isCalculatingRoute
}) => {
  console.log('🗺️ MapView renderizado con', places.length, 'lugares');

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Actualizar filteredPlaces cuando places cambie
  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  // Coordenadas por defecto (La Habana)
  const defaultCenter: [number, number] = [-82.3594, 23.1136];

  // Verificar configuración de Mapbox al cargar
  useEffect(() => {
    if (!isMapboxTokenValid()) {
      console.error('❌ Token de Mapbox no configurado. Por favor, configura NEXT_PUBLIC_MAPBOX_TOKEN en tu archivo .env.local');
    } else {
      console.log('✅ Token de Mapbox configurado correctamente');
    }
  }, []);

  // Inicializar mapa
  useEffect(() => {
    console.log('🗺️ Inicializando mapa...');

    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      console.error('❌ Token de Mapbox no encontrado');
      return;
    }

    if (!mapContainer.current) {
      console.error('❌ Contenedor del mapa no encontrado');
      return;
    }

    // Limpiar mapa existente de forma segura
    if (map.current) {
      try {
        // Verificar si el mapa aún existe y está en un estado válido
        if (map.current.getContainer()) {
          map.current.remove();
        }
      } catch (error) {
        console.log('Error removing existing map:', error);
      }
      map.current = null;
    }

    // Crear nuevo mapa
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-82.3594, 23.1136], // La Habana
        zoom: 13,
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
      });

      // Agregar controles de navegación en la izquierda
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Agregar control de ubicación en la izquierda
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      // Evento cuando el mapa se carga
      map.current.on('load', () => {
        console.log('✅ Mapa cargado correctamente');
        console.log('📍 Lugares disponibles al cargar:', places.length);
        setMapLoaded(true);
      });

      // Evento de error
      map.current.on('error', (e) => {
        console.error('❌ Error en el mapa:', e);
      });

    } catch (error) {
      console.error('❌ Error creando mapa:', error);
    }

    // Función de limpieza
    return () => {
      if (map.current) {
        try {
          // Verificar si el mapa aún existe y está en un estado válido
          if (map.current.getContainer()) {
            map.current.remove();
          }
        } catch (error) {
          console.log('Error removing map in cleanup:', error);
        }
        map.current = null;
      }
    };
  }, []);

  // Manejar marcador de ubicación del usuario
  useEffect(() => {
    if (!map.current || !userLocation) return;

    // Remover marcador anterior si existe de forma segura
    if (userLocationMarker.current) {
      try {
        if (userLocationMarker.current.getElement()) {
          userLocationMarker.current.remove();
        }
      } catch (error) {
        console.log('Error removing previous user marker:', error);
      }
      userLocationMarker.current = null;
    }

    try {
      const userMarkerElement = document.createElement('div');
      userMarkerElement.className = 'user-location-marker';
      userMarkerElement.innerHTML = `
        <div class="relative">
          <div class="w-8 h-8 bg-blue-500 border-3 border-white rounded-full shadow-lg flex items-center justify-center">
            <div class="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <div class="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
        </div>
      `;

      const userMarker = new mapboxgl.Marker(userMarkerElement)
        .setLngLat(userLocation)
        .addTo(map.current);

      userLocationMarker.current = userMarker;
    } catch (error) {
      console.error('Error creating user location marker:', error);
    }
  }, [userLocation]);

  // Renderizar marcadores cuando el mapa esté listo
  useEffect(() => {
    console.log('🎯 Renderizando marcadores...');
    console.log('🗺️ Mapa existe:', !!map.current);
    console.log('🗺️ Estilo cargado:', map.current?.isStyleLoaded());
    console.log('📍 Lugares filtrados:', filteredPlaces.length);
    console.log('📍 Lugares originales:', places.length);

    if (!map.current) {
      console.log('❌ Mapa no existe aún');
      return;
    }

    if (!map.current.isStyleLoaded()) {
      console.log('❌ Estilo del mapa no está cargado aún');
      return;
    }

    console.log('✅ Mapa listo, limpiando marcadores anteriores...');

    // Limpiar marcadores existentes de forma segura
    markers.current.forEach(marker => {
      try {
        if (marker && marker.getElement()) {
          marker.remove();
        }
      } catch (error) {
        console.warn('Error removing marker:', error);
      }
    });
    markers.current = [];

    console.log('🎯 Agregando marcadores para', filteredPlaces.length, 'lugares...');

    // Agregar marcadores para lugares filtrados
    filteredPlaces.forEach((place, index) => {
      try {
        console.log(`🎯 Creando marcador ${index + 1}/${filteredPlaces.length}:`, place.name);

        const markerElement = document.createElement('div');
        markerElement.className = 'cursor-pointer';

        const categoryColors = {
          restaurant: 'bg-red-500',
          concert: 'bg-purple-500',
          bar: 'bg-blue-500',
        };

        const isSelected = selectedPlace?.id === place.id;
        const colorClass = categoryColors[place.category];

        markerElement.innerHTML = `
          <div class="relative cursor-pointer transform transition-all duration-200 hover:scale-110 ${isSelected ? 'z-50' : ''}">
            <div class="w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-200 ${colorClass} ${isSelected ? 'scale-125 shadow-xl' : ''}">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                ${place.category === 'restaurant' ? '<path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>' :
            place.category === 'concert' ? '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>' : place.category === 'bar'
  ? '<path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M18 4H6v6a6 6 0 1 0 12 0V4Z"/>'
              : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
          }
              </svg>
            </div>
            ${isSelected ? '<div class="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>' : ''}
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none ${isSelected ? 'opacity-100' : ''}">
              ${place.name}
              <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        `;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([parseFloat(place.locationLng), parseFloat(place.locationLat)])
          .addTo(map.current!);

        markerElement.addEventListener('click', () => {
          console.log('🎯 Marcador clickeado:', place.name);
          onPlaceSelect(place);
        });

        markers.current.push(marker);
        console.log(`✅ Marcador creado para ${place.name} en [${place.locationLng}, ${place.locationLat}]`);
      } catch (error) {
        console.error('Error creating marker for', place.name, ':', error);
      }
    });

    console.log('✅ Total de marcadores agregados:', markers.current.length);
  }, [filteredPlaces, onPlaceSelect, selectedPlace, mapLoaded]);

  // Filtrar lugares basado en búsqueda y categoría
  useEffect(() => {
    let filtered = places;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(place =>
        place.name.toLowerCase().includes(query) ||
        place.description.toLowerCase().includes(query) ||
        place.address.toLowerCase().includes(query)
      );
    }

    setFilteredPlaces(filtered);
  }, [places, searchQuery, selectedCategory]);

  // Volar al lugar seleccionado
  useEffect(() => {
    if (selectedPlace && map.current) {
      map.current.flyTo({
        center: [parseFloat(selectedPlace.locationLng), parseFloat(selectedPlace.locationLat)],
        zoom: 16,
        duration: 2000
      });
    }
  }, [selectedPlace]);

  // Mostrar ruta cuando se calcula
  useEffect(() => {
    if (!map.current || !showRoute || !routeData) return;

    console.log('🗺️ Mostrando ruta en el mapa...');

    // Remover ruta anterior si existe
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    // Agregar la ruta al mapa
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: routeData.routes[0].geometry
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });

    // Ajustar el mapa para mostrar toda la ruta
    const coordinates = routeData.routes[0].geometry.coordinates;
    const bounds = coordinates.reduce((bounds: any, coord: number[]) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000
    });

    console.log('✅ Ruta mostrada en el mapa');

    return () => {
      if (map.current && map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }
    };
  }, [showRoute, routeData]);

  const handleMyLocation = () => {
    if (userLocation && map.current) {
      map.current.flyTo({
        center: userLocation,
        zoom: 14,
        duration: 1500,
      });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          const location: [number, number] = [longitude, latitude];

          // Crear o actualizar marcador de ubicación del usuario
          if (map.current) {
            // Remover marcador anterior si existe de forma segura
            if (userLocationMarker.current) {
              try {
                if (userLocationMarker.current.getElement()) {
                  userLocationMarker.current.remove();
                }
              } catch (error) {
                console.log('Error removing previous marker:', error);
              }
            }

            const userMarkerElement = document.createElement('div');
            userMarkerElement.className = 'user-location-marker';
            userMarkerElement.innerHTML = `
              <div class="relative">
                <div class="w-8 h-8 bg-blue-500 border-3 border-white rounded-full shadow-lg flex items-center justify-center">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div class="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
              </div>
            `;

            const userMarker = new mapboxgl.Marker(userMarkerElement)
              .setLngLat([longitude, latitude])
              .addTo(map.current);

            userLocationMarker.current = userMarker;
          }

          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 14,
            duration: 1500,
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Filtros y búsqueda */}
      <MapFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Mapa */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Loading overlay para cálculo de ruta */}
      {isCalculatingRoute && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              <span className="text-gray-900 dark:text-white">Calculando ruta...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
