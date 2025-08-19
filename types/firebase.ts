import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";

// Tipos para Authentication
export interface AuthUser extends User {
  // Extender si necesitas propiedades adicionales
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  displayName?: string;
}

// Tipos para Firestore - Redes Sociales
export interface FirestoreSocialNetwork extends DocumentData {
  id?: string;
  type: string; // facebook, instagram, twitter, youtube, tiktok, website, phone, email, etc.
  uid: string;
  url: string;
  createdAt?: Date;
}

// Tipos para Firestore - Lugares
export interface Place extends DocumentData {
  id?: string;
  name: string;
  description?: string;
  category: string;
  rating?: number;
  locationLat: string;
  locationLng: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  photos?: string[];
  socialNetworks?: any[]; // Referencias a documentos de socialNetworks (pueden ser strings o objetos)
  type: string; // Categoría del lugar
  uid: string; // UID único del lugar
  userId: string; // UID del usuario que lo creó
  createdAt: string;
  updatedAt: string;
}

// Tipos para Firestore - Reseñas
export interface Review extends DocumentData {
  id?: string;
  placeId: string;
  rating: number;
  comment: string;
  authorName: string;
  authorEmail?: string;
  authorId?: string; // UID del usuario que escribió la reseña
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos para Firestore - Usuarios
export interface UserProfile extends DocumentData {
  id?: string;
  uid: string;
  email: string;
  name: string;           // Cambiado de displayName a name
  phone: string;          // Cambiado de phoneNumber a phone
  profileImage: string;   // Cambiado de photoURL a profileImage
  roles: string[];        // Array de roles
  create_at: Date;        // Cambiado de createdAt a create_at
  updatedAt?: Date;       // Mantenido para compatibilidad
  isAdmin?: boolean;      // Mantenido para compatibilidad
}

// Tipos para consultas
export interface QueryOptions {
  limit?: number;
  orderBy?: {
    field: string;
    direction: "asc" | "desc";
  };
  where?: {
    field: string;
    operator: any;
    value: any;
  }[];
}

