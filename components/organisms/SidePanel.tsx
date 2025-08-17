'use client';

import React, { useState, useEffect } from 'react';
import { Place, SocialNetwork } from '@/types';
import { X, MapPin, Utensils, Calendar, Clock, Navigation, Share2, Copy, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import CategoryIcon from '@/components/atoms/CategoryIcon';
import Rating from '@/components/atoms/Rating';
import PhotoCarousel from '@/components/molecules/PhotoCarousel';
import ReviewSection from '@/components/molecules/ReviewSection';
import SocialMediaLinks from '@/components/molecules/SocialMediaLinks';
import Button from '@/components/atoms/Button';
import Modal from '@/components/atoms/Modal';
import { generateShareUrl } from '@/utils/urlHelpers';
import { useRouter } from 'next/navigation';
import { loadSocialNetworksByIds, getSocialNetworkIcon, getSocialNetworkLabel } from '@/services/socialNetworks';

interface SidePanelProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (placeId: string, review: { rating: number; comment: string }) => void;
  onCalculateRoute?: (destination: [number, number]) => void;
  userLocation: [number, number] | null;
}

const SidePanel: React.FC<SidePanelProps> = ({ 
  place, 
  isOpen, 
  onClose, 
  onAddReview, 
  onCalculateRoute, 
  userLocation 
}) => {

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareModalMessage, setShareModalMessage] = useState('');
  const [shareModalType, setShareModalType] = useState<'success' | 'error'>('success');
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);
  const [loadingSocialNetworks, setLoadingSocialNetworks] = useState(false);
  const router = useRouter();

  // Cargar redes sociales cuando cambie el lugar
  useEffect(() => {
    const loadSocialNetworks = async () => {
      if (!place?.socialNetworks || place.socialNetworks.length === 0) {
        setSocialNetworks([]);
        return;
      }

      try {
        setLoadingSocialNetworks(true);
        const networks = await loadSocialNetworksByIds(place.socialNetworks);
        setSocialNetworks(networks);
      } catch (error) {
        console.error('❌ Error cargando redes sociales:', error);
        setSocialNetworks([]);
      } finally {
        setLoadingSocialNetworks(false);
      }
    };

    loadSocialNetworks();
  }, [place?.socialNetworks]);

  if (!place) return null;

  const handleAddReview = async (placeId: string, review: { rating: number; comment: string }) => {
    try {
      // En el futuro, esto se enviará a Firebase
      console.log('📝 Agregando reseña:', { placeId, review });
      
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí se actualizaría el estado con la nueva reseña
      alert('Reseña agregada exitosamente');
    } catch (error) {
      console.error('Error agregando reseña:', error);
      alert('Error al agregar la reseña');
    }
  };

  const handleReserveTable = async () => {
    try {
      // Aquí se integraría con n8n
     
      alert('Reserva enviada (simulación)');
    } catch (error) {
      console.error('Error reserving table:', error);
    }
  };

  const handleBuyTickets = async () => {
    try {
      // Aquí se integraría con n8n
      alert('Compra de entradas enviada (simulación)');
    } catch (error) {
      console.error('Error buying tickets:', error);
    }
  };

  const handleCalculateRoute = () => {
    if (!place || !userLocation) {
      alert('No se puede calcular la ruta. Asegúrate de tener tu ubicación activada.');
      return;
    }
    
          const destination: [number, number] = [parseFloat(place.locationLng), parseFloat(place.locationLat)];
    onCalculateRoute?.(destination);
  };

  const handleSharePlace = async () => {
    if (!place) return;
    
    try {
      const shareUrl = generateShareUrl(place);
      await navigator.clipboard.writeText(shareUrl);
      
      const placeType = place.category === 'restaurant' ? 'restaurante' : 
                       place.category === 'concert' ? 'concierto' : 'bar';
      
      setShareModalMessage(
        `¡Perfecto! El enlace de "${place.name}" (${placeType}) ha sido copiado al portapapeles. ` +
        `Ya puedes compartirlo en WhatsApp, Telegram, Instagram, o cualquier red social. ` +
        `Cuando alguien haga clic en el enlace, irá directamente a este lugar.`
      );
      setShareModalType('success');
      setShowShareModal(true);
    } catch (err) {
      console.error('Error al copiar URL de compartido:', err);
      setShareModalMessage(
        'Oops, hubo un error al copiar el enlace. ' +
        'Esto puede suceder si el navegador no tiene permisos para acceder al portapapeles. ' +
        'Por favor, intenta de nuevo.'
      );
      setShareModalType('error');
      setShowShareModal(true);
    }
  };

  const renderCategorySection = () => {
    switch (place.category) {
      case 'restaurant':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menú Digital
                </h3>
              </div>
              <Button
                onClick={() => router.push(`/es/menu/${place.id}`)}
                variant="secondary"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Menú
              </Button>
            </div>
            
            {/* Social Media Links */}
            {place.socialMedia && (
              <SocialMediaLinks socialMedia={place.socialMedia} />
            )}
          </div>
        );

      case 'concert':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Información del Evento
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {place.event?.date}
                </span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {place.event?.time}
                </span>
              </div>
            </div>
            <Button
              onClick={handleBuyTickets}
              variant="secondary"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Comprar Entradas
            </Button>
            
            {/* Social Media Links */}
            {place.socialMedia && (
              <SocialMediaLinks socialMedia={place.socialMedia} />
            )}
          </div>
        );

      case 'bar':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Carta de Bebidas
                </h3>
              </div>
              <Button
                onClick={() => router.push(`/es/menu/${place.id}`)}
                variant="secondary"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Carta
              </Button>
            </div>
            
            {/* Social Media Links */}
            {place.socialMedia && (
              <SocialMediaLinks socialMedia={place.socialMedia} />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={clsx(
        'fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <CategoryIcon category={place.category} className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {place.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Photos */}
            <PhotoCarousel photos={place.photos} placeName={place.name} />

            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">{place.address}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Rating rating={place.rating} showValue />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({place.reviews?.length || 0} reseñas)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Descripción
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {place.description}
              </p>
            </div>

            {/* Redes Sociales desde Firestore */}
            {socialNetworks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Redes Sociales
                </h3>
                <div className="space-y-2">
                  {socialNetworks.map((network) => (
                    <a
                      key={network.id}
                      href={network.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <span className="text-xl">{getSocialNetworkIcon(network.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {getSocialNetworkLabel(network.type)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {network.url}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {loadingSocialNetworks && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Cargando redes sociales...
                </p>
              </div>
            )}

            {/* Sección de acciones */}
            <div className="mt-6 space-y-3">
              {/* Botón de calcular ruta */}
              <button
                onClick={handleCalculateRoute}
                disabled={!userLocation}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                </svg>
                {userLocation ? 'Calcular Ruta' : 'Activa tu ubicación para calcular ruta'}
              </button>

              {/* Botones específicos por categoría */}
              {place.category === 'restaurant' && (
                <button
                  onClick={handleReserveTable}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Reservar Mesa
                </button>
              )}

              {place.category === 'concert' && place.event && (
                <button
                  onClick={handleBuyTickets}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Comprar Entradas
                </button>
              )}

              {/* Botón de compartir */}
              <Button
                onClick={handleSharePlace}
                variant="secondary"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Compartir Lugar
              </Button>
            </div>

            {/* Category-specific section */}
            {renderCategorySection()}

            {/* Reviews */}
            <ReviewSection
              reviews={place.reviews || []}
              placeId={place.id}
              onAddReview={handleAddReview}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={shareModalType === 'success' ? '¡Enlace Copiado!' : 'Error al Copiar'}
        message={shareModalMessage}
        type={shareModalType}
        autoClose={true}
        autoCloseDelay={4000}
      />
    </div>
  );
};

export default SidePanel;
