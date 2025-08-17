// Firebase App
export { app, analytics } from './firebase';

// Firebase Authentication
export {
  auth,
  getCurrentUser,
  onAuthStateChange,
  registerWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  resetPassword,
  updateUserProfile,
  type AuthUser
} from './auth';

// Firestore Database
export {
  db,
  getPlaces,
  getPlaceById,
  addPlace,
  updatePlace,
  deletePlace,
  getReviewsByPlaceId,
  addReview,
  type Place,
  type Review
} from './firestore';

// Firebase Storage
export {
  storage,
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  getImageURL,
  listFiles,
  generateUniqueFileName
} from './storage';

