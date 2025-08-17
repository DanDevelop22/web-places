import { getDocuments, createDocument, updateDocument, deleteDocument, queryDocuments } from './firestore';
import { Place } from '@/types';

// Interfaz para los datos de Firestore (basada en la imagen)
export interface FirestorePlace {
  id?: string;
  name: string;
  description: string;
  category: string;
  address: string;
  locationLat: string;
  locationLng: string;
  photos: string[];
  rating: number;
  reviews: string; // Referencia a documento de reviews
  menus: string[]; // Referencias a documentos de menús
  schedule: string;
  type: string;
  uid: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  email?: string;
  website?: string;
  socialNetworks?: any[];
}

// Función para transformar datos de Firestore al formato de la aplicación
export const transformFirestorePlace = (firestorePlace: FirestorePlace): Place => {
  return {
    id: firestorePlace.id || '',
    name: firestorePlace.name,
    description: firestorePlace.description,
    category: firestorePlace.category as 'restaurant' | 'concert' | 'bar',
    address: firestorePlace.address,
    locationLat: firestorePlace.locationLat,
    locationLng: firestorePlace.locationLng,
    photos: firestorePlace.photos || [],
    rating: firestorePlace.rating || 0,
    type: firestorePlace.type || firestorePlace.category,
    uid: firestorePlace.uid,
    userId: firestorePlace.userId,
    createdAt: firestorePlace.createdAt,
    updatedAt: firestorePlace.updatedAt,
    // Campos opcionales
    phone: firestorePlace.phone,
    email: firestorePlace.email,
    website: firestorePlace.website,
    socialNetworks: firestorePlace.socialNetworks || []
  };
};

// Función para cargar todos los lugares desde Firestore
export const loadPlacesFromFirestore = async (): Promise<Place[]> => {
  try {
    console.log('🔥 Cargando lugares desde Firestore...');
    const firestorePlaces = await getDocuments<FirestorePlace>('places');
    
    console.log('📊 Lugares encontrados en Firestore:', firestorePlaces.length);
    
    // Transformar los datos al formato de la aplicación
    const places = firestorePlaces.map(transformFirestorePlace);
    
    console.log('✅ Lugares transformados:', places.length);
    return places;
  } catch (error) {
    console.error('❌ Error cargando lugares desde Firestore:', error);
    throw error;
  }
};

// Función para cargar lugares por usuario específico
export const loadPlacesByUser = async (userId: string): Promise<Place[]> => {
  try {
    console.log(`🔥 Cargando lugares del usuario ${userId} desde Firestore...`);
    const firestorePlaces = await queryDocuments<FirestorePlace>('places', 'userId', '==', userId);
    
    console.log(`📊 Lugares encontrados para el usuario ${userId}:`, firestorePlaces.length);
    
    const places = firestorePlaces.map(transformFirestorePlace);
    return places;
  } catch (error) {
    console.error('❌ Error cargando lugares del usuario:', error);
    throw error;
  }
};

// Función para crear un nuevo lugar
export const createPlace = async (placeData: Omit<FirestorePlace, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const placeWithTimestamp = {
      ...placeData,
      createdAt: new Date().toISOString()
    };
    
    const placeId = await createDocument('places', placeWithTimestamp);
    console.log('✅ Lugar creado con ID:', placeId);
    return placeId;
  } catch (error) {
    console.error('❌ Error creando lugar:', error);
    throw error;
  }
};

// Función para actualizar un lugar
export const updatePlace = async (placeId: string, placeData: Partial<FirestorePlace>): Promise<void> => {
  try {
    await updateDocument('places', placeId, placeData);
    console.log('✅ Lugar actualizado:', placeId);
  } catch (error) {
    console.error('❌ Error actualizando lugar:', error);
    throw error;
  }
};

// Función para eliminar un lugar
export const deletePlace = async (placeId: string): Promise<void> => {
  try {
    await deleteDocument('places', placeId);
    console.log('✅ Lugar eliminado:', placeId);
  } catch (error) {
    console.error('❌ Error eliminando lugar:', error);
    throw error;
  }
};
