import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  signInWithEmail, 
  createUserWithEmail, 
  signOutUser, 
  getCurrentUser,
  onAuthStateChange,
  signInWithGoogle,
  signInWithApple,
  createUserWithProfile
} from '@/services/auth';
import { createDocument, getDocument, queryDocuments, updateDocument } from '@/services/firestore';
import { UserProfile } from '@/types/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setAuthState({
        user,
        loading: false,
        error: null,
      });
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await signInWithEmail(email, password);
      setAuthState(prev => ({ ...prev, user: userCredential.user, loading: false }));
      return userCredential.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      console.log('Hook: Iniciando loginWithGoogle...');
      const userCredential = await signInWithGoogle();
      
      console.log('Hook: Google Sign-In exitoso, usuario:', userCredential.user);
      
      // Crear perfil en Firestore si es un usuario nuevo
      if (userCredential.user) {
        console.log('Hook: Verificando si el usuario existe en Firestore...');
        await createUserProfileIfNotExists(userCredential.user);
      }
      
      setAuthState(prev => ({ ...prev, user: userCredential.user, loading: false }));
      return userCredential.user;
    } catch (error: any) {
      console.error('Hook: Error en loginWithGoogle:', error);
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  };

  const loginWithApple = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      console.log('Hook: Iniciando loginWithApple...');
      const userCredential = await signInWithApple();
      
      console.log('Hook: Apple Sign-In exitoso, usuario:', userCredential.user);
      
      // Crear perfil en Firestore si es un usuario nuevo
      if (userCredential.user) {
        console.log('Hook: Creando perfil en Firestore...');
        await createUserProfileIfNotExists(userCredential.user);
      }
      
      setAuthState(prev => ({ ...prev, user: userCredential.user, loading: false }));
      return userCredential.user;
    } catch (error: any) {
      console.error('Hook: Error en loginWithApple:', error);
      console.error('Hook: Error code:', error.code);
      console.error('Hook: Error message:', error.message);
      
      const errorMessage = error.message || getAuthErrorMessage(error.code) || 'Error inesperado en Apple Sign-In';
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  };

  const registerWithEmail = async (
    email: string, 
    password: string, 
    displayName: string,
    phoneNumber: string
  ) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const userCredential = await createUserWithProfile(email, password, displayName, phoneNumber);
      
      // Crear perfil en Firestore
      if (userCredential.user) {
        await createUserProfile(userCredential.user, displayName, phoneNumber);
      }
      
      setAuthState(prev => ({ ...prev, user: userCredential.user, loading: false }));
      return userCredential.user;
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signOutUser();
      setAuthState(prev => ({ ...prev, user: null, loading: false }));
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw new Error(errorMessage);
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    loginWithEmail,
    loginWithGoogle,
    loginWithApple,
    registerWithEmail,
    logout,
    clearError,
    checkUserInFirestore, // Función para debugging
    hasRole, // Función para verificar roles
    checkEmailExists, // Función para verificar si un email existe
  };
};

// Función para crear perfil de usuario en Firestore
const createUserProfile = async (user: User, displayName: string, phoneNumber: string) => {
  try {
    console.log('Creando perfil de usuario con datos específicos...', user.uid);
    
    // Obtener roles por defecto
    const defaultRoles = getDefaultRoles(user);
    
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      name: displayName,
      phone: phoneNumber,
      profileImage: user.photoURL || '',
      roles: defaultRoles,
      create_at: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    };

    const docId = await createDocument<UserProfile>('users', userProfile);
    console.log('Perfil de usuario creado exitosamente con ID:', docId);
    console.log('Roles asignados:', defaultRoles);
    return userProfile;
  } catch (error) {
    console.error('Error al crear perfil de usuario:', error);
    throw error;
  }
};

// Función para obtener roles por defecto basados en el proveedor de autenticación
const getDefaultRoles = (user: User): string[] => {
  const roles = ['user']; // Rol base para todos los usuarios
  
  // Agregar roles específicos basados en el proveedor
  if (user.providerData.length > 0) {
    const provider = user.providerData[0]?.providerId;
    
    // Puedes agregar lógica específica aquí
    // Por ejemplo, usuarios de Google podrían tener roles diferentes
    if (provider === 'google.com') {
      // roles.push('google_user'); // Si quieres roles específicos por proveedor
    }
  }
  
  return roles;
};

// Función para manejar la vinculación de cuentas con el mismo email
const handleAccountLinking = async (existingUser: UserProfile, newUser: User): Promise<UserProfile> => {
  console.log('Manejando vinculación de cuentas...');
  console.log('Usuario existente:', existingUser);
  console.log('Nuevo usuario:', newUser);
  
  // Actualizar información del usuario existente con datos del nuevo proveedor
  const updatedData: Partial<UserProfile> = {
    updatedAt: new Date()
  };
  
  // Actualizar foto de perfil si no tiene una o si la nueva es mejor
  if (!existingUser.profileImage && newUser.photoURL) {
    updatedData.profileImage = newUser.photoURL;
  }
  
  // Actualizar nombre si no tiene uno o si el nuevo es más completo
  if (!existingUser.name && newUser.displayName) {
    updatedData.name = newUser.displayName;
  }
  
  // Actualizar teléfono si no tiene uno
  if (!existingUser.phone && newUser.phoneNumber) {
    updatedData.phone = newUser.phoneNumber;
  }
  
  try {
    // Actualizar el usuario existente
    await updateDocument<UserProfile>('users', existingUser.uid, updatedData);
    console.log('Usuario existente actualizado con nueva información');
    
    // Retornar el usuario actualizado
    const updatedUser = await getDocument<UserProfile>('users', existingUser.uid);
    return updatedUser || existingUser;
  } catch (error) {
    console.error('Error al actualizar usuario existente:', error);
    return existingUser;
  }
};

