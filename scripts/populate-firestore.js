const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Configuración de Firebase (reemplaza con tus credenciales)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Cargar datos de ejemplo
const loadExampleData = () => {
  const placesPath = path.join(__dirname, '..', 'firestore-places-example.json');
  const socialNetworksPath = path.join(__dirname, '..', 'firestore-social-networks-example.json');
  
  const placesData = JSON.parse(fs.readFileSync(placesPath, 'utf8'));
  const socialNetworksData = JSON.parse(fs.readFileSync(socialNetworksPath, 'utf8'));
  
  return { places: placesData.places, socialNetworks: socialNetworksData.socialNetworks };
};

// Función para poblar Firestore
const populateFirestore = async () => {
  try {
    console.log('🔥 Iniciando población de Firestore...');
    
    const data = loadExampleData();
    const places = data.places;
    const socialNetworks = data.socialNetworks;
    
    console.log(`📊 Cargando ${places.length} lugares y ${socialNetworks.length} redes sociales...`);
    
    // Primero poblar redes sociales
    const socialNetworksCollectionRef = collection(db, 'socialNetworks');
    const socialNetworkIds: {[key: string]: string} = {};
    
    console.log('📝 Agregando redes sociales...');
    for (let i = 0; i < socialNetworks.length; i++) {
      const socialNetwork = socialNetworks[i];
      const docRef = await addDoc(socialNetworksCollectionRef, {
        ...socialNetwork,
        createdAt: new Date()
      });
      
      // Guardar el ID para usarlo en los lugares
      const key = `${socialNetwork.uid}-${socialNetwork.type}`;
      socialNetworkIds[key] = docRef.id;
      
      console.log(`📝 Red social ${i + 1}/${socialNetworks.length}: ${socialNetwork.type} para ${socialNetwork.uid}`);
    }
    
    // Luego poblar lugares
    const placesCollectionRef = collection(db, 'places');
    
    console.log('📝 Agregando lugares...');
    for (let i = 0; i < places.length; i++) {
      const place = places[i];
      
      // Convertir referencias de redes sociales a IDs reales
      const placeSocialNetworks = place.socialNetworks || [];
      const realSocialNetworkIds = placeSocialNetworks.map(ref => {
        // Extraer el uid y type de la referencia
        const parts = ref.split('/').pop()?.split('-');
        if (parts && parts.length >= 2) {
          const uid = parts[0];
          const type = parts[1];
          const key = `${uid}-${type}`;
          return socialNetworkIds[key];
        }
        return null;
      }).filter(id => id !== null);
      
      const placeData = {
        ...place,
        socialNetworks: realSocialNetworkIds
      };
      
      console.log(`📝 Agregando lugar ${i + 1}/${places.length}: ${place.name}`);
      await addDoc(placesCollectionRef, placeData);
    }
    
    console.log('✅ ¡Firestore poblado exitosamente!');
    console.log(`📊 Se agregaron ${places.length} lugares a la colección 'places'`);
    console.log(`📊 Se agregaron ${socialNetworks.length} redes sociales a la colección 'socialNetworks'`);
    
  } catch (error) {
    console.error('❌ Error poblando Firestore:', error);
    process.exit(1);
  }
};

// Ejecutar el script
if (require.main === module) {
  populateFirestore();
}

module.exports = { populateFirestore };
