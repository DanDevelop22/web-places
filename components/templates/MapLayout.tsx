'use client';

import React, { useState, useEffect } from 'react';
import { Place } from '@/types';
import MapView from '@/components/organisms/MapView';
import SidePanel from '@/components/organisms/SidePanel';
import Button from '@/components/atoms/Button';
import LanguageSelector from '@/components/atoms/LanguageSelector';
import ContactModal from '@/components/molecules/ContactModal';
import FloatingContactButton from '@/components/atoms/FloatingContactButton';
import Logo from '@/components/atoms/Logo';
import { Moon, Sun, Menu, X, Settings, MessageCircle, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cleanUrlParams } from '@/utils/urlHelpers';
import { useTheme } from '@/contexts/ThemeContext';

interface MapLayoutProps {
  places: Place[];
  initialPlace?: Place | null;
}

const MapLayout: React.FC<MapLayoutProps> = ({ places, initialPlace }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [routeData, setRouteData] = useState<any>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const router = useRouter();

  // Log cuando se renderiza el MapLayout
  useEffect(() => {
    console.log('🎯 MapLayout renderizado con', places.length, 'lugares');
  }, [places]);

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
    <div className="relative w-full h-screen bg-brand-dark-50 dark:bg-brand-dark-900">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 dark:bg-brand-dark-900/90 backdrop-blur-sm border-b border-brand-dark-200 dark:border-brand-dark-700">
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
            <Logo variant="primary" size="sm" type="icon" />
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
                <Moon className="w-5 h-5 text-brand-dark-600" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsContactModalOpen(true)}
              className="p-2"
            >
                              <MessageCircle className="w-5 h-5 text-brand-dark-600 dark:text-brand-dark-400" />
              Únete Ahora
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/es/landing')}
              className="p-2"
            >
                              <Info className="w-5 h-5 text-brand-dark-600 dark:text-brand-dark-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/es/login')}
              className="p-2"
            >
                              <Settings className="w-5 h-5 text-brand-dark-600 dark:text-brand-dark-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 h-full">
        <MapView
          places={places}
          selectedPlace={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
          userLocation={userLocation}
          showRoute={showRoute}
          routeData={routeData}
          isCalculatingRoute={isCalculatingRoute}
        />
        
        <SidePanel
          place={selectedPlace}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onCalculateRoute={handleCalculateRoute}
          userLocation={userLocation}
          onAddReview={handleAddReview}
        />
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Floating Contact Button */}
      <FloatingContactButton
        onContactClick={() => setIsContactModalOpen(true)}
      />
    </div>
  );
};

export default MapLayout;
