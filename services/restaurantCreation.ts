import { createDocument } from './firestore';
import { Place } from '@/types/firebase';

export interface CreateRestaurantData {
  name: string;
  category: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  email?: string;
  website?: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    website: string;
    phone: string;
    email: string;
  };
  menu?: Array<{
    name: string;
    description: string;
    price: number;
  }>;
  photos?: File[];
}

export const createRestaurantInFirestore = async (
  data: CreateRestaurantData,
  userId: string
): Promise<string> => {
  try {
    console.log('🔥 Creando restaurante en Firestore:', data);
    
    // Preparar datos para Firestore
    const firestoreData: Omit<Place, 'id'> = {
      name: data.name,
      category: data.category,
      description: data.description || '',
      address: data.address,
      locationLat: data.coordinates.lat.toString(),
      locationLng: data.coordinates.lng.toString(),
      phone: data.phone || '',
      email: data.email || '',
      website: data.website || '',
      photos: [], // Por ahora vacío, se implementará subida de fotos después
      socialNetworks: [], // Por ahora vacío, se implementará después
      type: data.category, // Usar la categoría como tipo
      uid: `restaurant-${Date.now()}`, // Generar UID único
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('📝 Datos preparados para Firestore:', firestoreData);

    // Crear documento en Firestore
    const documentId = await createDocument('places', firestoreData);
    
    console.log('✅ Restaurante creado exitosamente con ID:', documentId);
    
    return documentId;
  } catch (error) {
    console.error('❌ Error creando restaurante en Firestore:', error);
    throw new Error('Error al crear el restaurante en Firestore');
  }
};

export const validateRestaurantData = (data: CreateRestaurantData): string[] => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!data.category) {
    errors.push('La categoría es requerida');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('La descripción debe tener al menos 10 caracteres');
  }

  if (!data.address || data.address.trim().length < 5) {
    errors.push('La dirección es requerida');
  }

  if (!data.coordinates || !data.coordinates.lat || !data.coordinates.lng) {
    errors.push('Las coordenadas son requeridas');
  }

  return errors;
};

export const formatRestaurantData = (formData: any): CreateRestaurantData => {
  return {
    name: formData.name || '',
    category: formData.category || 'restaurant',
    description: formData.description || '',
    address: formData.address || '',
    coordinates: formData.coordinates || { lat: 23.1136, lng: -82.3666 },
    phone: formData.phone || '',
    email: formData.email || '',
    website: formData.website || '',
    hours: formData.hours || {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    socialMedia: formData.socialMedia || {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      tiktok: '',
      website: '',
      phone: '',
      email: ''
    },
    menu: formData.menu || [],
    photos: formData.photos || []
  };
};
