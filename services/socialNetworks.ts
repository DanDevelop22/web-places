import { 
  getDocuments, 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  queryDocuments,
  getDocument 
} from './firestore';
import { FirestoreSocialNetwork } from '@/types/firebase';
import { SocialNetwork } from '@/types';
import { extractDocumentIds } from '@/utils/firestoreHelpers';

// Función para cargar redes sociales por IDs
export const loadSocialNetworksByIds = async (socialNetworkIds: any[]): Promise<SocialNetwork[]> => {
  try {
    if (!socialNetworkIds || socialNetworkIds.length === 0) {
      return [];
    }

    console.log('🔥 Cargando redes sociales:', socialNetworkIds);
    
    // Verificar que sea un array
    if (!Array.isArray(socialNetworkIds)) {
      console.warn('⚠️ socialNetworkIds no es un array:', socialNetworkIds);
      return [];
    }
    
    // Extraer IDs usando la utilidad
    const documentIds = extractDocumentIds(socialNetworkIds);
    console.log('📊 IDs extraídos:', documentIds);
    
    if (documentIds.length === 0) {
      console.warn('⚠️ No se pudieron extraer IDs válidos de las referencias');
      return [];
    }
    
    const socialNetworks: SocialNetwork[] = [];
    
    // Cargar cada red social por su ID
    for (const documentId of documentIds) {
      try {
        console.log('🔍 Intentando cargar red social con ID:', documentId);
        const socialNetwork = await getDocument<FirestoreSocialNetwork>('socialNetworks', documentId);
        if (socialNetwork) {
          socialNetworks.push({
            id: socialNetwork.id,
            type: socialNetwork.type,
            uid: socialNetwork.uid,
            url: socialNetwork.url
          });
          console.log('✅ Red social cargada:', socialNetwork.type);
        } else {
          console.warn('⚠️ Red social no encontrada con ID:', documentId);
        }
      } catch (error) {
        console.error(`❌ Error cargando red social ${documentId}:`, error);
      }
    }
    
    console.log('✅ Redes sociales cargadas:', socialNetworks.length);
    return socialNetworks;
  } catch (error) {
    console.error('❌ Error cargando redes sociales:', error);
    return []; // Devolver array vacío en lugar de lanzar error
  }
};

// Función para cargar redes sociales por usuario
export const loadSocialNetworksByUser = async (userId: string): Promise<SocialNetwork[]> => {
  try {
    console.log(`🔥 Cargando redes sociales del usuario ${userId}...`);
    
    const socialNetworks = await queryDocuments<FirestoreSocialNetwork>('socialNetworks', 'uid', '==', userId);
    
    console.log(`📊 Redes sociales encontradas para el usuario ${userId}:`, socialNetworks.length);
    
    return socialNetworks.map(sn => ({
      id: sn.id,
      type: sn.type,
      uid: sn.uid,
      url: sn.url
    }));
  } catch (error) {
    console.error('❌ Error cargando redes sociales del usuario:', error);
    throw error;
  }
};

// Función para crear una nueva red social
export const createSocialNetwork = async (socialNetworkData: Omit<FirestoreSocialNetwork, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const socialNetworkWithTimestamp = {
      ...socialNetworkData,
      createdAt: new Date()
    };
    
    const socialNetworkId = await createDocument('socialNetworks', socialNetworkWithTimestamp);
    console.log('✅ Red social creada con ID:', socialNetworkId);
    return socialNetworkId;
  } catch (error) {
    console.error('❌ Error creando red social:', error);
    throw error;
  }
};

// Función para actualizar una red social
export const updateSocialNetwork = async (socialNetworkId: string, socialNetworkData: Partial<FirestoreSocialNetwork>): Promise<void> => {
  try {
    await updateDocument('socialNetworks', socialNetworkId, socialNetworkData);
    console.log('✅ Red social actualizada:', socialNetworkId);
  } catch (error) {
    console.error('❌ Error actualizando red social:', error);
    throw error;
  }
};

// Función para eliminar una red social
export const deleteSocialNetwork = async (socialNetworkId: string): Promise<void> => {
  try {
    await deleteDocument('socialNetworks', socialNetworkId);
    console.log('✅ Red social eliminada:', socialNetworkId);
  } catch (error) {
    console.error('❌ Error eliminando red social:', error);
    throw error;
  }
};

// Función para obtener icono de red social
export const getSocialNetworkIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'facebook':
      return '📘';
    case 'instagram':
      return '📷';
    case 'twitter':
      return '🐦';
    case 'youtube':
      return '📺';
    case 'tiktok':
      return '🎵';
    case 'linkedin':
      return '💼';
    case 'whatsapp':
      return '📱';
    case 'telegram':
      return '📬';
    case 'website':
      return '🌐';
    case 'phone':
      return '📞';
    case 'email':
      return '📧';
    default:
      return '🔗';
  }
};

// Función para obtener nombre legible de red social
export const getSocialNetworkLabel = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'facebook':
      return 'Facebook';
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'Twitter';
    case 'youtube':
      return 'YouTube';
    case 'tiktok':
      return 'TikTok';
    case 'linkedin':
      return 'LinkedIn';
    case 'whatsapp':
      return 'WhatsApp';
    case 'telegram':
      return 'Telegram';
    case 'website':
      return 'Sitio Web';
    case 'phone':
      return 'Teléfono';
    case 'email':
      return 'Email';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};
