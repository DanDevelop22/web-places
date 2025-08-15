'use client';

import React, { useState, useEffect } from 'react';
import { Place } from '@/types';
import MapView from '@/components/organisms/MapView';
import SidePanel from '@/components/organisms/SidePanel';
import Button from '@/components/atoms/Button';
import LanguageSelector from '@/components/atoms/LanguageSelector';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cleanUrlParams } from '@/utils/urlHelpers';

interface MapLayoutProps {
  places: Place[];
  initialPlace?: Place | null;
}

const MapLayout: React.FC<MapLayoutProps> = ({ places, initialPlace }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const router = useRouter();

  // Abrir automáticamente el lugar inicial si se especifica y limpiar URL
  useEffect(() => {
    if (initialPlace) {
      console.log('🎯 Abriendo lugar inicial:', initialPlace.name);
      setSelectedPlace(initialPlace);
      setIsPanelOpen(true);
      
      // Limpiar los parámetros de URL
      cleanUrlParams(router);
    }
  }, [initialPlace, router]);

  // Efecto para manejar el lugar inicial desde URL
  useEffect(() => {
    if (initialPlace && !selectedPlace) {
      console.log('🎯 Abriendo lugar inicial desde URL:', initialPlace.name);
      setSelectedPlace(initialPlace);
      setIsPanelOpen(true);
      
      // Limpiar parámetros de URL después de un breve delay
      setTimeout(() => {
        const currentPath = window.location.pathname;
        router.replace(currentPath);
        console.log('🧹 Parámetros de URL limpiados');
      }, 100);
    }
  }, [initialPlace, selectedPlace, router]);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  // Manejar modo oscuro
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setIsPanelOpen(true);
    setShowRoute(false); // Limpiar ruta al seleccionar nuevo lugar
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedPlace(null);
    setShowRoute(false); // Limpiar ruta al cerrar panel
  };

  const handleCalculateRoute = async (destination: [number, number]) => {
    if (!userLocation) {
      alert('No se puede calcular la ruta. Asegúrate de tener tu ubicación activada.');
      return;
    }

    setIsCalculatingRoute(true);
    setShowRoute(false);

    try {
      const origin = `${userLocation[0]},${userLocation[1]}`;
      const dest = `${destination[0]},${destination[1]}`;
      
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${dest}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=es`;
      
      console.log('🗺️ Calculando ruta:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        setRouteData(data);
        setShowRoute(true);
        console.log('✅ Ruta calculada exitosamente');
      } else {
        alert('No se encontró una ruta válida');
        console.error('❌ No se encontró ruta:', data);
      }
    } catch (error) {
      console.error('❌ Error calculando ruta:', error);
      alert('Error al calcular la ruta');
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  const handleRouteCalculationComplete = () => {
    setIsCalculatingRoute(false);
  };

  const handleAddReview = async (placeId: string, review: { rating: number; comment: string }) => {
    try {
      // En el futuro, esto se enviará a Firebase
      console.log('📝 Agregando reseña:', { placeId, review });
      
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Reseña agregada exitosamente');
    } catch (error) {
      console.error('Error agregando reseña:', error);
      alert('Error al agregar la reseña');
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Mapa de Lugares
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 h-full">
        <MapView
          places={places}
          onPlaceSelect={handlePlaceSelect}
          selectedPlace={selectedPlace}
          userLocation={userLocation}
          showRoute={showRoute}
          routeData={routeData}
          isCalculatingRoute={isCalculatingRoute}
        />
      </div>

      {/* Side Panel */}
      <SidePanel
        place={selectedPlace}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onAddReview={handleAddReview}
        onCalculateRoute={handleCalculateRoute}
        userLocation={userLocation}
      />

      {/* Overlay para móviles */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleClosePanel}
        />
      )}
    </div>
  );
};

export default MapLayout;
