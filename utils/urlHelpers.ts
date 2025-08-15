import { Place } from '@/types';

/**
 * Genera una URL para un lugar específico usando su nombre
 * @param place - El lugar para generar la URL
 * @param locale - El idioma actual (opcional)
 * @returns URL con parámetro place
 */
export const generatePlaceUrl = (place: Place, locale: string = 'es'): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const cleanName = place.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${baseUrl}/${locale}?place=${encodeURIComponent(cleanName)}`;
};

/**
 * Genera una URL para un lugar específico usando sus coordenadas
 * @param place - El lugar para generar la URL
 * @param locale - El idioma actual (opcional)
 * @returns URL con parámetros lat y lng
 */
export const generateCoordinatesUrl = (place: Place, locale: string = 'es'): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/${locale}?lat=${place.coordinates.lat}&lng=${place.coordinates.lng}`;
};

/**
 * Genera una URL para compartir un lugar específico
 * @param place - El lugar para generar la URL
 * @param locale - El idioma actual (opcional)
 * @param useCoordinates - Si usar coordenadas en lugar del nombre (por defecto: false)
 * @returns URL completa para compartir
 */
export const generateShareUrl = (
  place: Place, 
  locale: string = 'es', 
  useCoordinates: boolean = false
): string => {
  if (useCoordinates) {
    return generateCoordinatesUrl(place, locale);
  }
  return generatePlaceUrl(place, locale);
};

/**
 * Encuentra un lugar por parámetros de URL
 * @param places - Array de lugares disponibles
 * @param searchParams - Parámetros de búsqueda de la URL
 * @returns El lugar encontrado o null
 */
export const findPlaceFromParams = (places: Place[], searchParams: URLSearchParams): Place | null => {
  const placeName = searchParams.get('place');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (placeName) {
    // Buscar por nombre del lugar
    const place = places.find(p => 
      p.name.toLowerCase().replace(/[^a-z0-9]/g, '') === 
      placeName.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    return place || null;
  }

  if (lat && lng) {
    // Buscar por coordenadas (con tolerancia de 0.001 grados)
    const targetLat = parseFloat(lat);
    const targetLng = parseFloat(lng);
    const tolerance = 0.001;

    const place = places.find(p => 
      Math.abs(p.coordinates.lat - targetLat) < tolerance &&
      Math.abs(p.coordinates.lng - targetLng) < tolerance
    );
    return place || null;
  }

  return null;
};

/**
 * Limpia los parámetros de URL manteniendo solo el path
 * @param router - Router de Next.js
 * @param delay - Delay en milisegundos antes de limpiar (por defecto: 100)
 */
export const cleanUrlParams = (router: any, delay: number = 100): void => {
  setTimeout(() => {
    const currentPath = window.location.pathname;
    router.replace(currentPath);
    console.log('🧹 Parámetros de URL limpiados');
  }, delay);
};

/**
 * Verifica si la URL actual tiene parámetros de lugar
 * @param searchParams - Parámetros de búsqueda de la URL
 * @returns true si tiene parámetros de lugar
 */
export const hasPlaceParams = (searchParams: URLSearchParams): boolean => {
  return searchParams.has('place') || (searchParams.has('lat') && searchParams.has('lng'));
};
