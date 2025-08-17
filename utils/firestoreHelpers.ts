/**
 * Utilidades para manejar referencias de Firestore
 */

/**
 * Extrae el ID de un documento desde una referencia de Firestore
 * @param reference - Puede ser un string, una referencia de Firestore, o un objeto con id/path
 * @returns El ID del documento como string, o null si no se puede extraer
 */
export const extractDocumentId = (reference: any): string | null => {
  if (!reference) {
    return null;
  }

  // Si es un string, devolver directamente
  if (typeof reference === 'string') {
    return reference;
  }

  // Si es un objeto
  if (typeof reference === 'object') {
    // Si tiene propiedad id
    if (reference.id) {
      return reference.id;
    }
    
    // Si tiene propiedad path (referencia de Firestore)
    if (reference.path) {
      const pathParts = reference.path.split('/');
      return pathParts[pathParts.length - 1];
    }
    
    // Si es un array con un elemento
    if (Array.isArray(reference) && reference.length === 1) {
      return extractDocumentId(reference[0]);
    }
  }

  console.warn('⚠️ No se pudo extraer ID de referencia:', reference);
  return null;
};

/**
 * Extrae IDs de un array de referencias de Firestore
 * @param references - Array de referencias (pueden ser strings, objetos, o referencias de Firestore)
 * @returns Array de IDs como strings
 */
export const extractDocumentIds = (references: any[]): string[] => {
  if (!Array.isArray(references)) {
    console.warn('⚠️ extractDocumentIds recibió algo que no es un array:', references);
    return [];
  }

  const ids: string[] = [];
  
  for (const reference of references) {
    const id = extractDocumentId(reference);
    if (id) {
      ids.push(id);
    }
  }
  
  return ids;
};

/**
 * Verifica si un valor es una referencia válida de Firestore
 * @param value - Valor a verificar
 * @returns true si es una referencia válida
 */
export const isValidFirestoreReference = (value: any): boolean => {
  if (!value) {
    return false;
  }

  if (typeof value === 'string') {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    return !!(value.id || value.path);
  }

  return false;
};
