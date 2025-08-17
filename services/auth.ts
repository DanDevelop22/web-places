import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { auth } from "./firebase";

// Función para iniciar sesión con email y contraseña
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para crear una nueva cuenta con email y contraseña
export const createUserWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const signOutUser = async (): Promise<void> => {
  return signOut(auth);
};

// Función para escuchar cambios en el estado de autenticación
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Función para obtener el usuario actual
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Configurar proveedores de autenticación
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

// Log para verificar la configuración
console.log('Apple Provider configurado:', {
  providerId: appleProvider.providerId
});

// Función para diagnosticar la configuración de Apple Sign-In
export const diagnoseAppleSignIn = async () => {
  console.log('=== Diagnóstico de Apple Sign-In ===');
  console.log('1. Verificando configuración de Firebase...');
  console.log('Auth object:', auth);
  console.log('Auth config:', auth.config);
  
  console.log('2. Verificando proveedor de Apple...');
  console.log('Apple provider:', appleProvider);
  console.log('Provider ID:', appleProvider.providerId);
  
  console.log('3. Verificando estado de autenticación...');
  console.log('Usuario actual:', auth.currentUser);
  
  console.log('4. Intentando obtener configuración de proveedores...');
  try {
    // Intentar obtener la configuración de proveedores
    const providers = await fetchSignInMethodsForEmail(auth, 'test@example.com');
    console.log('Métodos de autenticación disponibles:', providers);
  } catch (error) {
    console.log('No se pudieron obtener los métodos de autenticación:', error);
  }
  
  console.log('=== Fin del diagnóstico ===');
};

// Función para iniciar sesión con Google
export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

// Función para iniciar sesión con Apple
export const signInWithApple = async (): Promise<UserCredential> => {
  try {
    console.log('Iniciando Apple Sign-In...');
    console.log('Auth object:', auth);
    console.log('Apple provider:', appleProvider);
    
    const result = await signInWithPopup(auth, appleProvider);
    console.log('Apple Sign-In exitoso:', result);
    return result;
  } catch (error: any) {
    console.error('Error en Apple Sign-In:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error full:', error);
    
    // Manejar errores específicos de Apple Sign-In
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Inicio de sesión con Apple cancelado');
    }
    if (error.code === 'auth/popup-blocked') {
      throw new Error('El popup de Apple fue bloqueado. Por favor, permite popups para este sitio.');
    }
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('La autenticación con Apple no está habilitada. Contacta al administrador.');
    }
    if (error.code === 'auth/invalid-app-credential') {
      throw new Error('Credencial de Apple inválida. Verifica la configuración en Firebase Console.');
    }
    if (error.code === 'auth/network-request-failed') {
      throw new Error('Error de conexión. Verifica tu conexión a internet.');
    }
    if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Solicitud de Apple Sign-In cancelada.');
    }
    
    // Si no es un error conocido, mostrar el mensaje original
    throw new Error(`Error en Apple Sign-In: ${error.message || 'Error desconocido'}`);
  }
};

// Función para crear usuario y perfil en Firestore
export const createUserWithProfile = async (
  email: string, 
  password: string, 
  displayName?: string,
  phoneNumber?: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Aquí puedes agregar lógica adicional para crear el perfil en Firestore
  // Por ejemplo, llamar a una función que cree el documento del usuario
  
  return userCredential;
};
