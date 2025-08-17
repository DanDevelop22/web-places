import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference
} from "firebase/firestore";
import { db } from "./firebase";

// Función para obtener un documento por ID
export const getDocument = async <T = DocumentData>(
  collectionName: string, 
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// Función para obtener todos los documentos de una colección
export const getDocuments = async <T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

// Función para crear un nuevo documento
export const createDocument = async <T extends DocumentData>(
  collectionName: string, 
  data: T
): Promise<string> => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

// Función para actualizar un documento
export const updateDocument = async <T = DocumentData>(
  collectionName: string, 
  documentId: string, 
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Función para eliminar un documento
export const deleteDocument = async (
  collectionName: string, 
  documentId: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Función para consultar documentos con filtros
export const queryDocuments = async <T = DocumentData>(
  collectionName: string,
  field: string,
  operator: any,
  value: any
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error("Error querying documents:", error);
    throw error;
  }
};

// Función para obtener documentos ordenados
export const getOrderedDocuments = async <T = DocumentData>(
  collectionName: string,
  orderByField: string,
  orderDirection: "asc" | "desc" = "asc",
  limitCount?: number
): Promise<T[]> => {
  try {
    const constraints: QueryConstraint[] = [orderBy(orderByField, orderDirection)];
    
    if (limitCount) {
      constraints.push(limit(limitCount));
    }
    
    return await getDocuments<T>(collectionName, constraints);
  } catch (error) {
    console.error("Error getting ordered documents:", error);
    throw error;
  }
};