// Función para crear perfil si no existe
const createUserProfileIfNotExists = async (user: User) => {
  try {
    console.log('Verificando si el usuario existe en Firestore...', user.uid);
    console.log('Email del usuario:', user.email);
    
    // Primero verificar si el usuario ya existe por UID
    const existingUserByUid = await getDocument<UserProfile>('users', user.uid);
    
    if (existingUserByUid) {
      console.log('Usuario ya existe en Firestore por UID:', existingUserByUid);
      return existingUserByUid;
    }
    
    // Si no existe por UID, verificar si existe por email
    if (user.email) {
      console.log('Verificando si existe usuario con el mismo email...');
      const usersWithSameEmail = await queryDocuments<UserProfile>('users', 'email', '==', user.email);
      
      if (usersWithSameEmail.length > 0) {
        const existingUserByEmail = usersWithSameEmail[0];
        console.log('Usuario encontrado con el mismo email:', existingUserByEmail);
        
        // Si el usuario existe con el mismo email pero diferente UID,
        // significa que se autenticó con un proveedor diferente
        if (existingUserByEmail.uid !== user.uid) {
          console.log('Usuario encontrado con email existente pero UID diferente');
          console.log('UID existente:', existingUserByEmail.uid);
          console.log('Nuevo UID:', user.uid);
          console.log('Vinculando cuenta existente con nuevo proveedor de autenticación');
          
          // Manejar la vinculación de cuentas
          return await handleAccountLinking(existingUserByEmail, user);
        } else {
          // El usuario existe con el mismo UID y email
          console.log('Usuario ya existe con el mismo UID y email');
          return existingUserByEmail;
        }
      }
    }
    
    console.log('Usuario no existe en Firestore, creando perfil...');
    
    // Obtener roles por defecto
    const defaultRoles = getDefaultRoles(user);
    
    // Crear el perfil del usuario con la estructura correcta
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      name: user.displayName || '',
      phone: user.phoneNumber || '',
      profileImage: user.photoURL || '',
      roles: defaultRoles,
      create_at: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
    };

    // Usar el UID como ID del documento para facilitar las consultas
    const docId = await createDocument<UserProfile>('users', userProfile);
    console.log('Perfil de usuario creado exitosamente con ID:', docId);
    console.log('Roles asignados:', defaultRoles);
    
    return userProfile;
  } catch (error) {
    console.error('Error al crear/verificar perfil de usuario:', error);
    // No lanzar el error para no interrumpir el flujo de autenticación
    // El usuario puede continuar sin perfil en Firestore
  }
};

// Función para obtener mensajes de error en español
const getAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    'auth/user-not-found': 'No existe una cuenta con este email',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'Este email ya está registrado',
    'auth/weak-password': 'La contraseña es demasiado débil',
    'auth/invalid-email': 'El email no es válido',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/operation-not-allowed': 'Esta operación no está permitida',
    'auth/popup-closed-by-user': 'Ventana de autenticación cerrada',
    'auth/popup-blocked': 'Ventana de autenticación bloqueada',
    'auth/cancelled-popup-request': 'Solicitud de autenticación cancelada',
    'auth/account-exists-with-different-credential': 'Ya existe una cuenta con credenciales diferentes',
    'auth/requires-recent-login': 'Se requiere un inicio de sesión reciente',
    'auth/network-request-failed': 'Error de conexión de red',
  };

  return errorMessages[errorCode] || 'Ha ocurrido un error inesperado';
};

// Función para verificar si un usuario existe en Firestore (para debugging)
const checkUserInFirestore = async (uid: string) => {
  try {
    const user = await getDocument<UserProfile>('users', uid);
    console.log('Usuario en Firestore:', user);
    return user;
  } catch (error) {
    console.error('Error al verificar usuario en Firestore:', error);
    return null;
  }
};

// Función para verificar si un usuario tiene un rol específico
const hasRole = async (uid: string, role: string): Promise<boolean> => {
  try {
    const user = await getDocument<UserProfile>('users', uid);
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  } catch (error) {
    console.error('Error al verificar rol de usuario:', error);
    return false;
  }
};

// Función para verificar si un email ya existe en Firestore
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const usersWithEmail = await queryDocuments<UserProfile>('users', 'email', '==', email);
    return usersWithEmail.length > 0;
  } catch (error) {
    console.error('Error al verificar si el email existe:', error);
    return false;
  }
};

