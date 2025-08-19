/**
 * Script de prueba para las utilidades de Firestore
 */

// Simular diferentes tipos de referencias que podemos recibir
const testReferences = [
  // Strings simples
  "abc123",
  "def456",
  
  // Objetos con id
  { id: "ghi789" },
  { id: "jkl012" },
  
  // Objetos con path (referencias de Firestore)
  { path: "socialNetworks/mno345" },
  { path: "socialNetworks/pqr678" },
  
  // Arrays con un elemento
  ["stu901"],
  [{ id: "vwx234" }],
  
  // Valores inválidos
  null,
  undefined,
  {},
  [],
  { invalid: "property" }
];

// Función para extraer ID (simulando la utilidad)
const extractDocumentId = (reference) => {
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

// Función para extraer IDs de un array
const extractDocumentIds = (references) => {
  if (!Array.isArray(references)) {
    console.warn('⚠️ extractDocumentIds recibió algo que no es un array:', references);
    return [];
  }

  const ids = [];
  
  for (const reference of references) {
    const id = extractDocumentId(reference);
    if (id) {
      ids.push(id);
    }
  }
  
  return ids;
};

// Probar las funciones
console.log('🧪 Probando utilidades de Firestore...\n');

console.log('📊 Referencias de prueba:');
testReferences.forEach((ref, index) => {
  console.log(`${index + 1}. ${JSON.stringify(ref)} (tipo: ${typeof ref})`);
});

console.log('\n🔍 Resultados de extractDocumentId:');
testReferences.forEach((ref, index) => {
  const result = extractDocumentId(ref);
  console.log(`${index + 1}. ${JSON.stringify(ref)} -> ${result}`);
});

console.log('\n📋 Resultado de extractDocumentIds:');
const allIds = extractDocumentIds(testReferences);
console.log('IDs extraídos:', allIds);

console.log('\n✅ Prueba completada!');
