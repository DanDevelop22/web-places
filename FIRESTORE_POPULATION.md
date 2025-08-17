# 🔥 Poblar Firestore con Datos de Ejemplo

Este documento te guía para poblar tu colección de Firestore con los datos de ejemplo para que puedas ver los puntos del mapa funcionando.

## 📋 Prerrequisitos

1. **Firebase configurado**: Asegúrate de que tu proyecto Firebase esté configurado correctamente
2. **Variables de entorno**: Verifica que tu archivo `.env.local` tenga todas las credenciales de Firebase
3. **Firestore habilitado**: Asegúrate de que Firestore esté habilitado en tu proyecto Firebase

## 🚀 Opción 1: Usar el Script Automático

### 1. Instalar dependencias (si no las tienes)
```bash
npm install firebase
```

### 2. Ejecutar el script
```bash
node scripts/populate-firestore.js
```

El script automáticamente:
- Cargará los datos del archivo `firestore-places-example.json`
- Los agregará a la colección `places` en Firestore
- Mostrará el progreso en la consola

## 🚀 Opción 2: Poblar Manualmente desde Firebase Console

### 1. Abrir Firebase Console
Ve a [Firebase Console](https://console.firebase.google.com/) y selecciona tu proyecto.

### 2. Ir a Firestore Database
- En el menú lateral, haz clic en "Firestore Database"
- Haz clic en "Crear base de datos" si no la tienes creada
- Selecciona "Comenzar en modo de prueba"

### 3. Crear la colección
- Haz clic en "Iniciar colección"
- ID de la colección: `places`
- Haz clic en "Siguiente"

### 4. Agregar documentos
Para cada lugar en el archivo `firestore-places-example.json`:

1. Haz clic en "Agregar documento"
2. Deja el ID del documento en blanco (se generará automáticamente)
3. Agrega los campos uno por uno:

#### Campos requeridos:
- `name` (string): Nombre del lugar
- `description` (string): Descripción del lugar
- `category` (string): "restaurant", "concert", o "bar"
- `address` (string): Dirección del lugar
- `locationLat` (string): Latitud como string
- `locationLng` (string): Longitud como string
- `photos` (array): Array de URLs de fotos
- `rating` (number): Calificación del lugar
- `reviews` (string): Referencia a documento de reviews
- `menus` (array): Array de referencias a menús
- `schedule` (string): Horario del lugar
- `type` (string): Tipo de lugar
- `uid` (string): ID único del lugar
- `userId` (string): **"5H95owFqi7xkqOfI8LJI"** (el ID que especificaste)
- `createdAt` (string): Fecha de creación en formato ISO

### 5. Ejemplo de documento
```json
{
  "name": "La Bodeguita del Medio",
  "description": "Restaurante histórico famoso por sus mojitos y la cocina criolla cubana.",
  "category": "restaurant",
  "address": "Empedrado 207, La Habana Vieja, La Habana",
  "locationLat": "23.1136",
  "locationLng": "-82.3594",
  "photos": [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
  ],
  "rating": 4.7,
  "reviews": "/reviews/bodeguita-reviews",
  "menus": ["/menu/bodeguita-menu"],
  "schedule": "12:00-23:00",
  "type": "restaurant",
  "uid": "bodeguita-uid",
  "userId": "5H95owFqi7xkqOfI8LJI",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

## 🔍 Verificar que Funciona

### 1. Ejecutar la aplicación
```bash
npm run dev
```

### 2. Abrir la aplicación
Ve a `http://localhost:3000` en tu navegador.

### 3. Verificar en la consola
Deberías ver mensajes como:
```
🔥 Cargando lugares desde Firestore...
📊 Lugares encontrados en Firestore: 8
✅ Lugares transformados: 8
✅ Lugares cargados exitosamente: 8
```

### 4. Verificar en el mapa
Deberías ver los marcadores de los lugares en el mapa de La Habana.

## 🛠️ Solución de Problemas

### Error: "Error al cargar los lugares desde Firestore"
- Verifica que las credenciales de Firebase estén correctas en `.env.local`
- Asegúrate de que Firestore esté habilitado en tu proyecto
- Verifica que las reglas de Firestore permitan lectura

### Error: "Token de Mapbox no configurado"
- Asegúrate de tener `NEXT_PUBLIC_MAPBOX_TOKEN` en tu `.env.local`

### No se ven marcadores en el mapa
- Verifica que los campos `locationLat` y `locationLng` tengan valores válidos
- Asegúrate de que las coordenadas estén en el formato correcto (string)

## 📝 Estructura de Datos

La estructura de datos en Firestore debe coincidir exactamente con la imagen que proporcionaste:

```
places/
  ├── [document-id]/
  │   ├── name: string
  │   ├── description: string
  │   ├── category: string
  │   ├── address: string
  │   ├── locationLat: string
  │   ├── locationLng: string
  │   ├── photos: array
  │   ├── rating: number
  │   ├── reviews: string
  │   ├── menus: array
  │   ├── schedule: string
  │   ├── type: string
  │   ├── uid: string
  │   ├── userId: string (5H95owFqi7xkqOfI8LJI)
  │   └── createdAt: string
```

## 🎯 Próximos Pasos

Una vez que tengas los datos en Firestore:

1. **Probar la aplicación**: Verifica que los marcadores aparezcan en el mapa
2. **Filtrar por categoría**: Prueba los filtros de restaurantes, bares y conciertos
3. **Buscar lugares**: Usa la función de búsqueda
4. **Ver detalles**: Haz clic en los marcadores para ver la información del lugar

¡Con esto ya tendrás tu aplicación cargando los puntos del mapa directamente desde Firestore! 🎉
