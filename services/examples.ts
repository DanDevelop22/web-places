import { 
  signInWithEmail, 
  createUserWithEmail, 
  signOutUser, 
  getCurrentUser 
} from "./auth";
import { 
  getDocument, 
  getDocuments, 
  createDocument, 
  updateDocument, 
  deleteDocument,
  queryDocuments,
  getOrderedDocuments
} from "./firestore";
import { Place, Review, UserProfile } from "../types/firebase";

// Ejemplos de uso de Authentication

// 1. Crear una nueva cuenta
export const registerUser = async (email: string, password: string, displayName?: string) => {
  try {
    const userCredential = await createUserWithEmail(email, password);
    
    // Crear perfil de usuario en Firestore
    if (userCredential.user) {
      const userProfile: Omit<UserProfile, 'id'> = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        displayName: displayName || userCredential.user.displayName || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        isAdmin: false
      };
      
      await createDocument<UserProfile>('users', userProfile);
    }
    
    return userCredential.user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// 2. Iniciar sesión
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmail(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// 3. Cerrar sesión
export const logoutUser = async () => {
  try {
    await signOutUser();
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Ejemplos de uso de Firestore

// 1. Crear un nuevo lugar
export const createPlace = async (placeData: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const place: Omit<Place, 'id'> = {
      ...placeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const placeId = await createDocument<Place>('places', place);
    return placeId;
  } catch (error) {
    console.error('Error creating place:', error);
    throw error;
  }
};

// 2. Obtener todos los lugares
export const getAllPlaces = async (): Promise<Place[]> => {
  try {
    return await getDocuments<Place>('places');
  } catch (error) {
    console.error('Error getting places:', error);
    throw error;
  }
};

// 3. Obtener un lugar por ID
export const getPlaceById = async (placeId: string): Promise<Place | null> => {
  try {
    return await getDocument<Place>('places', placeId);
  } catch (error) {
    console.error('Error getting place:', error);
    throw error;
  }
};

// 4. Actualizar un lugar
export const updatePlace = async (placeId: string, updates: Partial<Place>) => {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    
    await updateDocument<Place>('places', placeId, updateData);
  } catch (error) {
    console.error('Error updating place:', error);
    throw error;
  }
};

// 5. Eliminar un lugar
export const deletePlace = async (placeId: string) => {
  try {
    await deleteDocument('places', placeId);
  } catch (error) {
    console.error('Error deleting place:', error);
    throw error;
  }
};

// 6. Buscar lugares por categoría
export const getPlacesByCategory = async (category: string): Promise<Place[]> => {
  try {
    return await queryDocuments<Place>('places', 'category', '==', category);
  } catch (error) {
    console.error('Error getting places by category:', error);
    throw error;
  }
};

// 7. Obtener lugares ordenados por rating
export const getTopRatedPlaces = async (limit: number = 10): Promise<Place[]> => {
  try {
    return await getOrderedDocuments<Place>('places', 'rating', 'desc', limit);
  } catch (error) {
    console.error('Error getting top rated places:', error);
    throw error;
  }
};

// 8. Crear una reseña
export const createReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const review: Omit<Review, 'id'> = {
      ...reviewData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const reviewId = await createDocument<Review>('reviews', review);
    return reviewId;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// 9. Obtener reseñas de un lugar
export const getReviewsByPlace = async (placeId: string): Promise<Review[]> => {
  try {
    return await queryDocuments<Review>('reviews', 'placeId', '==', placeId);
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};

// 10. Obtener perfil de usuario
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    return await getDocument<UserProfile>('users', uid);
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

