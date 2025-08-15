// Configuración temporal de Mapbox
// Reemplaza con tu token real de Mapbox
export const MAPBOX_CONFIG = {
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example',
  style: 'mapbox://styles/mapbox/streets-v12'
};

// Función para verificar si el token es válido
export const isMapboxTokenValid = () => {
  const token = MAPBOX_CONFIG.token;
  return token && token !== 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';
};
